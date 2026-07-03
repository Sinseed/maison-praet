'use client'
import { useState } from 'react'
import { ArrowRight, ArrowLeft, Send, Phone, Home, Building, Building2, Trees, LayoutGrid, Check } from 'lucide-react'
import Link from 'next/link'
import Eyebrow from '../components/Eyebrow'

const TYPES = [
  { value: 'villa', label: 'Villa / Maison', icon: Home },
  { value: 'appartement', label: 'Appartement / PPE', icon: Building },
  { value: 'immeuble', label: 'Immeuble de rendement', icon: Building2 },
  { value: 'terrain', label: 'Terrain', icon: Trees },
  { value: 'autre', label: 'Autre', icon: LayoutGrid },
]

const STEPS = ['Votre bien', 'Le bien en détail', 'Vos coordonnées']

export default function EstimationPage() {
  const [step, setStep] = useState(0)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)
  const [form, setForm] = useState({ nom: '', contact: '', type: '', localisation: '', surface: '', pieces: '', message: '' })
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  const canNext = step === 0 ? !!form.type : step === 1 ? !!form.localisation : (!!form.nom && !!form.contact)
  const next = () => { if (canNext) setStep(s => Math.min(s + 1, STEPS.length - 1)) }
  const back = () => setStep(s => Math.max(s - 1, 0))

  const submit = async () => {
    if (!form.nom || !form.contact) return
    setSending(true)
    setError(false)
    try {
      const res = await fetch('/api/estimation', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (res.ok) setSent(true)
      else setError(true)
    } catch { setError(true) }
    setSending(false)
  }

  return (
    <main className="min-h-screen bg-brand-dark">
      {/* Header */}
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-0">
        <Link href="/" className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-brand-muted hover:text-brand-gold transition-colors mb-12">
          <ArrowLeft size={14} /> Retour
        </Link>

        <Eyebrow className="mb-4">Estimation gratuite</Eyebrow>
        <h1 className="font-display text-4xl md:text-6xl font-light text-white leading-tight mb-4">
          Quelle est la valeur<br />
          <span className="italic text-brand-gold">de votre bien ?</span>
        </h1>
        <p className="font-body text-brand-muted leading-relaxed mb-10 max-w-xl">
          Une estimation professionnelle fondée sur les données réelles du marché vaudois. Sans engagement, en toute confidentialité.
        </p>
      </div>

      {/* Wizard */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        {sent ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-2 border-brand-gold flex items-center justify-center mx-auto mb-8">
              <Send size={24} className="text-brand-gold" />
            </div>
            <h2 className="font-display text-3xl text-white mb-4">Demande envoyée</h2>
            <p className="font-body text-brand-muted mb-10">Je vous recontacte personnellement dans les 24 heures.</p>
            <Link href="/" className="inline-flex items-center gap-3 font-body text-sm tracking-widest uppercase text-brand-gold hover:text-brand-goldLight transition-colors">
              <ArrowLeft size={14} /> Retour à l&apos;accueil
            </Link>
          </div>
        ) : (
          <>
            {/* Progress */}
            <div className="border-t border-brand-border pt-8 mb-12">
              <div className="flex items-center justify-between mb-4">
                {STEPS.map((label, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full border text-[11px] font-body transition-colors ${i < step ? 'bg-brand-gold border-brand-gold text-brand-dark' : i === step ? 'border-brand-gold text-brand-gold' : 'border-brand-border text-brand-muted'}`}>
                      {i < step ? <Check size={12} /> : i + 1}
                    </span>
                    <span className={`hidden sm:block font-body text-xs tracking-widest uppercase transition-colors ${i <= step ? 'text-brand-text' : 'text-brand-muted'}`}>{label}</span>
                  </div>
                ))}
              </div>
              <div className="h-px w-full bg-brand-border relative">
                <div className="absolute inset-y-0 left-0 bg-brand-gold transition-all duration-500" style={{ width: `${(step / (STEPS.length - 1)) * 100}%`, height: '1px' }} />
              </div>
            </div>

            {/* Step content (re-mounts per step → fade replays) */}
            <div key={step} className="page-fade min-h-[280px]">
              {step === 0 && (
                <div>
                  <p className="font-body text-sm text-brand-muted mb-6">Quel type de bien souhaitez-vous estimer ?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TYPES.map(t => {
                      const Icon = t.icon
                      const active = form.type === t.value
                      return (
                        <button
                          key={t.value}
                          onClick={() => { setForm(f => ({ ...f, type: t.value })); setStep(1) }}
                          className={`group flex items-center gap-4 p-5 border text-left transition-all ${active ? 'border-brand-gold bg-brand-gold/10' : 'border-brand-border hover:border-brand-gold/50 hover:bg-brand-card/40'}`}
                        >
                          <Icon size={22} className={active ? 'text-brand-gold' : 'text-brand-muted group-hover:text-brand-gold transition-colors'} strokeWidth={1.4} />
                          <span className={`font-body text-base ${active ? 'text-white' : 'text-brand-text'}`}>{t.label}</span>
                          <ArrowRight size={16} className="ml-auto text-brand-border group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-10">
                  <div>
                    <label className="font-body text-xs tracking-widest uppercase text-brand-muted block mb-3">Localisation</label>
                    <input
                      type="text" value={form.localisation} onChange={set('localisation')} autoFocus
                      className="w-full bg-transparent border-b border-brand-border px-0 py-3 font-body text-white text-base focus:outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted/40"
                      placeholder="Commune ou adresse"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-10">
                    <div>
                      <label className="font-body text-xs tracking-widest uppercase text-brand-muted block mb-3">Surface <span className="normal-case text-brand-muted/50">(optionnel)</span></label>
                      <input
                        type="text" value={form.surface} onChange={set('surface')}
                        className="w-full bg-transparent border-b border-brand-border px-0 py-3 font-body text-white text-base focus:outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted/40"
                        placeholder="ex. 140 m²"
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs tracking-widest uppercase text-brand-muted block mb-3">Pièces <span className="normal-case text-brand-muted/50">(optionnel)</span></label>
                      <input
                        type="text" value={form.pieces} onChange={set('pieces')}
                        className="w-full bg-transparent border-b border-brand-border px-0 py-3 font-body text-white text-base focus:outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted/40"
                        placeholder="ex. 5.5"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-10">
                  <div>
                    <label className="font-body text-xs tracking-widest uppercase text-brand-muted block mb-3">Nom</label>
                    <input
                      type="text" value={form.nom} onChange={set('nom')} autoFocus
                      className="w-full bg-transparent border-b border-brand-border px-0 py-3 font-body text-white text-base focus:outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted/40"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs tracking-widest uppercase text-brand-muted block mb-3">Email ou téléphone</label>
                    <input
                      type="text" value={form.contact} onChange={set('contact')}
                      className="w-full bg-transparent border-b border-brand-border px-0 py-3 font-body text-white text-base focus:outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted/40"
                      placeholder="Pour vous recontacter"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs tracking-widest uppercase text-brand-muted block mb-3">Message <span className="normal-case text-brand-muted/50">(optionnel)</span></label>
                    <textarea
                      rows={3} value={form.message} onChange={set('message')}
                      className="w-full bg-transparent border-b border-brand-border px-0 py-3 font-body text-white text-base focus:outline-none focus:border-brand-gold transition-colors resize-none placeholder:text-brand-muted/40"
                      placeholder="Précisions sur votre projet"
                    />
                  </div>
                  {error && <p className="font-body text-xs text-red-400">Une erreur est survenue. Réessayez ou contactez-moi directement.</p>}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-brand-border">
              {step > 0 ? (
                <button onClick={back} className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-brand-muted hover:text-brand-gold transition-colors">
                  <ArrowLeft size={14} /> Retour
                </button>
              ) : <span />}

              {step < STEPS.length - 1 ? (
                <button
                  onClick={next}
                  disabled={!canNext}
                  className="btn-gold group inline-flex items-center gap-3 bg-brand-gold text-brand-dark px-8 py-4 font-body text-sm font-medium tracking-widest uppercase hover:bg-brand-goldLight hover:shadow-[0_0_40px_-8px_rgba(201,169,110,0.6)] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  Continuer <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={sending || !form.nom || !form.contact}
                  className="btn-gold group inline-flex items-center gap-3 bg-brand-gold text-brand-dark px-8 py-4 font-body text-sm font-medium tracking-widest uppercase hover:bg-brand-goldLight hover:shadow-[0_0_40px_-8px_rgba(201,169,110,0.6)] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {sending ? 'Envoi...' : 'Envoyer ma demande'}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>

            {/* Phone alternative */}
            <div className="mt-10 pt-8 border-t border-brand-border/50">
              <p className="font-body text-sm text-brand-muted mb-4">Vous préférez appeler directement ?</p>
              <a href="tel:+41799690191" className="inline-flex items-center gap-3 font-body text-white hover:text-brand-gold transition-colors">
                <Phone size={16} className="text-brand-gold" /> 079 969 01 91
              </a>
              <p className="font-body text-xs text-brand-muted/60 mt-6">Sans engagement · Réponse sous 24h · Confidentiel</p>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
