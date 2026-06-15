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
     "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "8",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Alejandra García Rojas Martínez" },
          "datePublished": "2026-06-10",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": "Nous remercions chaleureusement M. Praet pour son accompagnement lors de l'achat de notre maison. Qualité des conseils, clarté des explications et grande transparence tout au long du processus."
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Sophie Suys" },
          "datePublished": "2026-06-09",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": "Son professionnalisme, sa disponibilité et ses précieux conseils nous ont permis de vivre cette étape importante avec sérénité. Nous le recommandons sans hésitation."
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Granny G" },
          "datePublished": "2026-06-12",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": "Enthousiasme, efficacité, disponibilité et professionnalisme : le courtier à qui confier votre projet immobilier les yeux fermés. Son écoute et son empathie ont été précieux."
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Leshenzerd" },
          "datePublished": "2026-06-01",
          "reviewRating": { "@type": "Rating", "ratingValue": "4", "bestRating": "5" },
          "reviewBody": "Une personne très compétente et d'un abord convivial. Le courant a passé dès le premier contact. Nous sommes heureux d'avoir trouvé en lui la bonne personne."
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Francis Reymond" },
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": "Vendre un bien à Lausanne en pilotant l'opération depuis l'Australie aurait pu être un casse-tête. Avec Thomas Praet, tout a été fluide, du premier rendez-vous à la signature chez le notaire."
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Pascal Périllard" },
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": "Toujours courtois, à l'écoute, prêt à aider en cas de besoin, même des mois après l'aboutissement du projet. Un vrai plaisir de traiter avec M. Praet."
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Aurélien Despland" },
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": "Une belle expérience lors de l'achat de notre bien, grâce au professionnalisme de M. Praet. Un grand merci pour le suivi et la bonne humeur tout au long des négociations."
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Nadine Thévoz" },
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": "Je recommande Monsieur Praet pour son professionnalisme. Il a su mettre notre bien en valeur. Je le remercie pour sa patience et son écoute."
        }
      ],
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
