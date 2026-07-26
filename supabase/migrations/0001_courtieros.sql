-- ============================================================================
--  CourtierOS — Schéma de base de données (Supabase / Postgres)
--  Canton de Vaud, Suisse. Migration initiale.
--
--  Principes :
--   - Multi-courtier : chaque ligne appartient à un courtier (courtier_id =
--     auth.uid()). Row Level Security ACTIVÉE sur toutes les tables métier.
--   - Traçabilité intégrale : trigger d'audit vers `journal` sur les tables
--     sensibles (auteur + horodatage + diff).
--   - Aucune donnée personnelle exposée sans authentification.
--
--  À exécuter dans l'éditeur SQL Supabase (ou via `supabase db push`).
-- ============================================================================

-- ── Extensions ──────────────────────────────────────────────────────────────
create extension if not exists "pgcrypto";      -- gen_random_uuid()

-- ── Types énumérés ──────────────────────────────────────────────────────────
do $$ begin
  create type type_contact as enum ('vendeur','acquereur','notaire','courtier_tiers','artisan','autre');
exception when duplicate_object then null; end $$;

do $$ begin
  create type type_bien as enum ('villa','ppe','immeuble','terrain');
exception when duplicate_object then null; end $$;

do $$ begin
  create type statut_bien as enum (
    'prospection','estimation','mandat_signe','preparation','en_vente',
    'visites','offre','conditions_suspensives','acte','encaissement','vendu','perdu'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type type_mandat as enum ('exclusif','non_exclusif','mixte');
exception when duplicate_object then null; end $$;

do $$ begin
  create type base_commission as enum ('prix_vente','forfait','mixte');
exception when duplicate_object then null; end $$;

do $$ begin
  create type methode_estimation as enum ('intrinseque','rendement','venale','comparaison');
exception when duplicate_object then null; end $$;

do $$ begin
  create type verdict_solvabilite as enum ('vert','orange','rouge','non_evalue');
exception when duplicate_object then null; end $$;

do $$ begin
  create type statut_offre as enum ('recue','en_negociation','acceptee','refusee','retiree','caduque');
exception when duplicate_object then null; end $$;

do $$ begin
  create type statut_condition as enum ('en_attente','levee','echue','abandonnee');
exception when duplicate_object then null; end $$;

do $$ begin
  create type statut_tache as enum ('a_faire','en_cours','faite','annulee');
exception when duplicate_object then null; end $$;

do $$ begin
  create type type_document as enum (
    'extrait_rf','plan','cecb','pv_assemblee','reglement_ppe','etat_locatif',
    'rapport_estimation','dossier_presentation','piece_identite','autre'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type action_journal as enum ('creation','modification','suppression','note');
exception when duplicate_object then null; end $$;

-- ── Fonctions utilitaires ───────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

-- ============================================================================
--  TABLE : profils (identité du courtier, reprise par les documents)
-- ============================================================================
create table if not exists public.profils (
  id            uuid primary key references auth.users(id) on delete cascade,
  nom_commercial text,
  courtier       text,
  titre          text,
  entreprise     text,
  adresse        text,
  npa_localite   text,
  telephone      text,
  email          text,
  site_web       text,
  logo_url       text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- ============================================================================
--  TABLE : contacts
-- ============================================================================
create table if not exists public.contacts (
  id            uuid primary key default gen_random_uuid(),
  courtier_id   uuid not null default auth.uid() references auth.users(id) on delete cascade,
  type          type_contact not null default 'autre',
  prenom        text,
  nom           text,
  societe       text,
  email         text,
  telephone     text,
  adresse       text,
  npa_localite  text,
  -- nLPD : consentement au traitement des données
  consentement_lpd     boolean not null default false,
  consentement_lpd_le  timestamptz,
  -- LBA : identification (ayant droit économique)
  lba_identifie        boolean not null default false,
  ayant_droit_eco      text,
  notes         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists idx_contacts_courtier on public.contacts(courtier_id);
create index if not exists idx_contacts_type on public.contacts(courtier_id, type);

-- ============================================================================
--  TABLE : biens
-- ============================================================================
create table if not exists public.biens (
  id                  uuid primary key default gen_random_uuid(),
  courtier_id         uuid not null default auth.uid() references auth.users(id) on delete cascade,
  vendeur_id          uuid references public.contacts(id) on delete set null,
  reference           text,
  type                type_bien not null,
  statut              statut_bien not null default 'prospection',
  commune             text not null,
  adresse             text,
  annee_construction  int,
  surface_habitable   numeric(10,2),
  surface_parcelle    numeric(10,2),
  nb_pieces           numeric(4,1),
  valeur_eca          numeric(14,2),
  -- Conformité (radar) : réponses aux questions déclenchantes
  nb_logements        int,
  logement_loue       boolean not null default false,
  zone_agricole       boolean not null default false,
  zone_reservee       boolean not null default false,
  conformite          jsonb not null default '{}'::jsonb,  -- alertes + résolutions horodatées
  -- Technique / énergétique
  type_chauffage      text,
  cecb_classe         text,
  diagnostic          jsonb not null default '{}'::jsonb,
  notes               text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);
create index if not exists idx_biens_courtier on public.biens(courtier_id);
create index if not exists idx_biens_statut on public.biens(courtier_id, statut);

-- ============================================================================
--  TABLE : mandats
-- ============================================================================
create table if not exists public.mandats (
  id                 uuid primary key default gen_random_uuid(),
  courtier_id        uuid not null default auth.uid() references auth.users(id) on delete cascade,
  bien_id            uuid not null references public.biens(id) on delete cascade,
  type               type_mandat not null default 'exclusif',
  exclusivite        boolean not null default true,
  date_signature     date,
  date_echeance      date,
  date_acte_visee    date,
  taux_commission    numeric(6,4),          -- ex. 0.03
  base_commission    base_commission not null default 'prix_vente',
  commission_forfait numeric(14,2),
  tva_applicable     boolean not null default true,
  -- Rétroplanning (échéances calculées à rebours) + lien de causalité
  retroplanning      jsonb not null default '[]'::jsonb,
  notes              text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);
create index if not exists idx_mandats_courtier on public.mandats(courtier_id);
create index if not exists idx_mandats_bien on public.mandats(bien_id);

-- ============================================================================
--  TABLE : estimations (versions successives)
-- ============================================================================
create table if not exists public.estimations (
  id                 uuid primary key default gen_random_uuid(),
  courtier_id        uuid not null default auth.uid() references auth.users(id) on delete cascade,
  bien_id            uuid not null references public.biens(id) on delete cascade,
  version            int not null default 1,
  -- Entrée complète (hypothèses) et résultat, tels que calculés par le moteur
  input              jsonb not null,
  resultat           jsonb not null,
  valeur_intrinseque numeric(14,2),
  valeur_rendement   numeric(14,2),
  valeur_venale      numeric(14,2),
  valeur_comparaison numeric(14,2),
  prix_mise_en_vente numeric(14,2),
  prix_plancher      numeric(14,2),
  methodes           methode_estimation[] not null default '{}',
  pdf_url            text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  unique (bien_id, version)
);
create index if not exists idx_estimations_courtier on public.estimations(courtier_id);
create index if not exists idx_estimations_bien on public.estimations(bien_id);

-- ============================================================================
--  TABLE : acquereurs (profil financier, capacité, score)
-- ============================================================================
create table if not exists public.acquereurs (
  id                     uuid primary key default gen_random_uuid(),
  courtier_id            uuid not null default auth.uid() references auth.users(id) on delete cascade,
  contact_id             uuid references public.contacts(id) on delete set null,
  -- Situation
  revenu_brut_annuel     numeric(14,2),
  fonds_propres_epargne  numeric(14,2) not null default 0,
  fonds_propres_3e_pilier numeric(14,2) not null default 0,
  fonds_propres_lpp      numeric(14,2) not null default 0,
  fonds_propres_donation numeric(14,2) not null default 0,
  fonds_propres_hoirie   numeric(14,2) not null default 0,
  dettes_existantes      numeric(14,2) not null default 0,
  leasing_annuel         numeric(14,2) not null default 0,
  age                    int,
  -- Résultat qualification (directives ASB)
  achat_maximum          numeric(14,2),
  verdict                verdict_solvabilite not null default 'non_evalue',
  qualification          jsonb not null default '{}'::jsonb,  -- détail ligne par ligne
  -- Scoring (0–100 par axe)
  score_capacite         int,
  score_adequation       int,
  score_reactivite       int,
  score_dossier_bancaire int,
  -- Critères de recherche (matching)
  budget_valide          numeric(14,2),
  communes_recherchees   text[] not null default '{}',
  surface_min            numeric(10,2),
  typologies             type_bien[] not null default '{}',
  -- Lex Koller / LFAIE
  domicile_suisse        boolean not null default true,
  permis                 text,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);
create index if not exists idx_acquereurs_courtier on public.acquereurs(courtier_id);

-- ============================================================================
--  TABLE : visites (horodatées — lien de causalité de la commission)
-- ============================================================================
create table if not exists public.visites (
  id            uuid primary key default gen_random_uuid(),
  courtier_id   uuid not null default auth.uid() references auth.users(id) on delete cascade,
  bien_id       uuid not null references public.biens(id) on delete cascade,
  acquereur_id  uuid references public.acquereurs(id) on delete set null,
  date_visite   timestamptz not null default now(),
  retour        text,
  signature_url text,
  created_at    timestamptz not null default now()
);
create index if not exists idx_visites_courtier on public.visites(courtier_id);
create index if not exists idx_visites_bien on public.visites(bien_id);

-- ============================================================================
--  TABLE : offres
-- ============================================================================
create table if not exists public.offres (
  id            uuid primary key default gen_random_uuid(),
  courtier_id   uuid not null default auth.uid() references auth.users(id) on delete cascade,
  bien_id       uuid not null references public.biens(id) on delete cascade,
  acquereur_id  uuid references public.acquereurs(id) on delete set null,
  montant       numeric(14,2) not null,
  statut        statut_offre not null default 'recue',
  date_offre    timestamptz not null default now(),
  -- Garde-fou : true si l'acquéreur n'est pas qualifié au moment de l'offre
  acquereur_non_qualifie boolean not null default false,
  notes         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists idx_offres_courtier on public.offres(courtier_id);
create index if not exists idx_offres_bien on public.offres(bien_id);

-- ============================================================================
--  TABLE : conditions_suspensives
-- ============================================================================
create table if not exists public.conditions_suspensives (
  id            uuid primary key default gen_random_uuid(),
  courtier_id   uuid not null default auth.uid() references auth.users(id) on delete cascade,
  offre_id      uuid references public.offres(id) on delete cascade,
  bien_id       uuid references public.biens(id) on delete cascade,
  libelle       text not null,
  statut        statut_condition not null default 'en_attente',
  date_echeance date,
  date_levee    date,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists idx_conditions_courtier on public.conditions_suspensives(courtier_id);

-- ============================================================================
--  TABLE : documents (métadonnées ; fichiers dans Storage, bucket privé)
-- ============================================================================
create table if not exists public.documents (
  id            uuid primary key default gen_random_uuid(),
  courtier_id   uuid not null default auth.uid() references auth.users(id) on delete cascade,
  bien_id       uuid references public.biens(id) on delete cascade,
  contact_id    uuid references public.contacts(id) on delete set null,
  type          type_document not null default 'autre',
  nom           text not null,
  storage_path  text,                    -- chemin dans le bucket 'documents'
  taille_octets bigint,
  created_at    timestamptz not null default now()
);
create index if not exists idx_documents_courtier on public.documents(courtier_id);
create index if not exists idx_documents_bien on public.documents(bien_id);

-- ============================================================================
--  TABLE : taches
-- ============================================================================
create table if not exists public.taches (
  id            uuid primary key default gen_random_uuid(),
  courtier_id   uuid not null default auth.uid() references auth.users(id) on delete cascade,
  bien_id       uuid references public.biens(id) on delete cascade,
  contact_id    uuid references public.contacts(id) on delete set null,
  titre         text not null,
  description   text,
  statut        statut_tache not null default 'a_faire',
  echeance      timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists idx_taches_courtier on public.taches(courtier_id);
create index if not exists idx_taches_echeance on public.taches(courtier_id, echeance);

-- ============================================================================
--  TABLE : relances (J+2 / J+7 / J+30, automatisables)
-- ============================================================================
create table if not exists public.relances (
  id            uuid primary key default gen_random_uuid(),
  courtier_id   uuid not null default auth.uid() references auth.users(id) on delete cascade,
  acquereur_id  uuid references public.acquereurs(id) on delete cascade,
  bien_id       uuid references public.biens(id) on delete cascade,
  visite_id     uuid references public.visites(id) on delete set null,
  type          text not null,           -- 'j+2','j+7','j+30','manuelle'
  date_prevue   timestamptz not null,
  faite         boolean not null default false,
  date_faite    timestamptz,
  created_at    timestamptz not null default now()
);
create index if not exists idx_relances_courtier on public.relances(courtier_id);
create index if not exists idx_relances_date on public.relances(courtier_id, date_prevue) where faite = false;

-- ============================================================================
--  TABLE : journal (audit trail horodaté)
-- ============================================================================
create table if not exists public.journal (
  id            uuid primary key default gen_random_uuid(),
  courtier_id   uuid not null default auth.uid() references auth.users(id) on delete cascade,
  bien_id       uuid references public.biens(id) on delete set null,
  entite        text not null,           -- nom de la table concernée
  entite_id     uuid,
  action        action_journal not null,
  auteur        uuid default auth.uid(),
  details       jsonb,
  created_at    timestamptz not null default now()
);
create index if not exists idx_journal_courtier on public.journal(courtier_id);
create index if not exists idx_journal_bien on public.journal(bien_id);
create index if not exists idx_journal_entite on public.journal(entite, entite_id);

-- ============================================================================
--  Triggers : updated_at
-- ============================================================================
do $$
declare t text;
begin
  foreach t in array array[
    'profils','contacts','biens','mandats','estimations','acquereurs',
    'offres','conditions_suspensives','taches'
  ] loop
    execute format('drop trigger if exists trg_%1$s_updated on public.%1$s;', t);
    execute format(
      'create trigger trg_%1$s_updated before update on public.%1$s
         for each row execute function public.set_updated_at();', t);
  end loop;
end $$;

-- ============================================================================
--  Trigger d'audit générique → journal
-- ============================================================================
create or replace function public.audit_journal()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_courtier uuid;
  v_bien     uuid;
  v_id       uuid;
  v_action   action_journal;
  v_details  jsonb;
begin
  if tg_op = 'DELETE' then
    v_courtier := old.courtier_id;
    v_id := old.id;
    v_action := 'suppression';
    v_details := to_jsonb(old);
  else
    v_courtier := new.courtier_id;
    v_id := new.id;
    v_action := case when tg_op = 'INSERT' then 'creation' else 'modification' end;
    v_details := to_jsonb(new);
  end if;

  -- bien_id : colonne directe si présente, sinon l'id lui-même pour la table biens
  if tg_table_name = 'biens' then
    v_bien := v_id;
  else
    begin
      v_bien := (v_details ->> 'bien_id')::uuid;
    exception when others then
      v_bien := null;
    end;
  end if;

  insert into public.journal (courtier_id, bien_id, entite, entite_id, action, auteur, details)
  values (v_courtier, v_bien, tg_table_name, v_id, v_action, auth.uid(),
          jsonb_build_object('op', tg_op));

  if tg_op = 'DELETE' then return old; else return new; end if;
end $$;

do $$
declare t text;
begin
  foreach t in array array[
    'contacts','biens','mandats','estimations','acquereurs','visites',
    'offres','conditions_suspensives','documents'
  ] loop
    execute format('drop trigger if exists trg_%1$s_audit on public.%1$s;', t);
    execute format(
      'create trigger trg_%1$s_audit after insert or update or delete on public.%1$s
         for each row execute function public.audit_journal();', t);
  end loop;
end $$;

-- ============================================================================
--  ROW LEVEL SECURITY
--  Chaque courtier n'accède qu'à ses propres lignes (courtier_id = auth.uid()).
-- ============================================================================
do $$
declare t text;
begin
  foreach t in array array[
    'profils','contacts','biens','mandats','estimations','acquereurs','visites',
    'offres','conditions_suspensives','documents','taches','relances','journal'
  ] loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('alter table public.%I force row level security;', t);
  end loop;
end $$;

-- profils : la clé est id (= auth.uid())
drop policy if exists profils_all on public.profils;
create policy profils_all on public.profils
  for all using (id = auth.uid()) with check (id = auth.uid());

-- Tables métier : politique uniforme via courtier_id
do $$
declare t text;
begin
  foreach t in array array[
    'contacts','biens','mandats','estimations','acquereurs','visites',
    'offres','conditions_suspensives','documents','taches','relances'
  ] loop
    execute format('drop policy if exists %1$s_select on public.%1$s;', t);
    execute format('drop policy if exists %1$s_insert on public.%1$s;', t);
    execute format('drop policy if exists %1$s_update on public.%1$s;', t);
    execute format('drop policy if exists %1$s_delete on public.%1$s;', t);
    execute format('create policy %1$s_select on public.%1$s for select using (courtier_id = auth.uid());', t);
    execute format('create policy %1$s_insert on public.%1$s for insert with check (courtier_id = auth.uid());', t);
    execute format('create policy %1$s_update on public.%1$s for update using (courtier_id = auth.uid()) with check (courtier_id = auth.uid());', t);
    execute format('create policy %1$s_delete on public.%1$s for delete using (courtier_id = auth.uid());', t);
  end loop;
end $$;

-- journal : lecture seule pour le courtier ; écriture réservée au trigger
-- (security definer) — aucune policy insert/update/delete → immuable côté client.
drop policy if exists journal_select on public.journal;
create policy journal_select on public.journal
  for select using (courtier_id = auth.uid());

-- ============================================================================
--  STORAGE : bucket privé 'documents' (chiffré au repos par Supabase)
--  Convention de chemin : {auth.uid()}/{bien_id}/{fichier}
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('documents', 'documents', false)
on conflict (id) do nothing;

drop policy if exists documents_read on storage.objects;
create policy documents_read on storage.objects
  for select using (
    bucket_id = 'documents'
    and owner = auth.uid()
  );

drop policy if exists documents_insert on storage.objects;
create policy documents_insert on storage.objects
  for insert with check (
    bucket_id = 'documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists documents_update on storage.objects;
create policy documents_update on storage.objects
  for update using (bucket_id = 'documents' and owner = auth.uid());

drop policy if exists documents_delete on storage.objects;
create policy documents_delete on storage.objects
  for delete using (bucket_id = 'documents' and owner = auth.uid());

-- ============================================================================
--  Auto-création du profil à l'inscription d'un utilisateur
-- ============================================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profils (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists trg_auth_user_created on auth.users;
create trigger trg_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
