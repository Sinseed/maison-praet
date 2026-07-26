/**
 * Identité du courtier — paramétrée une seule fois, reprise par tous les
 * documents produits (estimations, dossiers, notes d'honoraires…).
 */

export interface IdentiteCourtier {
  nomCommercial: string;
  courtier: string;
  titre: string;
  entreprise: string;
  adresse: string;
  npaLocalite: string;
  telephone: string;
  email: string;
  siteWeb: string;
}

export const COURTIER: IdentiteCourtier = {
  nomCommercial: 'Maison Praet',
  courtier: 'Thomas Praet',
  titre: 'Courtier immobilier diplômé USPI',
  entreprise: 'Golay Immobilier SA',
  adresse: 'Grand-Chêne 2',
  npaLocalite: '1003 Lausanne',
  telephone: '+41 79 969 01 91',
  email: 'tpraet@golay-immobilier.ch',
  siteWeb: 'maisonpraet.ch',
};

/** Palette de la charte (reprise du site). */
export const CHARTE = {
  dark: '#0C0F14',
  card: '#151921',
  border: '#1E2430',
  gold: '#C9A96E',
  goldLight: '#E2CFA5',
  muted: '#7A8194',
  text: '#2A2E38',
  white: '#FFFFFF',
} as const;
