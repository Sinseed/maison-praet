/** Types légers des lignes manipulées par l'espace /app. */

export interface ContactRow {
  id: string
  prenom: string | null
  nom: string | null
  telephone: string | null
  email: string | null
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
