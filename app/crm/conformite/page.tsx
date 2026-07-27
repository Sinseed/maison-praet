'use client'

/**
 * CourtierOS — Radar de conformité réglementaire (Canton de Vaud).
 *
 * Questionnaire déclencheur → alertes bloquantes / informatives, chacune avec
 * note explicative, base légale et champ de résolution horodaté.
 * Persistance locale (localStorage) ; accès derrière le verrou PIN de /crm.
 */

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Trash2, AlertTriangle, Info, CheckCircle2, Clock } from 'lucide-react'
import PinGate from '../PinGate'
import { evaluerConformite, synthetiser, ordonner } from '@/lib/conformite/regles'
import { conformiteParDefaut } from '@/lib/conformite/defaut'
import {
  TYPE_SERVITUDE_LABELS,
  type ConformiteInput,
  type NiveauAlerte,
  type Resolution,
  type TypeServitude,
} from '@/lib/conformite/types'
import { TYPE_BIEN_LABELS, type TypeBien } from '@/lib/estimation/types'
import { COMMUNES } from '@/lib/estimation/parametres-marche'
import { formatDate } from '@/lib/format'
import { DATE_VERIFICATION, MENTIONS } from '@/lib/config/reglementaire'

const STORAGE_KEY = 'courtieros.conformite.v1'
const uid = () => Math.random().toString(36).slice(2, 9)

const NIVEAU_STYLE: Record<NiveauAlerte, { bord: string; fond: string; texte: string; label: string }> = {
  bloquant: { bord: 'border-red-500/50', fond: 'bg-red-500/5', texte: 'text-red-300', label: 'Bloquant' },
  informatif: { bord: 'border-amber-500/40', fond: 'bg-amber-500/5', texte: 'text-amber-300', label: 'À vérifier' },
  ok: { bord: 'border-emerald-500/30', fond: 'bg-emerald-500/5', texte: 'text-emerald-300', label: 'Conforme' },
}

function IconeNiveau({ niveau }: { niveau: NiveauAlerte }) {
  if (niveau === 'bloquant') return <AlertTriangle size={16} className="text-red-400 shrink-0" />
  if (niveau === 'informatif') return <Info size={16} className="text-amber-400 shrink-0" />
  return <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
}

// Interrupteur oui/non
function Bascule({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="flex items-center justify-between gap-3 w-full bg-brand-dark border border-brand-border px-3 py-2.5 hover:border-brand-gold/40 transition-colors text-left"
    >
      <span className="font-body text-sm text-brand-text">{label}</span>
      <span
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${value ? 'bg-brand-gold' : 'bg-brand-border'}`}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-4' : 'translate-x-0.5'}`} />
      </span>
    </button>
  )
}

function Section({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div className="border border-brand-border bg-brand-card p-5">
      <h3 className="font-display text-lg text-white mb-4">{titre}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function RadarConformite() {
  const [input, setInput] = useState<ConformiteInput>(() => conformiteParDefaut('immeuble', 'Lausanne'))
  const [charge, setCharge] = useState(false)

  useEffect(() => {
    try {
      const brut = localStorage.getItem(STORAGE_KEY)
      if (brut) setInput({ ...conformiteParDefaut(), ...JSON.parse(brut) })
    } catch {
      /* ignore */
    } finally {
      setCharge(true)
    }
  }, [])

  useEffect(() => {
    if (!charge) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(input))
    } catch {
      /* ignore */
    }
  }, [input, charge])

  const anneeCourante = new Date().getFullYear()
  const alertes = useMemo(() => ordonner(evaluerConformite(input, anneeCourante)), [input, anneeCourante])
  const synthese = useMemo(() => synthetiser(alertes), [alertes])

  const set = <K extends keyof ConformiteInput>(cle: K, valeur: ConformiteInput[K]) =>
    setInput((prev) => ({ ...prev, [cle]: valeur }))

  const resolutionDe = (code: string): Resolution =>
    input.resolutions[code] ?? { resolu: false, note: '', dateISO: null }

  const majResolution = (code: string, patch: Partial<Resolution>) =>
    setInput((prev) => {
      const actuelle = prev.resolutions[code] ?? { resolu: false, note: '', dateISO: null }
      const fusion: Resolution = { ...actuelle, ...patch }
      if (patch.resolu === true && !actuelle.resolu) fusion.dateISO = new Date().toISOString()
      if (patch.resolu === false) fusion.dateISO = null
      return { ...prev, resolutions: { ...prev.resolutions, [code]: fusion } }
    })

  return (
    <div className="min-h-screen bg-brand-dark">
      <header className="border-b border-brand-border bg-brand-dark/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/crm" className="text-brand-muted hover:text-brand-gold transition-colors shrink-0">
              <ArrowLeft size={18} />
            </Link>
            <div className="min-w-0">
              <p className="font-display text-lg sm:text-xl text-white truncate">
                Radar de <span className="text-brand-gold">conformité</span>
              </p>
              <p className="font-body text-[10px] tracking-widest uppercase text-brand-muted">
                Réglementation · Canton de Vaud
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3 shrink-0 font-body text-xs">
            <span className="flex items-center gap-1.5 text-red-300"><AlertTriangle size={13} /> {synthese.bloquants}</span>
            <span className="flex items-center gap-1.5 text-amber-300"><Info size={13} /> {synthese.informatifs}</span>
            <span className="flex items-center gap-1.5 text-emerald-300"><CheckCircle2 size={13} /> {synthese.ok}</span>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-6">
        {/* ── Questionnaire ── */}
        <div className="space-y-5">
          <Section titre="Le bien">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="block font-body text-[11px] tracking-wider uppercase text-brand-muted mb-1">Type</span>
                <select
                  value={input.type}
                  onChange={(e) => set('type', e.target.value as TypeBien)}
                  className="w-full bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50"
                >
                  {(Object.keys(TYPE_BIEN_LABELS) as TypeBien[]).map((t) => (
                    <option key={t} value={t}>{TYPE_BIEN_LABELS[t]}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="block font-body text-[11px] tracking-wider uppercase text-brand-muted mb-1">Commune</span>
                <input
                  list="communes-conformite"
                  value={input.commune}
                  onChange={(e) => set('commune', e.target.value)}
                  className="w-full bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50"
                />
                <datalist id="communes-conformite">
                  {COMMUNES.map((c) => <option key={c} value={c} />)}
                </datalist>
              </label>
              <label className="block">
                <span className="block font-body text-[11px] tracking-wider uppercase text-brand-muted mb-1">Nombre de logements</span>
                <input
                  type="number" min={0} value={input.nbLogements}
                  onChange={(e) => set('nbLogements', parseInt(e.target.value) || 0)}
                  className="w-full bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50"
                />
              </label>
              <label className="block">
                <span className="block font-body text-[11px] tracking-wider uppercase text-brand-muted mb-1">Surface parcelle (m²)</span>
                <input
                  type="number" min={0} value={input.surfaceParcelle}
                  onChange={(e) => set('surfaceParcelle', parseFloat(e.target.value) || 0)}
                  className="w-full bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50"
                />
              </label>
            </div>
            <Bascule label="Un logement est actuellement loué" value={input.logementLoue} onChange={(v) => set('logementLoue', v)} />
          </Section>

          <Section titre="Zone & aménagement du territoire">
            <Bascule label="Parcelle en zone agricole" value={input.zoneAgricole} onChange={(v) => set('zoneAgricole', v)} />
            <Bascule label="Zone réservée" value={input.zoneReservee} onChange={(v) => set('zoneReservee', v)} />
            <Bascule label="Terrain dézoné / reclassé" value={input.dezonage} onChange={(v) => set('dezonage', v)} />
            <Bascule label="Zone à bâtir non équipée" value={input.zoneABatirNonEquipee} onChange={(v) => set('zoneABatirNonEquipee', v)} />
          </Section>

          <Section titre="Acquéreur pressenti (Lex Koller)">
            <Bascule label="Ressortissant suisse" value={input.acquereurSuisse} onChange={(v) => set('acquereurSuisse', v)} />
            <Bascule label="Domicilié en Suisse" value={input.acquereurDomicileSuisse} onChange={(v) => set('acquereurDomicileSuisse', v)} />
            <label className="block">
              <span className="block font-body text-[11px] tracking-wider uppercase text-brand-muted mb-1">Titre de séjour</span>
              <select
                value={input.acquereurPermis}
                onChange={(e) => set('acquereurPermis', e.target.value)}
                className="w-full bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50"
              >
                <option value="C">Permis C (établissement)</option>
                <option value="B">Permis B (séjour)</option>
                <option value="L">Permis L (courte durée)</option>
                <option value="aucun">Aucun / hors Suisse</option>
              </select>
            </label>
          </Section>

          <Section titre="Diligence LBA & protection des données (nLPD)">
            <Bascule label="Cocontractant identifié" value={input.cocontractantIdentifie} onChange={(v) => set('cocontractantIdentifie', v)} />
            <Bascule label="Ayant droit économique identifié" value={input.ayantDroitEcoIdentifie} onChange={(v) => set('ayantDroitEcoIdentifie', v)} />
            <Bascule label="Pièces d'identification conservées" value={input.piecesConservees} onChange={(v) => set('piecesConservees', v)} />
            <Bascule label="Consentement des contacts recueilli" value={input.consentementContacts} onChange={(v) => set('consentementContacts', v)} />
            <Bascule label="Registre des traitements tenu" value={input.registreTraitements} onChange={(v) => set('registreTraitements', v)} />
          </Section>

          <div className="border border-brand-border bg-brand-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg text-white">Servitudes & charges (extrait RF)</h3>
              <button
                onClick={() => set('servitudes', [...input.servitudes, { id: uid(), type: 'passage', description: '' }])}
                className="inline-flex items-center gap-1 border border-brand-border px-3 py-1.5 font-body text-xs text-brand-muted hover:text-white hover:border-brand-gold/50 transition-colors"
              >
                <Plus size={13} /> Ajouter
              </button>
            </div>
            {input.servitudes.length === 0 && <p className="font-body text-xs text-brand-muted italic">Aucune servitude saisie.</p>}
            <div className="space-y-3">
              {input.servitudes.map((s) => (
                <div key={s.id} className="grid grid-cols-[1fr_auto] gap-2 items-start border-t border-brand-border/50 pt-3">
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={s.type}
                      onChange={(e) => set('servitudes', input.servitudes.map((x) => (x.id === s.id ? { ...x, type: e.target.value as TypeServitude } : x)))}
                      className="bg-brand-dark border border-brand-border px-2 py-1.5 font-body text-xs text-white focus:outline-none focus:border-brand-gold/50"
                    >
                      {(Object.keys(TYPE_SERVITUDE_LABELS) as TypeServitude[]).map((t) => (
                        <option key={t} value={t}>{TYPE_SERVITUDE_LABELS[t]}</option>
                      ))}
                    </select>
                    {s.type === 'ddp' ? (
                      <input
                        type="date" value={s.echeance ?? ''}
                        onChange={(e) => set('servitudes', input.servitudes.map((x) => (x.id === s.id ? { ...x, echeance: e.target.value } : x)))}
                        className="bg-brand-dark border border-brand-border px-2 py-1.5 font-body text-xs text-white focus:outline-none focus:border-brand-gold/50"
                        title="Échéance du DDP"
                      />
                    ) : (
                      <input
                        placeholder="Bénéficiaire" value={s.beneficiaire ?? ''}
                        onChange={(e) => set('servitudes', input.servitudes.map((x) => (x.id === s.id ? { ...x, beneficiaire: e.target.value } : x)))}
                        className="bg-brand-dark border border-brand-border px-2 py-1.5 font-body text-xs text-white focus:outline-none focus:border-brand-gold/50"
                      />
                    )}
                    <input
                      placeholder="Description" value={s.description}
                      onChange={(e) => set('servitudes', input.servitudes.map((x) => (x.id === s.id ? { ...x, description: e.target.value } : x)))}
                      className="col-span-2 bg-brand-dark border border-brand-border px-2 py-1.5 font-body text-xs text-white focus:outline-none focus:border-brand-gold/50"
                    />
                  </div>
                  <button
                    onClick={() => set('servitudes', input.servitudes.filter((x) => x.id !== s.id))}
                    className="text-brand-muted hover:text-red-400 transition-colors p-1"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Alertes ── */}
        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {synthese.delaiMaxJours > 0 && (
            <div className="border border-brand-gold/40 bg-brand-gold/5 p-4 flex items-start gap-3">
              <Clock size={18} className="text-brand-gold mt-0.5 shrink-0" />
              <p className="font-body text-sm text-brand-text">
                Prévoir jusqu&apos;à <span className="text-brand-goldLight font-medium">{synthese.delaiMaxJours} jours</span> de
                délais réglementaires au rétroplanning avant de viser une date d&apos;acte.
              </p>
            </div>
          )}

          {alertes.map((a) => {
            const st = NIVEAU_STYLE[a.niveau]
            const res = resolutionDe(a.code)
            return (
              <div key={a.code} className={`border ${st.bord} ${st.fond} p-4 ${res.resolu ? 'opacity-70' : ''}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2 min-w-0">
                    <IconeNiveau niveau={a.niveau} />
                    <div className="min-w-0">
                      <p className="font-body text-sm text-white font-medium">{a.titre}</p>
                      <p className="font-body text-[10px] tracking-wider uppercase text-brand-muted mt-0.5">
                        {a.domaine} · {a.baseLegale}
                      </p>
                    </div>
                  </div>
                  <span className={`shrink-0 font-body text-[10px] uppercase tracking-wider border ${st.bord} ${st.texte} px-2 py-0.5`}>
                    {st.label}
                  </span>
                </div>

                <p className="font-body text-sm text-brand-text leading-relaxed mt-3">{a.message}</p>

                {a.action && (
                  <p className="font-body text-xs text-brand-muted mt-2">
                    <span className="text-brand-goldLight">Action : </span>{a.action}
                  </p>
                )}
                {a.delaiJours ? (
                  <p className="font-body text-xs text-brand-gold mt-1 flex items-center gap-1.5">
                    <Clock size={12} /> Délai indicatif : {a.delaiJours} jours
                  </p>
                ) : null}

                {/* Résolution horodatée */}
                {a.niveau !== 'ok' && (
                  <div className="mt-3 pt-3 border-t border-brand-border/50">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox" checked={res.resolu}
                        onChange={(e) => majResolution(a.code, { resolu: e.target.checked })}
                        className="accent-brand-gold"
                      />
                      <span className="font-body text-xs text-brand-text">
                        Marquer comme résolu
                        {res.resolu && res.dateISO && (
                          <span className="text-brand-muted"> · {formatDate(res.dateISO)}</span>
                        )}
                      </span>
                    </label>
                    {res.resolu && (
                      <input
                        placeholder="Note de résolution (qui, comment, référence…)"
                        value={res.note}
                        onChange={(e) => majResolution(a.code, { note: e.target.value })}
                        className="w-full mt-2 bg-brand-dark border border-brand-border px-3 py-2 font-body text-xs text-white focus:outline-none focus:border-brand-gold/50"
                      />
                    )}
                  </div>
                )}
              </div>
            )
          })}

          <p className="font-body text-[11px] text-brand-muted/80 leading-relaxed italic">
            {MENTIONS.conformite} Constantes de référence vérifiées le {DATE_VERIFICATION.split('-').reverse().join('.')}.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function RadarConformitePage() {
  return (
    <PinGate>
      <RadarConformite />
    </PinGate>
  )
}
