import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Home, Calculator, FileSignature, Megaphone, Users, Handshake, Key } from 'lucide-react'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'

export const metadata: Metadata = {
  title: 'Ma méthode | Maison Praet',
  description: "La méthode complète de Thomas Praet pour vendre votre bien immobilier dans le canton de Vaud : du premier rendez-vous à la signature chez le notaire. 7 étapes, un seul interlocuteur.",
  openGraph: {
    title: 'Ma méthode de courtage | Maison Praet',
    description: "Du premier rendez-vous à la signature chez le notaire. La méthode complète, en 7 étapes claires.",
    type: 'website',
    locale: 'fr_CH',
    url: 'https://maisonpraet.ch/methode',
  },
  alternates: { canonical: 'https://maisonpraet.ch/methode' },
}

const ETAPES = [
  {
    num: '01',
    icon: Home,
    titre: 'Le premier rendez-vous',
    desc: "Tout commence par une rencontre sur place. Pas d'estimation à distance, pas de Google Maps : je dois voir votre bien, sentir l'ambiance, comprendre votre projet. Nous discutons ensemble de votre calendrier, de vos contraintes, de vos attentes. À ce stade, vous ne vous engagez à rien.",
    valeur: 'Je viens vous voir avant que vous décidiez quoi que ce soit.',
  },
  {
    num: '02',
    icon: Calculator,
    titre: "L'estimation fondée",
    desc: "Je vous remets un rapport écrit basé sur trois méthodes croisées (valeur intrinsèque, valeur vénale, et le cas échéant valeur de rendement), des comparables réels que j'ai vendus dans votre quartier, et une analyse à jour du marché vaudois. Si le prix que vous espérez n'est pas atteignable, je vous le dis avant de signer.",
    valeur: "Un prix juste, pas un prix flatteur pour décrocher le mandat.",
  },
  {
    num: '03',
    icon: FileSignature,
    titre: 'Le mandat exclusif',
    desc: "Si vous décidez de me confier votre bien, nous signons un mandat clair : prix de vente fixé ensemble, durée du mandat, conditions de commission. Tout est explicite, sans clauses obscures. Je travaille en exclusivité parce que c'est le format qui me permet d'investir réellement dans la commercialisation.",
    valeur: "Pas de petits caractères. Vous savez exactement ce que vous signez.",
  },
  {
    num: '04',
    icon: Megaphone,
    titre: 'La commercialisation',
    desc: "Reportage photo réalisé sur place, descriptif rédigé avec soin, prises de vue par drone quand le bien le justifie. Diffusion immédiate sur les portails majeurs (Immoscout24, Homegate, SMG) et sur ce site. Mise en avant via mon réseau et mes contacts personnels. La visibilité est maximale dès le premier jour.",
    valeur: "Je prends les photos moi-même. Je connais le bien mieux qu'un photographe extérieur.",
  },
  {
    num: '05',
    icon: Users,
    titre: 'Les visites',
    desc: "J'ouvre largement les visites. Le sérieux d'un acquéreur ne se reconnaît pas au téléphone : il se révèle dans le processus, à la visite, dans les questions posées, à l'offre, lors de la vérification du financement. Filtrer trop tôt, c'est passer à côté de profils solides. Après chaque visite, vous recevez un retour : impressions, questions, niveau d'intérêt, suite envisagée.",
    valeur: "Le bon acquéreur sort de la masse. Pas l'inverse.",
  },
  {
    num: '06',
    icon: Handshake,
    titre: 'La négociation',
    desc: "Quand une offre arrive, je vous accompagne dans son analyse : prix, conditions, profil financier de l'acquéreur, capacité d'obtenir son financement bancaire. Nous décidons ensemble de la suite. Si une négociation s'engage, je la mène avec fermeté pour vos intérêts, et avec le tact nécessaire pour qu'elle aboutisse.",
    valeur: "Je négocie pour vous, pas pour conclure à tout prix.",
  },
  {
    num: '07',
    icon: Key,
    titre: 'La signature chez le notaire',
    desc: "Je coordonne l'ensemble du dossier avec le notaire, les banques, les administrations cantonales. Préparation de l'acte, transmission des pièces, suivi des conditions suspensives le cas échéant. Vous arrivez à la signature en sachant que chaque détail a été vérifié.",
    valeur: "Un seul interlocuteur, du premier rendez-vous à la remise des clés.",
  },
]

export default function MethodePage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      {/* HERO */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 max-w-7xl mx-auto px-6">
        <Eyebrow className="mb-6">Ma méthode</Eyebrow>
        <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-[1.05] mb-8 max-w-4xl">
          Du premier rendez-vous<br /><span className="italic text-brand-gold">à la remise des clés.</span>
        </h1>
        <p className="font-body text-lg text-brand-text leading-relaxed max-w-2xl">
          Vendre un bien immobilier ne se résume pas à mettre une annonce en ligne. Voici comment je travaille concrètement, étape par étape, sans raccourci ni zone d'ombre.
        </p>
      </section>

      {/* TIMELINE */}
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="relative">
          {/* Ligne verticale */}
          <div className="absolute left-6 md:left-10 top-8 bottom-8 w-px bg-brand-border" aria-hidden />

          <div className="space-y-16 md:space-y-20">
            {ETAPES.map((e, i) => {
              const Icon = e.icon
              return (
                <Reveal key={e.num} as="div" className="relative pl-20 md:pl-28">
                  {/* Cercle de l'étape */}
                  <div className="absolute left-0 top-0 w-12 h-12 md:w-20 md:h-20 rounded-full bg-brand-card border border-brand-gold/40 flex items-center justify-center">
                    <Icon size={20} className="text-brand-gold md:hidden" />
                    <Icon size={28} className="text-brand-gold hidden md:block" />
                  </div>

                  <div>
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="font-display text-2xl md:text-3xl text-brand-gold/60 font-light">{e.num}</span>
                      <h2 className="font-display text-2xl md:text-3xl font-light text-white leading-tight">{e.titre}</h2>
                    </div>
                    <p className="font-body text-brand-text leading-relaxed mb-4">{e.desc}</p>
                    <p className="font-body text-brand-gold italic text-sm md:text-base border-l-2 border-brand-gold/40 pl-4">
                      {e.valeur}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-card/50 border-y border-brand-border">
        <Reveal className="max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          <Eyebrow className="mb-4">Et maintenant ?</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-8 leading-tight">
            Commençons par<br /><span className="italic text-brand-gold">l'étape 01.</span>
          </h2>
          <p className="font-body text-brand-text leading-relaxed mb-10 max-w-xl mx-auto">
            Si vous envisagez de vendre, le premier rendez-vous est gratuit, sans engagement, et toujours sur place. Vous ne perdez rien à m'inviter à venir voir.
          </p>
          <Link
            href="/#estimation"
            className="btn-gold group inline-flex items-center gap-3 bg-brand-gold text-brand-dark px-8 py-4 font-body text-sm font-medium tracking-widest uppercase hover:bg-brand-goldLight transition-all duration-300"
          >
            Prendre rendez-vous
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </Reveal>
      </section>
    </div>
  )
}
