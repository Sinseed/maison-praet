/** Entrée par défaut du radar de conformité. */

import type { ConformiteInput } from '@/lib/conformite/types'
import type { TypeBien } from '@/lib/estimation/types'

export function conformiteParDefaut(type: TypeBien = 'villa', commune = 'Lausanne'): ConformiteInput {
  return {
    type,
    commune,
    anneeConstruction: 2000,
    surfaceParcelle: 600,
    nbLogements: type === 'immeuble' ? 6 : 1,
    logementLoue: false,
    zoneAgricole: false,
    zoneReservee: false,
    zoneABatirNonEquipee: false,
    dezonage: false,
    acquereurSuisse: true,
    acquereurDomicileSuisse: true,
    acquereurPermis: 'C',
    cocontractantIdentifie: false,
    ayantDroitEcoIdentifie: false,
    piecesConservees: false,
    consentementContacts: false,
    registreTraitements: false,
    servitudes: [],
    resolutions: {},
  }
}
