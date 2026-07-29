-- ============================================================================
--  CourtierOS — Migration 0003 : correctif suppression de dossier
--
--  Problème : à la suppression d'un `bien` (ou d'une de ses lignes filles via
--  cascade), le trigger d'audit `audit_journal()` tentait d'insérer dans
--  `journal` une ligne référençant le bien en cours de suppression. La clé
--  étrangère `journal_bien_id_fkey` était alors violée :
--    « insert or update on table "journal" violates foreign key constraint
--      "journal_bien_id_fkey" »
--  → toute suppression de dossier échouait.
--
--  Correctif : dans le trigger, si le bien référencé n'existe plus (il est en
--  train d'être supprimé), on journalise avec bien_id = NULL au lieu d'une
--  référence morte. Le reste du comportement d'audit est inchangé.
--
--  Idempotent : rejouable sans risque (create or replace).
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

  -- Le bien référencé peut être en cours de suppression (DELETE du bien ou
  -- suppression en cascade d'une ligne fille). Dans ce cas, journaliser avec
  -- bien_id = NULL pour éviter une violation de journal_bien_id_fkey.
  if v_bien is not null and not exists (select 1 from public.biens b where b.id = v_bien) then
    v_bien := null;
  end if;

  insert into public.journal (courtier_id, bien_id, entite, entite_id, action, auteur, details)
  values (v_courtier, v_bien, tg_table_name, v_id, v_action, auth.uid(),
          jsonb_build_object('op', tg_op));

  if tg_op = 'DELETE' then return old; else return new; end if;
end $$;
