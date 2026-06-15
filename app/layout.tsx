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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CH">
      <head>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{__html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "@id": "https://maisonpraet.ch/#agent",
      "name": "Maison Praet",
      "alternateName": "Thomas Praet, courtier immobilier",
      "url": "https://maisonpraet.ch",
      "logo": "https://maisonpraet.ch/og-image.jpg",
      "image": "https://maisonpraet.ch/photos/portrait.jpg",
      "description": "Thomas Praet, courtier immobilier certifié USPI chez Golay Immobilier SA. Estimation, vente et conseil sur l'arc lémanique et le canton de Vaud. Plus de 90 transactions documentées depuis 2020.",
      "founder": {
        "@type": "Person",
        "name": "Thomas Praet",
        "jobTitle": "Courtier immobilier diplômé USPI",
        "telephone": "+41799690191",
        "email": "tpraet@golay-immobilier.ch",
        "image": "https://maisonpraet.ch/photos/portrait.jpg"
      },
      "foundingDate": "2020",
      "telephone": "+41799690191",
      "email": "tpraet@golay-immobilier.ch",
      "priceRange": "CHF 300'000 - CHF 6'000'000",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Grand-Chêne 2",
        "postalCode": "1003",
        "addressLocality": "Lausanne",
        "addressRegion": "Vaud",
        "addressCountry": "CH"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 46.5197,
        "longitude": 6.6323
      },
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Canton de Vaud" },
        { "@type": "City", "name": "Lausanne" },
        { "@type": "City", "name": "Morges" },
        { "@type": "City", "name": "Pully" },
        { "@type": "City", "name": "Gland" },
        { "@type": "City", "name": "Nyon" },
        { "@type": "City", "name": "Yverdon-les-Bains" }
      ],
      "knowsAbout": [
        "Estimation immobilière",
        "Vente immobilière",
        "Mandat de courtage exclusif",
        "Marché immobilier vaudois",
        "PPE et propriétés par étages",
        "Investissement locatif",
        "CECB et performance énergétique",
        "Droit de mutation Canton de Vaud"
      ],
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "professional license",
        "name": "Courtier diplômé USPI"
      },
"memberOf": {
        "@type": "Organization",
        "name": "Golay Immobilier SA",
        "url": "https://www.golay-immobilier.ch"
      },
      "sameAs": [
        "https://maisonpraet.com",
        "https://ch.linkedin.com/in/thomas-praet"
      ]
    })}}
  />
</head>
<body><Nav />{children}<Analytics /></body>
    </html>
  )
}
