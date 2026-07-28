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
  created_at: string
}
