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
    description: "Villa familiale de 5 pièces au chemin de la Fauvette à Morges, sur une parcelle arborée de 808 m². Triple orientation sud, est et ouest. Quatre chambres, trois salles d'eau, double garage. CHF 380'800.- de travaux documentés depuis l'acquisition. Vue sur le lac Léman depuis l'étage."
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
    description: "Maison jumelée d'exception à Gland, au chemin du Buis. Architecture contemporaine, volumes généreux et finitions soignées. Terrasse, jardin privatif et vue dégagée."
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
    description: "Immeuble locatif situé sur la Route de Caux à Glion, dans un cadre exceptionnel surplombant le Léman. Vue panoramique sur le lac et les Alpes."
  },
  {
    id: 4, slug: 'immeuble-lausanne-levant', titre: 'Immeuble locatif', lieu: 'Lausanne',
    prix: "1'790'000", pieces: '-', surface: '-', terrain: '-', categorie: 'reserve',
    img: '/photos/lausanne-levant/IMG_6321.jpg',
    photos: ['/photos/lausanne-levant/IMG_6321.jpg','/photos/lausanne-levant/IMG_6329.jpg','/photos/lausanne-levant/IMG_6331.jpg','/photos/lausanne-levant/IMG_6332.jpg','/photos/lausanne-levant/IMG_6341.jpg','/photos/lausanne-levant/IMG_6342.jpg','/photos/lausanne-levant/IMG_6343.jpg','/photos/lausanne-levant/IMG_6346.jpg','/photos/lausanne-levant/IMG_6349.jpg','/photos/lausanne-levant/IMG_6356.jpg','/photos/lausanne-levant/IMG_6357.jpg','/photos/lausanne-levant/IMG_6528.jpg'],
    description: "Immeuble de trois logements au Levant 117 à Lausanne. Bien réservé, signature notariale en cours."
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
    description: "Appartement spacieux à Gland, chemin de l'Aubépine. Terrasse, vue dégagée et prestations de qualité dans un quartier résidentiel calme."
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
    description: "Immeuble de 3 logements à Lausanne, chemin du Mont-Tendre. Transaction conclue avec succès."
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
    description: "Au coeur du village de Riex, dans le périmètre UNESCO de Lavaux, cette maison vigneronne de 1680 entièrement rénovée en 1989 déploie ses 100 m² habitables sur quatre niveaux. Séjour lumineux avec double hauteur, cuisine ouverte avec accès balcon, chambre sous combles avec vide sur séjour et salle de bains moderne sous vélux. Sauna privatif au sous-sol, deux places de parking couvert. La porte de la façade sud est classée monument historique. Vue sur les toits, le lac Léman et les Alpes savoyardes."
  },
]

// ─── ARTICLES ───────────────────────────────────────────────────────────────
export const ARTICLES: Article[] = [
  {
    slug: 'estimer-son-bien-canton-de-vaud',
    titre: 'Comment estimer la valeur de votre bien dans le Canton de Vaud',
    chapeau: "Valeur intrinsèque, valeur de rendement, valeur vénale : trois approches complémentaires pour fixer un prix juste. Voici comment un courtier professionnel procède.",
    date: '2026-04-07',
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
    date: '2026-04-01',
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
    date: '2026-03-25',
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
    date: '2026-03-18',
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
    date: '2026-03-10',
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
