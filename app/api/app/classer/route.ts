/**
 * Boîte de réception intelligente.
 *
 * POST { texte }            → analyse le texte (mail, note…) et propose un
 *                             classement, SANS rien écrire (mode aperçu).
 * POST { plan, appliquer }  → applique le plan validé (écrit dans le carnet).
 *
 * L'analyse utilise Claude (Anthropic) ; l'écriture passe par la session
 * Supabase de l'utilisateur (la RLS garantit qu'il ne touche que ses données).
 */

import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'
import { TYPE_BIEN_LABELS } from '@/lib/estimation/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface Plan {
  resume: string
  bien_id: string
  nouveau_bien_type: string
  nouveau_bien_commune: string
  nouveau_bien_adresse: string
  echange: string
  canal: string
  tache: string
  document_nom: string
  document_statut: string
}

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    resume: { type: 'string', description: 'Résumé en une phrase de ce qui va être classé.' },
    bien_id: { type: 'string', description: "id du bien concerné parmi la liste fournie, ou chaîne vide si aucun ne correspond." },
    nouveau_bien_type: { type: 'string', enum: ['', 'villa', 'ppe', 'immeuble', 'terrain'], description: "Type d'un nouveau bien à créer, ou vide." },
    nouveau_bien_commune: { type: 'string', description: "Commune du nouveau bien, ou vide." },
    nouveau_bien_adresse: { type: 'string', description: "Adresse du nouveau bien, ou vide." },
    echange: { type: 'string', description: "Contenu de l'échange à consigner dans l'historique, ou vide." },
    canal: { type: 'string', enum: ['note', 'email', 'appel', 'notaire', 'autre'], description: "Canal de l'échange." },
    tache: { type: 'string', description: "Tâche à créer (ex. « Relancer le notaire »), ou vide." },
    document_nom: { type: 'string', description: "Document concerné (ex. « CECB »), ou vide." },
    document_statut: { type: 'string', enum: ['', 'demande', 'recu'], description: "Nouveau statut du document, ou vide." },
  },
  required: [
    'resume', 'bien_id', 'nouveau_bien_type', 'nouveau_bien_commune', 'nouveau_bien_adresse',
    'echange', 'canal', 'tache', 'document_nom', 'document_statut',
  ],
} as const

export async function POST(req: Request) {
  const supabase = createClient()
  const { data: userData } = await supabase.auth.getUser()
  if (!userData.user) {
    return NextResponse.json({ error: 'Non connecté.' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))

  // ── Mode application : on écrit le plan validé ────────────────────────────
  if (body.plan && body.appliquer) {
    const plan = body.plan as Plan
    const actions: string[] = []
    let bienId = plan.bien_id || null

    if (!bienId && plan.nouveau_bien_commune && plan.nouveau_bien_type) {
      const { data: bien, error } = await supabase
        .from('biens')
        .insert({
          type: plan.nouveau_bien_type,
          commune: plan.nouveau_bien_commune,
          adresse: plan.nouveau_bien_adresse || null,
          statut: 'prospection',
        })
        .select()
        .single()
      if (error) return NextResponse.json({ error: `Création du bien impossible : ${error.message}` }, { status: 500 })
      bienId = (bien as { id: string }).id
      actions.push(`Dossier créé : ${plan.nouveau_bien_commune}`)
    }

    if (plan.echange) {
      await supabase.from('echanges').insert({ bien_id: bienId, canal: plan.canal || 'note', contenu: plan.echange })
      actions.push('Échange ajouté à l\'historique')
    }
    if (plan.tache) {
      await supabase.from('taches').insert({ titre: plan.tache, bien_id: bienId, echeance: new Date().toISOString() })
      actions.push(`Tâche créée : ${plan.tache}`)
    }
    if (plan.document_nom && plan.document_statut && bienId) {
      const { data: docs } = await supabase.from('documents').select('id, nom').eq('bien_id', bienId)
      const existant = (docs as { id: string; nom: string }[] | null)?.find((d) =>
        d.nom.toLowerCase().includes(plan.document_nom.toLowerCase()),
      )
      const patch: Record<string, unknown> = { statut: plan.document_statut }
      if (plan.document_statut === 'demande') patch.date_demande = new Date().toISOString().slice(0, 10)
      if (plan.document_statut === 'recu') patch.date_reception = new Date().toISOString().slice(0, 10)
      if (existant) {
        await supabase.from('documents').update(patch).eq('id', existant.id)
        actions.push(`Document « ${existant.nom} » → ${plan.document_statut === 'recu' ? 'reçu' : 'demandé'}`)
      } else {
        await supabase.from('documents').insert({ bien_id: bienId, type: 'autre', nom: plan.document_nom, ...patch })
        actions.push(`Document « ${plan.document_nom} » ajouté (${plan.document_statut === 'recu' ? 'reçu' : 'demandé'})`)
      }
    }

    return NextResponse.json({ ok: true, actions, bienId })
  }

  // ── Mode analyse : Claude propose un classement ───────────────────────────
  const texte = (body.texte as string)?.trim()
  if (!texte) return NextResponse.json({ error: 'Texte vide.' }, { status: 400 })

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "Classement IA non configuré (clé ANTHROPIC_API_KEY manquante côté serveur)." }, { status: 503 })
  }

  const { data: biens } = await supabase.from('biens').select('id, type, commune, adresse').order('created_at', { ascending: false })
  const listeBiens = ((biens as { id: string; type: string; commune: string; adresse: string | null }[]) ?? [])
    .map((b) => `- id=${b.id} | ${TYPE_BIEN_LABELS[b.type as keyof typeof TYPE_BIEN_LABELS] ?? b.type} à ${b.commune}${b.adresse ? ` (${b.adresse})` : ''}`)
    .join('\n') || '(aucun dossier existant)'

  const client = new Anthropic()
  let plan: Plan
  try {
    const message = await client.messages.create({
      model: 'claude-opus-5',
      max_tokens: 2000,
      system:
        "Tu es l'assistant de classement d'un courtier immobilier vaudois. On te donne un élément brut " +
        "(mail transféré, note, appel) et la liste des dossiers (biens) existants. Détermine à quel dossier " +
        "il se rattache (renvoie son id exact dans `bien_id`) ou s'il faut en créer un nouveau. Extrais, s'il " +
        "y a lieu : un échange à consigner, une tâche de suivi, un changement de statut de document " +
        "(ex. CECB demandé/reçu). Laisse vides (chaîne vide) les champs non pertinents.\n\n" +
        'Réponds UNIQUEMENT par un objet JSON valide, sans aucun texte autour, avec exactement ces clés ' +
        '(toutes des chaînes de caractères) : ' +
        JSON.stringify(SCHEMA.required) +
        `. Contraintes : nouveau_bien_type ∈ ["","villa","ppe","immeuble","terrain"] ; ` +
        `canal ∈ ["note","email","appel","notaire","autre"] ; document_statut ∈ ["","demande","recu"].`,
      messages: [
        { role: 'user', content: `Dossiers existants :\n${listeBiens}\n\nÉlément à classer :\n"""${texte}"""` },
      ],
    })
    const bloc = message.content.find((b) => b.type === 'text')
    const brut = bloc && bloc.type === 'text' ? bloc.text : '{}'
    const match = brut.match(/\{[\s\S]*\}/)
    const parsed = JSON.parse(match ? match[0] : brut) as Partial<Plan>
    plan = {
      resume: parsed.resume ?? '',
      bien_id: parsed.bien_id ?? '',
      nouveau_bien_type: parsed.nouveau_bien_type ?? '',
      nouveau_bien_commune: parsed.nouveau_bien_commune ?? '',
      nouveau_bien_adresse: parsed.nouveau_bien_adresse ?? '',
      echange: parsed.echange ?? '',
      canal: parsed.canal ?? 'note',
      tache: parsed.tache ?? '',
      document_nom: parsed.document_nom ?? '',
      document_statut: parsed.document_statut ?? '',
    }
  } catch (e) {
    return NextResponse.json({ error: 'Analyse impossible. Réessayez.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true, plan })
}
