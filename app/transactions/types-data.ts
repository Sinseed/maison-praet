// Pages transactions par TYPE de bien (/transactions/[type]).
// Complètent le track record (page unique) par des URLs indexables et lisibles
// par les moteurs de réponse. Réutilisent le composant SeoLanding.
// NB : pas de page "immeubles de rendement" ici — elle ferait doublon avec
// /vendre-immeuble-rendement-vaud (cannibalisation). On évite.

import type { Mandat } from '../data'
import type { LandingSEO } from '../courtier/landing-seo'

type Typologie = 'appartement' | 'villa' | 'maison'

// Classificateur aligné sur celui de la page track record (source de vérité UX).
const classifier = (m: Mandat): string => {
  const t = m.titre.toLowerCase()
  if (t.includes('promotion') || t.includes('ppe avenue') || (m.nb_lots && m.nb_lots > 1 && !t.startsWith('immeuble'))) return 'promotion'
  if (t.startsWith('immeuble')) return 'immeuble'
  if (t.includes('terrain') || t.includes('bien-fonds')) return 'terrain'
  if (t.startsWith('villa')) return 'villa'
  if (t.startsWith('maison') || t.includes('chalet') || t.includes('ferme')) return 'maison'
  if (t.includes('appartement') || t.includes('ppe')) return 'appartement'
  return 'maison'
}

const filtreType = (type: Typologie) => (m: Mandat) => m.photos.length > 0 && classifier(m) === type

// Les objets réutilisent le type LandingSEO ; slug inclut le chemin complet
// pour que les URLs canoniques et le schema soient corrects.
export const TYPES: Record<string, LandingSEO> = {
  appartements: {
    slug: 'transactions/appartements',
    metaTitle: 'Appartements vendus dans le canton de Vaud | Track record Thomas Praet',
    metaDescription: "Appartements et PPE vendus par Thomas Praet, courtier USPI, dans le canton de Vaud : transactions réelles du studio au 5.5 pièces, caractéristiques à l'appui.",
    eyebrow: 'Track record · Appartements',
    h1Line1: 'Appartements & PPE',
    h1Line2: 'dans le canton de Vaud',
    intro: "Du studio en ville au 5.5 pièces avec vue lac, l'appartement en PPE est le type de bien que je traite le plus. Voici des transactions réelles, avec leurs caractéristiques, pour juger sur pièces plutôt que sur discours.",
    serviceType: "Vente d'appartement en PPE",
    areaName: 'Canton de Vaud',
    areaType: 'AdministrativeArea',
    sections: [
      {
        titre: 'Ce qui fait vendre un appartement',
        corps: [
          "Pour un appartement en PPE, les acquéreurs regardent bien au-delà des mètres carrés : l'état des charges, le fonds de rénovation, les décisions d'assemblée à venir et la performance énergétique. Un [CECB médiocre](/journal/cecb-obligatoire-vente-vaud) ou des charges opaques durcissent immédiatement la négociation.",
          "Je réunis ces éléments dès le mandat, [avec tous les documents nécessaires](/journal/documents-vente-immobiliere-vaud), pour qu'un acquéreur avance en confiance et sans renégociation tardive.",
        ],
      },
      {
        titre: "L'estimation d'un appartement en PPE",
        corps: [
          "Le prix au m² d'un appartement varie fortement selon la commune, le quartier, l'étage, la vue et l'état. Deux appartements de même surface peuvent afficher plusieurs centaines de milliers de francs d'écart.",
          "J'estime chaque bien [selon plusieurs méthodes croisées](/journal/estimer-son-bien-canton-de-vaud) et les transactions comparables récentes, dans un rapport écrit et défendable.",
        ],
      },
    ],
    faq: [
      { q: "Combien se vend un appartement en PPE dans le canton de Vaud ?", a: "Cela dépend fortement de la commune et du quartier : de l'ordre de CHF 5'500.- par m² dans le Nord vaudois à plus de CHF 12'000.- par m² avec vue lac sur l'arc lémanique. Seule une estimation sur place donne un prix fiable pour votre bien." },
      { q: "Quels documents faut-il pour vendre un appartement en PPE ?", a: "Extrait du registre foncier, acte constitutif et règlement de PPE, décomptes de charges, procès-verbaux d'assemblée, état du fonds de rénovation et, de plus en plus, un CECB." },
      { q: "Combien de temps faut-il pour vendre un appartement ?", a: "Un appartement estimé à son juste prix et bien présenté trouve généralement preneur en quelques semaines sur l'arc lémanique. Un bien surévalué peut stagner plusieurs mois." },
    ],
    transactionsTitre: 'Appartements que j’ai traités',
    transactionsIntro: "Une sélection d'appartements documentés. L'historique plus ancien reste confidentiel mais figure dans mon track record.",
    filtre: filtreType('appartement'),
  },

  villas: {
    slug: 'transactions/villas',
    metaTitle: 'Villas vendues sur l’arc lémanique et Vaud | Track record Thomas Praet',
    metaDescription: "Villas vendues par Thomas Praet, courtier USPI : individuelles, mitoyennes, jumelées, sur l'arc lémanique et le canton de Vaud. Transactions réelles à l'appui.",
    eyebrow: 'Track record · Villas',
    h1Line1: 'Villas',
    h1Line2: 'sur l’arc lémanique et Vaud',
    intro: "La villa avec jardin est le segment le plus tendu du marché vaudois, particulièrement entre CHF 1 et 2 millions. Bien estimée et bien présentée, elle trouve preneur en quelques semaines. Voici des transactions réelles pour en juger.",
    serviceType: 'Vente de villa',
    areaName: 'Canton de Vaud',
    areaType: 'AdministrativeArea',
    sections: [
      {
        titre: 'Un segment sous tension',
        corps: [
          "Entre CHF 1'000'000.- et CHF 2'000'000.-, la demande de villas dépasse largement l'offre sur l'arc lémanique. Les maisons individuelles avec jardin, bien entretenues, dans des communes bien desservies, [trouvent preneur rapidement si le prix est juste](/journal/estimer-son-bien-canton-de-vaud).",
          "Mais les acquéreurs sont sélectifs : un défaut non traité ou une performance énergétique faible se paient immédiatement dans la négociation.",
        ],
      },
      {
        titre: "L'estimation d'une villa",
        corps: [
          "Une villa se valorise par sa valeur intrinsèque (coût de reconstruction, valeur ECA indexée moins vétusté) additionnée de la valeur du terrain, le tout confronté aux transactions comparables. Le terrain, souvent, pèse autant que le bâti.",
          "Je vérifie systématiquement l'extrait du registre foncier et les éventuelles [servitudes](/journal/servitudes-charges-foncieres-vente-vaud) avant de fixer un prix.",
        ],
      },
    ],
    faq: [
      { q: "Combien se vend une villa dans le canton de Vaud ?", a: "Les fourchettes vont d'environ CHF 900'000.- dans le Nord vaudois ou le Gros-de-Vaud à plusieurs millions sur l'arc lémanique avec vue lac. La valeur dépend surtout de l'emplacement, du terrain et de l'état." },
      { q: "Combien de temps faut-il pour vendre une villa ?", a: "Sur le segment tendu de l'arc lémanique, une villa correctement estimée se vend souvent en quelques semaines. Les biens plus atypiques ou haut de gamme demandent davantage de temps et une clientèle ciblée." },
      { q: "Faut-il rénover sa villa avant de la vendre ?", a: "Pas toujours. Certains travaux se rentabilisent, d'autres non : l'acquéreur veut souvent adapter le bien à son goût. Mieux vaut cibler les points qui rassurent (toiture, chauffage, énergie) que tout refaire." },
    ],
    transactionsTitre: 'Villas que j’ai traitées',
    transactionsIntro: "Une sélection de villas documentées. L'historique plus ancien reste confidentiel mais figure dans mon track record.",
    filtre: filtreType('villa'),
  },

  maisons: {
    slug: 'transactions/maisons',
    metaTitle: 'Maisons de caractère vendues dans le canton de Vaud | Thomas Praet',
    metaDescription: "Maisons villageoises, vigneronnes et de caractère vendues par Thomas Praet, courtier USPI, dans le canton de Vaud. Biens atypiques, transactions réelles à l'appui.",
    eyebrow: 'Track record · Maisons',
    h1Line1: 'Maisons de caractère',
    h1Line2: 'villageoises, vigneronnes, fermes',
    intro: "Les maisons de caractère, villageoises ou vigneronnes, ne se vendent pas comme une villa standard. Ce sont des biens rares, souvent uniques, qui demandent une expertise spécifique et une clientèle ciblée. Voici des transactions réelles pour en juger.",
    serviceType: 'Vente de maison de caractère',
    areaName: 'Canton de Vaud',
    areaType: 'AdministrativeArea',
    sections: [
      {
        titre: 'Des biens rares, sans comparable strict',
        corps: [
          "Une maison vigneronne de Lavaux, une ferme rénovée du Gros-de-Vaud ou une maison villageoise de La Côte n'ont pas d'équivalent direct sur le marché. L'estimation croise la valeur intrinsèque, l'emplacement, le charme et l'état, avec une lecture fine du terroir.",
          "L'acheteur de ces biens cherche un art de vivre autant qu'un investissement : la présentation et le récit du bien comptent autant que le prix.",
        ],
      },
      {
        titre: 'Les points juridiques à vérifier',
        corps: [
          "Les biens anciens comportent fréquemment des [servitudes, droits de passage ou contraintes de patrimoine](/journal/servitudes-charges-foncieres-vente-vaud) qu'il faut clarifier en amont. Une inscription découverte tard peut faire capoter une vente.",
          "Je vérifie systématiquement l'extrait du registre foncier et les actes constitutifs des servitudes importantes avant la mise en vente.",
        ],
      },
    ],
    faq: [
      { q: "Comment estime-t-on une maison de caractère ou vigneronne ?", a: "Ces biens rares n'ont pas de comparable strict. L'estimation croise la valeur intrinsèque, l'emplacement, la vue, l'état et les éventuelles contraintes patrimoniales ou viticoles. Une lecture fine du terroir est indispensable." },
      { q: "Comment vendre une maison villageoise atypique ?", a: "Par une mise en valeur soignée et une clientèle ciblée, pas par une annonce de masse. La présentation, le récit du bien et la sélection des acquéreurs sont déterminants." },
      { q: "Les servitudes compliquent-elles la vente d'une maison ancienne ?", a: "Pas nécessairement, si elles sont présentées clairement dès le départ. Ce qui crée de la méfiance chez un acquéreur, ce n'est pas la servitude, c'est de la découvrir tard dans le processus." },
    ],
    transactionsTitre: 'Maisons que j’ai traitées',
    transactionsIntro: "Une sélection de maisons documentées. L'historique plus ancien reste confidentiel mais figure dans mon track record.",
    filtre: filtreType('maison'),
  },
}

export const TYPE_SLUGS = Object.keys(TYPES)
