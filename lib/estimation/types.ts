/**
 * Types du module d'estimation multi-méthodes.
 * Toutes les hypothèses sont explicites et modifiables (« aucune boîte noire »).
 */

export type TypeBien = 'villa' | 'ppe' | 'immeuble' | 'terrain';

export const TYPE_BIEN_LABELS: Record<TypeBien, string> = {
  villa: 'Villa / maison individuelle',
  ppe: 'Appartement en PPE',
  immeuble: 'Immeuble de rendement',
  terrain: 'Terrain',
};

/** Un élément d'ouvrage soumis à vétusté (valeur intrinsèque). */
export interface ElementOuvrage {
  /** Identifiant stable (pour React key & journalisation). */
  id: string;
  nom: string;
  /** Quote-part de cet élément dans la valeur ECA (0–1). La somme des
   *  quote-parts devrait valoir 1. */
  quotePart: number;
  /** Taux de vétusté annuel (0–1). */
  tauxVetusteAnnuel: number;
  /** Âge de l'élément en années (peut différer de l'âge du bâtiment si rénové). */
  age: number;
  /** Plafond de vétusté appliqué à cet élément (0–1). */
  plafond: number;
}

/** Un bien comparable saisi manuellement (comparaison de marché). */
export interface Comparable {
  id: string;
  designation: string;
  /** Prix de vente constaté (CHF). */
  prix: number;
  /** Surface de référence (m²). */
  surface: number;
  /** Ajustement net appliqué pour tenir compte des différences (%),
   *  positif si le comparable est supérieur au bien estimé. Ex : +0.05. */
  ajustementPct: number;
}

/** Entrée complète du moteur d'estimation. */
export interface EstimationInput {
  // — Identification du bien —
  type: TypeBien;
  commune: string;
  adresse?: string;
  anneeConstruction: number;
  surfaceHabitable: number; // m² (surface habitable / utile pondérée)
  surfaceParcelle: number; // m²

  // — Méthode 1 : valeur intrinsèque —
  valeurEca: number; // Valeur ECA (assurance incendie), CHF
  coefficientIndexationEca: number; // Coefficient d'indexation ECA (ex. 1.15)
  elementsOuvrage: ElementOuvrage[]; // vétusté par élément
  prixTerrainM2: number; // CHF/m² (par commune, éditable)
  amenagementsExterieurs: number; // CHF (garage, piscine, aménagements)

  // — Méthode 2 : valeur de rendement —
  etatLocatifBrutAnnuel: number; // CHF/an (loyers bruts)
  chargesExploitationPct: number; // 0–1 (part des charges non refacturables)
  tauxCapitalisation: number; // 0–1

  // — Méthode 3 : valeur vénale (pondération) —
  ponderationIntrinseque: number; // 0–1
  ponderationRendement: number; // 0–1

  // — Méthode 4 : comparaison de marché —
  comparables: Comparable[];

  // — Stratégie de prix —
  margeFourchette: number; // 0–1, demi-amplitude de la fourchette (ex. 0.05)
  strategiePrixPct: number; // 0–1, écart prix de mise en vente / valeur retenue
}

/** Une ligne détaillée d'un calcul (pour la transparence & le PDF). */
export interface LigneCalcul {
  libelle: string;
  montant: number;
  /** Détail optionnel (ex. formule appliquée). */
  detail?: string;
  /** true → ligne de sous-total / total mise en évidence. */
  total?: boolean;
}

export interface ResultatIntrinseque {
  applicable: boolean;
  valeurEcaIndexee: number;
  vetusteCHF: number;
  valeurConstructionNette: number;
  valeurTerrain: number;
  amenagementsExterieurs: number;
  valeur: number;
  lignes: LigneCalcul[];
}

export interface ResultatRendement {
  applicable: boolean;
  etatLocatifBrut: number;
  etatLocatifNet: number;
  tauxCapitalisation: number;
  rendementBrutSurValeur: number; // rendement brut / valeur de rendement
  valeur: number;
  lignes: LigneCalcul[];
}

export interface ResultatComparaison {
  applicable: boolean;
  prixM2AjusteMoyen: number;
  nbComparables: number;
  valeur: number;
  lignes: LigneCalcul[];
}

export interface ResultatVenale {
  ponderationIntrinseque: number;
  ponderationRendement: number;
  valeur: number;
  lignes: LigneCalcul[];
}

export interface SyntheseEstimation {
  valeurRetenue: number; // valeur vénale pondérée, arrondie
  fourchetteBasse: number;
  fourchetteHaute: number;
  prixMiseEnVente: number;
  prixPlancher: number;
}

/** Résultat complet du moteur. */
export interface EstimationResultat {
  intrinseque: ResultatIntrinseque;
  rendement: ResultatRendement;
  comparaison: ResultatComparaison;
  venale: ResultatVenale;
  synthese: SyntheseEstimation;
  /** Avertissements non bloquants (ex. pondérations ≠ 100 %). */
  avertissements: string[];
}
