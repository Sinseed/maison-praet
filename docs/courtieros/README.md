# CourtierOS — poste de pilotage du courtier (Canton de Vaud)

Application métier intégrée au projet Maison Praet. Elle couvre le cycle complet
d'un mandat, de la prospection à la signature chez le notaire.

> **En place** : modèle de données + RLS, module d'estimation multi-méthodes
> avec export PDF, **radar de conformité réglementaire**, fichier de constantes
> réglementaires unique. Les modules suivants (qualification acquéreur,
> simulateur fiscal, pipeline/matching, production documentaire, rendement/PPE,
> tableau de bord) s'appuient sur le socle ci-dessous.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Supabase (Postgres, Auth,
Storage, RLS) · React PDF (génération serveur) · déploiement Vercel.

## Règles transverses respectées

1. **Aucune valeur légale/fiscale codée en dur** hors de
   `lib/config/reglementaire.ts` (source unique, commentée, datée). L'app affiche
   la date de dernière vérification.
2. **Mentions indicatives** sur chaque module sensible (`MENTIONS.*`).
3. **Traçabilité** : trigger d'audit → table `journal` (auteur + horodatage).
4. **Hors ligne dégradé** : la saisie d'estimation persiste en `localStorage`.
5. **Format suisse** partout : `CHF 1'250'000.-`, dates `JJ.MM.AAAA` (`lib/format.ts`).
6. **Sécurité** : RLS `force` sur toutes les tables, bucket Storage privé.

## Configuration

```bash
cp .env.example .env.local   # renseigner les clés Supabase
npm install
npm run dev
```

Puis, dans Supabase (éditeur SQL ou `supabase db push`), exécuter
`supabase/migrations/0001_courtieros.sql`.

## Arborescence (fichiers CourtierOS)

```
maison-praet/
├─ app/
│  ├─ crm/
│  │  ├─ page.tsx                     # tableau de bord existant (démo)
│  │  ├─ PinGate.tsx                  # verrou d'accès partagé (code PIN, session)
│  │  ├─ estimation/
│  │  │  └─ page.tsx                  # ★ Atelier d'estimation multi-méthodes (UI)
│  │  └─ conformite/
│  │     └─ page.tsx                  # ★ Radar de conformité réglementaire (UI)
│  └─ api/
│     └─ crm/
│        └─ estimation/
│           └─ pdf/route.ts           # ★ Génération serveur du rapport PDF
├─ lib/
│  ├─ config/
│  │  └─ reglementaire.ts             # ★ Constantes réglementaires (UNIQUE, datées)
│  ├─ courtier.ts                     # Identité visuelle du courtier (documents)
│  ├─ format.ts                       # Formatage suisse (CHF, %, dates, m²)
│  ├─ estimation/
│  │  ├─ types.ts                     # Types du module d'estimation
│  │  ├─ parametres-marche.ts         # Hypothèses de marché par défaut (éditables)
│  │  ├─ defaut.ts                    # Entrée d'estimation par défaut
│  │  ├─ moteur.ts                    # ★ Moteur de calcul (4 méthodes) — pur
│  │  └─ pdf-document.tsx             # Rapport PDF (React PDF)
│  ├─ conformite/
│  │  ├─ types.ts                     # Types du radar de conformité
│  │  ├─ defaut.ts                    # Entrée par défaut
│  │  └─ regles.ts                    # ★ Moteur de règles (LPPPL, LFAIE, LDFR, LAT, LBA, nLPD…)
│  └─ supabase/
│     ├─ client.ts                    # Client navigateur (@supabase/ssr)
│     └─ server.ts                    # Client serveur (cookies)
├─ supabase/
│  └─ migrations/
│     └─ 0001_courtieros.sql          # ★ Schéma complet + RLS + Storage + audit
└─ docs/courtieros/README.md          # ce fichier
```

## Module d'estimation — comment ça marche

- **Moteur** (`lib/estimation/moteur.ts`) : fonctions pures calculant en parallèle
  la valeur **intrinsèque** (ECA indexée − vétusté par élément d'ouvrage + terrain
  + extérieurs), la valeur de **rendement** (état locatif net capitalisé), la
  valeur **vénale** (pondération paramétrable par type : villa 80/20, immeuble
  20/80, PPE 60/40) et la **comparaison de marché** (comparables ajustés).
- **Sortie** : fourchette de recommandation, prix de mise en vente conseillé,
  prix plancher, et détail ligne par ligne (aucune boîte noire).
- **UI** (`/crm/estimation`) : chaque hypothèse est visible et modifiable ;
  recalcul en direct ; export PDF en un clic.
- **PDF** (`/api/crm/estimation/pdf`) : rapport structuré (page de garde,
  description, méthodologie, calculs, synthèse, conclusion signée).

## Radar de conformité — comment ça marche

- **Moteur de règles** (`lib/conformite/regles.ts`) : `evaluerConformite(input)`
  applique les régimes vaudois/fédéraux (LPPPL, Lex Koller/LFAIE, LDFR, LAT-LATC,
  servitudes/DDP, LBA, nLPD) et retourne des alertes typées
  (`bloquant` / `informatif` / `ok`) avec note en langage clair, base légale et
  délai à provisionner au rétroplanning.
- **UI** (`/crm/conformite`) : questionnaire déclencheur → alertes triées par
  gravité, chacune avec un **champ de résolution horodaté**. Le délai
  réglementaire maximal est mis en avant pour le rétroplanning.
- Les seuils et bases légales proviennent tous de `lib/config/reglementaire.ts`.

## Modèle de données

Tables : `profils`, `contacts`, `biens`, `mandats`, `estimations`, `acquereurs`,
`visites`, `offres`, `conditions_suspensives`, `documents`, `taches`, `relances`,
`journal`. Chaque ligne appartient à un courtier (`courtier_id = auth.uid()`), la
RLS empêche tout accès croisé. Le `journal` est en écriture seule via trigger
(`security definer`) — immuable côté client.
