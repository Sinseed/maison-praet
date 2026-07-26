'use client'
import { useRef, useState } from 'react'
import { Play } from 'lucide-react'

export default function BienVideo({
  src,
  poster,
  titre,
  duree = '20 secondes',
}: {
  src: string
  poster: string
  titre: string
  duree?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)

  const start = () => {
    setStarted(true)
    videoRef.current?.play()
  }

  return (
    <section className="mt-16 pt-16 border-t border-brand-border">
      <p className="font-body text-xs tracking-widest uppercase text-brand-gold mb-3">
        En vidéo
      </p>
      <h2 className="font-display text-2xl md:text-3xl font-light text-white mb-8">
        {titre} en {duree}
      </h2>

      <div className="relative w-full max-w-[340px] aspect-[9/16] bg-brand-card border border-brand-border overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload="none"
          playsInline
          controls={started}
          onEnded={() => setStarted(false)}
          className="w-full h-full object-cover"
        />

        {!started && (
          <button
            type="button"
            onClick={start}
            aria-label={`Lancer la vidéo de présentation : ${titre}`}
            className="absolute inset-0 flex items-center justify-center bg-brand-dark/30 hover:bg-brand-dark/10 transition-colors group"
          >
            <span className="flex items-center justify-center w-16 h-16 rounded-full border border-brand-gold/70 bg-brand-dark/50 backdrop-blur-sm group-hover:border-brand-gold group-hover:scale-105 transition-all">
              <Play size={22} className="text-brand-gold ml-1" fill="currentColor" />
            </span>
          </button>
        )}
      </div>
    </section>
  )
}
