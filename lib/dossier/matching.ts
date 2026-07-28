/**
 * Matching acquéreur ↔ bien.
 * Un acquéreur correspond si la commune du bien est dans ses communes
 * recherchées (ou s'il n'a pas précisé de commune) ET si le type du bien est
 * dans ses typologies (ou s'il n'en a pas précisé). Si un budget et un prix de
 * référence sont connus, le budget doit couvrir le prix.
 */

import type { AcquereurRow, BienRow } from '@/lib/supabase/rows'

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim()

export interface ResultatMatch {
  acquereur: AcquereurRow
  raisons: string[]
}

export function matcheAcquereur(acq: AcquereurRow, bien: BienRow, prixReference?: number | null): boolean {
  const communes = acq.communes_recherchees ?? []
  const communeOk = communes.length === 0 || communes.some((c) => norm(c) === norm(bien.commune))

  const typos = acq.typologies ?? []
  const typoOk = typos.length === 0 || typos.includes(bien.type)

  const budgetOk =
    !prixReference || acq.budget_valide == null || acq.budget_valide >= prixReference * 0.9

  return communeOk && typoOk && budgetOk
}

export function acquereursCorrespondants(
  acquereurs: AcquereurRow[],
  bien: BienRow,
  prixReference?: number | null,
): AcquereurRow[] {
  return acquereurs.filter((a) => matcheAcquereur(a, bien, prixReference))
}
