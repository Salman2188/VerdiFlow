-- VerdiFlow Phase 1: Workspace tenant isolation for CRM data

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

create or replace function public.user_workspace_ids()
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select workspace_id
  from public.workspace_members
  where user_id = auth.uid();
$$;

-- ---------------------------------------------------------------------------
-- Scope CRM rows to workspaces
-- ---------------------------------------------------------------------------

alter table public.leads
  add column if not exists workspace_id uuid references public.workspaces (id) on delete cascade;

create index if not exists leads_workspace_id_idx on public.leads (workspace_id);

-- ---------------------------------------------------------------------------
-- Backfill workspaces for auth users created before the bootstrap trigger
-- ---------------------------------------------------------------------------

insert into public.workspaces (name, owner_id)
select
  coalesce(nullif(trim(u.raw_user_meta_data->>'full_name'), ''), split_part(coalesce(u.email, 'user'), '@', 1))
    || '''s workspace',
  u.id
from auth.users u
where not exists (
  select 1
  from public.workspace_members wm
  where wm.user_id = u.id
);

insert into public.workspace_members (workspace_id, user_id, role)
select w.id, w.owner_id, 'owner'
from public.workspaces w
where not exists (
  select 1
  from public.workspace_members wm
  where wm.user_id = w.owner_id
    and wm.workspace_id = w.id
);

insert into public.profiles (id, full_name, email, role)
select
  u.id,
  coalesce(nullif(trim(u.raw_user_meta_data->>'full_name'), ''), split_part(coalesce(u.email, 'user'), '@', 1)),
  u.email,
  'owner'
from auth.users u
where not exists (
  select 1
  from public.profiles p
  where p.id = u.id
)
on conflict (id) do nothing;

insert into public.user_onboarding (user_id, current_step)
select u.id, 'verify_email'
from auth.users u
where not exists (
  select 1
  from public.user_onboarding o
  where o.user_id = u.id
)
on conflict (user_id) do nothing;

-- ---------------------------------------------------------------------------
-- Replace open CRM policies with workspace-scoped policies
-- ---------------------------------------------------------------------------

drop policy if exists "leads_select" on public.leads;
drop policy if exists "leads_update" on public.leads;
drop policy if exists "lead_notes_select" on public.lead_notes;
drop policy if exists "lead_tasks_select" on public.lead_tasks;
drop policy if exists "activities_select" on public.activities;
drop policy if exists "profiles_select" on public.profiles;
drop policy if exists "profiles_select_authenticated" on public.profiles;

create policy "profiles_select_workspace"
  on public.profiles for select
  to authenticated
  using (
    id = auth.uid()
    or exists (
      select 1
      from public.workspace_members wm_self
      join public.workspace_members wm_other
        on wm_self.workspace_id = wm_other.workspace_id
      where wm_self.user_id = auth.uid()
        and wm_other.user_id = profiles.id
    )
  );

create policy "leads_select_workspace"
  on public.leads for select
  to authenticated
  using (workspace_id in (select public.user_workspace_ids()));

create policy "leads_insert_workspace"
  on public.leads for insert
  to authenticated
  with check (workspace_id in (select public.user_workspace_ids()));

create policy "leads_update_workspace"
  on public.leads for update
  to authenticated
  using (workspace_id in (select public.user_workspace_ids()))
  with check (workspace_id in (select public.user_workspace_ids()));

create policy "leads_delete_workspace"
  on public.leads for delete
  to authenticated
  using (workspace_id in (select public.user_workspace_ids()));

create policy "lead_notes_select_workspace"
  on public.lead_notes for select
  to authenticated
  using (
    exists (
      select 1
      from public.leads l
      where l.id = lead_notes.lead_id
        and l.workspace_id in (select public.user_workspace_ids())
    )
  );

create policy "lead_notes_insert_workspace"
  on public.lead_notes for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.leads l
      where l.id = lead_notes.lead_id
        and l.workspace_id in (select public.user_workspace_ids())
    )
  );

create policy "lead_notes_update_workspace"
  on public.lead_notes for update
  to authenticated
  using (
    exists (
      select 1
      from public.leads l
      where l.id = lead_notes.lead_id
        and l.workspace_id in (select public.user_workspace_ids())
    )
  )
  with check (
    exists (
      select 1
      from public.leads l
      where l.id = lead_notes.lead_id
        and l.workspace_id in (select public.user_workspace_ids())
    )
  );

create policy "lead_notes_delete_workspace"
  on public.lead_notes for delete
  to authenticated
  using (
    exists (
      select 1
      from public.leads l
      where l.id = lead_notes.lead_id
        and l.workspace_id in (select public.user_workspace_ids())
    )
  );

create policy "lead_tasks_select_workspace"
  on public.lead_tasks for select
  to authenticated
  using (
    exists (
      select 1
      from public.leads l
      where l.id = lead_tasks.lead_id
        and l.workspace_id in (select public.user_workspace_ids())
    )
  );

create policy "lead_tasks_insert_workspace"
  on public.lead_tasks for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.leads l
      where l.id = lead_tasks.lead_id
        and l.workspace_id in (select public.user_workspace_ids())
    )
  );

create policy "lead_tasks_update_workspace"
  on public.lead_tasks for update
  to authenticated
  using (
    exists (
      select 1
      from public.leads l
      where l.id = lead_tasks.lead_id
        and l.workspace_id in (select public.user_workspace_ids())
    )
  )
  with check (
    exists (
      select 1
      from public.leads l
      where l.id = lead_tasks.lead_id
        and l.workspace_id in (select public.user_workspace_ids())
    )
  );

create policy "lead_tasks_delete_workspace"
  on public.lead_tasks for delete
  to authenticated
  using (
    exists (
      select 1
      from public.leads l
      where l.id = lead_tasks.lead_id
        and l.workspace_id in (select public.user_workspace_ids())
    )
  );

create policy "activities_select_workspace"
  on public.activities for select
  to authenticated
  using (
    exists (
      select 1
      from public.leads l
      where l.id = activities.lead_id
        and l.workspace_id in (select public.user_workspace_ids())
    )
  );

create policy "activities_insert_workspace"
  on public.activities for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.leads l
      where l.id = activities.lead_id
        and l.workspace_id in (select public.user_workspace_ids())
    )
  );

create policy "activities_update_workspace"
  on public.activities for update
  to authenticated
  using (
    exists (
      select 1
      from public.leads l
      where l.id = activities.lead_id
        and l.workspace_id in (select public.user_workspace_ids())
    )
  )
  with check (
    exists (
      select 1
      from public.leads l
      where l.id = activities.lead_id
        and l.workspace_id in (select public.user_workspace_ids())
    )
  );

create policy "activities_delete_workspace"
  on public.activities for delete
  to authenticated
  using (
    exists (
      select 1
      from public.leads l
      where l.id = activities.lead_id
        and l.workspace_id in (select public.user_workspace_ids())
    )
  );
