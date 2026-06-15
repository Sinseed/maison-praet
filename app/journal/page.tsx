import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ARTICLES } from '../data'

export default function JournalPage() {
  const sorted = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date))
  const guides = sorted.filter(a => a.categorie !== 'Coulisses')
  const coulisses = sorted.filter(a => a.categorie === 'Coulisses')

  const ArticleCard = ({ a }: { a: typeof ARTICLES[0] }) => (
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
  )

  return (
    <div className="min-h-screen bg-brand-dark pt-24">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="font-body text-sm tracking-[0.3em] uppercase text-brand-gold mb-4">Journal</p>
        <h1 className="font-display text-4xl md:text-5xl font-light text-white mb-4">Entre <span className="italic text-brand-gold">deux mandats.</span></h1>
        <p className="font-body text-brand-muted mb-20 max-w-2xl">Marché immobilier vaudois, conseils pratiques et coulisses du terrain. Des articles concrets pour prendre les bonnes décisions.</p>

        {/* ── COULISSES ── */}
        {coulisses.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-2">
              <h2 className="font-display text-2xl md:text-3xl font-light text-white">Coulisses <span className="italic text-brand-gold">& transactions</span></h2>
            </div>
            <p className="font-body text-sm text-brand-muted mb-8">Ce que les plateformes ne montrent pas. Des vraies transactions, des vraies décisions.</p>
            <div className="space-y-6">
              {coulisses.map(a => <ArticleCard key={a.slug} a={a} />)}
            </div>
          </div>
        )}

        {/* Séparateur */}
        <div className="flex items-center gap-4 mb-20">
          <div className="flex-1 h-px bg-brand-border" />
          <span className="font-body text-xs tracking-widest uppercase text-brand-muted px-2">Guides & expertise</span>
          <div className="flex-1 h-px bg-brand-border" />
        </div>

        {/* ── GUIDES ── */}
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="font-display text-2xl md:text-3xl font-light text-white">Guides <span className="italic text-brand-gold">& conseils</span></h2>
          </div>
          <p className="font-body text-sm text-brand-muted mb-8">Fiscalité, financement, juridique, marché. Tout ce qu'il faut savoir avant de vendre ou d'acheter dans le canton de Vaud.</p>
          <div className="space-y-6">
            {guides.map(a => <ArticleCard key={a.slug} a={a} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
