import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Phone, Mail, ArrowRight } from 'lucide-react'
import { COMMUNES_SEO_ALL as COMMUNES_SEO } from '../communes-seo'
import { MANDATS, ARTICLES } from '../../data'

// ─── Static params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return COMMUNES_SEO.map(c => ({ commune: c.slug }))
}

// ─── Dynamic metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ commune: string }> }): Promise<Metadata> {
  const { commune } = await params
  const c = COMMUNES_SEO.find(x => x.slug === commune)
  if (!c) return { title: 'Courtier immobilier | Maison Praet' }

  const title = `Courtier immobilier à ${c.nom} – Estimation & Vente | Maison Praet`
  const description = `Thomas Praet, courtier certifié USPI, accompagne les vendeurs et acquéreurs à ${c.nom} (${c.region}). Estimation gratuite, mandat exclusif, vente au juste prix. ${c.prix.slice(0, 80)}`

  return {
    title,
    description,
    alternates: { canonical: `https://maisonpraet.ch/courtier/${commune}` },
    openGraph: {
      title,
      description,
      url: `https://maisonpraet.ch/courtier/${commune}`,
      images: [{ url: 'https://maisonpraet.ch/og-image.jpg', width: 1200, height: 630 }],
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function CommunePage({ params }: { params: Promise<{ commune: string }> }) {
  const { commune } = await params
  const c = COMMUNES_SEO.find(x => x.slug === commune)

  if (!c) return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center">
      <div className="text-center">
        <p className="font-display text-3xl text-white mb-4">Commune introuvable</p>
        <Link href="/" className="font-body text-brand-gold hover:underline">Retour à l'accueil</Link>
      </div>
    </div>
  )

  // Biens dans cette commune
  const biensCommune = MANDATS.filter(m =>
    m.lieu.toLowerCase().includes(c.nom.toLowerCase()) && m.photos.length > 0
  ).slice(0, 3)

  // Articles pertinents (on prend les 3 les plus récents)
  const articlesRecents = [...ARTICLES]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3)

  // Schema LocalBusiness
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: `Thomas Praet – Courtier immobilier à ${c.nom}`,
    description: `Courtier immobilier certifié USPI actif à ${c.nom} et dans la région ${c.region}. Estimation, vente, conseil.`,
    url: `https://maisonpraet.ch/courtier/${commune}`,
    telephone: '+41799690191',
    email: 'tpraet@golay-immobilier.ch',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Grand-Chêne 2',
      postalCode: '1003',
      addressLocality: 'Lausanne',
      addressRegion: 'Vaud',
      addressCountry: 'CH',
    },
    areaServed: {
      '@type': 'City',
      name: c.nom,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Canton de Vaud',
      },
    },
  }

  return (
    <div className="min-h-screen bg-brand-dark pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-brand-muted hover:text-brand-gold transition-colors mb-10">
          <ArrowLeft size={14} /> Maison Praet
        </Link>

        <p className="font-body text-xs tracking-[0.4em] uppercase text-brand-gold mb-4">{c.region} · Canton de Vaud</p>
        <h1 className="font-display text-4xl md:text-6xl font-light text-white leading-tight mb-6">
          Courtier immobilier<br />
          <span className="italic text-brand-gold">à {c.nom}</span>
        </h1>
        <p className="font-body text-lg text-brand-muted leading-relaxed max-w-2xl mb-12">
          Estimation, vente et conseil immobilier à {c.nom} et dans la région {c.region}. Thomas Praet, courtier certifié USPI, vous accompagne du premier rendez-vous à la signature chez le notaire.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/estimation" className="group inline-flex items-center gap-3 bg-brand-gold text-brand-dark px-8 py-4 font-body text-sm font-medium tracking-widest uppercase hover:bg-brand-goldLight transition-colors justify-center">
            Estimer mon bien <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="tel:+41799690191" className="inline-flex items-center gap-3 border border-brand-border text-brand-text px-8 py-4 font-body text-sm tracking-widest uppercase hover:border-brand-gold hover:text-brand-gold transition-colors justify-center">
            <Phone size={14} /> 079 969 01 91
          </a>
        </div>
      </div>

      {/* Marché local */}
      <div className="border-t border-brand-border">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-brand-gold mb-4">Marché immobilier</p>
          <h2 className="font-display text-3xl font-light text-white mb-8">
            {c.nom} en 2026
          </h2>
          <p className="font-body text-brand-text leading-relaxed text-[17px] mb-6">{c.marche}</p>
          <div className="bg-brand-card border border-brand-border p-6">
            <p className="font-body text-xs tracking-widest uppercase text-brand-gold mb-3">Fourchettes de prix observées</p>
            <p className="font-body text-brand-text leading-relaxed">{c.prix}</p>
          </div>
        </div>
      </div>

      {/* Point fort + terrain */}
      <div className="border-t border-brand-border bg-brand-card/30">
        <div className="max-w-4xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-brand-gold mb-4">Atout principal</p>
            <h2 className="font-display text-2xl font-light text-white mb-4">Pourquoi {c.nom} ?</h2>
            <p className="font-body text-brand-text leading-relaxed">{c.pointFort}</p>
          </div>
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-brand-gold mb-4">Mon expérience à {c.nom}</p>
            <h2 className="font-display text-2xl font-light text-white mb-4">Sur le terrain</h2>
            <p className="font-body text-brand-text leading-relaxed italic">{c.terrain}</p>
          </div>
        </div>
      </div>

      {/* Biens dans la commune */}
      {biensCommune.length > 0 && (
        <div className="border-t border-brand-border">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-brand-gold mb-4">Portefeuille</p>
            <h2 className="font-display text-3xl font-light text-white mb-10">
              Biens à <span className="italic text-brand-gold">{c.nom}</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {biensCommune.map(m => (
                <Link href={`/biens/${m.slug}`} key={m.id} className="group bg-brand-dark border border-brand-border overflow-hidden hover:border-brand-gold/30 transition-all duration-500 block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={m.photos[0]} alt={m.titre} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 font-body text-xs font-medium tracking-widest uppercase ${m.categorie === 'en_vente' ? 'bg-brand-gold text-brand-dark' : m.categorie === 'reserve' ? 'bg-amber-700/60 text-amber-200' : 'bg-green-800/60 text-green-200'}`}>
                        {m.categorie === 'en_vente' ? 'En vente' : m.categorie === 'reserve' ? 'Réservé' : 'Vendu'}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg text-white mb-1">{m.titre}</h3>
                    <p className="font-body text-sm text-brand-gold">CHF {m.prix}.-</p>
                  </div>
                </Link>
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
              <p className="font-body text-xs tracking-[0.3em] uppercase text-brand-gold mb-4">Estimation gratuite</p>
              <h2 className="font-display text-3xl font-light text-white mb-4">
                Quelle est la valeur<br /><span className="italic text-brand-gold">de votre bien à {c.nom} ?</span>
              </h2>
              <p className="font-body text-brand-muted leading-relaxed">
                Rapport PDF en 48h. Fondé sur les données réelles du marché vaudois et les transactions récentes à {c.nom}. Sans engagement.
              </p>
            </div>
            <div className="space-y-4">
              <Link href="/estimation" className="group inline-flex items-center gap-3 bg-brand-gold text-brand-dark px-8 py-4 font-body text-sm font-medium tracking-widest uppercase hover:bg-brand-goldLight transition-colors w-full justify-center">
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

      {/* Articles récents */}
      <div className="border-t border-brand-border">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-brand-gold mb-4">Ressources</p>
          <h2 className="font-display text-3xl font-light text-white mb-10">
            Guides <span className="italic text-brand-gold">& conseils</span>
          </h2>
          <div className="space-y-4">
            {articlesRecents.map(a => (
              <Link href={`/journal/${a.slug}`} key={a.slug} className="group flex items-start gap-6 p-6 bg-brand-card border border-brand-border hover:border-brand-gold/30 transition-all duration-300">
                <div className="flex-1">
                  <span className="font-body text-xs tracking-widest uppercase text-brand-gold">{a.categorie}</span>
                  <h3 className="font-display text-lg text-white mt-1 group-hover:text-brand-gold transition-colors">{a.titre}</h3>
                </div>
                <ArrowRight size={16} className="text-brand-gold shrink-0 mt-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/journal" className="inline-flex items-center gap-2 font-body text-sm text-brand-gold hover:text-brand-goldLight transition-colors">
              Tous les articles <ArrowRight size={14} />
            </Link>
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
