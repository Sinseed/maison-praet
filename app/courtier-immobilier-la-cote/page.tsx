import { Metadata } from 'next'
import SeoLanding from '../components/SeoLanding'
import { LANDINGS } from '../courtier/landing-seo'

const L = LANDINGS['courtier-immobilier-la-cote']

export const metadata: Metadata = {
  title: L.metaTitle,
  description: L.metaDescription,
  alternates: { canonical: `https://maisonpraet.ch/${L.slug}` },
  openGraph: {
    title: L.metaTitle,
    description: L.metaDescription,
    url: `https://maisonpraet.ch/${L.slug}`,
    images: [{ url: 'https://maisonpraet.ch/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default function Page() {
  return <SeoLanding landing={L} />
}
