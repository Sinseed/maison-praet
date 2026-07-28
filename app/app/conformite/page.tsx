'use client'

/**
 * Radar de conformité dans l'espace privé /app (protégé par le middleware
 * Supabase — pas de code PIN). Réutilise le composant partagé.
 */

import { RadarConformite } from '@/app/crm/conformite/RadarConformite'

export default function ConformiteAppPage() {
  return <RadarConformite />
}
