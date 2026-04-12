import type { Metadata } from 'next'
import './globals.css'
import Nav from './components/Nav'
import { Analytics } from '@vercel/analytics/react'

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
    images: [
      {
        url: 'https://maisonpraet.ch/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Thomas Praet - Courtier immobilier, Canton de Vaud',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maison Praet | Courtier immobilier – Canton de Vaud',
    description: "Thomas Praet – courtier certifié USPI. Estimation et vente immobilière sur l'arc lémanique.",
    images: ['https://maisonpraet.ch/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  verification: { google: 'r4ZOgCsUY1UNRLgf7Ou5n7qblp_kFhSmDfikxDEsXdw' },
  alternates: { canonical: 'https://maisonpraet.ch' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{__html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "Maison Praet",
      "url": "https://maisonpraet.ch",
      "logo": "https://maisonpraet.ch/og-image.jpg",
      "image": "https://maisonpraet.ch/og-image.jpg",
      "description": "Courtier immobilier certifié USPI, actif sur l'arc lémanique et le canton de Vaud depuis plus de 6 ans.",
      "telephone": "+41799690191",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lausanne",
        "addressRegion": "Vaud",
        "addressCountry": "CH"
      },
      "areaServed": "Canton de Vaud, Suisse Romande",
      "sameAs": ["https://maisonpraet.com"]
    })}}
  />
</head>
<body><Nav />{children}<Analytics /></body>
    </html>
  )
}
