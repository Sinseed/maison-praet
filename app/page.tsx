'use client'
import { useState, useEffect } from 'react'
import { Phone, Mail, MapPin, ChevronDown, ArrowRight, Shield, TrendingUp, Users, Menu, X } from 'lucide-react'
import Link from 'next/link'

// ─── DATA ────────────────────────────────────────────────────────────────────
const MANDATS = [
  { id: 1, titre: 'Villa individuelle', lieu: 'Yverdon-les-Bains', prix: "2'290'000", pieces: '8.5', surface: '240 m²', terrain: "1'260 m²", statut: 'actif', img: '/photos/yverdon.jpg' },
  { id: 2, titre: 'Maison villageoise', lieu: 'Riex', prix: "1'450'000", pieces: '6.5', surface: '180 m²', terrain: '350 m²', statut: 'actif', img: '/photos/riex.jpg' },
  { id: 3, titre: 'Appartement', lieu: 'Gland', prix: "690'000", pieces: '4.5', surface: '110 m²', terrain: '-', statut: 'actif', img: '/photos/gland.jpg' },
  { id: 4, titre: 'Maison de village', lieu: 'Morges', prix: "1'750'000", pieces: '5.5', surface: '160 m²', terrain: '400 m²', statut: 'actif', img: '/photos/morges.jpg' },
  { id: 5, titre: 'Immeuble de rendement', lieu: 'Lausanne', prix: "6'000'000", pieces: '-', surface: '520 m²', terrain: '-', statut: 'actif', img: '/photos/lausanne-vallon.jpg' },
  { id: 6, titre: 'Villa jumelle', lieu: 'Tartegnin', prix: "1'110'000", pieces: '5.5', surface: '140 m²', terrain: '300 m²', statut: 'vendu', img: '/photos/tartegnin.jpg' },
]

const STATS = [
  { value: '6+', label: "Années d'expérience" },
  { value: '40+', label: 'Transactions réalisées' },
  { value: '100%', label: 'Arc lémanique & Gros-de-Vaud' },
]

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-brand-dark/95 backdrop-blur-md border-b border-brand-border' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="#" className="font-display text-2xl font-semibold tracking-wide text-white">
          Maison <span className="text-brand-gold">Praet</span>
        </a>
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {['À propos', 'Mandats', 'Approche', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s/g, '').replace('à', 'a')}`}
               className="font-body text-sm tracking-widest uppercase text-brand-muted hover:text-brand-gold transition-colors duration-300">
              {item}
            </a>
          ))}
          <Link href="/crm" className="font-body text-xs tracking-widest uppercase text-brand-border hover:text-brand-muted transition-colors duration-300">
            CRM
          </Link>
        </div>
        {/* Mobile */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-brand-dark/98 backdrop-blur-lg border-t border-brand-border px-6 pb-6 space-y-4">
          {['À propos', 'Mandats', 'Approche', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s/g, '').replace('à', 'a')}`}
               onClick={() => setOpen(false)}
               className="block font-body text-sm tracking-widest uppercase text-brand-muted hover:text-brand-gold transition-colors">
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-[#0E1219] to-[#111620]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-gold/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-brand-gold/3 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Decorative line */}
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-brand-gold to-transparent mx-auto mb-10 opacity-40" />

        <p className="font-body text-sm tracking-[0.35em] uppercase text-brand-gold mb-8">
          Courtage immobilier · Canton de Vaud
        </p>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[1.1] mb-8 text-balance">
          L&apos;immobilier, c&apos;est avant tout
          <span className="block italic text-brand-gold font-normal mt-2">une relation.</span>
        </h1>

        <p className="font-body text-lg sm:text-xl text-brand-muted max-w-2xl mx-auto mb-12 leading-relaxed">
          Thomas Praet · Courtier certifié USPI · Plus de 6 ans sur le terrain, de Morges à Yverdon-les-Bains.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contact"
             className="group inline-flex items-center gap-3 bg-brand-gold text-brand-dark px-8 py-4 font-body text-sm font-medium tracking-widest uppercase hover:bg-brand-goldLight transition-all duration-300">
            Prendre contact
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#mandats"
             className="inline-flex items-center gap-3 border border-brand-border text-brand-text px-8 py-4 font-body text-sm tracking-widest uppercase hover:border-brand-gold hover:text-brand-gold transition-all duration-300">
            Voir les mandats
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown size={20} className="text-brand-muted" />
      </div>
    </section>
  )
}

// ─── STATS BAR ──────────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <section className="border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {STATS.map(s => (
          <div key={s.label} className="text-center">
            <p className="font-display text-4xl md:text-5xl font-light text-brand-gold">{s.value}</p>
            <p className="font-body text-sm tracking-widest uppercase text-brand-muted mt-2">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── ABOUT ──────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="apropos" className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Photo placeholder */}
        <div className="relative aspect-[3/4] bg-brand-card border border-brand-border overflow-hidden group">
          <div className="absolute inset-0 flex items-center justify-center text-brand-muted font-body text-sm tracking-widest uppercase">
            Portrait
          </div>
          {/* Uncomment when photo is added: */}
          {/* <img src="/photos/portrait.jpg" alt="Thomas Praet" className="object-cover w-full h-full" /> */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-brand-dark/80 to-transparent" />
        </div>

        <div>
          <p className="font-body text-sm tracking-[0.3em] uppercase text-brand-gold mb-4">À propos</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-8 leading-tight">
            Un courtier qui vous dit<br />
            <span className="italic text-brand-gold">la vérité.</span>
          </h2>
          <div className="space-y-5 font-body text-brand-text leading-relaxed">
            <p>
              Je ne suis pas un courtier qui promet un prix pour obtenir un mandat, puis le baisse trois mois plus tard.
              Si je ne suis pas convaincu de pouvoir vendre votre bien dans de bonnes conditions, je vous le dis.
            </p>
            <p>
              Depuis plus de six ans, j&apos;accompagne des propriétaires sur l&apos;ensemble de l&apos;arc lémanique et du Gros-de-Vaud.
              Chaque mandat est traité avec la même rigueur : estimation fondée, stratégie de prix réaliste, suivi transparent
              jusqu&apos;à la signature chez le notaire.
            </p>
            <p>
              Certifié USPI, rattaché à Golay Immobilier SA, une régie lausannoise de référence.
            </p>
          </div>
          {/* Quote */}
          <blockquote className="mt-10 pl-6 border-l-2 border-brand-gold/40">
            <p className="font-display text-xl italic text-brand-goldLight leading-relaxed">
              &laquo;&nbsp;Si je n&apos;en suis pas convaincu, je vous le dis.&nbsp;&raquo;
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  )
}

// ─── APPROACH / SERVICES ────────────────────────────────────────────────────
function Approach() {
  const services = [
    {
      icon: <TrendingUp size={28} />,
      title: 'Estimation & stratégie de prix',
      desc: "Analyse complète : valeur intrinsèque, valeur de rendement, valeur vénale. Un rapport structuré qui vous donne les clés pour décider en connaissance de cause.",
    },
    {
      icon: <Shield size={28} />,
      title: 'Mise en vente & commercialisation',
      desc: "Dossier acquéreur premium, shooting professionnel, diffusion ciblée sur les portails et dans mon réseau. Chaque bien mérite une présentation à sa hauteur.",
    },
    {
      icon: <Users size={28} />,
      title: 'Négociation & closing',
      desc: "Sélection des acquéreurs, accompagnement de la négociation, coordination notariale. Vous êtes informé à chaque étape, sans surprise.",
    },
  ]

  return (
    <section id="approche" className="bg-brand-card/50 border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="text-center mb-16">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-brand-gold mb-4">Mon approche</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white">
            Trois étapes,<br />
            <span className="italic text-brand-gold">un seul objectif.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="group bg-brand-dark border border-brand-border p-8 hover:border-brand-gold/30 transition-all duration-500">
              <div className="text-brand-gold mb-6 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
              <h3 className="font-display text-2xl font-medium text-white mb-4">{s.title}</h3>
              <p className="font-body text-brand-muted leading-relaxed">{s.desc}</p>
              <div className="w-12 h-px bg-brand-gold/30 mt-6 group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── MANDATS ────────────────────────────────────────────────────────────────
function Mandats() {
  return (
    <section id="mandats" className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div className="text-center mb-16">
        <p className="font-body text-sm tracking-[0.3em] uppercase text-brand-gold mb-4">Portefeuille</p>
        <h2 className="font-display text-4xl md:text-5xl font-light text-white">
          Mandats <span className="italic text-brand-gold">en cours</span>
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MANDATS.map(m => (
          <div key={m.id} className="group bg-brand-card border border-brand-border overflow-hidden hover:border-brand-gold/30 transition-all duration-500">
            {/* Image placeholder */}
            <div className="relative aspect-[4/3] bg-brand-dark overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-brand-muted/40 font-body text-xs tracking-widest uppercase">
                Photo
              </div>
              {/* Uncomment when photos are added: */}
              {/* <img src={m.img} alt={m.titre} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" /> */}
              {m.statut === 'vendu' && (
                <div className="absolute top-4 right-4 bg-brand-gold text-brand-dark px-3 py-1 font-body text-xs font-medium tracking-widest uppercase">
                  Vendu
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-brand-card to-transparent" />
            </div>
            <div className="p-6">
              <p className="font-body text-xs tracking-widest uppercase text-brand-gold mb-2">{m.lieu}</p>
              <h3 className="font-display text-2xl text-white mb-3">{m.titre}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-body text-sm text-brand-muted">CHF</span>
                <span className="font-display text-xl text-white">{m.prix}.-</span>
              </div>
              <div className="flex gap-4 text-brand-muted font-body text-sm">
                {m.pieces !== '-' && <span>{m.pieces} pièces</span>}
                <span>{m.surface}</span>
                {m.terrain !== '-' && <span>Terrain {m.terrain}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── CONTACT ────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="bg-brand-card/50 border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-body text-sm tracking-[0.3em] uppercase text-brand-gold mb-4">Contact</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-8 leading-tight">
              Parlons de<br />
              <span className="italic text-brand-gold">votre projet.</span>
            </h2>
            <p className="font-body text-brand-muted leading-relaxed mb-10">
              Que vous souhaitiez vendre, obtenir une estimation ou simplement un avis sur votre situation immobilière,
              je suis à votre disposition pour un premier échange sans engagement.
            </p>
            <div className="space-y-6">
              <a href="tel:+41799690191" className="flex items-center gap-4 group">
                <div className="w-12 h-12 border border-brand-border flex items-center justify-center group-hover:border-brand-gold transition-colors">
                  <Phone size={18} className="text-brand-gold" />
                </div>
                <div>
                  <p className="font-body text-xs tracking-widest uppercase text-brand-muted">Téléphone</p>
                  <p className="font-body text-white group-hover:text-brand-gold transition-colors">+41 79 969 01 91</p>
                </div>
              </a>
              <a href="mailto:thomas@maisonpraet.ch" className="flex items-center gap-4 group">
                <div className="w-12 h-12 border border-brand-border flex items-center justify-center group-hover:border-brand-gold transition-colors">
                  <Mail size={18} className="text-brand-gold" />
                </div>
                <div>
                  <p className="font-body text-xs tracking-widest uppercase text-brand-muted">Email</p>
                  <p className="font-body text-white group-hover:text-brand-gold transition-colors">thomas@maisonpraet.ch</p>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-brand-border flex items-center justify-center">
                  <MapPin size={18} className="text-brand-gold" />
                </div>
                <div>
                  <p className="font-body text-xs tracking-widest uppercase text-brand-muted">Bureau</p>
                  <p className="font-body text-white">Golay Immobilier SA · Lausanne</p>
                </div>
              </div>
            </div>
          </div>
          {/* Map or visual placeholder */}
          <div className="relative aspect-square bg-brand-dark border border-brand-border overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} className="text-brand-gold mx-auto mb-4" />
                <p className="font-body text-sm tracking-widest uppercase text-brand-muted">Arc lémanique</p>
                <p className="font-body text-xs text-brand-muted/60 mt-1">Gros-de-Vaud</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="font-display text-lg text-white">
        Maison <span className="text-brand-gold">Praet</span>
      </p>
      <p className="font-body text-xs text-brand-muted tracking-wider">
        © {new Date().getFullYear()} Thomas Praet · Golay Immobilier SA · Tous droits réservés
      </p>
    </footer>
  )
}

// ─── PAGE ───────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <StatsBar />
      <About />
      <Approach />
      <Mandats />
      <Contact />
      <Footer />
    </main>
  )
}
