/**
 * Types du radar de conformité réglementaire (Canton de Vaud).
 */

import type { TypeBien } from '@/lib/estimation/types'

export type NiveauAlerte = 'bloquant' | 'informatif' | 'ok'

export type TypeServitude = 'passage' | 'usufruit' | 'habitation' | 'ddp' | 'autre'

export const TYPE_SERVITUDE_LABELS: Record<TypeServitude, string> = {
  passage: 'Droit de passage',
  usufruit: 'Usufruit',
  habitation: "Droit d'habitation",
  ddp: 'Droit de superficie (DDP)',
  autre: 'Autre charge / servitude',
}

export interface Servitude {
  id: string
  type: TypeServitude
  description: string
  beneficiaire?: string
  /** Échéance (ISO AAAA-MM-JJ), pertinente surtout pour un DDP. */
  echeance?: string
}

/** Résolution horodatée d'une alerte. */
export interface Resolution {
  resolu: boolean
  note: string
  dateISO: string | null
}

/** Réponses aux questions déclenchantes + état du dossier. */
export interface ConformiteInput {
  // Contexte du bien
  type: TypeBien
  commune: string
  anneeConstruction: number
  surfaceParcelle: number

  // LPPPL
  nbLogements: number
  logementLoue: boolean

  // LDFR / LAT-LATC
  zoneAgricole: boolean
  zoneReservee: boolean
  zoneABatirNonEquipee: boolean
  dezonage: boolean

  // Lex Koller / LFAIE (acquéreur pressenti)
  acquereurSuisse: boolean
  acquereurDomicileSuisse: boolean
  acquereurPermis: string // 'C' | 'B' | 'L' | 'aucun'

  // LBA
  cocontractantIdentifie: boolean
  ayantDroitEcoIdentifie: boolean
  piecesConservees: boolean

  // nLPD
  consentementContacts: boolean
  registreTraitements: boolean

  // Servitudes & charges (extrait du registre foncier)
  servitudes: Servitude[]

  // Résolutions horodatées, indexées par code d'alerte
  resolutions: Record<string, Resolution>
}

export interface Alerte {
  /** Code stable (sert de clé de résolution). */
  code: string
  domaine: string
  niveau: NiveauAlerte
  titre: string
  /** Note explicative en langage clair. */
  message: string
  baseLegale: string
  /** Délai indicatif (jours) à intégrer au rétroplanning. */
  delaiJours?: number
  /** Action recommandée. */
  action?: string
}

export interface SyntheseConformite {
  bloquants: number
  informatifs: number
  ok: number
  /** Délai réglementaire maximal à provisionner au rétroplanning (jours). */
  delaiMaxJours: number
}
