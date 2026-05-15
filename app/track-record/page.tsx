'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin, TrendingUp, Building2, Calendar } from 'lucide-react'
import { MANDATS } from '../data'
import { COMMUNES_COORDS, projectToSVG } from '../communes-data'

// ─── HERO ───────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 max-w-7xl mx-auto px-6">
      <p className="font-body text-sm tracking-[0.3em] uppercase text-brand-gold mb-6">Track Record</p>
      <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-[1.05] mb-8 max-w-4xl">
        Les chiffres parlent<br />
        <span className="italic text-brand-gold">avant moi.</span>
      </h1>
      <p className="font-body text-lg text-brand-text leading-relaxed max-w-2xl">
        Une cartographie complète de mes mandats et transactions sur l'arc lémanique et le canton de Vaud. Pas de discours, des faits.
      </p>
    </section>
  )
}

// ─── STATS AGRÉGÉES ─────────────────────────────────────────────────────────
function Stats() {
  const stats = useMemo(() => {
    const valides = MANDATS.filter(m => m.photos.length > 0)
    const volume = valides.reduce((sum, m) => {
      const n = parseInt(m.prix.replace(/'/g, '').replace(/[^\d]/g, ''))
      return sum + (isNaN(n) ? 0 : n)
    }, 0)
    const communes = new Set(valides.map(m => m.lieu)).size
    const vendus = valides.filter(m => m.categorie === 'vendu').length
    return { total: valides.length, volume, communes, vendus }
  }, [])

  const formatChf = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
    return `${(n / 1000).toFixed(0)}K`
  }

  const items = [
    { label: 'Transactions documentées', value: `${stats.total}`, sub: '60+ au total depuis 2020' },
    { label: 'Volume cumulé sous mandat', value: `CHF ${formatChf(stats.volume)}`, sub: 'Valeur des biens confiés' },
    { label: 'Communes traitées', value: `${stats.communes}`, sub: 'Arc lémanique et Vaud' },
    { label: 'Biens vendus', value: `${stats.vendus}`, sub: 'Hors mandats actifs' },
  ]

  return (
    <section className="border-y border-brand-border bg-brand-card/30">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
        {items.map((it, i) => (
          <div key={i} className="text-center md:text-left">
            <p className="font-display text-4xl md:text-5xl font-light text-brand-gold leading-none mb-3">{it.value}</p>
            <p className="font-body text-xs tracking-widest uppercase text-white mb-1">{it.label}</p>
            <p className="font-body text-xs text-brand-muted">{it.sub}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── CARTE INTERACTIVE ──────────────────────────────────────────────────────
function MapSection() {
  const [hover, setHover] = useState<string | null>(null)

  // Groupe les mandats par commune
  const parCommune = useMemo(() => {
    const map: Record<string, typeof MANDATS> = {}
    MANDATS.filter(m => m.photos.length > 0).forEach(m => {
      if (!map[m.lieu]) map[m.lieu] = []
      map[m.lieu].push(m)
    })
    return map
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
      <div className="mb-12 md:mb-16 max-w-2xl">
        <p className="font-body text-sm tracking-[0.3em] uppercase text-brand-gold mb-4">Couverture géographique</p>
        <h2 className="font-display text-3xl md:text-4xl font-light text-white leading-tight">
          Mes mandats sur<br /><span className="italic text-brand-gold">l'arc lémanique.</span>
        </h2>
      </div>

      <div className="relative bg-brand-card/40 border border-brand-border rounded-sm overflow-hidden">
        <div className="relative aspect-[10/7] w-full">
          <svg viewBox="0 0 1000 700" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            {/* Léman stylisé */}
            <defs>
              <linearGradient id="lacGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a2a3a" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0a1520" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            {/* Lac Léman approximatif */}
            <path
              d="M 30 510 Q 100 480 200 490 Q 320 500 420 510 Q 550 520 650 535 Q 760 555 870 570 Q 940 580 990 590 L 1000 620 Q 920 640 800 645 Q 650 650 520 640 Q 400 625 290 605 Q 180 585 90 565 Q 30 550 15 535 Z"
              fill="url(#lacGradient)"
              stroke="#C9A96E"
              strokeWidth="0.5"
              strokeOpacity="0.3"
            />
            <text x="450" y="610" className="fill-brand-muted" fontSize="14" fontFamily="Outfit" letterSpacing="3" opacity="0.5">LAC LÉMAN</text>

            {/* Pins */}
            {Object.entries(parCommune).map(([commune, biens]) => {
              const coords = COMMUNES_COORDS[commune]
              if (!coords) return null
              const { x, y } = projectToSVG(coords.lat, coords.lng)
              const isHover = hover === commune
              const r = 6 + Math.min(biens.length, 5) * 1.5
              return (
                <g
                  key={commune}
                  transform={`translate(${x}, ${y})`}
                  onMouseEnter={() => setHover(commune)}
                  onMouseLeave={() => setHover(null)}
                  className="cursor-pointer"
                >
                  {/* Halo animé */}
                  <circle r={r + 4} fill="#C9A96E" opacity={isHover ? 0.25 : 0.1}>
                    <animate attributeName="r" values={`${r + 2};${r + 8};${r + 2}`} dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.2;0;0.2" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <circle r={r} fill={isHover ? '#E2CFA5' : '#C9A96E'} stroke="#0C0F14" strokeWidth="2" />
                  <text y="-12" textAnchor="middle" fill={isHover ? '#E2CFA5' : '#C8CDD8'} fontSize={isHover ? 14 : 11} fontFamily="Outfit" fontWeight={isHover ? 600 : 400} className="pointer-events-none transition-all">
                    {commune.split(',')[0].split(' ')[0]}
                  </text>
                  {biens.length > 1 && (
                    <text y="3" textAnchor="middle" fill="#0C0F14" fontSize="9" fontFamily="Outfit" fontWeight="700" className="pointer-events-none">
                      {biens.length}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>

        {/* Détails au survol */}
        {hover && parCommune[hover] && (
          <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-md bg-brand-dark/95 backdrop-blur-md border border-brand-gold/40 p-5">
            <p className="font-display text-2xl text-white mb-1">{hover}</p>
            <p className="font-body text-xs text-brand-muted tracking-wider mb-3">
              {COMMUNES_COORDS[hover]?.region} · {parCommune[hover].length} {parCommune[hover].length > 1 ? 'mandats' : 'mandat'}
            </p>
            <div className="space-y-1.5">
              {parCommune[hover].slice(0, 4).map(b => (
                <p key={b.id} className="font-body text-sm text-brand-text">
                  <span className="text-brand-gold">·</span> {b.titre} <span className="text-brand-muted text-xs">({b.categorie === 'en_vente' ? 'En vente' : b.categorie === 'reserve' ? 'Réservé' : 'Vendu'})</span>
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="font-body text-xs text-brand-muted mt-4 italic">Survolez les points pour voir le détail. Localisation au niveau communal uniquement, par respect de la confidentialité des transactions.</p>
    </section>
  )
}

// ─── LISTE FILTRABLE ────────────────────────────────────────────────────────
function ListeSection() {
  const [filtre, setFiltre] = useState<'all' | 'en_vente' | 'reserve' | 'vendu'>('all')
  const [region, setRegion] = useState<string>('all')

  const filtered = useMemo(() => {
    return MANDATS.filter(m => m.photos.length > 0)
      .filter(m => filtre === 'all' || m.categorie === filtre)
      .filter(m => {
        if (region === 'all') return true
        const coords = COMMUNES_COORDS[m.lieu]
        return coords?.region === region
      })
      .sort((a, b) => {
        const order = { en_vente: 0, reserve: 1, vendu: 2 }
        return (order[a.categorie] ?? 9) - (order[b.categorie] ?? 9)
      })
  }, [filtre, region])

  const regions = useMemo(() => {
    return Array.from(new Set(Object.values(COMMUNES_COORDS).map(c => c.region))).sort()
  }, [])

  const badgeLabel = (cat: string) => cat === 'en_vente' ? 'En vente' : cat === 'reserve' ? 'Réservé' : 'Vendu'
  const badgeColor = (cat: string) => cat === 'en_vente' ? 'bg-brand-gold text-brand-dark' : cat === 'reserve' ? 'bg-amber-700/60 text-amber-200' : 'bg-green-800/60 text-green-200'

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 border-t border-brand-border">
      <div className="mb-12 max-w-2xl">
        <p className="font-body text-sm tracking-[0.3em] uppercase text-brand-gold mb-4">Détail des transactions</p>
        <h2 className="font-display text-3xl md:text-4xl font-light text-white leading-tight">
          Chaque bien,<br /><span className="italic text-brand-gold">son histoire.</span>
        </h2>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-3 mb-10">
        {[
          { key: 'all', label: 'Tous' },
          { key: 'en_vente', label: 'En vente' },
          { key: 'reserve', label: 'Réservés' },
          { key: 'vendu', label: 'Vendus' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFiltre(f.key as any)}
            className={`font-body text-xs tracking-widest uppercase px-4 py-2 border transition-all ${filtre === f.key ? 'border-brand-gold text-brand-gold' : 'border-brand-border text-brand-muted hover:text-brand-text'}`}
          >
            {f.label}
          </button>
        ))}
        <div className="hidden md:block w-px bg-brand-border mx-2" />
        <select
          value={region}
          onChange={e => setRegion(e.target.value)}
          className="font-body text-xs tracking-widest uppercase px-4 py-2 bg-brand-dark border border-brand-border text-brand-muted hover:text-brand-text focus:border-brand-gold focus:text-brand-text outline-none"
        >
          <option value="all">Toutes régions</option>
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <p className="ml-auto font-body text-xs text-brand-muted self-center">{filtered.length} {filtered.length > 1 ? 'résultats' : 'résultat'}</p>
      </div>

      {/* Table */}
      <div className="border border-brand-border overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-brand-border bg-brand-card/40 font-body text-xs tracking-widest uppercase text-brand-muted">
          <div className="col-span-3">Bien</div>
          <div className="col-span-3">Commune</div>
          <div className="col-span-2">Région</div>
          <div className="col-span-2">Caractéristiques</div>
          <div className="col-span-1 text-right">Statut</div>
          <div className="col-span-1 text-right"></div>
        </div>
        {filtered.map((m, i) => (
          <Link
            key={m.id}
            href={`/biens/${m.slug}`}
            className={`block group hover:bg-brand-card/30 transition-colors ${i < filtered.length - 1 ? 'border-b border-brand-border' : ''}`}
          >
            <div className="grid grid-cols-2 md:grid-cols-12 gap-4 px-6 py-5 items-center">
              <div className="col-span-2 md:col-span-3">
                <p className="font-display text-lg text-white group-hover:text-brand-gold transition-colors">{m.titre}</p>
              </div>
              <div className="col-span-1 md:col-span-3 flex items-center gap-2">
                <MapPin size={14} className="text-brand-muted shrink-0" />
                <p className="font-body text-sm text-brand-text">{m.lieu}</p>
              </div>
              <div className="hidden md:block md:col-span-2 font-body text-sm text-brand-muted">
                {COMMUNES_COORDS[m.lieu]?.region || '—'}
              </div>
              <div className="col-span-1 md:col-span-2 font-body text-xs text-brand-muted">
                {m.pieces !== '-' && `${m.pieces} pièces`}{m.surface !== '-' && ` · ${m.surface}`}
              </div>
              <div className="col-span-2 md:col-span-1 md:text-right">
                <span className={`inline-block font-body text-[10px] tracking-widest uppercase px-2 py-1 ${badgeColor(m.categorie)}`}>
                  {badgeLabel(m.categorie)}
                </span>
              </div>
              <div className="hidden md:flex md:col-span-1 justify-end">
                <ArrowRight size={16} className="text-brand-border group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

// ─── CTA ────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="bg-brand-card/50 border-y border-brand-border">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
        <p className="font-body text-sm tracking-[0.3em] uppercase text-brand-gold mb-4">Et le vôtre ?</p>
        <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-8 leading-tight">
          Votre bien aura sa<br /><span className="italic text-brand-gold">place sur cette carte.</span>
        </h2>
        <p className="font-body text-brand-text leading-relaxed mb-10 max-w-xl mx-auto">
          Estimation gratuite, sans engagement. Je vous dis ce que vaut votre bien, ce que je peux en faire, et combien de temps cela prendra.
        </p>
        <Link
          href="/#estimation"
          className="group inline-flex items-center gap-3 bg-brand-gold text-brand-dark px-8 py-4 font-body text-sm font-medium tracking-widest uppercase hover:bg-brand-goldLight transition-all duration-300"
        >
          Estimer mon bien
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  )
}

// ─── PAGE ───────────────────────────────────────────────────────────────────
export default function TrackRecordPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Hero />
      <Stats />
      <MapSection />
      <ListeSection />
      <CTA />
    </div>
  )
}
