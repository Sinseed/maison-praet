/**
 * Moteur de classement partagé — utilisé par :
 *  · /api/app/classer  (Réception manuelle : session utilisateur, RLS)
 *  · /api/inbound      (email transféré : service_role, courtier_id explicite)
 *
 * `analyserTexte` : Claude propose un classement (aucune écriture).
 * `appliquerPlan`  : écrit le plan (échange, tâche datée, document, nouveau bien).
 */

import type Anthropic from '@anthropic-ai/sdk'
import { TYPE_BIEN_LABELS } from '@/lib/estimation/types'
import { COURTIER } from '@/lib/courtier'

// Le courtier lui-même ne doit jamais devenir un contact fiché : sa signature
// apparaît dans les mails transférés.
const EMAILS_COURTIER = new Set([COURTIER.email.toLowerCase(), 'thom.praet@gmail.com'])
const estLeCourtier = (c: { prenom: string; nom: string; email: string }) => {
  if (c.email && EMAILS_COURTIER.has(c.email.toLowerCase())) return true
  return `${c.prenom} ${c.nom}`.trim().toLowerCase() === COURTIER.courtier.toLowerCase()
}

export interface PlanContact {
  prenom: string
  nom: string
  role: string // vendeur | acquereur | notaire | courtier_tiers | artisan | autre
  email: string
  telephone: string
}

export interface Plan {
  resume: string
  bien_id: string
  nouveau_bien_type: string
  nouveau_bien_commune: string
  nouveau_bien_adresse: string
  echange: string
  canal: string
  tache: string
  tache_echeance: string
  document_nom: string
  document_statut: string
  // — Personnes détectées (répertoire de contacts) —
  contacts: PlanContact[]
  // — Prospect acquéreur détecté dans le texte (voir appliquerPlan) —
  prospect_societe: string
  prospect_prenom: string
  prospect_nom: string
  prospect_email: string
  prospect_telephone: string
  prospect_recherche: string
  prospect_communes: string
  prospect_typologies: string
  prospect_budget: string
  // — Offre d'achat détectée (voir appliquerPlan) —
  offre_montant: string
  offre_notes: string
}

const ROLES_CONTACT = ['vendeur', 'acquereur', 'notaire', 'courtier_tiers', 'artisan', 'autre']

export interface BienContexte {
  id: string
  type: string
  commune: string
  adresse: string | null
}

export const PLAN_KEYS = [
  'resume', 'bien_id', 'nouveau_bien_type', 'nouveau_bien_commune', 'nouveau_bien_adresse',
  'echange', 'canal', 'tache', 'tache_echeance', 'document_nom', 'document_statut',
  'prospect_societe', 'prospect_prenom', 'prospect_nom', 'prospect_email',
  'prospect_telephone', 'prospect_recherche', 'prospect_communes',
  'prospect_typologies', 'prospect_budget',
  'offre_montant', 'offre_notes',
] as const

const nettoyerContacts = (v: unknown): PlanContact[] => {
  if (!Array.isArray(v)) return []
  return v
    .map((c) => {
      const o = (c ?? {}) as Record<string, unknown>
      const role = String(o.role ?? '').toLowerCase()
      return {
        prenom: String(o.prenom ?? '').trim(),
        nom: String(o.nom ?? '').trim(),
        role: ROLES_CONTACT.includes(role) ? role : 'autre',
        email: String(o.email ?? '').trim(),
        telephone: String(o.telephone ?? '').trim(),
      }
    })
    .filter((c) => c.nom || c.prenom || c.email) // au moins un identifiant
    .filter((c) => !estLeCourtier(c)) // jamais le courtier lui-même
    .slice(0, 10)
}

/** Typologies acceptées par l'enum `type_bien` de la base. */
const TYPOLOGIES_VALIDES = ['villa', 'ppe', 'immeuble', 'terrain'] as const

const planParDefaut = (p: Partial<Plan> & { contacts?: unknown }): Plan => ({
  resume: p.resume ?? '',
  bien_id: p.bien_id ?? '',
  nouveau_bien_type: p.nouveau_bien_type ?? '',
  nouveau_bien_commune: p.nouveau_bien_commune ?? '',
  nouveau_bien_adresse: p.nouveau_bien_adresse ?? '',
  echange: p.echange ?? '',
  canal: p.canal ?? 'note',
  tache: p.tache ?? '',
  tache_echeance: p.tache_echeance ?? '',
  document_nom: p.document_nom ?? '',
  document_statut: p.document_statut ?? '',
  contacts: nettoyerContacts(p.contacts),
  prospect_societe: p.prospect_societe ?? '',
  prospect_prenom: p.prospect_prenom ?? '',
  prospect_nom: p.prospect_nom ?? '',
  prospect_email: p.prospect_email ?? '',
  prospect_telephone: p.prospect_telephone ?? '',
  prospect_recherche: p.prospect_recherche ?? '',
  prospect_communes: p.prospect_communes ?? '',
  prospect_typologies: p.prospect_typologies ?? '',
  prospect_budget: p.prospect_budget ?? '',
  offre_montant: p.offre_montant ?? '',
  offre_notes: p.offre_notes ?? '',
})

/** « Lausanne, Gland » → ['Lausanne', 'Gland'] */
const liste = (v: string) => v.split(',').map((s) => s.trim()).filter(Boolean)

/** « CHF 1'200'000.- » → 1200000 (null si illisible) */
const montant = (v: string) => {
  const n = parseFloat(v.replace(/[^0-9.]/g, ''))
  return Number.isFinite(n) && n > 0 ? n : null
}

/** Claude lit le texte + la liste des dossiers et propose un classement. */
export async function analyserTexte(
  client: Anthropic,
  opts: { texte: string; biens: BienContexte[]; aujourdhui: string },
): Promise<Plan> {
  const listeBiens = opts.biens
    .map((b) => `- id=${b.id} | ${TYPE_BIEN_LABELS[b.type as keyof typeof TYPE_BIEN_LABELS] ?? b.type} à ${b.commune}${b.adresse ? ` (${b.adresse})` : ''}`)
    .join('\n') || '(aucun dossier existant)'

  const message = await client.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 3000,
    system:
      "Tu es l'assistant de classement d'un courtier immobilier vaudois. On te donne un élément brut " +
      "(mail transféré, note, appel) et la liste des dossiers (biens) existants. Détermine à quel dossier " +
      "il se rattache (renvoie son id exact dans `bien_id`) ou s'il faut en créer un nouveau. Si l'élément " +
      "concerne une transaction, une visite, un mandat ou une acquisition portant sur un bien précis qui ne " +
      "correspond à aucun dossier existant, propose la création d'un nouveau dossier (remplis nouveau_bien_type " +
      "et nouveau_bien_commune, la commune étant celle du bien concerné). Extrais, s'il " +
      "y a lieu : un échange à consigner, une tâche de suivi, un changement de statut de document " +
      "(ex. CECB demandé/reçu). Laisse vides (chaîne vide) les champs non pertinents.\n\n" +
      "PROSPECT ACQUÉREUR — important pour le courtier : si le texte révèle une personne ou une société qui " +
      "CHERCHE À ACHETER (investisseur, particulier en recherche, régie mandatée pour acquérir), remplis les " +
      "champs prospect_* afin de l'enregistrer au fichier acquéreurs. Extrais son identité (prospect_societe " +
      "pour une société, prospect_prenom/prospect_nom pour une personne), ses coordonnées, ce qu'elle cherche " +
      "en une phrase (prospect_recherche), les communes visées (prospect_communes, séparées par des virgules — " +
      "uniquement des noms de communes, jamais des régions ni « environs »), les typologies " +
      "(prospect_typologies parmi villa, ppe, immeuble, terrain, séparées par des virgules) et le budget " +
      "éventuel (prospect_budget, en chiffres). Ne remplis ces champs QUE pour un acheteur : un propriétaire " +
      "qui veut VENDRE n'est pas un prospect acquéreur (dans ce cas, propose plutôt un dossier de bien). " +
      "Laisse tous les champs prospect_* vides s'il n'y a aucun acheteur identifiable.\n\n" +
      "OFFRE D'ACHAT — si le texte formule une proposition d'achat chiffrée sur un bien précis (« je vous " +
      "propose CHF 620'000 », « mon offre est de… »), remplis offre_montant avec le montant en chiffres " +
      "(sans devise ni séparateur : 620000). Choisis le montant qui se rapporte au dossier retenu (bien_id) : " +
      "si l'acheteur propose plusieurs variantes (un bien seul, un autre, ou un lot), retiens celle qui " +
      "correspond au bien classé et récapitule les autres variantes ainsi que le contexte (offre révisée, " +
      "préférence exprimée, conditions) dans offre_notes. Quand une offre est détectée, IDENTIFIE " +
      "l'acheteur qui la formule (le candidat acquéreur concerné — pas forcément l'expéditeur du mail, qui " +
      "peut être un courtier ou un notaire qui transmet) et remplis prospect_prenom, prospect_nom, " +
      "prospect_email, prospect_telephone (prospect_societe si c'est une société) avec SON identité, afin " +
      "que l'offre lui soit rattachée à sa fiche. Laisse offre_montant vide s'il n'y a pas de " +
      "proposition chiffrée ferme (une simple estimation ou un prix affiché n'est pas une offre).\n\n" +
      `Nous sommes le ${opts.aujourdhui}. IMPORTANT : si le texte mentionne une date limite ou une échéance ` +
      "(« pour le 2 août », « d'ici vendredi », « avant la fin du mois »…), déduis la date correspondante et " +
      "mets-la dans tache_echeance au format AAAA-MM-JJ (année à venir si le mois est déjà passé). Crée alors " +
      "une tâche claire décrivant l'action attendue. Sans date explicite, laisse tache_echeance vide.\n\n" +
      "PERSONNES : repère TOUTES les personnes citées avec un minimum d'information (vendeurs, acquéreurs, " +
      "notaires, artisans, banquiers…) et liste-les dans `contacts` — une entrée par personne. Inclus " +
      "explicitement les CO-PROPRIÉTAIRES et CO-VENDEURS, ainsi que toute personne dont on te communique le " +
      "nom, l'email ou le téléphone, MÊME si elle n'est pas l'expéditeur du message (ex. « je vous communique " +
      "les adresses de mes deux frères : … » → crée une entrée pour CHAQUE frère). Pour chacune : prenom, nom, " +
      `role (∈ ["vendeur","acquereur","notaire","courtier_tiers","artisan","autre"]), email, telephone — ` +
      "champs inconnus laissés en chaîne vide. N'invente jamais un email ou un nom absent du texte, mais " +
      "n'oublie personne qui y figure.\n\n" +
      'Réponds UNIQUEMENT par un objet JSON valide, sans aucun texte autour, avec exactement ces clés : ' +
      JSON.stringify([...PLAN_KEYS, 'contacts']) +
      '. Toutes les valeurs sont des chaînes SAUF `contacts`, qui est un tableau d\'objets ' +
      '{prenom, nom, role, email, telephone} (tableau vide si aucune personne).' +
      ` Contraintes : nouveau_bien_type ∈ ["","villa","ppe","immeuble","terrain"] ; ` +
      `canal ∈ ["note","email","appel","notaire","autre"] ; document_statut ∈ ["","demande","recu"] ; ` +
      `prospect_typologies : sous-ensemble de ["villa","ppe","immeuble","terrain"] séparé par des virgules.`,
    messages: [
      { role: 'user', content: `Dossiers existants :\n${listeBiens}\n\nÉlément à classer :\n"""${opts.texte}"""` },
    ],
  })
  const bloc = message.content.find((b) => b.type === 'text')
  const brut = bloc && bloc.type === 'text' ? bloc.text : '{}'
  const match = brut.match(/\{[\s\S]*\}/)
  return planParDefaut(JSON.parse(match ? match[0] : brut) as Partial<Plan>)
}

/**
 * Écrit le plan validé. `courtierId` fourni → on l'inscrit explicitement
 * (contexte service_role, sans session) ; sinon on laisse la valeur par défaut
 * auth.uid() (contexte session utilisateur).
 */
export async function appliquerPlan(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  plan: Plan,
  opts: { courtierId?: string } = {},
): Promise<{ actions: string[]; bienId: string | null }> {
  const proprio = opts.courtierId ? { courtier_id: opts.courtierId } : {}
  const actions: string[] = []
  let bienId = plan.bien_id || null

  if (!bienId && plan.nouveau_bien_commune && plan.nouveau_bien_type) {
    const { data: bien, error } = await supabase
      .from('biens')
      .insert({ ...proprio, type: plan.nouveau_bien_type, commune: plan.nouveau_bien_commune, adresse: plan.nouveau_bien_adresse || null, statut: 'prospection' })
      .select()
      .single()
    if (error) throw new Error(`Création du bien impossible : ${error.message}`)
    bienId = (bien as { id: string }).id
    actions.push(`Dossier créé : ${plan.nouveau_bien_commune}`)
  }

  if (plan.echange) {
    // Anti-doublon : reclasser le même mail ne réécrit pas le même échange.
    let q = supabase.from('echanges').select('id').eq('contenu', plan.echange)
    q = bienId ? q.eq('bien_id', bienId) : q.is('bien_id', null)
    if (opts.courtierId) q = q.eq('courtier_id', opts.courtierId)
    const { data: dup } = await q.limit(1)
    if ((dup as { id: string }[] | null)?.length) {
      actions.push('Échange déjà consigné (doublon ignoré)')
    } else {
      await supabase.from('echanges').insert({ ...proprio, bien_id: bienId, canal: plan.canal || 'note', contenu: plan.echange })
      actions.push("Échange ajouté à l'historique")
    }
  }

  if (plan.tache) {
    const dateOk = /^\d{4}-\d{2}-\d{2}$/.test(plan.tache_echeance || '')
    const echeance = dateOk ? new Date(`${plan.tache_echeance}T08:00:00`).toISOString() : new Date().toISOString()
    // Anti-doublon : même titre, encore ouverte, sur le même dossier.
    let q = supabase.from('taches').select('id').eq('titre', plan.tache).in('statut', ['a_faire', 'en_cours'])
    q = bienId ? q.eq('bien_id', bienId) : q.is('bien_id', null)
    if (opts.courtierId) q = q.eq('courtier_id', opts.courtierId)
    const { data: dup } = await q.limit(1)
    if ((dup as { id: string }[] | null)?.length) {
      actions.push('Tâche déjà présente (doublon ignoré)')
    } else {
      await supabase.from('taches').insert({ ...proprio, titre: plan.tache, bien_id: bienId, echeance })
      actions.push(`Tâche créée : ${plan.tache}${dateOk ? ` (rappel le ${plan.tache_echeance})` : ''}`)
    }
  }

  // ── Prospect acquéreur : contact + fiche acquéreur (avec ses critères) ────
  // Sans cela, un acheteur repéré dans un mail resterait une simple note dans
  // l'historique d'un dossier : il ne remonterait jamais dans le matching.
  const identite = plan.prospect_societe || plan.prospect_nom || plan.prospect_prenom
  let acquereurId: string | null = null
  if (identite) {
    const designation = plan.prospect_societe || [plan.prospect_prenom, plan.prospect_nom].filter(Boolean).join(' ')

    // Dédoublonnage : un même acheteur peut écrire plusieurs fois. On cherche
    // d'abord sur l'e-mail (identifiant le plus fiable), sinon sur la société.
    let requete = supabase.from('contacts').select('id')
    if (opts.courtierId) requete = requete.eq('courtier_id', opts.courtierId)
    requete = plan.prospect_email
      ? requete.ilike('email', plan.prospect_email)
      : requete.ilike('societe', plan.prospect_societe || '~introuvable~')
    const { data: dejaVus } = await requete.limit(1)
    const existant = (dejaVus as { id: string }[] | null)?.[0] ?? null

    let contactId = existant?.id ?? null
    if (!contactId) {
      const { data: contact, error } = await supabase
        .from('contacts')
        .insert({
          ...proprio,
          type: 'acquereur',
          societe: plan.prospect_societe || null,
          prenom: plan.prospect_prenom || null,
          nom: plan.prospect_nom || null,
          email: plan.prospect_email || null,
          telephone: plan.prospect_telephone || null,
          notes: plan.prospect_recherche || null,
        })
        .select()
        .single()
      if (error) throw new Error(`Création du contact impossible : ${error.message}`)
      contactId = (contact as { id: string }).id
    }

    // Une fiche acquéreur par contact : on ne duplique pas les critères déjà
    // saisis (le courtier peut les avoir affinés à la main).
    const { data: fiches } = await supabase.from('acquereurs').select('id').eq('contact_id', contactId).limit(1)
    const ficheExistante = (fiches as { id: string }[] | null)?.[0] ?? null
    if (ficheExistante) {
      acquereurId = ficheExistante.id
      actions.push(`Prospect déjà au fichier : ${designation} (critères inchangés)`)
    } else {
      const typologies = liste(plan.prospect_typologies).filter((t): t is (typeof TYPOLOGIES_VALIDES)[number] =>
        (TYPOLOGIES_VALIDES as readonly string[]).includes(t),
      )
      const { data: fiche, error } = await supabase.from('acquereurs').insert({
        ...proprio,
        contact_id: contactId,
        communes_recherchees: liste(plan.prospect_communes),
        typologies,
        budget_valide: montant(plan.prospect_budget),
      })
        .select('id')
        .single()
      if (error) throw new Error(`Création de l'acquéreur impossible : ${error.message}`)
      acquereurId = (fiche as { id: string }).id
      actions.push(`Prospect ajouté au fichier acquéreurs : ${designation}`)
    }
  }

  // ── Offre d'achat : ligne structurée dans `offres` (montant, statut suivable) ─
  // Une offre chiffrée ne doit pas rester une simple note : elle porte la
  // négociation et, à terme, la commission. On la rattache au dossier (obligatoire)
  // et, si on a pu identifier l'acheteur, à sa fiche acquéreur. Le garde-fou
  // `acquereur_non_qualifie` reste vrai : une offre reçue par mail n'a pas été
  // validée par une analyse de solvabilité — au courtier de la lever.
  const offreMontant = montant(plan.offre_montant)
  if (offreMontant && bienId) {
    const dateAuj = new Date().toLocaleDateString('fr-CH', { timeZone: 'Europe/Zurich' })
    // On cherche une offre VIVANTE (reçue / en négociation) du même acheteur sur
    // ce dossier. Une offre révisée (même acheteur, montant différent) MET À JOUR
    // la ligne existante — pas de doublon. Un renvoi identique est ignoré.
    let liveQ = supabase.from('offres').select('id, montant').eq('bien_id', bienId).in('statut', ['recue', 'en_negociation'])
    if (opts.courtierId) liveQ = liveQ.eq('courtier_id', opts.courtierId)
    liveQ = acquereurId ? liveQ.eq('acquereur_id', acquereurId) : liveQ.is('acquereur_id', null)
    const { data: lives } = await liveQ.order('created_at', { ascending: false }).limit(1)
    const live = (lives as { id: string; montant: number }[] | null)?.[0] ?? null

    if (live && Number(live.montant) === offreMontant) {
      actions.push(`Offre déjà enregistrée (doublon ignoré) : CHF ${offreMontant.toLocaleString('de-CH')}.-`)
    } else if (live && acquereurId) {
      // Même acheteur identifié, montant différent → offre révisée : on met à jour.
      const noteRev = `Révisée le ${dateAuj} (précédent : CHF ${Number(live.montant).toLocaleString('de-CH')}.-)${plan.offre_notes ? ` — ${plan.offre_notes}` : ''}`
      const { error } = await supabase.from('offres').update({ montant: offreMontant, statut: 'en_negociation', notes: noteRev }).eq('id', live.id)
      if (error) throw new Error(`Mise à jour de l'offre impossible : ${error.message}`)
      actions.push(`Offre révisée : CHF ${Number(live.montant).toLocaleString('de-CH')}.- → CHF ${offreMontant.toLocaleString('de-CH')}.-`)
    } else {
      const { error } = await supabase.from('offres').insert({
        ...proprio,
        bien_id: bienId,
        acquereur_id: acquereurId,
        montant: offreMontant,
        notes: plan.offre_notes || null,
        acquereur_non_qualifie: true,
      })
      if (error) throw new Error(`Enregistrement de l'offre impossible : ${error.message}`)
      actions.push(`Offre enregistrée : CHF ${offreMontant.toLocaleString('de-CH')}.-${acquereurId ? '' : ' (acheteur à préciser)'}`)
    }
  } else if (offreMontant && !bienId) {
    actions.push("Offre détectée mais non enregistrée : rattache-la à un dossier.")
  }

  if (plan.document_nom && plan.document_statut && bienId) {
    const { data: docs } = await supabase.from('documents').select('id, nom').eq('bien_id', bienId)
    const existant = (docs as { id: string; nom: string }[] | null)?.find((d) => d.nom.toLowerCase().includes(plan.document_nom.toLowerCase()))
    const patch: Record<string, unknown> = { statut: plan.document_statut }
    if (plan.document_statut === 'demande') patch.date_demande = new Date().toISOString().slice(0, 10)
    if (plan.document_statut === 'recu') patch.date_reception = new Date().toISOString().slice(0, 10)
    if (existant) {
      await supabase.from('documents').update(patch).eq('id', existant.id)
      actions.push(`Document « ${existant.nom} » → ${plan.document_statut === 'recu' ? 'reçu' : 'demandé'}`)
    } else {
      await supabase.from('documents').insert({ ...proprio, bien_id: bienId, type: 'autre', nom: plan.document_nom, ...patch })
      actions.push(`Document « ${plan.document_nom} » ajouté (${plan.document_statut === 'recu' ? 'reçu' : 'demandé'})`)
    }
  }

  // Contacts (répertoire) : créer/retrouver les personnes et les relier au dossier.
  if (bienId && plan.contacts?.length) {
    for (const c of plan.contacts) {
      try {
        const nomComplet = [c.prenom, c.nom].filter(Boolean).join(' ').trim()
        let contactId: string | undefined

        // 1. Retrouver un contact existant. Avec un email → UNIQUEMENT sur l'email
        //    (identifiant fiable). Sans email → rapprochement sur nom ET prénom
        //    EXACTS — jamais le nom de famille seul : des co-vendeurs le partagent.
        if (c.email) {
          const { data } = await supabase.from('contacts').select('id').ilike('email', c.email).limit(1).maybeSingle()
          contactId = (data as { id?: string } | null)?.id
        } else if (c.nom || c.prenom) {
          const { data } = await supabase.from('contacts').select('id, prenom').ilike('nom', c.nom || '~introuvable~').limit(10)
          const rows = (data as { id: string; prenom: string | null }[] | null) ?? []
          contactId = rows.find((r) => (r.prenom ?? '').toLowerCase() === (c.prenom || '').toLowerCase())?.id
        }

        // 2. Créer si inconnu.
        if (!contactId) {
          const { data, error } = await supabase
            .from('contacts')
            .insert({ ...proprio, type: c.role, prenom: c.prenom || null, nom: c.nom || null, email: c.email || null, telephone: c.telephone || null })
            .select('id')
            .single()
          if (error || !data) continue
          contactId = (data as { id: string }).id
          actions.push(`Contact ajouté : ${nomComplet || c.email} (${c.role})`)
        }

        // 3. Relier au dossier (idempotent).
        await supabase.from('contacts_biens').upsert(
          { ...proprio, contact_id: contactId, bien_id: bienId, role: c.role || null },
          { onConflict: 'contact_id,bien_id', ignoreDuplicates: true },
        )

        // 4. Vendeur principal du bien si pas encore défini.
        if (c.role === 'vendeur') {
          const { data: b } = await supabase.from('biens').select('vendeur_id').eq('id', bienId).maybeSingle()
          if (b && !(b as { vendeur_id: string | null }).vendeur_id) {
            await supabase.from('biens').update({ vendeur_id: contactId }).eq('id', bienId)
          }
        }
      } catch {
        // Un contact qui échoue ne doit pas bloquer le reste du classement.
      }
    }
  }

  return { actions, bienId }
}

/**
 * Clôture automatique : parmi les tâches OUVERTES du dossier, marque « faite »
 * celles que l'email accomplit réellement. STRICT — une intention future ou une
 * promesse ne clôturent rien. Renvoie les libellés des tâches clôturées.
 */
export async function cloturerTaches(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  client: Anthropic,
  opts: { texte: string; bienId: string; courtierId?: string },
): Promise<string[]> {
  let q = supabase.from('taches').select('id, titre').eq('bien_id', opts.bienId).in('statut', ['a_faire', 'en_cours'])
  if (opts.courtierId) q = q.eq('courtier_id', opts.courtierId)
  const { data } = await q
  const taches = (data as { id: string; titre: string }[] | null) ?? []
  if (!taches.length) return []

  const liste = taches.map((t, i) => `${i + 1}. ${t.titre}`).join('\n')
  const message = await client.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 400,
    system:
      "On te donne un email (souvent rédigé par le courtier lui-même) et la liste des tâches OUVERTES d'un " +
      "dossier. Détermine lesquelles cet email ACCOMPLIT RÉELLEMENT : action effectuée, document envoyé, " +
      "relance faite, question répondue. Sois STRICT : une intention future (« je le ferai », « je vais »), " +
      "une simple mention, une question ou une promesse ne clôturent PAS une tâche. En cas de doute, ne " +
      "clôture pas. Réponds UNIQUEMENT par un tableau JSON des NUMÉROS des tâches accomplies (ex. [1,3]), " +
      "ou [] si aucune.",
    messages: [{ role: 'user', content: `TÂCHES OUVERTES :\n${liste}\n\nEMAIL :\n"""${opts.texte}"""` }],
  })
  const bloc = message.content.find((b) => b.type === 'text')
  const brut = bloc && bloc.type === 'text' ? bloc.text : '[]'
  const m = brut.match(/\[[\s\S]*\]/)
  let nums: number[] = []
  try { nums = (JSON.parse(m ? m[0] : '[]') as unknown[]).map(Number).filter((n) => Number.isInteger(n)) } catch { nums = [] }
  const aClore = taches.filter((_, i) => nums.includes(i + 1))
  const titres: string[] = []
  for (const t of aClore) {
    await supabase.from('taches').update({ statut: 'faite' }).eq('id', t.id)
    titres.push(t.titre)
  }
  return titres
}
