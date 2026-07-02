import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Track record – Ventes réalisées Canton de Vaud | Maison Praet',
  description: "Toutes les transactions de Thomas Praet, courtier diplômé USPI : villas, PPE et immeubles vendus sur l'arc lémanique et le canton de Vaud depuis 2020.",
  alternates: { canonical: 'https://maisonpraet.ch/track-record' },
  openGraph: {
    title: 'Track record – Ventes réalisées | Maison Praet',
    description: "Villas, PPE et immeubles vendus sur l'arc lémanique et le canton de Vaud. Des transactions documentées, pas des promesses.",
    type: 'website',
    locale: 'fr_CH',
    url: 'https://maisonpraet.ch/track-record',
  },
}

export default function TrackRecordLayout({ children }: { children: React.ReactNode }) {
  return children
}
