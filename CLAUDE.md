# CLAUDE.md — CourtierOS

Contexte technique du projet pour Claude Code : décisions prises, pièges
connus, conventions maison. Uniquement ce qui ne se déduit pas du code.

**Dernière mise à jour : 2026-07-29.** Si une info contredit le code, le code
fait foi → corriger ce fichier dans la foulée.

> Dépôt **public** : aucune donnée personnelle, aucun secret, aucune
> information commerciale sensible dans ce fichier.

---

## 1. Ce qu'est ce dépôt

Un projet Next.js qui héberge **deux produits distincts** :

| Espace | Chemin | Accès | Rôle |
|---|---|---|---|
| Site vitrine | `/`, `/estimation`, `/journal`, `/biens/[slug]`, `/courtier/[commune]`, `/track-record`, `/methode` | Public | Vitrine + acquisition de mandats (SEO par commune) |
| CRM | `/app/**` | Privé (Supabase Auth) | Outil de travail quotidien du courtier |

### ⚠️ Piège n°1 : il existe DEUX espaces CRM

- **`/app/**` → le vrai CRM, actuel.** Auth Supabase, données réelles, RLS,
  protégé par `middleware.ts`. **C'est ici qu'on développe.**
- `/crm/**` → ancienne version, protégée par un simple PIN (`PinGate.tsx`),
  encore présente (`/crm/estimation` = atelier d'estimation historique).

Avant toute modification du CRM, **vérifier dans lequel des deux on est**. Une
correction appliquée à `/crm` alors que l'utilisateur travaille dans `/app`
donne l'illusion d'un bug non résolu. (Le README, obsolète, ne mentionne que
`/crm`.)

---

## 2. Stack & déploiement

- **Next.js 14** (App Router) + TypeScript + Tailwind.
- **Supabase** — Postgres + Auth + Storage.
- **Vercel** — **push sur `main` = déploiement automatique en production.**
- **Resend** — e-mails sortants + réception (webhook inbound).
- **`@anthropic-ai/sdk`** — classification des e-mails transférés.
- Cron Vercel : `/api/cron/relances`, quotidien à 05:00 UTC (`vercel.json`).

Commandes : `npm run dev`, `npm run build`.
Vérif avant push : **`npm run check`** (typecheck `tsc --noEmit` + `next build`).
Le CI GitHub (`.github/workflows/ci.yml`) rejoue ce check à chaque push/PR.
Le build ne réclame plus de clé (Resend est instancié à l'exécution, pas au
chargement). `tsconfig` : `target` = `es2017` (l'ancien `es5` déclenchait une
dépréciation qui faisait échouer `tsc`).

### ⚠️ Piège n°2 : Supabase est injoignable depuis Claude Code (web)

La politique réseau de l'environnement bloque `api.supabase.com`,
`*.supabase.co` et les ports Postgres. Conséquences :

- Le serveur MCP Supabase se connecte mais **n'expose aucun outil**
  (`tools/list` → 403 sur la Content API). Ce n'est pas une panne du projet.
- **Impossible de lire ou d'écrire en base depuis une session Claude Code web.**
- Procédure de repli : produire le **SQL prêt à coller**, à exécuter dans
  *Supabase → SQL Editor → Run*.
- Ne jamais annoncer une écriture en base comme faite sans preuve.

---

## 3. Modèle de données (Supabase)

Migrations dans `supabase/migrations/`, jouées **manuellement** dans le SQL
Editor (pas de `supabase db push` automatisé). Toute migration doit être
**idempotente**.

Tables : `profils`, `contacts`, `biens`, `mandats`, `estimations`,
`acquereurs`, `visites`, `offres`, `conditions_suspensives`, `documents`,
`taches`, `relances`, `echanges`, `journal`.

Principes structurants :

- **Multi-courtier** : chaque ligne porte `courtier_id = auth.uid()`.
- **RLS activée et forcée** sur toutes les tables métier. Un oubli de RLS sur
  une nouvelle table est une faille — jamais acceptable.
- **`journal`** = piste d'audit horodatée, alimentée par le trigger
  `audit_journal()`. En lecture seule côté client (aucune policy d'écriture) :
  la traçabilité doit rester immuable — c'est elle qui protège la commission
  et démontre la conformité.
- **Storage** : bucket privé `documents`, chemin `{auth.uid()}/{bien_id}/{fichier}`.

### Vocabulaire : « dossier » = ligne de la table `biens`

Un dossier porte un **libellé libre** stocké dans la colonne `reference`.
L'UI affiche `reference || commune` comme titre. Ce n'est pas une référence
technique.

### ⚠️ Piège n°3 : trigger d'audit et suppressions (corrigé)

`audit_journal()` insérait dans `journal` une ligne référençant le bien en
cours de suppression → violation de `journal_bien_id_fkey` → **toute
suppression de dossier échouait**, depuis l'origine. Corrigé par
`0003_fix_audit_journal_delete.sql` (bien_id → NULL si le bien n'existe plus).

Leçon : **toute nouvelle table auditée référençant `biens` doit être testée en
suppression**, cascade comprise.

### ⚠️ Piège n°4 : un `delete` Supabase peut « réussir » sans rien supprimer

Si la RLS bloque, l'appel renvoie un succès et zéro ligne affectée. Toujours
utiliser `.delete().select()` et **traiter le cas « 0 ligne » comme une
erreur explicite**. Idem pour les `update`. Une erreur silencieuse se traduit
côté utilisateur par « le bouton ne marche pas » — et coûte des heures.

---

## 4. Le moteur d'estimation — pièce maîtresse

`lib/estimation/` : `types.ts`, `moteur.ts` (fonctions **pures**),
`parametres-marche.ts` (hypothèses), `defaut.ts`, `pdf-document.tsx`.

Quatre méthodes calculées côte à côte : **intrinsèque** (ECA indexée − vétusté
par élément d'ouvrage + terrain + extérieurs), **rendement** (état locatif net
capitalisé), **vénale** (pondération intrinsèque/rendement), **comparaison de
marché** (comparables ajustés). Puis synthèse : valeur retenue arrondie au
palier de 10 000, fourchette ±marge, prix de mise en vente, prix plancher.

### Principe non négociable : « aucune boîte noire »

Chaque résultat expose son **détail ligne par ligne** (`LigneCalcul`), repris
tel quel dans le PDF. C'est ce qui rend l'estimation **défendable** face à un
vendeur, un notaire ou un avocat. Toute évolution qui opacifierait le calcul
va contre la raison d'être du module.

Le moteur émet aussi des **avertissements** (pondérations ≠ 100 %, quote-parts
≠ 100 %, comparaison s'écartant de >15 % de la vénale). Ce sont des signaux
métier, pas du bruit : les afficher, jamais les masquer.

### Répartition des rôles

- Claude aide à **choisir les hypothèses** (prix du terrain, taux de
  capitalisation, comparables) et **rédige** le rapport autour du résultat.
- Le **moteur produit le chiffre** officiel, reproductible et archivé
  (versions successives par `bien_id`).
- Ne jamais présenter une estimation rédigée par Claude comme équivalente à
  une estimation du moteur : un chiffre « de tête » n'est pas défendable.

⚠️ `parametres-marche.ts` contient des **hypothèses de marché indicatives**
(prix du terrain par région/commune, taux de capitalisation, coefficient
d'indexation ECA…), à ajuster dossier par dossier. Ce ne sont **pas** des
constantes réglementaires.

---

## 5. Règles réglementaires (canton de Vaud)

`lib/config/reglementaire.ts` est la **source unique** de toute constante
légale, fiscale ou bancaire (ASB, Lex Koller, LBA, nLPD, droit foncier rural,
taxe sur la plus-value…). Deux règles absolues, déjà inscrites dans le code :

1. **Aucune invention de valeur.** Chaque constante cite sa base légale ou sa
   source et sa date de vérification (`DATE_VERIFICATION`,
   `VERSION_REFERENTIEL`). Une valeur inconnue se signale, ne s'invente pas.
2. **Les calculs sont indicatifs.** Ils ne se substituent ni au notaire, ni à
   la banque, ni à l'autorité fiscale. Les mentions correspondantes restent
   affichées.

Périmètre strictement **suisse / vaudois** — aucune référence au droit
français (erreur immédiatement disqualifiante dans ce métier).

Le module `lib/conformite/` (radar) détecte les situations à risque : logement
loué, Lex Koller, zone agricole, DDP arrivant à terme, LBA non faite,
consentement nLPD manquant, etc.

---

## 6. Conventions de code

- **Tout en français** : variables, commentaires, libellés UI, messages
  d'erreur. `biens`, `echanges`, `taches`, `charger()`, `supprimerDossier()`.
- **Formats suisses** : montants en `de-CH` → `CHF 1'250'000.-` (apostrophe
  comme séparateur de milliers). Helpers dans `lib/format.ts` — les utiliser,
  ne pas reformater à la main.
- **Identité du courtier** : constante `COURTIER` dans `lib/courtier.ts`,
  reprise par tous les documents générés. Ne jamais ressaisir en dur ailleurs.
- **Charte graphique** : constante `CHARTE` et classes Tailwind `brand-*`
  (fond `#0C0F14`, or `#C9A96E`). Thème sombre premium, positionnement haut de
  gamme. Ne pas introduire de couleurs hors charte.
- **Types de lignes** : `lib/supabase/rows.ts`. Les étendre quand une colonne
  est ajoutée.
- **Messages d'erreur** : visibles **près de l'action concernée**, jamais
  enterrés en bas de page, et rédigés pour un non-technicien (dire quoi faire).

---

## 7. Git & livraison

- Développer sur une branche `claude/<sujet>`, jamais directement sur `main`.
- `main` est **déployé automatiquement** : ce qui y est fusionné part en prod.
- Vérifier `./node_modules/.bin/tsc --noEmit` avant de pousser.
- Pas de `gh` CLI dans cet environnement → utiliser les outils MCP GitHub.
- Ne créer une pull request que si elle est explicitement demandée.
- `main` bouge vite : en cas de conflit, **résoudre en local** (fetch + merge),
  jamais dans l'éditeur de conflits GitHub.

---

## 8. Données personnelles — nLPD

**Aucune donnée personnelle de client ou de tiers dans ce dépôt** : ni nom de
vendeur, ni téléphone, ni adresse privée, ni pièce de dossier — y compris dans
les commentaires, les fixtures et les messages de commit. Ces données vivent
dans Supabase, protégées par la RLS, et dans le bucket privé `documents`.

Le schéma prévoit `consentement_lpd`, `lba_identifie`, `ayant_droit_eco` :
ce sont des obligations légales, pas des options décoratives.

---

## 9. Exigence de rigueur

Ce projet touche à de l'argent, à des obligations légales et à une réputation
professionnelle. En conséquence :

- Ne jamais annoncer « c'est fait » sans l'avoir vérifié. Distinguer
  explicitement *écrit*, *compilé*, *poussé*, *déployé*, *testé en réel*.
- Quand une vérification est impossible (accès base bloqué, par exemple), le
  dire et proposer le moyen de vérifier — ne pas contourner en silence.
- Un chiffre incertain se signale comme hypothèse, avec sa source.
