import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Phone, Mail, ArrowRight } from 'lucide-react'
import Reveal from '../../components/Reveal'
import Eyebrow from '../../components/Eyebrow'
import BadgeBien from '../../components/BadgeBien'
import PrixBien from '../../components/PrixBien'
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

  // ── Transactions documentées dans cette commune (source unique : MANDATS) ──
  const dansCommune = MANDATS.filter(m => m.lieu.toLowerCase().includes(c.nom.toLowerCase()))
  // Biens publics = ceux qui ont une fiche détaillée (photos). Détails déjà
  // publics sur /biens/[slug], donc exposables ici sans enjeu de confidentialité.
  const biensCommune = dansCommune.filter(m => m.photos.length > 0)
  const biensAffiches = biensCommune.slice(0, 6)
  const ventesRealisees = biensCommune.filter(m => m.categorie === 'vendu').length
  // Total documenté : inclut l'historique confidentiel (compté, jamais détaillé,
  // conformément à la règle de la page track record).
  const totalDocumente = dansCommune.filter(m => m.photos.length > 0 || m.annee_vente).length
  const disponibles = biensCommune.filter(m => m.categorie === 'en_vente' || m.categorie === 'reserve')

  // Helpers pour les données structurées
  const toNumber = (s: string) => { const n = parseInt(s.replace(/[^\d]/g, ''), 10); return isNaN(n) || n === 0 ? undefined : n }
  const typeSchema = (m: typeof MANDATS[number]) => {
    const t = m.titre.toLowerCase()
    if (t.startsWith('immeuble')) return 'ApartmentComplex'
    if (t.includes('appartement') || t.includes('ppe') || t.includes('attique')) return 'Apartment'
    if (t.includes('terrain') || t.includes('bien-fonds')) return 'Place'
    return 'House'
  }
  const bienItem = (m: typeof MANDATS[number]) => ({
    '@type': typeSchema(m),
    name: `${m.titre} à ${m.lieu}`,
    url: `https://maisonpraet.ch/biens/${m.slug}`,
    ...(m.pieces !== '-' ? { numberOfRoomsTotal: m.pieces } : {}),
    ...(toNumber(m.surface) ? { floorSize: { '@type': 'QuantitativeValue', value: toNumber(m.surface), unitCode: 'MTK' } } : {}),
    address: { '@type': 'PostalAddress', addressLocality: m.lieu, addressRegion: 'Vaud', addressCountry: 'CH' },
    ...(toNumber(m.prix) ? { offers: { '@type': 'Offer', price: toNumber(m.prix), priceCurrency: 'CHF', availability: m.categorie === 'vendu' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock' } } : {}),
  })

  // Types de biens réellement traités dans la commune (dérivé de MANDATS),
  // avec lien vers les pages par type quand elle existe. Renforce la chaîne
  // factuelle commune <-> type de bien.
  const classifierType = (m: typeof MANDATS[number]): string => {
    const t = m.titre.toLowerCase()
    if (t.includes('promotion') || t.includes('ppe avenue') || (m.nb_lots && m.nb_lots > 1 && !t.startsWith('immeuble'))) return 'promotion'
    if (t.startsWith('immeuble')) return 'immeuble'
    if (t.includes('terrain') || t.includes('bien-fonds')) return 'terrain'
    if (t.startsWith('villa')) return 'villa'
    if (t.startsWith('maison') || t.includes('chalet') || t.includes('ferme')) return 'maison'
    if (t.includes('appartement') || t.includes('ppe')) return 'appartement'
    return 'maison'
  }
  const TYPE_LABELS: Record<string, { label: string; href?: string }> = {
    appartement: { label: 'Appartements', href: '/transactions/appartements' },
    villa: { label: 'Villas', href: '/transactions/villas' },
    maison: { label: 'Maisons', href: '/transactions/maisons' },
    immeuble: { label: 'Immeubles de rendement', href: '/vendre-immeuble-rendement-vaud' },
    promotion: { label: 'Promotions' },
    terrain: { label: 'Terrains' },
  }
  const ORDRE_TYPES = ['appartement', 'villa', 'maison', 'immeuble', 'promotion', 'terrain']
  const typesTraites = ORDRE_TYPES.filter(t => dansCommune.some(m => classifierType(m) === t))

  // Articles pertinents (on prend les 3 les plus récents)
  const articlesRecents = [...ARTICLES]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3)

  // Schema RealEstateAgent local, rattaché à l'entité principale, avec les
  // biens actuellement disponibles dans la commune (makesOffer).
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `https://maisonpraet.ch/courtier/${commune}#agent`,
    name: `Thomas Praet – Courtier immobilier à ${c.nom}`,
    description: `Courtier immobilier certifié USPI actif à ${c.nom} (${c.region}, canton de Vaud).${totalDocumente > 0 ? ` ${totalDocumente} bien${totalDocumente > 1 ? 's' : ''} traité${totalDocumente > 1 ? 's' : ''} à ${c.nom}.` : ''} Estimation, vente, conseil.`,
    url: `https://maisonpraet.ch/courtier/${commune}`,
    telephone: '+41799690191',
    email: 'tpraet@golay-immobilier.ch',
    parentOrganization: { '@type': 'RealEstateAgent', '@id': 'https://maisonpraet.ch/#agent', name: 'Maison Praet' },
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
    ...(disponibles.length > 0 ? {
      makesOffer: disponibles.map(m => ({
        '@type': 'Offer',
        ...(toNumber(m.prix) ? { price: toNumber(m.prix), priceCurrency: 'CHF' } : {}),
        availability: m.categorie === 'reserve' ? 'https://schema.org/PreOrder' : 'https://schema.org/InStock',
        itemOffered: bienItem(m),
      })),
    } : {}),
  }

  // ItemList : la chaîne factuelle des transactions publiques de la commune,
  // lisible par les moteurs de réponse (ChatGPT, Perplexity, Google AI Overviews).
  const transactionsSchema = biensCommune.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Transactions et biens immobiliers à ${c.nom} – Thomas Praet`,
    description: `Biens et transactions documentés par Thomas Praet, courtier immobilier, à ${c.nom} (canton de Vaud).`,
    numberOfItems: biensCommune.length,
    itemListElement: biensCommune.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: bienItem(m),
    })),
  } : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://maisonpraet.ch' },
      { '@type': 'ListItem', position: 2, name: `Courtier immobilier à ${c.nom}`, item: `https://maisonpraet.ch/courtier/${commune}` },
    ],
  }

  return (
    <div className="min-h-screen bg-brand-dark pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {transactionsSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(transactionsSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-brand-muted hover:text-brand-gold transition-colors mb-10">
          <ArrowLeft size={14} /> Maison Praet
        </Link>

        <Eyebrow className="mb-4">{c.region} · Canton de Vaud</Eyebrow>
        <h1 className="font-display text-4xl md:text-6xl font-light text-white leading-tight mb-6">
          Courtier immobilier<br />
          <span className="italic text-brand-gold">à {c.nom}</span>
        </h1>
        <p className="font-body text-lg text-brand-muted leading-relaxed max-w-2xl mb-12">
          Estimation, vente et conseil immobilier à {c.nom} et dans la région {c.region}. Thomas Praet, courtier certifié USPI, vous accompagne du premier rendez-vous à la signature chez le notaire.
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

      {/* Marché local */}
      <div className="border-t border-brand-border">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <Eyebrow className="mb-4">Marché immobilier</Eyebrow>
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
            <Eyebrow className="mb-4">Atout principal</Eyebrow>
            <h2 className="font-display text-2xl font-light text-white mb-4">Pourquoi {c.nom} ?</h2>
            <p className="font-body text-brand-text leading-relaxed">{c.pointFort}</p>
          </div>
          <div>
            <Eyebrow className="mb-4">Mon expérience à {c.nom}</Eyebrow>
            <h2 className="font-display text-2xl font-light text-white mb-4">Sur le terrain</h2>
            <p className="font-body text-brand-text leading-relaxed italic">{c.terrain}</p>
          </div>
        </div>
      </div>

      {/* Transactions & biens documentés dans la commune */}
      {totalDocumente > 0 && (
        <div className="border-t border-brand-border">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <Eyebrow className="mb-4">Track record local</Eyebrow>
            <h2 className="font-display text-3xl font-light text-white mb-4">
              Mes transactions à <span className="italic text-brand-gold">{c.nom}</span>
            </h2>
            <p className="font-body text-brand-text leading-relaxed text-[17px] mb-6 max-w-2xl">
              {totalDocumente} bien{totalDocumente > 1 ? 's' : ''} documenté{totalDocumente > 1 ? 's' : ''} à {c.nom}{ventesRealisees > 0 ? `, dont ${ventesRealisees} vente${ventesRealisees > 1 ? 's' : ''} récente${ventesRealisees > 1 ? 's' : ''} détaillée${ventesRealisees > 1 ? 's' : ''} ci-dessous` : ''}. Les transactions plus anciennes restent confidentielles par respect de mes clients, mais sont comptabilisées dans mon <Link href="/track-record" className="text-brand-gold underline decoration-brand-gold/40 underline-offset-4 hover:decoration-brand-gold">track record complet</Link>.
            </p>

            {typesTraites.length > 0 && (
              <div className="mb-10">
                <p className="font-body text-xs tracking-widest uppercase text-brand-muted mb-3">Types de biens traités à {c.nom}</p>
                <div className="flex flex-wrap gap-2">
                  {typesTraites.map(t => {
                    const info = TYPE_LABELS[t]
                    return info.href ? (
                      <Link key={t} href={info.href} className="font-body text-xs tracking-wide text-brand-gold border border-brand-gold/30 px-3 py-1.5 hover:bg-brand-gold/10 transition-colors">{info.label}</Link>
                    ) : (
                      <span key={t} className="font-body text-xs tracking-wide text-brand-muted border border-brand-border px-3 py-1.5">{info.label}</span>
                    )
                  })}
                </div>
              </div>
            )}

            {biensAffiches.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {biensAffiches.map((m, i) => {
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
            )}

            <div className="mt-8">
              <Link href="/track-record" className="inline-flex items-center gap-2 font-body text-sm text-brand-gold hover:text-brand-goldLight transition-colors">
                Voir tout mon track record <ArrowRight size={14} />
              </Link>
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
                Quelle est la valeur<br /><span className="italic text-brand-gold">de votre bien à {c.nom} ?</span>
              </h2>
              <p className="font-body text-brand-muted leading-relaxed">
                Rapport PDF en 48h. Fondé sur les données réelles du marché vaudois et les transactions récentes à {c.nom}. Sans engagement.
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

      {/* Articles récents */}
      <div className="border-t border-brand-border">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <Eyebrow className="mb-4">Ressources</Eyebrow>
          <h2 className="font-display text-3xl font-light text-white mb-10">
            Guides <span className="italic text-brand-gold">& conseils</span>
          </h2>
          <div className="space-y-4">
            {articlesRecents.map((a, i) => (
              <Reveal key={a.slug} as={Link} href={`/journal/${a.slug}`} delay={i * 80} className="card-luxe group flex items-start gap-6 p-6 bg-brand-card border border-brand-border hover:border-brand-gold/30 transition-all duration-300">
                <div className="flex-1">
                  <span className="font-body text-xs tracking-widest uppercase text-brand-gold">{a.categorie}</span>
                  <h3 className="font-display text-lg text-white mt-1 group-hover:text-brand-gold transition-colors">{a.titre}</h3>
                </div>
                <ArrowRight size={16} className="text-brand-gold shrink-0 mt-2 group-hover:translate-x-1 transition-transform" />
              </Reveal>
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
