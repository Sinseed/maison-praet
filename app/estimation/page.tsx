'use client'
import { useState } from 'react'
import { ArrowRight, Send, Phone, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function EstimationPage() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)
  const [form, setForm] = useState({ nom: '', contact: '', type: '', localisation: '', message: '' })
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

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

      {/* Header sobre */}
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-0">
        <Link href="/" className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-brand-muted hover:text-brand-gold transition-colors mb-12">
          <ArrowLeft size={14} /> Retour
        </Link>

        <p className="font-body text-xs tracking-[0.35em] uppercase text-brand-gold mb-4">Estimation gratuite</p>
        <h1 className="font-display text-4xl md:text-6xl font-light text-white leading-tight mb-4">
          Quelle est la valeur<br />
          <span className="italic text-brand-gold">de votre bien ?</span>
        </h1>
        <p className="font-body text-brand-muted leading-relaxed mb-4 max-w-xl">
          Une estimation professionnelle fondée sur les données réelles du marché vaudois. Sans engagement, en toute confidentialité.
        </p>

        {/* Trois points clés inline */}
        <div className="flex flex-wrap gap-x-8 gap-y-2 mb-16 font-body text-sm text-brand-muted">
          <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-brand-gold inline-block" />3 méthodes d&apos;évaluation</span>
          <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-brand-gold inline-block" />Rapport PDF sous 48h</span>
          <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-brand-gold inline-block" />Prix honnête, pas gonflé</span>
        </div>
      </div>

      {/* Formulaire */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        <div className="border-t border-brand-border" />

        {sent ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 border-2 border-brand-gold flex items-center justify-center mx-auto mb-8">
              <Send size={24} className="text-brand-gold" />
            </div>
            <h2 className="font-display text-3xl text-white mb-4">Demande envoyée</h2>
            <p className="font-body text-brand-muted mb-10">Je vous recontacte dans les 24 heures.</p>
            <Link href="/" className="inline-flex items-center gap-3 font-body text-sm tracking-widest uppercase text-brand-gold hover:text-brand-goldLight transition-colors">
              <ArrowLeft size={14} /> Retour à l&apos;accueil
            </Link>
          </div>
        ) : (
          <div className="space-y-10 pt-12">

            {/* Nom */}
            <div>
              <label className="font-body text-xs tracking-widest uppercase text-brand-muted block mb-3">Nom</label>
              <input
                type="text"
                value={form.nom}
                onChange={set('nom')}
                className="w-full bg-transparent border-b border-brand-border px-0 py-3 font-body text-white text-base focus:outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted/40"
                placeholder="Votre nom"
              />
            </div>

            {/* Contact */}
            <div>
              <label className="font-body text-xs tracking-widest uppercase text-brand-muted block mb-3">Email ou téléphone</label>
              <input
                type="text"
                value={form.contact}
                onChange={set('contact')}
                className="w-full bg-transparent border-b border-brand-border px-0 py-3 font-body text-white text-base focus:outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted/40"
                placeholder="Pour vous recontacter"
              />
            </div>

            {/* Type de bien */}
            <div>
              <label className="font-body text-xs tracking-widest uppercase text-brand-muted block mb-3">Type de bien</label>
              <select
                value={form.type}
                onChange={set('type')}
                className="w-full bg-transparent border-b border-brand-border px-0 py-3 font-body text-brand-text text-base focus:outline-none focus:border-brand-gold transition-colors appearance-none cursor-pointer"
              >
                <option value="" className="bg-brand-dark">Sélectionnez</option>
                <option value="villa" className="bg-brand-dark">Villa / Maison individuelle</option>
                <option value="appartement" className="bg-brand-dark">Appartement / PPE</option>
                <option value="immeuble" className="bg-brand-dark">Immeuble de rendement</option>
                <option value="terrain" className="bg-brand-dark">Terrain</option>
                <option value="autre" className="bg-brand-dark">Autre</option>
              </select>
            </div>

            {/* Localisation */}
            <div>
              <label className="font-body text-xs tracking-widest uppercase text-brand-muted block mb-3">Localisation</label>
              <input
                type="text"
                value={form.localisation}
                onChange={set('localisation')}
                className="w-full bg-transparent border-b border-brand-border px-0 py-3 font-body text-white text-base focus:outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted/40"
                placeholder="Commune ou adresse"
              />
            </div>

            {/* Message */}
            <div>
              <label className="font-body text-xs tracking-widest uppercase text-brand-muted block mb-3">Message <span className="normal-case text-brand-muted/50">(optionnel)</span></label>
              <textarea
                rows={4}
                value={form.message}
                onChange={set('message')}
                className="w-full bg-transparent border-b border-brand-border px-0 py-3 font-body text-white text-base focus:outline-none focus:border-brand-gold transition-colors resize-none placeholder:text-brand-muted/40"
                placeholder="Précisions sur votre projet"
              />
            </div>

            {error && <p className="font-body text-xs text-red-400">Une erreur est survenue. Réessayez ou contactez-moi directement.</p>}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
              <button
                onClick={submit}
                disabled={sending || !form.nom || !form.contact}
                className="group inline-flex items-center gap-3 bg-brand-gold text-brand-dark px-10 py-4 font-body text-sm font-medium tracking-widest uppercase hover:bg-brand-goldLight transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {sending ? 'Envoi...' : 'Envoyer ma demande'}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="font-body text-xs text-brand-muted/60">Sans engagement · Réponse sous 24h</p>
            </div>

            {/* Alternative téléphone */}
            <div className="pt-8 border-t border-brand-border/50">
              <p className="font-body text-sm text-brand-muted mb-4">Vous préférez appeler directement ?</p>
              <a href="tel:+41799690191" className="inline-flex items-center gap-3 font-body text-white hover:text-brand-gold transition-colors">
                <Phone size={16} className="text-brand-gold" />
                079 969 01 91
              </a>
            </div>

          </div>
        )}
      </div>
    </main>
  )
}
