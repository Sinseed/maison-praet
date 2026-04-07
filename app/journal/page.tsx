import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ARTICLES } from '../data'

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-24">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="font-body text-sm tracking-[0.3em] uppercase text-brand-gold mb-4">Journal</p>
        <h1 className="font-display text-4xl md:text-5xl font-light text-white mb-4">Conseils & <span className="italic text-brand-gold">analyses</span></h1>
        <p className="font-body text-brand-muted mb-16 max-w-2xl">Marché immobilier vaudois, conseils vendeurs, guides pratiques. Des articles concrets pour prendre les bonnes décisions.</p>
        <div className="space-y-8">
          {ARTICLES.map(a => (
            <Link href={`/journal/${a.slug}`} key={a.slug} className="group block bg-brand-card border border-brand-border p-8 hover:border-brand-gold/30 transition-all duration-500">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-body text-xs tracking-widest uppercase text-brand-gold">{a.categorie}</span>
                <span className="w-1 h-1 rounded-full bg-brand-border" />
                <span className="font-body text-xs text-brand-muted">{new Date(a.date).toLocaleDateString('fr-CH', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <h2 className="font-display text-2xl text-white mb-3 group-hover:text-brand-gold transition-colors">{a.titre}</h2>
              <p className="font-body text-brand-muted leading-relaxed mb-4">{a.chapeau}</p>
              <div className="flex items-center gap-2 font-body text-sm text-brand-gold"><span>Lire</span><ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
