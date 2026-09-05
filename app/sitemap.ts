import { MetadataRoute } from 'next'
import { MANDATS, ARTICLES } from './data'
import { COMMUNES_SEO_ALL as COMMUNES_SEO } from './courtier/communes-seo'
import { LANDING_SLUGS } from './courtier/landing-seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://maisonpraet.ch'

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/track-record`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/methode`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.85 },
    { url: `${baseUrl}/journal`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/estimation`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${baseUrl}/a-propos`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/mentions-legales`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
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
    ...(m.video && m.videoPoster ? {
      videos: [{
        title: `${m.titre} à ${m.lieu} : visite en vidéo`,
        thumbnail_loc: `${baseUrl}${m.videoPoster}`,
        description: (m.description || `${m.titre} à ${m.lieu}`).slice(0, 2048),
        content_loc: `${baseUrl}${m.video}`,
      }],
    } : {}),
  }))

  const communePages = COMMUNES_SEO.map(c => ({
    url: `${baseUrl}/courtier/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const landingPages = LANDING_SLUGS.map(slug => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  return [...staticPages, ...landingPages, ...communePages, ...articlePages, ...bienPages]
}
