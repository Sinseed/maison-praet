'use client'

/** Connexion sécurisée à l'espace courtier (Supabase Auth). */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [erreur, setErreur] = useState<string | null>(null)
  const [charge, setCharge] = useState(false)

  const connexion = async (e: React.FormEvent) => {
    e.preventDefault()
    setErreur(null)
    setCharge(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: motDePasse })
      if (error) {
        setErreur('Email ou mot de passe incorrect.')
        return
      }
      router.push('/app')
      router.refresh()
    } catch {
      setErreur('Connexion impossible. Réessayez.')
    } finally {
      setCharge(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-display text-2xl text-white mb-1">
            Maison <span className="text-brand-gold">Praet</span>
          </p>
          <p className="font-body text-sm text-brand-muted">Espace courtier</p>
        </div>

        <form onSubmit={connexion} className="space-y-4">
          <label className="block">
            <span className="block font-body text-[11px] tracking-wider uppercase text-brand-muted mb-1">Email</span>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email"
              className="w-full bg-brand-card border border-brand-border px-3 py-2.5 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50"
            />
          </label>
          <label className="block">
            <span className="block font-body text-[11px] tracking-wider uppercase text-brand-muted mb-1">Mot de passe</span>
            <input
              type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} required autoComplete="current-password"
              className="w-full bg-brand-card border border-brand-border px-3 py-2.5 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50"
            />
          </label>

          {erreur && <p className="font-body text-red-400 text-sm">{erreur}</p>}

          <button
            type="submit" disabled={charge}
            className="btn-gold w-full bg-brand-gold text-brand-dark py-3 font-body text-sm font-medium tracking-widest uppercase hover:bg-brand-goldLight transition-colors disabled:opacity-60"
          >
            {charge ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        <Link href="/" className="mt-6 inline-flex items-center gap-2 text-brand-muted font-body text-xs hover:text-brand-gold transition-colors">
          <ArrowLeft size={14} /> Retour au site
        </Link>
      </div>
    </div>
  )
}
