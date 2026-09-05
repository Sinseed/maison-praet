import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Phone, Mail, ArrowRight } from 'lucide-react'
import Reveal from './Reveal'
import Eyebrow from './Eyebrow'
import BadgeBien from './BadgeBien'
import PrixBien from './PrixBien'
import { MANDATS } from '../data'
import type { Mandat } from '../data'
import type { LandingSEO } from '../courtier/landing-seo'

// Rendu inline minimal : liens internes [texte](/lien)
function inline(text: string, keyBase: number) {
  const parts: React.ReactNode[] = []
  const regex = /\[([^\]]+)\]\((\/[^)\s]+)\)/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    parts.push(
      <Link key={`${keyBase}-${m.index}`} href={m[2]} className="text-brand-gold underline decoration-brand-gold/40 underline-offset-4 hover:decoration-brand-gold transition-colors">
        {m[1]}
      </Link>
    )
    last = regex.lastIndex
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts.length > 0 ? parts : [text]
}

// Helpers données structurées
const toNumber = (s: string) => { const n = parseInt(s.replace(/[^\d]/g, ''), 10); return isNaN(n) || n === 0 ? undefined : n }
const typeSchema = (m: Mandat) => {
  const t = m.titre.toLowerCase()
  if (t.startsWith('immeuble')) return 'ApartmentComplex'
  if (t.includes('appartement') || t.includes('ppe') || t.includes('attique')) return 'Apartment'
  if (t.includes('terrain') || t.includes('bien-fonds')) return 'Place'
  return 'House'
}
const bienItem = (m: Mandat) => ({
  '@type': typeSchema(m),
  name: `${m.titre} à ${m.lieu}`,
  url: `https://maisonpraet.ch/biens/${m.slug}`,
  ...(m.pieces !== '-' ? { numberOfRoomsTotal: m.pieces } : {}),
  ...(toNumber(m.surface) ? { floorSize: { '@type': 'QuantitativeValue', value: toNumber(m.surface), unitCode: 'MTK' } } : {}),
  address: { '@type': 'PostalAddress', addressLocality: m.lieu, addressRegion: 'Vaud', addressCountry: 'CH' },
  ...(toNumber(m.prix) ? { offers: { '@type': 'Offer', price: toNumber(m.prix), priceCurrency: 'CHF', availability: m.categorie === 'vendu' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock' } } : {}),
})

export default function SeoLanding({ landing: l }: { landing: LandingSEO }) {
  const transactions = MANDATS.filter(l.filtre)
  const transactionsAffichees = transactions.slice(0, 6)
  const h1Plain = `${l.h1Line1} ${l.h1Line2}`

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: l.serviceType,
    name: h1Plain,
    url: `https://maisonpraet.ch/${l.slug}`,
    provider: { '@type': 'RealEstateAgent', '@id': 'https://maisonpraet.ch/#agent', name: 'Maison Praet' },
    areaServed: { '@type': l.areaType, name: l.areaName },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `https://maisonpraet.ch/${l.slug}`,
      servicePhone: '+41799690191',
    },
  }

  const faqSchema = l.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: l.faq.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null

  const itemListSchema = transactions.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${l.transactionsTitre} – Thomas Praet`,
    numberOfItems: transactions.length,
    itemListElement: transactions.map((m, i) => ({ '@type': 'ListItem', position: i + 1, item: bienItem(m) })),
  } : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://maisonpraet.ch' },
      { '@type': 'ListItem', position: 2, name: h1Plain, item: `https://maisonpraet.ch/${l.slug}` },
    ],
  }

  return (
    <div className="min-h-screen bg-brand-dark pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      {itemListSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-brand-muted hover:text-brand-gold transition-colors mb-10">
          <ArrowLeft size={14} /> Maison Praet
        </Link>

        <Eyebrow className="mb-4">{l.eyebrow}</Eyebrow>
        <h1 className="font-display text-4xl md:text-6xl font-light text-white leading-tight mb-6">
          {l.h1Line1}<br />
          <span className="italic text-brand-gold">{l.h1Line2}</span>
        </h1>
        <p className="font-body text-lg text-brand-muted leading-relaxed max-w-2xl mb-12">
          {l.intro}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/estimation" className="btn-gold group inline-flex items-center gap-3 bg-brand-gold text-brand-dark px-8 py-4 font-body text-sm font-medium tracking-widest uppercase hover:bg-brand-goldLight transition-colors justify-center">
            Estimer mon bien <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="tel:+41799690191" className="inline-flex items-center gap-3 border border-brand-border text-brand-text px-8 py-4 font-body text-sm tracking-widest uppercase hover:border-brand-gold hover:text-brand-gold transition-colors justify-center">
            <Phone size={14} /> 079 969 01 91
          </a>
        </div>
      </div>

      {/* Sections argumentaires */}
      {l.sections.map((s, si) => (
        <div key={si} className={`border-t border-brand-border ${si % 2 === 1 ? 'bg-brand-card/30' : ''}`}>
          <div className="max-w-4xl mx-auto px-6 py-16">
            <h2 className="font-display text-2xl md:text-3xl font-light text-white mb-6">{s.titre}</h2>
            <div className="space-y-4 max-w-2xl">
              {s.corps.map((p, pi) => (
                <p key={pi} className="font-body text-brand-text leading-relaxed text-[17px]">{inline(p, si * 100 + pi)}</p>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Transactions réelles (chaîne factuelle) */}
      {transactionsAffichees.length > 0 && (
        <div className="border-t border-brand-border">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <Eyebrow className="mb-4">Preuve par les faits</Eyebrow>
            <h2 className="font-display text-3xl font-light text-white mb-4">{l.transactionsTitre}</h2>
            <p className="font-body text-brand-text leading-relaxed text-[17px] mb-10 max-w-2xl">{l.transactionsIntro}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {transactionsAffichees.map((m, i) => {
                const carac = [m.pieces !== '-' ? `${m.pieces} pièces` : null, m.surface !== '-' ? m.surface : null].filter(Boolean).join(' · ')
                return (
                  <Reveal key={m.id} as={Link} href={`/biens/${m.slug}`} delay={i * 90} className="card-luxe group bg-brand-dark border border-brand-border overflow-hidden hover:border-brand-gold/30 hover:-translate-y-1 transition-all duration-500 block">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={m.photos[0]} alt={`${m.titre} à ${m.lieu}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-3 right-3">
                        <BadgeBien categorie={m.categorie} taille="sm" />
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg text-white mb-1">{m.titre}</h3>
                      {carac && <p className="font-body text-xs text-brand-muted mb-2">{carac}</p>}
                      <PrixBien prix={m.prix} taille="sm" couleur="or" />
                    </div>
                  </Reveal>
                )
              })}
            </div>
            <div className="mt-8">
              <Link href="/track-record" className="inline-flex items-center gap-2 font-body text-sm text-brand-gold hover:text-brand-goldLight transition-colors">
                Voir tout mon track record <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Communes de la région (maillage interne) */}
      {l.communes && l.communes.length > 0 && (
        <div className="border-t border-brand-border bg-brand-card/30">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <Eyebrow className="mb-4">Communes couvertes</Eyebrow>
            <h2 className="font-display text-3xl font-light text-white mb-8">
              Ma présence <span className="italic text-brand-gold">à {l.areaName}</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              {l.communes.map(c => (
                <Link key={c.slug} href={`/courtier/${c.slug}`} className="font-body text-sm text-brand-text border border-brand-border px-4 py-2 hover:border-brand-gold hover:text-brand-gold transition-colors">
                  {c.nom}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FAQ */}
      {l.faq.length > 0 && (
        <div className="border-t border-brand-border">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <Eyebrow className="mb-4">Questions fréquentes</Eyebrow>
            <h2 className="font-display text-3xl font-light text-white mb-10">
              Ce qu'on me <span className="italic text-brand-gold">demande souvent</span>
            </h2>
            <div className="space-y-8 max-w-2xl">
              {l.faq.map((f, i) => (
                <div key={i}>
                  <h3 className="font-display text-xl text-white mb-2">{f.q}</h3>
                  <p className="font-body text-brand-text leading-relaxed text-[17px]">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA estimation */}
      <div className="border-t border-brand-border bg-brand-card/50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Eyebrow className="mb-4">Estimation gratuite</Eyebrow>
              <h2 className="font-display text-3xl font-light text-white mb-4">
                Parlons de <span className="italic text-brand-gold">votre projet</span>
              </h2>
              <p className="font-body text-brand-muted leading-relaxed">
                Rapport PDF en 48h, fondé sur les données réelles du marché vaudois. Sans engagement.
              </p>
            </div>
            <div className="space-y-4">
              <Link href="/estimation" className="btn-gold group inline-flex items-center gap-3 bg-brand-gold text-brand-dark px-8 py-4 font-body text-sm font-medium tracking-widest uppercase hover:bg-brand-goldLight transition-colors w-full justify-center">
                Demander une estimation <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="tel:+41799690191" className="inline-flex items-center gap-3 border border-brand-border text-brand-text px-8 py-4 font-body text-sm tracking-widest uppercase hover:border-brand-gold hover:text-brand-gold transition-colors w-full justify-center">
                <Phone size={14} /> 079 969 01 91
              </a>
              <a href="mailto:tpraet@golay-immobilier.ch" className="inline-flex items-center gap-3 border border-brand-border text-brand-text px-8 py-4 font-body text-sm hover:border-brand-gold hover:text-brand-gold transition-colors w-full justify-center">
                <Mail size={14} className="shrink-0" /> <span className="lowercase tracking-normal break-all">tpraet@golay-immobilier.ch</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Signature */}
      <div className="border-t border-brand-border">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="font-body text-xs text-brand-muted text-center">
            Thomas Praet, courtier immobilier à Lausanne · Certifié USPI · Golay Immobilier SA, Grand-Chêne 2, 1003 Lausanne · 079 969 01 91 · tpraet@golay-immobilier.ch
          </p>
        </div>
      </div>
    </div>
  )
}
