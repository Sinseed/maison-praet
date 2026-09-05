// Pages d'atterrissage SEO/IAO d'intention (vendre X, estimation X) et de région.
// Complètent les pages commune (/courtier/[commune]) sur les requêtes précises
// que ChatGPT/Perplexity/Google AI Overviews traitent. Chaque page est adossée
// à des transactions réelles (filtrées depuis MANDATS) : aucune donnée à saisir.

import type { Mandat } from '../data'
import { COMMUNES_SEO_ALL } from './communes-seo'

export type LandingFaq = { q: string; a: string }
export type LandingSection = { titre: string; corps: string[] }
export type LandingCommune = { nom: string; slug: string }

export type LandingSEO = {
  slug: string
  metaTitle: string
  metaDescription: string
  eyebrow: string
  h1Line1: string
  h1Line2: string
  intro: string
  serviceType: string
  areaName: string
  areaType: 'City' | 'AdministrativeArea'
  sections: LandingSection[]
  faq: LandingFaq[]
  transactionsTitre: string
  transactionsIntro: string
  // Filtre appliqué à MANDATS pour la chaîne factuelle de transactions
  filtre: (m: Mandat) => boolean
  // Pour les pages région : communes couvertes (maillage interne)
  communes?: LandingCommune[]
}

// ─── Helpers région ───────────────────────────────────────────────────────────
const communesRegion = (region: string): LandingCommune[] =>
  COMMUNES_SEO_ALL.filter(c => c.region === region).map(c => ({ nom: c.nom, slug: c.slug }))

const nomsRegion = (region: string): string[] =>
  COMMUNES_SEO_ALL.filter(c => c.region === region).map(c => c.nom.toLowerCase())

const enRegion = (region: string) => {
  const noms = nomsRegion(region)
  return (m: Mandat) => m.photos.length > 0 && noms.some(n => m.lieu.toLowerCase().includes(n))
}

const estAppartement = (m: Mandat) => /appartement|ppe|attique/i.test(m.titre)
const estImmeuble = (m: Mandat) => /^immeuble/i.test(m.titre)
const aLausanne = (m: Mandat) => m.lieu.toLowerCase() === 'lausanne'

// ─── Landings ───────────────────────────────────────────────────────────────
export const LANDINGS: Record<string, LandingSEO> = {
  'vendre-appartement-lausanne': {
    slug: 'vendre-appartement-lausanne',
    metaTitle: 'Vendre un appartement à Lausanne | Thomas Praet, courtier USPI',
    metaDescription: "Vendre un appartement à Lausanne : estimation au juste prix, mandat exclusif, vente au meilleur prix. Thomas Praet, courtier USPI, transactions réelles à l'appui.",
    eyebrow: 'Vente immobilière · Lausanne',
    h1Line1: 'Vendre un appartement',
    h1Line2: 'à Lausanne',
    intro: "Vous envisagez de vendre votre appartement à Lausanne ? Le marché est porteur, mais les acquéreurs sont exigeants et bien informés. Un appartement estimé à son juste prix et bien présenté se vend en quelques semaines, parfois au-dessus du prix affiché. Voici comment je procède, et les transactions qui le prouvent.",
    serviceType: "Vente d'appartement en PPE",
    areaName: 'Lausanne',
    areaType: 'City',
    sections: [
      {
        titre: 'Combien vaut votre appartement à Lausanne ?',
        corps: [
          "À Lausanne, les appartements en PPE se négocient dans une fourchette indicative de CHF 9'500.- à CHF 12'000.- par m² selon le quartier, l'étage, la vue et l'état. Ces fourchettes ne remplacent pas une estimation : deux appartements de même surface dans le même immeuble peuvent avoir plusieurs centaines de milliers de francs d'écart.",
          "Je fixe le prix à partir de trois méthodes croisées et des transactions comparables récentes dans le secteur, [comme je l'explique en détail ici](/journal/estimer-son-bien-canton-de-vaud). Le résultat est un rapport écrit et défendable, pas un chiffre au feeling.",
        ],
      },
      {
        titre: 'Vendre au juste prix, pas au prix le plus haut promis',
        corps: [
          "Le piège classique : le courtier qui gonfle l'estimation pour décrocher le mandat, puis propose des baisses successives. Un appartement qui stagne sur les portails [perd en crédibilité chaque semaine](/journal/pourquoi-votre-bien-ne-se-vend-pas), et c'est votre prix qui en souffre.",
          "Je préfère perdre un mandat en donnant un prix honnête que de le gagner avec un prix irréaliste. Si votre attente ne correspond pas à mon estimation, je vous le dis, je vous explique pourquoi, et vous décidez.",
        ],
      },
      {
        titre: 'PPE : les points qui font la différence',
        corps: [
          "Pour un appartement en PPE, les acquéreurs regardent au-delà des mètres carrés : l'état des charges, le fonds de rénovation, les décisions d'assemblée à venir et la performance énergétique. Un [CECB médiocre](/journal/cecb-obligatoire-vente-vaud) ou des charges opaques durcissent immédiatement la négociation.",
          "Je prépare ces éléments dès le mandat pour qu'un acquéreur avance en confiance, [avec tous les documents réunis](/journal/documents-vente-immobiliere-vaud). C'est ce qui évite les renégociations tardives.",
        ],
      },
    ],
    faq: [
      { q: "Quel est le prix au m² d'un appartement à Lausanne en 2026 ?", a: "À titre indicatif, les appartements en PPE à Lausanne se négocient entre CHF 9'500.- et CHF 12'000.- par m² selon le quartier, la vue et l'état. Seule une estimation sur place, appuyée sur les transactions comparables, donne un prix fiable pour votre bien précis." },
      { q: "Combien de temps faut-il pour vendre un appartement à Lausanne ?", a: "Un appartement estimé à son juste prix et bien présenté trouve généralement preneur en quelques semaines à Lausanne, où la demande est soutenue et le taux de vacance bas. Un bien surévalué peut au contraire stagner plusieurs mois." },
      { q: "Quels documents faut-il pour vendre un appartement en PPE ?", a: "Extrait du registre foncier, acte constitutif et règlement de PPE, décomptes de charges, procès-verbaux d'assemblée, état du fonds de rénovation et, de plus en plus, un CECB. Je réunis ces pièces dès le mandat pour éviter les blocages." },
      { q: "Quels frais restent à la charge du vendeur à Lausanne ?", a: "Principalement la commission de courtage (intégralement déductible de l'impôt sur le gain immobilier) et l'impôt sur le gain immobilier lui-même. Les frais de notaire de l'acte de vente sont à la charge de l'acquéreur dans le canton de Vaud." },
    ],
    transactionsTitre: 'Appartements que j’ai traités à Lausanne',
    transactionsIntro: "Des transactions réelles, documentées, à Lausanne. C'est la meilleure preuve de ma connaissance du marché local.",
    filtre: (m) => aLausanne(m) && estAppartement(m) && m.photos.length > 0,
  },

  'vendre-immeuble-rendement-vaud': {
    slug: 'vendre-immeuble-rendement-vaud',
    metaTitle: 'Vendre un immeuble de rendement dans le canton de Vaud | Thomas Praet',
    metaDescription: "Vendre un immeuble de rendement dans le canton de Vaud : estimation par la valeur de rendement, vente discrète, réseau d'investisseurs. Thomas Praet, courtier USPI.",
    eyebrow: 'Vente immobilière · Immeubles de rendement',
    h1Line1: 'Vendre un immeuble',
    h1Line2: 'de rendement',
    intro: "Vendre un immeuble de rendement n'a rien à voir avec la vente d'un appartement. Pas de coup de cœur : un investisseur achète des chiffres qui doivent tenir, ligne après ligne. La discrétion, la qualité du dossier et l'accès aux bons acquéreurs font toute la différence. Voici mon approche dans le canton de Vaud.",
    serviceType: "Vente d'immeuble de rendement",
    areaName: 'Canton de Vaud',
    areaType: 'AdministrativeArea',
    sections: [
      {
        titre: "L'estimation par la valeur de rendement",
        corps: [
          "Un immeuble locatif se valorise avant tout par sa valeur de rendement : le revenu locatif net capitalisé à un taux qui dépend de l'emplacement et de l'état du bien. Sur l'arc lémanique, un rendement brut de 3 à 4% est devenu la norme pour un bien en bon état.",
          "Je pars de l'état locatif certifié, des décomptes de charges et des travaux planifiés pour établir un chiffre défendable, [pas d'un rendement de vitrine](/journal/investir-locatif-vaud-2026). C'est ce qui inspire confiance à un acquéreur sérieux.",
        ],
      },
      {
        titre: 'La discrétion, un impératif',
        corps: [
          "Beaucoup de propriétaires d'immeubles ne veulent pas d'annonce publique : ni pour ne pas inquiéter leurs locataires, ni pour ne pas exposer leur patrimoine. Une vente d'immeuble peut se mener off-market, auprès d'un cercle ciblé d'investisseurs, du premier contact jusqu'à la signature.",
          "Derrière un immeuble, il y a souvent une histoire : un bien de famille tenu pendant des décennies, une succession à organiser, un patrimoine à transmettre. Cela mérite d'être mené sans bruit.",
        ],
      },
      {
        titre: 'Ce que cherche un investisseur',
        corps: [
          "L'acquéreur d'un immeuble de rendement achète du rationnel : un état locatif propre, des charges maîtrisées, un potentiel lisible (rénovation énergétique, optimisation locative, surélévation). Mon rôle est de poser tous ces éléments sur la table dès le départ.",
          "Un dossier complet et honnête se négocie plus vite et plus haut qu'un dossier où l'acquéreur découvre les zones d'ombre en cours de route.",
        ],
      },
    ],
    faq: [
      { q: "Comment estime-t-on un immeuble de rendement ?", a: "Principalement par la valeur de rendement : on divise le revenu locatif net par un taux de capitalisation qui dépend de l'emplacement et de l'état du bien. On la confronte ensuite aux transactions comparables et au potentiel de revalorisation." },
      { q: "Quel rendement brut attendre dans le canton de Vaud ?", a: "Sur l'arc lémanique, un rendement brut de 3 à 4% est aujourd'hui la norme pour un immeuble en bon état. Les rendements plus élevés se trouvent dans le Nord vaudois ou le Gros-de-Vaud, avec un profil de risque différent." },
      { q: "Peut-on vendre un immeuble sans annonce publique ?", a: "Oui. Une vente off-market, menée auprès d'un cercle ciblé d'investisseurs, est fréquente pour les immeubles de rendement. Elle protège la confidentialité du vendeur et la tranquillité des locataires." },
      { q: "Quels documents faut-il pour vendre un immeuble locatif ?", a: "Un état locatif certifié, les décomptes de charges des dernières années, la liste des travaux réalisés et planifiés, les baux, et l'extrait du registre foncier. Ces pièces conditionnent la solidité de l'estimation et la confiance de l'acquéreur." },
    ],
    transactionsTitre: 'Immeubles que j’ai traités',
    transactionsIntro: "Quelques immeubles et biens de rendement documentés dans le canton de Vaud. Les transactions off-market restent, par nature, confidentielles.",
    filtre: (m) => estImmeuble(m) && m.photos.length > 0,
  },

  'estimation-immobiliere-lausanne': {
    slug: 'estimation-immobiliere-lausanne',
    metaTitle: 'Estimation immobilière à Lausanne | Gratuite et fondée | Thomas Praet',
    metaDescription: "Estimation immobilière gratuite à Lausanne : rapport fondé sur la valeur intrinsèque, de rendement et vénale, plus les transactions réelles. Thomas Praet, courtier USPI.",
    eyebrow: 'Estimation · Lausanne',
    h1Line1: 'Estimation immobilière',
    h1Line2: 'à Lausanne',
    intro: "Combien vaut réellement votre bien à Lausanne ? Une estimation sérieuse ne se fait pas en ligne en trois clics, ni au feeling après une visite de quinze minutes. Elle croise plusieurs méthodes et s'appuie sur les transactions réelles du secteur. Voici comment j'estime, et pourquoi mon rapport est défendable devant un acquéreur, un notaire ou une banque.",
    serviceType: 'Estimation immobilière',
    areaName: 'Lausanne',
    areaType: 'City',
    sections: [
      {
        titre: 'Trois méthodes, pas un algorithme',
        corps: [
          "J'estime chaque bien selon la valeur intrinsèque (coût de reconstruction, valeur ECA indexée moins vétusté, plus le terrain), la valeur de rendement (pour les biens locatifs) et la valeur vénale (la synthèse pondérée). Le tout confronté aux transactions comparables récentes à Lausanne.",
          "Chaque chiffre expose son détail ligne par ligne. [C'est cette transparence](/journal/estimer-son-bien-canton-de-vaud) qui rend l'estimation défendable, et qui la distingue d'un prix sorti d'un chapeau.",
        ],
      },
      {
        titre: 'Pourquoi les estimations en ligne se trompent',
        corps: [
          "Les estimateurs automatiques ne voient ni l'état réel de votre cuisine, ni la nuisance sonore de la route voisine, ni le charme d'une vue sur le lac, ni l'état des charges de votre PPE. Ils appliquent des moyennes à un bien qui, lui, est unique.",
          "À Lausanne, où les écarts de prix d'un quartier à l'autre sont considérables, cette approche mène régulièrement à des erreurs de plusieurs centaines de milliers de francs, dans un sens comme dans l'autre.",
        ],
      },
      {
        titre: 'Un rapport que vous pouvez défendre',
        corps: [
          "Vous recevez un rapport écrit, en 48 heures, gratuit et sans engagement. Il vous sert à fixer votre prix, mais aussi à tenir ce prix face à un acquéreur qui négocie, car chaque valeur y est justifiée.",
          "Fixer le bon prix dès le premier jour reste la meilleure stratégie de vente : un bien juste estimé attire, un bien surévalué s'enlise.",
        ],
      },
    ],
    faq: [
      { q: "L'estimation immobilière est-elle gratuite ?", a: "Oui. J'estime votre bien à Lausanne gratuitement et sans engagement. Vous restez libre de la suite, que vous vendiez avec moi ou non." },
      { q: "En combien de temps reçoit-on l'estimation ?", a: "Je remets un rapport écrit dans un délai indicatif de 48 heures après la visite du bien, une fois les informations nécessaires réunies." },
      { q: "Sur quoi se base votre estimation ?", a: "Sur trois méthodes croisées (valeur intrinsèque, valeur de rendement, valeur vénale) et sur les transactions comparables récentes dans le quartier. Chaque valeur est détaillée ligne par ligne dans le rapport." },
      { q: "Une estimation en ligne ne suffit-elle pas ?", a: "Non. Un estimateur automatique ignore l'état réel du bien, son environnement et ses charges. À Lausanne, où les prix varient fortement d'un quartier à l'autre, seule une estimation sur place est fiable." },
    ],
    transactionsTitre: 'Mes références à Lausanne',
    transactionsIntro: "Des transactions réelles à Lausanne, tous types confondus. C'est cette expérience du terrain qui fonde mes estimations.",
    filtre: (m) => aLausanne(m) && m.photos.length > 0,
  },

  'courtier-immobilier-la-cote': {
    slug: 'courtier-immobilier-la-cote',
    metaTitle: 'Courtier immobilier sur La Côte | Morges à Nyon | Thomas Praet USPI',
    metaDescription: "Courtier immobilier sur La Côte, de Morges à Nyon : estimation, vente, conseil. Thomas Praet, certifié USPI, maîtrise de la Lex Koller pour la clientèle internationale.",
    eyebrow: 'Courtier immobilier · La Côte',
    h1Line1: 'Courtier immobilier',
    h1Line2: 'sur La Côte',
    intro: "La Côte, de Morges à Nyon, est l'un des marchés les plus recherchés de Suisse romande. Portée par la proximité genevoise et une forte demande internationale, elle exige une connaissance fine des micro-marchés et des règles propres à la clientèle étrangère. Thomas Praet, courtier certifié USPI, vous accompagne sur l'ensemble de la région.",
    serviceType: 'Courtage immobilier',
    areaName: 'La Côte',
    areaType: 'AdministrativeArea',
    sections: [
      {
        titre: 'La Côte, de Morges à Nyon',
        corps: [
          "La Côte concentre une demande soutenue : familles, cadres internationaux, résidents genevois cherchant plus d'espace à des prix inférieurs à Genève pour une accessibilité CFF comparable. Le vignoble classé, le bord du lac et les communes viticoles en font un cadre unique.",
          "Chaque commune a son propre marché : le prestige de Rolle, la demande internationale de Nyon, le dynamisme de Gland, l'authenticité des villages viticoles. Un prix juste se fixe commune par commune.",
        ],
      },
      {
        titre: 'Lex Koller : une expertise indispensable',
        corps: [
          "La Côte attire une clientèle étrangère importante. La vente à un acquéreur non résident est encadrée par la Lex Koller, [dont il faut maîtriser les règles](/journal/etranger-permis-b-acheter-immobilier-vaud) pour éviter les blocages en cours de transaction.",
          "Je connais ces démarches et les intègre dès la stratégie de vente, ce qui élargit le cercle des acquéreurs possibles sans mauvaise surprise devant le notaire.",
        ],
      },
    ],
    faq: [
      { q: "Quelles communes couvrez-vous sur La Côte ?", a: "J'interviens sur l'ensemble de La Côte, notamment Morges, Nyon, Gland, Rolle, ainsi que les communes viticoles et résidentielles de la région. Chaque commune dispose de sa page dédiée sur le site." },
      { q: "Le marché de La Côte est-il différent de Lausanne ?", a: "Oui. La Côte est davantage portée par la demande genevoise et internationale, avec des écarts de prix marqués entre le bord du lac, les communes viticoles et l'arrière-pays. La proximité de Genève y joue un rôle déterminant." },
      { q: "Faut-il connaître la Lex Koller pour vendre sur La Côte ?", a: "C'est fortement recommandé. Une part importante des acquéreurs sur La Côte sont étrangers, et leur acquisition est encadrée par la Lex Koller. Maîtriser ces règles évite les blocages et élargit le cercle d'acquéreurs." },
    ],
    transactionsTitre: 'Mes transactions sur La Côte',
    transactionsIntro: "Des biens documentés sur La Côte. Les transactions plus anciennes restent confidentielles mais figurent dans mon track record.",
    filtre: enRegion('La Côte'),
    communes: communesRegion('La Côte'),
  },

  'courtier-immobilier-lavaux': {
    slug: 'courtier-immobilier-lavaux',
    metaTitle: 'Courtier immobilier à Lavaux | Lutry, Cully, Chexbres | Thomas Praet',
    metaDescription: "Courtier immobilier à Lavaux, vignoble classé UNESCO : maisons vigneronnes, biens de caractère, appartements avec vue lac. Thomas Praet, certifié USPI.",
    eyebrow: 'Courtier immobilier · Lavaux',
    h1Line1: 'Courtier immobilier',
    h1Line2: 'à Lavaux',
    intro: "Lavaux, vignoble classé au patrimoine mondial de l'UNESCO, est un marché immobilier à part. Maisons vigneronnes de caractère, biens rares avec vue sur le Léman, offre restreinte qui soutient les prix : vendre à Lavaux demande une expertise spécifique et une clientèle ciblée. Thomas Praet, courtier certifié USPI, connaît ce terroir.",
    serviceType: 'Courtage immobilier',
    areaName: 'Lavaux',
    areaType: 'AdministrativeArea',
    sections: [
      {
        titre: 'Un marché atypique, une offre rare',
        corps: [
          "À Lavaux, les maisons vigneronnes et les propriétés de caractère coexistent avec très peu de constructions neuves. Cette rareté soutient durablement les prix, mais rend chaque bien unique : il n'y a pas de comparable strict, et l'estimation demande une lecture fine du terroir.",
          "De Lutry à Chexbres, en passant par les villages classés de Bourg-en-Lavaux, l'acheteur cherche un art de vivre autant qu'un investissement.",
        ],
      },
      {
        titre: 'Vendre un bien de caractère',
        corps: [
          "Un bien d'exception se vend par une mise en valeur soignée et une clientèle ultra-ciblée, pas par une annonce de masse. La présentation, le récit du bien et la sélection des acquéreurs comptent autant que le prix.",
          "Attention aussi aux spécificités juridiques fréquentes dans ces biens anciens : [servitudes](/journal/servitudes-charges-foncieres-vente-vaud), droits de passage, protection du patrimoine. Je les vérifie systématiquement en amont.",
        ],
      },
    ],
    faq: [
      { q: "Quelles communes couvrez-vous à Lavaux ?", a: "J'interviens notamment à Lutry, Bourg-en-Lavaux, Puidoux, Riex, Savigny et Forel (Lavaux). Chacune dispose de sa page dédiée sur le site." },
      { q: "Comment estime-t-on une maison vigneronne à Lavaux ?", a: "Ces biens rares n'ont pas de comparable strict. L'estimation croise la valeur intrinsèque, l'emplacement, la vue, l'état et les éventuelles contraintes patrimoniales ou viticoles. Une lecture fine du terroir est indispensable." },
      { q: "Pourquoi les prix restent-ils élevés à Lavaux ?", a: "Parce que l'offre est structurellement rare : le classement UNESCO limite fortement les nouvelles constructions, tandis que la demande pour ce cadre exceptionnel reste soutenue. La rareté soutient les prix." },
    ],
    transactionsTitre: 'Mes transactions à Lavaux',
    transactionsIntro: "Des biens documentés à Lavaux. Un marché confidentiel où chaque transaction est unique.",
    filtre: enRegion('Lavaux'),
    communes: communesRegion('Lavaux'),
  },
}

export const LANDING_SLUGS = Object.keys(LANDINGS)
