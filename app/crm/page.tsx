'use client'
import { useState, useMemo } from 'react'
import { ArrowLeft, Search, Plus, X, ChevronRight, Home, Users, TrendingUp, Calendar, Filter } from 'lucide-react'
import Link from 'next/link'

// ─── TYPES ──────────────────────────────────────────────────────────────────
type Statut = 'prospect' | 'estimation' | 'mandat' | 'en_vente' | 'offre' | 'vendu' | 'perdu'
type Mandat = {
  id: number; nom: string; bien: string; lieu: string; prix: string;
  statut: Statut; date: string; notes: string; contact: string;
}

const STATUT_LABELS: Record<Statut, { label: string; color: string }> = {
  prospect: { label: 'Prospect', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  estimation: { label: 'Estimation', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  mandat: { label: 'Mandat signé', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  en_vente: { label: 'En vente', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  offre: { label: 'Offre reçue', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
  vendu: { label: 'Vendu', color: 'bg-brand-gold/20 text-brand-goldLight border-brand-gold/30' },
  perdu: { label: 'Perdu', color: 'bg-red-500/20 text-red-300 border-red-500/30' },
}

// ─── SAMPLE DATA ────────────────────────────────────────────────────────────
const INITIAL_DATA: Mandat[] = [
  { id: 1, nom: 'Belfiore / Gianzi', bien: 'Villa individuelle 8.5p', lieu: 'Yverdon-les-Bains', prix: "2'290'000", statut: 'en_vente', date: '2026-03-10', notes: 'Drone photos au printemps. Potentiel agrandissement ~524m².', contact: 'andrea.belfiore@me.com' },
  { id: 2, nom: 'Kunkler', bien: 'Maison Stettler 6.5p', lieu: 'Riex', prix: "1'450'000", statut: 'en_vente', date: '2026-02-15', notes: 'Bien patrimonial. Zéro CO2 direct (CECB).', contact: '' },
  { id: 3, nom: 'Haener', bien: 'Appartement 4.5p', lieu: 'Gland', prix: "690'000", statut: 'en_vente', date: '2025-11-01', notes: 'Pas d\'ascenseur, frein principal. Co-courtage déployé.', contact: '' },
  { id: 4, nom: 'Gesseney', bien: 'Maison de village 5.5p', lieu: 'Morges', prix: "1'750'000", statut: 'mandat', date: '2026-04-03', notes: 'Mandat exclusif 2.5% + TVA. Stratégie prix dégressive.', contact: 'granny.g@sunrise.ch' },
  { id: 5, nom: 'Sibilla', bien: 'Immeuble de rendement', lieu: 'Lausanne', prix: "6'000'000", statut: 'en_vente', date: '2025-09-01', notes: 'Offre CHF 5.4M refusée. Exposition tierce problématique.', contact: 'raphsibilla@gmail.com' },
  { id: 6, nom: 'Reymond', bien: 'Appartement 4.5p', lieu: 'Lausanne', prix: "1'590'000", statut: 'vendu', date: '2026-03-20', notes: 'Signing 15 avril, notaire Coveris. Acquéreur Miftari via Ferrys.', contact: '' },
  { id: 7, nom: 'Lombardi', bien: 'Villa jumelle 5.5p', lieu: 'Tartegnin', prix: "1'110'000", statut: 'offre', date: '2026-03-26', notes: 'Offre acceptée CHF 1.11M. Acte de vente à terme, PPE à créer.', contact: '' },
  { id: 8, nom: 'Henzer', bien: 'Villa jumelle 5.5p', lieu: 'Cossonay', prix: "1'330'000", statut: 'en_vente', date: '2026-03-18', notes: 'Jardin plat, vue Alpes+Jura. Brochure portails finalisée.', contact: '' },
  { id: 9, nom: 'Buvelot', bien: 'Maison', lieu: 'Denges', prix: '-', statut: 'prospect', date: '2026-04-02', notes: 'RDV estimation 21 avril 8h.', contact: '' },
  { id: 10, nom: 'Ström', bien: 'Bien à définir', lieu: 'Glion', prix: '-', statut: 'estimation', date: '2026-04-01', notes: 'CECB Route de Caux 93.', contact: '' },
]

// ─── PIN GATE ───────────────────────────────────────────────────────────────
function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const CODE = '2404'

  const handleSubmit = () => {
    if (pin === CODE) { onUnlock() }
    else { setError(true); setPin(''); setTimeout(() => setError(false), 1500) }
  }

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-6">
      <div className="w-full max-w-xs text-center">
        <p className="font-display text-2xl text-white mb-2">Maison <span className="text-brand-gold">Praet</span></p>
        <p className="font-body text-sm text-brand-muted mb-8">Espace courtier</p>
        <div className="flex gap-2 justify-center mb-6">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`w-12 h-14 border ${pin.length > i ? 'border-brand-gold bg-brand-gold/10' : error ? 'border-red-500' : 'border-brand-border'} flex items-center justify-center font-body text-xl text-white transition-all`}>
              {pin[i] ? '•' : ''}
            </div>
          ))}
        </div>
        <input
          type="password" inputMode="numeric" maxLength={4} value={pin}
          onChange={e => { setPin(e.target.value.replace(/\D/g, '').slice(0, 4)) }}
          onKeyDown={e => { if (e.key === 'Enter') handleSubmit() }}
          className="sr-only" autoFocus
        />
        <button onClick={handleSubmit}
          className="w-full bg-brand-gold text-brand-dark py-3 font-body text-sm font-medium tracking-widest uppercase hover:bg-brand-goldLight transition-colors">
          Accéder
        </button>
        {error && <p className="font-body text-red-400 text-sm mt-4">Code incorrect</p>}
        <Link href="/" className="inline-flex items-center gap-2 text-brand-muted font-body text-xs mt-6 hover:text-brand-gold transition-colors">
          <ArrowLeft size={14} /> Retour au site
        </Link>
      </div>
    </div>
  )
}

// ─── DASHBOARD ──────────────────────────────────────────────────────────────
function Dashboard() {
  const [data] = useState<Mandat[]>(INITIAL_DATA)
  const [search, setSearch] = useState('')
  const [filterStatut, setFilterStatut] = useState<Statut | 'all'>('all')
  const [selected, setSelected] = useState<Mandat | null>(null)

  const filtered = useMemo(() => {
    return data.filter(m => {
      const matchSearch = search === '' ||
        m.nom.toLowerCase().includes(search.toLowerCase()) ||
        m.lieu.toLowerCase().includes(search.toLowerCase()) ||
        m.bien.toLowerCase().includes(search.toLowerCase())
      const matchStatut = filterStatut === 'all' || m.statut === filterStatut
      return matchSearch && matchStatut
    })
  }, [data, search, filterStatut])

  const counts = useMemo(() => {
    const c: Record<string, number> = {}
    data.forEach(m => { c[m.statut] = (c[m.statut] || 0) + 1 })
    return c
  }, [data])

  const pipeline = [
    { key: 'prospect', icon: <Users size={18} />, label: 'Prospects', count: counts.prospect || 0 },
    { key: 'estimation', icon: <TrendingUp size={18} />, label: 'Estimations', count: counts.estimation || 0 },
    { key: 'mandat', icon: <Calendar size={18} />, label: 'Mandats', count: counts.mandat || 0 },
    { key: 'en_vente', icon: <Home size={18} />, label: 'En vente', count: counts.en_vente || 0 },
    { key: 'offre', icon: <ChevronRight size={18} />, label: 'Offres', count: counts.offre || 0 },
    { key: 'vendu', icon: <TrendingUp size={18} />, label: 'Vendus', count: counts.vendu || 0 },
  ]

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Top bar */}
      <header className="border-b border-brand-border bg-brand-dark/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-display text-xl text-white">
              Maison <span className="text-brand-gold">Praet</span>
            </Link>
            <span className="font-body text-xs tracking-widest uppercase text-brand-muted border border-brand-border px-2 py-0.5">CRM</span>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="text" placeholder="Rechercher..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-brand-card border border-brand-border pl-10 pr-4 py-2 font-body text-sm text-white placeholder:text-brand-muted/60 focus:outline-none focus:border-brand-gold/50 w-64 transition-colors"
            />
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        {/* Pipeline overview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {pipeline.map(p => (
            <button key={p.key}
              onClick={() => setFilterStatut(filterStatut === p.key as Statut ? 'all' : p.key as Statut)}
              className={`border p-4 text-left transition-all duration-300 ${
                filterStatut === p.key ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-border bg-brand-card hover:border-brand-border/80'
              }`}>
              <div className="flex items-center gap-2 text-brand-muted mb-2">
                {p.icon}
                <span className="font-body text-xs tracking-wider uppercase">{p.label}</span>
              </div>
              <p className="font-display text-3xl text-white">{p.count}</p>
            </button>
          ))}
        </div>

        {/* Filter chip */}
        {filterStatut !== 'all' && (
          <div className="mb-6 flex items-center gap-2">
            <Filter size={14} className="text-brand-muted" />
            <span className={`inline-flex items-center gap-2 px-3 py-1 border text-xs font-body ${STATUT_LABELS[filterStatut].color}`}>
              {STATUT_LABELS[filterStatut].label}
              <button onClick={() => setFilterStatut('all')}><X size={12} /></button>
            </span>
          </div>
        )}

        {/* Table */}
        <div className="border border-brand-border bg-brand-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-brand-border">
                {['Client', 'Bien', 'Lieu', 'Prix', 'Statut', 'Date'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-body text-xs tracking-widest uppercase text-brand-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => (
                <tr key={m.id}
                  onClick={() => setSelected(m)}
                  className="border-b border-brand-border/50 hover:bg-brand-dark/50 cursor-pointer transition-colors">
                  <td className="px-4 py-3 font-body text-sm text-white font-medium">{m.nom}</td>
                  <td className="px-4 py-3 font-body text-sm text-brand-text">{m.bien}</td>
                  <td className="px-4 py-3 font-body text-sm text-brand-text">{m.lieu}</td>
                  <td className="px-4 py-3 font-body text-sm text-brand-text">{m.prix !== '-' ? `CHF ${m.prix}.-` : '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 border text-xs font-body ${STATUT_LABELS[m.statut].color}`}>
                      {STATUT_LABELS[m.statut].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-brand-muted">{m.date}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-12 text-center font-body text-brand-muted">Aucun résultat</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative w-full max-w-md bg-brand-dark border-l border-brand-border h-full overflow-y-auto"
               onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <span className={`inline-block px-3 py-1 border text-xs font-body ${STATUT_LABELS[selected.statut].color}`}>
                  {STATUT_LABELS[selected.statut].label}
                </span>
                <button onClick={() => setSelected(null)} className="text-brand-muted hover:text-white"><X size={20} /></button>
              </div>
              <h2 className="font-display text-3xl text-white mb-1">{selected.nom}</h2>
              <p className="font-body text-brand-muted mb-8">{selected.bien} · {selected.lieu}</p>

              <div className="space-y-6">
                <div>
                  <p className="font-body text-xs tracking-widest uppercase text-brand-muted mb-1">Prix</p>
                  <p className="font-display text-2xl text-brand-gold">{selected.prix !== '-' ? `CHF ${selected.prix}.-` : 'À définir'}</p>
                </div>
                <div>
                  <p className="font-body text-xs tracking-widest uppercase text-brand-muted mb-1">Date</p>
                  <p className="font-body text-white">{selected.date}</p>
                </div>
                {selected.contact && (
                  <div>
                    <p className="font-body text-xs tracking-widest uppercase text-brand-muted mb-1">Contact</p>
                    <p className="font-body text-brand-gold">{selected.contact}</p>
                  </div>
                )}
                <div>
                  <p className="font-body text-xs tracking-widest uppercase text-brand-muted mb-2">Notes</p>
                  <div className="bg-brand-card border border-brand-border p-4">
                    <p className="font-body text-sm text-brand-text leading-relaxed whitespace-pre-wrap">{selected.notes}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── PAGE ───────────────────────────────────────────────────────────────────
export default function CRMPage() {
  const [unlocked, setUnlocked] = useState(false)
  if (!unlocked) return <PinGate onUnlock={() => setUnlocked(true)} />
  return <Dashboard />
}
