import { badgeBien } from '@/lib/biens'

/** Badge de statut d'un bien (En vente / Réservé / Vendu), rendu unifié. */
export default function BadgeBien({
  categorie,
  taille = 'md',
  className = '',
}: {
  categorie: string
  taille?: 'sm' | 'md'
  className?: string
}) {
  const { label, classe } = badgeBien(categorie)
  const padding = taille === 'sm' ? 'px-2 py-1' : 'px-3 py-1'
  return (
    <span className={`${padding} font-body text-xs font-medium tracking-widest uppercase ${classe} ${className}`}>
      {label}
    </span>
  )
}
