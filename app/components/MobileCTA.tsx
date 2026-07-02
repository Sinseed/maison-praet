'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Phone, ArrowRight } from 'lucide-react'

/**
 * Persistent call-to-action bar shown only on mobile. Always within thumb reach,
 * it keeps "Estimer" and "Appeler" one tap away. Hidden on the estimation page
 * itself (where the form already is) to avoid redundancy.
 */
export default function MobileCTA() {
  const pathname = usePathname()
  if (pathname?.startsWith('/estimation')) return null

  // Sur une fiche bien, le visiteur est un acquéreur potentiel :
  // on lui propose le dossier du bien plutôt qu'une estimation vendeur.
  const isBien = pathname?.startsWith('/biens/')

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-brand-border bg-brand-dark/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-2">
        <a
          href="tel:+41799690191"
          className="flex items-center justify-center gap-2 py-4 font-body text-xs tracking-widest uppercase text-brand-text border-r border-brand-border active:bg-brand-card/50 transition-colors"
        >
          <Phone size={15} className="text-brand-gold" /> Appeler
        </a>
        {isBien ? (
          <a
            href="mailto:tpraet@golay-immobilier.ch?subject=Demande de dossier"
            className="group flex items-center justify-center gap-2 py-4 font-body text-xs tracking-widest uppercase text-brand-dark bg-brand-gold active:bg-brand-goldLight transition-colors"
          >
            Demander le dossier <ArrowRight size={14} className="group-active:translate-x-1 transition-transform" />
          </a>
        ) : (
          <Link
            href="/estimation"
            className="group flex items-center justify-center gap-2 py-4 font-body text-xs tracking-widest uppercase text-brand-dark bg-brand-gold active:bg-brand-goldLight transition-colors"
          >
            Estimer mon bien <ArrowRight size={14} className="group-active:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  )
}
