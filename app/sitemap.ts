import { MetadataRoute } from 'next'
import { MANDATS, ARTICLES } from './data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://maisonpraet.ch'

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/journal`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
  ]

  const articlePages = ARTICLES.map(a => ({
    url: `${baseUrl}/journal/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const bienPages = MANDATS.filter(m => m.photos.length > 0).map(m => ({
    url: `${baseUrl}/biens/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...articlePages, ...bienPages]
}
