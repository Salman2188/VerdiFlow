-- Phase 2: Instagram Business connection (Meta OAuth tokens stored server-side)

create table public.instagram_connections (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  instagram_account_id text not null,
  instagram_username text,
  facebook_page_id text not null,
  facebook_page_name text,
  access_token text not null,
  token_expires_at timestamptz,
  connected_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id)
);

create index instagram_connections_user_id_idx on public.instagram_connections (user_id);

alter table public.instagram_connections enable row level security;

create policy "instagram_connections_select_workspace_member"
  on public.instagram_connections for select
  using (
    exists (
      select 1
      from public.workspace_members wm
      where wm.workspace_id = instagram_connections.workspace_id
        and wm.user_id = auth.uid()
    )
  );

create policy "instagram_connections_insert_workspace_member"
  on public.instagram_connections for insert
  with check (
    user_id = auth.uid()
    and exists (
      select 1
      from public.workspace_members wm
      where wm.workspace_id = instagram_connections.workspace_id
        and wm.user_id = auth.uid()
    )
  );

create policy "instagram_connections_update_workspace_member"
  on public.instagram_connections for update
  using (
    exists (
      select 1
      from public.workspace_members wm
      where wm.workspace_id = instagram_connections.workspace_id
        and wm.user_id = auth.uid()
    )
  );

create policy "instagram_connections_delete_workspace_member"
  on public.instagram_connections for delete
  using (
    exists (
      select 1
      from public.workspace_members wm
      where wm.workspace_id = instagram_connections.workspace_id
        and wm.user_id = auth.uid()
    )
  );
