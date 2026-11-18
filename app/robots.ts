import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/app', '/crm', '/api/'],
      },
    ],
    sitemap: 'https://maisonpraet.ch/sitemap.xml',
  }
}
