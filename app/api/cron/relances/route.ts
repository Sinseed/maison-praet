/**
 * Point du jour — email quotidien de 7h.
 *
 * Déclenché par le Cron Vercel (voir vercel.json). Lit les données du courtier
 * via la clé service_role (côté serveur uniquement) et envoie un récapitulatif :
 *  · rappels & tâches du jour (et en retard)
 *  · relances prévues
 *  · documents manquants sur les mandats actifs
 *  · dossiers « silencieux » (sans nouvelle depuis un moment)
 *
 * Testable à la main : /api/cron/relances?secret=<CRON_SECRET>
 */

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { SUPABASE_URL } from '@/lib/supabase/config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const DEST = process.env.RELANCES_EMAIL || 'tpraet@golay-immobilier.ch'
const JOURS_SILENCE = 10
const STATUTS_INACTIFS = ['vendu', 'perdu']

const jour = (d: Date | string) => new Date(d).toLocaleDateString('en-CA', { timeZone: 'Europe/Zurich' })

export async function GET(req: Request) {
  // Sécurité : le Cron Vercel envoie « Authorization: Bearer <CRON_SECRET> ».
  const secret = process.env.CRON_SECRET
  if (secret) {
    const url = new URL(req.url)
    const ok = req.headers.get('authorization') === `Bearer ${secret}` || url.searchParams.get('secret') === secret
    if (!ok) return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 })
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY manquante côté serveur.' }, { status: 503 })
  if (!process.env.RESEND_API_KEY) return NextResponse.json({ error: 'RESEND_API_KEY manquante côté serveur.' }, { status: 503 })

  const supa = createClient(SUPABASE_URL, serviceKey, { auth: { persistSession: false } })
  const auj = jour(new Date())

  // Biens (pour libellés + calcul du silence)
  const { data: biensData } = await supa.from('biens').select('id, commune, adresse, statut, created_at')
  const biens = (biensData ?? []) as { id: string; commune: string; adresse: string | null; statut: string; created_at: string }[]
  const label = (id: string | null) => {
    const b = id ? biens.find((x) => x.id === id) : null
    return b ? `${b.commune}${b.adresse ? ` — ${b.adresse}` : ''}` : null
  }
  const biensActifs = biens.filter((b) => !STATUTS_INACTIFS.includes(b.statut))
  const idsActifs = new Set(biensActifs.map((b) => b.id))

  // 1. Tâches & rappels ouverts, échéance <= aujourd'hui
  const { data: tData } = await supa.from('taches').select('titre, echeance, bien_id, statut').in('statut', ['a_faire', 'en_cours'])
  const tachesDues = ((tData ?? []) as { titre: string; echeance: string | null; bien_id: string | null }[])
    .filter((t) => t.echeance && jour(t.echeance) <= auj)
    .sort((a, b) => (a.echeance! < b.echeance! ? -1 : 1))
    .map((t) => ({ titre: t.titre, bien: label(t.bien_id), retard: jour(t.echeance!) < auj }))

  // 2. Relances non faites, prévues <= aujourd'hui
  const { data: rData } = await supa.from('relances').select('type, date_prevue, bien_id').eq('faite', false)
  const relancesDues = ((rData ?? []) as { type: string; date_prevue: string; bien_id: string | null }[])
    .filter((r) => jour(r.date_prevue) <= auj)
    .map((r) => ({ type: r.type, bien: label(r.bien_id) }))

  // 3. Documents manquants / demandés sur biens actifs
  const { data: dData } = await supa.from('documents').select('nom, statut, bien_id').in('statut', ['manquant', 'demande'])
  const docsParBien = new Map<string, string[]>()
  for (const d of (dData ?? []) as { nom: string; statut: string; bien_id: string | null }[]) {
    if (!d.bien_id || !idsActifs.has(d.bien_id)) continue
    const l = label(d.bien_id) ?? 'Dossier'
    const arr = docsParBien.get(l) ?? []
    arr.push(`${d.nom}${d.statut === 'demande' ? ' (demandé)' : ''}`)
    docsParBien.set(l, arr)
  }

  // 4. Dossiers silencieux : aucun échange depuis JOURS_SILENCE jours
  const { data: eData } = await supa.from('echanges').select('bien_id, date_echange')
  const dernier = new Map<string, string>()
  for (const e of (eData ?? []) as { bien_id: string | null; date_echange: string }[]) {
    if (!e.bien_id) continue
    const cur = dernier.get(e.bien_id)
    if (!cur || e.date_echange > cur) dernier.set(e.bien_id, e.date_echange)
  }
  const limite = new Date(Date.now() - JOURS_SILENCE * 86400000)
  const silencieux = biensActifs
    .filter((b) => new Date(b.created_at) < limite)
    .filter((b) => { const l = dernier.get(b.id); return !l || new Date(l) < limite })
    .map((b) => {
      const l = dernier.get(b.id) ?? b.created_at
      return { bien: `${b.commune}${b.adresse ? ` — ${b.adresse}` : ''}`, jours: Math.floor((Date.now() - new Date(l).getTime()) / 86400000) }
    })
    .sort((a, b) => b.jours - a.jours)

  const compte = tachesDues.length + relancesDues.length + docsParBien.size + silencieux.length

  // ── Construction de l'email ────────────────────────────────────────────────
  const dateFr = new Date().toLocaleDateString('fr-CH', { timeZone: 'Europe/Zurich', weekday: 'long', day: 'numeric', month: 'long' })
  const li = (s: string) => `<li style="margin:4px 0;line-height:1.5;">${s}</li>`
  const bloc = (titre: string, items: string[]) =>
    items.length ? `<h2 style="font-size:15px;color:#0C0F14;margin:22px 0 6px;border-bottom:1px solid #eee;padding-bottom:4px;">${titre}</h2><ul style="margin:0;padding-left:18px;color:#333;font-size:14px;">${items.join('')}</ul>` : ''

  const sections = [
    bloc('✅ Rappels & tâches du jour', tachesDues.map((t) =>
      li(`${t.retard ? '<span style="color:#c0392b;font-weight:600;">En retard — </span>' : ''}${t.titre}${t.bien ? ` <span style="color:#999;">· ${t.bien}</span>` : ''}`))),
    bloc('🔔 Relances prévues', relancesDues.map((r) => li(`${r.type}${r.bien ? ` <span style="color:#999;">· ${r.bien}</span>` : ''}`))),
    bloc('📄 Documents à obtenir', Array.from(docsParBien.entries()).map(([b, docs]) => li(`<strong>${b}</strong> : ${docs.join(', ')}`))),
    bloc(`💤 Dossiers sans nouvelle (${JOURS_SILENCE}j+)`, silencieux.map((s) => li(`${s.bien} <span style="color:#999;">· ${s.jours} j</span>`))),
  ].filter(Boolean).join('')

  const corps = compte === 0
    ? `<p style="color:#555;font-size:14px;">Rien d'urgent ce matin — journée dégagée. ☕️</p>`
    : sections

  const html = `<!doctype html><html><body style="margin:0;background:#f4f4f5;padding:24px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;border:1px solid #e5e5e5;">
      <div style="background:#0C0F14;padding:20px 24px;">
        <p style="margin:0;color:#C9A96E;font-size:12px;letter-spacing:2px;text-transform:uppercase;">CourtierOS · Point du jour</p>
        <p style="margin:4px 0 0;color:#fff;font-size:19px;text-transform:capitalize;">${dateFr}</p>
      </div>
      <div style="padding:8px 24px 24px;">
        ${corps}
        <p style="margin:26px 0 0;font-size:12px;color:#aaa;">Ouvre ton espace : <a href="https://maisonpraet.ch/app" style="color:#C9A96E;">maisonpraet.ch/app</a></p>
      </div>
    </div>
  </body></html>`

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Maison Praet <noreply@maisonpraet.ch>',
      to: DEST,
      subject: `☀️ Ton point du jour — ${dateFr}${compte ? ` (${compte})` : ''}`,
      html,
    })
  } catch (e) {
    return NextResponse.json({ error: `Envoi impossible : ${(e as Error).message}` }, { status: 502 })
  }

  return NextResponse.json({
    ok: true,
    envoye_a: DEST,
    resume: { taches: tachesDues.length, relances: relancesDues.length, documents: docsParBien.size, silencieux: silencieux.length },
  })
}
