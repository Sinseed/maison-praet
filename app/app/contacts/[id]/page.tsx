'use client'

/**
 * Fiche contact — coordonnées + historique : tous les dossiers auxquels la
 * personne est reliée (à vie, même mandats terminés) + ses échanges.
 */

import { useCallback, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, Building2, FolderOpen, MessageSquare, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { formatDate } from '@/lib/format'
import { TYPE_BIEN_LABELS, type TypeBien } from '@/lib/estimation/types'
import type { BienRow, ContactRow, EchangeRow } from '@/lib/supabase/rows'
import { ROLE_LABELS, nomContact } from '@/lib/contacts'

const supabase = createClient()

interface DossierLie extends BienRow { role: string | null }

export default function FicheContactPage() {
  const params = useParams()
  const router = useRouter()
  const id = String(params.id)
  const [contact, setContact] = useState<ContactRow | null>(null)
  const [dossiers, setDossiers] = useState<DossierLie[]>([])
  const [echanges, setEchanges] = useState<EchangeRow[]>([])
  const [charge, setCharge] = useState(true)

  const charger = useCallback(async () => {
    const [{ data: c }, { data: liens }, { data: ech }] = await Promise.all([
      supabase.from('contacts').select('id, prenom, nom, telephone, email, societe, type, notes, created_at').eq('id', id).maybeSingle(),
      supabase.from('contacts_biens').select('bien_id, role').eq('contact_id', id),
      supabase.from('echanges').select('*').eq('contact_id', id).order('date_echange', { ascending: false }),
    ])
    setContact((c as unknown as ContactRow) ?? null)
    setEchanges((ech as unknown as EchangeRow[]) ?? [])

    const roleParBien = new Map<string, string | null>(((liens as { bien_id: string; role: string | null }[]) ?? []).map((l) => [l.bien_id, l.role]))
    const ids = Array.from(roleParBien.keys())
    if (ids.length) {
      const { data: biens } = await supabase.from('biens').select('*').in('id', ids)
      const lies = ((biens as unknown as BienRow[]) ?? []).map((b) => ({ ...b, role: roleParBien.get(b.id) ?? null }))
      setDossiers(lies)
    } else {
      setDossiers([])
    }
    setCharge(false)
  }, [id])

  useEffect(() => { charger() }, [charger])

  const supprimer = async () => {
    if (!window.confirm('Supprimer définitivement ce contact du répertoire ?')) return
    await supabase.from('contacts').delete().eq('id', id)
    router.push('/app/contacts')
  }

  if (charge) return <div className="min-h-screen bg-brand-dark flex items-center justify-center"><p className="font-body text-brand-muted">Chargement…</p></div>
  if (!contact) return <div className="min-h-screen bg-brand-dark flex items-center justify-center"><p className="font-body text-brand-muted">Contact introuvable.</p></div>

  return (
    <div className="min-h-screen bg-brand-dark">
      <header className="border-b border-brand-border bg-brand-dark/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <Link href="/app/contacts" className="text-brand-muted hover:text-brand-gold transition-colors shrink-0"><ArrowLeft size={18} /></Link>
          <p className="font-display text-lg sm:text-xl text-white truncate">{nomContact(contact)}</p>
          {contact.type && ROLE_LABELS[contact.type] && (
            <span className="shrink-0 font-body text-[10px] uppercase tracking-wider border border-brand-gold/40 text-brand-goldLight px-2 py-0.5">{ROLE_LABELS[contact.type]}</span>
          )}
          <button onClick={supprimer} className="ml-auto shrink-0 text-brand-muted hover:text-red-400 transition-colors p-1" title="Supprimer ce contact"><Trash2 size={16} /></button>
        </div>
      </header>

      <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Coordonnées */}
        <section className="border border-brand-border bg-brand-card p-5 space-y-2">
          {contact.societe && <p className="flex items-center gap-2 font-body text-sm text-brand-text"><Building2 size={15} className="text-brand-gold" /> {contact.societe}</p>}
          {contact.email && <a href={`mailto:${contact.email}`} className="flex items-center gap-2 font-body text-sm text-brand-text hover:text-brand-gold transition-colors"><Mail size={15} className="text-brand-gold" /> {contact.email}</a>}
          {contact.telephone && <a href={`tel:${contact.telephone}`} className="flex items-center gap-2 font-body text-sm text-brand-text hover:text-brand-gold transition-colors"><Phone size={15} className="text-brand-gold" /> {contact.telephone}</a>}
          {!contact.email && !contact.telephone && !contact.societe && <p className="font-body text-sm text-brand-muted italic">Aucune coordonnée enregistrée.</p>}
        </section>

        {/* Dossiers liés */}
        <section>
          <h2 className="flex items-center gap-2 font-display text-xl text-white mb-3"><FolderOpen size={18} className="text-brand-gold" /> Dossiers ({dossiers.length})</h2>
          {dossiers.length === 0 ? (
            <p className="font-body text-sm text-brand-muted italic">Aucun dossier relié.</p>
          ) : (
            <div className="space-y-2">
              {dossiers.map((d) => (
                <Link key={d.id} href={`/app/biens/${d.id}`} className="flex items-center justify-between gap-3 border border-brand-border bg-brand-card p-3 hover:border-brand-gold/40 transition-colors">
                  <div className="min-w-0">
                    <p className="font-body text-sm text-white truncate">{d.commune}{d.adresse ? ` — ${d.adresse}` : ''}</p>
                    <p className="font-body text-xs text-brand-muted">{TYPE_BIEN_LABELS[d.type as TypeBien] ?? d.type} · {d.statut}</p>
                  </div>
                  {d.role && ROLE_LABELS[d.role] && <span className="shrink-0 font-body text-[10px] uppercase tracking-wider text-brand-gold">{ROLE_LABELS[d.role]}</span>}
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Échanges directs */}
        {echanges.length > 0 && (
          <section>
            <h2 className="flex items-center gap-2 font-display text-xl text-white mb-3"><MessageSquare size={18} className="text-brand-gold" /> Échanges</h2>
            <div className="space-y-2">
              {echanges.map((e) => (
                <div key={e.id} className="border border-brand-border bg-brand-card p-3">
                  <p className="font-body text-[11px] uppercase tracking-wider text-brand-muted mb-1">{formatDate(e.date_echange)} · {e.canal}</p>
                  <p className="font-body text-sm text-brand-text">{e.contenu}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
