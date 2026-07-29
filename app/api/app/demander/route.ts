/**
 * « Demander à l'app » — questions en langage naturel sur ses propres données.
 *
 * Ex. : « Est-ce que je me suis mis un rappel pour le champagne de Cossonay ? »
 *       « Quels documents manquent encore pour Prilly ? »
 *       « Qui cherche un 4,5 pièces vers Morges ? »
 *
 * On rassemble le contexte (tâches, échanges, documents, biens, acquéreurs) via
 * la session Supabase de l'utilisateur (RLS), puis Claude répond en s'appuyant
 * UNIQUEMENT sur ces données.
 */

import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'
import { TYPE_BIEN_LABELS } from '@/lib/estimation/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const jour = (d: string | null) => (d ? new Date(d).toLocaleDateString('fr-CH', { timeZone: 'Europe/Zurich' }) : '—')

export async function POST(req: Request) {
  const supabase = createClient()
  const { data: userData } = await supabase.auth.getUser()
  if (!userData.user) return NextResponse.json({ error: 'Non connecté.' }, { status: 401 })

  const body = await req.json().catch(() => ({}))
  const question = (body.question as string)?.trim()
  if (!question) return NextResponse.json({ error: 'Question vide.' }, { status: 400 })

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "Assistant non configuré (clé ANTHROPIC_API_KEY manquante côté serveur)." }, { status: 503 })
  }

  // Contexte : on borne les volumes pour rester économique.
  const [biensR, tachesR, echangesR, documentsR, acquereursR, contactsR] = await Promise.all([
    supabase.from('biens').select('id, type, commune, adresse, statut, created_at').order('created_at', { ascending: false }).limit(100),
    supabase.from('taches').select('titre, statut, echeance, bien_id, created_at').order('created_at', { ascending: false }).limit(200),
    supabase.from('echanges').select('canal, contenu, date_echange, bien_id').order('date_echange', { ascending: false }).limit(200),
    supabase.from('documents').select('nom, statut, bien_id').limit(300),
    supabase.from('acquereurs').select('contact_id, budget_valide, communes_recherchees').limit(200),
    supabase.from('contacts').select('id, prenom, nom, telephone').limit(400),
  ])

  const biens = (biensR.data ?? []) as { id: string; type: string; commune: string; adresse: string | null; statut: string; created_at: string }[]
  const bienNom = (id: string | null) => {
    const b = id ? biens.find((x) => x.id === id) : null
    return b ? `${b.commune}${b.adresse ? ` (${b.adresse})` : ''}` : 'sans dossier'
  }
  const contacts = new Map(((contactsR.data ?? []) as { id: string; prenom: string | null; nom: string | null; telephone: string | null }[]).map((c) => [c.id, c]))

  const ctxBiens = biens.map((b) => `- ${TYPE_BIEN_LABELS[b.type as keyof typeof TYPE_BIEN_LABELS] ?? b.type} à ${b.commune}${b.adresse ? ` (${b.adresse})` : ''} — statut ${b.statut}`).join('\n') || '(aucun)'
  const ctxTaches = ((tachesR.data ?? []) as { titre: string; statut: string; echeance: string | null; bien_id: string | null }[])
    .map((t) => `- [${t.statut === 'faite' ? 'FAITE' : 'à faire'}] ${t.titre} — échéance ${jour(t.echeance)} — dossier : ${bienNom(t.bien_id)}`).join('\n') || '(aucune)'
  const ctxEchanges = ((echangesR.data ?? []) as { canal: string; contenu: string; date_echange: string; bien_id: string | null }[])
    .map((e) => `- ${jour(e.date_echange)} (${e.canal}, ${bienNom(e.bien_id)}) : ${e.contenu}`).join('\n') || '(aucun)'
  const ctxDocs = ((documentsR.data ?? []) as { nom: string; statut: string; bien_id: string | null }[])
    .map((d) => `- ${d.nom} — ${d.statut} — dossier : ${bienNom(d.bien_id)}`).join('\n') || '(aucun)'
  const ctxAcq = ((acquereursR.data ?? []) as { contact_id: string | null; budget_valide: number | null; communes_recherchees: string[] | null }[])
    .map((a) => {
      const c = a.contact_id ? contacts.get(a.contact_id) : null
      const nom = c ? [c.prenom, c.nom].filter(Boolean).join(' ') : 'Acquéreur'
      return `- ${nom || 'Acquéreur'} — budget ${a.budget_valide ? `CHF ${a.budget_valide}` : '?'} — communes ${a.communes_recherchees?.join(', ') || '?'}`
    }).join('\n') || '(aucun)'

  const contexte =
    `# DOSSIERS (BIENS)\n${ctxBiens}\n\n# TÂCHES & RAPPELS\n${ctxTaches}\n\n# ÉCHANGES (HISTORIQUE)\n${ctxEchanges}\n\n# DOCUMENTS\n${ctxDocs}\n\n# ACQUÉREURS\n${ctxAcq}`

  try {
    const client = new Anthropic()
    const message = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1000,
      system:
        "Tu es l'assistant personnel d'un courtier immobilier vaudois. Réponds à sa question en t'appuyant " +
        "UNIQUEMENT sur les données ci-dessous (ses dossiers, tâches, échanges, documents, acquéreurs). " +
        "Sois direct et concret, en français, en 1 à 3 phrases. Si l'information ne figure pas dans les données, " +
        "dis-le clairement (ex. « Aucun rappel de ce type n'est enregistré. ») plutôt que d'inventer. " +
        "Cite la date ou le dossier concerné quand c'est utile.\n\n" +
        `DONNÉES DU COURTIER :\n${contexte}`,
      messages: [{ role: 'user', content: question }],
    })
    const bloc = message.content.find((b) => b.type === 'text')
    const reponse = bloc && bloc.type === 'text' ? bloc.text.trim() : "Je n'ai pas pu formuler de réponse."
    return NextResponse.json({ ok: true, reponse })
  } catch {
    return NextResponse.json({ error: 'Réponse impossible. Réessayez.' }, { status: 502 })
  }
}
