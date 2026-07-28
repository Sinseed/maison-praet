/**
 * Webhook de réception d'emails (Resend Inbound).
 *
 * Flux : le courtier transfère un mail à son adresse dédiée → Resend reçoit,
 * puis appelle ce webhook avec l'événement « email.received » (métadonnées
 * seulement). On récupère le corps via l'API Resend, on classe avec le moteur
 * partagé, on écrit dans la base (service_role) et on envoie un accusé.
 *
 * Sécurité : un secret dans l'URL (?key=<CRON_SECRET>) + une liste blanche
 * d'expéditeurs autorisés (le courtier lui-même) — personne d'autre ne peut
 * alimenter la base par email.
 */

import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL } from '@/lib/supabase/config'
import { analyserTexte, appliquerPlan, type BienContexte } from '@/lib/inbox/classer-core'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const adresse = (v: string) => (v.match(/<([^>]+)>/)?.[1] ?? v).trim().toLowerCase()
const sansHtml = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

export async function POST(req: Request) {
  // 1. Secret d'URL (réutilise CRON_SECRET).
  const secret = process.env.CRON_SECRET
  if (secret && new URL(req.url).searchParams.get('key') !== secret) {
    return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  if (!body || body.type !== 'email.received') {
    return NextResponse.json({ ignored: 'type' }) // 200 : on ignore poliment
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey || !process.env.ANTHROPIC_API_KEY || !process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'Configuration serveur incomplète.' }, { status: 503 })
  }

  const d = (body.data ?? {}) as Record<string, unknown>
  const emailId = (d.email_id ?? d.id) as string | undefined
  const from = adresse((d.from as string) ?? '')

  // 2. Liste blanche d'expéditeurs (le courtier).
  const autorises = (process.env.INBOUND_ALLOWED_SENDERS || 'tpraet@golay-immobilier.ch,thom.praet@gmail.com')
    .split(',').map((s) => s.trim().toLowerCase()).filter(Boolean)
  if (autorises.length && !autorises.includes(from)) {
    return NextResponse.json({ ignored: 'sender', from })
  }

  // Lire un mail reçu nécessite une clé « accès complet » (RESEND_INBOUND_KEY).
  // La clé d'envoi habituelle (RESEND_API_KEY) est « envoi seulement » et sert
  // de repli pour l'accusé. Une clé accès complet couvre lecture ET envoi.
  const resend = new Resend(process.env.RESEND_INBOUND_KEY || process.env.RESEND_API_KEY)

  // 3. Corps du mail : d'abord dans le payload du webhook (si présent), sinon
  //    on va le chercher via l'API Resend. On fait remonter l'erreur exacte.
  let sujet = (d.subject as string) ?? ''
  let texte = ((d.text as string) ?? (d.plain as string) ?? (d.html ? sansHtml(d.html as string) : '') ?? '').slice(0, 8000)

  if (!texte) {
    if (!emailId) return NextResponse.json({ ignored: 'no-id' })
    try {
      const { data, error } = await resend.emails.receiving.get(emailId)
      if (error || !data) {
        return NextResponse.json({ error: `Corps indisponible : ${error ? JSON.stringify(error) : 'réponse vide'}` }, { status: 502 })
      }
      sujet = data.subject || sujet
      texte = ((data.text || (data.html ? sansHtml(data.html) : '')) || '').slice(0, 8000)
    } catch (e) {
      return NextResponse.json({ error: `Lecture impossible : ${(e as Error).message}` }, { status: 502 })
    }
  }
  const contenu = `${sujet ? `Objet : ${sujet}\n\n` : ''}${texte}`.trim()
  if (!contenu) return NextResponse.json({ ignored: 'empty' })

  // 4. Contexte : courtier + dossiers existants (service_role).
  const supa = createClient(SUPABASE_URL, serviceKey, { auth: { persistSession: false } })
  const { data: profil } = await supa.from('profils').select('id, email').limit(1).maybeSingle()
  const courtierId = (profil as { id: string } | null)?.id
  if (!courtierId) return NextResponse.json({ error: 'Aucun courtier enregistré.' }, { status: 500 })
  const destinataire = (profil as { email: string | null } | null)?.email || process.env.RELANCES_EMAIL || 'tpraet@golay-immobilier.ch'

  const { data: biens } = await supa.from('biens').select('id, type, commune, adresse').order('created_at', { ascending: false })
  const aujourdhui = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Zurich' })

  // 5. Classer + écrire.
  let actions: string[] = []
  let bienId: string | null = null
  try {
    const plan = await analyserTexte(new Anthropic(), { texte: contenu, biens: (biens as BienContexte[]) ?? [], aujourdhui })
    const res = await appliquerPlan(supa, plan, { courtierId })
    actions = res.actions
    bienId = res.bienId
  } catch (e) {
    return NextResponse.json({ error: `Classement impossible : ${(e as Error).message}` }, { status: 500 })
  }

  // 6. Accusé de classement au courtier — seulement s'il y a eu quelque chose à
  //    classer (un mail sans action ne consomme aucun envoi), et désactivable
  //    entièrement via INBOUND_CONFIRM=off pour préserver le quota d'envoi.
  const confirmerActif = process.env.INBOUND_CONFIRM !== 'off' && actions.length > 0
  if (confirmerActif) try {
    const lignes = actions.map((a) => `<li>${a}</li>`).join('')
    const lien = bienId ? `https://maisonpraet.ch/app/biens/${bienId}` : 'https://maisonpraet.ch/app'
    await resend.emails.send({
      from: 'Maison Praet <noreply@maisonpraet.ch>',
      to: destinataire,
      subject: `📥 Classé : ${sujet || 'nouvel élément'}`,
      html: `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#222;font-size:14px;line-height:1.5;">
        <p>Ton email transféré a été classé automatiquement :</p>
        <ul>${lignes}</ul>
        <p><a href="${lien}" style="color:#C9A96E;">Ouvrir dans CourtierOS →</a></p>
        <p style="color:#999;font-size:12px;">Vérifie et corrige si besoin dans l'app.</p>
      </div>`,
    })
  } catch {
    // L'accusé est secondaire : le classement a déjà réussi.
  }

  return NextResponse.json({ ok: true, actions, bienId })
}
