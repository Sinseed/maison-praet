'use client'

/**
 * Atelier d'estimation dans l'espace privé /app (protégé par le middleware
 * Supabase — pas de code PIN). Réutilise le composant partagé.
 */

import { AtelierEstimation } from '@/app/crm/estimation/AtelierEstimation'

export default function EstimationAppPage() {
  return <AtelierEstimation />
}
