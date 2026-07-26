/** Construction d'une entrée d'estimation par défaut, cohérente et éditable. */

import type { EstimationInput, TypeBien } from '@/lib/estimation/types';
import {
  CHARGES_EXPLOITATION_DEFAUT,
  COEFF_INDEXATION_ECA_DEFAUT,
  MARGE_FOURCHETTE_DEFAUT,
  PONDERATION_DEFAUT,
  STRATEGIE_PRIX_DEFAUT,
  TAUX_CAPITALISATION,
  elementsOuvrageDefaut,
  prixTerrainDefaut,
} from '@/lib/estimation/parametres-marche';

export function inputParDefaut(
  type: TypeBien = 'villa',
  commune = 'Lausanne',
): EstimationInput {
  const anneeConstruction = 2000;
  return {
    type,
    commune,
    adresse: '',
    anneeConstruction,
    surfaceHabitable: 150,
    surfaceParcelle: 600,
    valeurEca: 900000,
    coefficientIndexationEca: COEFF_INDEXATION_ECA_DEFAUT,
    elementsOuvrage: elementsOuvrageDefaut(anneeConstruction),
    prixTerrainM2: prixTerrainDefaut(commune),
    amenagementsExterieurs: 50000,
    etatLocatifBrutAnnuel: type === 'immeuble' ? 120000 : 0,
    chargesExploitationPct: CHARGES_EXPLOITATION_DEFAUT[type],
    tauxCapitalisation: TAUX_CAPITALISATION[type].defaut,
    ponderationIntrinseque: PONDERATION_DEFAUT[type].intrinseque,
    ponderationRendement: PONDERATION_DEFAUT[type].rendement,
    comparables: [],
    margeFourchette: MARGE_FOURCHETTE_DEFAUT,
    strategiePrixPct: STRATEGIE_PRIX_DEFAUT,
  };
}
