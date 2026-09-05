import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SeoLanding from '../../components/SeoLanding'
import { TYPES, TYPE_SLUGS } from '../types-data'

export const dynamicParams = false

export function generateStaticParams() {
  return TYPE_SLUGS.map(type => ({ type }))
}

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params
  const L = TYPES[type]
  if (!L) return { title: 'Transactions | Maison Praet' }
  return {
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
}

export default async function Page({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params
  const L = TYPES[type]
  if (!L) notFound()
  return <SeoLanding landing={L} />
}
