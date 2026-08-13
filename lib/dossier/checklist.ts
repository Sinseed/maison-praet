/**
 * Checklist de documents standard, pré-remplie selon le type de bien.
 * Le courtier ajuste ensuite (ajout / suppression) dossier par dossier.
 * Les `type` correspondent à l'enum `type_document` de la base.
 */

import type { TypeBien } from '@/lib/estimation/types'

export interface DocDefaut {
  type: string
  nom: string
}

const COMMUN: DocDefaut[] = [
  { type: 'extrait_rf', nom: 'Extrait du registre foncier' },
  { type: 'plan', nom: 'Plans du bien' },
  { type: 'cecb', nom: 'CECB (certificat énergétique)' },
  { type: 'piece_identite', nom: "Pièce d'identité du vendeur (LBA)" },
]

export function checklistDefaut(type: TypeBien): DocDefaut[] {
  switch (type) {
    case 'ppe':
      return [
        ...COMMUN,
        { type: 'reglement_ppe', nom: 'Règlement de PPE' },
        { type: 'pv_assemblee', nom: "PV des dernières assemblées" },
        { type: 'autre', nom: 'État du fonds de rénovation' },
      ]
    case 'immeuble':
      return [
        ...COMMUN,
        { type: 'etat_locatif', nom: 'État locatif' },
        { type: 'autre', nom: 'Baux à loyer' },
      ]
    case 'terrain':
      return [
        { type: 'extrait_rf', nom: 'Extrait du registre foncier' },
        { type: 'plan', nom: 'Plan de situation / cadastre' },
        { type: 'autre', nom: "Renseignements d'aménagement (zone, équipement)" },
        { type: 'piece_identite', nom: "Pièce d'identité du vendeur (LBA)" },
      ]
    default:
      return COMMUN
  }
}

// ── Libellés lisibles ───────────────────────────────────────────────────────
export const STATUT_DOC_LABELS: Record<string, { label: string; classe: string }> = {
  manquant: { label: 'Manquant', classe: 'bg-red-500/15 text-red-300 border-red-500/30' },
  demande: { label: 'Demandé', classe: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  recu: { label: 'Reçu', classe: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
}

export const STATUT_BIEN_LABELS: Record<string, string> = {
  prospection: 'Prospection',
  estimation: 'Estimation',
  mandat_signe: 'Mandat signé',
  preparation: 'Préparation',
  en_vente: 'En vente',
  visites: 'Visites',
  offre: 'Offre',
  conditions_suspensives: 'Conditions suspensives',
  acte: 'Acte',
  encaissement: 'Encaissement',
  vendu: 'Vendu',
  perdu: 'Perdu',
}

export const STATUT_OFFRE_LABELS: Record<string, { label: string; classe: string }> = {
  recue: { label: 'Reçue', classe: 'bg-sky-500/15 text-sky-300 border-sky-500/30' },
  en_negociation: { label: 'En négociation', classe: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  acceptee: { label: 'Acceptée', classe: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
  refusee: { label: 'Refusée', classe: 'bg-red-500/15 text-red-300 border-red-500/30' },
  retiree: { label: 'Retirée', classe: 'bg-white/5 text-brand-muted border-brand-border' },
  caduque: { label: 'Caduque', classe: 'bg-white/5 text-brand-muted border-brand-border' },
}

export const CANAL_LABELS: Record<string, string> = {
  note: 'Note',
  email: 'Email',
  appel: 'Appel',
  notaire: 'Notaire',
  autre: 'Autre',
}
