/**
 * ============================================================================
 *  CourtierOS — CONFIGURATION RÉGLEMENTAIRE UNIQUE (Canton de Vaud, Suisse)
 * ============================================================================
 *
 * Ce fichier regroupe TOUTES les constantes réglementaires, fiscales et
 * bancaires utilisées par l'application. Aucune valeur légale ou fiscale ne
 * doit être codée en dur ailleurs : tout module qui a besoin d'un taux, d'un
 * seuil ou d'un barème l'importe depuis ici.
 *
 * RÈGLE ABSOLUE (cf. règles de développement §1) :
 *   - Aucune invention de valeur. Chaque constante cite sa base légale ou sa
 *     source, et la date de dernière vérification.
 *   - L'application AFFICHE la date ci-dessous (DATE_VERIFICATION) partout où
 *     un calcul réglementaire est présenté.
 *
 * RÈGLE ABSOLUE (cf. règles de développement §2) :
 *   - Les calculs sont INDICATIFS. Ils ne se substituent pas au notaire, à la
 *     banque ni à l'autorité fiscale. Voir MENTIONS.* ci-dessous.
 *
 * Périmètre : Canton de Vaud. Aucune référence au droit français.
 */

/** Date de dernière vérification manuelle des constantes de ce fichier. */
export const DATE_VERIFICATION = '2026-07-26' as const;

/** Version du référentiel réglementaire (à incrémenter à chaque revue). */
export const VERSION_REFERENTIEL = '2026.1' as const;

// ============================================================================
//  0. LOCALISATION & FORMATAGE
// ============================================================================

export const LOCALE = {
  /** Locale d'affichage numérique : de-CH produit l'apostrophe comme séparateur
   *  de milliers (1'250'000), attendue en Suisse. */
  nombre: 'de-CH',
  /** Locale linguistique de l'interface. */
  langue: 'fr-CH',
  devise: 'CHF',
  /** Suffixe monétaire suisse : « CHF 1'250'000.- ». */
  suffixeMontant: '.-',
} as const;

// ============================================================================
//  1. FINANCEMENT — DIRECTIVES ASB (qualification de l'acquéreur)
//  Source : Directives de l'Association suisse des banquiers (ASB) relatives
//  aux exigences minimales pour les financements hypothécaires, applicables
//  au logement à usage propre. Pratique bancaire courante.
//  Base : Directives ASB 2019/2020 (fonds propres, amortissement).
//  Vérifié le 2026-07-26.
// ============================================================================

export const ASB = {
  /** Fonds propres minimum : 20 % du prix d'acquisition. */
  fondsPropresMinPct: 0.2,
  /** Part des fonds propres qui ne peut PAS provenir du 2e pilier (LPP) :
   *  au moins 10 % du prix (« fonds propres durs »). */
  fondsPropresHorsLppMinPct: 0.1,
  /** Taux d'intérêt théorique (calculatoire) utilisé pour le test de tenue
   *  des charges, indépendant du taux de marché du moment. */
  tauxInteretTheorique: 0.05,
  /** Frais d'entretien et charges annexes, en % de la valeur du bien / an. */
  fraisEntretienPct: 0.01,
  /** Seuil du 1er rang : la dette au-delà de ce % de la valeur (2e rang) doit
   *  être amortie. */
  seuilPremierRangPct: 0.66,
  /** Durée maximale d'amortissement du 2e rang (années)… */
  amortissement2eRangDureeMaxAnnees: 15,
  /** …ou jusqu'à l'âge de la retraite, selon l'échéance la plus courte. */
  ageRetraite: 65,
  /** Taux d'effort maximal : charges théoriques / revenu brut annuel. */
  tauxEffortMax: 1 / 3, // ≈ 0.3333
} as const;

// ============================================================================
//  2. FISCALITÉ VAUDOISE À LA VENTE
// ============================================================================

/**
 * Impôt sur les gains immobiliers (IGI) — Canton de Vaud.
 * Base légale : art. 61 ss et art. 72 LI-VD (Loi sur les impôts directs
 * cantonaux). Barème proportionnel dégressif selon la durée de détention :
 * de 30 % (moins d'un an) à 7 % (24 ans et plus), diminution d'un point par an.
 * Les années d'occupation du bien comme résidence principale, si prouvées,
 * comptent double dans le calcul de la durée de détention.
 * Source : art. 72 LI-VD ; barème publié maisonpraet.ch/journal.
 * Vérifié le 2026-07-26.
 */
export const IGI_VAUD = {
  tauxMaxPct: 0.3, // < 1 an
  tauxMinPct: 0.07, // ≥ 24 ans
  /** Baisse d'un point de pourcentage par année de détention. */
  baisseParAnneePct: 0.01,
  dureePlancherAnnees: 24,
  /** Les années de résidence principale prouvées comptent double. */
  occupationCompteDouble: true,
  /** Gain imposable en dessous duquel l'impôt n'est pas perçu (CHF). */
  gainMinImposable: 5000,
  /** Remploi : réinvestissement du produit dans un logement de remplacement en
   *  Suisse dans ce délai → différé (report) d'imposition. */
  remploiDelaiAnnees: 2,
} as const;

/**
 * Barème IGI-VD, taux par nombre d'années PLEINES de détention (fiscales).
 * Table exacte publiée (art. 72 LI-VD). Index 0 = « moins d'un an ».
 * Au-delà de 24 ans → tauxMinPct.
 */
export const IGI_VAUD_BAREME: ReadonlyArray<{ ans: number; tauxPct: number }> = [
  { ans: 0, tauxPct: 0.3 },
  { ans: 1, tauxPct: 0.3 },
  { ans: 2, tauxPct: 0.29 },
  { ans: 3, tauxPct: 0.28 },
  { ans: 4, tauxPct: 0.27 },
  { ans: 5, tauxPct: 0.26 },
  { ans: 6, tauxPct: 0.25 },
  { ans: 7, tauxPct: 0.24 },
  { ans: 8, tauxPct: 0.23 },
  { ans: 9, tauxPct: 0.22 },
  { ans: 10, tauxPct: 0.21 },
  { ans: 11, tauxPct: 0.2 },
  { ans: 12, tauxPct: 0.19 },
  { ans: 13, tauxPct: 0.18 },
  { ans: 14, tauxPct: 0.17 },
  { ans: 15, tauxPct: 0.16 },
  { ans: 16, tauxPct: 0.15 },
  { ans: 17, tauxPct: 0.14 },
  { ans: 18, tauxPct: 0.13 },
  { ans: 19, tauxPct: 0.12 },
  { ans: 20, tauxPct: 0.11 },
  { ans: 21, tauxPct: 0.1 },
  { ans: 22, tauxPct: 0.09 },
  { ans: 23, tauxPct: 0.08 },
  { ans: 24, tauxPct: 0.07 },
];

/**
 * Résout le taux IGI-VD pour une durée de détention fiscale donnée (années).
 * @param anneesFiscales Durée de détention fiscale (occupation principale déjà
 *   doublée en amont si applicable).
 */
export function tauxIgiVaud(anneesFiscales: number): number {
  if (!Number.isFinite(anneesFiscales) || anneesFiscales < 0) return IGI_VAUD.tauxMaxPct;
  const ans = Math.floor(anneesFiscales);
  if (ans >= IGI_VAUD.dureePlancherAnnees) return IGI_VAUD.tauxMinPct;
  return IGI_VAUD_BAREME[ans]?.tauxPct ?? IGI_VAUD.tauxMinPct;
}

/**
 * Droits de mutation — Canton de Vaud.
 * Base légale : art. 10 ss LMSD (Loi concernant le droit de mutation sur les
 * transferts immobiliers et l'impôt sur les successions et donations).
 * Taux cantonal fixe 2,2 % + part communale jusqu'à 1,1 % (moitié du cantonal),
 * appliquée au maximum dans la grande majorité des communes → 3,3 % au total.
 * À la charge de l'acquéreur en principe, répartition paramétrable entre parties.
 * Source : art. 10 LMSD ; vd.ch ; barème publié maisonpraet.ch/journal.
 * Vérifié le 2026-07-26.
 */
export const DROITS_MUTATION_VAUD = {
  tauxCantonalPct: 0.022,
  tauxCommunalMaxPct: 0.011,
  tauxTotalUsuelPct: 0.033,
  /** Répartition par défaut de la charge (part acquéreur / part vendeur). */
  chargeAcquereurPctDefaut: 1,
  chargeVendeurPctDefaut: 0,
} as const;

/**
 * Émoluments — Registre foncier & notaire (Canton de Vaud).
 * Fourchettes indicatives usuelles. Le décompte définitif relève du notaire.
 * Source : pratique notariale VD ; barèmes publiés maisonpraet.ch/journal.
 * Vérifié le 2026-07-26.
 */
export const EMOLUMENTS_VAUD = {
  /** Inscription au Registre foncier, en % du prix (~0,3 %). */
  registreFoncierPct: 0.003,
  /** Émoluments du notaire, fourchette en % du prix (0,5 % – 0,7 %). */
  notaireMinPct: 0.005,
  notaireMaxPct: 0.007,
  /** Constitution d'une cédule hypothécaire, en % du montant du prêt
   *  (~1,5 % – 2,5 %), à titre indicatif. */
  ceduleHypothecaireMinPct: 0.015,
  ceduleHypothecaireMaxPct: 0.025,
} as const;

// ============================================================================
//  3. RADAR DE CONFORMITÉ — SEUILS DÉCLENCHANTS
// ============================================================================

/**
 * LPPPL — Loi vaudoise sur la préservation et la promotion du parc locatif.
 * Déclencheurs : immeuble locatif de plus de 2 logements, ou vente d'un
 * logement loué → autorisation d'aliéner et/ou droit de préemption communal
 * possibles. Délais à intégrer au rétroplanning.
 * Source : LPPPL (RSV 840.15). Vérifié le 2026-07-26.
 */
export const LPPPL = {
  seuilNbLogements: 2, // « plus de deux logements »
  /** Délai indicatif (jours) à provisionner pour l'autorisation / la purge du
   *  droit de préemption communal. À confirmer auprès de la commune. */
  delaiIndicatifJours: 40,
} as const;

/**
 * LFAIE / « Lex Koller » — acquisition d'immeubles par des personnes à
 * l'étranger. Déclencheur : acquéreur sans domicile en Suisse ou sans permis C.
 * Source : LFAIE (RS 211.412.41). Vérifié le 2026-07-26.
 */
export const LEX_KOLLER = {
  permisNonAssujettis: ['C', 'suisse'] as const,
} as const;

/**
 * LDFR — droit foncier rural. Déclencheur : parcelle en zone agricole ou
 * surface supérieure au seuil → autorisation d'acquérir.
 * Source : LDFR (RS 211.412.11). Seuil surface indicatif, à confirmer.
 * Vérifié le 2026-07-26.
 */
export const LDFR = {
  /** Seuil de surface indicatif (m²) au-delà duquel l'assujettissement est
   *  probable en zone agricole. À confirmer au cas par cas. */
  seuilSurfaceM2: 2500,
} as const;

/**
 * LAT / LATC — aménagement du territoire. Déclencheurs : zone réservée,
 * terrain dézoné, zone à bâtir non équipée → taxe sur la plus-value.
 * Source : LAT (RS 700), LATC (RSV 700.11). Vérifié le 2026-07-26.
 */
export const LAT = {
  /** Taux indicatif de la taxe sur la plus-value (part cantonale de base).
   *  À confirmer selon le règlement communal applicable. */
  tauxPlusValueIndicatifPct: 0.2,
} as const;

/**
 * Amiante — obligation de vigilance sur les bâtiments anciens. Déclencheur :
 * année de construction antérieure à 1991 (interdiction d'utilisation de
 * l'amiante en Suisse dès 1990). Source : OFSP / SUVA. Vérifié le 2026-07-26.
 */
export const AMIANTE = {
  anneeDeclencheur: 1991,
} as const;

/**
 * Énergie — remplacement des installations fossiles & subventions.
 * Le Programme Bâtiments soutient l'assainissement énergétique.
 * Source : Programme Bâtiments (leprogrammebatiments.ch), DGE-VD.
 * Vérifié le 2026-07-26.
 */
export const ENERGIE = {
  lienProgrammeBatiments: 'https://www.leprogrammebatiments.ch',
  /** Fourchette indicative du coût d'un CECB (CHF). */
  cecbCoutMin: 1000,
  cecbCoutMax: 3000,
} as const;

/**
 * LBA — lutte contre le blanchiment d'argent. Identification du cocontractant
 * et de l'ayant droit économique, conservation des pièces.
 * nLPD — nouvelle loi sur la protection des données : consentement, registre
 * des traitements, durée de conservation.
 * Source : LBA (RS 955.0), nLPD (RS 235.1). Vérifié le 2026-07-26.
 */
export const CONSERVATION = {
  /** Durée légale de conservation des pièces LBA (années). */
  lbaAnnees: 10,
  /** Durée de conservation par défaut des données personnelles (années),
   *  paramétrable dans le registre des traitements nLPD. */
  lpdAnneesDefaut: 10,
} as const;

// ============================================================================
//  4. MENTIONS LÉGALES OBLIGATOIRES (affichées par les modules sensibles)
// ============================================================================

export const MENTIONS = {
  estimation:
    "Cette estimation est indicative. Elle repose sur les hypothèses saisies et " +
    "ne constitue ni une expertise au sens légal, ni une garantie de prix de vente. " +
    'Seul le marché détermine le prix effectif.',
  financement:
    'Calcul indicatif fondé sur les directives ASB. Il ne remplace pas la décision ' +
    "d'octroi d'un établissement bancaire, qui applique ses propres critères.",
  fiscal:
    'Calcul indicatif. Le décompte définitif relève de l\'Administration cantonale ' +
    'des impôts (ACI) et du notaire instrumentant.',
  conformite:
    'Alertes indicatives à vérifier au cas par cas. Elles ne constituent pas un ' +
    'conseil juridique et ne remplacent pas l\'analyse du notaire et des autorités ' +
    'compétentes.',
  general: `Constantes réglementaires vérifiées le ${DATE_VERIFICATION} (réf. ${VERSION_REFERENTIEL}).`,
} as const;
