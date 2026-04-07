import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Maison Praet | Courtier immobilier – Canton de Vaud, Suisse',
  description: "Thomas Praet, courtier immobilier certifié USPI chez Golay Immobilier SA. Estimation, vente et conseil sur l'arc lémanique et le Gros-de-Vaud. L'immobilier, c'est avant tout une relation.",
  keywords: ['courtier immobilier', 'estimation immobilière', 'vente immobilière', 'canton de Vaud', 'Lausanne', 'arc lémanique', 'Gros-de-Vaud', 'USPI', 'Golay Immobilier'],
  authors: [{ name: 'Thomas Praet' }],
  openGraph: {
    title: 'Maison Praet | Courtier immobilier – Canton de Vaud',
    description: "Thomas Praet – courtier certifié USPI. Estimation et vente immobilière sur l'arc lémanique et le Gros-de-Vaud.",
    type: 'website',
    locale: 'fr_CH',
    url: 'https://maisonpraet.ch',
    siteName: 'Maison Praet',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://maisonpraet.ch' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
