/**
 * Paramètres de marché — HYPOTHÈSES PAR DÉFAUT du module d'estimation.
 *
 * ⚠️ Ce ne sont PAS des constantes réglementaires (celles-ci vivent dans
 * lib/config/reglementaire.ts). Ce sont des valeurs de référence de marché,
 * indicatives et destinées à être PRÉ-REMPLIES puis ajustées par le courtier
 * dossier par dossier. Chaque valeur est modifiable dans l'interface.
 *
 * Dernière calibration indicative : 2026-07 (marché vaudois).
 */

import type { TypeBien, ElementOuvrage } from '@/lib/estimation/types';
import { COMMUNES_COORDS } from '@/app/communes-data';

// ── Prix du terrain (CHF/m²) — indicatifs, par région puis par commune ──────
// Valeurs de départ ajustables. Le courtier affine selon la parcelle réelle.

const PRIX_TERRAIN_PAR_REGION: Record<string, number> = {
  'Arc lémanique': 1200,
  'La Côte': 1300,
  Lavaux: 1500,
  Riviera: 1400,
  'Gros-de-Vaud': 700,
  'Nord vaudois': 550,
  Veveyse: 600,
};

const PRIX_TERRAIN_PAR_COMMUNE: Record<string, number> = {
  Lausanne: 1600,
  Pully: 1900,
  Lutry: 1800,
  'Le Mont-sur-Lausanne': 1400,
  Epalinges: 1400,
  Morges: 1300,
  'Bourg-en-Lavaux': 1600,
  'Crans-près-Céligny': 1700,
};

export const PRIX_TERRAIN_M2_DEFAUT_FALLBACK = 800;

/** Prix du terrain (CHF/m²) par défaut pour une commune. */
export function prixTerrainDefaut(commune: string): number {
  if (PRIX_TERRAIN_PAR_COMMUNE[commune] != null) return PRIX_TERRAIN_PAR_COMMUNE[commune];
  const region = COMMUNES_COORDS[commune]?.region;
  if (region && PRIX_TERRAIN_PAR_REGION[region] != null) return PRIX_TERRAIN_PAR_REGION[region];
  return PRIX_TERRAIN_M2_DEFAUT_FALLBACK;
}

/** Liste des communes connues (pour les menus déroulants). */
export const COMMUNES = Object.keys(COMMUNES_COORDS).sort((a, b) => a.localeCompare(b, 'fr'));

// ── Taux de capitalisation — fourchettes suggérées par type de bien ─────────
export const TAUX_CAPITALISATION: Record<TypeBien, { min: number; defaut: number; max: number }> = {
  villa: { min: 0.025, defaut: 0.03, max: 0.035 },
  ppe: { min: 0.025, defaut: 0.03, max: 0.035 },
  immeuble: { min: 0.035, defaut: 0.0425, max: 0.05 },
  terrain: { min: 0, defaut: 0, max: 0 },
};

// ── Part des charges d'exploitation non refacturables (défaut) ──────────────
export const CHARGES_EXPLOITATION_DEFAUT: Record<TypeBien, number> = {
  villa: 0.15,
  ppe: 0.2,
  immeuble: 0.2,
  terrain: 0,
};

// ── Pondération valeur vénale (intrinsèque / rendement) par type ────────────
export const PONDERATION_DEFAUT: Record<TypeBien, { intrinseque: number; rendement: number }> = {
  villa: { intrinseque: 0.8, rendement: 0.2 },
  ppe: { intrinseque: 0.6, rendement: 0.4 },
  immeuble: { intrinseque: 0.2, rendement: 0.8 },
  terrain: { intrinseque: 1, rendement: 0 },
};

// ── Coefficient d'indexation ECA par défaut ─────────────────────────────────
// La valeur ECA est établie à l'année de la police ; on l'indexe à la valeur à
// neuf actuelle. Coefficient indicatif à ajuster selon l'indice ECA en vigueur.
export const COEFF_INDEXATION_ECA_DEFAUT = 1.15;

// ── Décomposition par élément d'ouvrage (vétusté) — modèle par défaut ───────
// Quote-parts sommant à 1. Taux de vétusté annuel et plafonds indicatifs, à
// ajuster selon l'état réel constaté lors de la visite.
export function elementsOuvrageDefaut(anneeConstruction: number): ElementOuvrage[] {
  const now = 2026; // année de référence du référentiel (cf. DATE_VERIFICATION)
  const age = Math.max(0, now - (anneeConstruction || now));
  return [
    { id: 'gros-oeuvre', nom: 'Gros œuvre (structure, fondations)', quotePart: 0.4, tauxVetusteAnnuel: 0.005, age, plafond: 0.4 },
    { id: 'enveloppe', nom: 'Enveloppe (toiture, façade, fenêtres)', quotePart: 0.3, tauxVetusteAnnuel: 0.01, age, plafond: 0.6 },
    { id: 'technique', nom: 'Techniques (chauffage, sanitaire, électricité)', quotePart: 0.2, tauxVetusteAnnuel: 0.02, age, plafond: 0.8 },
    { id: 'amenagements', nom: 'Aménagements intérieurs (cuisine, sols, peinture)', quotePart: 0.1, tauxVetusteAnnuel: 0.03, age, plafond: 0.8 },
  ];
}

// ── Stratégie de prix — valeurs par défaut ──────────────────────────────────
export const MARGE_FOURCHETTE_DEFAUT = 0.05; // ± 5 % autour de la valeur retenue
export const STRATEGIE_PRIX_DEFAUT = 0.03; // prix de mise en vente = +3 %
export const PALIER_ARRONDI_PRIX = 10000; // arrondi des prix communiqués (CHF)
