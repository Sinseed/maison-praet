'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ChevronLeft, ChevronRight, X, Camera, Phone, Mail } from 'lucide-react'
import { MANDATS } from '../../data'

export default function BienPage() {
  const params = useParams()
  const bien = MANDATS.find(m => m.slug === params.slug)
  const [photoIdx, setPhotoIdx] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  if (!bien) return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center">
      <div className="text-center">
        <p className="font-display text-3xl text-white mb-4">Bien introuvable</p>
        <Link href="/#nosbiens" className="font-body text-brand-gold hover:underline">Retour aux biens</Link>
      </div>
    </div>
  )

  const badgeLabel = bien.categorie === 'en_vente' ? 'En vente' : bien.categorie === 'reserve' ? 'Réservé' : 'Vendu'
  const badgeColor = bien.categorie === 'en_vente' ? 'bg-brand-gold text-brand-dark' : bien.categorie === 'reserve' ? 'bg-amber-700/60 text-amber-200' : 'bg-green-800/60 text-green-200'

  return (
    <div className="min-h-screen bg-brand-dark pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Photo gallery */}
        {bien.photos.length > 0 ? (
          <div className="mb-12">
            {/* Main photo */}
            <div className="relative aspect-[16/9] bg-brand-card border border-brand-border overflow-hidden cursor-pointer mb-3" onClick={() => setLightbox(true)}>
              <img src={bien.photos[photoIdx]} alt={`${bien.titre} - Photo ${photoIdx + 1}`} className="object-cover w-full h-full" />
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1.5">
                <Camera size={14} className="text-white/80" />
                <span className="font-body text-sm text-white/80">{photoIdx + 1} / {bien.photos.length}</span>
              </div>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {bien.photos.map((p, i) => (
                <button key={i} onClick={() => setPhotoIdx(i)} className={`shrink-0 w-20 h-14 border overflow-hidden transition-all ${i === photoIdx ? 'border-brand-gold' : 'border-brand-border opacity-60 hover:opacity-100'}`}>
                  <img src={p} alt="" className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="aspect-[16/9] bg-brand-card border border-brand-border flex flex-col items-center justify-center gap-4 mb-12">
            <Camera size={48} className="text-brand-muted/20" />
            <p className="font-body text-sm tracking-widest uppercase text-brand-muted/40">Photos à venir</p>
          </div>
        )}

        {/* Details */}
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <span className={`px-3 py-1 font-body text-xs font-medium tracking-widest uppercase ${badgeColor}`}>{badgeLabel}</span>
              <p className="font-body text-sm tracking-widest uppercase text-brand-gold">{bien.lieu}</p>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-light text-white mb-6">{bien.titre}</h1>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="font-body text-lg text-brand-muted">CHF</span>
              <span className="font-display text-3xl text-brand-gold">{bien.prix}.-</span>
            </div>
            <div className="flex flex-wrap gap-6 mb-10 pb-10 border-b border-brand-border">
              {bien.pieces !== '-' && <div><p className="font-body text-xs tracking-widest uppercase text-brand-muted mb-1">Pièces</p><p className="font-display text-2xl text-white">{bien.pieces}</p></div>}
              {bien.surface !== '-' && <div><p className="font-body text-xs tracking-widest uppercase text-brand-muted mb-1">Surface</p><p className="font-display text-2xl text-white">{bien.surface}</p></div>}
              {bien.terrain !== '-' && <div><p className="font-body text-xs tracking-widest uppercase text-brand-muted mb-1">Terrain</p><p className="font-display text-2xl text-white">{bien.terrain}</p></div>}
            </div>
            <div className="font-body text-brand-text leading-relaxed text-lg whitespace-pre-line">{bien.description}</div>
          </div>

          {/* Sidebar contact */}
          <div>
            <div className="bg-brand-card border border-brand-border p-8 sticky top-24">
              <h3 className="font-display text-xl text-white mb-6">Intéressé par ce bien ?</h3>
              <p className="font-body text-sm text-brand-muted mb-8">Contactez-moi pour organiser une visite ou obtenir le dossier complet.</p>
              <div className="space-y-4">
                <a href="tel:+41799690191" className="flex items-center gap-3 w-full bg-brand-gold text-brand-dark px-6 py-4 font-body text-sm font-medium tracking-widest uppercase hover:bg-brand-goldLight transition-colors justify-center">
                  <Phone size={16} /> Appeler
                </a>
                <a href={`mailto:tpraet@golay-immobilier.ch?subject=Demande - ${bien.titre} ${bien.lieu}`} className="flex items-center gap-3 w-full border border-brand-border text-brand-text px-6 py-4 font-body text-sm tracking-widest uppercase hover:border-brand-gold hover:text-brand-gold transition-colors justify-center">
                  <Mail size={16} /> Écrire
                </a>
              </div>
              <div className="mt-8 pt-6 border-t border-brand-border">
                <p className="font-body text-xs text-brand-muted">Thomas Praet</p>
                <p className="font-body text-xs text-brand-muted">Golay Immobilier SA · Lausanne</p>
                <p className="font-body text-xs text-brand-muted">Certifié USPI</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setLightbox(false)}>
          <button className="absolute top-6 right-6 text-white/60 hover:text-white" onClick={() => setLightbox(false)}><X size={28} /></button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2" onClick={e => { e.stopPropagation(); setPhotoIdx(i => i > 0 ? i - 1 : bien.photos.length - 1) }}><ChevronLeft size={36} /></button>
          <img src={bien.photos[photoIdx]} alt="" className="max-h-[85vh] max-w-[90vw] object-contain" onClick={e => e.stopPropagation()} />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2" onClick={e => { e.stopPropagation(); setPhotoIdx(i => i < bien.photos.length - 1 ? i + 1 : 0) }}><ChevronRight size={36} /></button>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-body text-sm text-white/60">{photoIdx + 1} / {bien.photos.length}</p>
        </div>
      )}
    </div>
  )
}
