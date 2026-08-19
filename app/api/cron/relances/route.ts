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
  const url = new URL(req.url)
  const secret = process.env.CRON_SECRET
  if (secret) {
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
    .map((t) => ({ titre: t.titre, bien: label(t.bien_id), bienId: t.bien_id, retard: jour(t.echeance!) < auj }))

  // 2. Relances non faites, prévues <= aujourd'hui
  const { data: rData } = await supa.from('relances').select('type, date_prevue, bien_id').eq('faite', false)
  const relancesDues = ((rData ?? []) as { type: string; date_prevue: string; bien_id: string | null }[])
    .filter((r) => jour(r.date_prevue) <= auj)
    .map((r) => ({ type: r.type, bien: label(r.bien_id), bienId: r.bien_id, retard: jour(r.date_prevue) < auj }))

  // 3. Documents manquants / demandés sur biens actifs
  const { data: dData } = await supa.from('documents').select('nom, statut, bien_id').in('statut', ['manquant', 'demande'])
  const docsParBien = new Map<string, { label: string; docs: string[] }>()
  for (const d of (dData ?? []) as { nom: string; statut: string; bien_id: string | null }[]) {
    if (!d.bien_id || !idsActifs.has(d.bien_id)) continue
    const entree = docsParBien.get(d.bien_id) ?? { label: label(d.bien_id) ?? 'Dossier', docs: [] }
    entree.docs.push(`${d.nom}${d.statut === 'demande' ? ' (demandé)' : ''}`)
    docsParBien.set(d.bien_id, entree)
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
      return { id: b.id, bien: `${b.commune}${b.adresse ? ` — ${b.adresse}` : ''}`, jours: Math.floor((Date.now() - new Date(l).getTime()) / 86400000) }
    })
    .sort((a, b) => b.jours - a.jours)

  // ── Construction de l'email : court, priorisé, cliquable ────────────────────
  const APP = 'https://maisonpraet.ch/app'
  const href = (bienId: string | null) => (bienId ? `${APP}/biens/${bienId}` : APP)
  const dateFr = new Date().toLocaleDateString('fr-CH', { timeZone: 'Europe/Zurich', weekday: 'long', day: 'numeric', month: 'long' })

  // Priorités = tâches + relances dues, EN RETARD d'abord.
  type Prio = { titre: string; sous: string | null; retard: boolean; url: string }
  const priorites: Prio[] = [
    ...tachesDues.map((t) => ({ titre: t.titre, sous: t.bien, retard: t.retard, url: href(t.bienId) })),
    ...relancesDues.map((r) => ({ titre: `Relance ${r.type}`, sous: r.bien, retard: r.retard, url: href(r.bienId) })),
  ].sort((a, b) => Number(b.retard) - Number(a.retard))
  const compte = priorites.length + docsParBien.size + silencieux.length

  const MAX = 6
  const court = (s: string, n = 90) => (s.length > n ? `${s.slice(0, n - 1).trim()}…` : s)
  // Cartes en TABLEAU (le seul rendu fiable dans Outlook/Gmail).
  const carte = (p: Prio) =>
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;margin:0 0 8px;"><tr>` +
    `<td style="padding:11px 14px;background:#fafafa;border:1px solid #eee;border-left:3px solid ${p.retard ? '#c0392b' : '#C9A96E'};border-radius:6px;">` +
    `<div style="margin:0 0 3px;line-height:1.35;"><a href="${p.url}" style="color:#0C0F14;font-size:15px;font-weight:600;text-decoration:none;">${court(p.titre)}</a></div>` +
    `<div style="color:#888;font-size:12px;">${p.retard ? '<span style="color:#c0392b;font-weight:600;">En retard</span> · ' : ''}${p.sous ?? 'non rattaché'}</div>` +
    `</td></tr></table>`
  const reste = priorites.length > MAX
    ? `<div style="margin:8px 0 0;font-size:13px;color:#999;">+ ${priorites.length - MAX} autre(s) à faire — <a href="${APP}" style="color:#C9A96E;">voir l'app</a></div>`
    : ''

  const petit = (titre: string, lignes: string[]) =>
    lignes.length ? `<div style="margin:24px 0 8px;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#999;">${titre}</div>${lignes.join('')}` : ''
  const docLignes = Array.from(docsParBien.entries()).slice(0, 4).map(([id, e]) =>
    `<div style="margin:5px 0;font-size:13px;color:#333;line-height:1.4;"><a href="${href(id)}" style="color:#333;text-decoration:none;">📄 <strong style="color:#0C0F14;">${e.label}</strong> — ${court(e.docs.join(', '), 80)}</a></div>`)
  if (docsParBien.size > 4) docLignes.push(`<div style="margin:5px 0;font-size:12px;color:#999;">+ ${docsParBien.size - 4} autre(s) dossier(s)…</div>`)
  const silLignes = silencieux.slice(0, 3).map((s) =>
    `<div style="margin:5px 0;font-size:13px;color:#333;"><a href="${href(s.id)}" style="color:#333;text-decoration:none;">💤 ${s.bien} <span style="color:#999;">· ${s.jours} j sans nouvelle</span></a></div>`)

  const essentiel = priorites.length
    ? `<p style="margin:2px 0 8px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#C9A96E;font-weight:700;">⚡ L'essentiel aujourd'hui</p>${priorites.slice(0, MAX).map(carte).join('')}${reste}`
    : `<div style="padding:20px;background:#fafafa;border:1px solid #eee;border-radius:8px;text-align:center;color:#555;font-size:15px;">Rien d'urgent ce matin — journée dégagée ☕️</div>`
  const enRetard = priorites.filter((p) => p.retard).length
  const resume = priorites.length ? `${priorites.length} priorité${priorites.length > 1 ? 's' : ''}${enRetard ? ` · ${enRetard} en retard` : ''}` : 'Journée dégagée'

  const bouton =
    `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px 0 2px;"><tr><td style="background:#C9A96E;border-radius:6px;">` +
    `<a href="${APP}" style="display:inline-block;padding:13px 24px;color:#0C0F14;font-size:14px;font-weight:600;text-decoration:none;">Ouvrir mon tableau de bord →</a></td></tr></table>`

  const html = `<!doctype html><html><body style="margin:0;background:#f4f4f5;padding:24px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e5e5;">
      <div style="background:#0C0F14;padding:22px 26px;">
        <p style="margin:0;color:#C9A96E;font-size:11px;letter-spacing:2px;text-transform:uppercase;">CourtierOS · Point du jour</p>
        <p style="margin:6px 0 0;color:#fff;font-size:20px;">Bonjour Thomas 👋</p>
        <p style="margin:2px 0 0;color:#9aa0a6;font-size:13px;text-transform:capitalize;">${dateFr} · ${resume}</p>
      </div>
      <div style="padding:20px 26px 26px;">
        ${essentiel}
        ${petit('📄 Documents à obtenir', docLignes)}
        ${petit(`💤 Dossiers sans nouvelle (${JOURS_SILENCE}j+)`, silLignes)}
        ${bouton}
      </div>
    </div>
  </body></html>`

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Maison Praet <noreply@maisonpraet.ch>',
      to: DEST,
      subject: priorites.length
        ? `⚡ ${priorites.length} priorité${priorites.length > 1 ? 's' : ''} aujourd'hui${enRetard ? ` (${enRetard} en retard)` : ''}`
        : `☀️ Journée dégagée — ${dateFr}`,
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
