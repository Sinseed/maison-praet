import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Phone, Mail } from 'lucide-react'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'

export const metadata: Metadata = {
  title: 'À propos de Thomas Praet – Courtier immobilier à Lausanne | Maison Praet',
  description: "Thomas Praet, courtier diplômé USPI chez Golay Immobilier SA à Lausanne. Plus de 90 transactions depuis 2020, 39 communes couvertes sur l'arc lémanique et le canton de Vaud.",
  alternates: { canonical: 'https://maisonpraet.ch/a-propos' },
  openGraph: {
    title: 'Thomas Praet – Courtier immobilier à Lausanne',
    description: "Courtier diplômé USPI, plus de 90 transactions depuis 2020. Arc lémanique et canton de Vaud.",
    url: 'https://maisonpraet.ch/a-propos',
    images: [{ url: 'https://maisonpraet.ch/photos/portrait.jpg', width: 800, height: 1000, alt: 'Thomas Praet' }],
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Thomas Praet',
  jobTitle: 'Courtier immobilier diplômé USPI',
  url: 'https://maisonpraet.ch',
  image: 'https://maisonpraet.ch/photos/portrait.jpg',
  telephone: '+41799690191',
  email: 'tpraet@golay-immobilier.ch',
  worksFor: {
    '@type': 'Organization',
    name: 'Golay Immobilier SA',
    url: 'https://www.golay-immobilier.ch',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Grand-Chêne 2',
      postalCode: '1003',
      addressLocality: 'Lausanne',
      addressRegion: 'Vaud',
      addressCountry: 'CH',
    },
  },
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'professional license',
    name: 'Courtier diplômé USPI',
    recognizedBy: { '@type': 'Organization', name: 'USPI Vaud' },
  },
  knowsAbout: [
    'Estimation immobilière canton de Vaud',
    'Vente immobilière résidentielle',
    'Immeubles de rendement',
    'Marché immobilier arc lémanique',
    'PPE et propriété par étages',
    'Mandats exclusifs de courtage',
    'CECB et performance énergétique',
    'LPPPL et zones de pénurie',
    'Impôt sur le gain immobilier Vaud',
  ],
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Canton de Vaud' },
    { '@type': 'City', name: 'Lausanne' },
    { '@type': 'City', name: 'Morges' },
    { '@type': 'City', name: 'Pully' },
    { '@type': 'City', name: 'Gland' },
    { '@type': 'City', name: 'Nyon' },
    { '@type': 'City', name: 'Yverdon-les-Bains' },
  ],
  sameAs: ['https://ch.linkedin.com/in/thomas-praet', 'https://maisonpraet.ch'],
}

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <Eyebrow className="mb-4">Maison Praet</Eyebrow>
        <h1 className="font-display text-4xl md:text-6xl font-light text-white leading-tight mb-8">
          Thomas <span className="italic text-brand-gold">Praet</span>
        </h1>
        <p className="font-body text-lg text-brand-muted leading-relaxed max-w-2xl">
          Courtier immobilier diplômé USPI, actif depuis 2020 sur l'arc lémanique et le canton de Vaud. Plus de 90 transactions documentées, 39 communes couvertes, un seul interlocuteur du premier rendez-vous à la signature chez le notaire.
        </p>
      </div>

      <div className="border-t border-brand-border">
        <Reveal className="max-w-4xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16 items-start">
          <div className="relative aspect-[3/4] bg-brand-card border border-brand-border overflow-hidden">
            <Image src="/photos/thomas-terrain.jpg" alt="Thomas Praet, courtier immobilier à Lausanne" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-bottom" />
          </div>
          <div className="space-y-10">
            <div>
              <Eyebrow className="mb-6">En chiffres</Eyebrow>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: '90+', label: 'Transactions depuis 2020' },
                  { val: '39', label: 'Communes couvertes' },
                  { val: '96.8%', label: 'Vendus au prix estimé' },
                  { val: 'CHF 107M', label: 'Volume sous mandat' },
                ].map(s => (
                  <div key={s.label} className="border border-brand-border p-4">
                    <p className="font-display text-2xl text-brand-gold">{s.val}</p>
                    <p className="font-body text-xs text-brand-muted mt-1 leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Eyebrow className="mb-3">Accréditation</Eyebrow>
              <p className="font-body text-brand-muted text-sm leading-relaxed">Courtier diplômé USPI — Union Suisse des Professionnels de l'Immobilier. Formation reconnue, exercice réglementé, responsabilité civile professionnelle.</p>
            </div>
            <div>
              <Eyebrow className="mb-3">Employeur</Eyebrow>
              <p className="font-body text-brand-muted text-sm leading-relaxed">Golay Immobilier SA · Grand-Chêne 2 · 1003 Lausanne. L&apos;une des plus anciennes régies de la place lausannoise.</p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="border-t border-brand-border bg-brand-card/30">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <Eyebrow className="mb-8">Parcours</Eyebrow>
          <div className="space-y-8">
            {[
              { periode: 'Depuis 2025', titre: 'Golay Immobilier SA — Lausanne', detail: "Courtier sous mandat. Spécialisation résidentielle et immeubles de rendement sur l'arc lémanique, le Gros-de-Vaud et La Côte." },
              { periode: '2020 – 2025', titre: 'Cogestim — Lausanne', detail: '15 à 20 transactions par an de 2021 à 2024. Développement d\'un réseau de notaires, géomètres et conseillers hypothécaires sur l\'ensemble du canton.' },
              { periode: 'Avant 2020', titre: 'Arrivée en Suisse', detail: 'Formé en Belgique, installé en Suisse en 2017. La formation USPI et l\'immersion dans le marché vaudois constituent le socle de ma pratique.' },
            ].map((e, i) => (
              <Reveal key={e.periode} as="div" delay={i * 100} className="grid md:grid-cols-4 gap-4 border-b border-brand-border pb-8">
                <p className="font-body text-xs tracking-widest uppercase text-brand-gold pt-1">{e.periode}</p>
                <div className="md:col-span-3">
                  <p className="font-body text-white font-medium mb-2">{e.titre}</p>
                  <p className="font-body text-brand-muted leading-relaxed text-sm">{e.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-brand-border">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <Eyebrow className="mb-8">Philosophie</Eyebrow>
          <div className="grid md:grid-cols-2 gap-10">
            {[
              { titre: 'Un prix juste, pas un prix flatteur', texte: "Je ne signe pas un mandat pour avoir signé un mandat. Si le prix espéré n'est pas atteignable, je le dis avant de signer, pas après trois mois de silence et une première baisse." },
              { titre: 'Un seul interlocuteur', texte: "Pas d'assistante, pas de call center. Du premier rendez-vous à la remise des clés, vous traitez avec moi. Votre bien n'est pas un dossier parmi d'autres." },
              { titre: "L'estimation comme outil de confiance", texte: "Mon estimation repose sur trois méthodes croisées et des données réelles du marché vaudois. Elle est remise par écrit, argumentée, et ne change pas entre la visite et la signature." },
              { titre: 'Le refus comme garantie', texte: "Je refuse des mandats. Un bien surestimé ne se vend pas, il se brûle. Et un bien brûlé coûte plus au vendeur que la commission qu'il espérait économiser." },
            ].map((p, i) => (
              <Reveal key={p.titre} as="div" delay={i * 90}>
                <h2 className="font-display text-xl font-light text-white mb-3">{p.titre}</h2>
                <p className="font-body text-brand-muted text-sm leading-relaxed">{p.texte}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-brand-border bg-brand-card/30">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <Eyebrow className="mb-4">Zone d'activité</Eyebrow>
          <h2 className="font-display text-3xl font-light text-white mb-6">Canton de Vaud <span className="italic text-brand-gold">& arc lémanique</span></h2>
          <p className="font-body text-brand-muted leading-relaxed mb-8 max-w-2xl text-sm">
            Actif principalement sur l'arc lémanique, le Gros-de-Vaud et le Lavaux. Interventions ponctuelles dans le canton de Fribourg sur recommandation.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Lausanne', 'Morges', 'Pully', 'Gland', 'Nyon', 'Yverdon-les-Bains', 'Lutry', 'Rolle', 'Epalinges', 'Le Mont-sur-Lausanne', 'Prilly', 'Crissier', 'Lavaux', 'Gros-de-Vaud', 'La Côte'].map(z => (
              <span key={z} className="font-body text-xs tracking-wider border border-brand-border text-brand-muted px-3 py-1.5">{z}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-brand-border">
        <Reveal className="max-w-4xl mx-auto px-6 py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <Eyebrow className="mb-3">Premier échange</Eyebrow>
            <h2 className="font-display text-3xl font-light text-white">Parlons de votre projet.</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="tel:+41799690191" className="btn-gold inline-flex items-center gap-3 bg-brand-gold text-brand-dark px-8 py-4 font-body text-sm font-medium tracking-widest uppercase hover:bg-brand-goldLight transition-colors justify-center">
              <Phone size={14} /> 079 969 01 91
            </a>
            <a href="mailto:tpraet@golay-immobilier.ch" className="inline-flex items-center gap-3 border border-brand-border text-brand-text px-8 py-4 font-body text-sm tracking-widest uppercase hover:border-brand-gold hover:text-brand-gold transition-colors justify-center">
              <Mail size={14} /> Email
            </a>
            <Link href="/estimation" className="inline-flex items-center gap-3 border border-brand-border text-brand-text px-8 py-4 font-body text-sm tracking-widest uppercase hover:border-brand-gold hover:text-brand-gold transition-colors justify-center">
              Estimation <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
