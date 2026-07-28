'use client'

/**
 * CourtierOS — Dossier du bien (« tout au même endroit »).
 * Ordre : tâches en cours · acquéreurs correspondants (matching auto) ·
 * documents (checklist + upload) · historique des échanges.
 */

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Bell, Plus, Check, Users, PhoneCall, FileText, Upload, Download,
  Trash2, MessageSquare, Send,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { formatCHF, formatDate } from '@/lib/format'
import { STATUT_DOC_LABELS, STATUT_BIEN_LABELS, CANAL_LABELS } from '@/lib/dossier/checklist'
import { acquereursCorrespondants } from '@/lib/dossier/matching'
import { TYPE_BIEN_LABELS, type TypeBien } from '@/lib/estimation/types'
import type { AcquereurRow, BienRow, ContactRow, DocumentRow, EchangeRow, TacheRow } from '@/lib/supabase/rows'

const supabase = createClient()
const aujourdHui = () => new Date().toISOString().slice(0, 10)

function nomAcq(a: AcquereurRow) {
  const c = a.contact
  return [c?.prenom, c?.nom].filter(Boolean).join(' ').trim() || 'Acquéreur sans nom'
}

export default function DossierBien() {
  const params = useParams()
  const router = useRouter()
  const id = String(params.id)

  const [userId, setUserId] = useState('')
  const [bien, setBien] = useState<BienRow | null>(null)
  const [taches, setTaches] = useState<TacheRow[]>([])
  const [documents, setDocuments] = useState<DocumentRow[]>([])
  const [echanges, setEchanges] = useState<EchangeRow[]>([])
  const [acquereurs, setAcquereurs] = useState<AcquereurRow[]>([])
  const [estim, setEstim] = useState<{ valeur_venale: number | null; prix_mise_en_vente: number | null; prix_plancher: number | null } | null>(null)
  const [charge, setCharge] = useState(true)
  const [erreur, setErreur] = useState<string | null>(null)

  const [nouvelleTache, setNouvelleTache] = useState('')
  const [nouveauDoc, setNouveauDoc] = useState('')
  const [nouvelEchange, setNouvelEchange] = useState('')
  const [dragActif, setDragActif] = useState(false)
  const [envoi, setEnvoi] = useState(false)

  const charger = useCallback(async () => {
    setErreur(null)
    const [b, t, d, e, acq, cts, est] = await Promise.all([
      supabase.from('biens').select('*').eq('id', id).single(),
      supabase.from('taches').select('*').eq('bien_id', id).eq('statut', 'a_faire').order('echeance', { ascending: true, nullsFirst: false }),
      supabase.from('documents').select('*').eq('bien_id', id).order('created_at', { ascending: true }),
      supabase.from('echanges').select('*').eq('bien_id', id).order('date_echange', { ascending: false }),
      supabase.from('acquereurs').select('*'),
      supabase.from('contacts').select('*'),
      supabase.from('estimations').select('valeur_venale, prix_mise_en_vente, prix_plancher, version').eq('bien_id', id).order('version', { ascending: false }).limit(1),
    ])
    if (b.error) {
      setErreur(`Chargement impossible : ${b.error.message}`)
      setCharge(false)
      return
    }
    setBien(b.data as unknown as BienRow)
    setTaches((t.data as unknown as TacheRow[]) ?? [])
    setDocuments((d.data as unknown as DocumentRow[]) ?? [])
    setEchanges((e.data as unknown as EchangeRow[]) ?? [])
    const parId = new Map(((cts.data as unknown as ContactRow[]) ?? []).map((c) => [c.id, c]))
    setAcquereurs(
      ((acq.data as unknown as AcquereurRow[]) ?? []).map((a) => ({
        ...a,
        contact: a.contact_id ? parId.get(a.contact_id) ?? null : null,
      })),
    )
    const estRows = (est.data as unknown as Array<{ valeur_venale: number | null; prix_mise_en_vente: number | null; prix_plancher: number | null }>) ?? []
    setEstim(estRows[0] ?? null)
    setCharge(false)
  }, [id])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? ''))
    charger()
  }, [charger])

  const matches = useMemo(
    () => (bien ? acquereursCorrespondants(acquereurs, bien) : []),
    [acquereurs, bien],
  )

  // ── Actions ────────────────────────────────────────────────────────────────
  const changerStatutBien = async (statut: string) => {
    await supabase.from('biens').update({ statut }).eq('id', id)
    charger()
  }
  const ajouterTache = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nouvelleTache.trim()) return
    await supabase.from('taches').insert({ titre: nouvelleTache.trim(), bien_id: id, echeance: new Date().toISOString() })
    setNouvelleTache('')
    charger()
  }
  const terminerTache = async (tid: string) => {
    await supabase.from('taches').update({ statut: 'faite' }).eq('id', tid)
    charger()
  }
  const relancerAcq = async (a: AcquereurRow) => {
    const d = new Date(); d.setDate(d.getDate() + 2)
    await supabase.from('taches').insert({ titre: `Contacter ${nomAcq(a)} (${bien?.commune})`, bien_id: id, echeance: d.toISOString() })
    charger()
  }
  const setStatutDoc = async (doc: DocumentRow, statut: string) => {
    const patch: Record<string, unknown> = { statut }
    if (statut === 'demande') patch.date_demande = aujourdHui()
    if (statut === 'recu') patch.date_reception = aujourdHui()
    await supabase.from('documents').update(patch).eq('id', doc.id)
    charger()
  }
  const ajouterDoc = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nouveauDoc.trim()) return
    await supabase.from('documents').insert({ bien_id: id, type: 'autre', nom: nouveauDoc.trim(), statut: 'manquant' })
    setNouveauDoc('')
    charger()
  }
  const supprimerDoc = async (doc: DocumentRow) => {
    if (doc.storage_path) await supabase.storage.from('documents').remove([doc.storage_path])
    await supabase.from('documents').delete().eq('id', doc.id)
    charger()
  }
  const uploader = async (doc: DocumentRow, file: File) => {
    if (!userId) return
    setErreur(null)
    const propre = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
    const path = `${userId}/${id}/${Date.now()}-${propre}`
    const { error: up } = await supabase.storage.from('documents').upload(path, file, { upsert: false })
    if (up) {
      setErreur(`Envoi du fichier impossible : ${up.message}`)
      return
    }
    await supabase.from('documents').update({ storage_path: path, statut: 'recu', date_reception: aujourdHui() }).eq('id', doc.id)
    charger()
  }
  // Dépôt direct d'un ou plusieurs fichiers (glisser-déposer ou sélection) :
  // crée une nouvelle pièce dans le dossier, sans passer par la checklist.
  const deposerFichiers = async (files: FileList | File[]) => {
    if (!userId) return
    const liste = Array.from(files)
    if (!liste.length) return
    setErreur(null)
    setEnvoi(true)
    for (const file of liste) {
      const propre = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
      const path = `${userId}/${id}/${Date.now()}-${propre}`
      const { error: up } = await supabase.storage.from('documents').upload(path, file, { upsert: false })
      if (up) {
        setErreur(`Envoi de « ${file.name} » impossible : ${up.message}`)
        continue
      }
      await supabase.from('documents').insert({
        bien_id: id,
        type: 'autre',
        nom: file.name,
        statut: 'recu',
        storage_path: path,
        date_reception: aujourdHui(),
      })
    }
    setEnvoi(false)
    charger()
  }
  const telecharger = async (doc: DocumentRow) => {
    if (!doc.storage_path) return
    const { data } = await supabase.storage.from('documents').createSignedUrl(doc.storage_path, 3600)
    if (data?.signedUrl) window.open(data.signedUrl, '_blank')
  }
  const ajouterEchange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nouvelEchange.trim()) return
    await supabase.from('echanges').insert({ bien_id: id, canal: 'note', contenu: nouvelEchange.trim() })
    setNouvelEchange('')
    charger()
  }
  const supprimerDossier = async () => {
    if (!window.confirm('Supprimer définitivement ce dossier et tout son contenu (documents, tâches, historique) ? Cette action est irréversible.')) return
    const paths = documents.map((d) => d.storage_path).filter(Boolean) as string[]
    if (paths.length) await supabase.storage.from('documents').remove(paths)
    const { error } = await supabase.from('biens').delete().eq('id', id)
    if (error) {
      setErreur(`Suppression impossible : ${error.message}`)
      return
    }
    router.push('/app/biens')
  }

  if (charge) {
    return <div className="min-h-screen bg-brand-dark flex items-center justify-center"><p className="font-body text-brand-muted">Chargement…</p></div>
  }
  if (!bien) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center gap-4">
        <p className="font-body text-brand-muted">{erreur ?? 'Dossier introuvable.'}</p>
        <Link href="/app/biens" className="font-body text-sm text-brand-gold">← Mes dossiers</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-dark">
      <header className="border-b border-brand-border bg-brand-dark/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/app/biens" className="text-brand-muted hover:text-brand-gold transition-colors shrink-0"><ArrowLeft size={18} /></Link>
            <div className="min-w-0">
              <p className="font-display text-lg sm:text-xl text-white truncate">{bien.commune}</p>
              <p className="font-body text-[10px] tracking-widest uppercase text-brand-muted truncate">
                {TYPE_BIEN_LABELS[bien.type as TypeBien] ?? bien.type}{bien.adresse ? ` · ${bien.adresse}` : ''}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <select
              value={bien.statut}
              onChange={(e) => changerStatutBien(e.target.value)}
              className="bg-brand-card border border-brand-gold/40 text-brand-goldLight px-3 py-2 font-body text-xs focus:outline-none"
            >
              {Object.keys(STATUT_BIEN_LABELS).map((s) => <option key={s} value={s}>{STATUT_BIEN_LABELS[s]}</option>)}
            </select>
            <button
              onClick={supprimerDossier}
              title="Supprimer le dossier"
              className="border border-brand-border text-brand-muted hover:text-red-400 hover:border-red-500/40 transition-colors p-2"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </header>

      {estim && (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-6">
          <div className="border border-brand-gold/40 bg-brand-gold/5 p-4 flex flex-wrap items-center gap-x-8 gap-y-2">
            <span className="font-body text-[11px] uppercase tracking-widest text-brand-muted">Estimation</span>
            <span className="font-body text-sm text-brand-text">Mise en vente&nbsp;: <span className="text-brand-gold font-medium">{formatCHF(estim.prix_mise_en_vente ?? 0)}</span></span>
            <span className="font-body text-sm text-brand-text">Valeur retenue&nbsp;: <span className="text-white">{formatCHF(estim.valeur_venale ?? 0)}</span></span>
            <span className="font-body text-sm text-brand-text">Plancher&nbsp;: <span className="text-white">{formatCHF(estim.prix_plancher ?? 0)}</span></span>
          </div>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tâches — en premier */}
        <section className="border border-brand-gold/40 bg-brand-gold/5 p-5 lg:col-span-2">
          <h2 className="flex items-center gap-2 font-display text-xl text-white mb-4"><Bell size={18} className="text-brand-gold" /> Tâches en cours</h2>
          {taches.length === 0 ? (
            <p className="font-body text-sm text-brand-muted italic">Aucune tâche en cours sur ce dossier.</p>
          ) : (
            <ul className="space-y-2">
              {taches.map((t) => (
                <li key={t.id} className="flex items-start gap-3 bg-brand-dark border border-brand-border p-3">
                  <button onClick={() => terminerTache(t.id)} className="mt-0.5 text-brand-muted hover:text-emerald-400 transition-colors" title="Fait"><Check size={16} /></button>
                  <span className="font-body text-sm text-brand-text flex-1">{t.titre}</span>
                  {t.echeance && <span className="font-body text-xs text-brand-muted shrink-0">{formatDate(t.echeance)}</span>}
                </li>
              ))}
            </ul>
          )}
          <form onSubmit={ajouterTache} className="mt-4 flex gap-2">
            <input value={nouvelleTache} onChange={(e) => setNouvelleTache(e.target.value)} placeholder="Ajouter une tâche à ce dossier…" className="flex-1 bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50" />
            <button type="submit" className="border border-brand-border px-3 text-brand-muted hover:text-white transition-colors"><Plus size={16} /></button>
          </form>
        </section>

        {/* Acquéreurs correspondants (matching auto) */}
        <section className="border border-brand-border bg-brand-card p-5">
          <h2 className="flex items-center gap-2 font-display text-xl text-white mb-1"><Users size={18} className="text-brand-gold" /> Acquéreurs qui correspondent</h2>
          <p className="font-body text-xs text-brand-muted mb-4">Sélection automatique selon la commune et la typologie.</p>
          {matches.length === 0 ? (
            <p className="font-body text-sm text-brand-muted italic">Aucun acquéreur enregistré ne correspond pour l&apos;instant.</p>
          ) : (
            <div className="space-y-3">
              {matches.map((a) => (
                <div key={a.id} className="border border-brand-border bg-brand-dark p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-body text-sm text-white font-medium">{nomAcq(a)}</p>
                    {a.budget_valide != null && <span className="font-body text-sm text-brand-gold shrink-0">{formatCHF(a.budget_valide)}</span>}
                  </div>
                  {a.contact?.notes && <p className="font-body text-xs text-brand-muted mt-1">{a.contact.notes}</p>}
                  <div className="flex items-center gap-3 mt-2">
                    {a.contact?.telephone && <a href={`tel:${a.contact.telephone}`} className="font-body text-xs text-brand-muted hover:text-brand-gold">{a.contact.telephone}</a>}
                    <button onClick={() => relancerAcq(a)} className="inline-flex items-center gap-1.5 font-body text-xs text-brand-muted hover:text-brand-goldLight transition-colors">
                      <PhoneCall size={12} /> Me rappeler de le contacter
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Documents */}
        <section className="border border-brand-border bg-brand-card p-5">
          <h2 className="flex items-center gap-2 font-display text-xl text-white mb-4"><FileText size={18} className="text-brand-gold" /> Documents</h2>

          {/* Dépôt direct — glisser-déposer ou clic */}
          <label
            onDragOver={(e) => { e.preventDefault(); setDragActif(true) }}
            onDragLeave={() => setDragActif(false)}
            onDrop={(e) => { e.preventDefault(); setDragActif(false); deposerFichiers(e.dataTransfer.files) }}
            className={`flex flex-col items-center justify-center gap-1.5 border border-dashed px-4 py-6 mb-4 text-center cursor-pointer transition-colors ${dragActif ? 'border-brand-gold bg-brand-gold/10' : 'border-brand-border hover:border-brand-gold/50 bg-brand-dark'}`}
          >
            <Upload size={18} className="text-brand-gold" />
            <span className="font-body text-sm text-white">{envoi ? 'Envoi en cours…' : 'Glisse un fichier ici, ou clique pour choisir'}</span>
            <span className="font-body text-[11px] text-brand-muted">PDF, photos… — depuis ton ordinateur ou ton téléphone. Plusieurs fichiers possibles.</span>
            <input
              type="file"
              multiple
              className="sr-only"
              onChange={(ev) => { if (ev.target.files) deposerFichiers(ev.target.files); ev.target.value = '' }}
            />
          </label>

          <div className="space-y-2">
            {documents.map((doc) => {
              const st = STATUT_DOC_LABELS[doc.statut] ?? STATUT_DOC_LABELS.manquant
              return (
                <div key={doc.id} className="border border-brand-border bg-brand-dark p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-body text-sm text-white">{doc.nom}</p>
                      {doc.date_reception && <p className="font-body text-[11px] text-brand-muted">Reçu le {formatDate(doc.date_reception)}</p>}
                    </div>
                    <span className={`shrink-0 font-body text-[10px] uppercase tracking-wider border px-2 py-0.5 ${st.classe}`}>{st.label}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <button onClick={() => setStatutDoc(doc, 'demande')} className="font-body text-[11px] border border-brand-border px-2 py-1 text-brand-muted hover:text-amber-300 transition-colors">Demandé</button>
                    <button onClick={() => setStatutDoc(doc, 'recu')} className="font-body text-[11px] border border-brand-border px-2 py-1 text-brand-muted hover:text-emerald-300 transition-colors">Reçu</button>
                    {doc.storage_path ? (
                      <button onClick={() => telecharger(doc)} className="inline-flex items-center gap-1 font-body text-[11px] border border-brand-border px-2 py-1 text-brand-gold hover:text-brand-goldLight transition-colors"><Download size={12} /> Ouvrir</button>
                    ) : (
                      <label className="inline-flex items-center gap-1 font-body text-[11px] border border-brand-border px-2 py-1 text-brand-muted hover:text-white transition-colors cursor-pointer">
                        <Upload size={12} /> Fichier
                        <input type="file" className="sr-only" onChange={(ev) => { const file = ev.target.files?.[0]; if (file) uploader(doc, file) }} />
                      </label>
                    )}
                    <button onClick={() => supprimerDoc(doc)} className="ml-auto text-brand-muted hover:text-red-400 transition-colors p-1"><Trash2 size={14} /></button>
                  </div>
                </div>
              )
            })}
          </div>
          <form onSubmit={ajouterDoc} className="mt-4 flex gap-2">
            <input value={nouveauDoc} onChange={(e) => setNouveauDoc(e.target.value)} placeholder="Ajouter une pièce attendue à la liste (ex. CECB)…" className="flex-1 bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50" />
            <button type="submit" className="border border-brand-border px-3 text-brand-muted hover:text-white transition-colors"><Plus size={16} /></button>
          </form>
          {erreur && <p className="font-body text-red-400 text-xs mt-3">{erreur}</p>}
        </section>

        {/* Historique / échanges */}
        <section className="border border-brand-border bg-brand-card p-5 lg:col-span-2">
          <h2 className="flex items-center gap-2 font-display text-xl text-white mb-1"><MessageSquare size={18} className="text-brand-gold" /> Historique</h2>
          <p className="font-body text-xs text-brand-muted mb-4">Notes, appels, mails. Astuce : transfère-moi un mail dans Claude Code, je le classe ici automatiquement.</p>
          <form onSubmit={ajouterEchange} className="flex gap-2 mb-4">
            <input value={nouvelEchange} onChange={(e) => setNouvelEchange(e.target.value)} placeholder="Noter un échange (ex. « appelé le proprio, ok pour visite jeudi »)…" className="flex-1 bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50" />
            <button type="submit" className="btn-gold inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-4 font-body text-xs font-medium uppercase tracking-wider hover:bg-brand-goldLight transition-colors"><Send size={14} /></button>
          </form>
          {echanges.length === 0 ? (
            <p className="font-body text-sm text-brand-muted italic">Aucun échange consigné.</p>
          ) : (
            <ul className="space-y-3">
              {echanges.map((ec) => (
                <li key={ec.id} className="border-l-2 border-brand-gold/40 pl-3">
                  <div className="flex items-center gap-2">
                    <span className="font-body text-[10px] uppercase tracking-wider text-brand-muted">{CANAL_LABELS[ec.canal] ?? ec.canal}</span>
                    <span className="font-body text-[11px] text-brand-muted">{formatDate(ec.date_echange)}</span>
                  </div>
                  <p className="font-body text-sm text-brand-text mt-0.5 whitespace-pre-wrap">{ec.contenu}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
