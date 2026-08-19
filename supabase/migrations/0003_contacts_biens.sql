-- ============================================================================
--  0003 — Répertoire de contacts : liaison contacts ↔ biens (many-to-many)
--  Une personne peut être rattachée à plusieurs dossiers (dans le temps), avec
--  un rôle par dossier (vendeur, acquéreur, notaire…). Les contacts survivent à
--  la clôture / suppression d'un dossier : on peut retrouver leur historique.
-- ============================================================================

create table if not exists public.contacts_biens (
  id           uuid primary key default gen_random_uuid(),
  courtier_id  uuid not null default auth.uid() references auth.users(id) on delete cascade,
  contact_id   uuid not null references public.contacts(id) on delete cascade,
  bien_id      uuid not null references public.biens(id) on delete cascade,
  role         text,                              -- vendeur | acquereur | notaire | courtier_tiers | artisan | autre
  created_at   timestamptz not null default now(),
  unique (contact_id, bien_id)
);

create index if not exists idx_contacts_biens_courtier on public.contacts_biens(courtier_id);
create index if not exists idx_contacts_biens_contact  on public.contacts_biens(contact_id);
create index if not exists idx_contacts_biens_bien     on public.contacts_biens(bien_id);

alter table public.contacts_biens enable row level security;
alter table public.contacts_biens force row level security;

drop policy if exists contacts_biens_select on public.contacts_biens;
drop policy if exists contacts_biens_insert on public.contacts_biens;
drop policy if exists contacts_biens_update on public.contacts_biens;
drop policy if exists contacts_biens_delete on public.contacts_biens;
create policy contacts_biens_select on public.contacts_biens for select using (courtier_id = auth.uid());
create policy contacts_biens_insert on public.contacts_biens for insert with check (courtier_id = auth.uid());
create policy contacts_biens_update on public.contacts_biens for update using (courtier_id = auth.uid()) with check (courtier_id = auth.uid());
create policy contacts_biens_delete on public.contacts_biens for delete using (courtier_id = auth.uid());

-- Recharger le cache de schéma de l'API
notify pgrst, 'reload schema';
