/**
 * Moteur d'estimation multi-méthodes — fonctions pures, sans effet de bord.
 *
 * Quatre méthodes calculées côte à côte :
 *   1. Valeur intrinsèque   (ECA indexée − vétusté + terrain + extérieurs)
 *   2. Valeur de rendement  (état locatif net capitalisé)
 *   3. Valeur vénale        (pondération intrinsèque / rendement)
 *   4. Comparaison de marché (comparables ajustés)
 *
 * Aucune boîte noire : chaque résultat expose le détail ligne par ligne.
 */

import { arrondirAuPalier } from '@/lib/format';
import { PALIER_ARRONDI_PRIX } from '@/lib/estimation/parametres-marche';
import type {
  EstimationInput,
  EstimationResultat,
  ResultatComparaison,
  ResultatIntrinseque,
  ResultatRendement,
  ResultatVenale,
} from '@/lib/estimation/types';

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const nombre = (v: number) => (Number.isFinite(v) ? v : 0);

// ── Méthode 1 : valeur intrinsèque ──────────────────────────────────────────
export function calculIntrinseque(input: EstimationInput): ResultatIntrinseque {
  const valeurEcaIndexee = nombre(input.valeurEca) * nombre(input.coefficientIndexationEca);

  // Vétusté = Σ (quote-part × taux de vétusté plafonné) appliquée à la valeur à neuf.
  let vetusteRatio = 0;
  const lignesVetuste = input.elementsOuvrage.map((el) => {
    const vetusteEl = clamp(nombre(el.age) * nombre(el.tauxVetusteAnnuel), 0, nombre(el.plafond));
    const contribution = nombre(el.quotePart) * vetusteEl;
    vetusteRatio += contribution;
    return {
      libelle: `Vétusté — ${el.nom}`,
      montant: -(valeurEcaIndexee * contribution),
      detail: `${(el.quotePart * 100).toFixed(0)} % de l'ouvrage · ${(vetusteEl * 100).toFixed(1)} % de vétusté (${el.age} ans)`,
    };
  });

  const vetusteCHF = valeurEcaIndexee * vetusteRatio;
  const valeurConstructionNette = valeurEcaIndexee - vetusteCHF;
  const valeurTerrain = nombre(input.surfaceParcelle) * nombre(input.prixTerrainM2);
  const amenagementsExterieurs = nombre(input.amenagementsExterieurs);
  const valeur = valeurConstructionNette + valeurTerrain + amenagementsExterieurs;

  return {
    applicable: input.type !== 'terrain' && valeurEcaIndexee > 0,
    valeurEcaIndexee,
    vetusteCHF,
    valeurConstructionNette,
    valeurTerrain,
    amenagementsExterieurs,
    valeur,
    lignes: [
      {
        libelle: 'Valeur ECA indexée',
        montant: valeurEcaIndexee,
        detail: `Valeur ECA × coefficient d'indexation ${input.coefficientIndexationEca}`,
      },
      ...lignesVetuste,
      { libelle: 'Valeur de construction nette', montant: valeurConstructionNette, total: true },
      {
        libelle: 'Valeur du terrain',
        montant: valeurTerrain,
        detail: `${input.surfaceParcelle} m² × ${input.prixTerrainM2} CHF/m²`,
      },
      { libelle: 'Aménagements extérieurs', montant: amenagementsExterieurs },
      { libelle: 'Valeur intrinsèque', montant: valeur, total: true },
    ],
  };
}

// ── Méthode 2 : valeur de rendement ─────────────────────────────────────────
export function calculRendement(input: EstimationInput): ResultatRendement {
  const brut = nombre(input.etatLocatifBrutAnnuel);
  const chargesPct = clamp(nombre(input.chargesExploitationPct), 0, 1);
  const net = brut * (1 - chargesPct);
  const taux = nombre(input.tauxCapitalisation);
  const valeur = taux > 0 ? net / taux : 0;
  const rendementBrutSurValeur = valeur > 0 ? brut / valeur : 0;

  return {
    applicable: brut > 0 && taux > 0,
    etatLocatifBrut: brut,
    etatLocatifNet: net,
    tauxCapitalisation: taux,
    rendementBrutSurValeur,
    valeur,
    lignes: [
      { libelle: 'État locatif brut annuel', montant: brut },
      {
        libelle: `Charges d'exploitation (${(chargesPct * 100).toFixed(0)} %)`,
        montant: -(brut * chargesPct),
      },
      { libelle: 'État locatif net annuel', montant: net, total: true },
      {
        libelle: 'Valeur de rendement',
        montant: valeur,
        detail: `État locatif net ÷ taux de capitalisation ${(taux * 100).toFixed(2)} %`,
        total: true,
      },
    ],
  };
}

// ── Méthode 4 : comparaison de marché ───────────────────────────────────────
export function calculComparaison(input: EstimationInput): ResultatComparaison {
  const surface = nombre(input.surfaceHabitable);
  const valides = input.comparables.filter((c) => nombre(c.prix) > 0 && nombre(c.surface) > 0);

  const lignes = valides.map((c) => {
    const prixM2 = c.prix / c.surface;
    const prixM2Ajuste = prixM2 * (1 - nombre(c.ajustementPct));
    return {
      libelle: c.designation || 'Comparable',
      montant: prixM2Ajuste,
      detail: `${Math.round(prixM2)} CHF/m² · ajustement ${(c.ajustementPct * 100).toFixed(0)} % → ${Math.round(prixM2Ajuste)} CHF/m²`,
    };
  });

  const prixM2AjusteMoyen =
    lignes.length > 0 ? lignes.reduce((s, l) => s + l.montant, 0) / lignes.length : 0;
  const valeur = prixM2AjusteMoyen * surface;

  return {
    applicable: valides.length > 0 && surface > 0,
    prixM2AjusteMoyen,
    nbComparables: valides.length,
    valeur,
    lignes: [
      ...lignes,
      {
        libelle: 'Prix moyen ajusté au m²',
        montant: prixM2AjusteMoyen,
        detail: `Moyenne de ${valides.length} comparable(s)`,
        total: true,
      },
      {
        libelle: 'Valeur par comparaison',
        montant: valeur,
        detail: `${Math.round(prixM2AjusteMoyen)} CHF/m² × ${surface} m²`,
        total: true,
      },
    ],
  };
}

// ── Méthode 3 : valeur vénale (pondération) ─────────────────────────────────
export function calculVenale(
  input: EstimationInput,
  intrinseque: ResultatIntrinseque,
  rendement: ResultatRendement,
): ResultatVenale {
  let pInt = clamp(nombre(input.ponderationIntrinseque), 0, 1);
  let pRend = clamp(nombre(input.ponderationRendement), 0, 1);

  // Si la méthode de rendement n'est pas applicable, on bascule sur 100 %
  // intrinsèque pour ne pas fausser la vénale.
  if (!rendement.applicable) {
    pInt = 1;
    pRend = 0;
  }

  const valeur = intrinseque.valeur * pInt + rendement.valeur * pRend;

  return {
    ponderationIntrinseque: pInt,
    ponderationRendement: pRend,
    valeur,
    lignes: [
      {
        libelle: `Valeur intrinsèque (× ${(pInt * 100).toFixed(0)} %)`,
        montant: intrinseque.valeur * pInt,
      },
      {
        libelle: `Valeur de rendement (× ${(pRend * 100).toFixed(0)} %)`,
        montant: rendement.valeur * pRend,
      },
      { libelle: 'Valeur vénale pondérée', montant: valeur, total: true },
    ],
  };
}

// ── Orchestration + synthèse ────────────────────────────────────────────────
export function estimer(input: EstimationInput): EstimationResultat {
  const intrinseque = calculIntrinseque(input);
  const rendement = calculRendement(input);
  const comparaison = calculComparaison(input);
  const venale = calculVenale(input, intrinseque, rendement);

  const avertissements: string[] = [];
  const sommePond = nombre(input.ponderationIntrinseque) + nombre(input.ponderationRendement);
  if (rendement.applicable && Math.abs(sommePond - 1) > 0.001) {
    avertissements.push(
      `La somme des pondérations vaut ${(sommePond * 100).toFixed(0)} % (attendu : 100 %).`,
    );
  }
  const elementsPond = input.elementsOuvrage.reduce((s, e) => s + nombre(e.quotePart), 0);
  if (intrinseque.applicable && Math.abs(elementsPond - 1) > 0.001) {
    avertissements.push(
      `La somme des quote-parts d'ouvrage vaut ${(elementsPond * 100).toFixed(0)} % (attendu : 100 %).`,
    );
  }
  if (
    comparaison.applicable &&
    venale.valeur > 0 &&
    Math.abs(comparaison.valeur - venale.valeur) / venale.valeur > 0.15
  ) {
    avertissements.push(
      'La valeur par comparaison de marché diverge de plus de 15 % de la valeur vénale : à investiguer.',
    );
  }

  // Valeur retenue : selon la base choisie (vénale pondérée, comparaison de
  // marché, ou moyenne des deux). Pour un appartement, le marché prime.
  const base = input.baseValeurRetenue ?? 'venale'
  let valeurBrute = venale.valeur
  if (base === 'comparaison') {
    valeurBrute = comparaison.applicable ? comparaison.valeur : venale.valeur
  } else if (base === 'moyenne') {
    const vals = [venale.valeur, comparaison.applicable ? comparaison.valeur : null].filter(
      (x): x is number => x != null && x > 0,
    )
    valeurBrute = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : venale.valeur
  }
  const valeurRetenue = arrondirAuPalier(valeurBrute, PALIER_ARRONDI_PRIX);
  const marge = clamp(nombre(input.margeFourchette), 0, 0.5);
  const fourchetteBasse = arrondirAuPalier(valeurRetenue * (1 - marge), PALIER_ARRONDI_PRIX);
  const fourchetteHaute = arrondirAuPalier(valeurRetenue * (1 + marge), PALIER_ARRONDI_PRIX);
  const prixMiseEnVente = arrondirAuPalier(
    valeurRetenue * (1 + clamp(nombre(input.strategiePrixPct), 0, 0.5)),
    PALIER_ARRONDI_PRIX,
  );
  const prixPlancher = fourchetteBasse;

  return {
    intrinseque,
    rendement,
    comparaison,
    venale,
    synthese: {
      valeurRetenue,
      fourchetteBasse,
      fourchetteHaute,
      prixMiseEnVente,
      prixPlancher,
    },
    avertissements,
  };
}

/** Construit une entrée par défaut cohérente pour un type de bien / commune. */
export { estimer as default };
