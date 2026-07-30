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
}

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
] as const

/** Typologies acceptées par l'enum `type_bien` de la base. */
const TYPOLOGIES_VALIDES = ['villa', 'ppe', 'immeuble', 'terrain'] as const

const planParDefaut = (p: Partial<Plan>): Plan => ({
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
  prospect_societe: p.prospect_societe ?? '',
  prospect_prenom: p.prospect_prenom ?? '',
  prospect_nom: p.prospect_nom ?? '',
  prospect_email: p.prospect_email ?? '',
  prospect_telephone: p.prospect_telephone ?? '',
  prospect_recherche: p.prospect_recherche ?? '',
  prospect_communes: p.prospect_communes ?? '',
  prospect_typologies: p.prospect_typologies ?? '',
  prospect_budget: p.prospect_budget ?? '',
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
    max_tokens: 2000,
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
      `Nous sommes le ${opts.aujourdhui}. IMPORTANT : si le texte mentionne une date limite ou une échéance ` +
      "(« pour le 2 août », « d'ici vendredi », « avant la fin du mois »…), déduis la date correspondante et " +
      "mets-la dans tache_echeance au format AAAA-MM-JJ (année à venir si le mois est déjà passé). Crée alors " +
      "une tâche claire décrivant l'action attendue. Sans date explicite, laisse tache_echeance vide.\n\n" +
      'Réponds UNIQUEMENT par un objet JSON valide, sans aucun texte autour, avec exactement ces clés ' +
      '(toutes des chaînes de caractères) : ' +
      JSON.stringify(PLAN_KEYS) +
      `. Contraintes : nouveau_bien_type ∈ ["","villa","ppe","immeuble","terrain"] ; ` +
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
    await supabase.from('echanges').insert({ ...proprio, bien_id: bienId, canal: plan.canal || 'note', contenu: plan.echange })
    actions.push("Échange ajouté à l'historique")
  }

  if (plan.tache) {
    const dateOk = /^\d{4}-\d{2}-\d{2}$/.test(plan.tache_echeance || '')
    const echeance = dateOk ? new Date(`${plan.tache_echeance}T08:00:00`).toISOString() : new Date().toISOString()
    await supabase.from('taches').insert({ ...proprio, titre: plan.tache, bien_id: bienId, echeance })
    actions.push(`Tâche créée : ${plan.tache}${dateOk ? ` (rappel le ${plan.tache_echeance})` : ''}`)
  }

  // ── Prospect acquéreur : contact + fiche acquéreur (avec ses critères) ────
  // Sans cela, un acheteur repéré dans un mail resterait une simple note dans
  // l'historique d'un dossier : il ne remonterait jamais dans le matching.
  const identite = plan.prospect_societe || plan.prospect_nom || plan.prospect_prenom
  if (identite) {
    const designation = plan.prospect_societe || [plan.prospect_prenom, plan.prospect_nom].filter(Boolean).join(' ')

    // Dédoublonnage : un même acheteur peut écrire plusieurs fois. On cherche
    // d'abord sur l'e-mail (identifiant le plus fiable), sinon sur la société.
    let requete = supabase.from('contacts').select('id')
    if (opts.courtierId) requete = requete.eq('courtier_id', opts.courtierId)
    requete = plan.prospect_email
      ? requete.eq('email', plan.prospect_email)
      : requete.eq('societe', plan.prospect_societe || '~introuvable~')
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
    if ((fiches as { id: string }[] | null)?.length) {
      actions.push(`Prospect déjà au fichier : ${designation} (critères inchangés)`)
    } else {
      const typologies = liste(plan.prospect_typologies).filter((t): t is (typeof TYPOLOGIES_VALIDES)[number] =>
        (TYPOLOGIES_VALIDES as readonly string[]).includes(t),
      )
      const { error } = await supabase.from('acquereurs').insert({
        ...proprio,
        contact_id: contactId,
        communes_recherchees: liste(plan.prospect_communes),
        typologies,
        budget_valide: montant(plan.prospect_budget),
      })
      if (error) throw new Error(`Création de l'acquéreur impossible : ${error.message}`)
      actions.push(`Prospect ajouté au fichier acquéreurs : ${designation}`)
    }
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

  return { actions, bienId }
}
