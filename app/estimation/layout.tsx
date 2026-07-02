import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Estimation immobilière gratuite – Canton de Vaud | Maison Praet',
  description: "Faites estimer votre bien par Thomas Praet, courtier diplômé USPI à Lausanne. Rapport écrit, méthodes croisées, sans engagement. Villas, PPE et immeubles dans le canton de Vaud.",
  alternates: { canonical: 'https://maisonpraet.ch/estimation' },
  openGraph: {
    title: 'Estimation immobilière gratuite | Maison Praet',
    description: "Un rapport écrit fondé sur trois méthodes croisées et des comparables réels. Sans engagement, dans tout le canton de Vaud.",
    type: 'website',
    locale: 'fr_CH',
    url: 'https://maisonpraet.ch/estimation',
  },
}

export default function EstimationLayout({ children }: { children: React.ReactNode }) {
  return children
}
