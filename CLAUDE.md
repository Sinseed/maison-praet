# CLAUDE.md — Maison Praet / CourtierOS

Contexte de travail pour Claude Code. Ce fichier contient ce qui ne se devine
pas : décisions prises, pièges connus, conventions maison. Il ne dit pas à
Claude comment réfléchir — uniquement ce qu'il ne peut pas savoir seul.

**Dernière mise à jour : 2026-07-29.** Si une info ici contredit le code, le
code fait foi → corriger ce fichier dans la foulée.

---

## 1. À qui appartient ce projet

Thomas Praet, courtier immobilier diplômé USPI, opérant sous l'enseigne
**Maison Praet**. Tous les mandats sont signés sous **Golay Immobilier SA**
(régie lausannoise, Grand-Chêne 2, 1003 Lausanne).

- Terrain : **canton de Vaud** en priorité, Suisse romande au sens large.
- Objectif affiché : devenir la référence du courtage en Suisse romande —
  le positionnement est premium, jamais « discount ».
- Thomas **n'est pas développeur**. Expliquer en français courant, éviter le
  jargon, et dire clairement quand quelque chose n'a pas pu être vérifié.

L'identité utilisée par tous les documents générés vit dans `lib/courtier.ts`
(constante `COURTIER`) — ne jamais la ressaisir en dur ailleurs.

---

## 2. Ce qu'est ce dépôt

Un seul projet Next.js qui héberge **deux produits distincts** :

| Espace | Chemin | Public | Rôle |
|---|---|---|---|
| Site vitrine | `/`, `/estimation`, `/journal`, `/biens/[slug]`, `/courtier/[commune]`, `/track-record`, `/methode` | Public | Vitrine + acquisition de mandats (SEO par commune) |
| CRM | `/app/**` | Privé (Supabase Auth) | L'outil de travail quotidien |

### ⚠️ Piège n°1 : il existe DEUX espaces CRM

- **`/app/**` → c'est le vrai CRM, actuel.** Auth Supabase, données réelles,
  RLS, protégé par `middleware.ts`. **C'est ici qu'on développe.**
- `/crm/**` → ancienne version, protégée par un simple PIN (`PinGate.tsx`),
  encore présente (`/crm/estimation` = l'atelier d'estimation historique).

Avant toute modification du CRM, **vérifier dans lequel des deux on est**. Une
correction appliquée à `/crm` alors que Thomas utilise `/app` donne l'illusion
d'un bug non résolu. (Le README, non mis à jour, ne mentionne que `/crm`.)

---

## 3. Stack & déploiement

- **Next.js 14** (App Router) + TypeScript + Tailwind.
- **Supabase** — Postgres + Auth + Storage. Projet : `dhhmreryjfkkjnbcisgr`.
- **Vercel** — **push sur `main` = déploiement automatique en production.**
- **Resend** — e-mails sortants + réception (webhook inbound).
- **`@anthropic-ai/sdk`** — classification des e-mails transférés.
- Cron Vercel : `/api/cron/relances`, tous les jours à 05:00 UTC (`vercel.json`).

Commandes : `npm run dev`, `npm run build`. Typecheck : `./node_modules/.bin/tsc --noEmit`
(⚠️ `npx tsc` échoue sur une option dépréciée du `tsconfig.json` — passer par
le binaire local).

### ⚠️ Piège n°2 : Supabase est injoignable depuis Claude Code (web)

La politique réseau de l'environnement bloque `api.supabase.com`,
`*.supabase.co` et les ports Postgres. Conséquences :

- Le serveur MCP Supabase se connecte mais **n'expose aucun outil**
  (`tools/list` → 403 sur la Content API). Ce n'est pas une panne côté Thomas.
- **Impossible de lire ou écrire en base depuis une session Claude Code web.**
- Procédure : produire le **SQL prêt à coller**, et demander à Thomas de
  l'exécuter dans *Supabase → SQL Editor → Run*. Il sait faire.
- Ne jamais annoncer une écriture en base comme faite sans preuve.

---

## 4. Modèle de données (Supabase)

Migrations dans `supabase/migrations/`, jouées **manuellement** dans le SQL
Editor (pas de `supabase db push` automatisé). Toute migration doit être
**idempotente** (rejouable sans risque).

Tables : `profils`, `contacts`, `biens`, `mandats`, `estimations`,
`acquereurs`, `visites`, `offres`, `conditions_suspensives`, `documents`,
`taches`, `relances`, `echanges`, `journal`.

Principes structurants :

- **Multi-courtier** : chaque ligne porte `courtier_id = auth.uid()`.
- **RLS activée et forcée** sur toutes les tables métier. Un oubli de RLS sur
  une nouvelle table est une faille — jamais acceptable.
- **`journal`** = piste d'audit horodatée, alimentée par le trigger
  `audit_journal()`. En lecture seule côté client (aucune policy d'écriture) :
  la traçabilité doit être immuable, c'est ce qui protège la commission et
  démontre la conformité.
- **Storage** : bucket privé `documents`, chemin `{auth.uid()}/{bien_id}/{fichier}`.

### Vocabulaire : « dossier » = ligne de la table `biens`

Un dossier de bien porte un **libellé libre** stocké dans la colonne
`reference` (ex. « Villa Durussel – Yvonand »). L'UI affiche
`reference || commune` comme titre. Ce n'est pas une référence technique.

### ⚠️ Piège n°3 : le trigger d'audit et les suppressions (corrigé)

`audit_journal()` insérait dans `journal` une ligne référençant le bien en
cours de suppression → violation de `journal_bien_id_fkey` → **toute
suppression de dossier échouait**, depuis l'origine. Corrigé par
`0003_fix_audit_journal_delete.sql` (bien_id → NULL si le bien n'existe plus).

Leçon à retenir : **toute nouvelle table auditée qui référence `biens` doit
être testée en suppression**, cascade comprise.

### ⚠️ Piège n°4 : un `delete` Supabase peut « réussir » sans rien supprimer

Si la RLS bloque, l'appel renvoie un succès et zéro ligne affectée. Toujours
utiliser `.delete().select()` et **traiter le cas « 0 ligne »** comme une
erreur explicite. Idem pour les `update`. Une erreur silencieuse se traduit
chez Thomas par « le bouton ne marche pas » — et coûte des heures.

---

## 5. Le moteur d'estimation — la pièce maîtresse

`lib/estimation/` : `types.ts`, `moteur.ts` (fonctions **pures**),
`parametres-marche.ts` (hypothèses), `defaut.ts`, `pdf-document.tsx`.

Quatre méthodes calculées côte à côte : **intrinsèque** (ECA indexée − vétusté
par élément d'ouvrage + terrain + extérieurs), **rendement** (état locatif net
capitalisé), **vénale** (pondération intrinsèque/rendement), **comparaison de
marché** (comparables ajustés). Puis une synthèse : valeur retenue arrondie au
palier de 10 000, fourchette ±marge, prix de mise en vente, prix plancher.

### Le principe non négociable : « aucune boîte noire »

Chaque résultat expose son **détail ligne par ligne** (`LigneCalcul`), repris
tel quel dans le PDF. C'est ce qui rend l'estimation **défendable** face à un
vendeur, un notaire ou un avocat. Toute évolution qui opacifierait le calcul
va contre la raison d'être du module.

Le moteur émet aussi des **avertissements** (pondérations ≠ 100 %, quote-parts
≠ 100 %, comparaison s'écartant de >15 % de la vénale). Ces alertes sont un
signal métier, pas du bruit : les afficher, ne jamais les masquer.

### Division du travail entre Claude et le moteur

- Claude aide à **choisir les hypothèses** (prix du terrain, taux de
  capitalisation, comparables) et **rédige** le rapport autour du résultat.
- Le **moteur produit le chiffre** officiel, reproductible et archivé
  (versions successives par `bien_id`).
- Ne jamais présenter une estimation rédigée par Claude comme équivalente à
  une estimation du moteur. Un chiffre « de tête » n'est pas défendable.

⚠️ `parametres-marche.ts` contient des **hypothèses de marché indicatives**
(prix du terrain par région/commune, taux de capitalisation, coefficient
d'indexation ECA 1.15…), à ajuster dossier par dossier. Ce ne sont **pas** des
constantes réglementaires.

---

## 6. Règles réglementaires (Vaud) — à ne jamais contourner

`lib/config/reglementaire.ts` est la **source unique** de toute constante
légale, fiscale ou bancaire (ASB, Lex Koller, LBA, nLPD, droit foncier rural,
taxe sur la plus-value…). Deux règles absolues, déjà inscrites dans le code :

1. **Aucune invention de valeur.** Chaque constante cite sa base légale ou sa
   source et sa date de vérification (`DATE_VERIFICATION`, `VERSION_REFERENTIEL`).
   Si une valeur n'est pas connue avec certitude : le dire, ne pas l'inventer.
2. **Les calculs sont indicatifs.** Ils ne se substituent ni au notaire, ni à
   la banque, ni à l'autorité fiscale. Les mentions correspondantes doivent
   rester affichées.

Périmètre strictement **suisse / vaudois** — aucune référence au droit français
(erreur classique et immédiatement disqualifiante dans ce métier).

Le module `lib/conformite/` (radar) détecte les situations à risque : logement
loué, Lex Koller, zone agricole, DDP arrivant à terme, LBA non faite,
consentement nLPD manquant, etc.

---

## 7. Conventions de code

- **Tout en français** : noms de variables, commentaires, libellés UI, messages
  d'erreur. `biens`, `echanges`, `taches`, `charger()`, `supprimerDossier()`.
- **Formats suisses** : montants en `de-CH` → `CHF 1'250'000.-` (apostrophe
  comme séparateur). Helpers dans `lib/format.ts` — les utiliser, ne pas
  reformater à la main.
- **Charte graphique** : constante `CHARTE` (`lib/courtier.ts`) et classes
  Tailwind `brand-*` (fond `#0C0F14`, or `#C9A96E`). Thème sombre premium.
  Ne pas introduire de couleurs hors charte.
- **Types de lignes** : `lib/supabase/rows.ts`. Étendre ces types quand une
  colonne est ajoutée.
- Messages d'erreur : **visibles près de l'action concernée**, jamais enterrés
  en bas de page, et rédigés pour un non-technicien (dire quoi faire).

---

## 8. Git & livraison

- Développer sur une branche `claude/<sujet>`, jamais directement sur `main`.
- `main` est **déployé automatiquement** : ce qui y est fusionné part en prod.
- Vérifier `./node_modules/.bin/tsc --noEmit` avant de pousser.
- Pas de `gh` CLI dans cet environnement → utiliser les outils MCP GitHub.
- Ne créer une pull request que si Thomas la demande.
- `main` bouge vite : en cas de conflit, **résoudre en local** (fetch + merge),
  jamais dans l'éditeur de conflits GitHub.

---

## 9. Données personnelles — nLPD

**Aucune donnée personnelle de client ou de tiers dans ce dépôt** : ni nom de
vendeur, ni téléphone, ni adresse privée, ni pièce jointe de dossier — y
compris dans ce fichier, les commentaires, les fixtures ou les messages de
commit. Ces données vivent dans Supabase, protégées par la RLS, et dans le
bucket privé `documents`.

Le schéma prévoit `consentement_lpd`, `lba_identifie`, `ayant_droit_eco` :
ces champs sont des obligations légales, pas des options décoratives.

---

## 10. Ce que Thomas attend au quotidien

Au-delà du code, Claude est son assistant de courtage. Compétences installées
(skills) — à privilégier plutôt que d'improviser un format :

| Skill | Usage |
|---|---|
| `estimation-immobiliere` | Rapports d'estimation PDF (style Golay) |
| `dossier-immobilier` | Dossier de mandat vendeur + dossier acquéreur après signature |
| `facture-golay` | Notes d'honoraires / commissions de courtage |
| `linkedin-immobilier` | Contenu LinkedIn, personal branding |

Tâches récurrentes : rédiger des e-mails professionnels (experts CECB,
notaires, propriétaires), suivre les documents manquants d'un dossier,
préparer les rendez-vous vendeurs, produire les PDF.

**Ton des écrits pour l'extérieur** : vouvoiement, sobre, suisse romand,
« Avec mes meilleures salutations » / « Bien à vous ». Jamais familier, jamais
survendu. Signature : Thomas Praet · Courtier · 079 969 01 91 · maisonpraet.ch.

### Prestataire

Les CECB passent par **Lamy Expertise SA** (Bussigny) — conseil en efficacité
énergétique. Les coordonnées nominatives restent dans le CRM, pas ici.

---

## 11. Honnêteté opérationnelle

Ce projet touche à de l'argent, à des obligations légales et à la réputation
professionnelle de Thomas. En conséquence :

- Ne jamais annoncer « c'est fait » sans l'avoir vérifié. Distinguer
  explicitement *écrit*, *compilé*, *poussé*, *déployé*, *testé en réel*.
- Quand une vérification est impossible (accès base bloqué, par ex.), le dire
  et proposer le moyen de vérifier — pas contourner en silence.
- Un chiffre incertain doit être signalé comme hypothèse, avec sa source.
