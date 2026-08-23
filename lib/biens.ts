/** Helpers partagés d'affichage des biens (site public). */

/** Libellé + classes de couleur du badge de statut d'un bien. */
export function badgeBien(categorie: string): { label: string; classe: string } {
  if (categorie === 'en_vente') return { label: 'En vente', classe: 'bg-brand-gold text-brand-dark' }
  if (categorie === 'reserve') return { label: 'Réservé', classe: 'bg-amber-700/60 text-amber-200' }
  return { label: 'Vendu', classe: 'bg-green-800/60 text-green-200' }
}

/** true si le prix est réellement affichable (sinon : confidentiel / à définir). */
export function prixAffichable(prix: string | null | undefined): boolean {
  return !!prix && prix.trim() !== '' && prix.trim() !== '-'
}
