'use client'

/**
 * Boîte de réception intelligente : on colle un mail / une note, l'app propose
 * un classement (dossier, échange, tâche, statut de document), on valide.
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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

export default function InboxPage() {
  const router = useRouter()
  const [texte, setTexte] = useState('')
  const [plan, setPlan] = useState<Plan | null>(null)
  const [analyse, setAnalyse] = useState(false)
  const [applique, setApplique] = useState(false)
  const [resultat, setResultat] = useState<string[] | null>(null)
  const [bienId, setBienId] = useState<string | null>(null)
  const [erreur, setErreur] = useState<string | null>(null)

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
      setPlan(data.plan as Plan)
    } catch {
      setErreur('Analyse impossible. Réessayez.')
    } finally {
      setAnalyse(false)
    }
  }

  const appliquer = async () => {
    if (!plan) return
    setApplique(true)
    setErreur(null)
    try {
      const res = await fetch('/api/app/classer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, appliquer: true }),
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

  const ligneBien = plan?.bien_id
    ? 'Dossier existant'
    : plan?.nouveau_bien_commune
      ? `Nouveau dossier : ${TYPE_BIEN_LABELS[plan.nouveau_bien_type as TypeBien] ?? plan.nouveau_bien_type} à ${plan.nouveau_bien_commune}`
      : 'Aucun dossier (sera non rattaché)'

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
          Colle un mail, une note ou un compte-rendu d&apos;appel. L&apos;app repère le dossier concerné et propose de le classer.
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

        {/* Proposition */}
        {plan && (
          <div className="border border-brand-gold/40 bg-brand-gold/5 p-5 space-y-3">
            <p className="font-display text-lg text-white">Proposition de classement</p>
            <p className="font-body text-sm text-brand-text">{plan.resume}</p>
            <ul className="space-y-1.5 font-body text-sm text-brand-text">
              <li>📁 {ligneBien}</li>
              {plan.echange && <li>💬 Échange ({plan.canal}) : « {plan.echange} »</li>}
              {plan.tache && <li>✅ Tâche : {plan.tache}</li>}
              {plan.document_nom && plan.document_statut && (
                <li>📄 Document « {plan.document_nom} » → {plan.document_statut === 'recu' ? 'reçu' : 'demandé'}</li>
              )}
            </ul>
            <div className="flex items-center gap-2 pt-2">
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
