'use client'
import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowRight, MapPin, TrendingUp, Building2, Calendar, Home, Building, Layers, Trees, Mountain, ChevronDown } from 'lucide-react'
import { MANDATS } from '../data'
import { COMMUNES_COORDS } from '../communes-data'

const TrackMap = dynamic(() => import('../components/TrackMap'), {
  ssr: false,
  loading: () => (
    <div className="aspect-[16/10] bg-brand-card/40 border border-brand-border flex items-center justify-center">
      <p className="font-body text-sm text-brand-muted tracking-wider uppercase">Chargement de la carte…</p>
    </div>
  ),
})

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
// Médiane forfaitaire utilisée pour estimer le volume des transactions historiques
// dont le prix exact reste confidentiel. Volontairement prudente (en dessous de
// la médiane réelle du marché vaudois 2020-2023) pour rester défensive.
const MEDIANE_HISTORIQUE = 900_000

function Stats() {
  const stats = useMemo(() => {
    // Toutes les transactions documentées : mandats actuels (avec photos) + historique (sans photos mais avec annee_vente)
    const valides = MANDATS.filter(m => m.photos.length > 0 || m.annee_vente)
    // Compteur de transactions : 1 par mandat, indépendamment du nombre de lots vendus
    // (mode "mandats décrochés", plus modeste et lisible que "lots individuels vendus")
    const totalTransactions = valides.length
    // Volume cumulé : prix réels + estimation forfaitaire * nb_lots pour les sans-prix
    // (mode "actes notariés générés", qui reflète la réalité économique des promotions)
    const volume = valides.reduce((sum, m) => {
      const n = parseInt(m.prix.replace(/'/g, '').replace(/[^\d]/g, ''))
      if (!isNaN(n) && n > 0) return sum + n
      return sum + ((m.nb_lots || 1) * MEDIANE_HISTORIQUE)
    }, 0)
    const communes = new Set(valides.map(m => m.lieu)).size
    return { total: totalTransactions, volume, communes }
  }, [])

  const formatChf = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
    return `${(n / 1000).toFixed(0)}K`
  }

  const items = [
    { label: 'Mandats documentés', value: `${stats.total}`, sub: 'Plus de 90 transactions au total depuis 2020' },
    { label: 'Volume cumulé sous mandat', value: `CHF ${formatChf(stats.volume)}`, sub: 'Actes notariés générés' },
    { label: 'Communes traitées', value: `${stats.communes}`, sub: 'Arc lémanique et Vaud' },
  ]

  return (
    <section className="border-y border-brand-border bg-brand-card/30">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {items.map((it, i) => (
            <div key={i} className="text-center md:text-left">
              <p className="font-display text-4xl md:text-5xl font-light text-brand-gold leading-none mb-3">{it.value}</p>
              <p className="font-body text-xs tracking-widest uppercase text-white mb-1">{it.label}</p>
              <p className="font-body text-xs text-brand-muted">{it.sub}</p>
            </div>
          ))}
        </div>
        <p className="font-body text-xs text-brand-muted italic mt-12 md:mt-16 max-w-3xl leading-relaxed">
          Mes transactions antérieures à 2024 sont conservées confidentielles par respect de mes anciens clients : les communes apparaissent sur la carte, mais sans détail individuel. Le volume cumulé intègre une estimation prudente pour ces transactions, en dessous des médianes observées sur le marché vaudois.
        </p>
      </div>
    </section>
  )
}

// ─── CARTE INTERACTIVE ──────────────────────────────────────────────────────
function MapSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
      <div className="mb-12 md:mb-16 max-w-2xl">
        <p className="font-body text-sm tracking-[0.3em] uppercase text-brand-gold mb-4">Couverture géographique</p>
        <h2 className="font-display text-3xl md:text-4xl font-light text-white leading-tight">
          Mes mandats sur<br /><span className="italic text-brand-gold">l'arc lémanique.</span>
        </h2>
      </div>

      <TrackMap />

      <p className="font-body text-xs text-brand-muted mt-4 italic">
        Cliquez sur un point pour voir le détail des mandats. Localisation au niveau communal uniquement, par respect de la confidentialité des transactions.
      </p>
    </section>
  )
}

// ─── ANATOMIE (typologies, gammes, statuts) ────────────────────────────────
type Typologie = 'appartement' | 'villa' | 'maison' | 'immeuble' | 'promotion' | 'terrain'

function classifier(m: typeof MANDATS[number]): Typologie {
  const t = m.titre.toLowerCase()
  if (t.includes('promotion') || t.includes('ppe avenue') || (m.nb_lots && m.nb_lots > 1 && !t.startsWith('immeuble'))) return 'promotion'
  if (t.startsWith('immeuble')) return 'immeuble'
  if (t.includes('terrain') || t.includes('bien-fonds')) return 'terrain'
  if (t.startsWith('villa')) return 'villa'
  if (t.startsWith('maison') || t.includes('chalet') || t.includes('ferme')) return 'maison'
  if (t.includes('appartement') || t.includes('ppe')) return 'appartement'
  return 'maison'
}

function AnatomieSection() {
  const breakdown = useMemo(() => {
    const valides = MANDATS.filter(m => m.photos.length > 0 || m.annee_vente)
    const total = valides.length
    const counts: Record<Typologie, number> = {
      appartement: 0, villa: 0, maison: 0, immeuble: 0, promotion: 0, terrain: 0,
    }
    valides.forEach(m => { counts[classifier(m)]++ })
    return { counts, total }
  }, [])

  const typologies: { key: Typologie; label: string; sub: string; icon: any }[] = [
    { key: 'appartement', label: 'Appartements PPE', sub: 'Du 1.5 au 5.5 pièces', icon: Building },
    { key: 'villa',       label: 'Villas',           sub: 'Individuelles, mitoyennes, jumelées', icon: Home },
    { key: 'maison',      label: 'Maisons',          sub: 'Villageoises, vigneronnes, fermes', icon: Mountain },
    { key: 'immeuble',    label: 'Immeubles',        sub: 'Locatifs et de rendement', icon: Building2 },
    { key: 'promotion',   label: 'Promotions',       sub: 'Multi-lots résidentielles et mixtes', icon: Layers },
    { key: 'terrain',     label: 'Terrains',         sub: 'Bien-fonds et parcelles', icon: Trees },
  ]

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 border-t border-brand-border">
      <div className="mb-12 md:mb-16 max-w-2xl">
        <p className="font-body text-sm tracking-[0.3em] uppercase text-brand-gold mb-4">Anatomie de mes mandats</p>
        <h2 className="font-display text-3xl md:text-4xl font-light text-white leading-tight mb-6">
          Une polyvalence<br /><span className="italic text-brand-gold">éprouvée.</span>
        </h2>
        <p className="font-body text-base text-brand-text leading-relaxed">
          Du studio en ville à l&apos;immeuble de rapport, du terrain à bâtir à la promotion mixte. J&apos;ai traité tous les types de biens que l&apos;arc lémanique propose, à toutes les gammes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-border">
        {typologies.map(t => {
          const count = breakdown.counts[t.key]
          const pct = breakdown.total > 0 ? (count / breakdown.total) * 100 : 0
          const Icon = t.icon
          return (
            <div key={t.key} className="bg-brand-dark p-8 md:p-10">
              <div className="flex items-start justify-between mb-6">
                <Icon size={28} className="text-brand-gold" strokeWidth={1.2} />
                <p className="font-display text-5xl font-light text-white leading-none">{count}</p>
              </div>
              <p className="font-body text-sm tracking-widest uppercase text-white mb-1">{t.label}</p>
              <p className="font-body text-xs text-brand-muted mb-5">{t.sub}</p>
              <div className="h-px w-full bg-brand-border relative">
                <div
                  className="absolute inset-y-0 left-0 bg-brand-gold transition-all"
                  style={{ width: `${pct}%`, height: '1px' }}
                />
              </div>
              <p className="font-body text-[10px] tracking-widest uppercase text-brand-muted mt-2">
                {pct.toFixed(0)}% des mandats
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ─── LISTE FILTRABLE (repliée par défaut) ──────────────────────────────────
function ListeSection() {
  const [expanded, setExpanded] = useState(false)
  const [filtre, setFiltre] = useState<'all' | 'en_vente' | 'reserve' | 'vendu'>('all')
  const [region, setRegion] = useState<string>('all')

  const totalValides = useMemo(
    () => MANDATS.filter(m => m.photos.length > 0 || m.annee_vente).length,
    []
  )

  const filtered = useMemo(() => {
    return MANDATS.filter(m => m.photos.length > 0 || m.annee_vente)
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
      <div className="mb-10 max-w-2xl">
        <p className="font-body text-sm tracking-[0.3em] uppercase text-brand-gold mb-4">Détail des transactions</p>
        <h2 className="font-display text-3xl md:text-4xl font-light text-white leading-tight mb-6">
          Chaque bien,<br /><span className="italic text-brand-gold">son histoire.</span>
        </h2>
        <p className="font-body text-base text-brand-text leading-relaxed">
          {expanded
            ? `Le détail intégral de mes ${totalValides} mandats documentés, filtrable par statut et par région.`
            : `Pour les visiteurs qui souhaitent vérifier chaque transaction, le détail complet de mes ${totalValides} mandats reste disponible.`}
        </p>
      </div>

      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="group inline-flex items-center gap-3 border border-brand-border text-brand-text hover:border-brand-gold hover:text-brand-gold px-6 py-4 font-body text-xs tracking-widest uppercase transition-all"
        >
          Voir le détail des {totalValides} mandats
          <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
        </button>
      )}

      {expanded && (
        <>
          {/* Filtres */}
          <div className="flex flex-wrap gap-3 mb-10 mt-4">
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
            {filtered.map((m, i) => {
              const isHistorique = m.photos.length === 0 && m.annee_vente
              const RowWrapper: any = isHistorique ? 'div' : Link
              const wrapperProps = isHistorique ? {} : { href: `/biens/${m.slug}` }
              return (
                <RowWrapper
                  key={m.id}
                  {...wrapperProps}
                  className={`block ${isHistorique ? '' : 'group hover:bg-brand-card/30'} transition-colors ${i < filtered.length - 1 ? 'border-b border-brand-border' : ''}`}
                >
                  <div className="grid grid-cols-2 md:grid-cols-12 gap-4 px-6 py-5 items-center">
                    <div className="col-span-2 md:col-span-3">
                      <p className={`font-display text-lg text-white ${!isHistorique && 'group-hover:text-brand-gold'} transition-colors`}>
                        {m.titre}
                        {m.nb_lots && m.nb_lots > 1 && <span className="text-brand-gold text-sm font-body ml-2">· {m.nb_lots} lots</span>}
                      </p>
                    </div>
                    <div className="col-span-1 md:col-span-3 flex items-center gap-2">
                      <MapPin size={14} className="text-brand-muted shrink-0" />
                      <p className="font-body text-sm text-brand-text">{m.lieu}</p>
                    </div>
                    <div className="hidden md:block md:col-span-2 font-body text-sm text-brand-muted">
                      {COMMUNES_COORDS[m.lieu]?.region || '—'}
                    </div>
                    <div className="col-span-1 md:col-span-2 font-body text-xs text-brand-muted">
                      {m.annee_vente ? `Vendu · ${m.annee_vente}` : m.composition ? m.composition : `${m.pieces !== '-' ? `${m.pieces} pièces` : ''}${m.surface !== '-' ? ` · ${m.surface}` : ''}`}
                    </div>
                    <div className="col-span-2 md:col-span-1 md:text-right">
                      <span className={`inline-block font-body text-[10px] tracking-widest uppercase px-2 py-1 ${badgeColor(m.categorie)}`}>
                        {badgeLabel(m.categorie)}
                      </span>
                    </div>
                    <div className="hidden md:flex md:col-span-1 justify-end">
                      {!isHistorique && <ArrowRight size={16} className="text-brand-border group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />}
                    </div>
                  </div>
                </RowWrapper>
              )
            })}
          </div>

          <button
            onClick={() => setExpanded(false)}
            className="mt-8 font-body text-xs tracking-widest uppercase text-brand-muted hover:text-brand-gold transition-colors inline-flex items-center gap-2"
          >
            <ChevronDown size={14} className="rotate-180" />
            Masquer le détail
          </button>
        </>
      )}
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
      <AnatomieSection />
      <ListeSection />
      <CTA />
    </div>
  )
}
