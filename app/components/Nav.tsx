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

  // On homepage, use anchor links. On subpages, link back to homepage sections.
  const sectionLink = (hash: string) => isHome ? hash : `/${hash}`

  const links = [
    { label: 'À propos', href: sectionLink('#apropos') },
    { label: 'Nos biens', href: sectionLink('#nosbiens') },
    { label: 'Approche', href: sectionLink('#approche') },
    { label: 'Journal', href: '/journal' },
    { label: 'Contact', href: sectionLink('#contact') },
  ]

  // Hide on CRM page
  if (pathname.startsWith('/crm')) return null

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || !isHome ? 'bg-brand-dark/95 backdrop-blur-md border-b border-brand-border' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl font-semibold tracking-wide text-white">
          Maison <span className="text-brand-gold">Praet</span>
        </Link>
        <div className="hidden md:flex items-center gap-10">
          {links.map(item => (
            item.href.startsWith('#') ? (
              <a key={item.label} href={item.href} className="font-body text-sm tracking-widest uppercase text-brand-muted hover:text-brand-gold transition-colors duration-300">{item.label}</a>
            ) : (
              <Link key={item.label} href={item.href} className="font-body text-sm tracking-widest uppercase text-brand-muted hover:text-brand-gold transition-colors duration-300">{item.label}</Link>
            )
          ))}
          <Link href="/crm" className="font-body text-xs tracking-widest uppercase text-brand-border hover:text-brand-muted transition-colors duration-300">CRM</Link>
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
