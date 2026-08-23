import { prixAffichable } from '@/lib/biens'

/**
 * Affichage unifié du prix d'un bien (site public).
 * Les prix vivent en chaîne dans data.ts (« 2'190'000 »). Ce composant garantit
 * un rendu cohérent partout — et gère le cas « - » (prix confidentiel), qui
 * affichait auparavant « CHF -.- ».
 */
export default function PrixBien({
  prix,
  taille = 'md',
  couleur = 'or',
  className = '',
}: {
  prix: string
  taille?: 'sm' | 'md' | 'lg'
  couleur?: 'or' | 'blanc'
  className?: string
}) {
  const tailleChf = { sm: 'text-sm', md: 'text-sm', lg: 'text-lg' }[taille]
  const tailleNum = { sm: 'text-sm', md: 'text-xl', lg: 'text-3xl' }[taille]

  if (!prixAffichable(prix)) {
    return <span className={`font-body ${tailleChf} text-brand-muted italic ${className}`}>Prix confidentiel</span>
  }

  const teinte = couleur === 'blanc' ? 'text-white' : 'text-brand-gold'
  return (
    <span className={`inline-flex items-baseline gap-1.5 ${className}`}>
      <span className={`font-body ${tailleChf} text-brand-muted`}>CHF</span>
      <span className={`font-display ${tailleNum} ${teinte}`}>{prix}.-</span>
    </span>
  )
}
