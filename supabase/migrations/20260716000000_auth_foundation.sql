-- VerdiFlow Phase 1: Auth foundation
-- Workspaces, onboarding state, profile bootstrap on signup

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------

create type public.onboarding_step as enum (
  'verify_email',
  'connect_instagram',
  'completed'
);

-- ---------------------------------------------------------------------------
-- Workspaces (one per customer; v1 = one owner)
-- ---------------------------------------------------------------------------

create table public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workspace_members (
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null default 'owner',
  created_at timestamptz not null default now(),
  primary key (workspace_id, user_id)
);

create index workspace_members_user_id_idx on public.workspace_members (user_id);

-- ---------------------------------------------------------------------------
-- Onboarding progress
-- ---------------------------------------------------------------------------

create table public.user_onboarding (
  user_id uuid primary key references auth.users (id) on delete cascade,
  current_step public.onboarding_step not null default 'verify_email',
  email_verified_at timestamptz,
  instagram_connected_at timestamptz,
  onboarding_completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Profiles: new signups use auth.users.id (existing seed rows unchanged)
-- ---------------------------------------------------------------------------

alter table public.profiles alter column id drop default;

-- ---------------------------------------------------------------------------
-- Bootstrap user records on signup
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  new_workspace_id uuid;
  display_name text;
begin
  display_name := coalesce(
    nullif(trim(new.raw_user_meta_data->>'full_name'), ''),
    split_part(coalesce(new.email, 'user'), '@', 1)
  );

  insert into public.profiles (id, full_name, email, role)
  values (new.id, display_name, new.email, 'owner')
  on conflict (id) do update
    set full_name = excluded.full_name,
        email = excluded.email,
        updated_at = now();

  insert into public.workspaces (name, owner_id)
  values (display_name || '''s workspace', new.id)
  returning id into new_workspace_id;

  insert into public.workspace_members (workspace_id, user_id, role)
  values (new_workspace_id, new.id, 'owner');

  insert into public.user_onboarding (user_id, current_step)
  values (new.id, 'verify_email')
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------

alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.user_onboarding enable row level security;

drop policy if exists "profiles_select" on public.profiles;

create policy "profiles_select_authenticated"
  on public.profiles for select
  to authenticated
  using (true);

create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "workspaces_select_member"
  on public.workspaces for select
  to authenticated
  using (
    exists (
      select 1
      from public.workspace_members wm
      where wm.workspace_id = workspaces.id
        and wm.user_id = auth.uid()
    )
  );

create policy "workspace_members_select_own"
  on public.workspace_members for select
  to authenticated
  using (user_id = auth.uid());

create policy "user_onboarding_select_own"
  on public.user_onboarding for select
  to authenticated
  using (user_id = auth.uid());

create policy "user_onboarding_update_own"
  on public.user_onboarding for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
