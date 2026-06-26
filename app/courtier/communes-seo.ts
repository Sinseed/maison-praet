// Données SEO enrichies par commune
// Utilisées pour générer les pages /courtier/[commune]

export type CommuneSEO = {
  slug: string
  nom: string
  region: string
  canton: string
  // Texte de marché spécifique à la commune
  marche: string
  // Prix indicatifs (fourchettes, pas de chiffres inventés)
  prix: string
  // Point fort de la commune pour l'immobilier
  pointFort: string
  // Ce que Thomas a fait dans cette commune (discret, sans noms)
  terrain: string
}

export const COMMUNES_SEO: CommuneSEO[] = [
  {
    slug: 'lausanne',
    nom: 'Lausanne',
    region: 'Arc lémanique',
    canton: 'Vaud',
    marche: "Lausanne est le marché le plus actif du canton. La demande est portée par l'EPFL, l'UNIL, les organisations internationales et les actifs de la région genevoise. Le taux de vacance y est structurellement bas, sous les 1.5%. Les appartements PPE en zone centrale ou avec vue lac trouvent preneur rapidement. Les villas sur les hauteurs, du Mont-sur-Lausanne à Vers-chez-les-Blancs, constituent un segment à part, avec une clientèle aisée et des délais de vente plus longs.",
    prix: "Les appartements PPE se négocient entre CHF 9'500.- et CHF 12'000.- par m² selon le quartier. Les villas oscillent entre CHF 1'500'000.- et CHF 4'000'000.- selon l'emplacement et la vue.",
    pointFort: "Liquidité maximale, demande locative soutenue, résistance aux corrections de prix",
    terrain: "J'ai vendu plusieurs appartements PPE en centre-ville et des villas sur les hauteurs, en mandat exclusif. La négociation y est précise : un bien correctement estimé se vend rapidement, parfois au-dessus du prix affiché."
  },
  {
    slug: 'morges',
    nom: 'Morges',
    region: 'Arc lémanique',
    canton: 'Vaud',
    marche: "Morges bénéficie d'une position privilegiée sur l'arc lémanique, entre Lausanne et Genève, avec un tissu économique solide et des infrastructures scolaires reconnues. Le marché y est animé, avec une demande familiale forte pour les villas et maisons de ville. Le bord du lac et le quartier de la Gottaz concentrent la demande premium.",
    prix: "Les villas avec jardin se négocient généralement entre CHF 1'400'000.- et CHF 2'500'000.-. Les appartements PPE de standing entre CHF 8'500.- et CHF 10'500.- par m².",
    pointFort: "Équilibre prix/qualité de vie, demande familiale stable, bonne liquidité",
    terrain: "J'ai conclu une vente à Morges en 2026 à CHF 1'825'000.-, au-dessus du prix d'estimation. Un bien juste valorisé trouve son acquéreur sans attendre."
  },
  {
    slug: 'pully',
    nom: 'Pully',
    region: 'Arc lémanique',
    canton: 'Vaud',
    marche: "Pully jouit d'une réputation premium sur l'arc lémanique. La commune attire une clientèle exigeante, souvent avec vue lac, et les prix au m² y sont parmi les plus élevés du canton hors Lausanne centre. Le marché est sélectif : les biens bien présentés et correctement estimés trouvent rapidement preneur, les autres stagnent.",
    prix: "Les appartements PPE avec vue lac dépassent fréquemment CHF 12'000.- par m². Les villas individuelles se situent entre CHF 2'000'000.- et CHF 5'000'000.- selon l'exposition.",
    pointFort: "Prestige, vue lac, clientèle patrimoniale, résistance aux cycles",
    terrain: "J'ai travaillé sur plusieurs mandats à Pully, dont des appartements PPE et un bien-fonds. La due diligence y est plus exigeante, les acquéreurs mieux préparés."
  },
  {
    slug: 'gland',
    nom: 'Gland',
    region: 'La Côte',
    canton: 'Vaud',
    marche: "Gland est l'une des communes les plus dynamiques de La Côte. Sa proximité avec Genève (20 min en train), son tissu d'entreprises internationales et son cadre résidentiel en font une destination prisée des familles et des expatriés. Le marché y est actif, avec une demande soutenue pour les maisons familiales et les appartements de standing.",
    prix: "Les villas familiales se négocient entre CHF 1'800'000.- et CHF 3'500'000.-. Les appartements PPE entre CHF 7'500.- et CHF 9'500.- par m².",
    pointFort: "Proximité genevoise, dynamisme économique, bonne liquidité",
    terrain: "J'ai vendu un appartement 5.5 pièces à Gland et géré un mandat sur une maison jumelée. Le bassin d'acquéreurs y est large, incluant de nombreux profils expatriés."
  },
  {
    slug: 'yverdon-les-bains',
    nom: 'Yverdon-les-Bains',
    region: 'Nord vaudois',
    canton: 'Vaud',
    marche: "Yverdon-les-Bains est le principal centre urbain du nord vaudois. Pôle de formation avec la HEIG-VD et pôle économique avec une zone industrielle active, la ville offre des prix plus accessibles qu'en arc lémanique. Le marché est stable, avec une demande régulière pour les appartements et les maisons de quartier.",
    prix: "Les maisons individuelles se situent entre CHF 900'000.- et CHF 2'500'000.- selon la surface et l'emplacement. Les appartements PPE entre CHF 5'500.- et CHF 7'500.- par m².",
    pointFort: "Accessibilité des prix, demande locative solide, développement urbain en cours",
    terrain: "J'ai un mandat actif à Yverdon sur une maison individuelle 8.5 pièces. Le nord vaudois demande une connaissance fine des micro-marchés : l'emplacement y joue un rôle encore plus déterminant qu'en arc lémanique."
  },
  {
    slug: 'nyon',
    nom: 'Nyon',
    region: 'La Côte',
    canton: 'Vaud',
    marche: "Nyon est portée par la proximité genevoise et par la présence d'organisations internationales dont l'UEFA. La commune concentre une demande étrangère importante, notamment en provenance d'Europe et des États-Unis. Les prix sont 15 à 20% inférieurs à Genève pour une accessibilité CFF similaire, ce qui soutient une demande structurelle forte.",
    prix: "Les villas se négocient entre CHF 1'500'000.- et CHF 4'000'000.-. Les appartements PPE de standing entre CHF 9'000.- et CHF 11'500.- par m².",
    pointFort: "Demande internationale, écoles internationales, marché premium mais plus accessible que Genève",
    terrain: "La Côte nyonnaise exige une maîtrise de la Lex Koller pour les acquéreurs étrangers. Je connais les règles et les démarches pour éviter les blocages."
  },
  {
    slug: 'renens',
    nom: 'Renens',
    region: 'Arc lémanique',
    canton: 'Vaud',
    marche: "Renens et l'ouest lausannois sont en pleine mutation urbaine. Plusieurs quartiers ont bénéficié d'importants investissements ces dix dernières années. La demande locative y est forte, portée par la proximité du m2 et les prix encore accessibles. Le marché de la PPE y offre des opportunités de rendement intéressantes pour les investisseurs.",
    prix: "Les appartements PPE se négocient entre CHF 7'000.- et CHF 9'000.- par m². Les rendements locatifs bruts y sont parmi les plus élevés de l'agglomération lausannoise.",
    pointFort: "Rendements locatifs, mutation urbaine, forte demande locative",
    terrain: "J'ai géré une promotion d'appartements à Crissier dans ce secteur. L'ouest lausannois attire des profils d'investisseurs avisés qui arbitrent entre rendement et plus-value potentielle."
  },
  {
    slug: 'rolle',
    nom: 'Rolle',
    region: 'La Côte',
    canton: 'Vaud',
    marche: "Rolle est l'une des adresses les plus recherchées de La Côte. Située entre Nyon et Morges, la commune offre un cadre villageois avec toutes les commodités, une vue lac étendue et un vignoble classé. Elle attire familles aisées et retraités cherchant qualité de vie et discrétion.",
    prix: "Les villas se négocient généralement entre CHF 1'800'000.- et CHF 4'500'000.-. Les appartements avec vue lac entre CHF 10'000.- et CHF 14'000.- par m².",
    pointFort: "Cadre premium, vignoble, vue lac, clientèle patrimoniale",
    terrain: "J'ai vendu un appartement PPE 4.5 pièces à Rolle. Le marché y est sélectif et les acquéreurs souvent bien informés : la transparence sur le prix est non négociable."
  },
]

// Helper : générer le slug depuis le nom de commune
export function communeSlug(nom: string): string {
  return nom.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
