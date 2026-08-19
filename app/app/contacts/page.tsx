'use client'

/**
 * Répertoire de contacts — toutes les personnes rencontrées, indépendamment des
 * dossiers. Recherche par nom/email/société ; chaque fiche mène à l'historique.
 */

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { ContactRow } from '@/lib/supabase/rows'
import { ROLE_LABELS, nomContact } from '@/lib/contacts'

const supabase = createClient()

export default function RepertoirePage() {
  const [contacts, setContacts] = useState<ContactRow[]>([])
  const [charge, setCharge] = useState(true)
  const [q, setQ] = useState('')

  const charger = useCallback(async () => {
    const { data } = await supabase
      .from('contacts')
      .select('id, prenom, nom, telephone, email, societe, type, created_at')
      .order('nom', { ascending: true, nullsFirst: false })
    setContacts((data as unknown as ContactRow[]) ?? [])
    setCharge(false)
  }, [])

  useEffect(() => { charger() }, [charger])

  const filtres = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return contacts
    return contacts.filter((c) =>
      [c.prenom, c.nom, c.email, c.societe, c.telephone].filter(Boolean).join(' ').toLowerCase().includes(t),
    )
  }, [contacts, q])

  return (
    <div className="min-h-screen bg-brand-dark">
      <header className="border-b border-brand-border bg-brand-dark/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <Link href="/app" className="text-brand-muted hover:text-brand-gold transition-colors shrink-0"><ArrowLeft size={18} /></Link>
          <p className="font-display text-lg sm:text-xl text-white">Mon <span className="text-brand-gold">répertoire</span></p>
        </div>
      </header>

      <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-6 space-y-5">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input
            value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un nom, un email, une société…"
            className="w-full bg-brand-card border border-brand-border pl-10 pr-4 py-3 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50"
          />
        </div>

        {charge ? (
          <p className="font-body text-sm text-brand-muted">Chargement…</p>
        ) : filtres.length === 0 ? (
          <p className="font-body text-sm text-brand-muted italic">
            {contacts.length === 0 ? "Aucun contact pour l'instant. Ils se créent automatiquement quand tu classes des mails." : 'Aucun résultat.'}
          </p>
        ) : (
          <>
            <p className="font-body text-[11px] tracking-widest uppercase text-brand-muted">{filtres.length} contact(s)</p>
            <div className="divide-y divide-brand-border border border-brand-border">
              {filtres.map((c) => (
                <Link key={c.id} href={`/app/contacts/${c.id}`} className="flex items-center gap-3 p-3 hover:bg-brand-card transition-colors">
                  <span className="shrink-0 w-9 h-9 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold"><User size={16} /></span>
                  <div className="min-w-0 flex-1">
                    <p className="font-body text-sm text-white truncate">{nomContact(c)}</p>
                    <p className="font-body text-xs text-brand-muted truncate">
                      {c.type && ROLE_LABELS[c.type] ? ROLE_LABELS[c.type] : 'Contact'}
                      {c.email ? ` · ${c.email}` : ''}{c.telephone ? ` · ${c.telephone}` : ''}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
