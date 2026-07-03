import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Phone, Mail } from 'lucide-react'
import { MANDATS } from '../../data'
import BienGallery from '../../components/BienGallery'

// ─── Static params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return MANDATS.filter(m => m.photos.length > 0).map(m => ({ slug: m.slug }))
}

// ─── Dynamic metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const bien = MANDATS.find(m => m.slug === slug)
  if (!bien) return { title: 'Bien introuvable | Maison Praet' }

  const statut = bien.categorie === 'en_vente' ? 'En vente' : bien.categorie === 'reserve' ? 'Réservé' : 'Vendu'
  const desc = `${statut} – ${bien.titre} à ${bien.lieu}${bien.surface !== '-' ? `, ${bien.surface}` : ''}${bien.pieces !== '-' ? `, ${bien.pieces} pièces` : ''}. CHF ${bien.prix}.-. Courtier Thomas Praet, certifié USPI.`

  return {
    title: `${bien.titre} – ${bien.lieu} | Maison Praet`,
    description: desc,
    alternates: { canonical: `https://maisonpraet.ch/biens/${slug}` },
    openGraph: {
      title: `${bien.titre} – ${bien.lieu} | Maison Praet`,
      description: desc,
      url: `https://maisonpraet.ch/biens/${slug}`,
      ...(bien.photos[0] ? { images: [{ url: `https://maisonpraet.ch${bien.photos[0]}`, width: 1200, height: 800, alt: bien.titre }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${bien.titre} – ${bien.lieu} | Maison Praet`,
      description: desc,
      ...(bien.photos[0] ? { images: [`https://maisonpraet.ch${bien.photos[0]}`] } : {}),
    },
  }
}

// ─── Page (Server Component) ──────────────────────────────────────────────────
export default async function BienPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const bien = MANDATS.find(m => m.slug === slug)

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

  // Schema.org ListingItem
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: `${bien.titre} – ${bien.lieu}`,
    description: bien.description || `${bien.titre} à ${bien.lieu}`,
    url: `https://maisonpraet.ch/biens/${slug}`,
    ...(bien.photos[0] ? { image: `https://maisonpraet.ch${bien.photos[0]}` } : {}),
    offers: {
      '@type': 'Offer',
      price: bien.prix.replace(/'/g, ''),
      priceCurrency: 'CHF',
      availability: bien.categorie === 'vendu' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: bien.lieu,
      addressRegion: 'Vaud',
      addressCountry: 'CH',
    },
    seller: {
      '@type': 'RealEstateAgent',
      name: 'Thomas Praet',
      telephone: '+41799690191',
      url: 'https://maisonpraet.ch',
    },
  }

  return (
    <div className="min-h-screen bg-brand-dark pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <Link href="/#nosbiens" className="inline-flex items-center gap-2 font-body text-sm tracking-widest uppercase text-brand-muted hover:text-brand-gold transition-colors mb-8">
          <ArrowLeft size={16} /> Retour aux biens
        </Link>

        {/* Galerie photos – Client Component */}
        <BienGallery photos={bien.photos} titre={bien.titre} />

        {/* Détails */}
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
              {bien.composition
                ? <div><p className="font-body text-xs tracking-widest uppercase text-brand-muted mb-1">Composition</p><p className="font-display text-xl text-white">{bien.composition}</p></div>
                : bien.pieces !== '-' && <div><p className="font-body text-xs tracking-widest uppercase text-brand-muted mb-1">Pièces</p><p className="font-display text-2xl text-white">{bien.pieces}</p></div>
              }
              {bien.surface !== '-' && <div><p className="font-body text-xs tracking-widest uppercase text-brand-muted mb-1">Surface</p><p className="font-display text-2xl text-white">{bien.surface}</p></div>}
              {bien.terrain !== '-' && <div><p className="font-body text-xs tracking-widest uppercase text-brand-muted mb-1">{bien.composition ? 'Parcelle' : 'Terrain'}</p><p className="font-display text-2xl text-white">{bien.terrain}</p></div>}
              {bien.rendement && <div><p className="font-body text-xs tracking-widest uppercase text-brand-muted mb-1">Rendement</p><p className="font-display text-2xl text-white">{bien.rendement}</p></div>}
            </div>
            <div className="font-body text-brand-text leading-relaxed text-lg whitespace-pre-line">{bien.description}</div>
          </div>

          {/* Sidebar contact */}
          <div>
            <div className="bg-brand-card border border-brand-border p-8 sticky top-24">
              {bien.categorie === 'vendu' ? (
                <>
                  <h3 className="font-display text-xl text-white mb-6">Vous possédez un bien similaire ?</h3>
                  <p className="font-body text-sm text-brand-muted mb-8">Découvrez sa valeur sur le marché actuel. Estimation professionnelle, fondée et sans engagement.</p>
                  <div className="space-y-4">
                    <a href="tel:+41799690191" className="btn-gold flex items-center gap-3 w-full bg-brand-gold text-brand-dark px-6 py-4 font-body text-sm font-medium tracking-widest uppercase hover:bg-brand-goldLight transition-colors justify-center">
                      <Phone size={16} /> Appeler
                    </a>
                    <a href="/#estimation" className="flex items-center gap-3 w-full border border-brand-border text-brand-text px-6 py-4 font-body text-sm tracking-widest uppercase hover:border-brand-gold hover:text-brand-gold transition-colors justify-center">
                      Demander une estimation
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="font-display text-xl text-white mb-6">Intéressé par ce bien ?</h3>
                  <p className="font-body text-sm text-brand-muted mb-8">Contactez-moi pour organiser une visite ou obtenir le dossier complet.</p>
                  <div className="space-y-4">
                    <a href="tel:+41799690191" className="btn-gold flex items-center gap-3 w-full bg-brand-gold text-brand-dark px-6 py-4 font-body text-sm font-medium tracking-widest uppercase hover:bg-brand-goldLight transition-colors justify-center">
                      <Phone size={16} /> Appeler
                    </a>
                    <a href={`mailto:tpraet@golay-immobilier.ch?subject=Demande - ${bien.titre} ${bien.lieu}`} className="flex items-center gap-3 w-full border border-brand-border text-brand-text px-6 py-4 font-body text-sm tracking-widest uppercase hover:border-brand-gold hover:text-brand-gold transition-colors justify-center">
                      <Mail size={16} /> Écrire
                    </a>
                  </div>
                </>
              )}
              <div className="mt-8 pt-6 border-t border-brand-border">
                <p className="font-body text-xs text-brand-muted">Thomas Praet</p>
                <p className="font-body text-xs text-brand-muted">Golay Immobilier SA · Lausanne</p>
                <p className="font-body text-xs text-brand-muted">Certifié USPI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
