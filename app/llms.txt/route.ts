import { ARTICLES, MANDATS, CHIFFRES, VENTES_PALIER } from '../data'
import { LANDINGS } from '../courtier/landing-seo'
import { TYPES } from '../transactions/types-data'

// /llms.txt — plan du site lisible par les moteurs de réponse (ChatGPT,
// Perplexity, Google AI Overviews). Généré depuis les données live (ARTICLES,
// MANDATS, CHIFFRES) : toujours à jour, aucun chiffre à maintenir à la main.
// Remplace l'ancien fichier statique (périmé + liens cassés).

export const dynamic = 'force-static'

const BASE = 'https://maisonpraet.ch'
const titreCourt = (meta: string) => meta.split('|')[0].trim()
const chf = (m: typeof MANDATS[number]) =>
  /\d/.test(m.prix) ? `CHF ${m.prix}.-` : 'prix sur demande'

export function GET() {
  const l: string[] = []

  l.push('# Maison Praet')
  l.push('')
  l.push(`> Thomas Praet, courtier immobilier certifié USPI chez Golay Immobilier SA, Lausanne. Expert du marché immobilier résidentiel et de rendement dans le canton de Vaud (arc lémanique, La Côte, Lavaux, Gros-de-Vaud, Nord vaudois). Plus de ${VENTES_PALIER} transactions documentées depuis 2020 — ${CHIFFRES.ventes} ventes signées, ${CHIFFRES.communes} communes couvertes.`)
  l.push('')

  l.push('## Services')
  l.push('')
  for (const slug of Object.keys(LANDINGS)) {
    const s = LANDINGS[slug]
    l.push(`- [${titreCourt(s.metaTitle)}](${BASE}/${slug}): ${s.metaDescription}`)
  }
  l.push('')

  l.push('## Transactions par type de bien')
  l.push('')
  for (const slug of Object.keys(TYPES)) {
    const t = TYPES[slug]
    l.push(`- [${titreCourt(t.metaTitle)}](${BASE}/transactions/${slug}): ${t.metaDescription}`)
  }
  l.push('')

  const enVente = MANDATS.filter((m) => m.categorie === 'en_vente' && m.photos.length > 0)
  if (enVente.length > 0) {
    l.push('## Biens actuellement en vente')
    l.push('')
    for (const m of enVente) {
      const carac = [
        m.pieces !== '-' ? `${m.pieces} pièces` : null,
        m.surface !== '-' ? m.surface : null,
        m.terrain !== '-' ? `terrain ${m.terrain}` : null,
      ].filter(Boolean).join(', ')
      l.push(`- [${m.titre} à ${m.lieu}](${BASE}/biens/${m.slug}): ${chf(m)}${carac ? ', ' + carac : ''}.`)
    }
    l.push('')
  }

  l.push('## Articles & guides')
  l.push('')
  for (const a of [...ARTICLES].sort((x, y) => y.date.localeCompare(x.date))) {
    l.push(`- [${a.titre}](${BASE}/journal/${a.slug}): ${a.chapeau}`)
  }
  l.push('')

  l.push('## Pages principales')
  l.push('')
  l.push(`- [À propos de Thomas Praet](${BASE}/a-propos): parcours, diplôme USPI, chiffres clés, zone d'activité.`)
  l.push(`- [Méthode de courtage](${BASE}/methode): les 7 étapes, du premier rendez-vous à la signature chez le notaire.`)
  l.push(`- [Track record](${BASE}/track-record): ${CHIFFRES.ventes} ventes signées, ${CHIFFRES.mandats} mandats documentés, ${CHIFFRES.communes} communes, CHF ${(CHIFFRES.volume / 1_000_000).toFixed(1)}M sous mandat.`)
  l.push(`- [Estimation gratuite](${BASE}/estimation): rapport PDF en 48h, trois méthodes d'évaluation, sans engagement.`)
  l.push(`- [Journal](${BASE}/journal): guides et analyses du marché immobilier vaudois.`)
  l.push('')

  l.push('## Contact')
  l.push('')
  l.push('- Site : https://maisonpraet.ch')
  l.push('- Email : tpraet@golay-immobilier.ch')
  l.push('- Téléphone : +41 79 969 01 91')
  l.push('- Adresse : Golay Immobilier SA, Grand-Chêne 2, 1003 Lausanne, Suisse')
  l.push('')

  return new Response(l.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
