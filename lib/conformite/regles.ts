/**
 * Moteur de règles du radar de conformité — fonctions pures.
 *
 * Chaque règle produit une alerte avec : niveau, note en langage clair, base
 * légale, et (le cas échéant) un délai à provisionner au rétroplanning.
 *
 * ⚠️ Alertes INDICATIVES (cf. MENTIONS.conformite). Elles ne remplacent ni le
 * notaire, ni les autorités compétentes.
 */

import { LPPPL, LEX_KOLLER, LDFR, LAT, CONSERVATION } from '@/lib/config/reglementaire'
import { TYPE_SERVITUDE_LABELS } from '@/lib/conformite/types'
import type { Alerte, ConformiteInput, SyntheseConformite } from '@/lib/conformite/types'

/** Année de référence par défaut (cf. DATE_VERIFICATION du référentiel). */
const ANNEE_REFERENCE = 2026

export function evaluerConformite(
  input: ConformiteInput,
  anneeCourante: number = ANNEE_REFERENCE,
): Alerte[] {
  const alertes: Alerte[] = []

  // ── LPPPL — préservation du parc locatif ──────────────────────────────────
  if (input.nbLogements > LPPPL.seuilNbLogements) {
    alertes.push({
      code: 'lpppl_alienation',
      domaine: 'LPPPL',
      niveau: 'bloquant',
      titre: "Autorisation d'aliéner probablement requise",
      message:
        `L'immeuble compte ${input.nbLogements} logements (plus de ${LPPPL.seuilNbLogements}). ` +
        'La vente d\'un immeuble locatif de cette taille peut être soumise à autorisation ' +
        "d'aliéner et, selon la commune, à un droit de préemption. Ces démarches prennent du " +
        'temps : à provisionner impérativement au rétroplanning avant de viser une date d\'acte.',
      baseLegale: 'LPPPL (RSV 840.15)',
      delaiJours: LPPPL.delaiIndicatifJours,
      action: 'Vérifier auprès de la commune / DGTL le régime applicable avant la mise en vente.',
    })
  }
  if (input.logementLoue) {
    alertes.push({
      code: 'lpppl_logement_loue',
      domaine: 'LPPPL',
      niveau: 'informatif',
      titre: "Vente d'un logement loué",
      message:
        'La vente porte sur un logement actuellement loué. Vérifier les droits du locataire ' +
        '(information, éventuel droit de préemption selon la situation) et les délais de congé ' +
        'applicables si une libération est attendue.',
      baseLegale: 'LPPPL (RSV 840.15) ; CO art. 271 ss (bail)',
      action: 'Confirmer le statut du bail et informer le locataire dans les formes.',
    })
  }

  // ── Lex Koller / LFAIE — personnes à l'étranger ───────────────────────────
  const assujettiLexKoller = !input.acquereurSuisse && input.acquereurPermis !== 'C'
  if (assujettiLexKoller) {
    const bienSensible = input.type === 'immeuble'
    alertes.push({
      code: 'lex_koller',
      domaine: 'Lex Koller / LFAIE',
      niveau: bienSensible ? 'bloquant' : 'informatif',
      titre: 'Acquéreur potentiellement assujetti à la Lex Koller',
      message:
        "L'acquéreur pressenti n'est ni ressortissant suisse ni titulaire d'un permis C. " +
        "L'acquisition par une personne à l'étranger d'un logement autre que sa résidence " +
        'principale, ou d\'un immeuble de rendement, est soumise à autorisation. La résidence ' +
        'principale effectivement habitée par un titulaire de permis B est en principe non ' +
        'assujettie — à confirmer au cas par cas.',
      baseLegale: 'LFAIE (RS 211.412.41)',
      action: "Faire vérifier l'assujettissement avant d'engager l'acquéreur sur une offre.",
    })
  }

  // ── LDFR — droit foncier rural ────────────────────────────────────────────
  if (input.zoneAgricole || input.surfaceParcelle > LDFR.seuilSurfaceM2) {
    alertes.push({
      code: 'ldfr',
      domaine: 'LDFR',
      niveau: input.zoneAgricole ? 'bloquant' : 'informatif',
      titre: "Autorisation d'acquérir (droit foncier rural) à vérifier",
      message:
        (input.zoneAgricole
          ? 'La parcelle est en zone agricole. '
          : `La surface (${input.surfaceParcelle} m²) dépasse le seuil indicatif de ${LDFR.seuilSurfaceM2} m². `) +
        "L'acquisition d'un immeuble agricole est soumise à autorisation et au principe de " +
        "l'exploitant à titre personnel. Des exceptions existent (petites surfaces, absence " +
        "d'entreprise agricole).",
      baseLegale: 'LDFR (RS 211.412.11)',
      action: "Vérifier le régime auprès de l'autorité foncière cantonale.",
    })
  }

  // ── LAT / LATC — taxe sur la plus-value ───────────────────────────────────
  if (input.dezonage || input.zoneReservee) {
    alertes.push({
      code: 'lat_plus_value',
      domaine: 'LAT / LATC',
      niveau: 'informatif',
      titre: 'Taxe sur la plus-value possible',
      message:
        'Le bien est concerné par un classement / une zone réservée. Un classement en zone à ' +
        `bâtir peut déclencher une taxe sur la plus-value (part indicative de l'ordre de ` +
        `${Math.round(LAT.tauxPlusValueIndicatifPct * 100)} %), à intégrer au décompte du vendeur.`,
      baseLegale: 'LAT (RS 700) art. 5 ; LATC (RSV 700.11)',
      action: 'Vérifier le statut de la parcelle et l\'éventuelle taxe auprès de la commune.',
    })
  }
  if (input.zoneABatirNonEquipee) {
    alertes.push({
      code: 'lat_non_equipee',
      domaine: 'LAT / LATC',
      niveau: 'informatif',
      titre: 'Zone à bâtir non équipée',
      message:
        "Le terrain est en zone à bâtir mais non équipé. La constructibilité effective dépend " +
        "de l'équipement (accès, eau, énergie, évacuation). À clarifier avant toute promesse " +
        'de constructibilité à un acquéreur.',
      baseLegale: 'LAT (RS 700) ; LATC (RSV 700.11)',
      action: "Vérifier l'état d'équipement et les coûts éventuels à la charge de l'acquéreur.",
    })
  }

  // ── Servitudes & charges (extrait du registre foncier) ────────────────────
  alertes.push({
    code: 'rf_lecture',
    domaine: 'Registre foncier',
    niveau: input.servitudes.length > 0 ? 'ok' : 'informatif',
    titre: "Lecture de l'extrait du registre foncier",
    message:
      input.servitudes.length > 0
        ? `${input.servitudes.length} servitude(s) / charge(s) saisie(s). Vérifier leur impact ` +
          'sur la valeur et sur les possibilités d\'usage du bien.'
        : "Aucune servitude saisie. Passer en revue l'extrait du RF (droits de passage, usufruit, " +
          "droit d'habitation, DDP, charges) et les consigner ci-dessous.",
    baseLegale: 'CC art. 730 ss ; CC art. 943 ss (registre foncier)',
    action: "Reporter chaque servitude de l'extrait RF dans la liste structurée.",
  })

  input.servitudes.forEach((s) => {
    if (s.type === 'ddp' && s.echeance) {
      const annEcheance = new Date(s.echeance).getFullYear()
      const restant = annEcheance - anneeCourante
      if (Number.isFinite(annEcheance)) {
        alertes.push({
          code: `ddp_${s.id}`,
          domaine: 'Registre foncier',
          niveau: restant <= 30 ? 'bloquant' : 'informatif',
          titre: `DDP — ${restant} an(s) restant(s)`,
          message:
            `Le droit de superficie arrive à échéance en ${annEcheance} (dans ${restant} an(s)). ` +
            'Une durée résiduelle courte pèse sur la valeur et complique le financement bancaire ' +
            "(les banques exigent souvent une durée résiduelle confortable). À signaler clairement.",
          baseLegale: 'CC art. 779 ss (droit de superficie)',
          action: 'Vérifier les conditions de renouvellement et l\'indemnité de retour.',
        })
      }
    }
  })

  // ── LBA — blanchiment (obligations de diligence) ──────────────────────────
  const lbaFait = input.cocontractantIdentifie && input.ayantDroitEcoIdentifie
  alertes.push({
    code: 'lba_identification',
    domaine: 'LBA',
    niveau: lbaFait ? 'ok' : 'informatif',
    titre: lbaFait
      ? 'Identification LBA effectuée'
      : "Identifier le cocontractant et l'ayant droit économique",
    message: lbaFait
      ? "Le cocontractant et l'ayant droit économique ont été identifiés."
      : "Avant la transaction, identifier formellement le cocontractant et déterminer l'ayant " +
        'droit économique. Conserver les copies des pièces.',
    baseLegale: 'LBA (RS 955.0)',
    action: lbaFait ? undefined : "Compléter l'identification et archiver les pièces.",
  })
  alertes.push({
    code: 'lba_conservation',
    domaine: 'LBA',
    niveau: input.piecesConservees ? 'ok' : 'informatif',
    titre: input.piecesConservees
      ? 'Pièces conservées'
      : `Conserver les pièces ${CONSERVATION.lbaAnnees} ans`,
    message: input.piecesConservees
      ? `Les pièces d'identification sont archivées (durée légale : ${CONSERVATION.lbaAnnees} ans).`
      : `Les documents d'identification doivent être conservés ${CONSERVATION.lbaAnnees} ans.`,
    baseLegale: 'LBA (RS 955.0)',
  })

  // ── nLPD — protection des données ─────────────────────────────────────────
  alertes.push({
    code: 'lpd_consentement',
    domaine: 'nLPD',
    niveau: input.consentementContacts ? 'ok' : 'informatif',
    titre: input.consentementContacts
      ? 'Consentement des contacts recueilli'
      : 'Recueillir le consentement des contacts',
    message: input.consentementContacts
      ? 'Les contacts ont consenti au traitement de leurs données.'
      : 'Recueillir et tracer le consentement des personnes dont les données sont traitées, et ' +
        'les informer de la finalité et de la durée de conservation.',
    baseLegale: 'nLPD (RS 235.1)',
  })
  alertes.push({
    code: 'lpd_registre',
    domaine: 'nLPD',
    niveau: input.registreTraitements ? 'ok' : 'informatif',
    titre: input.registreTraitements
      ? 'Registre des traitements tenu'
      : 'Tenir le registre des traitements',
    message: input.registreTraitements
      ? 'Le registre des traitements est à jour.'
      : `Tenir un registre des traitements (finalités, catégories de données, durées de ` +
        `conservation — ${CONSERVATION.lpdAnneesDefaut} ans par défaut).`,
    baseLegale: 'nLPD (RS 235.1)',
  })

  return alertes
}

/** Synthèse : compte par niveau + délai réglementaire max à provisionner. */
export function synthetiser(alertes: Alerte[]): SyntheseConformite {
  return {
    bloquants: alertes.filter((a) => a.niveau === 'bloquant').length,
    informatifs: alertes.filter((a) => a.niveau === 'informatif').length,
    ok: alertes.filter((a) => a.niveau === 'ok').length,
    delaiMaxJours: alertes.reduce((m, a) => Math.max(m, a.delaiJours ?? 0), 0),
  }
}

/** Ordre d'affichage : bloquant → informatif → ok. */
export function ordonner(alertes: Alerte[]): Alerte[] {
  const rang = { bloquant: 0, informatif: 1, ok: 2 }
  return [...alertes].sort((a, b) => rang[a.niveau] - rang[b.niveau])
}

/** Libellé lisible d'un type de servitude (ré-export pratique pour l'UI). */
export { TYPE_SERVITUDE_LABELS }
