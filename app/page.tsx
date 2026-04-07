'use client'
import { useState, useEffect } from 'react'
import { Phone, Mail, MapPin, ChevronDown, ArrowRight, Shield, TrendingUp, Users, Menu, X } from 'lucide-react'
import Link from 'next/link'

// ─── DATA ────────────────────────────────────────────────────────────────────
type Mandat = {
  id: number
  titre: string
  lieu: string
  prix: string
  pieces: string
  surface: string
  terrain: string
  categorie: 'exclusif' | 'partage' | 'vendu'
  img: string
}

const MANDATS: Mandat[] = [
  // Mandats exclusifs
  { id: 1, titre: 'Maison individuelle', lieu: 'Yverdon-les-Bains', prix: "2'290'000", pieces: '8.5', surface: '240 m²', terrain: "1'260 m²", categorie: 'exclusif', img: '/photos/yverdon/IMG_5987.jpg' },
  { id: 2, titre: 'Immeuble de rendement', lieu: 'Lausanne', prix: "6'000'000", pieces: '-', surface: '520 m²', terrain: '-', categorie: 'exclusif', img: '' },
  { id: 3, titre: 'Immeuble locatif', lieu: 'Glion', prix: "2'420'000", pieces: '-', surface: '-', terrain: '-', categorie: 'exclusif', img: '' },
  { id: 4, titre: 'Immeuble locatif', lieu: 'Lausanne', prix: "1'790'000", pieces: '-', surface: '-', terrain: '-', categorie: 'exclusif', img: '' },
  { id: 5, titre: 'Villa jumelée', lieu: 'Cossonay-Ville', prix: "1'450'000", pieces: '5.5', surface: '-', terrain: '-', categorie: 'exclusif', img: '' },
  { id: 6, titre: 'Appartement PPE', lieu: 'Epalinges', prix: "1'090'000", pieces: '4', surface: '-', terrain: '-', categorie: 'exclusif', img: '' },
  { id: 7, titre: 'Appartement PPE', lieu: 'Le Mont-sur-Lausanne', prix: "930'000", pieces: '-', surface: '-', terrain: '-', categorie: 'exclusif', img: '' },
  // Mandats partagés
  { id: 8, titre: 'Maison jumelée', lieu: 'Gland', prix: "2'750'000", pieces: '-', surface: '-', terrain: '-', categorie: 'partage', img: '/photos/gland-buis/DJI_20260115164414_0005_D.jpg' },
  { id: 9, titre: 'Maison villageoise', lieu: 'Tartegnin', prix: "1'660'000", pieces: '-', surface: '-', terrain: '-', categorie: 'partage', img: '' },
  { id: 10, titre: 'Maison mitoyenne', lieu: 'Dully', prix: "1'590'000", pieces: '-', surface: '-', terrain: '-', categorie: 'partage', img: '' },
  { id: 11, titre: 'Appartement', lieu: 'Gland', prix: "1'250'000", pieces: '-', surface: '-', terrain: '-', categorie: 'partage', img: '/photos/gland-aubepine/DJI_20260115163614_0002_D.jpg' },
  { id: 12, titre: 'Appartement', lieu: 'Longirod', prix: "795'000", pieces: '-', surface: '-', terrain: '-', categorie: 'partage', img: '' },
  // Ventes conclues
  { id: 13, titre: 'Maison individuelle', lieu: 'Senarclens', prix: "1'500'000", pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', img: '' },
  { id: 14, titre: 'Immeuble 3 logements', lieu: 'Lausanne', prix: "1'480'000", pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', img: '' },
]

const STATS = [
  { value: '6+', label: "Années d'expérience" },
  { value: '40+', label: 'Transactions réalisées' },
  { value: '100%', label: 'Arc lémanique & Gros-de-Vaud' },
]

const FILTRES = [
  { key: 'all', label: 'Tous' },
  { key: 'exclusif', label: 'Exclusifs' },
  { key: 'partage', label: 'Partagés' },
  { key: 'vendu', label: 'Vendus' },
] as const

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
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-[#0E1219] to-[#111620]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-gold/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-brand-gold/3 blur-[100px]" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
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
        <div className="relative aspect-[3/4] bg-brand-card border border-brand-border overflow-hidden group">
          <img src="/photos/portrait.jpg" alt="Thomas Praet" className="object-cover object-top w-full h-full group-hover:scale-[1.02] transition-transform duration-700" />
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

// ─── APPROACH ───────────────────────────────────────────────────────────────
function Approach() {
  const services = [
    { icon: <TrendingUp size={28} />, title: 'Estimation & stratégie de prix', desc: "Analyse complète : valeur intrinsèque, valeur de rendement, valeur vénale. Un rapport structuré qui vous donne les clés pour décider en connaissance de cause." },
    { icon: <Shield size={28} />, title: 'Mise en vente & commercialisation', desc: "Dossier acquéreur premium, shooting professionnel, diffusion ciblée sur les portails et dans mon réseau. Chaque bien mérite une présentation à sa hauteur." },
    { icon: <Users size={28} />, title: 'Négociation & closing', desc: "Sélection des acquéreurs, accompagnement de la négociation, coordination notariale. Vous êtes informé à chaque étape, sans surprise." },
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
  const [filtre, setFiltre] = useState<string>('all')
  const filtered = filtre === 'all' ? MANDATS : MANDATS.filter(m => m.categorie === filtre)

  const badgeLabel = (cat: string) => {
    if (cat === 'exclusif') return 'Exclusif'
    if (cat === 'partage') return 'Partagé'
    return 'Vendu'
  }
  const badgeColor = (cat: string) => {
    if (cat === 'exclusif') return 'bg-brand-gold text-brand-dark'
    if (cat === 'partage') return 'bg-brand-border text-brand-text'
    return 'bg-green-800/60 text-green-200'
  }

  return (
    <section id="mandats" className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div className="text-center mb-12">
        <p className="font-body text-sm tracking-[0.3em] uppercase text-brand-gold mb-4">Portefeuille</p>
        <h2 className="font-display text-4xl md:text-5xl font-light text-white">
          Mandats <span className="italic text-brand-gold">en cours</span>
        </h2>
      </div>
      <div className="flex justify-center gap-3 mb-12 flex-wrap">
        {FILTRES.map(f => (
          <button key={f.key} onClick={() => setFiltre(f.key)}
            className={`font-body text-xs tracking-widest uppercase px-5 py-2.5 border transition-all duration-300 ${
              filtre === f.key ? 'border-brand-gold text-brand-gold bg-brand-gold/10' : 'border-brand-border text-brand-muted hover:border-brand-gold/50 hover:text-brand-gold'
            }`}>
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(m => (
          <div key={m.id} className="group bg-brand-card border border-brand-border overflow-hidden hover:border-brand-gold/30 transition-all duration-500">
            <div className="relative aspect-[4/3] bg-brand-dark overflow-hidden">
              {m.img ? (
                <img src={m.img} alt={m.titre} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-brand-muted/40 font-body text-xs tracking-widest uppercase">Photo à venir</div>
              )}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 font-body text-xs font-medium tracking-widest uppercase ${badgeColor(m.categorie)}`}>{badgeLabel(m.categorie)}</span>
              </div>
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
                {m.surface !== '-' && <span>{m.surface}</span>}
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
