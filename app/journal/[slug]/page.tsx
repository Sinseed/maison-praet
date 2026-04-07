'use client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Phone } from 'lucide-react'
import { ARTICLES } from '../../data'

export default function ArticlePage() {
  const params = useParams()
  const article = ARTICLES.find(a => a.slug === params.slug)

  if (!article) return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center">
      <div className="text-center">
        <p className="font-display text-3xl text-white mb-4">Article introuvable</p>
        <Link href="/journal" className="font-body text-brand-gold hover:underline">Retour au journal</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-brand-dark">
      <nav className="bg-brand-dark/95 backdrop-blur-md border-b border-brand-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-xl text-white">Maison <span className="text-brand-gold">Praet</span></Link>
          <Link href="/journal" className="flex items-center gap-2 font-body text-sm text-brand-muted hover:text-brand-gold transition-colors"><ArrowLeft size={16} /> Journal</Link>
        </div>
      </nav>
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="font-body text-xs tracking-widest uppercase text-brand-gold">{article.categorie}</span>
          <span className="w-1 h-1 rounded-full bg-brand-border" />
          <span className="font-body text-xs text-brand-muted">{new Date(article.date).toLocaleDateString('fr-CH', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">{article.titre}</h1>
        <p className="font-body text-lg text-brand-goldLight leading-relaxed mb-12 italic">{article.chapeau}</p>
        <div className="font-body text-brand-text leading-relaxed text-[17px] space-y-6">
          {article.contenu.split('\n\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-brand-card border border-brand-gold/20 p-8">
          <p className="font-body text-brand-text leading-relaxed mb-6">{article.cta}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="tel:+41799690191" className="inline-flex items-center gap-3 bg-brand-gold text-brand-dark px-8 py-4 font-body text-sm font-medium tracking-widest uppercase hover:bg-brand-goldLight transition-colors justify-center">
              <Phone size={16} /> +41 79 969 01 91
            </a>
            <a href="/#estimation" className="inline-flex items-center gap-3 border border-brand-border text-brand-text px-8 py-4 font-body text-sm tracking-widest uppercase hover:border-brand-gold hover:text-brand-gold transition-colors justify-center">
              Demander une estimation
            </a>
          </div>
        </div>

        {/* Author */}
        <div className="mt-12 pt-8 border-t border-brand-border flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-card border border-brand-border overflow-hidden">
            <img src="/photos/portrait.jpg" alt="Thomas Praet" className="object-cover object-top w-full h-full" />
          </div>
          <div>
            <p className="font-body text-sm text-white font-medium">Thomas Praet</p>
            <p className="font-body text-xs text-brand-muted">Courtier certifié USPI · Golay Immobilier SA</p>
          </div>
        </div>
      </article>
    </div>
  )
}
