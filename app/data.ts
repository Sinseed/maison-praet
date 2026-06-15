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
  annee_vente?: string // Année de la vente (pour les transactions historiques sans photos)
  nb_lots?: number     // Nombre de lots vendus dans la transaction (PPE, promotion)
  composition?: string // Composition (pour les immeubles : "20 appartements + 1 local commercial")
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
    id: 31, slug: 'maison-yvonand', titre: 'Maison de caractère', lieu: 'Yvonand',
    prix: "1'350'000", pieces: '8', surface: '190 m²', terrain: "1'804 m²", categorie: 'en_vente',
    img: '/photos/maison-yvonand/01-vue-aerienne.jpg',
    photos: [
      '/photos/maison-yvonand/01-vue-aerienne.jpg',
      '/photos/maison-yvonand/02-maison-jardin.jpg',
      '/photos/maison-yvonand/03-jardin-potager.jpg',
      '/photos/maison-yvonand/04-facade.jpg',
      '/photos/maison-yvonand/05-sejour.jpg',
      '/photos/maison-yvonand/06-veranda.jpg',
      '/photos/maison-yvonand/07-vue-aerienne-2.jpg',
      '/photos/maison-yvonand/08-hall-escalier.jpg',
      '/photos/maison-yvonand/09-chambre-verte.jpg',
      '/photos/maison-yvonand/10-chambre-orange.jpg',
      '/photos/maison-yvonand/11-chambre-rose.jpg',
      '/photos/maison-yvonand/12-chambre-fleurs.jpg',
      '/photos/maison-yvonand/13-vue-lac.jpg',
      '/photos/maison-yvonand/14-vue-lac-2.jpg',
      '/photos/maison-yvonand/15-vue-large.jpg',
    ],
    description: "Sur l'une des plus belles rives du lac de Neuchâtel, à quelques minutes à pied des plages des Pins, du Port et de la Petite Amérique, cette maison de caractère a été construite en 1905. Trois niveaux habitables : un sous-sol abritant la cave, la chaufferie et un garage, un rez-de-chaussée articulé autour d'un grand séjour aux poutres apparentes, un étage de nuit qui distribue plusieurs chambres lumineuses ouvertes sur le jardin. Un jardin d'hiver vitré prolonge naturellement les pièces de vie. Boiseries d'origine, ferrures, huisseries, escalier à main courante en fer forgé : le décor a traversé le temps. Le terrain de 1'804 m² d'un seul tenant, plat et bien orienté, accueille le bâtiment principal, deux dépendances anciennes, une serre, un potager structuré et un verger arboré. Une superficie deux à quatre fois supérieure à celle d'une villa contemporaine du village. Chauffage gaz avec chaudière récente, clos couvert sain, structure porteuse en bon état. Une rénovation personnelle des seconds œuvres est à prévoir pour composer un intérieur à votre image. Le règlement communal admet une construction complémentaire à hauteur de 300 m² bruts, ce qui ouvre un potentiel d'évolution rare. La mise en séparatif des évacuations sera également à anticiper. Visites exclusivement sur rendez-vous."
  },
  {
    id: 30, slug: 'immeuble-lausanne-tour', titre: 'Immeuble de rendement', lieu: 'Lausanne',
    prix: "4'300'000", pieces: '-', surface: '231 m²', terrain: '-', categorie: 'en_vente',
    composition: '14 logements + 1 café-bar',
    img: '/photos/lausanne-tour/01-facade.jpg',
    photos: [
      '/photos/lausanne-tour/01-facade.jpg',
      '/photos/lausanne-tour/02-loft-attique.jpg',
      '/photos/lausanne-tour/03-sejour.jpg',
      '/photos/lausanne-tour/04-sejour-2.jpg',
      '/photos/lausanne-tour/05-cuisine.jpg',
      '/photos/lausanne-tour/06-chambre.jpg',
      '/photos/lausanne-tour/07-salle-bains.jpg',
      '/photos/lausanne-tour/08-salle-douche.jpg',
      '/photos/lausanne-tour/09-salle-eau.jpg',
      '/photos/lausanne-tour/10-cafe-bar.jpg',
      '/photos/lausanne-tour/11-comptoir.jpg',
    ],
    description: "Au cœur de la vieille ville de Lausanne, à deux pas de la Riponne et du métro M2, un immeuble de rendement à affectation mixte. Édifié en 1870 et transformé en 2017, il conjugue le caractère de la pierre ancienne et la régularité d'un revenu sécurisé. Quatorze logements, du studio au vaste attique de 3,5 pièces couronné de charpente apparente, et un café-bar emblématique exploité sur deux niveaux au rez. L'ensemble est entièrement loué, avec un taux d'occupation de 100% maintenu sur les trois derniers exercices. Parcelle de 231 m² entièrement bâtie, propriété individuelle. État locatif net de CHF 204'960.- par an, soit un rendement brut de 4,77%. Immeuble vendu avec ses locataires en place. Détails financiers, baux et comptes de gérance disponibles dans le cadre de la due diligence."
  },
  {
    id: 29, slug: 'appartement-cossonay-eolia', titre: 'Appartement PPE 4.5 pièces neuf', lieu: 'Cossonay-Ville',
    prix: "1'195'000", pieces: '4.5', surface: '100 m²', terrain: '-', categorie: 'en_vente',
    img: '/photos/cossonay-eolia/01-balcon-vue.jpg',
    photos: [
      '/photos/cossonay-eolia/01-balcon-vue.jpg',
      '/photos/cossonay-eolia/02-sejour-cuisine.jpg',
      '/photos/cossonay-eolia/03-cuisine.jpg',
      '/photos/cossonay-eolia/04-salon.jpg',
      '/photos/cossonay-eolia/05-chambre-1.jpg',
      '/photos/cossonay-eolia/06-chambre-2.jpg',
      '/photos/cossonay-eolia/07-salle-douche.jpg',
      '/photos/cossonay-eolia/08-salle-bains.jpg',
      '/photos/cossonay-eolia/09-vue-campagne.jpg',
      '/photos/cossonay-eolia/10-vue-jura.jpg',
      '/photos/cossonay-eolia/11-aerienne-1.jpg',
      '/photos/cossonay-eolia/12-aerienne-2.jpg',
      '/photos/cossonay-eolia/13-aerienne-3.jpg',
    ],
    description: "Au troisième étage d'un immeuble Minergie livré en 2023, cet appartement de 4.5 pièces s'ouvre côté champs sur un panorama dégagé : les blés, les collines, le Jura à l'horizon. La pièce de vie traverse l'appartement sur une trentaine de mètres carrés en continu, prolongée par un balcon de dix-huit mètres carrés équipé d'un store à toile motorisé. Cuisine ouverte avec plan en céramique, crédence en verre, induction, four, chauffe-plat et lave-vaisselle. Trois chambres, dont la parentale avec dressing sur mesure et salle de douche à l'italienne attenante. Salle de bains avec baignoire séparée. Triple vitrage, stores motorisés. PAC géothermique sur sondes verticales avec geocooling, ventilation contrôlée avec récupération de chaleur, photovoltaïque en toiture pour les communs. Au sous-sol, un local annexe de treize mètres carrés et une cave individuelle. Deux places intérieures dont l'une équipée d'une borne de recharge et l'autre pré-équipée, une place moto extérieure. Le centre de Cossonay et la gare CFF sont accessibles à pied, l'autoroute A1 à six minutes, le centre de Lausanne à vingt minutes."
  },
  {
    id: 21, slug: 'villa-lemont-saux', titre: 'Villa mitoyenne', lieu: 'Le Mont-sur-Lausanne',
    prix: "1'470'000", pieces: '5.5', surface: '135 m²', terrain: '706 m²', categorie: 'en_vente',
    img: '/photos/lemont-saux/drone1.jpg',
    photos: ['/photos/lemont-saux/drone1.jpg','/photos/lemont-saux/drone2.jpg','/photos/lemont-saux/salon.jpg','/photos/lemont-saux/salle-a-manger.jpg','/photos/lemont-saux/cuisine.jpg','/photos/lemont-saux/chambre1.jpg','/photos/lemont-saux/chambre2.jpg','/photos/lemont-saux/bureau.jpg','/photos/lemont-saux/sdb1.jpg','/photos/lemont-saux/sdb2.jpg','/photos/lemont-saux/sdb3.jpg','/photos/lemont-saux/sous-sol.png'],
    description: "Au Mont-sur-Lausanne, dans un quartier résidentiel établi, cette villa mitoyenne de 1987 déploie 135 m² habitables sur deux niveaux. Poutres apparentes, cheminée ouverte, grandes baies coulissantes sur le jardin privatif de 706 m². Trois chambres à l'étage, salle de bains double vasque avec baignoire, salle de loisirs au sous-sol. Garage indépendant et quatre places de stationnement. Chauffage électrique, remplacement par pompe à chaleur faisable (permis voisin obtenu 2021). À 8 minutes du centre de Lausanne et à 5 minutes de l'ISL."
  },
  {
    id: 26, slug: 'appartement-lausanne-maupas', titre: 'Appartement PPE', lieu: 'Lausanne',
    prix: "750'000", pieces: '3.5', surface: '80 m²', terrain: '-', categorie: 'reserve',
    img: '/photos/lausanne-maupas/drone.jpg',
    photos: ['/photos/lausanne-maupas/drone.jpg','/photos/lausanne-maupas/parc.jpg','/photos/lausanne-maupas/sejour.jpg','/photos/lausanne-maupas/chambre.jpg','/photos/lausanne-maupas/volumes.jpg','/photos/lausanne-maupas/cuisine.jpg','/photos/lausanne-maupas/sdb.jpg'],
    description: "Face au parc de Valency, cet appartement de 3.5 pièces au rez-de-chaussée inférieur d'un immeuble de 1905 offre des volumes d'époque, un parquet chevrons remarquable et une luminosité rare. Livré en état brut, il attend son projet. Cinq places de parc en pleine propriété et un cabanon cadastré de 13 m² complètent un ensemble peu courant à Lausanne. Immeuble récemment rénové : toiture et façade 2016, chaudière neuve 2025."
  },
  {
    id: 27, slug: 'appartement-lausanne-centre-1p5', titre: 'Appartement PPE', lieu: 'Lausanne',
    prix: "360'000", pieces: '1.5', surface: '41 m²', terrain: '-', categorie: 'en_vente',
    img: '/photos/closdebulle-15p/balcon.jpg',
    photos: ['/photos/closdebulle-15p/balcon.jpg','/photos/closdebulle-15p/cuisine.jpg','/photos/closdebulle-15p/salle-de-bain.jpg','/photos/closdebulle-15p/chambre.jpg'],
    description: "Dans un immeuble de 1939 au coeur de Lausanne, ce 1.5 pièce de 41 m² profite d'un détail rare : son balcon donne sur la cour intérieure arborée, face à un jardin d'agrément. Pas de vis-à-vis frontal, une vraie bulle de calme à deux pas de la Riponne et du Flon. Parquets à chevrons d'origine, double porte vitrée vers la chambre, salle de bain habillée d'une mosaïque hexagonale bleu nuit qui signe l'intérieur. Cave attribuée. Le bien est actuellement loué (CHF 850.- hors charges). Pour un investisseur urbain ou un acquéreur en quête d'un pied-à-terre central."
  },
  {
    id: 28, slug: 'appartement-lausanne-centre-2p5', titre: 'Appartement PPE', lieu: 'Lausanne',
    prix: "550'000", pieces: '2.5', surface: '57 m²', terrain: '-', categorie: 'en_vente',
    img: '/photos/closdebulle-25p/sejour.jpg',
    photos: ['/photos/closdebulle-25p/sejour.jpg','/photos/closdebulle-25p/entree-salon.jpg','/photos/closdebulle-25p/hall.jpg','/photos/closdebulle-25p/cuisine.jpg','/photos/closdebulle-25p/chambre.jpg','/photos/closdebulle-25p/salle-de-douche.jpg'],
    description: "Au 3e étage d'un immeuble de 1939 en plein centre de Lausanne, ce 2.5 pièces traversant rassemble ce que peu de biens proposent à ce prix : un vrai séjour séparé, une cuisine indépendante, une chambre dédiée, deux balcons distincts. Parquets à chevrons remis à neuf en 2024, murs repeints. Ascenseur dans l'immeuble, cave attribuée. Le quartier vit à pied : Riponne, Flon, gare CFF à moins d'un kilomètre, m1 et m2 à portée. Le bien est actuellement loué (CHF 1'380.- hors charges). Idéal pour un investisseur ou un acquéreur en quête d'un appartement central et indépendant."
  },
  {
    id: 6, slug: 'appartement-epalinges', titre: 'Appartement PPE', lieu: 'Epalinges',
    prix: "1'090'000", pieces: '3.5', surface: '109 m²', terrain: '-', categorie: 'reserve',
    img: '/photos/epalinges/epalinges_5_0.jpeg',
    photos: ['/photos/epalinges/epalinges_5_0.jpeg','/photos/epalinges/epalinges_1_0.jpeg','/photos/epalinges/epalinges_3_0.jpeg','/photos/epalinges/epalinges_3_1.jpeg','/photos/epalinges/epalinges_4_0.jpeg','/photos/epalinges/epalinges_4_1.jpeg','/photos/epalinges/epalinges_4_2.jpeg','/photos/epalinges/epalinges_10_0.jpeg'],
    description: "Sur les hauts d'Epalinges, à deux pas du terminus M2 Les Croisettes, ce rez-de-chaussée supérieur de 3.5 pièces s'ouvre sur l'un des plus beaux panoramas de la région. Le regard file sur le Léman et les Alpes, la lumière traverse l'appartement jusqu'à la terrasse de 160 m² qui prolonge naturellement les pièces de vie. Parquet en chêne, cuisine ouverte face au paysage, deux chambres paisibles. Jardin privatif en jouissance exclusive, chauffage à pellets et solaire, CECB classe A. Un bien rare, à la fois retiré et à quelques minutes du centre de Lausanne."
  },
  {
    id: 18, slug: 'villa-morges', titre: 'Villa familiale', lieu: 'Morges',
    prix: "1'790'000", pieces: '5', surface: '148 m²', terrain: '808 m²', categorie: 'vendu',
    img: '/photos/morges-fauvette/drone_facade.jpg',
    photos: ['/photos/morges-fauvette/drone_facade.jpg','/photos/morges-fauvette/drone_lac.jpg','/photos/morges-fauvette/drone_quartier.jpg','/photos/morges-fauvette/salon.jpg','/photos/morges-fauvette/cuisine.jpg','/photos/morges-fauvette/chambre_combles1.jpg','/photos/morges-fauvette/chambre_combles2.jpg','/photos/morges-fauvette/sdb.jpg','/photos/morges-fauvette/chambre_rez.jpg','/photos/morges-fauvette/bureau.jpg','/photos/morges-fauvette/jardin.jpg'],
    description: "Villa familiale de 5 pièces à Morges, sur une parcelle arborée de 808 m². Quatre chambres, trois salles d'eau, double garage. Triple orientation sud, est et ouest. CHF 380'800.- de travaux documentés depuis l'acquisition. Vue sur le lac Léman depuis l'étage."
  },
  {
    id: 5, slug: 'villa-cossonay', titre: 'Villa jumelée', lieu: 'Cossonay-Ville',
    prix: "1'450'000", pieces: '5', surface: '150 m²', terrain: '-', categorie: 'vendu',
    img: '/photos/cossonay/DJI_20260304145633_0009_D.jpg',
    photos: ['/photos/cossonay/DJI_20260304145633_0009_D.jpg','/photos/cossonay/DJI_20260304150013_0015_D.jpg','/photos/cossonay/IMG_7366.jpg','/photos/cossonay/Cuisine_lumineuse_avec_vue_sur_le_jardin.png','/photos/cossonay/Chambre_d_attic_chaleureuse_et_lumineuse.png','/photos/cossonay/Salle_de_bains_sous_les_combles.png','/photos/cossonay/ChatGPT_Image_19_mars_2026__10_29_05.png'],
    description: "Villa jumelée de 5.5 pièces à Cossonay-Ville, avec vue dégagée sur le Jura et les Alpes. Jardin plat, véranda, calme absolu en bordure de campagne. Brochure et visite sur demande."
  },
  {
    id: 1, slug: 'maison-yverdon', titre: 'Maison individuelle', lieu: 'Yverdon-les-Bains',
    prix: "2'290'000", pieces: '8.5', surface: '240 m²', terrain: "1'260 m²", categorie: 'en_vente',
    img: '/photos/yverdon/drone_coucher.jpg',
    photos: ['/photos/yverdon/drone_coucher.jpg','/photos/yverdon/IMG_5987.jpg','/photos/yverdon/IMG_5989.jpg','/photos/yverdon/IMG_5990.jpg','/photos/yverdon/IMG_5993.jpg','/photos/yverdon/IMG_5994.jpg','/photos/yverdon/IMG_6001.jpg','/photos/yverdon/IMG_6002.jpg','/photos/yverdon/IMG_6003.jpg','/photos/yverdon/IMG_6006.jpg','/photos/yverdon/IMG_6010.jpg','/photos/yverdon/IMG_6012.jpg','/photos/yverdon/IMG_6013.jpg','/photos/yverdon/IMG_6014.jpg','/photos/yverdon/IMG_6017.jpg','/photos/yverdon/IMG_6019.jpg','/photos/yverdon/IMG_6022.jpg','/photos/yverdon/IMG_6025.jpg'],
    description: "Implantée sur une parcelle de plus de 1'260 m² à Yverdon-les-Bains, cette maison individuelle de 8.5 pièces offre 240 m² habitables. Volumes généreux, jardin arboré et potentiel d'agrandissement d'environ 524 m². Proximité immédiate des thermes et de toutes les commodités."
  },
  {
    id: 19, slug: 'maison-riex', titre: 'Maison vigneronne', lieu: 'Riex, Lavaux',
    prix: "1'450'000", pieces: '2.5', surface: '100 m²', terrain: '39 m²', categorie: 'en_vente',
    img: '/photos/riex/drone-facade.jpg',
    photos: ['/photos/riex/drone-facade.jpg','/photos/riex/drone-lac-panorama.jpg','/photos/riex/drone-lac-alpes.jpg','/photos/riex/drone-village.jpg','/photos/riex/salon.jpg','/photos/riex/cuisine.jpg','/photos/riex/salle-de-bains.jpg','/photos/riex/sauna.jpg','/photos/riex/sauna-douche.jpg'],
    description: "Au coeur du village de Riex, dans le périmètre UNESCO de Lavaux, cette maison vigneronne de 1680 entièrement rénovée en 1989 déploie ses 100 m² habitables sur quatre niveaux. Séjour lumineux avec double hauteur, cuisine ouverte avec accès balcon, chambre au dernier étage avec vide sur séjour et salle de bains moderne sous vélux. Sauna privatif au sous-sol, deux places de parking couvert. La porte de la façade sud est classée monument historique. Vue sur les toits, le lac Léman et les Alpes."
  },
  {
    id: 20, slug: 'villa-granges-veveyse', titre: 'Villa individuelle', lieu: 'Granges (Veveyse)',
    prix: "1'230'000", pieces: '4.5', surface: '~150 m²', terrain: '955 m²', categorie: 'vendu',
    img: '/photos/granges/drone_aerial.jpg',
    photos: ['/photos/granges/drone_aerial.jpg','/photos/granges/drone_rear.jpg','/photos/granges/terrasse.jpg','/photos/granges/salon.jpg','/photos/granges/cuisine.jpg','/photos/granges/mezzanine.jpg','/photos/granges/chambre.jpg','/photos/granges/sdd.jpg','/photos/granges/carnotzet.jpg','/photos/granges/drone_panorama.jpg'],
    description: "A Granges (Veveyse), cette villa individuelle de 2007 offre un panorama exceptionnel sur les Préalpes fribourgeoises. Séjour avec cheminée, cuisine ouverte sur terrasse de plus de 100 m², suite parentale avec dressing et sauna. Carnotzet au sous-sol, jacuzzi, PAC géothermique. Parcelle de 955 m²."
  },
  {
    id: 8, slug: 'maison-gland-buis', titre: 'Maison jumelée', lieu: 'Gland',
    prix: "2'750'000", pieces: '6.5', surface: '230 m²', terrain: '-', categorie: 'en_vente',
    img: '/photos/gland-buis/DJI_20260115164414_0005_D.jpg',
    photos: ['/photos/gland-buis/DJI_20260115164414_0005_D.jpg','/photos/gland-buis/IMG_6123.jpg','/photos/gland-buis/IMG_6129.jpg','/photos/gland-buis/IMG_6134.jpg','/photos/gland-buis/IMG_6137.jpg','/photos/gland-buis/IMG_6140.jpg','/photos/gland-buis/IMG_6141.jpg','/photos/gland-buis/IMG_6143.jpg','/photos/gland-buis/IMG_6147.jpg','/photos/gland-buis/IMG_6148.jpg','/photos/gland-buis/IMG_6150.jpg','/photos/gland-buis/IMG_6151.jpg','/photos/gland-buis/IMG_6152.jpg','/photos/gland-buis/IMG_6153.jpg','/photos/gland-buis/IMG_6154.jpg','/photos/gland-buis/IMG_6155.jpg'],
    description: "Maison jumelée d'exception à Gland. Architecture contemporaine, volumes généreux et finitions soignées. Terrasse, jardin privatif et vue dégagée."
  },
  {
    id: 2, slug: 'immeuble-lausanne-vallon', titre: 'Immeuble de rendement', lieu: 'Lausanne',
    prix: "6'000'000", pieces: '-', surface: "1'015 m²", terrain: '-', categorie: 'reserve',
    composition: '20 appartements + 1 local commercial',
    img: '/photos/lausanne-vallon/DJI_20260116105551_0007_D.jpg',
    photos: ['/photos/lausanne-vallon/DJI_20260116105551_0007_D.jpg','/photos/lausanne-vallon/IMG_6521.jpg','/photos/lausanne-vallon/IMG_6523.jpg','/photos/lausanne-vallon/IMG_6524.jpg','/photos/lausanne-vallon/IMG_6525.jpg','/photos/lausanne-vallon/IMG_6526.jpg'],
    description: "Immeuble de rendement à Lausanne, 1'015 m² de surface locative répartis entre 20 appartements et 1 local commercial. Revenus locatifs stables, emplacement urbain recherché. Détails financiers sur demande."
  },
  {
    id: 3, slug: 'immeuble-glion', titre: 'Immeuble locatif', lieu: 'Glion',
    prix: "2'420'000", pieces: '-', surface: '-', terrain: '-', categorie: 'en_vente',
    composition: '4 appartements',
    img: '', photos: [],
    description: "Immeuble locatif situé à Glion, dans un cadre exceptionnel surplombant le Léman. Vue panoramique sur le lac et les Alpes."
  },
  {
    id: 4, slug: 'immeuble-lausanne-levant', titre: 'Immeuble locatif', lieu: 'Lausanne',
    prix: "1'590'000", pieces: '-', surface: '-', terrain: '-', categorie: 'vendu',
    composition: '3 appartements',
    img: '/photos/lausanne-levant/IMG_6321.jpg',
    photos: ['/photos/lausanne-levant/IMG_6321.jpg'],
    description: "Immeuble de trois logements à Lausanne. Vente conclue avec succès."
  },
  {
    id: 7, slug: 'appartement-lemont', titre: 'Appartement PPE', lieu: 'Le Mont-sur-Lausanne',
    prix: "930'000", pieces: '3.5', surface: '110 m²', terrain: '-', categorie: 'en_vente',
    img: '/photos/lemont/IMG_4544.jpg',
    photos: ['/photos/lemont/IMG_4542.jpg','/photos/lemont/IMG_4543.jpg','/photos/lemont/IMG_4544.jpg','/photos/lemont/IMG_4545.jpg','/photos/lemont/IMG_4547.jpg','/photos/lemont/IMG_4550.jpg','/photos/lemont/IMG_4552.jpg','/photos/lemont/IMG_4557.jpg','/photos/lemont/IMG_4559.jpg'],
    description: "Appartement PPE au Mont-sur-Lausanne, dans un cadre résidentiel prisé. Lumineux et fonctionnel, avec vue dégagée sur la campagne environnante."
  },
  {
    id: 9, slug: 'maison-tartegnin', titre: 'Maison villageoise', lieu: 'Tartegnin',
    prix: "1'660'000", pieces: '3.5', surface: '141 m²', terrain: '-', categorie: 'reserve',
    img: '/photos/tartegnin/Retouchées__1_.jpg',
    photos: ['/photos/tartegnin/Retouchées__1_.jpg','/photos/tartegnin/IMG_5604.jpg','/photos/tartegnin/IMG_5745.jpg','/photos/tartegnin/IMG_5746.jpg','/photos/tartegnin/IMG_5747.jpg','/photos/tartegnin/IMG_5748.jpg','/photos/tartegnin/IMG_5749.jpg','/photos/tartegnin/IMG_5750.jpg','/photos/tartegnin/IMG_5752.jpg','/photos/tartegnin/IMG_5755.jpg'],
    description: "Maison villageoise de charme à Tartegnin, au coeur du vignoble de La Côte. Vue lac, piscine, jardin généreux et combles aménagés avec goût. Un cadre de vie rare entre village et nature."
  },
  {
    id: 10, slug: 'maison-dully', titre: 'Maison mitoyenne', lieu: 'Dully',
    prix: "1'590'000", pieces: '-', surface: '-', terrain: '-', categorie: 'vendu',
    img: '/photos/dully/1775578068436_photo1.jpg',
    photos: ['/photos/dully/1775578068436_photo1.jpg'],
    description: "Maison mitoyenne à Dully, village prisé de La Côte. Vente conclue avec succès."
  },
  {
    id: 11, slug: 'appartement-gland-aubepine', titre: 'Appartement', lieu: 'Gland',
    prix: "1'250'000", pieces: '5.5', surface: '150 m²', terrain: '-', categorie: 'vendu',
    img: '/photos/gland-aubepine/IMG_5515.jpg',
    photos: ['/photos/gland-aubepine/IMG_5515.jpg'],
    description: "Appartement spacieux à Gland. Vente conclue avec succès."
  },
  {
    id: 12, slug: 'appartement-longirod', titre: 'Appartement', lieu: 'Longirod',
    prix: "750'000", pieces: '3.5', surface: '99 m²', terrain: '-', categorie: 'en_vente',
    img: '/photos/longirod/DJI_20260119103256_0010_D.jpg',
    photos: ['/photos/longirod/DJI_20260119103256_0010_D.jpg','/photos/longirod/DJI_20260119103443_0013_D.jpg','/photos/longirod/IMG_4968.jpg','/photos/longirod/IMG_4970.jpg','/photos/longirod/IMG_4971.jpg','/photos/longirod/IMG_4972.jpg','/photos/longirod/IMG_4974.jpg','/photos/longirod/IMG_4975.jpg','/photos/longirod/IMG_4976.jpg','/photos/longirod/IMG_4980.jpg','/photos/longirod/IMG_4983.jpg'],
    description: "Appartement lumineux à Longirod, au pied du Jura. Cadre verdoyant, vue sur la campagne et les Alpes. Cheminée, balcon et ambiance chaleureuse."
  },
  {
    id: 13, slug: 'maison-senarclens', titre: 'Maison individuelle', lieu: 'Senarclens',
    prix: "1'500'000", pieces: '-', surface: '-', terrain: '-', categorie: 'vendu',
    img: '/photos/senarclens/1775570719205_IMG_5840.jpg',
    photos: ['/photos/senarclens/1775570719205_IMG_5840.jpg'],
    description: "Maison individuelle à Senarclens. Piscine, grand jardin et vue panoramique sur le Gros-de-Vaud. Vente conclue avec succès."
  },
  {
    id: 14, slug: 'immeuble-lausanne-monttendre', titre: 'Immeuble locatif', lieu: 'Lausanne',
    prix: "1'480'000", pieces: '-', surface: '-', terrain: '-', categorie: 'vendu',
    composition: '3 appartements',
    img: '/photos/lausanne-monttendre/IMG_6530.jpg',
    photos: ['/photos/lausanne-monttendre/IMG_6530.jpg'],
    description: "Immeuble locatif de 3 appartements à Lausanne, secteur Sous-Gare. Vente conclue avec succès."
  },
  {
    id: 15, slug: 'villa-crissier', titre: 'Villa individuelle', lieu: 'Crissier',
    prix: "2'350'000", pieces: '-', surface: '-', terrain: '-', categorie: 'vendu',
    img: '/photos/crissier/P1010660.jpg',
    photos: ['/photos/crissier/P1010660.jpg'],
    description: "Villa individuelle avec piscine à Crissier. Pièces de réception lumineuses avec cheminée, cuisine équipée, plusieurs chambres et salles de bains rénovées. Jardin arboré et piscine. Vente conclue avec succès."
  },
  {
    id: 16, slug: 'maison-gilly', titre: 'Maison villageoise', lieu: 'Gilly',
    prix: "890'000", pieces: '-', surface: '-', terrain: '-', categorie: 'vendu',
    img: '/photos/gilly/IMG_4158__1_.jpg',
    photos: ['/photos/gilly/IMG_4158__1_.jpg'],
    description: "Maison villageoise de caractère à Gilly, au coeur du vignoble de La Côte. Murs crépis, tomettes, poutres apparentes et poêle à bois. Terrasse sur les toits et volumes atypiques. Vente conclue avec succès."
  },
  {
    id: 17, slug: 'maison-jouxtens', titre: 'Maison individuelle', lieu: 'Jouxtens-Mézery',
    prix: "1'990'000", pieces: '-', surface: '-', terrain: '-', categorie: 'vendu',
    img: '/photos/jouxtens/jouxtens_10.jpg',
    photos: ['/photos/jouxtens/jouxtens_10.jpg'],
    description: "Maison individuelle à Jouxtens-Mézery, commune résidentielle prisée aux portes de Lausanne. Vente conclue avec succès."
  },
  {
    id: 22, slug: 'maison-echallens', titre: 'Maison individuelle', lieu: 'Echallens',
    prix: "1'070'000", pieces: '-', surface: '-', terrain: '-', categorie: 'vendu',
    img: '/photos/echallens/facade.jpg',
    photos: ['/photos/echallens/facade.jpg'],
    description: "Maison individuelle à Echallens, au coeur du Gros-de-Vaud. Vente conclue avec succès."
  },
  {
    id: 23, slug: 'appartement-lausanne-chailly', titre: 'Appartement PPE', lieu: 'Lausanne',
    prix: "1'080'000", pieces: '4.5', surface: '-', terrain: '-', categorie: 'vendu',
    img: '/photos/lausanne-chailly/facade.png',
    photos: ['/photos/lausanne-chailly/facade.png'],
    description: "Appartement de 4.5 pièces dans les hauts de Chailly, quartier résidentiel prisé de Lausanne. Vente conclue avec succès."
  },
  {
    id: 24, slug: 'appartement-pully', titre: 'Appartement PPE', lieu: 'Pully',
    prix: "890'000", pieces: '4.5', surface: '93 m²', terrain: '-', categorie: 'vendu',
    img: '/photos/pully/facade.jpeg',
    photos: ['/photos/pully/facade.jpeg'],
    description: "Appartement de 4.5 pièces à Pully, vue lac et balcon plein sud. Vente conclue avec succès."
  },
  {
    id: 25, slug: 'appartement-lausanne-centre', titre: 'Appartement PPE', lieu: 'Lausanne',
    prix: "795'000", pieces: '1.5', surface: '-', terrain: '-', categorie: 'vendu',
    img: '/photos/lausanne-centre/facade.png',
    photos: ['/photos/lausanne-centre/facade.png'],
    description: "Appartement de 1.5 pièces au coeur du centre-ville de Lausanne. Vente conclue avec succès."
  },
  // ─── Transactions historiques (Cogestim 2024) ─────────────────────────────
  // Ces entrées sont sans photos pour ne pas apparaître dans la section "Nos biens"
  // mais alimentent la carte et la liste du Track Record.
  {
    id: 101, slug: 'cog-bussigny-2024', titre: 'Appartement PPE', lieu: 'Bussigny',
    prix: '-', pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2024',
    img: '', photos: [],
    description: "Vente d'un bien-fonds résidentiel à Bussigny. Mandat conclu en 2024."
  },
  {
    id: 102, slug: 'cog-allens-pre-aube', titre: 'Promotion Pré de l\'Aube (7 lots)', lieu: 'Allens',
    prix: '-', pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2024', nb_lots: 7,
    img: '', photos: [],
    description: "Commercialisation de 7 lots de la promotion Pré de l'Aube à Allens. Mandat conclu en 2024."
  },
  {
    id: 103, slug: 'cog-lausanne-risoux', titre: 'Appartement PPE', lieu: 'Lausanne',
    prix: '-', pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2024',
    img: '', photos: [],
    description: "Vente d'un appartement à Lausanne (secteur Risoux). Mandat conclu en 2024."
  },
  {
    id: 104, slug: 'cog-pully-peupliers35', titre: 'Promotion Peupliers 35 (4 lots vendus)', lieu: 'Pully',
    prix: '-', pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2024', nb_lots: 4,
    img: '', photos: [],
    description: "Mandat de commercialisation portant sur 4 lots de la Promotion Peupliers 35 à Pully. Mandat conclu en 2024."
  },
  {
    id: 105, slug: 'cog-pully-chateausec', titre: 'Appartement PPE', lieu: 'Pully',
    prix: '-', pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2024',
    img: '', photos: [],
    description: "Vente d'un bien-fonds à Pully (secteur Château-Sec). Mandat conclu en 2024."
  },
  {
    id: 106, slug: 'cog-pully-osches', titre: 'Appartement PPE', lieu: 'Pully',
    prix: '-', pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2024',
    img: '', photos: [],
    description: "Vente d'un appartement à Pully (secteur Osches). Mandat conclu en 2024."
  },
  {
    id: 107, slug: 'cog-pully-lisieron', titre: 'Appartement PPE 3.5 pièces', lieu: 'Pully',
    prix: '-', pieces: '3.5', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2024',
    img: '', photos: [],
    description: "Vente d'un appartement 3.5 pièces à Pully (secteur Lisieron). Mandat conclu en 2024."
  },
  {
    id: 108, slug: 'cog-mex-bienfonds', titre: 'Maison villageoise', lieu: 'Mex',
    prix: '-', pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2024',
    img: '', photos: [],
    description: "Vente d'une maison villageoise à Mex (VD). Mandat conclu en 2024."
  },
  {
    id: 109, slug: 'cog-forel-terrain', titre: 'Terrain', lieu: 'Forel (Lavaux)',
    prix: "1'500'000", pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2024',
    img: '', photos: [],
    description: "Vente d'un terrain à Forel (Lavaux) en 2024. Mandat Cogestim."
  },
  // ─── Ventes plus anciennes (Cogestim 2020-2023, détails confidentiels) ────
  {
    id: 201, slug: 'cog-lutry', titre: 'Villa jumelée', lieu: 'Lutry',
    prix: '-', pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023',
    img: '', photos: [],
    description: "Vente d'une villa jumelée à Lutry, période Cogestim. Détails conservés confidentiels par respect des anciens clients."
  },
  {
    id: 202, slug: 'cog-cheseaux', titre: 'Appartement PPE 4.5 pièces', lieu: 'Cheseaux-sur-Lausanne',
    prix: '-', pieces: '4.5', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023',
    img: '', photos: [],
    description: "Vente d'un appartement PPE 4.5 pièces à Cheseaux-sur-Lausanne, période Cogestim. Détails conservés confidentiels par respect des anciens clients."
  },
  {
    id: 203, slug: 'cog-rolle', titre: 'Appartement PPE 4.5 pièces', lieu: 'Rolle',
    prix: '-', pieces: '4.5', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023',
    img: '', photos: [],
    description: "Vente d'un appartement PPE 4.5 pièces à Rolle, période Cogestim. Détails conservés confidentiels par respect des anciens clients."
  },
  {
    id: 204, slug: 'cog-yverdon-anterieur', titre: 'Villa individuelle', lieu: 'Yverdon-les-Bains',
    prix: '-', pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023',
    img: '', photos: [],
    description: "Vente d'une villa individuelle à Yverdon-les-Bains, période Cogestim. Détails conservés confidentiels par respect des anciens clients."
  },
  {
    id: 205, slug: 'cog-bourg-en-lavaux', titre: 'Maison vigneronne', lieu: 'Bourg-en-Lavaux',
    prix: '-', pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023',
    img: '', photos: [],
    description: "Vente d'une maison vigneronne à Bourg-en-Lavaux, période Cogestim. Détails conservés confidentiels par respect des anciens clients."
  },
  {
    id: 206, slug: 'cog-puidoux', titre: 'Villa individuelle', lieu: 'Puidoux',
    prix: '-', pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023',
    img: '', photos: [],
    description: "Vente d'une villa individuelle à Puidoux, période Cogestim. Détails conservés confidentiels par respect des anciens clients."
  },
  {
    id: 207, slug: 'cog-savigny', titre: 'Promotion d\'appartements (6 lots)', lieu: 'Savigny',
    prix: '-', pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023', nb_lots: 6,
    img: '', photos: [],
    description: "Commercialisation de 6 appartements d'une promotion à Savigny, période Cogestim. Détails conservés confidentiels par respect des anciens clients."
  },
  {
    id: 208, slug: 'cog-belmont', titre: 'Appartement 4.5 pièces, rez-de-jardin', lieu: 'Belmont-sur-Lausanne',
    prix: '-', pieces: '4.5', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023',
    img: '', photos: [],
    description: "Vente d'un appartement 4.5 pièces en rez-de-jardin à Belmont-sur-Lausanne, période Cogestim. Détails conservés confidentiels par respect des anciens clients."
  },
  {
    id: 209, slug: 'cog-crans', titre: 'Maison villageoise, vue lac', lieu: 'Crans-près-Céligny',
    prix: '-', pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023',
    img: '', photos: [],
    description: "Vente d'une maison villageoise avec vue sur le lac Léman à Crans-près-Céligny, période Cogestim. Détails conservés confidentiels par respect des anciens clients."
  },
  {
    id: 210, slug: 'cog-begnins', titre: 'Appartement PPE 3.5 pièces', lieu: 'Begnins',
    prix: '-', pieces: '3.5', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023',
    img: '', photos: [],
    description: "Vente d'un appartement PPE 3.5 pièces à Begnins, période Cogestim. Détails conservés confidentiels par respect des anciens clients."
  },
  {
    id: 211, slug: 'cog-trelex', titre: 'Chalet en DDP', lieu: 'Trélex',
    prix: '-', pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023',
    img: '', photos: [],
    description: "Vente d'un chalet en droit distinct et permanent (DDP) à Trélex, période Cogestim. Détails conservés confidentiels par respect des anciens clients."
  },
  {
    id: 212, slug: 'cog-golion', titre: 'Appartement PPE 4.5 pièces, rez-de-chaussée', lieu: 'Golion',
    prix: '-', pieces: '4.5', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023',
    img: '', photos: [],
    description: "Vente d'un appartement PPE 4.5 pièces au rez-de-chaussée à Golion, période Cogestim. Détails conservés confidentiels par respect des anciens clients."
  },
  {
    id: 213, slug: 'cog-crissier-fermedutilleul', titre: 'Promotion Ferme du Tilleul (17 appartements + 2 surfaces commerciales)', lieu: 'Crissier',
    prix: '-', pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023', nb_lots: 19,
    img: '', photos: [],
    description: "Commercialisation complète de la Promotion Ferme du Tilleul à Crissier : 17 appartements et 2 surfaces commerciales. Mandat conduit chez Cogestim."
  },
  {
    id: 214, slug: 'cog-lausanne-chailly', titre: 'Appartement PPE 4.5 pièces', lieu: 'Lausanne',
    prix: '-', pieces: '4.5', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023',
    img: '', photos: [],
    description: "Vente d'un appartement PPE 4.5 pièces à Lausanne (secteur Chailly), période Cogestim. Détails conservés confidentiels par respect des anciens clients."
  },
  {
    id: 215, slug: 'cog-lausanne-centre-anterieur', titre: 'Appartement PPE 3.5 pièces', lieu: 'Lausanne',
    prix: '-', pieces: '3.5', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023',
    img: '', photos: [],
    description: "Vente d'un appartement 3.5 pièces au centre-ville de Lausanne, période Cogestim. Détails conservés confidentiels par respect des anciens clients."
  },
  {
    id: 216, slug: 'cog-lemont-25', titre: 'Appartement PPE 2.5 pièces', lieu: 'Le Mont-sur-Lausanne',
    prix: '-', pieces: '2.5', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023',
    img: '', photos: [],
    description: "Vente d'un appartement PPE 2.5 pièces au Mont-sur-Lausanne, période Cogestim. Détails conservés confidentiels par respect des anciens clients."
  },
  {
    id: 217, slug: 'cog-lemont-35', titre: 'Appartement PPE 3.5 pièces', lieu: 'Le Mont-sur-Lausanne',
    prix: '-', pieces: '3.5', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023',
    img: '', photos: [],
    description: "Vente d'un appartement PPE 3.5 pièces au Mont-sur-Lausanne, période Cogestim. Détails conservés confidentiels par respect des anciens clients."
  },
  {
    id: 218, slug: 'cog-lemont-villa', titre: 'Villa individuelle', lieu: 'Le Mont-sur-Lausanne',
    prix: "1'800'000", pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023',
    img: '', photos: [],
    description: "Vente d'une villa individuelle au Mont-sur-Lausanne, période Cogestim. Détails conservés confidentiels par respect des anciens clients."
  },
  {
    id: 219, slug: 'cog-epalinges-mitoyenne', titre: 'Villa mitoyenne', lieu: 'Epalinges',
    prix: '-', pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023',
    img: '', photos: [],
    description: "Vente d'une villa mitoyenne à Epalinges, période Cogestim. Détails conservés confidentiels par respect des anciens clients."
  },
  {
    id: 220, slug: 'cog-epalinges-individuelle', titre: 'Villa individuelle', lieu: 'Epalinges',
    prix: '-', pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023',
    img: '', photos: [],
    description: "Vente d'une villa individuelle à Epalinges, période Cogestim. Détails conservés confidentiels par respect des anciens clients."
  },
  {
    id: 221, slug: 'cog-vufflens', titre: 'Villa individuelle', lieu: 'Vufflens-la-Ville',
    prix: "1'850'000", pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023',
    img: '', photos: [],
    description: "Vente d'une villa individuelle à Vufflens-la-Ville, période Cogestim. Détails conservés confidentiels par respect des anciens clients."
  },
  {
    id: 222, slug: 'cog-echallens-piscine', titre: 'Villa individuelle avec piscine', lieu: 'Echallens',
    prix: "1'500'000", pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023',
    img: '', photos: [],
    description: "Vente d'une villa individuelle avec piscine à Echallens, période Cogestim. Détails conservés confidentiels par respect des anciens clients."
  },
  {
    id: 223, slug: 'cog-bougy-villars', titre: 'Maison villageoise', lieu: 'Bougy-Villars',
    prix: '-', pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023',
    img: '', photos: [],
    description: "Vente d'une maison villageoise à Bougy-Villars, période Cogestim. Détails conservés confidentiels par respect des anciens clients."
  },
  {
    id: 224, slug: 'cog-montheron', titre: 'Ancienne ferme', lieu: 'Montheron',
    prix: '-', pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023',
    img: '', photos: [],
    description: "Vente d'une ancienne ferme à Montheron (commune de Lausanne), période Cogestim. Détails conservés confidentiels par respect des anciens clients."
  },
  {
    id: 225, slug: 'cog-vers-chez-blancs', titre: 'Villa individuelle avec piscine', lieu: 'Vers-chez-les-Blancs',
    prix: '-', pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023',
    img: '', photos: [],
    description: "Vente d'une villa individuelle avec piscine à Vers-chez-les-Blancs, période Cogestim. Détails conservés confidentiels par respect des anciens clients."
  },
  {
    id: 226, slug: 'cog-prilly-immeuble', titre: 'Immeuble locatif (3 appartements)', lieu: 'Prilly',
    prix: "1'400'000", pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023', nb_lots: 3,
    composition: '3 appartements',
    img: '', photos: [],
    description: "Vente d'un immeuble locatif de 3 appartements à Prilly, période Cogestim. Détails conservés confidentiels par respect des anciens clients."
  },
  {
    id: 227, slug: 'cog-preverenges', titre: 'Appartement PPE 4.5 pièces', lieu: 'Préverenges',
    prix: "1'480'000", pieces: '4.5', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023',
    img: '', photos: [],
    description: "Vente d'un appartement PPE 4.5 pièces à Préverenges, période Cogestim. Détails conservés confidentiels par respect des anciens clients."
  },
  {
    id: 228, slug: 'cog-echallens-promo', titre: 'Promotion 3 lots Echallens (2 lots vendus)', lieu: 'Echallens',
    prix: '-', pieces: '-', surface: '-', terrain: '-', categorie: 'vendu', annee_vente: '2020-2023', nb_lots: 2,
    img: '', photos: [],
    description: "Mandat de commercialisation portant sur 2 lots d'une petite promotion résidentielle de 3 appartements à Echallens. Mandat conduit chez Cogestim."
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

Les certificats énergétiques ne sont pas obligatoires pour vendre dans le Canton de Vaud, mais un CECB (Certificat énergétique cantonal des bâtiments) est de plus en plus demandé par les acquéreurs et leurs banques. Comptez entre CHF 1'000.- et CHF 3'000.- selon la taille du bâtiment. Là aussi, le coût est déductible du gain immobilier.

Mon conseil : faites le calcul complet avant de fixer votre prix minimum. J'accompagne systématiquement mes clients dans ces démarches pour leur simplifier la vie au maximum. Entre la banque, le notaire, l'administration fiscale et les certificats à fournir, la vente d'un bien peut vite devenir un parcours administratif. Mon rôle, c'est aussi de vous guider là-dedans.`,
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

Si vous vendez un appartement en propriété par étages, des documents spécifiques à la PPE sont indispensables :

- **Le règlement d'administration et d'utilisation de la PPE**
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
| Documents PPE | Administrateur de la PPE | Souvent inclus dans les charges | 1 à 3 semaines |

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
- Les coûts sont supportés par la PPE (fonds de rénovation ou charges communes).
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
  {
    slug: 'vendre-bien-succession-vaud',
    titre: "Vendre un bien immobilier en succession dans le canton de Vaud : ce que les héritiers doivent savoir",
    chapeau: "Indivision, impôt sur les successions, délai de vente, partage du produit : la vente d'un bien hérité obéit à des règles précises. Voici comment s'y prendre pour éviter les blocages et vendre dans les meilleures conditions.",
    date: '2026-04-12',
    categorie: 'Juridique',
    contenu: `La mort d'un proche laisse rarement le temps de planifier sereinement la suite. Et pourtant, la vente d'un bien immobilier en succession exige une organisation rigoureuse. Entre les démarches administratives, les décisions collectives à prendre entre héritiers et les enjeux fiscaux, le processus peut vite devenir une source de tension. Voici ce que vous devez savoir, étape par étape.

## Qui peut vendre un bien en succession ?

Dès le décès, les héritiers forment une communauté héréditaire (article 602 du Code civil suisse). Le bien immobilier appartient à tous les héritiers ensemble, dans l'indivision. Personne ne peut en disposer seul : ni le vendre, ni le louer, ni même le modifier sans l'accord de tous.

Cette règle a une conséquence pratique immédiate : si un héritier refuse de vendre, il bloque la transaction. La seule solution légale dans ce cas est de demander le partage judiciaire, ce qui peut prendre des années et coûter cher. Autant prévoir une discussion sérieuse entre héritiers avant de contacter un courtier.

La bonne pratique : désigner un représentant de la communauté héréditaire (souvent le conjoint survivant ou l'aîné) pour centraliser les décisions et signer les documents. Cela simplifie considérablement le processus.

## Faut-il attendre le partage successoral pour vendre ?

Non. La communauté héréditaire peut vendre le bien avant le partage successoral. C'est même souvent recommandé : cela permet de liquider l'actif immobilier, de répartir le produit en espèces, et d'éviter des discussions interminables sur qui garde quoi.

La vente avant partage nécessite l'accord unanime des héritiers. L'acte de vente est signé par tous (ou par leur représentant dûment mandaté) devant le notaire.

Si le bien est vendu après le partage, chaque héritier reçoit sa quote-part de la parcelle. Il peut alors la vendre individuellement. Mais cette approche est plus complexe et alourdit les frais notariaux.

## Quels sont les documents à réunir ?

Outre les documents habituels pour toute vente immobilière dans le canton de Vaud (extrait du registre foncier, CECB, police ECA, plans), la vente en succession nécessite des documents spécifiques :

- **Le certificat d'héritiers** : c'est la pièce centrale. Il atteste de la qualité d'héritier et permet d'agir au nom de la communauté héréditaire. Dans le canton de Vaud, il est établi par le juge de paix du district du dernier domicile du défunt. Délai : de quelques semaines à plusieurs mois selon la complexité de la succession. Ne sous-estimez pas ce délai.
- **Le testament ou le pacte successoral** (si existant), déposé auprès des autorités compétentes.
- **La liste des dettes de la succession** : hypothèques, charges fiscales, factures en cours. Le notaire en aura besoin pour calculer le produit net.
- **Les documents habituels** : CECB, extrait RF, police ECA, plans, factures de travaux.

## Quelle est la fiscalité applicable dans le canton de Vaud ?

Deux impôts distincts s'appliquent lors d'une vente en succession.

**L'impôt sur les successions** est prélevé par le canton et la commune sur la valeur transmise par le défunt. Dans le canton de Vaud, les héritiers directs (enfants, conjoints, partenaires enregistrés) sont exonérés. Les autres héritiers (frères, soeurs, neveux, amis) paient un impôt dont le taux varie selon le degré de parenté et la valeur des actifs transmis.

Point important : l'impôt sur les successions est calculé sur la valeur vénale du bien au moment du décès, pas sur le prix de vente. Si le bien prend de la valeur entre le décès et la vente, seul l'impôt sur le gain immobilier sera dû sur la différence.

**L'impôt sur le gain immobilier** est dû sur la plus-value réalisée entre le prix de revient du défunt et le prix de vente. La durée de détention compte depuis la date d'acquisition originelle par le défunt, pas depuis le décès. Ce point est souvent mal compris : si le défunt a acheté le bien en 1995 et qu'il est vendu en 2026, la durée de détention est de 31 ans. Le taux applicable sera de 7 % (plancher dans le canton de Vaud).

Bonne nouvelle : les années d'occupation du défunt comme résidence principale comptent double dans le calcul de la durée de détention fiscale. Et les impenses réalisées par le défunt sont déductibles du gain imposable, à condition de retrouver les factures.

## La vente en succession est-elle soumise à la L3PL ?

En règle générale, non. Le transfert de propriété par succession (héritage) n'est pas soumis à la loi sur la préservation et la promotion du parc locatif (L3PL). Ce transfert n'est pas à titre onéreux et échappe donc au champ d'application de la loi.

En revanche, dès lors que les héritiers souhaitent vendre le bien hérité (même s'il est ou a été loué), la L3PL s'applique à nouveau. Les héritiers doivent alors vérifier si une autorisation d'aliénation est nécessaire, selon les mêmes règles qu'une vente classique.

## Comment fixer le prix de vente ?

La tentation est souvent de fixer un prix sentimental, lié à ce que valait le bien "du temps du défunt" ou à ce que les héritiers imaginent qu'il vaut. Cette approche mène presque toujours à un prix trop élevé ou trop bas.

La bonne démarche : faire réaliser une estimation professionnelle par un courtier local, fondée sur les transactions récentes dans le secteur, l'état réel du bien et une analyse des trois valeurs (intrinsèque, de rendement, vénale). Cette estimation sert ensuite de base aux discussions entre héritiers et protège tout le monde d'un accord pris sous l'émotion.

Dans les successions complexes (plusieurs héritiers, bien loué, désaccord sur le prix), il est possible de demander une expertise judiciaire. C'est plus lourd et plus coûteux, mais c'est parfois la seule solution pour débloquer une situation.

## Quels sont les blocages les plus fréquents ?

Dans ma pratique, les successions qui traînent ont presque toujours la même origine : un héritier qui veut garder le bien, un autre qui veut vendre, et personne pour trancher.

Quelques situations typiques :

- Un enfant veut racheter le bien à ses cohéritiers à un prix inférieur à la valeur du marché. Les autres refusent. La vente est bloquée.
- Le bien est loué. Le locataire a un droit de préemption dans certaines conditions (article 681b CO). Il peut compliquer ou retarder la vente.
- Les héritiers sont dans plusieurs pays. Les délais de signature s'allongent, les procurations compliquent la gestion.
- Le bien a des travaux à réaliser. Qui les finance ? Sur quel budget ?

La meilleure façon d'éviter ces blocages : nommer un représentant unique dès le début, mandater un courtier expérimenté pour objectiver la valeur du bien, et ne pas attendre que la tension monte entre héritiers pour organiser une réunion commune.

## Quel est le rôle du courtier dans une vente en succession ?

Au-delà de la commercialisation classique, le courtier joue un rôle de facilitateur entre les héritiers. Il est le tiers neutre qui apporte des chiffres là où les émotions prennent parfois le dessus.

Concrètement, il peut :

- Réaliser l'estimation et la présenter à l'ensemble des héritiers
- Coordonner la collecte des documents (certificat d'héritiers, CECB, extrait RF)
- Gérer la relation avec le notaire chargé de la succession
- Organiser les visites et filtrer les acquéreurs
- Accompagner les héritiers jusqu'à la signature de l'acte notarié

Dans les successions complexes, je recommande systématiquement une réunion initiale avec tous les héritiers, physiquement ou en visioconférence. Poser les règles du jeu dès le début évite beaucoup de malentendus par la suite.

## Ce que je retiens après six ans de courtage dans le canton de Vaud

La vente en succession est l'une des transactions les plus délicates à gérer. Pas parce qu'elle est techniquement complexe, mais parce qu'elle se déroule dans un contexte émotionnel particulier. Le deuil n'est pas toujours fait. Les relations familiales sont parfois tendues. Et le bien immobilier devient un objet de projection pour tout le monde.

Trois principes que j'applique systématiquement dans ces situations :

1. Objectiver la valeur du bien dès le départ, avec une estimation écrite et argumentée. C'est le seul moyen de sortir des discussions basées sur des impressions.
2. Identifier qui décide. Si personne n'a l'autorité pour trancher, la vente ne se fera pas.
3. Anticiper les délais administratifs. Le certificat d'héritiers peut prendre trois mois. La L3PL peut ajouter six à huit semaines. Un acquéreur motivé ne patientera pas indéfiniment.

Une succession bien gérée peut se conclure en trois à cinq mois. Mal gérée, elle peut s'étirer sur des années, au détriment de tout le monde.`,
    cta: "Vous êtes héritier d'un bien immobilier dans le canton de Vaud et vous ne savez pas par où commencer ? Contactez-moi, je vous accompagne de l'estimation jusqu'à la signature."
  },
  {
    slug: 'droits-mutation-frais-notaire-vaud',
    titre: "Droits de mutation et frais de notaire dans le canton de Vaud : combien ça coûte ?",
    chapeau: "3,3 % de droits de mutation, 0,3 % de registre foncier, 0,5 à 0,7 % d'émoluments notariaux : au total, comptez environ 4 % du prix d'achat. Voici le détail, avec un exemple chiffré.",
    date: '2026-04-17',
    categorie: 'Guide pratique',
    contenu: `Dans le canton de Vaud, les frais liés à l'achat d'un bien immobilier s'élèvent à environ 4 % du prix de vente. Ce montant, souvent appelé "frais de notaire", ne rémunère en réalité le notaire que pour une faible part. L'essentiel va à l'État sous forme de droits de mutation. Ces frais sont à la charge de l'acquéreur. En contrepartie, c'est lui qui choisit le notaire.

## Comment se décomposent les frais de notaire dans le canton de Vaud ?

Le montant total se répartit en trois postes principaux :

| Poste | Taux | Bénéficiaire |
|---|---|---|
| Droits de mutation | 3,3 % du prix de vente | Canton (2,2 %) + Commune (max 1,1 %) |
| Inscription au Registre foncier | ~0,3 % | Registre foncier |
| Émoluments du notaire | 0,5 % à 0,7 % | Notaire |
| **Total estimé** | **~4 %** | |

Les droits de mutation représentent de loin la part la plus importante. Le notaire n'est qu'un intermédiaire : il perçoit l'ensemble des frais et reverse les droits de mutation au canton et à la commune.

## Que sont exactement les droits de mutation ?

Les droits de mutation sont un impôt prélevé sur tout transfert de propriété immobilière à titre onéreux dans le canton de Vaud (article 10 LMSD). Le taux cantonal est fixe à 2,2 %, quel que soit le montant du bien. Les communes sont autorisées à percevoir un supplément communal pouvant aller jusqu'à la moitié du taux cantonal, soit 1,1 %. Dans la grande majorité des communes vaudoises, le taux communal est appliqué au maximum, ce qui donne un total de 3,3 %.

Certaines communes accordent des exonérations partielles sur la part communale pour les primo-acquéreurs ou pour l'achat d'une résidence principale. Renseignez-vous auprès de votre commune ou de votre notaire.

## Qui paie quoi dans le canton de Vaud ?

La répartition est claire :

- **L'acquéreur** paie l'intégralité des frais de notaire : droits de mutation, inscription au registre foncier et émoluments du notaire.
- **Le vendeur** ne paie en principe aucun frais notarial lié à la vente, sauf cas particulier (radiation de servitudes, par exemple).
- **Le vendeur** paie l'impôt sur le gain immobilier, la commission de courtage et le remboursement anticipé éventuel de l'hypothèque.

C'est pour cette raison que le choix du notaire revient à l'acquéreur : c'est lui qui paie.

## Faut-il prévoir des frais supplémentaires en cas d'hypothèque ?

Oui. Si l'acquéreur finance son achat par un prêt hypothécaire, des frais supplémentaires s'appliquent pour la constitution de la cédule hypothécaire. Comptez environ 1,5 à 2,5 % du montant du prêt. Ces frais incluent les droits de timbre, les émoluments du registre foncier et les honoraires du notaire pour la rédaction de l'acte de gage.

Si une cédule hypothécaire existe déjà et peut être cédée par le vendeur, ces frais sont considérablement réduits.

## Exemple concret : achat d'un appartement à CHF 900'000.-

| Poste | Calcul | Montant |
|---|---|---|
| Droits de mutation (3,3 %) | 900'000 x 3,3 % | CHF 29'700.- |
| Inscription Registre foncier (~0,3 %) | 900'000 x 0,3 % | CHF 2'700.- |
| Émoluments du notaire (~0,6 %) | 900'000 x 0,6 % | CHF 5'400.- |
| **Total frais de notaire** | | **CHF 37'800.-** |
| Cédule hypothécaire (prêt de CHF 720'000.-, ~2 %) | 720'000 x 2 % | CHF 14'400.- |
| **Total frais d'acquisition** | | **CHF 52'200.-** |

Ces CHF 52'200.- doivent être financés par les fonds propres de l'acquéreur, en plus des 20 % d'apport minimum exigés par les banques. C'est un point que beaucoup de primo-acquéreurs sous-estiment.

## Les droits de mutation sont-ils déductibles ?

Oui, mais pas de l'impôt sur le revenu. Les droits de mutation payés à l'achat constituent une impense déductible de l'impôt sur le gain immobilier au moment de la revente du bien. Plus vos frais d'acquisition sont élevés et documentés, plus votre gain imposable sera réduit lors de la revente.

Depuis le 1er janvier 2026, le canton de Vaud a supprimé le forfait de 4,5 % qui permettait de déduire les frais d'acquisition sans justificatif. Il est désormais indispensable de conserver l'acte d'achat original avec le décompte du notaire. Si vous ne l'avez plus, contactez votre notaire ou le Registre foncier pour en obtenir une copie.

## Peut-on réduire les frais de notaire ?

Les droits de mutation et les frais de registre foncier sont fixés par la loi et ne sont pas négociables. En revanche, les émoluments du notaire peuvent varier. Dans le canton de Vaud, le système de notariat est libre : les notaires fixent leurs honoraires selon un barème dégressif. Il est tout à fait possible de demander des devis à plusieurs études pour comparer.

En pratique, l'économie potentielle sur les émoluments reste modeste (quelques centaines de francs sur une transaction standard). La vraie économie se fait sur le taux hypothécaire et les conditions de financement, pas sur le choix du notaire.

Un cas particulier intéressant : l'achat sur plan. Les droits de mutation ne s'appliquent que sur la valeur du terrain, pas sur la construction à venir. Les frais d'acquisition sont donc nettement inférieurs à ceux d'un achat dans l'existant.

## Ce que cela signifie pour votre projet d'achat

Les frais de notaire représentent un poste incompressible de votre budget. Sur un bien à CHF 1'000'000.-, comptez CHF 40'000.- à 50'000.- de frais d'acquisition, à financer entièrement sur fonds propres. C'est un montant que votre banque ne financera pas.

Trois réflexes à adopter :

1. Intégrez ces frais dès le calcul de votre budget, pas après avoir trouvé le bien.
2. Conservez précieusement votre acte d'achat et le décompte du notaire. Ces documents vaudront de l'argent le jour où vous revendrez.
3. Si vous achetez dans une commune qui exonère partiellement les droits de mutation pour les résidences principales, faites-le valoir auprès du notaire.`,
    cta: "Vous avez un projet d'achat dans le canton de Vaud ? Contactez-moi pour une vision claire de tous les frais à anticiper."
  },
  {
    slug: 'fonds-propres-achat-immobilier-suisse',
    titre: "Combien de fonds propres faut-il pour acheter un bien immobilier en Suisse ?",
    chapeau: "20 % du prix d'achat, dont au moins 10 % hors prévoyance professionnelle. Voici d'où peuvent provenir vos fonds propres, comment utiliser votre 2e et 3e pilier, et ce que les banques exigent réellement.",
    date: '2026-04-24',
    categorie: 'Guide acquéreur',
    contenu: `Pour acheter un bien immobilier en Suisse, vous devez apporter au minimum 20 % du prix d'achat en fonds propres. Sur ces 20 %, au moins 10 % doivent provenir de sources hors prévoyance professionnelle (épargne, 3e pilier, donation, héritage). Les 10 % restants peuvent être constitués par un retrait ou un nantissement de votre 2e pilier. À cela s'ajoutent les frais d'acquisition (environ 4 % dans le canton de Vaud), eux aussi à financer sur fonds propres.

## Quelle est la règle des 20 % en Suisse ?

La FINMA (Autorité fédérale de surveillance des marchés financiers) impose aux banques de n'accorder un prêt hypothécaire qu'à hauteur de 80 % de la valeur du bien. Les 20 % restants doivent être apportés par l'acquéreur sous forme de fonds propres.

Ces 20 % se décomposent en deux tranches :

| Tranche | Source | Obligation |
|---|---|---|
| 10 % minimum | Épargne personnelle, 3e pilier, donation, héritage, vente d'un autre bien | Obligatoire hors prévoyance LPP |
| 10 % complémentaires | 2e pilier (retrait ou nantissement), épargne, 3e pilier | Flexible |

Concrètement, pour un bien à CHF 1'000'000.-, il faut apporter CHF 200'000.- de fonds propres, dont au minimum CHF 100'000.- qui ne proviennent pas du 2e pilier.

## D'où peuvent provenir les fonds propres ?

Voici les sources acceptées par les banques suisses :

- **Épargne personnelle** : comptes bancaires, placements, titres. C'est la source la plus simple et la plus appréciée par les banques.
- **3e pilier (pilier 3a)** : retirable pour l'achat d'une résidence principale. L'impôt sur le retrait est prélevé à un taux réduit (variable selon le canton). Le 3e pilier compte comme fonds propres "durs" (hors LPP), ce qui en fait un levier particulièrement intéressant.
- **2e pilier (LPP)** : retrait ou nantissement, uniquement pour la résidence principale. Voir la section dédiée ci-dessous.
- **Donation ou avance sur héritage** : de plus en plus fréquent en Suisse, où les prix élevés rendent l'accession difficile sans aide familiale. La banque demandera une attestation écrite confirmant qu'il s'agit d'un don et non d'un prêt.
- **Vente d'un autre bien immobilier** : le produit de la vente peut être réinvesti comme fonds propres.
- **Crédit lombard** : nantissement d'un portefeuille de titres. La banque prête en contrepartie de la mise en gage de vos placements. Solution réservée aux patrimoines financiers importants.

## Comment utiliser son 2e pilier pour acheter ?

Le 2e pilier peut être mobilisé de deux façons pour financer l'achat d'une résidence principale :

**Le retrait anticipé (EPL)**

Vous retirez une partie ou la totalité de votre avoir LPP. L'argent est versé directement au notaire ou au créancier hypothécaire.

Conditions :
- Résidence principale uniquement (pas de résidence secondaire ni de bien locatif)
- Montant minimum de retrait : CHF 20'000.-
- Accord écrit du conjoint obligatoire
- Dès 50 ans : retrait limité au montant disponible à vos 50 ans, ou à 50 % de l'avoir actuel (le plus élevé des deux)
- Un retrait tous les 5 ans maximum
- Remboursement obligatoire en cas de revente avant la retraite

L'impôt sur le retrait est prélevé à un taux réduit, variable selon le canton. Dans le canton de Vaud, comptez environ 5 à 8 % du montant retiré.

**Le nantissement (mise en gage)**

Vous ne retirez pas l'argent. Votre avoir LPP sert de garantie à la banque, qui accepte alors de vous prêter jusqu'à 90 % de la valeur du bien au lieu de 80 %.

Avantages : pas d'impôt immédiat, votre capital retraite continue de produire des intérêts, les rachats restent possibles.

Inconvénients : dette hypothécaire plus élevée, charges mensuelles plus lourdes (amortissement obligatoire à 2/3 de la valeur en 15 ans), revenus nécessaires plus importants pour satisfaire le calcul de tenue des charges.

## Retrait ou nantissement du 2e pilier : que choisir ?

| Critère | Retrait | Nantissement |
|---|---|---|
| Impact sur la dette | Réduit l'hypothèque | L'hypothèque reste plus élevée |
| Impôt | Oui, taux réduit au moment du retrait | Non (reporté à la retraite) |
| Capital retraite | Diminué | Préservé |
| Charges mensuelles | Plus basses | Plus élevées |
| Déduction fiscale des intérêts | Moins élevée (dette plus faible) | Plus élevée (dette plus importante) |
| Rachats LPP possibles | Pas avant remboursement du retrait | Oui |

En pratique, le choix dépend de votre âge, de vos revenus et de votre stratégie fiscale. Pour un acquéreur de moins de 40 ans avec des revenus confortables, le nantissement est souvent plus avantageux à long terme. Pour un acquéreur de plus de 50 ans, le retrait est souvent la seule option réaliste. Faites-vous accompagner par un conseiller financier, ce choix a des conséquences sur 20 à 30 ans.

## Que vérifie la banque au-delà des fonds propres ?

Les 20 % de fonds propres sont une condition nécessaire, mais pas suffisante. La banque vérifie aussi la tenue des charges, c'est-à-dire votre capacité à assumer les coûts du bien sur le long terme.

Le calcul standard en Suisse :

| Poste | Taux théorique |
|---|---|
| Intérêts hypothécaires | 5 % (taux théorique, pas le taux réel) |
| Amortissement | 1 % de la valeur du bien |
| Frais d'entretien | 1 % de la valeur du bien |
| **Total des charges théoriques** | **~7 % de la valeur du bien** |

Les charges théoriques ne doivent pas dépasser un tiers de votre revenu brut annuel.

Exemple : pour un bien à CHF 1'000'000.- avec 20 % de fonds propres, les charges théoriques sont d'environ CHF 56'000.- par an (5 % de CHF 800'000.- + 1 % + 1 % de CHF 1'000'000.-). Votre revenu brut annuel doit donc être d'au moins CHF 168'000.-, soit CHF 14'000.- par mois.

## Exemple concret : achat d'un appartement à CHF 800'000.-

| Élément | Montant |
|---|---|
| Prix d'achat | CHF 800'000.- |
| Fonds propres nécessaires (20 %) | CHF 160'000.- |
| dont minimum hors LPP (10 %) | CHF 80'000.- |
| dont 2e pilier possible (10 %) | CHF 80'000.- |
| Frais d'acquisition (~4 %) | CHF 32'000.- |
| **Total à financer sur fonds propres** | **CHF 192'000.-** |
| Hypothèque (80 %) | CHF 640'000.- |
| Revenu brut annuel minimum requis | ~CHF 135'000.- |

C'est un montant que beaucoup de primo-acquéreurs découvrent tardivement. CHF 192'000.- de fonds propres pour un appartement à CHF 800'000.-, c'est la réalité du marché suisse.

## Ce que cela signifie pour votre projet d'achat

L'accession à la propriété en Suisse est exigeante en fonds propres. C'est la raison pour laquelle le taux de propriétaires reste l'un des plus bas d'Europe (environ 36 %).

Quatre réflexes pour préparer votre achat :

1. Commencez à épargner tôt, et alimentez systématiquement votre 3e pilier (plafond 2026 : CHF 7'258.- par an pour les salariés).
2. Demandez votre certificat de prévoyance LPP à votre caisse de pension pour connaître votre avoir disponible.
3. Intégrez les frais d'acquisition (~4 %) dans votre calcul, pas uniquement les 20 % de fonds propres.
4. Faites un premier rendez-vous avec votre banque ou un courtier financier avant de chercher un bien. Vous connaîtrez votre capacité d'achat réelle, et vous éviterez les déceptions.

Un acquéreur qui connaît précisément son budget avant la première visite gagne du temps, de l'énergie, et de la crédibilité auprès du vendeur.`,
    cta: "Vous préparez un achat immobilier dans le canton de Vaud ? Contactez-moi, je vous aide à structurer votre recherche."
  },
  {
    slug: 'etapes-achat-immobilier-vaud',
    titre: "Les étapes d'un achat immobilier dans le canton de Vaud",
    chapeau: "Du budget à la remise des clés : les 8 étapes concrètes d'un achat immobilier dans le canton de Vaud, avec les délais, les pièges à éviter et le rôle de chaque intervenant.",
    date: '2026-05-01',
    categorie: 'Guide acquéreur',
    contenu: `Un achat immobilier dans le canton de Vaud prend en moyenne 3 à 6 mois, de la première recherche à la signature chez le notaire. Le processus suit 8 étapes principales. Les connaître à l'avance évite les erreurs coûteuses et les pertes de temps.

## Étape 1 : définir son budget réel

Avant de visiter le moindre bien, vous devez connaître votre capacité d'achat. Deux critères la déterminent :

- **Les fonds propres** : 20 % du prix d'achat minimum, dont 10 % hors prévoyance professionnelle. À cela s'ajoutent environ 4 % de frais d'acquisition (droits de mutation, notaire, registre foncier).
- **La tenue des charges** : les charges théoriques du logement (intérêts à 5 %, amortissement 1 %, entretien 1 %) ne doivent pas dépasser un tiers de votre revenu brut.

Concrètement, pour un bien à CHF 1'000'000.-, il faut environ CHF 240'000.- de fonds propres (20 % + frais) et un revenu brut annuel d'au moins CHF 168'000.-.

Le réflexe à adopter : prenez rendez-vous avec votre banque ou un courtier financier avant de chercher un bien. Vous connaîtrez votre plafond et vous éviterez de vous projeter sur des biens hors de portée.

## Étape 2 : chercher et comparer

La recherche commence sur les portails (Immoscout24, Homegate, Acheter-Louer) et les sites des courtiers. Dans le canton de Vaud, le marché est tendu sur les segments les plus recherchés (PPE 3-4 pièces à Lausanne, villas familiales de la première couronne). Les biens au juste prix partent vite.

Trois conseils pour gagner en efficacité :

1. Activez les alertes sur les portails avec des critères précis (commune, nombre de pièces, budget).
2. Inscrivez-vous directement auprès des courtiers actifs dans votre zone. Certains biens sont proposés en avant-première à leur réseau avant d'être publiés.
3. Visitez suffisamment pour calibrer votre regard. Les 3-4 premières visites servent à comprendre le marché. Les suivantes à identifier le bon bien.

## Étape 3 : visiter et analyser

La visite est un moment clé. Au-delà de l'impression générale, vérifiez les points suivants :

- L'état réel du bien : toiture, façade, fenêtres, installation électrique, sanitaires, chauffage. Demandez l'année de la dernière rénovation pour chaque poste.
- Le CECB : il vous indique la classe énergétique du bâtiment et les éventuels travaux à prévoir.
- Pour un appartement en PPE : les procès-verbaux des assemblées générales, le fonds de rénovation, les travaux votés ou à venir. C'est là que se cachent les mauvaises surprises.
- L'environnement : bruit, orientation, voisinage, transports, écoles. Revenez à un moment différent de la journée pour vérifier.

N'hésitez pas à demander une deuxième visite. Un acquéreur sérieux ne se décide pas sur une seule impression.

## Étape 4 : formuler une offre

Quand vous avez trouvé le bien, vous formulez une offre par écrit. Dans le canton de Vaud, il n'existe pas de "promesse de vente" comme en France. L'offre est un engagement moral, pas juridique, tant que l'acte notarié n'est pas signé.

Votre offre doit préciser :

- Le prix proposé
- Le mode de financement (fonds propres + hypothèque, avec attestation bancaire)
- Le calendrier souhaité (date d'entrée en jouissance)
- Toute condition particulière (sous réserve de financement, par exemple)

Le vendeur peut accepter, refuser ou faire une contre-offre. En cas de plusieurs offres simultanées, c'est le vendeur qui décide, pas nécessairement au plus offrant : la solidité du financement et la simplicité du dossier comptent autant que le prix.

## Étape 5 : obtenir le financement

Une fois l'offre acceptée, vous avez généralement 2 à 4 semaines pour obtenir la confirmation définitive de votre banque. Le dossier bancaire comprend :

- Fiches de salaire des 3 derniers mois
- Dernière déclaration fiscale
- Attestation de fortune (relevés bancaires, titres)
- Certificat de prévoyance LPP (2e pilier)
- Relevés 3e pilier
- Documentation du bien (dossier acquéreur, extrait RF, CECB)

Comparez les offres de plusieurs banques. Un écart de 0,1 % sur le taux hypothécaire représente plusieurs milliers de francs sur la durée du prêt. Les courtiers en hypothèques peuvent vous faire gagner du temps et de l'argent sur cette étape.

## Étape 6 : choisir le notaire et préparer l'acte

Dans le canton de Vaud, c'est l'acquéreur qui choisit et paie le notaire. Le notaire rédige l'acte de vente, vérifie la situation juridique du bien (registre foncier, servitudes, hypothèques en cours) et coordonne les aspects financiers.

Le processus notarial se déroule en trois temps :

1. **Le projet d'acte** : le notaire envoie un projet aux deux parties pour relecture, généralement 1 à 2 semaines avant la signature. Lisez-le attentivement et posez toutes vos questions avant le jour J.
2. **La signature** : le notaire lit l'acte intégralement devant les deux parties, explique chaque clause, puis fait signer. Comptez 1 à 2 heures.
3. **L'inscription au registre foncier** : le notaire procède à l'inscription du transfert de propriété. Le délai est de quelques jours à quelques semaines selon le district.

Dans le canton de Vaud, la forme de vente la plus courante est la vente à terme : l'acte est signé, un acompte de 10 % est versé sur le compte du notaire, et le solde est payé à la date convenue pour l'entrée en jouissance.

## Étape 7 : le jour de la signature

Le jour de la signature chez le notaire, prévoyez :

- Une pièce d'identité valide
- La confirmation du versement des fonds par votre banque
- La preuve de l'assurance du bien (ECA dans le canton de Vaud, automatiquement transférée)

Le notaire retient sur le prix de vente les montants dus : remboursement de l'hypothèque du vendeur, impôt sur le gain immobilier (consigné), commission de courtage le cas échéant, et frais de notaire. Le solde est versé au vendeur.

À la signature, vous n'êtes pas encore propriétaire au sens strict : c'est l'inscription au registre foncier qui officialise le transfert. Mais dès la signature, vous avez un droit acquis sur le bien.

## Étape 8 : la remise des clés et l'installation

La remise des clés a lieu à la date convenue dans l'acte. En pratique, elle se fait souvent sur place, avec un état des lieux contradictoire entre vendeur et acquéreur. C'est le moment de vérifier que le bien est conforme à ce qui a été convenu et de relever les compteurs.

Pensez à :

- Informer votre commune de votre arrivée (si changement de domicile)
- Transférer les contrats d'énergie (électricité, gaz) à votre nom
- Souscrire une assurance ménage et responsabilité civile
- Conserver précieusement votre acte de vente et le décompte du notaire (ils serviront pour l'impôt sur le gain immobilier lors de la revente)

## Quel est le calendrier type d'un achat dans le canton de Vaud ?

| Étape | Durée indicative |
|---|---|
| Définition du budget | 1 à 2 semaines |
| Recherche et visites | 1 à 3 mois |
| Offre et négociation | 1 à 2 semaines |
| Financement bancaire | 2 à 4 semaines |
| Préparation de l'acte notarial | 2 à 4 semaines |
| Signature et inscription RF | 1 à 3 semaines |
| **Total** | **3 à 6 mois** |

Ce calendrier suppose un dossier bien préparé. Un financement non anticipé ou un dossier PPE incomplet peut ajouter plusieurs semaines.

## Ce que cela signifie pour votre projet

Un achat immobilier est un projet qui se prépare. Les acquéreurs qui arrivent avec un budget validé, une attestation bancaire et une vision claire de leurs critères sont ceux qui obtiennent les meilleurs biens, parce qu'ils inspirent confiance au vendeur et à son courtier.

Trois erreurs à éviter :

1. Visiter des biens avant d'avoir validé son financement. C'est la première cause de déception.
2. Sous-estimer les frais d'acquisition. Dans le canton de Vaud, comptez 4 % en plus du prix d'achat.
3. Attendre d'avoir trouvé le bien parfait. Il n'existe pas. Le bon bien, c'est celui qui coche 80 % de vos critères à un prix que vous pouvez assumer.`,
    cta: "Vous cherchez un bien dans le canton de Vaud ? Contactez-moi pour un premier échange sur votre projet."
  },
  {
    slug: 'etranger-permis-b-acheter-immobilier-vaud',
    titre: "Étranger avec un permis B : puis-je acheter un bien immobilier dans le canton de Vaud ?",
    chapeau: "Oui, dans la plupart des cas. Mais les règles diffèrent selon votre nationalité, votre permis et l'usage du bien. Voici ce que la Lex Koller autorise et interdit dans le canton de Vaud en 2026.",
    date: '2026-05-08',
    categorie: 'Guide acquéreur',
    contenu: `Si vous êtes ressortissant de l'UE ou de l'AELE et que vous résidez en Suisse avec un permis B, vous pouvez acheter un bien immobilier dans le canton de Vaud aux mêmes conditions qu'un citoyen suisse. Aucune autorisation n'est requise, aucune restriction de surface. Cette liberté couvre la résidence principale, les résidences secondaires et les biens de rendement. Pour les ressortissants hors UE/AELE avec permis B, l'achat est possible mais limité à la résidence principale.

La base légale est la loi fédérale sur l'acquisition d'immeubles par des personnes à l'étranger (LFAIE), communément appelée Lex Koller.

## Qui peut acheter librement dans le canton de Vaud ?

Les personnes suivantes ne sont pas considérées comme "personnes à l'étranger" au sens de la LFAIE et peuvent acheter sans restriction :

| Profil | Restrictions |
|---|---|
| Citoyen suisse | Aucune |
| Double national (dont suisse) | Aucune |
| Ressortissant UE/AELE avec permis B, domicilié en Suisse | Aucune |
| Ressortissant UE/AELE avec permis C | Aucune |
| Tout étranger avec permis C, domicilié en Suisse | Aucune |

Concrètement, un Français, un Belge, un Allemand ou un Italien titulaire d'un permis B et domicilié dans le canton de Vaud peut acheter un appartement, une villa, un immeuble locatif ou un terrain exactement comme un Suisse. Pas de formulaire, pas d'autorisation, pas de restriction de surface.

## Et si je suis hors UE/AELE avec un permis B ?

C'est ici que la Lex Koller s'applique. Un ressortissant d'un pays hors UE/AELE (par exemple américain, canadien, brésilien, indien) avec un permis B peut acheter un bien immobilier, mais uniquement sa résidence principale.

Il ne peut pas acheter :
- Une résidence secondaire (sauf dans le cadre du contingent cantonal pour logements de vacances, soumis à autorisation)
- Un bien de rendement (immeuble locatif)
- Un terrain non bâti à des fins résidentielles

Pour tout achat qui sort du cadre de la résidence principale, une autorisation de la Commission foncière est nécessaire. Les contingents sont limités et varient d'une année à l'autre.

## Et le permis C ?

Un titulaire de permis C (établissement), quelle que soit sa nationalité, a les mêmes droits qu'un citoyen suisse. Pas de restriction, pas d'autorisation. C'est la seule condition : avoir le permis C et être domicilié en Suisse.

## Et les frontaliers (permis G) ?

Les frontaliers ne peuvent pas acheter de résidence principale en Suisse (leur domicile est à l'étranger). Ils peuvent en revanche acheter des biens commerciaux sans autorisation. L'achat d'un logement de vacances est soumis à autorisation et au contingent cantonal.

## Qu'est-ce que la Lex Koller va changer en 2026-2027 ?

Le 15 avril 2026, le Conseil fédéral a annoncé un durcissement de la Lex Koller. L'avant-projet est en consultation jusqu'au 15 juillet 2026, avec une entrée en vigueur visée pour 2027. Les principales mesures proposées :

- **Ressortissants hors UE/AELE** : l'achat de résidence principale serait soumis à autorisation préalable (actuellement il est libre pour les détenteurs de permis B).
- **Obligation de revente** : un propriétaire étranger qui quitte la Suisse devrait revendre sa résidence principale dans un délai de deux ans.
- **Logements de vacances** : les contingents cantonaux seraient réduits, et les ventes entre étrangers nécessiteraient une autorisation.
- **Fonds immobiliers** : les parts de fonds immobiliers suisses cotés en bourse ne seraient plus librement accessibles aux investisseurs étrangers non-résidents.

Pour les ressortissants UE/AELE domiciliés en Suisse, l'impact serait limité : les accords bilatéraux leur garantissent l'accès à la résidence principale dans les mêmes conditions qu'aujourd'hui.

Ces mesures ne sont pas encore en vigueur. Elles font l'objet d'une consultation publique. Mais elles indiquent une tendance claire au durcissement, dans un contexte de pénurie de logements.

## Quels documents préparer pour un achat en tant qu'étranger ?

En plus des documents habituels pour tout achat immobilier, un acquéreur étranger doit fournir :

- Son permis de séjour valide (B ou C)
- Une preuve de domicile en Suisse (attestation de la commune)
- Pour les hors UE/AELE : une déclaration d'usage (résidence principale) et, le cas échéant, la demande d'autorisation auprès de la Commission foncière

Le notaire vérifie systématiquement le statut LFAIE de l'acquéreur avant d'instrumenter l'acte. Si un doute subsiste, il demande une constatation de non-assujettissement à l'autorité cantonale compétente. C'est une formalité, mais elle est obligatoire.

## Peut-on acheter avant d'avoir son permis B ?

En théorie, non. La LFAIE exige que l'acquéreur ait son domicile légal et effectif en Suisse au moment de la transaction. En pratique, dans le canton de Vaud, il est possible de signer une vente à terme avec une condition suspensive liée à l'obtention du permis de séjour. C'est une solution qui fonctionne, mais elle doit être encadrée par un notaire qui maîtrise la LFAIE.

Attention : d'autres cantons sont plus restrictifs. Le Valais a durci sa pratique en janvier 2026 et n'accepte plus de signer d'acte sans permis de séjour effectif. Dans le canton de Vaud, la pratique reste plus souple, mais il est impératif de vérifier avec le notaire avant de s'engager.

## Ce que cela signifie pour votre projet

Si vous êtes ressortissant UE/AELE avec un permis B ou C dans le canton de Vaud, vous n'avez aucune restriction. Achetez comme un Suisse.

Si vous êtes hors UE/AELE, le cadre est plus contraint mais l'achat reste possible pour votre résidence principale. Anticipez les démarches : la LFAIE ajoute une couche administrative que votre notaire et votre courtier doivent maîtriser. Un dossier bien monté en amont évite les retards et les mauvaises surprises.

Et avec le durcissement annoncé pour 2027, agir maintenant plutôt qu'attendre peut faire la différence.`,
    cta: "Vous êtes étranger et vous souhaitez acheter dans le canton de Vaud ? Contactez-moi, je connais les règles et les démarches."
  },
  {
    slug: 'retrait-2e-pilier-achat-immobilier-suisse',
    titre: "2e pilier et achat immobilier en Suisse : retrait ou nantissement ?",
    chapeau: "Votre avoir LPP peut financer une partie de votre achat immobilier. Mais les règles sont strictes, la fiscalité est souvent sous-estimée, et le choix entre retrait et nantissement n'est pas anodin. Ce que vous devez savoir avant de décider.",
    date: '2026-06-12',
    categorie: 'Guide acquéreur',
    contenu: `En Suisse, la loi autorise les assurés à mobiliser leur prévoyance professionnelle (2e pilier ou LPP) pour financer l'achat de leur résidence principale. C'est un levier puissant, surtout dans un marché où les prix vaudois nécessitent souvent des fonds propres importants. Mais ce mécanisme obéit à des règles précises, et les conséquences à long terme méritent d'être pesées sérieusement.

## Comment fonctionne l'encouragement à la propriété du logement (EPL) ?

La loi fédérale sur la prévoyance professionnelle (LPP) prévoit un mécanisme appelé encouragement à la propriété du logement, ou EPL. Il permet à un assuré de débloquer tout ou partie de son avoir LPP pour :

- Acquérir sa résidence principale
- Financer des travaux importants sur sa résidence principale (rénovation énergétique, extension)
- Rembourser un prêt hypothécaire existant lié à sa résidence principale

Une règle fondamentale s'applique dans tous les cas : le bien doit être votre résidence principale et vous devez l'occuper vous-même. L'utilisation du 2e pilier pour une résidence secondaire ou un bien locatif est strictement interdite.

## Deux mécanismes possibles : versement anticipé ou nantissement

### Le versement anticipé

Vous retirez directement une partie ou la totalité de votre avoir LPP. Les fonds sont versés à votre notaire ou à votre banque comme apport en fonds propres.

**Conditions légales :**
- Montant minimum : CHF 20'000.-
- Accord écrit du conjoint ou du partenaire enregistré obligatoire
- Un seul versement anticipé possible tous les 5 ans
- Dès 50 ans : le versement est plafonné au montant le plus élevé entre votre avoir à vos 50 ans et la moitié de votre avoir actuel
- Le versement anticipé doit être demandé au plus tard 3 ans avant la naissance du droit aux prestations de vieillesse (sous réserve d'une disposition plus favorable du règlement de votre caisse)

**Remboursement :** si vous revendez le bien avant la retraite, vous devez rembourser les sommes retirées, sauf si vous réinvestissez le produit de la vente dans une nouvelle résidence principale dans un délai de 2 ans. Le montant minimal de remboursement est de CHF 10'000.-.

**Restriction au registre foncier :** le logement financé avec le 2e pilier fait l'objet d'une restriction du droit d'aliéner inscrite au registre foncier. Concrètement, vous ne pouvez pas vendre, mettre en gage ou louer le bien sans l'accord de votre caisse de pension.

### Le nantissement (mise en gage)

Plutôt que de retirer l'argent, vous mettez votre avoir LPP en garantie auprès de la banque. Votre capital reste dans la caisse de pension et continue de produire des intérêts. La banque, en contrepartie, accepte de financer jusqu'à 90 % du bien au lieu de 80 %.

Avantages : pas d'impôt immédiat, le capital retraite n'est pas entamé, les rachats LPP restent possibles.

Inconvénients : la dette hypothécaire est plus élevée, les charges mensuelles (amortissement et intérêts) sont donc plus lourdes, et les exigences de revenus pour satisfaire le calcul de tenue des charges sont plus importantes.

## Retrait ou nantissement : que choisir ?

| Critère | Versement anticipé | Nantissement |
|---|---|---|
| Impact fiscal immédiat | Oui, impôt sur le capital | Non |
| Capital retraite | Réduit | Préservé |
| Charge hypothécaire | Plus faible | Plus élevée |
| Revenus nécessaires | Moins élevés | Plus élevés |
| Rachats LPP futurs | Possibles (délai de 3 ans à respecter après tout rachat) | Possibles sans restriction |
| Remboursement en cas de vente | Obligatoire | Non applicable |

En règle générale, le versement anticipé est intéressant si vous souhaitez réduire votre dette et vos charges mensuelles, et si votre situation fiscale permet de minimiser l'impact du versement. Le nantissement est souvent préférable si vous êtes encore loin de la retraite et que vous souhaitez préserver votre capital prévoyance.

## Quelle est la fiscalité d'un versement anticipé du 2e pilier ?

C'est le point que beaucoup d'acquéreurs sous-estiment. Le montant retiré est imposé séparément du revenu ordinaire, à un taux réduit correspondant à un cinquième du barème ordinaire (art. 38 LIFD). Ce taux varie selon le canton, la commune et le montant prélevé.

Dans le canton de Vaud, la fourchette est large : environ 6 % pour des retraits modestes (autour de CHF 90'000.-), jusqu'à 12 % ou plus pour des montants importants. À titre d'exemple, sur un retrait de CHF 150'000.- à Lausanne en 2026, l'impôt total (cantonal, communal et fédéral) ressort à environ CHF 8'400.-, soit environ 5.6 % du montant retiré. Sur CHF 300'000.-, le taux effectif peut dépasser 12 %. Cet impôt doit être financé par des fonds propres supplémentaires : il ne peut pas être prélevé sur le montant retiré lui-même.

Un point que beaucoup ignorent : si vous remboursez volontairement votre versement anticipé avant la retraite, l'impôt payé au moment du retrait vous est restitué. Ce remboursement peut donc être une stratégie intéressante si votre situation financière évolue favorablement après l'achat.

Une stratégie courante consiste à échelonner les versements sur deux années civiles distinctes pour réduire la progressivité de l'impôt. Cela suppose de planifier en amont et de vérifier avec votre caisse de pension si votre avoir le permet.

## Le 2e pilier dans le calcul des fonds propres

Pour rappel, les banques suisses exigent un minimum de 20 % du prix d'achat en fonds propres. Sur ces 20 % :

- Au moins 10 % doivent provenir de sources hors prévoyance professionnelle (épargne, 3e pilier, donation, héritage)
- Les 10 % restants peuvent être constitués par le 2e pilier, en retrait ou en nantissement

Le 2e pilier couvre donc au maximum la moitié de l'apport exigé. Il ne peut pas remplacer l'épargne personnelle ou le 3e pilier.

À cela s'ajoutent les frais d'acquisition, soit environ 4 % du prix dans le canton de Vaud (droits de mutation, frais de notaire, registre foncier). Ces frais doivent eux aussi être financés sur fonds propres, en dehors du 2e pilier.

## Ce que cela signifie concrètement

Pour un bien à CHF 900'000.- dans le canton de Vaud :

| Poste | Montant |
|---|---|
| Prix d'achat | CHF 900'000.- |
| Prêt hypothécaire (80 %) | CHF 720'000.- |
| Fonds propres totaux requis (20 %) | CHF 180'000.- |
| Dont minimum hors LPP (10 %) | CHF 90'000.- |
| Dont maximum 2e pilier (10 %) | CHF 90'000.- |
| Frais d'acquisition (~4 %) | CHF 36'000.- |
| **Total à financer sur fonds propres** | **CHF 216'000.-** |

Si vous effectuez un versement anticipé de CHF 90'000.- de votre 2e pilier, l'impôt cantonal vaudois (approximatif) sera d'environ CHF 5'000 à 6'000.-. Ce montant s'ajoute à votre besoin de liquidités.

## Avant de faire un versement anticipé : les questions à poser à votre caisse de pension

Chaque caisse de pension applique ses propres règles dans les limites fixées par la LPP. Avant toute démarche, renseignez-vous sur :

- Le montant exact disponible pour un versement anticipé EPL (qui peut différer de votre avoir total)
- Les délais de traitement (souvent 4 à 6 semaines)
- Les conditions de remboursement anticipé
- L'impact sur vos prestations d'assurance (invalidité, décès) en cas de versement anticipé

Un versement anticipé réduit votre capital retraite, mais aussi, dans certaines caisses, votre couverture en cas d'invalidité ou de décès. Vérifiez si votre caisse propose une assurance complémentaire pour couvrir ce risque, ou si vous devez souscrire une couverture privée.

## Ce que cela change pour votre projet immobilier

Le 2e pilier est un levier utile, parfois déterminant pour boucler un financement dans le canton de Vaud. Mais ce n'est pas une solution sans coût. L'impôt sur le versement anticipé, la réduction du capital retraite et les contraintes au registre foncier sont des réalités qu'il faut intégrer dès le départ.

La bonne approche : calculer votre plan de financement global en amont, avec votre banquier, votre conseiller en prévoyance et votre courtier. Pas en découvrant les règles le jour de la signature.`,
    cta: "Vous préparez un achat immobilier dans le canton de Vaud ? Parlons de votre financement avant de visiter."
  },
  {
    slug: 'etude-cas-vente-morges-2026',
    titre: "Une vente, un achat, et quatre personnes qui n'y croyaient plus",
    chapeau: "Mes clients vendaient leur maison à Morges. En parallèle, ils achetaient via une plateforme en ligne. Deux dossiers menés de front, pour les mêmes personnes. Ce que cette transaction m'a appris sur ce que signifie vraiment accompagner des gens.",
    date: '2026-06-11',
    categorie: 'Coulisses',
    contenu: `Il y a des mandats où l'on vend un bien. Et il y a des mandats où l'on accompagne des gens. Celui-ci était les deux à la fois.

Mes clients vendaient leur maison à Morges. En parallèle, ils achetaient leur futur logement par l'intermédiaire d'une plateforme en ligne. Deux dossiers, menés de front, pour les mêmes personnes. La vente, je la tenais. L'achat, lui, partait dans tous les sens.

Personne ne répondait vraiment de l'autre côté. Les interlocuteurs changeaient, les délais s'étiraient, et mes clients se retrouvaient seuls face à des documents qu'ils signaient sans toujours comprendre ce qu'ils engageaient. Un process sans visage. J'ai passé du temps à les aider à se défendre, à relire, à poser les bonnes questions, à ne pas se laisser embarquer. Ce n'était pas mon mandat. C'était juste nécessaire.

De l'autre côté de la vente, il y avait un couple d'acquéreurs. Ils cherchaient depuis longtemps. Trop longtemps. Ils avaient visité cette maison comme ils en avaient visité tant d'autres, sans plus vraiment y croire. La lassitude de ceux qui ont espéré une fois de trop.

Ce que je retiens de cette transaction n'a rien à voir avec les mètres carrés ni avec le prix. Derrière chaque échange, il y avait des personnes sincères, patientes, qui avaient simplement besoin qu'on leur dise la vérité et qu'on tienne parole. Je leur avais dit que je ferais tout pour que les choses soient claires et justes. Ils n'osaient pas vraiment y croire.

Cinq pièces, 148 m² habitables, un terrain de 808 m² au calme. Affichée à CHF 1'790'000.-, la maison s'est finalement vendue à CHF 1'825'000.-. Un prix posé avec justesse trouve son acquéreur, et parfois le dépasse. Mais ce sont les chiffres, et ils ne disent pas l'essentiel.

L'essentiel, c'était l'autre jour, dans le jardin de Morges. Les vendeurs, les acheteurs, la notaire et moi, réunis pour fêter une vente devenue, en cours de route, bien plus qu'une vente. Deux familles qui ne se connaissaient pas, rassurées chacune à sa manière, autour de la même table.

Ils y croient, maintenant.

C'est, je crois, la meilleure définition de mon métier. Pas vendre au prix le plus haut en promettant n'importe quoi pour décrocher un mandat. Accompagner des gens, de la première visite à la signature, et leur rendre la confiance que d'autres process leur avaient retirée. Un seul interlocuteur, un seul visage, du début à la fin.

C'est ce que je fais à Morges, sur l'arc lémanique et dans le canton de Vaud. Et c'est ce que je continuerai de faire.`,
    cta: "Vous avez un projet immobilier sur l'arc lémanique ? Parlons-en."
  },
]

// ─── HELPERS ────────────────────────────────────────────────────────────────
export const STATS = [
  { value: '6+', label: "Années d'expérience" },
  { value: '90+', label: 'Transactions réalisées' },
  { value: '96.8%', label: 'Vendus au prix estimé' },
]

export const FILTRES = [
  { key: 'all', label: 'Tous' },
  { key: 'en_vente', label: 'En vente' },
  { key: 'vendu', label: 'Vendus' },
] as const
