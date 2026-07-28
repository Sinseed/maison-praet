'use client'

/**
 * CourtierOS — Espace privé : « Mes acquéreurs + à faire aujourd'hui ».
 * Données réelles persistées dans Supabase (carnet). Accès protégé par le
 * middleware (redirection vers /app/login si non connecté).
 */

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogOut, Plus, Trash2, Check, Bell, Users, TrendingUp, ShieldCheck, PhoneCall, FolderOpen } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { formatCHF, formatDate } from '@/lib/format'
import type { AcquereurRow, ContactRow, TacheRow } from '@/lib/supabase/rows'

const supabase = createClient()

function finDeJournee(d = new Date()) {
  const x = new Date(d)
  x.setHours(23, 59, 59, 999)
  return x
}

function nomAcquereur(a: AcquereurRow): string {
  const c = a.contact
  const nom = [c?.prenom, c?.nom].filter(Boolean).join(' ').trim()
  return nom || 'Acquéreur sans nom'
}

export default function EspaceApp() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [acquereurs, setAcquereurs] = useState<AcquereurRow[]>([])
  const [taches, setTaches] = useState<TacheRow[]>([])
  const [charge, setCharge] = useState(true)
  const [erreur, setErreur] = useState<string | null>(null)

  // Formulaire nouvel acquéreur
  const [f, setF] = useState({ prenom: '', nom: '', telephone: '', cherche: '', budget: '', communes: '' })
  const [nouvelleTache, setNouvelleTache] = useState('')

  const charger = useCallback(async () => {
    setErreur(null)
    // Requêtes séparées (pas de jointure imbriquée) : plus robuste.
    const [
      { data: acq, error: e1 },
      { data: cts, error: e2 },
      { data: tac, error: e3 },
    ] = await Promise.all([
      supabase.from('acquereurs').select('*').order('created_at', { ascending: false }),
      supabase.from('contacts').select('*'),
      supabase.from('taches').select('*').eq('statut', 'a_faire').order('echeance', { ascending: true, nullsFirst: false }),
    ])
    const err = e1 || e2 || e3
    if (err) {
      setErreur(`Chargement impossible : ${err.message}`)
      setCharge(false)
      return
    }
    const parId = new Map(((cts as unknown as ContactRow[]) ?? []).map((c) => [c.id, c]))
    const fusion = ((acq as unknown as AcquereurRow[]) ?? []).map((a) => ({
      ...a,
      contact: a.contact_id ? parId.get(a.contact_id) ?? null : null,
    }))
    setAcquereurs(fusion)
    setTaches((tac as unknown as TacheRow[]) ?? [])
    setCharge(false)
  }, [])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ''))
    charger()
  }, [charger])

  const deconnexion = async () => {
    await supabase.auth.signOut()
    router.push('/app/login')
    router.refresh()
  }

  const ajouterAcquereur = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!f.prenom && !f.nom) {
      setErreur('Indiquez au moins un prénom ou un nom.')
      return
    }
    setErreur(null)
    const { data: contact, error: eC } = await supabase
      .from('contacts')
      .insert({ type: 'acquereur', prenom: f.prenom || null, nom: f.nom || null, telephone: f.telephone || null, notes: f.cherche || null })
      .select()
      .single()
    if (eC || !contact) {
      setErreur("Enregistrement impossible (contact).")
      return
    }
    const communes = f.communes.split(',').map((c) => c.trim()).filter(Boolean)
    const budget = parseFloat(f.budget.replace(/[^0-9.]/g, ''))
    const { error: eA } = await supabase.from('acquereurs').insert({
      contact_id: (contact as { id: string }).id,
      budget_valide: Number.isFinite(budget) ? budget : null,
      communes_recherchees: communes,
    })
    if (eA) {
      setErreur("Enregistrement impossible (acquéreur).")
      return
    }
    setF({ prenom: '', nom: '', telephone: '', cherche: '', budget: '', communes: '' })
    charger()
  }

  const supprimerAcquereur = async (a: AcquereurRow) => {
    await supabase.from('acquereurs').delete().eq('id', a.id)
    if (a.contact_id) await supabase.from('contacts').delete().eq('id', a.contact_id)
    charger()
  }

  const relancerDans7j = async (a: AcquereurRow) => {
    const d = new Date()
    d.setDate(d.getDate() + 7)
    await supabase.from('taches').insert({ titre: `Relancer ${nomAcquereur(a)}`, echeance: d.toISOString() })
    charger()
  }

  const ajouterTache = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nouvelleTache.trim()) return
    await supabase.from('taches').insert({ titre: nouvelleTache.trim(), echeance: new Date().toISOString() })
    setNouvelleTache('')
    charger()
  }

  const terminerTache = async (id: string) => {
    await supabase.from('taches').update({ statut: 'faite' }).eq('id', id)
    charger()
  }

  const limite = finDeJournee().getTime()
  const aFaire = useMemo(
    () => taches.filter((t) => !t.echeance || new Date(t.echeance).getTime() <= limite),
    [taches, limite],
  )
  const aVenir = useMemo(
    () => taches.filter((t) => t.echeance && new Date(t.echeance).getTime() > limite),
    [taches, limite],
  )

  return (
    <div className="min-h-screen bg-brand-dark">
      <header className="border-b border-brand-border bg-brand-dark/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-display text-lg sm:text-xl text-white truncate">
              Mon <span className="text-brand-gold">tableau de bord</span>
            </p>
            <p className="font-body text-[10px] tracking-widest uppercase text-brand-muted truncate">{email}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/app/biens" className="inline-flex items-center gap-2 border border-brand-gold/40 text-brand-goldLight px-3 py-2 font-body text-xs tracking-wider uppercase hover:bg-brand-gold/10 transition-colors">
              <FolderOpen size={14} /> Dossiers
            </Link>
            <Link href="/crm/estimation" className="hidden sm:inline-flex items-center gap-2 border border-brand-gold/40 text-brand-goldLight px-3 py-2 font-body text-xs tracking-wider uppercase hover:bg-brand-gold/10 transition-colors">
              <TrendingUp size={14} /> Estimation
            </Link>
            <Link href="/crm/conformite" className="hidden sm:inline-flex items-center gap-2 border border-brand-gold/40 text-brand-goldLight px-3 py-2 font-body text-xs tracking-wider uppercase hover:bg-brand-gold/10 transition-colors">
              <ShieldCheck size={14} /> Conformité
            </Link>
            <button onClick={deconnexion} className="inline-flex items-center gap-2 border border-brand-border text-brand-muted px-3 py-2 font-body text-xs hover:text-white transition-colors">
              <LogOut size={14} /> <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        {/* ── À faire aujourd'hui ── */}
        <div className="space-y-4">
          <div className="border border-brand-gold/40 bg-brand-gold/5 p-5">
            <h2 className="flex items-center gap-2 font-display text-xl text-white mb-4">
              <Bell size={18} className="text-brand-gold" /> À faire aujourd&apos;hui
            </h2>
            {charge ? (
              <p className="font-body text-sm text-brand-muted">Chargement…</p>
            ) : aFaire.length === 0 ? (
              <p className="font-body text-sm text-brand-muted italic">Rien pour aujourd&apos;hui. 🎉</p>
            ) : (
              <ul className="space-y-2">
                {aFaire.map((t) => (
                  <li key={t.id} className="flex items-start gap-3 bg-brand-dark border border-brand-border p-3">
                    <button onClick={() => terminerTache(t.id)} className="mt-0.5 text-brand-muted hover:text-emerald-400 transition-colors" title="Marquer comme fait">
                      <Check size={16} />
                    </button>
                    <span className="font-body text-sm text-brand-text flex-1">{t.titre}</span>
                  </li>
                ))}
              </ul>
            )}

            <form onSubmit={ajouterTache} className="mt-4 flex gap-2">
              <input
                value={nouvelleTache} onChange={(e) => setNouvelleTache(e.target.value)}
                placeholder="Ajouter une tâche…"
                className="flex-1 bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50"
              />
              <button type="submit" className="border border-brand-border px-3 text-brand-muted hover:text-white transition-colors"><Plus size={16} /></button>
            </form>
          </div>

          {aVenir.length > 0 && (
            <div className="border border-brand-border bg-brand-card p-5">
              <h3 className="font-body text-[11px] tracking-widest uppercase text-brand-muted mb-3">À venir</h3>
              <ul className="space-y-2">
                {aVenir.map((t) => (
                  <li key={t.id} className="flex items-center justify-between gap-3">
                    <span className="font-body text-sm text-brand-text">{t.titre}</span>
                    <span className="font-body text-xs text-brand-muted shrink-0">{t.echeance ? formatDate(t.echeance) : ''}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ── Mes acquéreurs ── */}
        <div className="space-y-5">
          <div className="border border-brand-border bg-brand-card p-5">
            <h2 className="flex items-center gap-2 font-display text-xl text-white mb-4">
              <Users size={18} className="text-brand-gold" /> Ajouter un acquéreur
            </h2>
            <form onSubmit={ajouterAcquereur} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input value={f.prenom} onChange={(e) => setF({ ...f, prenom: e.target.value })} placeholder="Prénom" className="bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50" />
              <input value={f.nom} onChange={(e) => setF({ ...f, nom: e.target.value })} placeholder="Nom" className="bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50" />
              <input value={f.telephone} onChange={(e) => setF({ ...f, telephone: e.target.value })} placeholder="Téléphone" className="bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50" />
              <input value={f.budget} onChange={(e) => setF({ ...f, budget: e.target.value })} placeholder="Budget (CHF)" className="bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50" />
              <input value={f.communes} onChange={(e) => setF({ ...f, communes: e.target.value })} placeholder="Communes (séparées par virgule)" className="sm:col-span-2 bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50" />
              <input value={f.cherche} onChange={(e) => setF({ ...f, cherche: e.target.value })} placeholder="Cherche quoi ? (ex. 4,5 pièces avec jardin)" className="sm:col-span-2 bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50" />
              <button type="submit" className="btn-gold sm:col-span-2 bg-brand-gold text-brand-dark py-2.5 font-body text-xs font-medium tracking-widest uppercase hover:bg-brand-goldLight transition-colors">
                Enregistrer l&apos;acquéreur
              </button>
            </form>
            {erreur && <p className="font-body text-red-400 text-sm mt-3">{erreur}</p>}
          </div>

          <div>
            <p className="font-body text-[11px] tracking-widest uppercase text-brand-muted mb-3">
              {acquereurs.length} acquéreur(s)
            </p>
            {charge ? (
              <p className="font-body text-sm text-brand-muted">Chargement…</p>
            ) : acquereurs.length === 0 ? (
              <p className="font-body text-sm text-brand-muted italic">Aucun acquéreur pour l&apos;instant. Ajoute le premier ci-dessus.</p>
            ) : (
              <div className="space-y-3">
                {acquereurs.map((a) => (
                  <div key={a.id} className="border border-brand-border bg-brand-card p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-display text-lg text-white">{nomAcquereur(a)}</p>
                        {a.contact?.telephone && <p className="font-body text-xs text-brand-muted">{a.contact.telephone}</p>}
                      </div>
                      <button onClick={() => supprimerAcquereur(a)} className="text-brand-muted hover:text-red-400 transition-colors p-1 shrink-0"><Trash2 size={15} /></button>
                    </div>
                    {a.contact?.notes && <p className="font-body text-sm text-brand-text mt-2">{a.contact.notes}</p>}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                      {a.budget_valide != null && (
                        <span className="font-body text-sm text-brand-gold">{formatCHF(a.budget_valide)}</span>
                      )}
                      {a.communes_recherchees?.length > 0 && (
                        <span className="font-body text-xs text-brand-muted">{a.communes_recherchees.join(' · ')}</span>
                      )}
                    </div>
                    <button
                      onClick={() => relancerDans7j(a)}
                      className="mt-3 inline-flex items-center gap-2 border border-brand-border px-3 py-1.5 font-body text-xs text-brand-muted hover:text-brand-goldLight hover:border-brand-gold/50 transition-colors"
                    >
                      <PhoneCall size={13} /> Me rappeler de le relancer dans 7 jours
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
