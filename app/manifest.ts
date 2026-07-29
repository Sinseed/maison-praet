import type { MetadataRoute } from 'next'

/**
 * Manifest PWA — permet d'installer l'espace courtier comme une application sur
 * le téléphone (icône sur l'écran d'accueil, ouverture plein écran).
 * Portée limitée à /app : c'est l'app métier qui s'installe, pas le site public.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CourtierOS — Maison Praet',
    short_name: 'CourtierOS',
    description: 'Le poste de pilotage du courtier : dossiers, acquéreurs, estimations, relances.',
    start_url: '/app',
    scope: '/app',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#0C0F14',
    theme_color: '#0C0F14',
    icons: [
      { src: '/favicon-512.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/favicon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/favicon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
