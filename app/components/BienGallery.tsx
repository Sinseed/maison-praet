'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, Camera } from 'lucide-react'

export default function BienGallery({ photos, titre }: { photos: string[], titre: string }) {
  const [photoIdx, setPhotoIdx] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const prev = () => setPhotoIdx(i => (i > 0 ? i - 1 : photos.length - 1))
  const next = () => setPhotoIdx(i => (i < photos.length - 1 ? i + 1 : 0))

  // Keyboard navigation when the lightbox is open
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false)
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, photos.length])

  if (photos.length === 0) {
    return (
      <div className="aspect-[16/9] bg-brand-card border border-brand-border flex flex-col items-center justify-center gap-4 mb-12">
        <Camera size={48} className="text-brand-muted/20" />
        <p className="font-body text-sm tracking-widest uppercase text-brand-muted/40">Photos à venir</p>
      </div>
    )
  }

  return (
    <>
      <div className="mb-12">
        <div
          className="relative aspect-[16/9] bg-brand-card border border-brand-border overflow-hidden cursor-pointer mb-3"
          onClick={() => setLightbox(true)}
        >
          <Image src={photos[photoIdx]} alt={`${titre} - Photo ${photoIdx + 1}`} fill priority sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1.5">
            <Camera size={14} className="text-white/80" />
            <span className="font-body text-sm text-white/80">{photoIdx + 1} / {photos.length}</span>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {photos.map((p, i) => (
            <button
              key={i}
              onClick={() => setPhotoIdx(i)}
              className={`relative shrink-0 w-20 h-14 border overflow-hidden transition-all ${i === photoIdx ? 'border-brand-gold' : 'border-brand-border opacity-60 hover:opacity-100'}`}
            >
              <Image src={p} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setLightbox(false)}>
          <button className="absolute top-6 right-6 text-white/60 hover:text-white" onClick={() => setLightbox(false)}>
            <X size={28} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2"
            onClick={e => { e.stopPropagation(); prev() }}
          >
            <ChevronLeft size={36} />
          </button>
          <img
            src={photos[photoIdx]}
            alt=""
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2"
            onClick={e => { e.stopPropagation(); next() }}
          >
            <ChevronRight size={36} />
          </button>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-body text-sm text-white/60">
            {photoIdx + 1} / {photos.length}
          </p>
        </div>
      )}
    </>
  )
}
