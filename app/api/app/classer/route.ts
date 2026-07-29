/**
 * Boîte de réception intelligente (Réception manuelle).
 *
 * POST { texte }            → analyse le texte et propose un classement (aperçu).
 * POST { plan, appliquer }  → applique le plan validé.
 *
 * L'analyse utilise Claude ; l'écriture passe par la session Supabase de
 * l'utilisateur (la RLS garantit qu'il ne touche que ses données). Le moteur
 * est partagé avec le webhook /api/inbound (voir lib/inbox/classer-core).
 */

import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'
import { analyserTexte, appliquerPlan, type BienContexte, type Plan } from '@/lib/inbox/classer-core'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const supabase = createClient()
  const { data: userData } = await supabase.auth.getUser()
  if (!userData.user) {
    return NextResponse.json({ error: 'Non connecté.' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))

  // ── Mode application : on écrit le plan validé ────────────────────────────
  if (body.plan && body.appliquer) {
    try {
      const { actions, bienId } = await appliquerPlan(supabase, body.plan as Plan)
      return NextResponse.json({ ok: true, actions, bienId })
    } catch (e) {
      return NextResponse.json({ error: (e as Error).message }, { status: 500 })
    }
  }

  // ── Mode analyse : Claude propose un classement ───────────────────────────
  const texte = (body.texte as string)?.trim()
  if (!texte) return NextResponse.json({ error: 'Texte vide.' }, { status: 400 })

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "Classement IA non configuré (clé ANTHROPIC_API_KEY manquante côté serveur)." }, { status: 503 })
  }

  const { data: biens } = await supabase.from('biens').select('id, type, commune, adresse').order('created_at', { ascending: false })
  const aujourdhui = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Zurich' })

  try {
    const plan = await analyserTexte(new Anthropic(), { texte, biens: (biens as BienContexte[]) ?? [], aujourdhui })
    return NextResponse.json({ ok: true, plan, biens: biens ?? [] })
  } catch {
    return NextResponse.json({ error: 'Analyse impossible. Réessayez.' }, { status: 502 })
  }
}
