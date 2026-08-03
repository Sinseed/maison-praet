'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Espaces privés (app métier) : pas de navigation du site public.
  if (pathname?.startsWith('/app') || pathname?.startsWith('/crm')) return null

  // On homepage, use anchor links. On subpages, link back to homepage sections.
  const sectionLink = (hash: string) => isHome ? hash : `/${hash}`

  /** La barre affiche son fond sombre : hors du haut de la page d'accueil. */
  const barreOpaque = scrolled || !isHome

  const links = [
    { label: 'À propos', href: sectionLink('#apropos') },
    { label: 'Biens en vente', href: sectionLink('#nosbiens') },
    { label: 'Track Record', href: '/track-record' },
    { label: 'Méthode', href: '/methode' },
    { label: 'Guides', href: '/journal' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${barreOpaque ? 'bg-brand-dark/95 backdrop-blur-md border-b border-brand-border shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)]' : 'border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Co-branding : Maison Praet reste la marque principale ; Golay
            Immobilier SA, sous laquelle chaque mandat est signé, apparaît en
            signature secondaire (plus petit, atténué, séparé d'un filet). */}
        <div className="flex items-center gap-3 sm:gap-5 min-w-0">
          <Link href="/" className="flex items-center shrink-0">
            <img src="/logo-maison-praet.png" alt="Maison Praet" style={{width: 'clamp(90px, 12vw, 160px)', height: 'auto'}} />
          </Link>
          {/* La signature Golay n'apparaît que lorsque la barre a son fond
              sombre. Sur la photo d'accueil, la barre est transparente : le
              logo se superposerait au portrait, ce qui fait accidentel. */}
          <span
            className={`block h-6 sm:h-7 w-px bg-brand-border shrink-0 transition-opacity duration-500 ${barreOpaque ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden="true"
          />
          <a
            href="https://www.golay-immobilier.ch"
            target="_blank"
            rel="noopener noreferrer"
            title="Chaque mandat est signé sous Golay Immobilier SA"
            aria-hidden={!barreOpaque}
            tabIndex={barreOpaque ? undefined : -1}
            className={`flex items-center shrink-0 transition-opacity duration-500 ${barreOpaque ? 'opacity-55 hover:opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <img src="/logo-golay-blanc.png" alt="Golay Immobilier SA" style={{width: 'clamp(68px, 8vw, 116px)', height: 'auto'}} />
          </a>
        </div>
        <div className="hidden md:flex items-center gap-10">
          {links.map(item => (
            item.href.startsWith('#') ? (
              <a key={item.label} href={item.href} className="link-underline font-body text-sm tracking-widest uppercase text-brand-muted hover:text-brand-gold transition-colors duration-300">{item.label}</a>
            ) : (
              <Link key={item.label} href={item.href} data-active={pathname === item.href} className={`link-underline font-body text-sm tracking-widest uppercase transition-colors duration-300 ${pathname === item.href ? 'text-brand-gold' : 'text-brand-muted hover:text-brand-gold'}`}>{item.label}</Link>
            )
          ))}
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-brand-dark/98 backdrop-blur-lg border-t border-brand-border px-6 pb-6 space-y-4">
          {links.map(item => (
            item.href.startsWith('#') ? (
              <a key={item.label} href={item.href} onClick={() => setOpen(false)} className="block font-body text-sm tracking-widest uppercase text-brand-muted hover:text-brand-gold transition-colors">{item.label}</a>
            ) : (
              <Link key={item.label} href={item.href} onClick={() => setOpen(false)} className="block font-body text-sm tracking-widest uppercase text-brand-muted hover:text-brand-gold transition-colors">{item.label}</Link>
            )
          ))}
        </div>
      )}
    </nav>
  )
}
