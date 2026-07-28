-- ============================================================================
--  CourtierOS — Migration 0002 : Dossier du bien
--  - Suivi de statut des documents (demandé / reçu) + fichiers.
--  - Table `echanges` : historique humain (notes, mails, appels) par dossier.
--  Idempotent : rejouable sans risque.
-- ============================================================================

-- ── Documents : statut & dates ──────────────────────────────────────────────
alter table public.documents
  add column if not exists statut         text not null default 'manquant', -- manquant | demande | recu
  add column if not exists date_demande   date,
  add column if not exists date_reception date,
  add column if not exists notes          text;

-- ── Table : echanges (historique du dossier) ────────────────────────────────
create table if not exists public.echanges (
  id            uuid primary key default gen_random_uuid(),
  courtier_id   uuid not null default auth.uid() references auth.users(id) on delete cascade,
  bien_id       uuid references public.biens(id) on delete cascade,
  contact_id    uuid references public.contacts(id) on delete set null,
  canal         text not null default 'note',   -- note | email | appel | notaire | autre
  contenu       text not null,
  date_echange  timestamptz not null default now(),
  created_at    timestamptz not null default now()
);
create index if not exists idx_echanges_courtier on public.echanges(courtier_id);
create index if not exists idx_echanges_bien on public.echanges(bien_id, date_echange desc);

alter table public.echanges enable row level security;
alter table public.echanges force row level security;

drop policy if exists echanges_select on public.echanges;
drop policy if exists echanges_insert on public.echanges;
drop policy if exists echanges_update on public.echanges;
drop policy if exists echanges_delete on public.echanges;
create policy echanges_select on public.echanges for select using (courtier_id = auth.uid());
create policy echanges_insert on public.echanges for insert with check (courtier_id = auth.uid());
create policy echanges_update on public.echanges for update using (courtier_id = auth.uid()) with check (courtier_id = auth.uid());
create policy echanges_delete on public.echanges for delete using (courtier_id = auth.uid());

-- Audit de la table echanges vers le journal
drop trigger if exists trg_echanges_audit on public.echanges;
create trigger trg_echanges_audit after insert or update or delete on public.echanges
  for each row execute function public.audit_journal();

NOTIFY pgrst, 'reload schema';
