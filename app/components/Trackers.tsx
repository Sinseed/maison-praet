'use client'

/**
 * Traceurs d'audience (Vercel Analytics + Umami) — limités au SITE PUBLIC.
 * L'espace privé /app et /crm est exclu : les visites du courtier sur son
 * propre outil ne doivent pas gonfler les statistiques de fréquentation.
 */

import { usePathname } from 'next/navigation'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'

const estPrive = (p: string) => p.startsWith('/app') || p.startsWith('/crm')

export default function Trackers() {
  const pathname = usePathname() || '/'
  const prive = estPrive(pathname)

  return (
    <>
      <Analytics
        beforeSend={(event) => {
          try {
            if (estPrive(new URL(event.url).pathname)) return null
          } catch {
            /* URL invalide : on laisse passer */
          }
          return event
        }}
      />
      {!prive && (
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="07d9dc44-a171-44a7-a250-040d1f9a22f1"
          strategy="afterInteractive"
        />
      )}
    </>
  )
}
