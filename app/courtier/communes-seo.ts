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

// ─── Communes additionnelles ───────────────────────────────────────────────

const COMMUNES_SEO_EXTRA: CommuneSEO[] = [
  {
    slug: 'le-mont-sur-lausanne',
    nom: 'Le Mont-sur-Lausanne',
    region: 'Arc lémanique',
    canton: 'Vaud',
    marche: "Le Mont-sur-Lausanne est l'une des communes résidentielles les plus appréciées de l'agglomération lausannoise. Perchée sur les hauteurs, elle offre souvent des vues dégagées sur le lac et les Alpes. La demande y est portée par des familles cherchant le calme à quelques minutes du centre de Lausanne. Les villas mitoyennes et les appartements PPE de qualité y trouvent preneur rapidement.",
    prix: "Les villas mitoyennes se négocient entre CHF 1'200'000.- et CHF 1'800'000.-. Les appartements PPE entre CHF 8'000.- et CHF 10'500.- par m².",
    pointFort: "Calme résidentiel, vues dégagées, proximité immédiate de Lausanne",
    terrain: "J'ai deux mandats actifs au Mont-sur-Lausanne, dont une villa mitoyenne et un appartement PPE. La commune attire une clientèle locale bien informée, ce qui demande une estimation rigoureuse dès le départ."
  },
  {
    slug: 'epalinges',
    nom: 'Epalinges',
    region: 'Arc lémanique',
    canton: 'Vaud',
    marche: "Epalinges combine le calme d'une commune résidentielle avec une proximité immédiate de Lausanne. La présence du CHUV et de plusieurs institutions académiques génère une demande locative et acquisitive soutenue. Le marché y est stable, avec une clientèle familiale et médicale bien représentée.",
    prix: "Les appartements PPE se situent entre CHF 8'500.- et CHF 11'000.- par m². Les villas entre CHF 1'400'000.- et CHF 2'500'000.-.",
    pointFort: "Demande médicale et académique, stabilité du marché, environnement verdoyant",
    terrain: "J'ai vendu des villas et géré un appartement PPE à Epalinges. La commune est appréciée des acheteurs qui travaillent au CHUV ou à l'UNIL et cherchent à combiner proximité professionnelle et cadre familial."
  },
  {
    slug: 'prilly',
    nom: 'Prilly',
    region: 'Arc lémanique',
    canton: 'Vaud',
    marche: "Prilly fait partie de l'agglomération lausannoise et bénéficie d'une excellente desserte en transports publics. Le marché y est actif, avec une demande soutenue pour les appartements et les petits immeubles de rendement. Les prix restent plus accessibles que dans Lausanne intra-muros, ce qui attire investisseurs et primo-accédants.",
    prix: "Les appartements PPE se négocient entre CHF 7'000.- et CHF 9'000.- par m². Les immeubles locatifs selon leur rendement net, généralement entre 3.5% et 4.5% brut.",
    pointFort: "Accessibilité des prix, rendement locatif, excellente desserte TP",
    terrain: "J'ai vendu un immeuble locatif à Prilly. Le secteur attire des investisseurs pragmatiques qui cherchent du rendement sans s'éloigner de l'agglomération lausannoise."
  },
  {
    slug: 'crissier',
    nom: 'Crissier',
    region: 'Arc lémanique',
    canton: 'Vaud',
    marche: "Crissier est en pleine mutation. La commune accueille des zones commerciales et des développements résidentiels importants. Le marché immobilier y est dynamique, porté par la proximité de l'autoroute et des zones d'activités. Les promotions neuves et les villas individuelles coexistent avec un tissu ancien en rénovation.",
    prix: "Les appartements PPE neufs entre CHF 7'500.- et CHF 9'500.- par m². Les villas entre CHF 1'200'000.- et CHF 2'800'000.- selon la surface.",
    pointFort: "Développement actif, accessibilité, profil résidentiel et commercial",
    terrain: "J'ai travaillé sur une promotion mixte à Crissier et vendu une villa individuelle. La commune attire autant des familles que des investisseurs en quête de développement."
  },
  {
    slug: 'cossonay-ville',
    nom: 'Cossonay-Ville',
    region: 'Gros-de-Vaud',
    canton: 'Vaud',
    marche: "Cossonay-Ville est le chef-lieu du district du Gros-de-Vaud. La commune offre un cadre de vie authentique avec toutes les commodités d'un centre régional. Le marché immobilier y est plus accessible que sur l'arc lémanique, avec une demande stable pour les villas jumelées et les appartements en promotion neuve.",
    prix: "Les appartements PPE neufs entre CHF 6'500.- et CHF 8'500.- par m². Les villas jumelées entre CHF 1'000'000.- et CHF 1'600'000.-.",
    pointFort: "Chef-lieu régional, prix accessibles, cadre authentique",
    terrain: "J'ai vendu une villa jumelée et j'ai un mandat actif sur un appartement 4.5 pièces neuf à Cossonay. Le Gros-de-Vaud attire des familles qui cherchent l'espace sans s'éloigner de Lausanne."
  },
  {
    slug: 'echallens',
    nom: 'Echallens',
    region: 'Gros-de-Vaud',
    canton: 'Vaud',
    marche: "Echallens est le cœur du Gros-de-Vaud, une région agricole et résidentielle en expansion. La commune attire des familles qui recherchent l'espace et la tranquillité à environ 20 minutes de Lausanne. Le marché y est accessible, avec une demande régulière pour les maisons individuelles et les villas de village.",
    prix: "Les maisons individuelles se négocient entre CHF 800'000.- et CHF 1'500'000.-. Les appartements PPE entre CHF 5'500.- et CHF 7'500.- par m².",
    pointFort: "Espace, tranquillité, prix accessibles, croissance démographique",
    terrain: "J'ai vendu une maison individuelle à Echallens. Les acheteurs qui viennent dans le Gros-de-Vaud ont souvent fait le tour des communes de l'arc lémanique et cherchent à optimiser leur budget surface."
  },
  {
    slug: 'bussigny',
    nom: 'Bussigny',
    region: 'Arc lémanique',
    canton: 'Vaud',
    marche: "Bussigny est une commune en développement de l'ouest lausannois. Sa zone industrielle et ses infrastructures de transport en font une commune mixte, résidentielle et économique. Le marché immobilier y est actif avec des développements récents qui ont transformé plusieurs quartiers.",
    prix: "Les appartements PPE entre CHF 7'000.- et CHF 9'000.- par m². Les maisons entre CHF 1'000'000.- et CHF 1'800'000.- selon le type.",
    pointFort: "Développement résidentiel actif, excellente accessibilité, proximité Lausanne",
    terrain: "J'ai travaillé sur un bien-fonds résidentiel à Bussigny. L'ouest lausannois reste une zone de croissance où les opportunités sont réelles pour les investisseurs avisés."
  },
  {
    slug: 'cheseaux-sur-lausanne',
    nom: 'Cheseaux-sur-Lausanne',
    region: 'Arc lémanique',
    canton: 'Vaud',
    marche: "Cheseaux-sur-Lausanne est une commune résidentielle tranquille au nord de Lausanne. Elle attire des familles qui souhaitent un cadre plus calme tout en restant proches de l'agglomération. La demande y est régulière pour les villas et les appartements PPE de qualité.",
    prix: "Les appartements PPE entre CHF 7'500.- et CHF 9'500.- par m². Les villas entre CHF 1'100'000.- et CHF 1'900'000.-.",
    pointFort: "Tranquillité, cadre résidentiel, proximité Lausanne-Nord",
    terrain: "J'ai vendu un appartement PPE 4.5 pièces à Cheseaux. La commune est appréciée pour son calme et ses prix légèrement en retrait par rapport à Lausanne intra-muros."
  },
  {
    slug: 'jouxtens-mezery',
    nom: 'Jouxtens-Mézery',
    region: 'Arc lémanique',
    canton: 'Vaud',
    marche: "Jouxtens-Mézery est une petite commune résidentielle prisée au nord-ouest de Lausanne. Son caractère verdoyant et ses maisons individuelles de qualité en font un secteur recherché par une clientèle aisée. Le marché y est sélectif et les transactions peu fréquentes.",
    prix: "Les maisons individuelles se négocient généralement entre CHF 1'500'000.- et CHF 3'000'000.- selon la surface et la qualité.",
    pointFort: "Caractère résidentiel exclusif, verdoyant, clientèle aisée",
    terrain: "J'ai vendu une maison individuelle à Jouxtens-Mézery. Les rares transactions dans ce secteur demandent une connaissance fine du marché local et une clientèle ciblée."
  },
  {
    slug: 'belmont-sur-lausanne',
    nom: 'Belmont-sur-Lausanne',
    region: 'Arc lémanique',
    canton: 'Vaud',
    marche: "Belmont-sur-Lausanne surplombe Lausanne avec des vues souvent exceptionnelles sur le lac. La commune est recherchée pour sa qualité de vie et son caractère résidentiel préservé. Le marché y est premium, avec une clientèle exigeante et des prix au m² élevés.",
    prix: "Les appartements avec vue lac dépassent CHF 11'000.- par m². Les villas entre CHF 1'800'000.- et CHF 4'000'000.- selon l'exposition.",
    pointFort: "Vues lac, caractère résidentiel premium, tranquillité",
    terrain: "J'ai vendu un appartement rez-de-jardin à Belmont. Les acheteurs qui ciblent ce secteur savent ce qu'ils cherchent : la vue, le calme, et la qualité."
  },
  {
    slug: 'savigny',
    nom: 'Savigny',
    region: 'Arc lémanique',
    canton: 'Vaud',
    marche: "Savigny est une commune viticole des coteaux de Lavaux, reconnue pour ses vues sur le lac et son patrimoine. Elle attire des amateurs de nature et d'authenticité, avec une offre immobilière variée allant des vigneronnes rénovées aux appartements neufs.",
    prix: "Les appartements PPE entre CHF 8'000.- et CHF 10'500.- par m². Les maisons de caractère entre CHF 1'200'000.- et CHF 2'500'000.-.",
    pointFort: "Vignoble, vues lac, authenticité, Lavaux UNESCO",
    terrain: "J'ai géré une promotion d'appartements à Savigny. La commune attire autant des acquéreurs locaux que des acheteurs de la région genevoise séduits par le cadre de Lavaux."
  },
  {
    slug: 'lutry',
    nom: 'Lutry',
    region: 'Lavaux',
    canton: 'Vaud',
    marche: "Lutry est l'une des communes les plus cotées de Lavaux. Son bord du lac, son vignoble classé UNESCO et son centre historique en font une destination premium sur l'arc lémanique. Le marché y est sélectif avec des prix parmi les plus élevés du canton hors Lausanne et Pully.",
    prix: "Les appartements avec vue lac dépassent CHF 12'000.- par m². Les villas en position dominante entre CHF 2'500'000.- et CHF 6'000'000.-.",
    pointFort: "Bord du lac, Lavaux UNESCO, prestige, rareté de l'offre",
    terrain: "J'ai vendu une villa jumelée à Lutry. Le marché y est très sélectif : un bien bien présenté et juste valorisé trouve son acquéreur, mais la surestimation est sanctionnée rapidement par l'absence d'offres."
  },
  {
    slug: 'puidoux',
    nom: 'Puidoux',
    region: 'Lavaux',
    canton: 'Vaud',
    marche: "Puidoux est une commune des coteaux de Lavaux offrant des vues étendues sur le lac Léman. Le village de Chexbres, sur son territoire, est réputé pour sa position panoramique. Le marché y est stable avec une demande régulière pour les maisons de caractère et les appartements avec vue.",
    prix: "Les maisons individuelles entre CHF 1'000'000.- et CHF 2'200'000.-. Les appartements PPE entre CHF 7'500.- et CHF 10'000.- par m² selon la vue.",
    pointFort: "Vues panoramiques, Lavaux, caractère viticole, calme",
    terrain: "J'ai vendu une villa individuelle à Puidoux. La commune attire des acquéreurs qui cherchent Lavaux à des prix encore raisonnables, avant Lutry ou Chardonne."
  },
  {
    slug: 'bourg-en-lavaux',
    nom: 'Bourg-en-Lavaux',
    region: 'Lavaux',
    canton: 'Vaud',
    marche: "Bourg-en-Lavaux regroupe plusieurs villages viticoles dont Épesses, Rivaz et Saint-Saphorin. C'est le cœur du vignoble classé UNESCO. Le marché immobilier y est atypique : les maisons vigneronnes de caractère coexistent avec peu de nouvelles constructions. La rareté de l'offre soutient les prix.",
    prix: "Les maisons vigneronnes entre CHF 900'000.- et CHF 2'500'000.- selon l'état et la position. Les appartements PPE rarissimes, souvent plus de CHF 10'000.- par m².",
    pointFort: "Lavaux UNESCO, vignoble historique, rareté, caractère patrimonial",
    terrain: "J'ai vendu une maison vigneronne à Bourg-en-Lavaux. Ces biens sont rares et demandent une expertise spécifique : l'acheteur cherche un art de vivre autant qu'un investissement."
  },
  {
    slug: 'riex',
    nom: 'Riex',
    region: 'Lavaux',
    canton: 'Vaud',
    marche: "Riex est un village viticole de Lavaux entre Épesses et Cully. Perché au-dessus du lac, il offre des vues spectaculaires sur le Léman et les Alpes. Le marché immobilier y est très confidentiel, avec peu de transactions annuelles et une forte demande pour les rares biens disponibles.",
    prix: "Les maisons vigneronnes et les propriétés de caractère entre CHF 1'200'000.- et CHF 3'000'000.- selon la position et la vue.",
    pointFort: "Vues spectaculaires, Lavaux UNESCO, exclusivité, tranquillité",
    terrain: "J'ai un mandat actif à Riex sur une maison vigneronne. Ces biens sont acquis par des amateurs de Lavaux qui ont souvent patienté des années avant de trouver le bien idéal."
  },
  {
    slug: 'forel-lavaux',
    nom: 'Forel (Lavaux)',
    region: 'Lavaux',
    canton: 'Vaud',
    marche: "Forel (Lavaux) est une commune des coteaux de Lavaux au caractère rural préservé. Elle attire des acquéreurs qui cherchent la campagne vaudoise dans un cadre viticole, à distance raisonnable de Lausanne. Le marché y est discret avec des transactions peu fréquentes.",
    prix: "Les terrains et maisons rurales entre CHF 600'000.- et CHF 1'500'000.- selon la nature et l'emplacement.",
    pointFort: "Ruralité préservée, Lavaux, prix abordables pour la région",
    terrain: "J'ai vendu un terrain à Forel (Lavaux). Les acquéreurs qui viennent dans ce secteur ont souvent un projet précis : construire ou rénover dans un cadre authentique."
  },
  {
    slug: 'dully',
    nom: 'Dully',
    region: 'La Côte',
    canton: 'Vaud',
    marche: "Dully est une commune résidentielle de La Côte entre Morges et Nyon. Elle offre un cadre tranquille à proximité du lac et des axes de communication. Le marché y est régulier, avec une demande familiale pour les maisons mitoyennes et individuelles.",
    prix: "Les maisons mitoyennes entre CHF 1'200'000.- et CHF 1'800'000.-. Les villas individuelles entre CHF 1'500'000.- et CHF 2'800'000.-.",
    pointFort: "Calme, proximité lac, La Côte, accessibilité genevoise",
    terrain: "J'ai vendu une maison mitoyenne à Dully. La commune attire des familles qui cherchent La Côte sans payer les prix de Rolle ou de Nyon."
  },
  {
    slug: 'longirod',
    nom: 'Longirod',
    region: 'La Côte',
    canton: 'Vaud',
    marche: "Longirod est une commune rurale du Pied du Jura vaudois, sur les hauteurs de La Côte. Elle offre un cadre naturel exceptionnel avec des vues étendues. Le marché y est atypique : des propriétés de caractère dans un environnement préservé, à des prix encore accessibles.",
    prix: "Les appartements de qualité entre CHF 600'000.- et CHF 900'000.-. Les maisons rurales entre CHF 800'000.- et CHF 1'500'000.-.",
    pointFort: "Cadre naturel, vues, tranquillité, prix accessibles",
    terrain: "J'ai un mandat actif à Longirod sur un appartement 3.5 pièces. Les acheteurs de ce secteur cherchent l'authenticité et la nature, souvent avec un projet de vie différent."
  },
  {
    slug: 'tartegnin',
    nom: 'Tartegnin',
    region: 'La Côte',
    canton: 'Vaud',
    marche: "Tartegnin est un petit village viticole de La Côte au cadre préservé. Sa proximité avec le lac et les vignobles en fait une adresse recherchée par ceux qui veulent La Côte à l'écart des grandes communes. Le marché y est très confidentiel.",
    prix: "Les maisons villageoises entre CHF 1'200'000.- et CHF 2'000'000.- selon l'état et la position.",
    pointFort: "Village viticole préservé, proximité lac, exclusivité",
    terrain: "J'ai un mandat actif à Tartegnin sur une maison villageoise. Ces biens atypiques nécessitent une présentation soignée et une clientèle ciblée."
  },
  {
    slug: 'gilly',
    nom: 'Gilly',
    region: 'La Côte',
    canton: 'Vaud',
    marche: "Gilly est une commune viticole de La Côte entre Rolle et Nyon. Elle offre un cadre authentique dans les vignes avec une vue sur le lac. Le marché y est calme, avec des transactions régulières pour les maisons villageoises.",
    prix: "Les maisons villageoises entre CHF 750'000.- et CHF 1'500'000.- selon l'état et la surface.",
    pointFort: "Vignoble, authenticité, prix accessibles pour La Côte",
    terrain: "J'ai vendu une maison villageoise à Gilly. La commune est appréciée par des acquéreurs qui veulent La Côte sans les prix de Rolle ou de Nyon."
  },
  {
    slug: 'crans-pres-celigny',
    nom: 'Crans-près-Céligny',
    region: 'La Côte',
    canton: 'Vaud',
    marche: "Crans-près-Céligny est une commune de La Côte à la frontière genevoise, dans un secteur très prisé des résidents genevois. Sa proximité immédiate avec Genève et son cadre résidentiel de qualité en font une adresse premium. Le marché y est soutenu par une demande internationale.",
    prix: "Les maisons villageoises avec vue lac entre CHF 1'500'000.- et CHF 3'500'000.-. Les appartements PPE rares, souvent plus de CHF 10'000.- par m².",
    pointFort: "Frontière genevoise, demande internationale, vue lac, cadre premium",
    terrain: "J'ai vendu une maison villageoise avec vue lac à Crans-près-Céligny. Ce secteur attire une clientèle internationale qui connaît bien le marché et négocie avec précision."
  },
  {
    slug: 'begnins',
    nom: 'Begnins',
    region: 'La Côte',
    canton: 'Vaud',
    marche: "Begnins est une commune viticole des coteaux de La Côte avec des vues sur le lac Léman. Elle offre un cadre calme et authentique à quelques minutes de Nyon. Le marché y est régulier, avec une demande pour les appartements PPE et les maisons de village.",
    prix: "Les appartements PPE entre CHF 7'000.- et CHF 9'000.- par m². Les maisons entre CHF 1'000'000.- et CHF 1'800'000.-.",
    pointFort: "Vignoble, vues lac, calme, proximité Nyon",
    terrain: "J'ai vendu un appartement PPE 3.5 pièces à Begnins. La commune attire des acquéreurs qui cherchent Nyon à des prix plus doux."
  },
  {
    slug: 'trelex',
    nom: 'Trélex',
    region: 'La Côte',
    canton: 'Vaud',
    marche: "Trélex est un village préservé du Pied du Jura vaudois sur La Côte, offrant un cadre rural avec vue sur le lac. Le marché y est atypique avec peu de transactions annuelles. Les propriétés de caractère y sont recherchées par des acquéreurs qui privilégient l'authenticité.",
    prix: "Les chalets et maisons rurales entre CHF 800'000.- et CHF 1'800'000.- selon la nature et l'état.",
    pointFort: "Authenticité, vue lac, Pied du Jura, calme",
    terrain: "J'ai vendu un chalet en DDP à Trélex. Des biens atypiques qui nécessitent une expertise spécifique sur les droits de superficie et la valorisation des biens ruraux."
  },
  {
    slug: 'prevezenges',
    nom: 'Préverenges',
    region: 'Arc lémanique',
    canton: 'Vaud',
    marche: "Préverenges est une commune balnéaire entre Morges et Lausanne, avec une plage publique et un cadre de vie apprécié. Elle attire des familles et des actifs qui veulent la proximité du lac sans les prix de Lausanne ou Morges. Le marché y est actif, notamment pour les appartements.",
    prix: "Les appartements PPE entre CHF 8'000.- et CHF 10'500.- par m² selon la vue et l'étage. Les maisons entre CHF 1'300'000.- et CHF 2'200'000.-.",
    pointFort: "Bord du lac, plage, calme, entre Lausanne et Morges",
    terrain: "J'ai vendu un appartement PPE à Préverenges. La commune est systématiquement dans la liste des acquéreurs qui cherchent l'arc lémanique avec accès au lac."
  },
  {
    slug: 'vers-chez-les-blancs',
    nom: 'Vers-chez-les-Blancs',
    region: 'Arc lémanique',
    canton: 'Vaud',
    marche: "Vers-chez-les-Blancs est une commune forestière sur les hauteurs de Lausanne, offrant un cadre naturel exceptionnel avec des vues sur le lac et les Alpes. Le marché y est très confidentiel, avec des propriétés d'exception qui se vendent rarement mais se valorisent bien.",
    prix: "Les villas de standing entre CHF 2'000'000.- et CHF 5'000'000.- selon la surface et la vue.",
    pointFort: "Exclusivité, cadre naturel exceptionnel, vues, proximité Lausanne",
    terrain: "J'ai vendu une villa individuelle avec piscine à Vers-chez-les-Blancs. Ces biens d'exception demandent une mise en valeur soignée et une clientèle ultra-ciblée."
  },
  {
    slug: 'montheron',
    nom: 'Montheron',
    region: 'Arc lémanique',
    canton: 'Vaud',
    marche: "Montheron est une commune forestière au-dessus de Lausanne, dans un cadre naturel préservé. Elle abrite notamment l'ancienne abbaye de Montheron et offre un environnement atypique. Le marché y est très rare, avec des biens de caractère qui suscitent un intérêt particulier.",
    prix: "Les propriétés de caractère entre CHF 1'200'000.- et CHF 3'000'000.- selon la nature et l'état.",
    pointFort: "Nature, exclusivité, authenticité, proximité Lausanne",
    terrain: "J'ai vendu une ancienne ferme à Montheron. Ces biens de caractère hors normes nécessitent une mise en valeur narrative et une clientèle qui cherche l'exceptionnel."
  },
  {
    slug: 'mex',
    nom: 'Mex',
    region: 'Gros-de-Vaud',
    canton: 'Vaud',
    marche: "Mex est une commune rurale du Gros-de-Vaud au cadre agricole préservé. Elle offre l'espace et la tranquillité à un prix nettement inférieur à l'arc lémanique. Le marché y est peu actif mais régulier, avec une demande pour les maisons villageoises.",
    prix: "Les maisons villageoises entre CHF 700'000.- et CHF 1'300'000.- selon l'état et la surface.",
    pointFort: "Ruralité, espace, prix accessibles, tranquillité",
    terrain: "J'ai vendu une maison villageoise à Mex. Les acheteurs du Gros-de-Vaud profond cherchent avant tout l'espace et l'authenticité à budget maîtrisé."
  },
  {
    slug: 'senarclens',
    nom: 'Senarclens',
    region: 'Gros-de-Vaud',
    canton: 'Vaud',
    marche: "Senarclens est une commune rurale du Gros-de-Vaud qui offre la campagne vaudoise à une vingtaine de minutes de Lausanne. Le marché immobilier y est discret, avec des maisons individuelles qui attirent des familles cherchant l'espace sans s'éloigner.",
    prix: "Les maisons individuelles entre CHF 800'000.- et CHF 1'500'000.- selon la surface et l'état.",
    pointFort: "Campagne, espace, calme, accessibilité prix",
    terrain: "J'ai vendu une maison individuelle à Senarclens. Ce profil d'acquéreur cherche à optimiser la surface habitable et le terrain dans un budget raisonnable."
  },
  {
    slug: 'vufflens-la-ville',
    nom: 'Vufflens-la-Ville',
    region: 'Gros-de-Vaud',
    canton: 'Vaud',
    marche: "Vufflens-la-Ville est une commune paisible du Gros-de-Vaud, connue notamment pour le Château de Vufflens. Elle attire des familles cherchant l'espace et un cadre de vie champêtre à distance raisonnable de Lausanne et Morges.",
    prix: "Les villas individuelles entre CHF 1'000'000.- et CHF 2'000'000.-. Les maisons de village entre CHF 800'000.- et CHF 1'400'000.-.",
    pointFort: "Cadre champêtre, château, calme, espace",
    terrain: "J'ai vendu une villa individuelle à Vufflens-la-Ville. La commune est appréciée par des familles qui cherchent le Gros-de-Vaud avec un cadre un peu plus bourgeois."
  },
  {
    slug: 'golion',
    nom: 'Golion',
    region: 'Gros-de-Vaud',
    canton: 'Vaud',
    marche: "Golion est un village du Gros-de-Vaud au caractère rural authentique. Le marché immobilier y est très confidentiel, avec des transactions rares. Les appartements en promotion et les maisons de village constituent l'essentiel de l'offre.",
    prix: "Les appartements PPE entre CHF 5'500.- et CHF 7'500.- par m². Les maisons rurales entre CHF 700'000.- et CHF 1'200'000.-.",
    pointFort: "Authenticité rurale, prix accessibles, calme",
    terrain: "J'ai vendu un appartement PPE rez-de-chaussée à Golion. Les communes du Gros-de-Vaud profond demandent un réseau local solide pour trouver les bons acquéreurs."
  },
  {
    slug: 'allens',
    nom: 'Allens',
    region: 'Gros-de-Vaud',
    canton: 'Vaud',
    marche: "Allens est une petite commune agricole du Gros-de-Vaud. Le marché y est extrêmement discret, avec des transactions rares essentiellement liées à des promotions ponctuelles ou des ventes familiales.",
    prix: "Les appartements PPE issus de petites promotions entre CHF 5'500.- et CHF 7'000.- par m².",
    pointFort: "Prix accessibles, cadre agricole, tranquillité",
    terrain: "J'ai géré la vente d'appartements dans une promotion à Allens. Ces petites communes du Gros-de-Vaud demandent un marketing ciblé et des acquéreurs locaux bien identifiés."
  },
  {
    slug: 'bougy-villars',
    nom: 'Bougy-Villars',
    region: 'La Côte',
    canton: 'Vaud',
    marche: "Bougy-Villars est une commune des coteaux de La Côte offrant des vues sur le lac Léman et les Alpes. Son terrain de golf et son cadre verdoyant attirent une clientèle aisée. Le marché y est discret, avec des maisons de caractère qui se vendent à des prix premium pour la région.",
    prix: "Les maisons villageoises et de caractère entre CHF 1'200'000.- et CHF 2'500'000.- selon la position et la vue.",
    pointFort: "Golf, vues lac, cadre verdoyant, clientèle aisée",
    terrain: "J'ai vendu une maison villageoise à Bougy-Villars. La commune attire des acquéreurs qui cherchent La Côte avec un terrain de golf à disposition."
  },
  {
    slug: 'glion',
    nom: 'Glion',
    region: 'Riviera',
    canton: 'Vaud',
    marche: "Glion est perché au-dessus de Montreux, accessible par un funiculaire historique. La commune offre des vues spectaculaires sur le lac Léman et abrite notamment l'Institut Glion. Le marché immobilier y est très sélectif, avec des biens rares et une clientèle internationale.",
    prix: "Les appartements de standing entre CHF 10'000.- et CHF 14'000.- par m². Les propriétés de caractère peuvent dépasser CHF 3'000'000.-.",
    pointFort: "Vues exceptionnelles, exclusivité, clientèle internationale, Riviera",
    terrain: "J'ai un immeuble locatif actif à Glion. Ce secteur de la Riviera vaudoise attire des investisseurs patrimoniaux qui cherchent la sécurité d'un actif de rareté."
  },
  {
    slug: 'granges-veveyse',
    nom: 'Granges (Veveyse)',
    region: 'Veveyse',
    canton: 'Vaud',
    marche: "Granges dans la Veveyse est une commune tranquille du canton de Fribourg limitrophe du Vaud, à proximité de Châtel-Saint-Denis. Elle offre un cadre rural et verdoyant avec des prix encore accessibles. La demande y est portée par des familles cherchant l'espace dans un environnement préservé.",
    prix: "Les villas entre CHF 900'000.- et CHF 1'500'000.-. Les maisons rurales entre CHF 700'000.- et CHF 1'200'000.-.",
    pointFort: "Nature, calme, prix accessibles, entre Vaud et Fribourg",
    terrain: "J'ai vendu une villa individuelle à Granges. Ce secteur de la Veveyse attire des acquéreurs qui cherchent la campagne à budget maîtrisé, souvent avec des projets de renovation."
  },
  {
    slug: 'yvonand',
    nom: 'Yvonand',
    region: 'Nord vaudois',
    canton: 'Vaud',
    marche: "Yvonand est une commune au bord du lac de Neuchâtel dans le nord vaudois. Elle offre un cadre lacustre et tranquille avec des prix encore accessibles par rapport à l'arc lémanique. La demande y est régulière pour les maisons familiales avec terrain.",
    prix: "Les maisons individuelles entre CHF 900'000.- et CHF 1'600'000.-. Les appartements PPE entre CHF 5'500.- et CHF 7'500.- par m².",
    pointFort: "Lac de Neuchâtel, calme, prix accessibles, espace",
    terrain: "J'ai un mandat actif à Yvonand sur une maison de caractère. Le nord vaudois offre encore des opportunités réelles pour les acheteurs qui ne sont pas contraints par la proximité genevoise."
  },
]

// Fusionner avec les communes principales
export const COMMUNES_SEO_ALL: CommuneSEO[] = [...COMMUNES_SEO, ...COMMUNES_SEO_EXTRA]
