// ─── TYPES ──────────────────────────────────────────────────────────────────
export type Mandat = {
  id: number
  slug: string
  titre: string
  lieu: string
  prix: string
  pieces: string
  surface: string
  terrain: string
  categorie: 'en_vente' | 'vendu' | 'reserve'
  img: string
  photos: string[]
  description: string
}

export type Article = {
  slug: string
  titre: string
  chapeau: string
  date: string
  categorie: string
  contenu: string
  cta: string
}

// ─── MANDATS ────────────────────────────────────────────────────────────────
export const MANDATS: Mandat[] = [
  {
    id: 18, slug: 'villa-morges', titre: 'Villa familiale', lieu: 'Morges',
    prix: "1'790'000", pieces: '5', surface: '148 m²', terrain: '808 m²', categorie: 'en_vente',
    img: '/photos/morges-fauvette/drone_facade.jpg',
    photos: ['/photos/morges-fauvette/drone_facade.jpg','/photos/morges-fauvette/drone_lac.jpg','/photos/morges-fauvette/drone_quartier.jpg','/photos/morges-fauvette/salon.jpg','/photos/morges-fauvette/cuisine.jpg','/photos/morges-fauvette/chambre_combles1.jpg','/photos/morges-fauvette/chambre_combles2.jpg','/photos/morges-fauvette/sdb.jpg','/photos/morges-fauvette/chambre_rez.jpg','/photos/morges-fauvette/bureau.jpg','/photos/morges-fauvette/jardin.jpg'],
    description: "Villa familiale de 5 pièces à Morges, sur une parcelle arborée de 808 m². Quatre chambres, trois salles d'eau, double garage. Triple orientation sud, est et ouest. CHF 380'800.- de travaux documentés depuis l'acquisition. Vue sur le lac Léman depuis l'étage."
  },
  {
    id: 5, slug: 'villa-cossonay', titre: 'Villa jumelée', lieu: 'Cossonay-Ville',
    prix: "1'450'000", pieces: '5.5', surface: '-', terrain: '-', categorie: 'en_vente',
    img: '/photos/cossonay/DJI_20260304145633_0009_D.jpg',
    photos: ['/photos/cossonay/DJI_20260304145633_0009_D.jpg','/photos/cossonay/DJI_20260304150013_0015_D.jpg','/photos/cossonay/IMG_7366.jpg','/photos/cossonay/Cuisine_lumineuse_avec_vue_sur_le_jardin.png','/photos/cossonay/Chambre_d_attic_chaleureuse_et_lumineuse.png','/photos/cossonay/Salle_de_bains_sous_les_combles.png','/photos/cossonay/ChatGPT_Image_19_mars_2026__10_29_05.png'],
    description: "Villa jumelée de 5.5 pièces à Cossonay-Ville, avec vue dégagée sur le Jura et les Alpes. Jardin plat, véranda, calme absolu en bordure de campagne. Brochure et visite sur demande."
  },
  {
    id: 1, slug: 'maison-yverdon', titre: 'Maison individuelle', lieu: 'Yverdon-les-Bains',
    prix: "2'290'000", pieces: '8.5', surface: '240 m²', terrain: "1'260 m²", categorie: 'en_vente',
    img: '/photos/yverdon/IMG_5987.jpg',
    photos: ['/photos/yverdon/IMG_5987.jpg','/photos/yverdon/IMG_5989.jpg','/photos/yverdon/IMG_5990.jpg','/photos/yverdon/IMG_5993.jpg','/photos/yverdon/IMG_5994.jpg','/photos/yverdon/IMG_6001.jpg','/photos/yverdon/IMG_6002.jpg','/photos/yverdon/IMG_6003.jpg','/photos/yverdon/IMG_6006.jpg','/photos/yverdon/IMG_6010.jpg','/photos/yverdon/IMG_6012.jpg','/photos/yverdon/IMG_6013.jpg','/photos/yverdon/IMG_6014.jpg','/photos/yverdon/IMG_6017.jpg','/photos/yverdon/IMG_6019.jpg','/photos/yverdon/IMG_6022.jpg','/photos/yverdon/IMG_6025.jpg'],
    description: "Implantée sur une parcelle de plus de 1'260 m² à Yverdon-les-Bains, cette maison individuelle de 8.5 pièces offre 240 m² habitables. Volumes généreux, jardin arboré et potentiel d'agrandissement d'environ 524 m². Proximité immédiate des thermes et de toutes les commodités."
  },
  {
    id: 8, slug: 'maison-gland-buis', titre: 'Maison jumelée', lieu: 'Gland',
    prix: "2'750'000", pieces: '-', surface: '-', terrain: '-', categorie: 'en_vente',
    img: '/photos/gland-buis/DJI_20260115164414_0005_D.jpg',
    photos: ['/photos/gland-buis/DJI_20260115164414_0005_D.jpg','/photos/gland-buis/IMG_6123.jpg','/photos/gland-buis/IMG_6129.jpg','/photos/gland-buis/IMG_6134.jpg','/photos/gland-buis/IMG_6137.jpg','/photos/gland-buis/IMG_6140.jpg','/photos/gland-buis/IMG_6141.jpg','/photos/gland-buis/IMG_6143.jpg','/photos/gland-buis/IMG_6147.jpg','/photos/gland-buis/IMG_6148.jpg','/photos/gland-buis/IMG_6150.jpg','/photos/gland-buis/IMG_6151.jpg','/photos/gland-buis/IMG_6152.jpg','/photos/gland-buis/IMG_6153.jpg','/photos/gland-buis/IMG_6154.jpg','/photos/gland-buis/IMG_6155.jpg'],
    description: "Maison jumelée d'exception à Gland. Architecture contemporaine, volumes généreux et finitions soignées. Terrasse, jardin privatif et vue dégagée."
  },
  {
    id: 2, slug: 'immeuble-lausanne-vallon', titre: 'Immeuble de rendement', lieu: 'Lausanne',
    prix: "6'000'000", pieces: '-', surface: '520 m²', terrain: '-', categorie: 'en_vente',
    img: '/photos/lausanne-vallon/DJI_20260116105551_0007_D.jpg',
    photos: ['/photos/lausanne-vallon/DJI_20260116105551_0007_D.jpg','/photos/lausanne-vallon/IMG_6521.jpg','/photos/lausanne-vallon/IMG_6523.jpg','/photos/lausanne-vallon/IMG_6524.jpg','/photos/lausanne-vallon/IMG_6525.jpg','/photos/lausanne-vallon/IMG_6526.jpg'],
    description: "Immeuble de rendement idéalement situé à Lausanne. Surface locative d'environ 520 m². Revenus locatifs stables. Détails sur demande."
  },
  {
    id: 3, slug: 'immeuble-glion', titre: 'Immeuble locatif', lieu: 'Glion',
    prix: "2'420'000", pieces: '-', surface: '-', terrain: '-', categorie: 'en_vente',
    img: '/photos/glion/dji_fly_20260305_135802_0017_1772715631429_photo.jpg',
    photos: ['/photos/glion/dji_fly_20260305_135802_0017_1772715631429_photo.jpg','/photos/glion/IMG_6931.jpg','/photos/glion/20250319_144034_resized.jpg','/photos/glion/20250319_144052_resized.jpg','/photos/glion/20250319_144202_resized.jpg','/photos/glion/20250319_144211_resized.jpg','/photos/glion/20250319_144301_resized.jpg','/photos/glion/20250319_144317_resized.jpg','/photos/glion/20250319_144326_resized.jpg','/photos/glion/20250319_144336_resized.jpg','/photos/glion/20250319_144425_resized.jpg','/photos/glion/20250319_144456_resized.jpg','/photos/glion/Salle_de_bains_moderne_et_\u00e9pur\u00e9e.png'],
    description: "Immeuble locatif situé à Glion, dans un cadre exceptionnel surplombant le Léman. Vue panoramique sur le lac et les Alpes."
  },
  {
    id: 4, slug: 'immeuble-lausanne-levant', titre: 'Immeuble locatif', lieu: 'Lausanne',
    prix: "1'790'000", pieces: '-', surface: '-', terrain: '-', categorie: 'reserve',
    img: '/photos/lausanne-levant/IMG_6321.jpg',
    photos: ['/photos/lausanne-levant/IMG_6321.jpg','/photos/lausanne-levant/IMG_6329.jpg','/photos/lausanne-levant/IMG_6331.jpg','/photos/lausanne-levant/IMG_6332.jpg','/photos/lausanne-levant/IMG_6341.jpg','/photos/lausanne-levant/IMG_6342.jpg','/photos/lausanne-levant/IMG_6343.jpg','/photos/lausanne-levant/IMG_6346.jpg','/photos/lausanne-levant/IMG_6349.jpg','/photos/lausanne-levant/IMG_6356.jpg','/photos/lausanne-levant/IMG_6357.jpg','/photos/lausanne-levant/IMG_6528.jpg'],
    description: "Immeuble de trois logements à Lausanne. Bien réservé, signature notariale en cours."
  },
  {
    id: 6, slug: 'appartement-epalinges', titre: 'Appartement PPE', lieu: 'Epalinges',
    prix: "1'090'000", pieces: '4', surface: '-', terrain: '-', categorie: 'en_vente',
    img: '', photos: [],
    description: "Appartement PPE de 4 pièces à Epalinges. Détails et photos à venir."
  },
  {
    id: 7, slug: 'appartement-lemont', titre: 'Appartement PPE', lieu: 'Le Mont-sur-Lausanne',
    prix: "930'000", pieces: '-', surface: '-', terrain: '-', categorie: 'en_vente',
    img: '/photos/lemont/IMG_4544.jpg',
    photos: ['/photos/lemont/IMG_4542.jpg','/photos/lemont/IMG_4543.jpg','/photos/lemont/IMG_4544.jpg','/photos/lemont/IMG_4545.jpg','/photos/lemont/IMG_4547.jpg','/photos/lemont/IMG_4550.jpg','/photos/lemont/IMG_4552.jpg','/photos/lemont/IMG_4557.jpg','/photos/lemont/IMG_4559.jpg'],
    description: "Appartement PPE au Mont-sur-Lausanne, dans un cadre résidentiel prisé. Lumineux et fonctionnel, avec vue dégagée sur la campagne environnante."
  },
  {
    id: 9, slug: 'maison-tartegnin', titre: 'Maison villageoise', lieu: 'Tartegnin',
    prix: "1'660'000", pieces: '-', surface: '-', terrain: '-', categorie: 'en_vente',
    img: '/photos/tartegnin/Retouch\u00e9es__1_.jpg',
    photos: ['/photos/tartegnin/Retouch\u00e9es__1_.jpg','/photos/tartegnin/IMG_5604.jpg','/photos/tartegnin/IMG_5745.jpg','/photos/tartegnin/IMG_5746.jpg','/photos/tartegnin/IMG_5747.jpg','/photos/tartegnin/IMG_5748.jpg','/photos/tartegnin/IMG_5749.jpg','/photos/tartegnin/IMG_5750.jpg','/photos/tartegnin/IMG_5752.jpg','/photos/tartegnin/IMG_5755.jpg'],
    description: "Maison villageoise de charme à Tartegnin, au coeur du vignoble de La Côte. Vue lac, piscine, jardin généreux et combles aménagés avec goût. Un cadre de vie rare entre village et nature."
  },
  {
    id: 10, slug: 'maison-dully', titre: 'Maison mitoyenne', lieu: 'Dully',
    prix: "1'590'000", pieces: '-', surface: '-', terrain: '-', categorie: 'vendu',
    img: '/photos/dully/1775578068436_photo1.jpg',
    photos: ['/photos/dully/1775578068436_photo1.jpg','/photos/dully/1775578068436_IMG_5408.jpg','/photos/dully/1775578068437_IMG_5410.jpg','/photos/dully/1775578068437_IMG_5412.jpg','/photos/dully/1775578068432_IMG_5414.jpg','/photos/dully/1775578068432_IMG_5415.jpg','/photos/dully/1775578068433_IMG_5417.jpg','/photos/dully/1775578068433_IMG_5418.jpg','/photos/dully/1775578068434_IMG_5420.jpg','/photos/dully/1775578068434_IMG_5422.jpg','/photos/dully/1775578068434_IMG_5423.jpg','/photos/dully/1775578068434_IMG_5426.jpg','/photos/dully/1775578068435_IMG_5431.jpg','/photos/dully/1775578068435_IMG_5432.jpg','/photos/dully/1775578068435_IMG_5434.jpg','/photos/dully/1775578068436_IMG_5435.jpg','/photos/dully/1775578068436_Bathroom_resized_5712x4284__1_.png'],
    description: "Maison mitoyenne à Dully, village prisé de La Côte. Détails et photos à venir."
  },
  {
    id: 11, slug: 'appartement-gland-aubepine', titre: 'Appartement', lieu: 'Gland',
    prix: "1'250'000", pieces: '-', surface: '-', terrain: '-', categorie: 'en_vente',
    img: '/photos/gland-aubepine/DJI_20260115163614_0002_D.jpg',
    photos: ['/photos/gland-aubepine/DJI_20260115163614_0002_D.jpg','/photos/gland-aubepine/IMG_5513.jpg','/photos/gland-aubepine/IMG_5514.jpg','/photos/gland-aubepine/IMG_5515.jpg','/photos/gland-aubepine/IMG_5517.jpg','/photos/gland-aubepine/IMG_5518.jpg','/photos/gland-aubepine/IMG_5520.jpg','/photos/gland-aubepine/IMG_5523.jpg','/photos/gland-aubepine/IMG_5524.jpg','/photos/gland-aubepine/IMG_5526.jpg','/photos/gland-aubepine/IMG_5527.jpg','/photos/gland-aubepine/IMG_5531.jpg','/photos/gland-aubepine/IMG_5532.jpg'],
    description: "Appartement spacieux à Gland. Terrasse, vue dégagée et prestations de qualité dans un quartier résidentiel calme."
  },
  {
    id: 12, slug: 'appartement-longirod', titre: 'Appartement', lieu: 'Longirod',
    prix: "795'000", pieces: '-', surface: '-', terrain: '-', categorie: 'en_vente',
    img: '/photos/longirod/DJI_20260119103256_0010_D.jpg',
    photos: ['/photos/longirod/DJI_20260119103256_0010_D.jpg','/photos/longirod/DJI_20260119103443_0013_D.jpg','/photos/longirod/IMG_4968.jpg','/photos/longirod/IMG_4970.jpg','/photos/longirod/IMG_4971.jpg','/photos/longirod/IMG_4972.jpg','/photos/longirod/IMG_4974.jpg','/photos/longirod/IMG_4975.jpg','/photos/longirod/IMG_4976.jpg','/photos/longirod/IMG_4980.jpg','/photos/longirod/IMG_4983.jpg'],
    description: "Appartement lumineux à Longirod, au pied du Jura. Cadre verdoyant, vue sur la campagne et les Alpes. Cheminée, balcon et ambiance chaleureuse."
  },
  {
    id: 13, slug: 'maison-senarclens', titre: 'Maison individuelle', lieu: 'Senarclens',
    prix: "1'500'000", pieces: '-', surface: '-', terrain: '-', categorie: 'vendu',
    img: '/photos/senarclens/1775570719205_IMG_5840.jpg',
    photos: ['/photos/senarclens/1775570719205_IMG_5840.jpg','/photos/senarclens/1775570719205_IMG_5837.jpg','/photos/senarclens/1775570719213_IMG_5843.jpg','/photos/senarclens/1775570719213_IMG_5844.jpg','/photos/senarclens/1775570719215_IMG_5846.jpg','/photos/senarclens/1775570719216_IMG_5847.jpg','/photos/senarclens/1775570719216_IMG_5848.jpg','/photos/senarclens/1775570719217_IMG_5849.jpg','/photos/senarclens/1775570719217_IMG_5850.jpg','/photos/senarclens/1775570719218_IMG_5851.jpg','/photos/senarclens/1775570719218_IMG_5852.jpg','/photos/senarclens/1775570719219_IMG_5853.jpg','/photos/senarclens/1775570719219_IMG_5854.jpg'],
    description: "Maison individuelle vendue à Senarclens. Piscine, grand jardin et vue panoramique sur le Gros-de-Vaud. Transaction conclue avec succès."
  },
  {
    id: 14, slug: 'immeuble-lausanne-monttendre', titre: 'Immeuble 3 logements', lieu: 'Lausanne',
    prix: "1'480'000", pieces: '-', surface: '-', terrain: '-', categorie: 'vendu',
    img: '/photos/lausanne-monttendre/IMG_6530.jpg',
    photos: ['/photos/lausanne-monttendre/IMG_6530.jpg','/photos/lausanne-monttendre/IMG_6650.jpg','/photos/lausanne-monttendre/IMG_6655.jpg','/photos/lausanne-monttendre/IMG_6656.jpg','/photos/lausanne-monttendre/IMG_6657.jpg','/photos/lausanne-monttendre/IMG_6658.jpg','/photos/lausanne-monttendre/IMG_6659.jpg','/photos/lausanne-monttendre/IMG_6660.jpg','/photos/lausanne-monttendre/IMG_6662.jpg','/photos/lausanne-monttendre/IMG_6663.jpg'],
    description: "Immeuble de 3 logements à Lausanne. Transaction conclue avec succès."
  },
  {
    id: 15, slug: 'villa-crissier', titre: 'Villa individuelle', lieu: 'Crissier',
    prix: '-', pieces: '-', surface: '-', terrain: '-', categorie: 'vendu',
    img: '/photos/crissier/P1010660.jpg',
    photos: ['/photos/crissier/P1010660.jpg','/photos/crissier/P1010664.jpg','/photos/crissier/IMG_4063.jpg','/photos/crissier/IMG_4068.jpg','/photos/crissier/sejour-piscine.png','/photos/crissier/cuisine.jpg','/photos/crissier/chambre-lumineuse.jpg','/photos/crissier/chambre-combles.jpg','/photos/crissier/chambre-ado.jpg','/photos/crissier/chambre-enfant.jpg','/photos/crissier/sdb-baignoire.jpg','/photos/crissier/sdb-douche.jpg','/photos/crissier/dressing.png'],
    description: "Villa individuelle avec piscine à Crissier. Pièces de réception lumineuses avec cheminée, cuisine équipée, plusieurs chambres et salles de bains rénovées. Jardin arboré et piscine. Transaction conclue avec succès."
  },
  {
    id: 16, slug: 'maison-gilly', titre: 'Maison villageoise', lieu: 'Gilly',
    prix: '-', pieces: '-', surface: '-', terrain: '-', categorie: 'vendu',
    img: '/photos/gilly/IMG_4158__1_.jpg',
    photos: ['/photos/gilly/IMG_4158__1_.jpg','/photos/gilly/IMG_4162.jpg','/photos/gilly/IMG_4165.jpg','/photos/gilly/IMG_4169.jpg','/photos/gilly/IMG_4170.jpg','/photos/gilly/IMG_4173.jpg','/photos/gilly/IMG_4174.jpg','/photos/gilly/IMG_4176.jpg','/photos/gilly/IMG_4177.jpg','/photos/gilly/IMG_4179.jpg','/photos/gilly/IMG_4180.jpg','/photos/gilly/IMG_4183.jpg'],
    description: "Maison villageoise de caractère à Gilly, au coeur du vignoble de La Côte. Murs crépis, tomettes, poutres apparentes et poêle à bois. Terrasse sur les toits et volumes atypiques. Transaction conclue avec succès."
  },
  {
    id: 17, slug: 'maison-jouxtens', titre: 'Maison individuelle', lieu: 'Jouxtens-Mézery',
    prix: '-', pieces: '-', surface: '-', terrain: '-', categorie: 'vendu',
    img: '/photos/jouxtens/jouxtens_10.jpg',
    photos: ['/photos/jouxtens/jouxtens_10.jpg','/photos/jouxtens/jouxtens_09.jpg','/photos/jouxtens/jouxtens_12.jpg','/photos/jouxtens/jouxtens_01.jpg','/photos/jouxtens/jouxtens_05.jpg','/photos/jouxtens/jouxtens_04.jpg','/photos/jouxtens/jouxtens_03.jpg','/photos/jouxtens/jouxtens_07.jpg','/photos/jouxtens/jouxtens_11.jpg','/photos/jouxtens/jouxtens_08.jpg','/photos/jouxtens/jouxtens_06.jpg','/photos/jouxtens/jouxtens_02.jpg'],
    description: "Maison individuelle à Jouxtens-Mézery, commune résidentielle prisée aux portes de Lausanne. Transaction conclue avec succès."
  },
  {
    id: 19, slug: 'maison-riex', titre: 'Maison vigneronne', lieu: 'Riex, Lavaux',
    prix: "1'450'000", pieces: '2.5', surface: '100 m²', terrain: '39 m²', categorie: 'en_vente',
    img: '/photos/riex/drone-facade.jpg',
    photos: ['/photos/riex/drone-facade.jpg','/photos/riex/drone-lac-panorama.jpg','/photos/riex/drone-lac-alpes.jpg','/photos/riex/drone-village.jpg','/photos/riex/salon.jpg','/photos/riex/cuisine.jpg','/photos/riex/salle-de-bains.jpg','/photos/riex/sauna.jpg','/photos/riex/sauna-douche.jpg'],
    description: "Au coeur du village de Riex, dans le périmètre UNESCO de Lavaux, cette maison vigneronne de 1680 entièrement rénovée en 1989 déploie ses 100 m² habitables sur quatre niveaux. Séjour lumineux avec double hauteur, cuisine ouverte avec accès balcon, chambre au dernier étage avec vide sur séjour et salle de bains moderne sous vélux. Sauna privatif au sous-sol, deux places de parking couvert. La porte de la façade sud est classée monument historique. Vue sur les toits, le lac Léman et les Alpes."
  },
]

// ─── ARTICLES ───────────────────────────────────────────────────────────────
export const ARTICLES: Article[] = [
  {
    slug: 'estimer-son-bien-canton-de-vaud',
    titre: 'Comment estimer la valeur de votre bien dans le Canton de Vaud',
    chapeau: "Valeur intrinsèque, valeur de rendement, valeur vénale : trois approches complémentaires pour fixer un prix juste. Voici comment un courtier professionnel procède.",
    date: '2026-01-15',
    categorie: 'Estimation',
    contenu: `Fixer le bon prix de vente, c'est probablement la décision la plus importante de tout le processus. Trop haut, votre bien reste sur le marché et perd en attractivité. Trop bas, vous laissez de l'argent sur la table.

Dans le Canton de Vaud, une estimation sérieuse repose sur trois piliers.

La valeur intrinsèque part de la valeur ECA (Etablissement cantonal d'assurance) de votre bâtiment, à laquelle on applique un facteur de vétusté. On y ajoute la valeur du terrain selon les prix au m² de la commune. C'est le coût de reconstruction, pas le prix du marché.

La valeur de rendement concerne surtout les immeubles locatifs. Elle se calcule en divisant le revenu locatif net par un taux de capitalisation. À Lausanne, ce taux tourne autour de 3.5 à 4.5% selon l'emplacement et l'état du bien. Plus le taux est bas, plus la valeur est élevée.

La valeur vénale, c'est la synthèse. Elle pondère les deux approches précédentes en fonction du type de bien et des transactions comparables récentes dans le secteur. C'est elle qui donne le prix de mise en vente recommandé.

Ce que beaucoup de propriétaires ignorent : le prix affiché sur les portails immobiliers n'est pas le prix de vente final. Dans le marché vaudois actuel, la marge de négociation se situe entre 3 et 8% selon le segment. Un courtier expérimenté intègre cette réalité dans sa recommandation de prix.

Mon conseil : méfiez-vous des estimations en ligne. Elles se basent sur des algorithmes qui ne voient ni l'état réel de votre cuisine, ni la nuisance sonore de la route voisine, ni le charme de votre vue sur le lac. Seule une visite sur place permet une estimation fiable.`,
    cta: "Vous souhaitez connaître la valeur réelle de votre bien ? Contactez-moi pour une estimation professionnelle, fondée et sans engagement."
  },
  {
    slug: 'frais-vente-immobiliere-suisse',
    titre: 'Vendre en Suisse : tous les frais à anticiper',
    chapeau: "Commission, impôt sur le gain immobilier, frais de notaire, remboursement hypothécaire... Le montant qu'il vous reste après la vente réserve parfois des surprises. Tour d'horizon.",
    date: '2026-01-29',
    categorie: 'Guide pratique',
    contenu: `Quand un propriétaire me demande "combien va me rester après la vente ?", la réponse n'est jamais simplement le prix de vente moins l'hypothèque. Voici les postes à connaître.

La commission de courtage est généralement calculée au pourcentage du prix de vente, plus TVA. Le taux varie selon le type de bien, la complexité de la vente et le niveau de service convenu. Plutôt que de se focaliser sur le pourcentage, posez-vous la question : est-ce que le courtier va obtenir un prix qui compense largement sa commission ? Point important : la commission est intégralement déductible de l'impôt sur le gain immobilier. Ce n'est donc pas une charge sèche.

L'impôt sur le gain immobilier est calculé sur la différence entre le prix de vente et le prix d'acquisition. Dans le Canton de Vaud, le taux est dégressif selon la durée de détention. Après 24 ans de propriété, le taux de base est au minimum. C'est un impôt cantonal et communal, donc le montant exact dépend de votre commune. Ce que beaucoup de vendeurs ignorent : les frais d'acquisition d'origine (droits de mutation, frais de notaire payés à l'achat), les investissements à plus-value, la commission de courtage, l'indemnité de remboursement hypothécaire et même le coût du CECB sont tous déductibles du gain imposable. En d'autres termes, plus vos frais de vente sont élevés, moins vous payez d'impôt. C'est un calcul global qu'il faut faire.

Les frais de notaire pour l'acte de vente sont à la charge de l'acquéreur dans le Canton de Vaud (environ 5% du prix). En tant que vendeur, vous n'avez normalement pas de frais notariaux, sauf cas particulier (radiation de servitudes, par exemple).

Le remboursement anticipé de l'hypothèque peut coûter cher si vous avez un taux fixe en cours. La banque facture une indemnité de sortie calculée sur le différentiel de taux et la durée restante. Bonne nouvelle : cette pénalité est déductible du gain immobilier. Demandez tout de même un chiffrage précis à votre banque avant de mettre en vente.

Les diagnostics et certificats ne sont pas obligatoires pour vendre dans le Canton de Vaud, mais un CECB (Certificat énergétique cantonal des bâtiments) est de plus en plus demandé par les acquéreurs et leurs banques. Comptez entre CHF 1'000.- et CHF 3'000.- selon la taille du bâtiment. Là aussi, le coût est déductible du gain immobilier.

Mon conseil : faites le calcul complet avant de fixer votre prix minimum. J'accompagne systématiquement mes clients dans ces démarches pour leur simplifier la vie au maximum. Entre la banque, le notaire, l'administration fiscale et les diagnostics, la vente d'un bien peut vite devenir un parcours administratif. Mon rôle, c'est aussi de vous guider là-dedans.`,
    cta: "Besoin d'y voir clair sur ce qu'il vous restera après la vente ? Contactez-moi, je vous accompagne de A à Z."
  },
  {
    slug: 'marche-immobilier-vaudois-2026',
    titre: "Marché immobilier vaudois en 2026 : ce qu'il faut savoir",
    chapeau: "Entre stabilisation des taux, rareté de l'offre et pression démographique, le marché vaudois reste un marché de vendeurs. Mais pas à n'importe quel prix.",
    date: '2026-02-26',
    categorie: 'Marché',
    contenu: `Le marché immobilier du Canton de Vaud continue de surprendre. Malgré les hausses de taux de 2023-2024, les prix n'ont pas corrigé significativement. Voici pourquoi, et ce que cela signifie si vous envisagez de vendre.

L'offre reste structurellement insuffisante. La croissance démographique du canton (+1.2% par an en moyenne) dépasse largement le rythme de construction. Le taux de vacance reste parmi les plus bas de Suisse, particulièrement sur l'arc lémanique. Conséquence : les biens bien situés et correctement pricés se vendent rapidement.

Les taux hypothécaires se sont stabilisés. Après la hausse rapide de 2023, les taux fixes à 10 ans se situent désormais autour de 1.8 à 2.2%. C'est suffisamment bas pour maintenir la demande, mais assez haut pour que les acquéreurs soient plus sélectifs qu'en 2021.

Le segment des villas est le plus tendu. Entre CHF 1'000'000.- et CHF 2'000'000.-, la demande excède largement l'offre. Les maisons individuelles avec jardin, bien entretenues, dans des communes bien desservies, trouvent preneur en quelques semaines si le prix est juste.

Les appartements PPE se vendent bien aussi, mais les acquéreurs sont plus attentifs à l'état des charges, au fonds de rénovation et à l'énergie (CECB). Un bien énergivore sans perspective de rénovation se négocie plus durement.

Les immeubles de rendement attirent toujours les investisseurs, mais les rendements se sont comprimés. À Lausanne, un rendement brut de 4% est devenu la norme pour un bien en bon état. Les acquéreurs cherchent du potentiel de revalorisation : surélévation, rénovation énergétique, optimisation locative.

Mon analyse : c'est un bon moment pour vendre si votre bien est en bon état et correctement positionné. Les vendeurs qui surcotent leur bien de 10-15% "pour voir" perdent du temps et de l'argent. Le marché est informé, les acquéreurs comparent, et un bien qui stagne perd en crédibilité.`,
    cta: "Vous vous demandez si c'est le bon moment pour vendre ? Parlons-en. Je vous donne mon avis honnête, chiffres à l'appui."
  },
  {
    slug: 'pourquoi-votre-bien-ne-se-vend-pas',
    titre: 'Pourquoi votre bien ne se vend pas (et comment y remédier)',
    chapeau: "Trois mois sur le marché sans offre sérieuse ? Le problème est presque toujours le même. Et la solution aussi.",
    date: '2026-03-12',
    categorie: 'Conseils vendeurs',
    contenu: `Après six ans de courtage dans le Canton de Vaud, je peux affirmer ceci : quand un bien ne se vend pas, la cause est dans la grande majorité des cas liée au prix ou à la présentation. Pas à la localisation, pas au marché, pas à la saison.

Voici les signaux qui ne trompent pas.

Beaucoup de visites mais aucune offre. Votre bien plaît, mais pas à ce prix. Les acquéreurs visitent, comparent, et trouvent mieux ailleurs pour le même budget. Le bien est attractif, le prix ne l'est pas.

Peu de visites et peu de clics sur les portails. Votre bien est invisible ou mal présenté. Deux causes possibles : le prix est tellement au-dessus du marché que les acquéreurs ne le regardent même pas, ou les photos et la description ne rendent pas justice au bien. Parfois les deux à la fois.

Des offres, mais toutes nettement en dessous du prix affiché. Le marché vous envoie un message clair. Quand trois acquéreurs indépendants arrivent au même chiffre, ce ne sont pas eux qui se trompent.

Votre bien est en ligne depuis plus de 60 jours. C'est un signal que beaucoup de vendeurs sous-estiment. Les portails immobiliers affichent la durée de publication. Un acquéreur qui voit un bien en ligne depuis trois mois se pose immédiatement la question : qu'est-ce qui ne va pas ? Chaque semaine supplémentaire érode la crédibilité du prix. C'est un cercle vicieux : plus le bien stagne, plus l'acquéreur se sent en position de force pour négocier.

Le piège du courtier complaisant. Certains courtiers gonflent leur estimation pour décrocher le mandat, puis proposent des baisses de prix successives. Résultat : le bien accumule les jours en ligne, et chaque acquéreur potentiel se demande "qu'est-ce qui ne va pas avec ce bien ?". C'est exactement la spirale que j'essaie d'éviter avec mes clients.

Ma méthode : je préfère perdre un mandat en donnant un prix honnête que de le gagner avec un prix irréaliste. Si votre attente de prix ne correspond pas à mon estimation, je vous le dis clairement, je vous explique pourquoi, et vous êtes libre de votre décision. Mais je ne vous laisserai pas partir sur un prix que le marché ne validera pas sans vous avoir prévenu.`,
    cta: "Votre bien est en vente depuis trop longtemps ? Contactez-moi pour une analyse de votre situation, franche et sans engagement."
  },
  {
    slug: 'choisir-son-courtier-suisse-romande',
    titre: 'Comment choisir son courtier immobilier en Suisse romande',
    chapeau: "Mandat exclusif ou non-exclusif ? Commission fixe ou au pourcentage ? Au-delà de ces questions, la seule qui compte vraiment : ce courtier va-t-il défendre votre prix comme si c'était le sien ?",
    date: '2026-02-12',
    categorie: 'Guide pratique',
    contenu: `Choisir un courtier, c'est confier un actif de plusieurs centaines de milliers de francs à quelqu'un. Pas à un algorithme. Pas à une plateforme. À une personne qui va défendre vos intérêts face à des acquéreurs bien informés et souvent bien accompagnés.

La question centrale : est-ce qu'il va se battre pour moi ? Un bon courtier ne se contente pas de publier une annonce et d'attendre les appels. Il négocie. Il tient le prix. Il filtre les offres opportunistes et sait dire non à un acquéreur qui tente sa chance 15% en dessous. Quand une offre arrive, il l'analyse, la contextualise, et vous conseille avec franchise. Demandez-lui : racontez-moi une négociation où vous avez tenu bon pour votre client. S'il n'a pas de réponse concrète, c'est un signal. Un courtier qui a l'habitude de se battre pour ses vendeurs a toujours une histoire à raconter. Et demandez-lui aussi un chiffre simple : à quel pourcentage du prix estimé vos biens se vendent-ils réellement ? C'est le meilleur indicateur de sa capacité à fixer un prix juste et à le défendre.

La connaissance du marché local est non négociable. Un courtier qui travaille entre Genève et Zurich ne connaît pas le prix au m² à Cossonay. Demandez des références de ventes récentes dans votre commune ou votre quartier. Un bon courtier les a en tête. Il connaît les acquéreurs actifs, les notaires du coin, les délais réels. C'est cette connaissance fine qui lui permet de défendre votre prix avec des arguments concrets face à un acquéreur qui négocie.

La méthode d'estimation doit être transparente. Fuyez les courtiers qui vous donnent un prix "au feeling" ou après une visite de 15 minutes. Une estimation sérieuse prend du temps : analyse du terrain, de la construction, des transactions comparables, du potentiel de rendement. Demandez un rapport écrit avec des calculs vérifiables. Et méfiez-vous du piège classique : le courtier qui surestime votre bien pour décrocher le mandat, puis vous propose des baisses de prix successives. Un bien qui stagne sur les portails perd en crédibilité chaque semaine. C'est votre argent qui s'évapore, pas le sien.

Le mandat exclusif n'est pas un piège. Beaucoup de vendeurs hésitent par peur d'être "coincés". En réalité, un mandat exclusif aligne vos intérêts et ceux du courtier. Il s'engage pleinement parce qu'il sait que son travail sera rémunéré. Il investit du temps, de l'énergie et des moyens dans votre vente. Un mandat non-exclusif confié à trois courtiers donne souvent trois annonces différentes avec trois prix différents. L'acquéreur ne sait plus à qui s'adresser. Le bien perd en crédibilité, et c'est votre prix qui en souffre. Un bon mandat exclusif, c'est un partenariat. Pas un enfermement.

Parlons commission. Dans le Canton de Vaud, la commission de courtage est généralement calculée au pourcentage du prix de vente, plus TVA. Certains courtiers proposent un forfait fixe. Pourquoi je ne donne pas de fourchette ici ? Parce que comparer des courtiers uniquement sur le taux, c'est comme choisir un chirurgien sur son tarif. La vraie question : qu'est-ce que ce courtier met en face de sa commission ? Est-ce qu'il se déplace à chaque visite ? Est-ce qu'il vous accompagne chez le notaire ? Est-ce qu'il sait argumenter face à un acquéreur qui négocie durement ? Et surtout : est-ce qu'il va obtenir un prix de vente qui, même après sa commission, vous laisse plus dans la poche qu'une vente mal négociée à moindres frais ? N'oubliez pas non plus que la commission est intégralement déductible de l'impôt sur le gain immobilier.

La certification USPI est un gage de professionnalisme. L'Union suisse des professionnels de l'immobilier impose à ses membres une formation continue et un code déontologique. Ce n'est pas une garantie absolue, mais c'est un filtre utile pour écarter les courtiers improvisés.

Mon conseil : rencontrez au moins deux courtiers avant de choisir. Posez-leur les mêmes questions et comparez les réponses. Le meilleur courtier n'est pas celui qui vous promet le prix le plus élevé. C'est celui qui vous explique comment il va défendre ce prix, qui a les preuves qu'il l'a déjà fait, et dont la franchise vous inspire confiance.`,
    cta: "Vous cherchez un courtier pour votre bien dans le Canton de Vaud ? Prenons 30 minutes pour en parler."
  },
  {
    slug: 'impot-gain-immobilier-vaud',
    titre: "Impôt sur le gain immobilier dans le canton de Vaud : comment ça marche ?",
    chapeau: "Taux de 30 % à 7 % selon la durée de détention, années d'occupation comptées double, déductions possibles : tout ce qu'un propriétaire vaudois doit savoir avant de vendre.",
    date: '2026-03-26',
    categorie: 'Fiscalité',
    contenu: `Dans le canton de Vaud, toute vente immobilière générant une plus-value est soumise à un impôt sur le gain immobilier. Le taux varie de 30 % (bien détenu moins d'un an) à 7 % (bien détenu plus de 24 ans). Les années d'occupation comme résidence principale comptent double dans le calcul de la durée de détention.

Cet impôt concerne tous les propriétaires privés qui vendent un bien dans le canton de Vaud, qu'il s'agisse d'une villa, d'un appartement en PPE ou d'un immeuble locatif. Il est prélevé par le canton (qui en reverse 5/12 à la commune du lieu du bien) et retenu directement par le notaire sur le prix de vente au moment de la signature de l'acte. Base légale : articles 57 à 75 de la loi du 4 juillet 2000 sur les impôts directs cantonaux (LI).

## Comment se calcule le gain immobilier ?

Le gain imposable correspond à la différence entre le prix de vente et le prix de revient du bien. Le prix de revient inclut le prix d'achat initial, les droits de mutation payés à l'acquisition, les frais de notaire, ainsi que les impenses (travaux ayant augmenté la valeur du bien, à condition qu'ils soient documentés par des factures).

**Formule :** Gain imposable = Prix de vente - Prix d'achat - Frais d'acquisition - Impenses - Commission de courtage

La commission de courtage payée lors de la vente est déductible du gain imposable.

## Quel est le barème d'imposition dans le canton de Vaud ?

Le canton de Vaud applique un taux proportionnel dégressif selon la durée de détention du bien (article 72 LI). Le taux diminue d'un point de pourcentage par année de détention, de 30 % (moins d'un an) à 7 % (24 ans et plus).

| Durée de détention | Taux d'imposition |
|---|---|
| Moins de 1 an | 30 % |
| 2 ans | 29 % |
| 3 ans | 28 % |
| 4 ans | 27 % |
| 5 ans | 26 % |
| 6 ans | 25 % |
| 7 ans | 24 % |
| 8 ans | 23 % |
| 9 ans | 22 % |
| 10 ans | 21 % |
| 11 ans | 20 % |
| 12 ans | 19 % |
| 13 ans | 18 % |
| 14 ans | 17 % |
| 15 ans | 16 % |
| 16 ans | 15 % |
| 17 ans | 14 % |
| 18 ans | 13 % |
| 19 ans | 12 % |
| 20 ans | 11 % |
| 21 ans | 10 % |
| 22 ans | 9 % |
| 23 ans | 8 % |
| 24 ans et plus | 7 % |

## Les années d'occupation comptent-elles double ?

Oui. Dans le canton de Vaud, les années durant lesquelles le propriétaire a occupé le bien comme résidence principale comptent double dans le calcul de la durée de détention. C'est un avantage fiscal significatif.

Concrètement : si vous avez acheté votre maison il y a 10 ans et que vous y avez habité durant ces 10 années, votre durée de détention fiscale est de 20 ans. Le taux applicable passe alors de 21 % (10 ans réels) à 11 % (20 ans fiscaux). Sur un gain de CHF 300'000.-, cela représente une économie d'impôt de CHF 30'000.-.

## Quelles sont les déductions admises ?

L'administration fiscale vaudoise admet plusieurs types de déductions sur le gain imposable :

- **Les impenses** : tous les travaux ayant augmenté la valeur du bien (transformation, agrandissement, rénovation énergétique). Les travaux d'entretien courant ne sont pas déductibles dans ce cadre.
- **Les frais d'acquisition** : droits de mutation payés à l'achat, frais de notaire, émoluments du registre foncier.
- **Les frais de vente** : commission de courtage, frais de publicité, frais de notaire liés à la vente.
- **L'estimation fiscale historique** : si le bien a été acquis il y a plus de 10 ans, l'estimation fiscale de l'immeuble 10 ans avant le transfert peut remplacer le prix de revient, si cela est plus avantageux pour le vendeur.

Il est essentiel de conserver toutes les factures de travaux. Sans justificatifs, aucune déduction n'est possible.

## Existe-t-il des exonérations ou des reports d'imposition ?

Plusieurs situations permettent d'éviter ou de reporter l'impôt :

- **Gains inférieurs à CHF 5'000.-** : exonérés d'impôt.
- **Vente à perte** : si le prix de vente est inférieur au prix de revient, aucun impôt n'est dû.
- **Réinvestissement** : si le produit de la vente est réinvesti dans l'achat d'un autre bien immobilier en Suisse dans un délai de 2 ans, l'impôt peut être reporté (exonération différée). Le montant réinvesti doit être au moins équivalent au produit de la vente.
- **Succession et donation** : le transfert par héritage ou donation ne déclenche pas l'imposition. L'impôt sera dû lors de la vente ultérieure par l'héritier ou le donataire.
- **Partage entre époux** : en cas de divorce, le transfert du bien au conjoint peut bénéficier d'un report d'imposition.

## Exemple concret : vente d'une villa à Lausanne

Madame Dupont a acheté une villa à Lausanne en 2012 pour CHF 1'200'000.-, avec CHF 39'600.- de droits de mutation (3.3 %). Elle y a habité comme résidence principale pendant 12 ans. Elle a investi CHF 80'000.- en rénovation de la cuisine et de la salle de bains (factures conservées). Elle vend en 2026 pour CHF 1'650'000.-, avec une commission de courtage de CHF 41'250.-.

**Calcul du gain imposable :**

| Élément | Montant |
|---|---|
| Prix de vente | CHF 1'650'000.- |
| Prix d'achat | - CHF 1'200'000.- |
| Droits de mutation à l'achat | - CHF 39'600.- |
| Impenses (rénovations) | - CHF 80'000.- |
| Commission de courtage | - CHF 41'250.- |
| **Gain imposable** | **CHF 289'150.-** |

**Durée de détention fiscale :** 14 ans réels, dont 12 ans d'occupation principale comptés double = 24 ans fiscaux.

**Taux applicable :** 7 % (24 ans et plus).

**Impôt sur le gain immobilier :** CHF 289'150.- x 7 % = **CHF 20'240.-**

Sans le doublement des années d'occupation, le taux aurait été de 17 % (14 ans), soit CHF 49'155.-. L'économie liée à l'occupation personnelle est de CHF 28'915.-.

## Quand et comment déclarer le gain immobilier ?

La déclaration doit être déposée auprès de l'Administration cantonale des impôts dans les 30 jours suivant la vente (article 198 LI). En pratique, c'est le notaire qui se charge de la plupart des démarches :

1. Il calcule le gain estimé en coordination avec l'administration fiscale.
2. Il retient le montant de l'impôt sur le prix de vente.
3. Il verse l'impôt à l'administration fiscale.
4. Le solde du prix de vente est versé au vendeur.

Le vendeur reçoit ensuite un bordereau d'impôt définitif. En l'absence de réclamation, le montant doit être acquitté dans les 30 jours suivant la notification.

## Ce que cela signifie pour votre projet de vente

L'impôt sur le gain immobilier est rarement un obstacle à la vente, mais il peut représenter un montant significatif si la plus-value est importante et la durée de détention courte. Anticiper ce calcul dès la phase d'estimation permet de fixer un prix de vente réaliste et d'éviter les mauvaises surprises à la signature chez le notaire.

Trois points à retenir :

1. Conservez toutes vos factures de travaux, dès le premier jour de propriété.
2. Si vous habitez le bien, chaque année d'occupation réduit mécaniquement l'impôt.
3. Si vous envisagez un réinvestissement, planifiez-le avant la vente pour bénéficier du report.

C'est le type d'analyse qu'un courtier expérimenté intègre systématiquement dans son estimation, bien avant la mise en vente.`,
    cta: "Vous souhaitez connaître le montant net que vous percevrez après la vente de votre bien ? Contactez-moi pour une analyse complète."
  },
  {
    slug: 'documents-vente-immobiliere-vaud',
    titre: "Quels documents faut-il pour vendre un bien immobilier dans le canton de Vaud ?",
    chapeau: "Extrait du registre foncier, police ECA, CECB, plans, servitudes : la liste complète des documents à réunir avant de mettre votre bien en vente, avec les adresses pour les obtenir.",
    date: '2026-04-09',
    categorie: 'Guide pratique',
    contenu: `Pour vendre un bien immobilier dans le canton de Vaud, vous devez réunir une dizaine de documents administratifs et techniques. Certains sont obligatoires (CECB, extrait du registre foncier), d'autres sont indispensables pour que la vente se déroule sans accroc (police ECA, plans, factures de travaux). Un dossier complet accélère la vente et rassure les acquéreurs comme leur banque.

Voici la liste détaillée, organisée par catégorie, avec les démarches pour obtenir chaque document.

## Quels sont les documents obligatoires ?

Dans le canton de Vaud, deux documents sont strictement obligatoires pour toute vente immobilière :

- **L'extrait du registre foncier** : c'est la carte d'identité juridique de votre bien. Il indique le propriétaire, la surface de la parcelle, les servitudes (droits de passage, canalisations, hypothèques) et les charges foncières. En pratique, c'est souvent votre courtier qui le commande pour vous auprès de l'Office du registre foncier de votre district. Attention : l'extrait "public" est une version allégée. Il faut l'extrait complet, accessible uniquement au propriétaire ou à son mandataire. Validité recommandée : moins de 3 mois avant la vente.
- **Le CECB (Certificat énergétique cantonal des bâtiments)** : obligatoire dans le canton de Vaud depuis 2017 lors de toute vente immobilière. Il évalue la performance énergétique du bâtiment sur une échelle de A (excellent) à G (mauvais). Valable 10 ans. À faire établir par un expert agréé CECB (liste disponible sur le site de la Conférence des directeurs cantonaux de l'énergie). Coût : entre CHF 1'000.- et CHF 3'000.- selon la taille du bâtiment. Déductible de l'impôt sur le gain immobilier.

## Quels documents techniques faut-il fournir ?

Au-delà des obligations légales, un dossier de vente complet dans le canton de Vaud inclut les documents suivants :

- **La police d'assurance incendie (ECA)** : délivrée gratuitement par l'Etablissement cantonal d'assurance (ECA Vaud, tél. +41 58 721 21 21). Elle indique la valeur assurée à neuf, le volume en m3 et les caractéristiques du bâtiment. Document essentiel pour l'estimation et pour le notaire.
- **Les plans d'architecte** : plans des étages et de distribution, idéalement à l'échelle. Ils permettent de vérifier les surfaces et le nombre de pièces. Si vous ne les avez plus, contactez l'architecte d'origine ou l'autorité communale des constructions.
- **Les factures de rénovation** : toutes les factures de travaux effectués depuis l'achat (cuisine, salle de bains, toiture, chauffage, etc.). Elles servent à la fois à justifier le prix de vente et à réduire l'impôt sur le gain immobilier (impenses déductibles).
- **Les relevés de consommation** : électricité et chauffage des 3 dernières années. À demander auprès de Romande Energie ou de votre fournisseur.
- **Les contrats d'entretien en cours** : chauffage, ascenseur, jardin, alarme, etc.
- **Le permis d'habiter** : à demander auprès de la commune si vous ne l'avez plus.
- **L'estimation fiscale** : la valeur fiscale du bien, utile à l'acquéreur pour estimer ses impôts futurs. À obtenir auprès du service cantonal des impôts.

## Quels documents supplémentaires pour un appartement en PPE ?

Si vous vendez un appartement en propriété par étages, des documents spécifiques à la copropriété sont indispensables :

- **Le règlement de copropriété** et le règlement d'utilisation et d'administration
- **Les procès-verbaux des 3 dernières assemblées générales** (ordinaires et extraordinaires)
- **Le dernier décompte de charges** et le budget prévisionnel
- **Le solde du fonds de rénovation** et les travaux votés ou prévus
- **L'acte constitutif de la PPE** avec les quotes-parts

Ces documents sont disponibles auprès de l'administrateur de la PPE. Demandez-les dès que vous envisagez la vente : certains administrateurs mettent plusieurs semaines à les fournir.

## Où obtenir chaque document dans le canton de Vaud ?

| Document | Où l'obtenir | Coût | Délai |
|---|---|---|---|
| Extrait du registre foncier | Office du RF de votre district (en ligne ou au guichet) | CHF 50.- à 150.- | Quelques jours |
| CECB | Expert agréé CECB (liste sur cecb.ch) | CHF 1'000.- à 3'000.- | 2 à 4 semaines |
| Police ECA | ECA Vaud (tél. 058 721 21 21) | Gratuit | Quelques jours |
| Plans d'architecte | Architecte d'origine ou commune | Variable | Variable |
| Estimation fiscale | Administration cantonale des impôts | Gratuit | Quelques jours |
| Documents PPE | Administrateur de la copropriété | Souvent inclus dans les charges | 1 à 3 semaines |

## Faut-il tout réunir avant de contacter un courtier ?

Non. En pratique, un courtier expérimenté vous accompagne dans la collecte de ces documents. Dès la première rencontre, il identifie ce que vous avez déjà et ce qu'il faut commander. Certains documents (extrait RF, police ECA) sont nécessaires dès l'estimation, et c'est généralement le courtier qui se charge de les obtenir. D'autres (relevés de consommation, contrats d'entretien) peuvent être réunis pendant la phase de commercialisation.

Ce qui compte, c'est de ne pas attendre qu'un acquéreur sérieux se manifeste pour commencer les démarches. Un dossier incomplet ralentit la vente et peut faire capoter une transaction : la banque de l'acquéreur exige un dossier complet pour valider le financement.

## Combien de temps faut-il pour constituer le dossier ?

Comptez 2 à 4 semaines pour réunir l'ensemble des documents, en parallèle de la préparation de la mise en vente. Le CECB est généralement le document qui prend le plus de temps, surtout en période de forte demande.

Mon conseil : commencez par les deux documents les plus rapides à obtenir (police ECA et extrait RF), puis enchaînez avec le CECB. C'est l'ordre que je recommande systématiquement à mes clients.`,
    cta: "Vous préparez la vente de votre bien dans le canton de Vaud ? Contactez-moi, je vous guide dans chaque étape."
  },
  {
    slug: 'cecb-obligatoire-vente-vaud',
    titre: "CECB obligatoire dans le canton de Vaud : ce que tout propriétaire doit savoir",
    chapeau: "Obligatoire depuis 2017 pour toute vente d'un bâtiment d'habitation dans le canton de Vaud, le CECB est bien plus qu'une formalité administrative. Il influence le prix, la négociation et la stratégie de vente.",
    date: '2026-04-02',
    categorie: 'Énergie',
    contenu: `Le CECB (Certificat énergétique cantonal des bâtiments) est obligatoire dans le canton de Vaud lors de toute vente d'un bâtiment d'habitation existant. Cette obligation est en vigueur depuis le 1er janvier 2017 (règlement cantonal 730.01.4). Le certificat évalue la performance énergétique du bâtiment sur une échelle de A (excellent) à G (très énergivore), coûte entre CHF 450.- et CHF 800.- selon le type de bien, et est valable 10 ans.

Le CECB n'entraîne aucune obligation de travaux. Mais il donne à l'acquéreur une vision claire des coûts énergétiques et du potentiel d'amélioration du bâtiment, ce qui en fait un levier de négociation important.

## Quand le CECB est-il obligatoire dans le canton de Vaud ?

Le CECB doit être établi dans deux situations précises :

- **Vente d'un bâtiment d'habitation existant** : villa, immeuble locatif, appartement en PPE. Le CECB doit être établi avant la mise en vente et communiqué à l'acquéreur au plus tard lors de la signature de l'acte notarié.
- **Remplacement d'une installation de chauffage** par une nouvelle installation fonctionnant au gaz, au mazout ou au charbon. Le CECB doit être réalisé avant les travaux.

Le CECB doit correspondre à l'état actuel du bâtiment au moment de la vente. S'il date de moins de 10 ans et que ni le chauffage ni l'enveloppe n'ont été modifiés, il reste valable.

## Quelles sont les exceptions ?

Le CECB n'est pas obligatoire dans les cas suivants :

- Donation ou donation mixte
- Transfert de propriété par succession
- Transfert entre époux (régime matrimonial, divorce)
- Vente de bâtiments non encore construits (vente sur plan)
- Cession en lieu de partage

En revanche, un transfert entre concubins nécessite un CECB.

## Que mesure exactement le CECB ?

Le certificat évalue trois dimensions :

- **L'efficacité de l'enveloppe du bâtiment** : qualité de l'isolation thermique (murs, toiture, fenêtres, planchers). Classement de A à G.
- **L'efficacité énergétique globale** : énergie nécessaire pour le chauffage, l'eau chaude et les installations techniques. Classement de A à G.
- **Les émissions directes de CO2** : quantité de CO2 émise par le bâtiment.

Un bâtiment neuf conforme aux normes actuelles se situe généralement en classe B. Les constructions d'avant 1980 sans rénovation sont souvent classées E, F ou G. Les classes A sont rares et correspondent à des standards Minergie-P ou passifs.

## Quelle est la différence entre CECB et CECB Plus ?

| Caractéristique | CECB simple | CECB Plus |
|---|---|---|
| Contenu | Étiquette énergie (classes A-G) | Étiquette + rapport de conseil détaillé |
| Recommandations de travaux | Non | Oui, avec variantes chiffrées |
| Estimation des coûts de rénovation | Non | Oui |
| Subventions identifiées | Non | Oui |
| Coût indicatif (villa) | CHF 450.- à 650.- | CHF 1'000.- à 2'500.- |
| Coût indicatif (immeuble) | CHF 500.- à 800.- | CHF 1'500.- à 3'500.- |
| Subventionné par le canton | Non | Oui, pour les bâtiments construits avant 2000 |

Le CECB Plus est obligatoire pour obtenir des subventions du Programme Bâtiments supérieures à CHF 10'000.-. Le canton de Vaud double les subventions fédérales pour la rénovation énergétique, ce qui rend le CECB Plus particulièrement intéressant avant des travaux.

## Comment le CECB influence-t-il le prix de vente ?

C'est un point que beaucoup de propriétaires sous-estiment. Le CECB a un impact direct sur la négociation :

Un bien classé A ou B rassure l'acquéreur : charges prévisibles, pas de gros investissements à court terme. C'est un argument de vente. Un bien classé F ou G donne à l'acquéreur un levier de négociation : il chiffrera les travaux nécessaires et les déduira mentalement du prix demandé.

Dans ma pratique, je constate que les acquéreurs sont de plus en plus informés sur le sujet. Les banques aussi : certains établissements intègrent la classe CECB dans leur évaluation du bien. Un mauvais classement peut influencer le montant du prêt accordé.

C'est pourquoi je recommande systématiquement de faire établir le CECB dès le début du processus de vente, pas à la dernière minute. Il permet d'anticiper les objections et de positionner le prix en connaissance de cause.

## Que se passe-t-il en PPE ?

Pour un appartement en propriété par étages, le CECB porte sur l'ensemble du bâtiment, pas sur le lot individuel. C'est logique : le chauffage, l'enveloppe et les émissions concernent l'immeuble entier.

Concrètement :

- Lors de la vente du premier lot, le CECB doit être établi pour tout l'immeuble.
- C'est à l'administrateur de la PPE de faire établir le document.
- Les coûts sont supportés par la copropriété (fonds de rénovation ou charges communes).
- L'accord de tous les copropriétaires est nécessaire.

Si vous êtes copropriétaire et que vous envisagez de vendre, vérifiez auprès de votre administrateur si un CECB existe déjà et s'il est encore valide.

## Comment obtenir un CECB dans le canton de Vaud ?

1. Trouvez un expert agréé sur le site cecb.ch (recherche par code postal).
2. L'expert visite le bâtiment et collecte les données techniques.
3. Il établit le certificat à l'aide du logiciel officiel CECB.
4. Le certificat est publié et reste valable 10 ans.

Délai moyen : 2 à 4 semaines entre la prise de contact et la réception du certificat. En période de forte demande, ce délai peut s'allonger. Anticipez.

## Le CECB est-il déductible fiscalement ?

Oui. Le coût du CECB (simple ou Plus) est déductible de l'impôt sur le gain immobilier lors de la vente. C'est un frais de vente au même titre que la commission de courtage.

Pour les propriétaires qui ne vendent pas mais qui font établir un CECB en vue de travaux de rénovation, le coût peut être déduit des impôts sur le revenu au titre de frais d'entretien du bien immobilier.

## Ce que je recommande à mes clients

Le CECB est une obligation légale, pas une option. Mais au-delà de la conformité, c'est un outil stratégique :

1. Faites-le établir dès que vous envisagez la vente, pas quand l'acquéreur le demande.
2. Si votre bien est classé E, F ou G, intégrez cette réalité dans le prix de vente. Un prix juste qui tient compte de l'état énergétique se défend beaucoup mieux qu'un prix gonflé que l'acquéreur va attaquer en négociation.
3. Si votre bien est classé A, B ou C, mettez-le en avant dans le dossier de vente. C'est un différenciateur réel sur le marché vaudois actuel.

Le CECB ne fait pas vendre un bien. Mais un CECB bien utilisé dans la stratégie de commercialisation peut faire la différence entre une négociation subie et une négociation maîtrisée.`,
    cta: "Vous souhaitez vendre et vous avez des questions sur le CECB ? Contactez-moi, je vous oriente vers les bons interlocuteurs."
  },
  {
    slug: 'faut-il-renover-avant-de-vendre',
    titre: "Faut-il rénover avant de vendre son bien immobilier ?",
    chapeau: "Refaire la cuisine pour vendre plus cher ? Remplacer le chauffage ? La réponse est rarement celle que les propriétaires attendent. Voici comment décider, chiffres à l'appui.",
    date: '2026-02-19',
    categorie: 'Conseil vendeur',
    contenu: `Dans la plupart des cas, non. Les grandes rénovations avant la vente coûtent plus cher qu'elles ne rapportent. En revanche, certaines interventions ciblées, souvent peu coûteuses, peuvent accélérer la vente et limiter la négociation. La clé, c'est de distinguer ce qui crée de la valeur de ce qui crée du confort pour un acquéreur qui voudra de toute façon refaire les choses à son goût.

## Pourquoi les grandes rénovations ne sont-elles pas rentables avant une vente ?

Le principe est simple : un acquéreur ne paie jamais le prix des travaux au franc près. Une cuisine à CHF 40'000.- n'augmente pas le prix de vente de CHF 40'000.-. Elle l'augmente de CHF 15'000.- à CHF 25'000.- au mieux, parce que l'acquéreur ne l'aurait pas choisie ainsi, ou parce qu'il aurait négocié différemment sans elle.

C'est ce qu'on appelle le décalage entre le coût des travaux et la plus-value perçue. Ce décalage est systématique sur les rénovations lourdes :

| Type de travaux | Coût indicatif | Plus-value estimée à la vente | Rapport |
|---|---|---|---|
| Cuisine complète | CHF 30'000.- à 50'000.- | CHF 15'000.- à 25'000.- | 50 à 60 % |
| Salle de bains complète | CHF 20'000.- à 35'000.- | CHF 10'000.- à 18'000.- | 50 à 55 % |
| Remplacement chauffage (PAC) | CHF 25'000.- à 45'000.- | CHF 15'000.- à 25'000.- | 55 à 65 % |
| Isolation façade | CHF 40'000.- à 80'000.- | CHF 20'000.- à 35'000.- | 45 à 50 % |
| Peinture intérieure complète | CHF 5'000.- à 12'000.- | CHF 8'000.- à 15'000.- | 120 à 150 % |
| Nettoyage, désencombrement, jardin | CHF 1'000.- à 3'000.- | CHF 5'000.- à 15'000.- | 300 à 500 % |

La dernière ligne dit tout : les interventions les moins chères sont celles qui rapportent le plus en proportion.

## Quels travaux valent la peine avant une vente ?

Les interventions qui fonctionnent sont celles qui permettent à l'acquéreur de se projeter, pas celles qui transforment le bien.

**Ce qui fonctionne :**

- Peinture fraîche dans les pièces défraîchies (teintes neutres, claires)
- Nettoyage en profondeur, y compris les joints, les fenêtres, les extérieurs
- Désencombrement des pièces, des caves, des garages
- Entretien du jardin (tonte, taille, propreté)
- Réparation des petits défauts visibles : poignée cassée, robinet qui goutte, interrupteur abîmé, volet qui ferme mal
- Remplacement des luminaires datés par des modèles neutres et modernes

**Ce qui ne fonctionne pas :**

- Refaire une cuisine que l'acquéreur voudra choisir lui-même
- Refaire une salle de bains pour "moderniser" un bien des années 80
- Poser un nouveau revêtement de sol sur un existant en bon état
- Faire des travaux cosmétiques pour masquer un problème structurel

## Et le chauffage, faut-il le remplacer ?

C'est la question que me posent le plus souvent les vendeurs de villas construites avant 2000. Le chauffage au mazout ou électrique fait peur aux acquéreurs, et le CECB classé F ou G n'aide pas.

Ma recommandation : c'est l'un ou l'autre. Soit vous remplacez le chauffage avant la vente, soit vous en tenez compte dans le prix. Pas de demi-mesure.

**Option 1 : remplacer avant de vendre.** Si votre chauffage est en fin de vie et que le bien est par ailleurs en bon état, le remplacement par une pompe à chaleur peut se justifier. Un bien avec un CECB amélioré se vend plus vite et avec moins de négociation. C'est un investissement que vous ne récupérerez pas intégralement, mais qui supprime le principal frein à l'achat.

**Option 2 : ajuster le prix de vente.** C'est souvent la solution la plus pragmatique. Vous fixez un prix qui tient compte de l'état du chauffage, et l'acquéreur sait exactement ce qu'il achète. Pas de surprise, pas de négociation interminable sur le sujet. Dans ma pratique, c'est l'option que je recommande le plus souvent : elle est transparente, rapide, et évite au vendeur de gérer un chantier avant la vente.

Ce qui ne fonctionne jamais : vendre au prix d'un bien rénové avec un chauffage à remplacer. L'acquéreur et sa banque feront le calcul, et la négociation sera rude.

## Comment l'acquéreur calcule-t-il la valeur d'un bien à rénover ?

Un acquéreur informé, et sa banque, raisonnent ainsi : valeur du bien rénové, moins le coût estimé des travaux. Si votre villa vaut CHF 1'200'000.- une fois rénovée et que les travaux nécessaires sont estimés à CHF 150'000.-, l'offre se situera autour de CHF 1'000'000.- à CHF 1'050'000.-.

Le problème : si les travaux ne sont pas chiffrés dans le dossier de vente, l'acquéreur surévalue systématiquement le budget nécessaire. Il arrondit vers le haut, par précaution. C'est pour cela qu'un dossier de vente transparent, avec un CECB et des devis, limite la décote.

## Et les travaux déjà réalisés, sont-ils déductibles ?

Oui, mais il faut distinguer deux mécanismes différents :

**Les travaux à plus-value (impenses)** : nouvelle cuisine, transformation salle de bains, agrandissement, pompe à chaleur. Ces dépenses sont déductibles de l'impôt sur le gain immobilier lors de la vente (article 70 LI). Elles augmentent le prix de revient et réduisent donc le gain taxable. Condition : disposer des factures et des preuves de paiement. Ce mécanisme n'est pas affecté par la réforme de la valeur locative.

**Les travaux d'entretien courant** : peinture, réparation, remplacement à l'identique. Ces frais ne sont pas déductibles du gain immobilier, mais ils sont déductibles de l'impôt sur le revenu l'année où ils sont effectués.

**Attention, changement majeur à venir :** le 28 septembre 2025, le peuple suisse a voté la suppression de la valeur locative. La réforme entrera en vigueur au 1er janvier 2029 (période transitoire jusqu'à fin 2028). À partir de cette date, les frais d'entretien et de rénovation ne seront plus déductibles de l'impôt sur le revenu pour les biens à usage propre. Concrètement, si vous avez des travaux d'entretien à faire sur votre bien, il est fiscalement avantageux de les réaliser avant fin 2028. Après cette date, seuls les propriétaires de biens loués conserveront cette déduction.

## Ce que je recommande à mes clients

Avant toute décision de travaux, posez-vous une seule question : est-ce que cet investissement va me rapporter plus que ce qu'il me coûte, en tenant compte du prix du marché actuel ?

Si la réponse n'est pas clairement oui, ne faites rien de lourd. Concentrez-vous sur trois choses :

1. Un bien propre, rangé, lumineux. C'est gratuit ou presque, et c'est ce qui fait la meilleure impression en visite.
2. Un dossier de vente transparent, avec le CECB, les devis pour les travaux que l'acquéreur devra faire, et l'historique des entretiens réalisés.
3. Un prix juste, qui tient compte de l'état réel du bien.

Un acquéreur qui comprend ce qu'il achète négocie moins qu'un acquéreur qui a des doutes.`,
    cta: "Vous hésitez entre rénover et vendre en l'état ? Contactez-moi pour une analyse objective, adaptée à votre bien et à votre marché."
  },
  {
    slug: 'l3pl-vaud-autorisation-vente-logement-loue',
    titre: "L3PL dans le canton de Vaud : faut-il une autorisation pour vendre un logement loué ?",
    chapeau: "Si votre bien est ou a été loué et qu'il se situe dans un district à pénurie, vous devez peut-être obtenir une autorisation avant de vendre. Mais de nombreuses exceptions existent.",
    date: '2026-03-19',
    categorie: 'Juridique',
    contenu: `Dans le canton de Vaud, la vente d'un logement qui est ou a été loué peut nécessiter une autorisation de la Direction du logement (DIL), en vertu de la loi sur la préservation et la promotion du parc locatif (LPPPL, dite L3PL). Cette obligation ne concerne que les biens situés dans un district déclaré en pénurie de logements. En 2026, seul le district d'Aigle n'est pas concerné. Mais de nombreuses exceptions permettent de vendre sans autorisation, même dans un district à pénurie.

La L3PL est entrée en vigueur le 1er janvier 2018. Son objectif : lutter contre la pénurie de logements en conservant sur le marché locatif les biens qui y sont déjà.

## Quels sont les districts concernés en 2026 ?

La liste des districts à pénurie est publiée chaque année par l'État de Vaud. En 2026 :

**Pénurie prononcée (taux de vacance < 1 %, L3PL pleinement applicable) :**

- Lausanne
- Morges
- Gros-de-Vaud
- Lavaux-Oron
- Ouest lausannois
- Riviera-Pays-d'Enhaut (nouveau en 2026)

**Pénurie modérée (taux entre 1 % et 1,5 %, L3PL allégée) :**

- Broye-Vully
- Jura-Nord vaudois
- Nyon

**Pas de pénurie (L3PL non applicable) :**

- Aigle

Si votre bien se situe dans le district d'Aigle, la L3PL ne vous concerne pas. Pour tous les autres districts, il faut vérifier si votre bien entre dans le champ d'application de la loi.

## Quels biens sont soumis à autorisation ?

La L3PL s'applique à la vente de tout logement qui a été occupé en dernier lieu par un locataire, y compris si le logement est actuellement vacant. C'est la dernière occupation qui compte, pas la situation au moment de la vente.

Par "vente", la loi entend tout transfert de propriété à titre onéreux : vente classique, vente de certificats d'actions donnant droit à la jouissance d'un logement, donation mixte.

## Quelles sont les exceptions ?

C'est là que ça devient intéressant pour les propriétaires. La liste des exceptions est longue et couvre beaucoup de situations courantes :

- **Bâtiment de 2 logements ou moins** : exclu du champ d'application. Une villa divisée en deux appartements n'est pas soumise à la L3PL.
- **Bâtiment de 3 logements maximum**, si l'un d'eux a été occupé en dernier lieu par le propriétaire, un proche parent, un allié ou un partenaire enregistré.
- **Logement occupé en dernier lieu par le propriétaire** ou un proche parent.
- **Logement de 150 m² nets habitables ou plus** : exclu du champ d'application.
- **Valeur ECA supérieure à CHF 750.-/m3** (à l'indice 117, base 100 = 1990) : exclu.
- **L'acquéreur conserve le bien en location** avec le locataire actuel en place.
- **PPE constituée dès la construction** ou depuis le 7 octobre 1989 au moins.
- **Vente au locataire en place** ou à un membre de la famille du propriétaire.

Si vous pensez entrer dans une de ces exceptions, je recommande toujours de demander confirmation écrite à la Direction du logement avant de mettre en vente. C'est gratuit et ça évite les mauvaises surprises chez le notaire.

## Que se passe-t-il si une autorisation est nécessaire ?

La demande d'autorisation d'aliénation se fait auprès de la commune du lieu du bien, qui transmet son préavis à la Direction cantonale du logement. L'autorisation peut être :

- **Accordée sans conditions** : vous pouvez vendre librement.
- **Accordée avec conditions** : maintien en location à loyer contrôlé, contrôle du prix de vente, relogement du locataire. Ces conditions peuvent durer jusqu'à 10 ans (5 ans dans les districts à pénurie modérée).
- **Refusée** : dans certains cas, notamment si le logement entre dans une catégorie à pénurie.

L'autorisation peut être accordée pour motif exceptionnel si des circonstances financières ou familiales le justifient. La garantie constitutionnelle de la propriété (article 26 de la Constitution) est prise en compte dans la décision.

Délai moyen : comptez 4 à 8 semaines pour obtenir une réponse, selon la commune et la complexité du dossier.

## Et le droit de préemption des communes ?

Depuis le 1er janvier 2020, les communes situées dans un district à pénurie disposent d'un droit de préemption sur certaines ventes. Ce droit ne peut s'exercer que si :

- La parcelle fait au moins 1'500 m² (sauf si elle est attenante à un terrain communal)
- L'objectif est de construire des logements d'utilité publique
- Le bien est situé dans un district à pénurie

En pratique, ce droit de préemption ne s'applique pas à la vente d'un lot PPE individuel, ni aux ventes entre proches parents, ni aux biens situés en zone à faible densité. Il concerne surtout les grandes parcelles constructibles.

## Comment anticiper la L3PL dans votre projet de vente ?

La L3PL n'empêche pas de vendre. Elle ajoute une étape administrative qui peut prendre du temps si elle n'est pas anticipée. Voici ce que je recommande :

1. Vérifiez si votre district est à pénurie (liste publiée chaque année sur vd.ch).
2. Vérifiez si votre bien entre dans une exception (2 logements ou moins, 150 m², propriétaire occupant, etc.).
3. En cas de doute, écrivez à la Direction du logement avant de mettre en vente. L'adresse : Direction générale du territoire et du logement, Direction du logement, Rue Caroline 11 bis, 1014 Lausanne.
4. Si une autorisation est nécessaire, lancez la démarche en parallèle de la mise en vente, pas après avoir trouvé un acquéreur. Attendre le passage chez le notaire pour s'en occuper, c'est prendre le risque de perdre l'acquéreur.

Un dossier bien préparé et soumis tôt dans le processus permet d'éviter que la L3PL ne devienne un frein à la vente.`,
    cta: "Votre bien est loué et vous envisagez de le vendre ? Contactez-moi, je vérifie votre situation au regard de la L3PL."
  },
]

// ─── HELPERS ────────────────────────────────────────────────────────────────
export const STATS = [
  { value: '6+', label: "Années d'expérience" },
  { value: '40+', label: 'Transactions réalisées' },
  { value: '96.8%', label: 'Vendus au prix estimé' },
]

export const FILTRES = [
  { key: 'all', label: 'Tous' },
  { key: 'en_vente', label: 'En vente' },
  { key: 'vendu', label: 'Vendus' },
] as const
