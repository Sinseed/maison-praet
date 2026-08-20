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
  Trash2, MessageSquare, Send, Pencil, UserRound, Mail, Coins, AlertTriangle,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { formatCHF, formatDate } from '@/lib/format'
import { STATUT_DOC_LABELS, STATUT_BIEN_LABELS, STATUT_OFFRE_LABELS, CANAL_LABELS } from '@/lib/dossier/checklist'
import { acquereursCorrespondants } from '@/lib/dossier/matching'
import { TYPE_BIEN_LABELS, type TypeBien } from '@/lib/estimation/types'
import { COMMUNES } from '@/lib/estimation/parametres-marche'
import type { AcquereurRow, BienRow, ContactRow, DocumentRow, EchangeRow, OffreRow, TacheRow } from '@/lib/supabase/rows'

const supabase = createClient()
const aujourdHui = () => new Date().toISOString().slice(0, 10)
const champVend = 'w-full bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50'

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
  const [tachesFaites, setTachesFaites] = useState<TacheRow[]>([])
  const [documents, setDocuments] = useState<DocumentRow[]>([])
  const [echanges, setEchanges] = useState<EchangeRow[]>([])
  const [offres, setOffres] = useState<OffreRow[]>([])
  const [acquereurs, setAcquereurs] = useState<AcquereurRow[]>([])
  const [contactsLies, setContactsLies] = useState<Array<ContactRow & { role: string | null }>>([])
  const [estim, setEstim] = useState<{ valeur_venale: number | null; prix_mise_en_vente: number | null; prix_plancher: number | null } | null>(null)
  const [charge, setCharge] = useState(true)
  const [erreur, setErreur] = useState<string | null>(null)

  const [nouvelleTache, setNouvelleTache] = useState('')
  const [nouveauDoc, setNouveauDoc] = useState('')
  const [nouvelEchange, setNouvelEchange] = useState('')
  const [nouvelleOffre, setNouvelleOffre] = useState({ montant: '', acquereur_id: '', notes: '' })
  const [contacts, setContacts] = useState<ContactRow[]>([])
  const [editVendeur, setEditVendeur] = useState(false)
  const [fVend, setFVend] = useState({
    prenom: '', nom: '', societe: '', telephone: '', email: '',
    adresse: '', npa_localite: '', notes: '',
    consentement_lpd: false, lba_identifie: false,
  })
  const [edition, setEdition] = useState(false)
  const [fEdit, setFEdit] = useState<{ reference: string; type: TypeBien; commune: string; adresse: string }>({ reference: '', type: 'villa', commune: '', adresse: '' })
  const [dragActif, setDragActif] = useState(false)
  const [envoi, setEnvoi] = useState(false)

  const charger = useCallback(async () => {
    setErreur(null)
    const [b, t, d, e, off, acq, cts, est, liens, tf] = await Promise.all([
      supabase.from('biens').select('*').eq('id', id).single(),
      supabase.from('taches').select('*').eq('bien_id', id).eq('statut', 'a_faire').order('echeance', { ascending: true, nullsFirst: false }),
      supabase.from('documents').select('*').eq('bien_id', id).order('created_at', { ascending: true }),
      supabase.from('echanges').select('*').eq('bien_id', id).order('date_echange', { ascending: false }),
      supabase.from('offres').select('*').eq('bien_id', id).order('date_offre', { ascending: false }),
      supabase.from('acquereurs').select('*'),
      supabase.from('contacts').select('*'),
      supabase.from('estimations').select('valeur_venale, prix_mise_en_vente, prix_plancher, version').eq('bien_id', id).order('version', { ascending: false }).limit(1),
      supabase.from('contacts_biens').select('contact_id, role').eq('bien_id', id),
      supabase.from('taches').select('*').eq('bien_id', id).eq('statut', 'faite').order('updated_at', { ascending: false }).limit(5),
    ])
    if (b.error) {
      setErreur(`Chargement impossible : ${b.error.message}`)
      setCharge(false)
      return
    }
    setBien(b.data as unknown as BienRow)
    setTaches((t.data as unknown as TacheRow[]) ?? [])
    setTachesFaites((tf.data as unknown as TacheRow[]) ?? [])
    setDocuments((d.data as unknown as DocumentRow[]) ?? [])
    setEchanges((e.data as unknown as EchangeRow[]) ?? [])
    setOffres((off.data as unknown as OffreRow[]) ?? [])
    setContacts((cts.data as unknown as ContactRow[]) ?? [])
    const parId = new Map(((cts.data as unknown as ContactRow[]) ?? []).map((c) => [c.id, c]))
    setAcquereurs(
      ((acq.data as unknown as AcquereurRow[]) ?? []).map((a) => ({
        ...a,
        contact: a.contact_id ? parId.get(a.contact_id) ?? null : null,
      })),
    )
    const lignesLiens = (liens.data as unknown as Array<{ contact_id: string; role: string | null }>) ?? []
    setContactsLies(
      lignesLiens
        .map((l) => { const c = parId.get(l.contact_id); return c ? { ...c, role: l.role } : null })
        .filter(Boolean) as Array<ContactRow & { role: string | null }>,
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
  // ── Propriétaire (vendeur) ─────────────────────────────────────────────────
  const vendeur = bien?.vendeur_id ? contacts.find((c) => c.id === bien.vendeur_id) ?? null : null

  const ouvrirEditVendeur = () => {
    setErreur(null)
    setFVend({
      prenom: vendeur?.prenom ?? '', nom: vendeur?.nom ?? '', societe: vendeur?.societe ?? '',
      telephone: vendeur?.telephone ?? '', email: vendeur?.email ?? '',
      adresse: vendeur?.adresse ?? '', npa_localite: vendeur?.npa_localite ?? '',
      notes: vendeur?.notes ?? '',
      consentement_lpd: vendeur?.consentement_lpd ?? false,
      lba_identifie: vendeur?.lba_identifie ?? false,
    })
    setEditVendeur(true)
  }

  /** Rattache un contact déjà existant comme propriétaire du bien. */
  const rattacherVendeur = async (contactId: string) => {
    setErreur(null)
    const { data, error } = await supabase
      .from('biens').update({ vendeur_id: contactId || null }).eq('id', id).select('id')
    if (error || !data?.length) {
      setErreur(`Rattachement impossible : ${error?.message ?? 'aucune ligne modifiée.'}`)
      return
    }
    setEditVendeur(false)
    charger()
  }

  const enregistrerVendeur = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fVend.nom.trim() && !fVend.prenom.trim() && !fVend.societe.trim()) {
      setErreur('Indiquez au moins un nom, un prénom ou une société.')
      return
    }
    setErreur(null)
    const champs = {
      type: 'vendeur',
      prenom: fVend.prenom.trim() || null,
      nom: fVend.nom.trim() || null,
      societe: fVend.societe.trim() || null,
      telephone: fVend.telephone.trim() || null,
      email: fVend.email.trim() || null,
      adresse: fVend.adresse.trim() || null,
      npa_localite: fVend.npa_localite.trim() || null,
      notes: fVend.notes.trim() || null,
      consentement_lpd: fVend.consentement_lpd,
      lba_identifie: fVend.lba_identifie,
    }

    if (vendeur) {
      const { data, error } = await supabase
        .from('contacts').update(champs).eq('id', vendeur.id).select('id')
      if (error || !data?.length) {
        setErreur(`Modification impossible : ${error?.message ?? 'aucune ligne modifiée.'}`)
        return
      }
    } else {
      const { data: cree, error } = await supabase.from('contacts').insert(champs).select().single()
      if (error || !cree) {
        setErreur(`Création du contact impossible : ${error?.message ?? ''}`)
        return
      }
      const { data: lie, error: eLien } = await supabase
        .from('biens').update({ vendeur_id: (cree as { id: string }).id }).eq('id', id).select('id')
      if (eLien || !lie?.length) {
        setErreur(`Contact créé, mais rattachement au dossier impossible : ${eLien?.message ?? 'aucune ligne modifiée.'}`)
        return
      }
    }
    setEditVendeur(false)
    charger()
  }

  const ouvrirEdition = () => {
    if (!bien) return
    setErreur(null)
    setFEdit({
      reference: bien.reference ?? '',
      type: bien.type as TypeBien,
      commune: bien.commune ?? '',
      adresse: bien.adresse ?? '',
    })
    setEdition(true)
  }
  const enregistrerModifs = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fEdit.commune.trim()) {
      setErreur('La commune est obligatoire.')
      return
    }
    const { error } = await supabase
      .from('biens')
      .update({
        reference: fEdit.reference.trim() || null,
        type: fEdit.type,
        commune: fEdit.commune.trim(),
        adresse: fEdit.adresse.trim() || null,
      })
      .eq('id', id)
    if (error) {
      setErreur(`Modification impossible : ${error.message}`)
      return
    }
    setEdition(false)
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
  const rouvrirTache = async (tid: string) => {
    await supabase.from('taches').update({ statut: 'a_faire' }).eq('id', tid)
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
  // ── Offres reçues ──────────────────────────────────────────────────────────
  const nomAcquereur = (acqId: string | null) => {
    if (!acqId) return null
    const a = acquereurs.find((x) => x.id === acqId)
    return a ? nomAcq(a) : null
  }
  const ajouterOffre = async (e: React.FormEvent) => {
    e.preventDefault()
    const brut = parseFloat(nouvelleOffre.montant.replace(/[^0-9.]/g, ''))
    if (!Number.isFinite(brut) || brut <= 0) {
      setErreur('Indique un montant d’offre valide.')
      return
    }
    setErreur(null)
    const { error } = await supabase.from('offres').insert({
      bien_id: id,
      acquereur_id: nouvelleOffre.acquereur_id || null,
      montant: brut,
      notes: nouvelleOffre.notes.trim() || null,
    })
    if (error) {
      setErreur(`Enregistrement de l’offre impossible : ${error.message}`)
      return
    }
    setNouvelleOffre({ montant: '', acquereur_id: '', notes: '' })
    charger()
  }
  const changerStatutOffre = async (offre: OffreRow, statut: string) => {
    setErreur(null)
    const { data, error } = await supabase.from('offres').update({ statut }).eq('id', offre.id).select('id')
    if (error || !data?.length) {
      setErreur(`Changement de statut impossible : ${error?.message ?? 'aucune ligne modifiée.'}`)
      return
    }
    charger()
  }
  const supprimerOffre = async (offre: OffreRow) => {
    setErreur(null)
    const { data, error } = await supabase.from('offres').delete().eq('id', offre.id).select('id')
    if (error || !data?.length) {
      setErreur(`Suppression de l’offre impossible : ${error?.message ?? 'aucune ligne supprimée.'}`)
      return
    }
    charger()
  }
  const supprimerDossier = async () => {
    if (!window.confirm('Supprimer définitivement ce dossier et tout son contenu (documents, tâches, historique) ? Cette action est irréversible.')) return
    setErreur(null)
    const paths = documents.map((d) => d.storage_path).filter(Boolean) as string[]
    if (paths.length) await supabase.storage.from('documents').remove(paths)
    // .select() renvoie les lignes réellement supprimées : si RLS/propriété
    // bloque la suppression, l'appel réussit mais ne supprime rien (0 ligne).
    // On détecte ce cas au lieu de rediriger vers une liste inchangée.
    const { data, error } = await supabase.from('biens').delete().eq('id', id).select('id')
    if (error) {
      setErreur(`Suppression impossible : ${error.message}`)
      return
    }
    if (!data || data.length === 0) {
      setErreur('Suppression impossible : ce dossier ne vous appartient pas, ou votre session a expiré. Reconnectez-vous puis réessayez.')
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
              <p className="font-display text-lg sm:text-xl text-white truncate">{bien.reference || bien.commune}</p>
              <p className="font-body text-[10px] tracking-widest uppercase text-brand-muted truncate">
                {TYPE_BIEN_LABELS[bien.type as TypeBien] ?? bien.type}{bien.reference ? ` · ${bien.commune}` : ''}{bien.adresse ? ` · ${bien.adresse}` : ''}
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
              onClick={ouvrirEdition}
              title="Modifier le dossier"
              className="inline-flex items-center gap-1.5 border border-brand-border text-brand-muted hover:text-brand-gold hover:border-brand-gold/40 transition-colors px-3 py-2 font-body text-xs"
            >
              <Pencil size={14} /> <span className="hidden sm:inline">Modifier</span>
            </button>
            <button
              onClick={supprimerDossier}
              title="Supprimer le dossier"
              className="inline-flex items-center gap-1.5 border border-brand-border text-brand-muted hover:text-red-400 hover:border-red-500/40 transition-colors px-3 py-2 font-body text-xs"
            >
              <Trash2 size={14} /> <span className="hidden sm:inline">Supprimer</span>
            </button>
          </div>
        </div>
      </header>

      {erreur && !edition && (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-6">
          <p className="border border-red-500/40 bg-red-500/10 text-red-300 font-body text-sm px-4 py-3">{erreur}</p>
        </div>
      )}

      {edition && (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-6">
          <form onSubmit={enregistrerModifs} className="border border-brand-gold/40 bg-brand-card p-5 space-y-4">
            <h2 className="flex items-center gap-2 font-display text-lg text-white"><Pencil size={16} className="text-brand-gold" /> Modifier le dossier</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block sm:col-span-2">
                <span className="block font-body text-[11px] tracking-wider uppercase text-brand-muted mb-1">Libellé (optionnel)</span>
                <input value={fEdit.reference} onChange={(e) => setFEdit({ ...fEdit, reference: e.target.value })} placeholder="Ex. Villa Durussel – Yvonand" className="w-full bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50" />
              </label>
              <label className="block">
                <span className="block font-body text-[11px] tracking-wider uppercase text-brand-muted mb-1">Type</span>
                <select value={fEdit.type} onChange={(e) => setFEdit({ ...fEdit, type: e.target.value as TypeBien })} className="w-full bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50">
                  {(Object.keys(TYPE_BIEN_LABELS) as TypeBien[]).map((t) => <option key={t} value={t}>{TYPE_BIEN_LABELS[t]}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="block font-body text-[11px] tracking-wider uppercase text-brand-muted mb-1">Commune</span>
                <input list="communes-edit" value={fEdit.commune} onChange={(e) => setFEdit({ ...fEdit, commune: e.target.value })} className="w-full bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50" />
                <datalist id="communes-edit">{COMMUNES.map((c) => <option key={c} value={c} />)}</datalist>
              </label>
              <label className="block sm:col-span-2">
                <span className="block font-body text-[11px] tracking-wider uppercase text-brand-muted mb-1">Adresse (optionnel)</span>
                <input value={fEdit.adresse} onChange={(e) => setFEdit({ ...fEdit, adresse: e.target.value })} className="w-full bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50" />
              </label>
            </div>
            {erreur && <p className="font-body text-red-400 text-sm">{erreur}</p>}
            <div className="flex items-center gap-2">
              <button type="submit" className="btn-gold bg-brand-gold text-brand-dark px-5 py-2 font-body text-xs font-medium tracking-widest uppercase hover:bg-brand-goldLight transition-colors">Enregistrer</button>
              <button type="button" onClick={() => { setEdition(false); setErreur(null) }} className="border border-brand-border text-brand-muted hover:text-white px-4 py-2 font-body text-xs">Annuler</button>
            </div>
          </form>
        </div>
      )}

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
        {/* Propriétaire du bien (vendeur) */}
        <section className="border border-brand-border bg-brand-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="flex items-center gap-2 font-display text-xl text-white"><UserRound size={18} className="text-brand-gold" /> Propriétaire</h2>
            {!editVendeur && (
              <button onClick={ouvrirEditVendeur} className="inline-flex items-center gap-1.5 border border-brand-border text-brand-muted hover:text-brand-gold hover:border-brand-gold/40 transition-colors px-3 py-1.5 font-body text-xs">
                <Pencil size={13} /> {vendeur ? 'Modifier' : 'Ajouter'}
              </button>
            )}
          </div>

          {editVendeur ? (
            <form onSubmit={enregistrerVendeur} className="space-y-4">
              {!vendeur && contacts.length > 0 && (
                <label className="block">
                  <span className="block font-body text-[11px] tracking-wider uppercase text-brand-muted mb-1">Ou rattacher un contact déjà enregistré</span>
                  <select
                    defaultValue=""
                    onChange={(e) => { if (e.target.value) rattacherVendeur(e.target.value) }}
                    className="w-full bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50"
                  >
                    <option value="">— nouveau contact ci-dessous —</option>
                    {contacts.map((c) => (
                      <option key={c.id} value={c.id}>
                        {[c.societe, c.prenom, c.nom].filter(Boolean).join(' ') || 'Contact sans nom'}
                        {c.type && c.type !== 'autre' ? ` (${c.type})` : ''}
                        {c.telephone ? ` · ${c.telephone}` : ''}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input value={fVend.prenom} onChange={(e) => setFVend({ ...fVend, prenom: e.target.value })} placeholder="Prénom" className={champVend} />
                <input value={fVend.nom} onChange={(e) => setFVend({ ...fVend, nom: e.target.value })} placeholder="Nom" className={champVend} />
                <input value={fVend.societe} onChange={(e) => setFVend({ ...fVend, societe: e.target.value })} placeholder="Société (si applicable)" className={champVend} />
                <input value={fVend.telephone} onChange={(e) => setFVend({ ...fVend, telephone: e.target.value })} placeholder="Téléphone" className={champVend} />
                <input value={fVend.email} onChange={(e) => setFVend({ ...fVend, email: e.target.value })} placeholder="E-mail" className={`${champVend} sm:col-span-2`} />
                <input value={fVend.adresse} onChange={(e) => setFVend({ ...fVend, adresse: e.target.value })} placeholder="Adresse" className={`${champVend} sm:col-span-2`} />
                <input value={fVend.npa_localite} onChange={(e) => setFVend({ ...fVend, npa_localite: e.target.value })} placeholder="NPA et localité" className={champVend} />
                <input value={fVend.notes} onChange={(e) => setFVend({ ...fVend, notes: e.target.value })} placeholder="Remarques (ex. joignable en soirée)" className={`${champVend} sm:col-span-3`} />
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-brand-border pt-3">
                <span className="font-body text-[11px] tracking-wider uppercase text-brand-muted">Obligations légales</span>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={fVend.consentement_lpd} onChange={(e) => setFVend({ ...fVend, consentement_lpd: e.target.checked })} className="accent-brand-gold" />
                  <span className="font-body text-xs text-brand-text">Consentement nLPD obtenu</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={fVend.lba_identifie} onChange={(e) => setFVend({ ...fVend, lba_identifie: e.target.checked })} className="accent-brand-gold" />
                  <span className="font-body text-xs text-brand-text">Identification LBA faite</span>
                </label>
              </div>

              <div className="flex items-center gap-2">
                <button type="submit" className="btn-gold bg-brand-gold text-brand-dark px-5 py-2 font-body text-xs font-medium tracking-widest uppercase hover:bg-brand-goldLight transition-colors">Enregistrer</button>
                <button type="button" onClick={() => { setEditVendeur(false); setErreur(null) }} className="border border-brand-border text-brand-muted hover:text-white px-4 py-2 font-body text-xs">Annuler</button>
              </div>
            </form>
          ) : vendeur ? (
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
              <div className="min-w-0">
                <p className="font-body text-white">{[vendeur.societe, vendeur.prenom, vendeur.nom].filter(Boolean).join(' ') || 'Contact sans nom'}</p>
                {(vendeur.adresse || vendeur.npa_localite) && (
                  <p className="font-body text-sm text-brand-muted mt-0.5">{[vendeur.adresse, vendeur.npa_localite].filter(Boolean).join(' · ')}</p>
                )}
                {vendeur.notes && <p className="font-body text-xs text-brand-muted italic mt-1">{vendeur.notes}</p>}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {vendeur.telephone && (
                  <a href={`tel:${vendeur.telephone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 border border-brand-border px-3 py-2 font-body text-sm text-brand-text hover:text-brand-gold hover:border-brand-gold/40 transition-colors">
                    <PhoneCall size={14} className="text-brand-gold" /> {vendeur.telephone}
                  </a>
                )}
                {vendeur.email && (
                  <a href={`mailto:${vendeur.email}`} className="inline-flex items-center gap-2 border border-brand-border px-3 py-2 font-body text-sm text-brand-text hover:text-brand-gold hover:border-brand-gold/40 transition-colors">
                    <Mail size={14} className="text-brand-gold" /> {vendeur.email}
                  </a>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
                <span className={`px-2 py-1 font-body text-[11px] border ${vendeur.consentement_lpd ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' : 'bg-red-500/15 text-red-300 border-red-500/30'}`}>
                  nLPD {vendeur.consentement_lpd ? '✓' : 'manquant'}
                </span>
                <span className={`px-2 py-1 font-body text-[11px] border ${vendeur.lba_identifie ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' : 'bg-red-500/15 text-red-300 border-red-500/30'}`}>
                  LBA {vendeur.lba_identifie ? '✓' : 'à faire'}
                </span>
              </div>
            </div>
          ) : (
            <p className="font-body text-sm text-brand-muted italic">Aucun propriétaire rattaché à ce dossier.</p>
          )}
        </section>

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

          {tachesFaites.length > 0 && (
            <div className="mt-5 pt-4 border-t border-brand-border">
              <p className="font-body text-[11px] tracking-widest uppercase text-brand-muted mb-2">Récemment clôturé</p>
              <ul className="space-y-1.5">
                {tachesFaites.map((t) => (
                  <li key={t.id} className="flex items-center gap-3 text-brand-muted">
                    <Check size={14} className="text-emerald-500 shrink-0" />
                    <span className="font-body text-sm line-through flex-1">{t.titre}</span>
                    <button onClick={() => rouvrirTache(t.id)} className="font-body text-[11px] text-brand-muted hover:text-brand-goldLight transition-colors shrink-0">Rouvrir</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Offres reçues */}
        <section className="border border-brand-border bg-brand-card p-5 lg:col-span-2">
          <h2 className="flex items-center gap-2 font-display text-xl text-white mb-1"><Coins size={18} className="text-brand-gold" /> Offres reçues</h2>
          <p className="font-body text-xs text-brand-muted mb-4">Chaque proposition chiffrée, son statut et l&apos;acquéreur — reprise automatiquement des mails classés.</p>
          {offres.length === 0 ? (
            <p className="font-body text-sm text-brand-muted italic">Aucune offre enregistrée sur ce dossier.</p>
          ) : (
            <div className="space-y-3">
              {offres.map((o) => {
                const st = STATUT_OFFRE_LABELS[o.statut] ?? STATUT_OFFRE_LABELS.recue
                const acq = nomAcquereur(o.acquereur_id)
                const sousPlancher = estim?.prix_plancher != null && o.montant < estim.prix_plancher
                return (
                  <div key={o.id} className="border border-brand-border bg-brand-dark p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-lg text-brand-gold">{formatCHF(o.montant)}</span>
                        <span className="font-body text-[11px] text-brand-muted">{formatDate(o.date_offre)}</span>
                      </div>
                      <span className={`shrink-0 font-body text-[10px] uppercase tracking-wider border px-2 py-0.5 ${st.classe}`}>{st.label}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                      {acq && <span className="font-body text-sm text-brand-text">{acq}</span>}
                      {o.acquereur_non_qualifie && (
                        <span className="inline-flex items-center gap-1 font-body text-[11px] text-amber-300" title="Solvabilité non vérifiée à la réception">
                          <AlertTriangle size={12} /> à qualifier
                        </span>
                      )}
                      {sousPlancher && (
                        <span className="inline-flex items-center gap-1 font-body text-[11px] text-red-300" title="Inférieure au prix plancher de l’estimation">
                          <AlertTriangle size={12} /> sous le plancher
                        </span>
                      )}
                    </div>
                    {o.notes && <p className="font-body text-xs text-brand-muted mt-1 whitespace-pre-wrap">{o.notes}</p>}
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <select
                        value={o.statut}
                        onChange={(ev) => changerStatutOffre(o, ev.target.value)}
                        className="bg-brand-card border border-brand-border text-brand-text px-2 py-1 font-body text-[11px] focus:outline-none focus:border-brand-gold/50"
                      >
                        {Object.keys(STATUT_OFFRE_LABELS).map((s) => <option key={s} value={s}>{STATUT_OFFRE_LABELS[s].label}</option>)}
                      </select>
                      <button onClick={() => supprimerOffre(o)} className="ml-auto text-brand-muted hover:text-red-400 transition-colors p-1" title="Supprimer l’offre"><Trash2 size={14} /></button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
          <form onSubmit={ajouterOffre} className="mt-4 grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-2">
            <input
              value={nouvelleOffre.montant}
              onChange={(e) => setNouvelleOffre({ ...nouvelleOffre, montant: e.target.value })}
              placeholder="Montant de l’offre (CHF)"
              inputMode="numeric"
              className="bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50"
            />
            <select
              value={nouvelleOffre.acquereur_id}
              onChange={(e) => setNouvelleOffre({ ...nouvelleOffre, acquereur_id: e.target.value })}
              className="bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50"
            >
              <option value="">— acquéreur (optionnel) —</option>
              {acquereurs.map((a) => <option key={a.id} value={a.id}>{nomAcq(a)}</option>)}
            </select>
            <button type="submit" className="border border-brand-border px-3 text-brand-muted hover:text-white transition-colors" title="Ajouter l’offre"><Plus size={16} /></button>
            <input
              value={nouvelleOffre.notes}
              onChange={(e) => setNouvelleOffre({ ...nouvelleOffre, notes: e.target.value })}
              placeholder="Note (ex. offre alternative, conditions)…"
              className="sm:col-span-3 bg-brand-dark border border-brand-border px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-brand-gold/50"
            />
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

        {/* Contacts du dossier */}
        {contactsLies.length > 0 && (
          <section className="border border-brand-border bg-brand-card p-5">
            <h2 className="flex items-center gap-2 font-display text-xl text-white mb-4"><Users size={18} className="text-brand-gold" /> Contacts</h2>
            <div className="space-y-2">
              {contactsLies.map((c) => (
                <Link key={c.id} href={`/app/contacts/${c.id}`} className="flex items-center justify-between gap-3 border border-brand-border bg-brand-dark p-3 hover:border-brand-gold/40 transition-colors">
                  <div className="min-w-0">
                    <p className="font-body text-sm text-white truncate">{[c.prenom, c.nom].filter(Boolean).join(' ') || c.societe || c.email || 'Contact'}</p>
                    <p className="font-body text-xs text-brand-muted truncate">{c.email || ''}{c.telephone ? ` · ${c.telephone}` : ''}</p>
                  </div>
                  {c.role && (
                    <span className="shrink-0 font-body text-[10px] uppercase tracking-wider text-brand-gold">
                      {(({ vendeur: 'Vendeur', acquereur: 'Acquéreur', notaire: 'Notaire', courtier_tiers: 'Courtier', artisan: 'Artisan', autre: 'Contact' } as Record<string, string>)[c.role]) ?? c.role}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

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
