'use client'

/**
 * Boîte de réception intelligente : on colle un mail / une note, l'app propose
 * un classement (dossier, échange, tâche, statut de document). La proposition
 * est MODIFIABLE — l'IA propose, le courtier corrige puis valide.
 */

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Check, X } from 'lucide-react'
import { TYPE_BIEN_LABELS, type TypeBien } from '@/lib/estimation/types'

interface Plan {
  resume: string
  bien_id: string
  nouveau_bien_type: string
  nouveau_bien_commune: string
  nouveau_bien_adresse: string
  echange: string
  canal: string
  tache: string
  document_nom: string
  document_statut: string
}

interface BienBref {
  id: string
  type: string
  commune: string
  adresse: string | null
}

const DEST_AUCUN = '__aucun__'
const DEST_NOUVEAU = '__nouveau__'

const TYPES: TypeBien[] = ['villa', 'ppe', 'immeuble', 'terrain']
const CANAUX = ['note', 'email', 'appel', 'notaire', 'autre']

export default function InboxPage() {
  const [texte, setTexte] = useState('')
  const [plan, setPlan] = useState<Plan | null>(null)
  const [biens, setBiens] = useState<BienBref[]>([])
  const [dest, setDest] = useState<string>(DEST_AUCUN)
  const [analyse, setAnalyse] = useState(false)
  const [applique, setApplique] = useState(false)
  const [resultat, setResultat] = useState<string[] | null>(null)
  const [bienId, setBienId] = useState<string | null>(null)
  const [erreur, setErreur] = useState<string | null>(null)

  const maj = (patch: Partial<Plan>) => setPlan((p) => (p ? { ...p, ...patch } : p))

  const analyser = async () => {
    if (!texte.trim()) return
    setAnalyse(true)
    setErreur(null)
    setResultat(null)
    setPlan(null)
    try {
      const res = await fetch('/api/app/classer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texte }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErreur(data.error ?? 'Analyse impossible.')
        return
      }
      const p = data.plan as Plan
      setPlan(p)
      setBiens((data.biens as BienBref[]) ?? [])
      // Destination pré-sélectionnée selon la proposition de l'IA.
      setDest(p.bien_id ? p.bien_id : p.nouveau_bien_commune ? DEST_NOUVEAU : DEST_AUCUN)
    } catch {
      setErreur('Analyse impossible. Réessayez.')
    } finally {
      setAnalyse(false)
    }
  }

  const appliquer = async () => {
    if (!plan) return
    // On construit le plan final à partir des choix (éventuellement corrigés).
    const final: Plan = { ...plan }
    if (dest === DEST_AUCUN) {
      final.bien_id = ''
      final.nouveau_bien_type = ''
      final.nouveau_bien_commune = ''
      final.nouveau_bien_adresse = ''
    } else if (dest === DEST_NOUVEAU) {
      final.bien_id = ''
      if (!final.nouveau_bien_type) final.nouveau_bien_type = 'ppe'
      if (!final.nouveau_bien_commune.trim()) {
        setErreur('Indique la commune du nouveau dossier avant de classer.')
        return
      }
    } else {
      final.bien_id = dest
      final.nouveau_bien_type = ''
      final.nouveau_bien_commune = ''
      final.nouveau_bien_adresse = ''
    }

    setApplique(true)
    setErreur(null)
    try {
      const res = await fetch('/api/app/classer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: final, appliquer: true }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErreur(data.error ?? 'Classement impossible.')
        return
      }
      setResultat(data.actions ?? [])
      setBienId(data.bienId ?? null)
      setPlan(null)
      setTexte('')
    } catch {
      setErreur('Classement impossible. Réessayez.')
    } finally {
      setApplique(false)
    }
  }

  const champ = 'w-full bg-brand-card border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50'
  const label = 'block font-body text-[11px] uppercase tracking-widest text-brand-muted mb-1.5'

  return (
    <div className="min-h-screen bg-brand-dark">
      <header className="border-b border-brand-border bg-brand-dark/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <Link href="/app" className="text-brand-muted hover:text-brand-gold transition-colors shrink-0"><ArrowLeft size={18} /></Link>
          <p className="font-display text-lg sm:text-xl text-white">Boîte de <span className="text-brand-gold">réception</span></p>
        </div>
      </header>

      <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-6 space-y-5">
        <p className="font-body text-sm text-brand-muted">
          Colle un mail, une note ou un compte-rendu d&apos;appel. L&apos;app propose un classement — que tu peux corriger avant de valider.
        </p>

        <textarea
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
          rows={7}
          placeholder="Ex. : Mail du notaire Me Dénériaz — le projet d'acte pour l'attique de Prilly (Nagy) sera prêt vendredi. Merci de relire avant."
          className="w-full bg-brand-card border border-brand-border px-4 py-3 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50"
        />

        <button
          onClick={analyser}
          disabled={analyse || !texte.trim()}
          className="btn-gold inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-5 py-2.5 font-body text-xs font-medium tracking-widest uppercase hover:bg-brand-goldLight transition-colors disabled:opacity-60"
        >
          <Sparkles size={15} /> {analyse ? 'Analyse…' : 'Analyser'}
        </button>

        {erreur && <p className="font-body text-red-400 text-sm">{erreur}</p>}

        {/* Proposition — modifiable */}
        {plan && (
          <div className="border border-brand-gold/40 bg-brand-gold/5 p-5 space-y-4">
            <div>
              <p className="font-display text-lg text-white">Proposition de classement</p>
              {plan.resume && <p className="font-body text-sm text-brand-muted mt-1">{plan.resume}</p>}
              <p className="font-body text-[11px] text-brand-muted/70 italic mt-1">Vérifie et corrige si besoin, puis clique « Classer ».</p>
            </div>

            {/* Destination */}
            <div>
              <span className={label}>📁 Dossier</span>
              <select value={dest} onChange={(e) => setDest(e.target.value)} className={champ}>
                <option value={DEST_AUCUN}>Aucun (non rattaché)</option>
                <option value={DEST_NOUVEAU}>➕ Créer un nouveau dossier</option>
                {biens.length > 0 && (
                  <optgroup label="Dossiers existants">
                    {biens.map((b) => (
                      <option key={b.id} value={b.id}>
                        {TYPE_BIEN_LABELS[b.type as TypeBien] ?? b.type} à {b.commune}{b.adresse ? ` — ${b.adresse}` : ''}
                      </option>
                    ))}
                  </optgroup>
                )}
              </select>
            </div>

            {/* Champs du nouveau dossier */}
            {dest === DEST_NOUVEAU && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-l-2 border-brand-gold/30 pl-4">
                <div>
                  <span className={label}>Type</span>
                  <select value={plan.nouveau_bien_type || 'ppe'} onChange={(e) => maj({ nouveau_bien_type: e.target.value })} className={champ}>
                    {TYPES.map((t) => <option key={t} value={t}>{TYPE_BIEN_LABELS[t]}</option>)}
                  </select>
                </div>
                <div>
                  <span className={label}>Commune</span>
                  <input value={plan.nouveau_bien_commune} onChange={(e) => maj({ nouveau_bien_commune: e.target.value })} placeholder="Ex. Cossonay" className={champ} />
                </div>
                <div>
                  <span className={label}>Adresse (option.)</span>
                  <input value={plan.nouveau_bien_adresse} onChange={(e) => maj({ nouveau_bien_adresse: e.target.value })} className={champ} />
                </div>
              </div>
            )}

            {/* Échange */}
            <div>
              <span className={label}>💬 Échange à consigner</span>
              <div className="flex flex-col sm:flex-row gap-2">
                <select value={plan.canal || 'note'} onChange={(e) => maj({ canal: e.target.value })} className={`${champ} sm:w-40 shrink-0`}>
                  {CANAUX.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <textarea value={plan.echange} onChange={(e) => maj({ echange: e.target.value })} rows={2} placeholder="(rien à consigner)" className={champ} />
              </div>
            </div>

            {/* Tâche */}
            <div>
              <span className={label}>✅ Tâche de suivi</span>
              <input value={plan.tache} onChange={(e) => maj({ tache: e.target.value })} placeholder="(aucune tâche)" className={champ} />
            </div>

            {/* Document */}
            <div>
              <span className={label}>📄 Document</span>
              <div className="flex flex-col sm:flex-row gap-2">
                <input value={plan.document_nom} onChange={(e) => maj({ document_nom: e.target.value })} placeholder="(aucun document)" className={champ} />
                <select value={plan.document_statut} onChange={(e) => maj({ document_statut: e.target.value })} className={`${champ} sm:w-44 shrink-0`}>
                  <option value="">— statut —</option>
                  <option value="demande">à demander</option>
                  <option value="recu">reçu</option>
                </select>
              </div>
              {plan.document_nom && (dest === DEST_AUCUN) && (
                <p className="font-body text-[11px] text-brand-muted/70 italic mt-1">Le document ne sera enregistré que s&apos;il est rattaché à un dossier.</p>
              )}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button onClick={appliquer} disabled={applique} className="btn-gold inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-4 py-2 font-body text-xs font-medium uppercase tracking-wider hover:bg-brand-goldLight transition-colors disabled:opacity-60">
                <Check size={14} /> {applique ? 'Classement…' : 'Classer'}
              </button>
              <button onClick={() => setPlan(null)} className="inline-flex items-center gap-2 border border-brand-border px-4 py-2 font-body text-xs text-brand-muted hover:text-white transition-colors">
                <X size={14} /> Annuler
              </button>
            </div>
          </div>
        )}

        {/* Résultat */}
        {resultat && (
          <div className="border border-emerald-500/40 bg-emerald-500/5 p-5 space-y-2">
            <p className="font-display text-lg text-white">Classé ✓</p>
            <ul className="space-y-1 font-body text-sm text-brand-text">
              {resultat.map((a, i) => <li key={i}>• {a}</li>)}
            </ul>
            {bienId && (
              <Link href={`/app/biens/${bienId}`} className="inline-flex items-center gap-2 font-body text-xs text-brand-gold hover:text-brand-goldLight mt-2">
                Ouvrir le dossier →
              </Link>
            )}
          </div>
        )}

        <p className="font-body text-[11px] text-brand-muted/70 italic pt-4">
          L&apos;analyse est indicative : vérifie la proposition avant de classer. Rien n&apos;est enregistré tant que tu n&apos;as pas cliqué « Classer ».
        </p>
      </div>
    </div>
  )
}
