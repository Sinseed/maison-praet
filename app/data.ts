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
    id: 1, slug: 'maison-yverdon', titre: 'Maison individuelle', lieu: 'Yverdon-les-Bains',
    prix: "2'290'000", pieces: '8.5', surface: '240 m²', terrain: "1'260 m²", categorie: 'en_vente',
    img: '/photos/yverdon/IMG_5987.jpg',
    photos: ['/photos/yverdon/IMG_5987.jpg','/photos/yverdon/IMG_5989.jpg','/photos/yverdon/IMG_5990.jpg','/photos/yverdon/IMG_5993.jpg','/photos/yverdon/IMG_5994.jpg','/photos/yverdon/IMG_6001.jpg','/photos/yverdon/IMG_6002.jpg','/photos/yverdon/IMG_6003.jpg','/photos/yverdon/IMG_6006.jpg','/photos/yverdon/IMG_6010.jpg','/photos/yverdon/IMG_6012.jpg','/photos/yverdon/IMG_6013.jpg','/photos/yverdon/IMG_6014.jpg','/photos/yverdon/IMG_6017.jpg','/photos/yverdon/IMG_6019.jpg','/photos/yverdon/IMG_6022.jpg','/photos/yverdon/IMG_6025.jpg'],
    description: "Implantée sur une parcelle de plus de 1'260 m² à Yverdon-les-Bains, cette maison individuelle de 8.5 pièces offre 240 m² habitables. Volumes généreux, jardin arboré et potentiel d'agrandissement d'environ 524 m². Proximité immédiate des thermes et de toutes les commodités."
  },
  {
    id: 2, slug: 'immeuble-lausanne-vallon', titre: 'Immeuble de rendement', lieu: 'Lausanne',
    prix: "6'000'000", pieces: '-', surface: '520 m²', terrain: '-', categorie: 'en_vente',
    img: '', photos: [],
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
    id: 5, slug: 'villa-cossonay', titre: 'Villa jumelée', lieu: 'Cossonay-Ville',
    prix: "1'450'000", pieces: '5.5', surface: '-', terrain: '-', categorie: 'en_vente',
    img: '/photos/cossonay/DJI_20260304145633_0009_D.jpg',
    photos: ['/photos/cossonay/DJI_20260304145633_0009_D.jpg','/photos/cossonay/DJI_20260304150013_0015_D.jpg','/photos/cossonay/IMG_7366.jpg','/photos/cossonay/Cuisine_lumineuse_avec_vue_sur_le_jardin.png','/photos/cossonay/Chambre_d_attic_chaleureuse_et_lumineuse.png','/photos/cossonay/Salle_de_bains_sous_les_combles.png','/photos/cossonay/ChatGPT_Image_19_mars_2026__10_29_05.png'],
    description: "Villa jumelée de 5.5 pièces à Cossonay-Ville, avec vue dégagée sur le Jura et les Alpes. Jardin plat, véranda, calme absolu en bordure de campagne. Brochure et visite sur demande."
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
    id: 8, slug: 'maison-gland-buis', titre: 'Maison jumelée', lieu: 'Gland',
    prix: "2'750'000", pieces: '-', surface: '-', terrain: '-', categorie: 'en_vente',
    img: '/photos/gland-buis/DJI_20260115164414_0005_D.jpg',
    photos: ['/photos/gland-buis/DJI_20260115164414_0005_D.jpg','/photos/gland-buis/IMG_6123.jpg','/photos/gland-buis/IMG_6129.jpg','/photos/gland-buis/IMG_6134.jpg','/photos/gland-buis/IMG_6137.jpg','/photos/gland-buis/IMG_6140.jpg','/photos/gland-buis/IMG_6141.jpg','/photos/gland-buis/IMG_6143.jpg','/photos/gland-buis/IMG_6147.jpg','/photos/gland-buis/IMG_6148.jpg','/photos/gland-buis/IMG_6150.jpg','/photos/gland-buis/IMG_6151.jpg','/photos/gland-buis/IMG_6152.jpg','/photos/gland-buis/IMG_6153.jpg','/photos/gland-buis/IMG_6154.jpg','/photos/gland-buis/IMG_6155.jpg'],
    description: "Maison jumelée d'exception à Gland, au chemin du Buis. Architecture contemporaine, volumes généreux et finitions soignées. Terrasse, jardin privatif et vue dégagée."
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
    prix: "1'590'000", pieces: '-', surface: '-', terrain: '-', categorie: 'en_vente',
    img: '', photos: [],
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

La commission de courtage se situe généralement entre 2 et 3% du prix de vente, plus TVA, dans le Canton de Vaud. Point important : la commission est intégralement déductible de l'impôt sur le gain immobilier. Ce n'est donc pas une charge sèche.

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
    contenu: `Après six ans de courtage dans le Canton de Vaud, je peux affirmer ceci : quand un bien ne se vend pas, la cause est dans 90% des cas liée au prix. Pas à la localisation, pas au marché, pas à la saison. Au prix.

Voici les signaux qui ne trompent pas.

Beaucoup de visites mais aucune offre. Votre bien plaît, mais pas à ce prix. Les acquéreurs visitent, comparent, et trouvent mieux ailleurs pour le même budget. La solution : une correction de prix de 5 à 8% relance immédiatement l'intérêt.

Peu de visites et peu de clics sur les portails. Votre bien est invisible ou mal présenté. Deux causes possibles : le prix est tellement au-dessus du marché que les acquéreurs ne le regardent même pas, ou les photos et la description ne rendent pas justice au bien. La solution : revoir le prix ET la présentation.

Des offres, mais toutes en dessous de 10% du prix affiché. Le marché vous envoie un message clair. Quand trois acquéreurs indépendants arrivent au même chiffre, ce n'est pas eux qui se trompent.

Le piège du courtier complaisant. Certains courtiers gonflent leur estimation pour décrocher le mandat, puis proposent des baisses de prix successives. Résultat : le bien reste des mois en ligne, accumule les jours de publication, et chaque acquéreur potentiel se demande "qu'est-ce qui ne va pas avec ce bien ?". C'est exactement la spirale que j'essaie d'éviter avec mes clients.

Ma méthode : je préfère perdre un mandat en donnant un prix honnête que de le gagner avec un prix irréaliste. Si mon estimation ne vous convient pas, je vous le dis et je vous laisse le choix. Mais je ne vous ferai pas perdre six mois.`,
    cta: "Votre bien est en vente depuis trop longtemps ? Contactez-moi pour un deuxième avis, franc et sans engagement."
  },
  {
    slug: 'choisir-son-courtier-suisse-romande',
    titre: 'Comment choisir son courtier immobilier en Suisse romande',
    chapeau: "Mandat exclusif ou partagé ? Commission fixe ou variable ? Certification USPI ? Les critères qui comptent vraiment pour confier la vente de votre bien.",
    date: '2026-03-10',
    categorie: 'Guide pratique',
    contenu: `Choisir un courtier, c'est confier un actif de plusieurs centaines de milliers de francs à quelqu'un. Le choix mérite réflexion. Voici les critères que je recommande.

La connaissance du marché local est non négociable. Un courtier qui travaille entre Genève et Zurich ne connaît pas le prix au m² à Cossonay. Demandez des références de ventes récentes dans votre commune ou votre quartier. Un bon courtier les a en tête.

La méthode d'estimation doit être transparente. Fuyez les courtiers qui vous donnent un prix "au feeling" ou après une visite de 15 minutes. Une estimation sérieuse prend du temps : analyse du terrain, de la construction, des transactions comparables, du potentiel de rendement. Demandez un rapport écrit.

Le mandat exclusif n'est pas un piège. Beaucoup de vendeurs hésitent à signer un mandat exclusif par peur d'être "coincés". En réalité, un mandat exclusif permet au courtier d'investir davantage dans la commercialisation (drone, brochure premium, stratégie de prix) parce qu'il sait que son travail sera rémunéré. Un mandat partagé entre 3 courtiers donne souvent 3 annonces différentes avec 3 prix différents, ce qui nuit à la crédibilité du bien.

La commission reflète le niveau de service. Dans le Canton de Vaud, les commissions se situent entre 2 et 3% du prix de vente plus TVA. Un courtier à 1.5% fera-t-il le même travail qu'un courtier à 2.5% ? Rarement. Posez la question : qu'est-ce qui est inclus exactement ? Shooting professionnel ? Drone ? Brochure ? Diffusion sur quels portails ? Et surtout : n'oubliez pas que la commission est intégralement déductible de l'impôt sur le gain immobilier.

La certification USPI est un gage de professionnalisme. L'Union suisse des professionnels de l'immobilier impose à ses membres une formation continue et un code déontologique. Ce n'est pas une garantie absolue, mais c'est un filtre utile.

Mon conseil : rencontrez au moins deux courtiers avant de choisir. Posez-leur les mêmes questions et comparez les réponses. Le meilleur courtier n'est pas celui qui vous promet le prix le plus élevé, c'est celui qui vous convainc par sa connaissance du marché et sa franchise.`,
    cta: "Vous cherchez un courtier pour votre bien dans le Canton de Vaud ? Prenons 30 minutes pour en parler."
  },
]

// ─── HELPERS ────────────────────────────────────────────────────────────────
export const STATS = [
  { value: '6+', label: "Années d'expérience" },
  { value: '40+', label: 'Transactions réalisées' },
  { value: '100%', label: 'Arc lémanique & Gros-de-Vaud' },
]

export const FILTRES = [
  { key: 'all', label: 'Tous' },
  { key: 'en_vente', label: 'En vente' },
  { key: 'vendu', label: 'Vendus' },
] as const
