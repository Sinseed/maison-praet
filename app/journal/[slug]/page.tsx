import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Phone } from 'lucide-react'
import { ARTICLES } from '../../data'
import ArticleRenderer from '../../components/ArticleRenderer'

// ─── Static params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }))
}

// ─── Dynamic metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = ARTICLES.find(a => a.slug === slug)
  if (!article) return { title: 'Article introuvable | Maison Praet' }

  const title = `${article.titre} | Maison Praet`
  const description = article.chapeau.slice(0, 160)

  return {
    title,
    description,
    alternates: { canonical: `https://maisonpraet.ch/journal/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://maisonpraet.ch/journal/${slug}`,
      type: 'article',
      publishedTime: article.date,
      authors: ['Thomas Praet'],
      images: [{ url: 'https://maisonpraet.ch/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://maisonpraet.ch/og-image.jpg'],
    },
  }
}

// ─── Schema helpers ───────────────────────────────────────────────────────────
function extractFAQ(contenu: string): { question: string; answer: string }[] {
  const faq: { question: string; answer: string }[] = []
  const lines = contenu.split('\n')
  let i = 0
  while (i < lines.length) {
    if (lines[i].startsWith('## ') && lines[i].includes('?')) {
      const question = lines[i].slice(3).trim()
      const answerLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('## ') && lines[i].trim() !== '---') {
        if (lines[i].trim()) answerLines.push(lines[i].trim())
        i++
        if (answerLines.length >= 3) break
      }
      if (answerLines.length > 0) faq.push({ question, answer: answerLines.join(' ') })
    } else {
      i++
    }
  }
  return faq
}

// ─── Page (Server Component) ──────────────────────────────────────────────────
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = ARTICLES.find(a => a.slug === slug)

  if (!article) return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center">
      <div className="text-center">
        <p className="font-display text-3xl text-white mb-4">Article introuvable</p>
        <Link href="/journal" className="font-body text-brand-gold hover:underline">Retour au journal</Link>
      </div>
    </div>
  )

  const faqItems = extractFAQ(article.contenu)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.titre,
    description: article.chapeau,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: 'Thomas Praet',
      jobTitle: 'Courtier immobilier',
      url: 'https://maisonpraet.ch',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Maison Praet',
      url: 'https://maisonpraet.ch',
    },
    mainEntityOfPage: `https://maisonpraet.ch/journal/${article.slug}`,
  }

  const faqSchema = faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  } : null

  return (
    <div className="min-h-screen bg-brand-dark pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="font-body text-xs tracking-widest uppercase text-brand-gold">{article.categorie}</span>
          <span className="w-1 h-1 rounded-full bg-brand-border" />
          <span className="font-body text-xs text-brand-muted">
            {new Date(article.date).toLocaleDateString('fr-CH', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>

        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
          {article.titre}
        </h1>
        <p className="font-body text-lg text-brand-goldLight leading-relaxed mb-12 italic">
          {article.chapeau}
        </p>

        <ArticleRenderer contenu={article.contenu} />

        {/* CTA */}
        <div className="mt-16 bg-brand-card border border-brand-gold/20 p-8">
          <p className="font-body text-brand-text leading-relaxed mb-6">{article.cta}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+41799690191"
              className="btn-gold inline-flex items-center gap-3 bg-brand-gold text-brand-dark px-8 py-4 font-body text-sm font-medium tracking-widest uppercase hover:bg-brand-goldLight transition-colors justify-center"
            >
              <Phone size={16} /> +41 79 969 01 91
            </a>
            <a
              href="/#estimation"
              className="inline-flex items-center gap-3 border border-brand-border text-brand-text px-8 py-4 font-body text-sm tracking-widest uppercase hover:border-brand-gold hover:text-brand-gold transition-colors justify-center"
            >
              Demander une estimation
            </a>
          </div>
        </div>

        {/* Author */}
        <div className="mt-12 pt-8 border-t border-brand-border flex items-center gap-4">
          <div className="relative w-12 h-12 bg-brand-card border border-brand-border overflow-hidden">
            <Image src="/photos/portrait.jpg" alt="Thomas Praet" fill sizes="48px" className="object-cover object-top" />
          </div>
          <div>
            <p className="font-body text-sm text-white font-medium">Thomas Praet</p>
            <p className="font-body text-xs text-brand-muted">Courtier certifié USPI · Golay Immobilier</p>
          </div>
        </div>
      </article>
    </div>
  )
}
