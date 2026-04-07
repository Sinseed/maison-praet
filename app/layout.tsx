import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Maison Praet | Courtage immobilier – Arc lémanique & Gros-de-Vaud',
  description: "Thomas Praet, courtier immobilier certifié USPI. Plus de 6 ans d'expérience dans le canton de Vaud. L'immobilier, c'est avant tout une relation.",
  openGraph: {
    title: 'Maison Praet | Courtage immobilier',
    description: "Thomas Praet – courtier immobilier, arc lémanique & Gros-de-Vaud",
    type: 'website',
    locale: 'fr_CH',
    url: 'https://maisonpraet.ch',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
