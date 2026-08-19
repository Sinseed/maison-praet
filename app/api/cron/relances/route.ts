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
  const dateAff = dateFr.charAt(0).toUpperCase() + dateFr.slice(1)
  const tagRetard = '<span style="background:#f7e7e5;color:#b23b32;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.4px;padding:2px 7px;border-radius:11px;">En retard</span>&nbsp;&nbsp;'

  // Lignes aérées, séparateur fin, pastille de priorité — rendu fiable (tableaux).
  const carte = (p: Prio) =>
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;"><tr>` +
    `<td width="18" valign="top" style="padding:15px 0;"><div style="width:7px;height:7px;border-radius:50%;background:${p.retard ? '#c0392b' : '#C9A96E'};"></div></td>` +
    `<td style="padding:15px 0;border-bottom:1px solid #efece5;">` +
    `<a href="${p.url}" style="color:#14161a;font-size:15px;font-weight:600;line-height:1.45;text-decoration:none;">${court(p.titre)}</a>` +
    `<div style="margin-top:5px;color:#a59f95;font-size:12px;">${p.retard ? tagRetard : ''}${p.sous ?? 'non rattaché'}</div>` +
    `</td></tr></table>`
  const reste = priorites.length > MAX
    ? `<div style="margin:14px 0 0;font-size:13px;color:#a59f95;">+ ${priorites.length - MAX} autre(s) — <a href="${APP}" style="color:#a8823f;text-decoration:none;font-weight:600;">tout voir</a></div>`
    : ''

  const label2 = (t: string) => `<div style="margin:30px 0 4px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#a8823f;font-weight:700;">${t}</div>`
  const petit = (titre: string, lignes: string[]) => (lignes.length ? label2(titre) + lignes.join('') : '')
  const ligneSec = (url: string, contenu: string) =>
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;"><tr><td style="padding:10px 0;border-bottom:1px solid #efece5;">` +
    `<a href="${url}" style="color:#3a3a38;font-size:13px;line-height:1.5;text-decoration:none;">${contenu}</a></td></tr></table>`
  const docLignes = Array.from(docsParBien.entries()).slice(0, 4).map(([id, e]) =>
    ligneSec(href(id), `<strong style="color:#14161a;">${e.label}</strong> &nbsp;<span style="color:#a59f95;">${court(e.docs.join(', '), 80)}</span>`))
  if (docsParBien.size > 4) docLignes.push(`<div style="margin:10px 0 0;font-size:12px;color:#a59f95;">+ ${docsParBien.size - 4} autre(s) dossier(s)…</div>`)
  const silLignes = silencieux.slice(0, 3).map((s) =>
    ligneSec(href(s.id), `${s.bien} &nbsp;<span style="color:#a59f95;">${s.jours} j sans nouvelle</span>`))

  const enRetard = priorites.filter((p) => p.retard).length
  const resume = priorites.length ? `${priorites.length} priorité${priorites.length > 1 ? 's' : ''}${enRetard ? ` · ${enRetard} en retard` : ''}` : 'Journée dégagée'
  const essentiel = priorites.length
    ? label2("L'essentiel aujourd'hui") + priorites.slice(0, MAX).map(carte).join('') + reste
    : `<div style="padding:30px 20px;text-align:center;color:#8a857c;font-size:15px;">Rien d'urgent ce matin.<br/><span style="color:#b8b2a8;font-size:13px;">Journée dégagée ☕</span></div>`

  const bouton =
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding-top:30px;">` +
    `<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:#C9A96E;border-radius:999px;">` +
    `<a href="${APP}" style="display:inline-block;padding:14px 32px;color:#14161a;font-size:14px;font-weight:600;letter-spacing:.3px;text-decoration:none;">Ouvrir mon tableau de bord →</a>` +
    `</td></tr></table></td></tr></table>`

  const html = `<!doctype html><html><body style="margin:0;background:#f4f2ee;padding:28px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:18px;overflow:hidden;border:1px solid #eceae4;box-shadow:0 4px 20px rgba(20,22,26,0.06);">
      <div style="background:#0C0F14;padding:32px 34px 28px;">
        <div style="color:#C9A96E;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Point du jour</div>
        <div style="margin-top:12px;color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:27px;font-weight:400;line-height:1.1;">Bonjour Thomas</div>
        <div style="margin-top:8px;color:#8b8f96;font-size:13px;">${dateAff} · ${resume}</div>
      </div>
      <div style="padding:26px 34px 34px;">
        ${essentiel}
        ${petit('Documents à obtenir', docLignes)}
        ${petit(`Dossiers sans nouvelle (${JOURS_SILENCE}j+)`, silLignes)}
        ${bouton}
      </div>
    </div>
    <div style="max-width:600px;margin:16px auto 0;text-align:center;color:#b8b2a8;font-size:11px;">CourtierOS · Maison Praet</div>
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
