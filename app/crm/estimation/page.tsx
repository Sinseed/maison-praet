'use client'

/**
 * CourtierOS — Atelier d'estimation multi-méthodes.
 *
 * Toutes les hypothèses sont visibles et modifiables (« aucune boîte noire »).
 * Les quatre méthodes sont recalculées en direct côté client ; le rapport PDF
 * est généré côté serveur (/api/crm/estimation/pdf).
 *
 * Persistance locale (localStorage) pour un fonctionnement hors ligne dégradé.
 */

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Download, Plus, Trash2, RefreshCw, AlertTriangle, FolderPlus } from 'lucide-react'
import PinGate from '../PinGate'
import { createClient } from '@/lib/supabase/client'
import { checklistDefaut } from '@/lib/dossier/checklist'
import { estimer } from '@/lib/estimation/moteur'
import { inputParDefaut } from '@/lib/estimation/defaut'
import {
  COMMUNES,
  TAUX_CAPITALISATION,
  PONDERATION_DEFAUT,
  CHARGES_EXPLOITATION_DEFAUT,
  elementsOuvrageDefaut,
  prixTerrainDefaut,
} from '@/lib/estimation/parametres-marche'
import { TYPE_BIEN_LABELS, type EstimationInput, type TypeBien } from '@/lib/estimation/types'
import { formatCHF, formatPct } from '@/lib/format'
import { DATE_VERIFICATION, MENTIONS } from '@/lib/config/reglementaire'

const STORAGE_KEY = 'courtieros.estimation.v1'
const uid = () => Math.random().toString(36).slice(2, 9)

// ─── Petits composants de saisie ─────────────────────────────────────────────
function Champ({
  label,
  suffix,
  value,
  onChange,
  step = 1,
  min,
}: {
  label: string
  suffix?: string
  value: number
  onChange: (v: number) => void
  step?: number
  min?: number
}) {
  return (
    <label className="block">
      <span className="block font-body text-[11px] tracking-wider uppercase text-brand-muted mb-1">{label}</span>
      <div className="flex items-center bg-brand-dark border border-brand-border focus-within:border-brand-gold/50 transition-colors">
        <input
          type="number"
          value={Number.isFinite(value) ? value : ''}
          step={step}
          min={min}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full bg-transparent px-3 py-2 font-body text-sm text-white focus:outline-none"
        />
        {suffix && <span className="px-3 font-body text-xs text-brand-muted whitespace-nowrap">{suffix}</span>}
      </div>
    </label>
  )
}

function ChampPct({
  label,
  value,
  onChange,
  hint,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  hint?: string
}) {
  return (
    <label className="block">
      <span className="block font-body text-[11px] tracking-wider uppercase text-brand-muted mb-1">
        {label} {hint && <span className="text-brand-muted/60 normal-case tracking-normal">· {hint}</span>}
      </span>
      <div className="flex items-center bg-brand-dark border border-brand-border focus-within:border-brand-gold/50 transition-colors">
        <input
          type="number"
          value={Number.isFinite(value) ? +(value * 100).toFixed(4) : ''}
          step={0.1}
          onChange={(e) => onChange((parseFloat(e.target.value) || 0) / 100)}
          className="w-full bg-transparent px-3 py-2 font-body text-sm text-white focus:outline-none"
        />
        <span className="px-3 font-body text-xs text-brand-muted">%</span>
      </div>
    </label>
  )
}

function Section({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div className="border border-brand-border bg-brand-card p-5">
      <h3 className="font-display text-lg text-white mb-4">{titre}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  )
}

function CarteMethode({
  titre,
  valeur,
  applicable,
  accent,
  children,
}: {
  titre: string
  valeur: number
  applicable: boolean
  accent?: boolean
  children?: React.ReactNode
}) {
  return (
    <div className={`border p-5 ${accent ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-border bg-brand-card'}`}>
      <p className="font-body text-[11px] tracking-widest uppercase text-brand-muted mb-2">{titre}</p>
      {applicable ? (
        <p className={`font-display text-3xl ${accent ? 'text-brand-gold' : 'text-white'}`}>{formatCHF(valeur)}</p>
      ) : (
        <p className="font-body text-sm text-brand-muted italic">Non applicable</p>
      )}
      {applicable && children && <div className="mt-3 space-y-1">{children}</div>}
    </div>
  )
}

function LigneDetail({ label, montant, total }: { label: string; montant: number; total?: boolean }) {
  return (
    <div className={`flex justify-between gap-3 ${total ? 'pt-1 border-t border-brand-border/60' : ''}`}>
      <span className={`font-body text-xs ${total ? 'text-white font-medium' : 'text-brand-muted'}`}>{label}</span>
      <span className={`font-body text-xs tabular-nums ${total ? 'text-white font-medium' : 'text-brand-text'}`}>
        {formatCHF(montant)}
      </span>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function AtelierEstimation() {
  const router = useRouter()
  const [input, setInput] = useState<EstimationInput>(() => inputParDefaut('villa', 'Lausanne'))
  const [charge, setCharge] = useState(false)
  const [genere, setGenere] = useState(false)
  const [enr, setEnr] = useState(false)
  const [erreur, setErreur] = useState<string | null>(null)

  // Chargement depuis localStorage (hors ligne dégradé).
  useEffect(() => {
    try {
      const brut = localStorage.getItem(STORAGE_KEY)
      if (brut) setInput({ ...inputParDefaut(), ...JSON.parse(brut) })
    } catch {
      /* ignore */
    } finally {
      setCharge(true)
    }
  }, [])

  // Sauvegarde automatique.
  useEffect(() => {
    if (!charge) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(input))
    } catch {
      /* quota / mode privé : on ignore */
    }
  }, [input, charge])

  const resultat = useMemo(() => estimer(input), [input])

  const set = <K extends keyof EstimationInput>(cle: K, valeur: EstimationInput[K]) =>
    setInput((prev) => ({ ...prev, [cle]: valeur }))

  // Changement de type/commune : recale les paramètres par défaut dépendants.
  const changerType = (type: TypeBien) =>
    setInput((prev) => ({
      ...prev,
      type,
      tauxCapitalisation: TAUX_CAPITALISATION[type].defaut,
      chargesExploitationPct: CHARGES_EXPLOITATION_DEFAUT[type],
      ponderationIntrinseque: PONDERATION_DEFAUT[type].intrinseque,
      ponderationRendement: PONDERATION_DEFAUT[type].rendement,
    }))

  const changerCommune = (commune: string) =>
    setInput((prev) => ({ ...prev, commune, prixTerrainM2: prixTerrainDefaut(commune) }))

  const reinitialiser = () => setInput(inputParDefaut(input.type, input.commune))

  const telechargerPDF = async () => {
    setGenere(true)
    setErreur(null)
    try {
      const res = await fetch('/api/crm/estimation/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `estimation-${input.commune.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (e) {
      setErreur("La génération du PDF a échoué. Vérifiez la connexion et réessayez.")
    } finally {
      setGenere(false)
    }
  }

  const enregistrerDossier = async () => {
    setEnr(true)
    setErreur(null)
    try {
      const supabase = createClient()
      const { data: u } = await supabase.auth.getUser()
      if (!u.user) {
        setErreur("Connecte-toi d'abord à l'app (/app) pour enregistrer ce dossier.")
        return
      }
      const { data: bien, error: eB } = await supabase
        .from('biens')
        .insert({
          type: input.type,
          commune: input.commune,
          adresse: input.adresse || null,
          statut: 'estimation',
          annee_construction: input.anneeConstruction || null,
          surface_habitable: input.surfaceHabitable || null,
          surface_parcelle: input.surfaceParcelle || null,
          valeur_eca: input.valeurEca || null,
        })
        .select()
        .single()
      if (eB || !bien) {
        setErreur('Enregistrement du bien impossible.')
        return
      }
      const bienId = (bien as { id: string }).id
      const methodes = [
        resultat.intrinseque.applicable ? 'intrinseque' : null,
        resultat.rendement.applicable ? 'rendement' : null,
        'venale',
        resultat.comparaison.applicable ? 'comparaison' : null,
      ].filter(Boolean) as string[]
      await supabase.from('estimations').insert({
        bien_id: bienId,
        version: 1,
        input,
        resultat,
        valeur_intrinseque: resultat.intrinseque.valeur,
        valeur_rendement: resultat.rendement.valeur,
        valeur_venale: resultat.venale.valeur,
        valeur_comparaison: resultat.comparaison.valeur,
        prix_mise_en_vente: resultat.synthese.prixMiseEnVente,
        prix_plancher: resultat.synthese.prixPlancher,
        methodes,
      })
      const checklist = checklistDefaut(input.type).map((d) => ({
        bien_id: bienId,
        type: d.type,
        nom: d.nom,
        statut: 'manquant',
      }))
      if (checklist.length) await supabase.from('documents').insert(checklist)
      router.push(`/app/biens/${bienId}`)
    } catch {
      setErreur("Enregistrement impossible. Réessayez.")
    } finally {
      setEnr(false)
    }
  }

  const fourchette = `${formatCHF(resultat.synthese.fourchetteBasse)} – ${formatCHF(resultat.synthese.fourchetteHaute)}`

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* En-tête */}
      <header className="border-b border-brand-border bg-brand-dark/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/crm" className="text-brand-muted hover:text-brand-gold transition-colors shrink-0">
              <ArrowLeft size={18} />
            </Link>
            <div className="min-w-0">
              <p className="font-display text-lg sm:text-xl text-white truncate">
                Atelier d&apos;<span className="text-brand-gold">estimation</span>
              </p>
              <p className="font-body text-[10px] tracking-widest uppercase text-brand-muted">
                Multi-méthodes · Canton de Vaud
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={reinitialiser}
              className="hidden sm:inline-flex items-center gap-2 border border-brand-border px-3 py-2 font-body text-xs text-brand-muted hover:text-white hover:border-brand-border/80 transition-colors"
            >
              <RefreshCw size={14} /> Réinitialiser
            </button>
            <button
              onClick={enregistrerDossier}
              disabled={enr}
              className="inline-flex items-center gap-2 border border-brand-gold/40 text-brand-goldLight px-3 py-2 font-body text-xs tracking-wider uppercase hover:bg-brand-gold/10 transition-colors disabled:opacity-60"
            >
              <FolderPlus size={14} /> {enr ? 'Enregistrement…' : 'Créer le dossier'}
            </button>
            <button
              onClick={telechargerPDF}
              disabled={genere}
              className="btn-gold inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-4 py-2 font-body text-xs font-medium tracking-wider uppercase hover:bg-brand-goldLight transition-colors disabled:opacity-60"
            >
              <Download size={14} /> {genere ? 'Génération…' : 'Rapport PDF'}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6">
        {/* ── Colonne saisie ── */}
        <div className="space-y-5">
          <Section titre="Le bien">
            <label className="block">
              <span className="block font-body text-[11px] tracking-wider uppercase text-brand-muted mb-1">Type</span>
              <select
                value={input.type}
                onChange={(e) => changerType(e.target.value as TypeBien)}
                className="w-full bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50"
              >
                {(Object.keys(TYPE_BIEN_LABELS) as TypeBien[]).map((t) => (
                  <option key={t} value={t}>
                    {TYPE_BIEN_LABELS[t]}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="block font-body text-[11px] tracking-wider uppercase text-brand-muted mb-1">Commune</span>
              <input
                list="communes-list"
                value={input.commune}
                onChange={(e) => changerCommune(e.target.value)}
                className="w-full bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50"
              />
              <datalist id="communes-list">
                {COMMUNES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </label>
            <label className="block sm:col-span-2">
              <span className="block font-body text-[11px] tracking-wider uppercase text-brand-muted mb-1">Adresse (optionnel)</span>
              <input
                value={input.adresse ?? ''}
                onChange={(e) => set('adresse', e.target.value)}
                className="w-full bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50"
              />
            </label>
            <Champ label="Année de construction" value={input.anneeConstruction} onChange={(v) => setInput((p) => ({ ...p, anneeConstruction: v, elementsOuvrage: elementsOuvrageDefaut(v) }))} />
            <Champ label="Surface habitable" suffix="m²" value={input.surfaceHabitable} onChange={(v) => set('surfaceHabitable', v)} />
            <Champ label="Surface parcelle" suffix="m²" value={input.surfaceParcelle} onChange={(v) => set('surfaceParcelle', v)} />
            <Champ label="Prix du terrain" suffix="CHF/m²" value={input.prixTerrainM2} onChange={(v) => set('prixTerrainM2', v)} />
          </Section>

          {input.type !== 'terrain' && (
            <Section titre="Valeur intrinsèque">
              <Champ label="Valeur ECA" suffix="CHF" step={1000} value={input.valeurEca} onChange={(v) => set('valeurEca', v)} />
              <Champ label="Coeff. indexation ECA" value={input.coefficientIndexationEca} step={0.01} onChange={(v) => set('coefficientIndexationEca', v)} />
              <Champ label="Aménagements extérieurs" suffix="CHF" step={1000} value={input.amenagementsExterieurs} onChange={(v) => set('amenagementsExterieurs', v)} />
              <div className="sm:col-span-2">
                <p className="font-body text-[11px] tracking-wider uppercase text-brand-muted mb-2">Vétusté par élément d&apos;ouvrage</p>
                <div className="space-y-2">
                  {input.elementsOuvrage.map((el, i) => (
                    <div key={el.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-2 items-center">
                      <span className="font-body text-xs text-brand-text truncate">{el.nom}</span>
                      <input
                        type="number" step={1} value={el.age}
                        onChange={(e) => {
                          const age = parseFloat(e.target.value) || 0
                          setInput((p) => ({ ...p, elementsOuvrage: p.elementsOuvrage.map((x, j) => (j === i ? { ...x, age } : x)) }))
                        }}
                        className="w-16 bg-brand-dark border border-brand-border px-2 py-1 font-body text-xs text-white focus:outline-none focus:border-brand-gold/50"
                        title="Âge (ans)"
                      />
                      <input
                        type="number" step={0.1} value={+(el.tauxVetusteAnnuel * 100).toFixed(2)}
                        onChange={(e) => {
                          const taux = (parseFloat(e.target.value) || 0) / 100
                          setInput((p) => ({ ...p, elementsOuvrage: p.elementsOuvrage.map((x, j) => (j === i ? { ...x, tauxVetusteAnnuel: taux } : x)) }))
                        }}
                        className="w-16 bg-brand-dark border border-brand-border px-2 py-1 font-body text-xs text-white focus:outline-none focus:border-brand-gold/50"
                        title="Vétusté annuelle (%)"
                      />
                      <input
                        type="number" step={1} value={+(el.quotePart * 100).toFixed(0)}
                        onChange={(e) => {
                          const qp = (parseFloat(e.target.value) || 0) / 100
                          setInput((p) => ({ ...p, elementsOuvrage: p.elementsOuvrage.map((x, j) => (j === i ? { ...x, quotePart: qp } : x)) }))
                        }}
                        className="w-16 bg-brand-dark border border-brand-border px-2 py-1 font-body text-xs text-white focus:outline-none focus:border-brand-gold/50"
                        title="Quote-part (%)"
                      />
                    </div>
                  ))}
                  <p className="font-body text-[10px] text-brand-muted/70">Colonnes : âge (ans) · vétusté annuelle (%) · quote-part (%)</p>
                </div>
              </div>
            </Section>
          )}

          {input.type !== 'terrain' && (
            <Section titre="Valeur de rendement">
              <Champ label="État locatif brut / an" suffix="CHF" step={1000} value={input.etatLocatifBrutAnnuel} onChange={(v) => set('etatLocatifBrutAnnuel', v)} />
              <ChampPct label="Charges d'exploitation" value={input.chargesExploitationPct} onChange={(v) => set('chargesExploitationPct', v)} />
              <ChampPct
                label="Taux de capitalisation"
                value={input.tauxCapitalisation}
                onChange={(v) => set('tauxCapitalisation', v)}
                hint={`${formatPct(TAUX_CAPITALISATION[input.type].min)}–${formatPct(TAUX_CAPITALISATION[input.type].max)}`}
              />
            </Section>
          )}

          {input.type !== 'terrain' && (
            <Section titre="Pondération de la valeur vénale">
              <ChampPct label="Poids intrinsèque" value={input.ponderationIntrinseque} onChange={(v) => set('ponderationIntrinseque', v)} />
              <ChampPct label="Poids rendement" value={input.ponderationRendement} onChange={(v) => set('ponderationRendement', v)} />
            </Section>
          )}

          <div className="border border-brand-border bg-brand-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg text-white">Comparaison de marché</h3>
              <button
                onClick={() => setInput((p) => ({ ...p, comparables: [...p.comparables, { id: uid(), designation: '', prix: 0, surface: 0, ajustementPct: 0 }] }))}
                className="inline-flex items-center gap-1 border border-brand-border px-3 py-1.5 font-body text-xs text-brand-muted hover:text-white hover:border-brand-gold/50 transition-colors"
              >
                <Plus size={13} /> Ajouter
              </button>
            </div>
            {input.comparables.length === 0 && <p className="font-body text-xs text-brand-muted italic">Aucun comparable saisi.</p>}
            <div className="space-y-3">
              {input.comparables.map((c, i) => (
                <div key={c.id} className="grid grid-cols-[1fr_auto] gap-2 items-start border-t border-brand-border/50 pt-3">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      placeholder="Désignation" value={c.designation}
                      onChange={(e) => setInput((p) => ({ ...p, comparables: p.comparables.map((x, j) => (j === i ? { ...x, designation: e.target.value } : x)) }))}
                      className="col-span-2 bg-brand-dark border border-brand-border px-2 py-1.5 font-body text-xs text-white focus:outline-none focus:border-brand-gold/50"
                    />
                    <input
                      type="number" placeholder="Prix (CHF)" value={c.prix || ''}
                      onChange={(e) => setInput((p) => ({ ...p, comparables: p.comparables.map((x, j) => (j === i ? { ...x, prix: parseFloat(e.target.value) || 0 } : x)) }))}
                      className="bg-brand-dark border border-brand-border px-2 py-1.5 font-body text-xs text-white focus:outline-none focus:border-brand-gold/50"
                    />
                    <input
                      type="number" placeholder="Surface (m²)" value={c.surface || ''}
                      onChange={(e) => setInput((p) => ({ ...p, comparables: p.comparables.map((x, j) => (j === i ? { ...x, surface: parseFloat(e.target.value) || 0 } : x)) }))}
                      className="bg-brand-dark border border-brand-border px-2 py-1.5 font-body text-xs text-white focus:outline-none focus:border-brand-gold/50"
                    />
                    <label className="col-span-2 flex items-center gap-2">
                      <span className="font-body text-[10px] uppercase tracking-wider text-brand-muted whitespace-nowrap">Ajustement</span>
                      <input
                        type="number" step={1} value={+(c.ajustementPct * 100).toFixed(0)}
                        onChange={(e) => setInput((p) => ({ ...p, comparables: p.comparables.map((x, j) => (j === i ? { ...x, ajustementPct: (parseFloat(e.target.value) || 0) / 100 } : x)) }))}
                        className="w-20 bg-brand-dark border border-brand-border px-2 py-1.5 font-body text-xs text-white focus:outline-none focus:border-brand-gold/50"
                      />
                      <span className="font-body text-xs text-brand-muted">%</span>
                    </label>
                  </div>
                  <button
                    onClick={() => setInput((p) => ({ ...p, comparables: p.comparables.filter((_, j) => j !== i) }))}
                    className="text-brand-muted hover:text-red-400 transition-colors p-1"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Section titre="Stratégie de prix">
            <ChampPct label="Marge de fourchette (±)" value={input.margeFourchette} onChange={(v) => set('margeFourchette', v)} />
            <ChampPct label="Écart prix de mise en vente" value={input.strategiePrixPct} onChange={(v) => set('strategiePrixPct', v)} />
          </Section>
        </div>

        {/* ── Colonne résultats ── */}
        <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          {resultat.avertissements.length > 0 && (
            <div className="border border-amber-500/40 bg-amber-500/5 p-4 space-y-1">
              {resultat.avertissements.map((a, i) => (
                <p key={i} className="flex items-start gap-2 font-body text-xs text-amber-300">
                  <AlertTriangle size={14} className="mt-0.5 shrink-0" /> {a}
                </p>
              ))}
            </div>
          )}

          {/* Synthèse */}
          <div className="border border-brand-gold bg-brand-gold/5 p-6">
            <p className="font-body text-[11px] tracking-widest uppercase text-brand-muted text-center mb-1">Fourchette de recommandation</p>
            <p className="font-display text-2xl sm:text-3xl text-white text-center">{fourchette}</p>
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="text-center">
                <p className="font-body text-[10px] uppercase tracking-wider text-brand-muted">Mise en vente</p>
                <p className="font-display text-lg text-brand-gold mt-1">{formatCHF(resultat.synthese.prixMiseEnVente)}</p>
              </div>
              <div className="text-center">
                <p className="font-body text-[10px] uppercase tracking-wider text-brand-muted">Valeur retenue</p>
                <p className="font-display text-lg text-white mt-1">{formatCHF(resultat.synthese.valeurRetenue)}</p>
              </div>
              <div className="text-center">
                <p className="font-body text-[10px] uppercase tracking-wider text-brand-muted">Plancher</p>
                <p className="font-display text-lg text-white mt-1">{formatCHF(resultat.synthese.prixPlancher)}</p>
              </div>
            </div>
          </div>

          {/* Cartes méthodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CarteMethode titre="Valeur intrinsèque" valeur={resultat.intrinseque.valeur} applicable={resultat.intrinseque.applicable}>
              <LigneDetail label="Construction nette" montant={resultat.intrinseque.valeurConstructionNette} />
              <LigneDetail label="Terrain" montant={resultat.intrinseque.valeurTerrain} />
              <LigneDetail label="Extérieurs" montant={resultat.intrinseque.amenagementsExterieurs} />
            </CarteMethode>

            <CarteMethode titre="Valeur de rendement" valeur={resultat.rendement.valeur} applicable={resultat.rendement.applicable}>
              <LigneDetail label="État locatif net" montant={resultat.rendement.etatLocatifNet} />
              <LigneDetail label={`Cap. ${formatPct(resultat.rendement.tauxCapitalisation, 2)}`} montant={resultat.rendement.valeur} />
            </CarteMethode>

            <CarteMethode titre="Valeur vénale pondérée" valeur={resultat.venale.valeur} applicable accent>
              <LigneDetail label={`Intrinsèque ${formatPct(resultat.venale.ponderationIntrinseque, 0)}`} montant={resultat.intrinseque.valeur * resultat.venale.ponderationIntrinseque} />
              <LigneDetail label={`Rendement ${formatPct(resultat.venale.ponderationRendement, 0)}`} montant={resultat.rendement.valeur * resultat.venale.ponderationRendement} />
            </CarteMethode>

            <CarteMethode titre="Comparaison de marché" valeur={resultat.comparaison.valeur} applicable={resultat.comparaison.applicable}>
              <LigneDetail label={`Prix moyen ajusté /m²`} montant={resultat.comparaison.prixM2AjusteMoyen} />
              <LigneDetail label={`${resultat.comparaison.nbComparables} comparable(s)`} montant={resultat.comparaison.valeur} />
            </CarteMethode>
          </div>

          {/* Détail intrinsèque complet */}
          {resultat.intrinseque.applicable && (
            <div className="border border-brand-border bg-brand-card p-5">
              <p className="font-body text-[11px] tracking-widest uppercase text-brand-muted mb-3">Détail — valeur intrinsèque</p>
              <div className="space-y-1.5">
                {resultat.intrinseque.lignes.map((l, i) => (
                  <LigneDetail key={i} label={l.libelle} montant={l.montant} total={l.total} />
                ))}
              </div>
            </div>
          )}

          {erreur && <p className="font-body text-xs text-red-400">{erreur}</p>}

          <p className="font-body text-[11px] text-brand-muted/80 leading-relaxed italic">
            {MENTIONS.estimation} Constantes de référence vérifiées le {DATE_VERIFICATION.split('-').reverse().join('.')}.
          </p>
        </div>
      </div>
    </div>
  )
}

// Accès réservé au courtier : même verrou que le tableau de bord /crm.
export default function AtelierEstimationPage() {
  return (
    <PinGate>
      <AtelierEstimation />
    </PinGate>
  )
}
