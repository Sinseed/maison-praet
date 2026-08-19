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
  contacts: PlanContact[]
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
    .slice(0, 10)
}

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
})

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
      `Nous sommes le ${opts.aujourdhui}. IMPORTANT : si le texte mentionne une date limite ou une échéance ` +
      "(« pour le 2 août », « d'ici vendredi », « avant la fin du mois »…), déduis la date correspondante et " +
      "mets-la dans tache_echeance au format AAAA-MM-JJ (année à venir si le mois est déjà passé). Crée alors " +
      "une tâche claire décrivant l'action attendue. Sans date explicite, laisse tache_echeance vide.\n\n" +
      "PERSONNES : repère toutes les personnes citées avec un minimum d'information (vendeurs, acquéreurs, " +
      "notaires, artisans, banquiers…) et liste-les dans `contacts`. Pour chacune : prenom, nom, role " +
      `(∈ ["vendeur","acquereur","notaire","courtier_tiers","artisan","autre"]), email, telephone — champs ` +
      "inconnus laissés en chaîne vide. N'invente jamais un email ou un nom absent du texte.\n\n" +
      'Réponds UNIQUEMENT par un objet JSON valide, sans aucun texte autour, avec exactement ces clés : ' +
      JSON.stringify([...PLAN_KEYS, 'contacts']) +
      '. Toutes les valeurs sont des chaînes SAUF `contacts`, qui est un tableau d\'objets ' +
      '{prenom, nom, role, email, telephone} (tableau vide si aucune personne).' +
      ` Contraintes : nouveau_bien_type ∈ ["","villa","ppe","immeuble","terrain"] ; ` +
      `canal ∈ ["note","email","appel","notaire","autre"] ; document_statut ∈ ["","demande","recu"].`,
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

        // 1. Retrouver un contact existant (email prioritaire, sinon nom+prénom).
        if (c.email) {
          const { data } = await supabase.from('contacts').select('id').ilike('email', c.email).limit(1).maybeSingle()
          contactId = (data as { id?: string } | null)?.id
        }
        if (!contactId && c.nom) {
          const { data } = await supabase.from('contacts').select('id, prenom').ilike('nom', c.nom).limit(5)
          const rows = (data as { id: string; prenom: string | null }[] | null) ?? []
          const exact = rows.find((r) => (r.prenom ?? '').toLowerCase() === c.prenom.toLowerCase())
          contactId = exact?.id ?? (rows.length === 1 ? rows[0].id : undefined)
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
