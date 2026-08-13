/** Types légers des lignes manipulées par l'espace /app. */

export interface ContactRow {
  id: string
  type: string
  prenom: string | null
  nom: string | null
  societe: string | null
  telephone: string | null
  email: string | null
  adresse: string | null
  npa_localite: string | null
  /** nLPD : consentement au traitement des données. */
  consentement_lpd: boolean
  /** LBA : identification du cocontractant faite. */
  lba_identifie: boolean
  notes: string | null
}

export interface AcquereurRow {
  id: string
  contact_id: string | null
  budget_valide: number | null
  communes_recherchees: string[]
  typologies: string[]
  surface_min: number | null
  created_at: string
  contact: ContactRow | null
}

export interface TacheRow {
  id: string
  titre: string
  description: string | null
  echeance: string | null
  statut: string
  bien_id: string | null
  created_at: string
}

export interface BienRow {
  id: string
  type: string
  statut: string
  commune: string
  adresse: string | null
  reference: string | null
  annee_construction: number | null
  vendeur_id: string | null
  notes: string | null
  created_at: string
}

export interface DocumentRow {
  id: string
  bien_id: string | null
  type: string
  nom: string
  statut: string // manquant | demande | recu
  date_demande: string | null
  date_reception: string | null
  notes: string | null
  storage_path: string | null
  created_at: string
}

export interface EchangeRow {
  id: string
  bien_id: string | null
  contact_id: string | null
  canal: string
  contenu: string
  date_echange: string
  created_at: string
}

export interface OffreRow {
  id: string
  bien_id: string
  acquereur_id: string | null
  montant: number
  statut: string // recue | en_negociation | acceptee | refusee | retiree | caduque
  date_offre: string
  /** Garde-fou : true si l'acquéreur n'était pas (encore) qualifié à la réception. */
  acquereur_non_qualifie: boolean
  notes: string | null
  created_at: string
}
