'use client'

/**
 * Verrou d'accès partagé de l'espace courtier (/crm et sous-pages).
 *
 * Le déverrouillage est conservé le temps de la session (sessionStorage), ce
 * qui permet de naviguer entre le tableau de bord et l'atelier d'estimation
 * sans ressaisir le code.
 *
 * ⚠️ Protection côté client uniquement (code PIN). Elle empêche l'accès fortuit
 * mais ne constitue pas une authentification forte : la cible est Supabase Auth
 * (connexion e-mail + mot de passe) + RLS, prévue en phase 2.
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const CODE = '2404'
const STORAGE_KEY = 'courtieros.crm.unlocked'

function PinScreen({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = () => {
    if (pin === CODE) {
      onUnlock()
    } else {
      setError(true)
      setPin('')
      setTimeout(() => setError(false), 1500)
    }
  }

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-6">
      <div className="w-full max-w-xs text-center">
        <p className="font-display text-2xl text-white mb-2">
          Maison <span className="text-brand-gold">Praet</span>
        </p>
        <p className="font-body text-sm text-brand-muted mb-8">Espace courtier</p>
        <div className="flex gap-2 justify-center mb-6">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-12 h-14 border ${
                pin.length > i
                  ? 'border-brand-gold bg-brand-gold/10'
                  : error
                    ? 'border-red-500'
                    : 'border-brand-border'
              } flex items-center justify-center font-body text-xl text-white transition-all`}
            >
              {pin[i] ? '•' : ''}
            </div>
          ))}
        </div>
        <input
          type="password"
          inputMode="numeric"
          maxLength={4}
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit()
          }}
          className="sr-only"
          autoFocus
        />
        <button
          onClick={handleSubmit}
          className="btn-gold w-full bg-brand-gold text-brand-dark py-3 font-body text-sm font-medium tracking-widest uppercase hover:bg-brand-goldLight transition-colors"
        >
          Accéder
        </button>
        {error && <p className="font-body text-red-400 text-sm mt-4">Code incorrect</p>}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-brand-muted font-body text-xs mt-6 hover:text-brand-gold transition-colors"
        >
          <ArrowLeft size={14} /> Retour au site
        </Link>
      </div>
    </div>
  )
}

export default function PinGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') setUnlocked(true)
    } catch {
      /* ignore */
    }
    setReady(true)
  }, [])

  const unlock = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
    setUnlocked(true)
  }

  // Évite un flash de contenu protégé avant la vérification côté client.
  if (!ready) return <div className="min-h-screen bg-brand-dark" />
  if (!unlocked) return <PinScreen onUnlock={unlock} />
  return <>{children}</>
}
