'use client'

/**
 * CourtierOS — Liste des dossiers (biens) + création.
 * À la création, la checklist de documents standard est pré-remplie selon le type.
 */

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, FolderOpen, FileWarning } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { checklistDefaut, STATUT_BIEN_LABELS } from '@/lib/dossier/checklist'
import { TYPE_BIEN_LABELS, type TypeBien } from '@/lib/estimation/types'
import { COMMUNES } from '@/lib/estimation/parametres-marche'
import type { BienRow, DocumentRow } from '@/lib/supabase/rows'

const supabase = createClient()

export default function BiensPage() {
  const router = useRouter()
  const [biens, setBiens] = useState<BienRow[]>([])
  const [docs, setDocs] = useState<DocumentRow[]>([])
  const [charge, setCharge] = useState(true)
  const [erreur, setErreur] = useState<string | null>(null)
  const [creation, setCreation] = useState(false)
  const [f, setF] = useState<{ type: TypeBien; commune: string; adresse: string }>({ type: 'villa', commune: '', adresse: '' })

  const charger = useCallback(async () => {
    setErreur(null)
    const [{ data: b, error: e1 }, { data: d, error: e2 }] = await Promise.all([
      supabase.from('biens').select('*').order('created_at', { ascending: false }),
      supabase.from('documents').select('*'),
    ])
    if (e1 || e2) {
      setErreur(`Chargement impossible : ${(e1 || e2)?.message}`)
    } else {
      setBiens((b as unknown as BienRow[]) ?? [])
      setDocs((d as unknown as DocumentRow[]) ?? [])
    }
    setCharge(false)
  }, [])

  useEffect(() => {
    charger()
  }, [charger])

  const creerBien = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!f.commune.trim()) {
      setErreur('Indiquez au moins la commune.')
      return
    }
    setCreation(true)
    setErreur(null)
    try {
      const { data: bien, error: eB } = await supabase
        .from('biens')
        .insert({ type: f.type, commune: f.commune.trim(), adresse: f.adresse.trim() || null, statut: 'prospection' })
        .select()
        .single()
      if (eB || !bien) {
        setErreur("Création impossible du bien.")
        return
      }
      const bienId = (bien as { id: string }).id
      const checklist = checklistDefaut(f.type).map((d) => ({
        bien_id: bienId,
        type: d.type,
        nom: d.nom,
        statut: 'manquant',
      }))
      if (checklist.length > 0) await supabase.from('documents').insert(checklist)
      router.push(`/app/biens/${bienId}`)
    } finally {
      setCreation(false)
    }
  }

  const docsManquants = (bienId: string) =>
    docs.filter((d) => d.bien_id === bienId && d.statut !== 'recu').length

  return (
    <div className="min-h-screen bg-brand-dark">
      <header className="border-b border-brand-border bg-brand-dark/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <Link href="/app" className="text-brand-muted hover:text-brand-gold transition-colors shrink-0"><ArrowLeft size={18} /></Link>
          <p className="font-display text-lg sm:text-xl text-white">Mes <span className="text-brand-gold">dossiers</span></p>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Création */}
        <div className="border border-brand-border bg-brand-card p-5">
          <h2 className="flex items-center gap-2 font-display text-xl text-white mb-4"><Plus size={18} className="text-brand-gold" /> Nouveau dossier</h2>
          <form onSubmit={creerBien} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="block">
              <span className="block font-body text-[11px] tracking-wider uppercase text-brand-muted mb-1">Type</span>
              <select value={f.type} onChange={(e) => setF({ ...f, type: e.target.value as TypeBien })} className="w-full bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50">
                {(Object.keys(TYPE_BIEN_LABELS) as TypeBien[]).map((t) => <option key={t} value={t}>{TYPE_BIEN_LABELS[t]}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="block font-body text-[11px] tracking-wider uppercase text-brand-muted mb-1">Commune</span>
              <input list="communes-biens" value={f.commune} onChange={(e) => setF({ ...f, commune: e.target.value })} className="w-full bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50" />
              <datalist id="communes-biens">{COMMUNES.map((c) => <option key={c} value={c} />)}</datalist>
            </label>
            <label className="block">
              <span className="block font-body text-[11px] tracking-wider uppercase text-brand-muted mb-1">Adresse (optionnel)</span>
              <input value={f.adresse} onChange={(e) => setF({ ...f, adresse: e.target.value })} className="w-full bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50" />
            </label>
            <button type="submit" disabled={creation} className="btn-gold sm:col-span-3 bg-brand-gold text-brand-dark py-2.5 font-body text-xs font-medium tracking-widest uppercase hover:bg-brand-goldLight transition-colors disabled:opacity-60">
              {creation ? 'Création…' : 'Créer le dossier'}
            </button>
          </form>
          {erreur && <p className="font-body text-red-400 text-sm mt-3">{erreur}</p>}
        </div>

        {/* Liste */}
        {charge ? (
          <p className="font-body text-sm text-brand-muted">Chargement…</p>
        ) : biens.length === 0 ? (
          <p className="font-body text-sm text-brand-muted italic">Aucun dossier. Crée le premier ci-dessus.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {biens.map((b) => {
              const manquants = docsManquants(b.id)
              return (
                <Link key={b.id} href={`/app/biens/${b.id}`} className="card-luxe border border-brand-border bg-brand-card p-5 hover:border-brand-gold/40 transition-colors">
                  <div className="flex items-center gap-2 text-brand-muted mb-2">
                    <FolderOpen size={16} className="text-brand-gold" />
                    <span className="font-body text-[10px] tracking-widest uppercase">{STATUT_BIEN_LABELS[b.statut] ?? b.statut}</span>
                  </div>
                  <p className="font-display text-xl text-white">{b.commune}</p>
                  <p className="font-body text-sm text-brand-muted">{TYPE_BIEN_LABELS[b.type as TypeBien] ?? b.type}</p>
                  {b.adresse && <p className="font-body text-xs text-brand-muted mt-1">{b.adresse}</p>}
                  {manquants > 0 && (
                    <p className="mt-3 inline-flex items-center gap-1.5 font-body text-xs text-amber-300">
                      <FileWarning size={13} /> {manquants} document(s) à obtenir
                    </p>
                  )}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
