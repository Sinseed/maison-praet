/** Helpers partagés du répertoire de contacts. */

import type { ContactRow } from '@/lib/supabase/rows'

export const ROLE_LABELS: Record<string, string> = {
  vendeur: 'Vendeur',
  acquereur: 'Acquéreur',
  notaire: 'Notaire',
  courtier_tiers: 'Courtier',
  artisan: 'Artisan',
  autre: 'Contact',
}

export const nomContact = (c: ContactRow) =>
  [c.prenom, c.nom].filter(Boolean).join(' ').trim() || c.societe || c.email || 'Contact sans nom'
