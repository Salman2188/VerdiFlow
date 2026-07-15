-- VerdiFlow initial schema

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------

create type public.lead_stage as enum ('hot', 'warm', 'active', 'new');
create type public.lead_priority as enum ('Høy', 'Medium', 'Lav');
create type public.activity_type as enum (
  'call',
  'email',
  'message',
  'note',
  'document',
  'task',
  'status'
);

-- ---------------------------------------------------------------------------
-- Profiles (agents)
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  agency text,
  avatar_url text,
  role text not null default 'agent',
  closed_deals integer not null default 0,
  pipeline_value numeric not null default 0,
  conversion_rate numeric not null default 0,
  ai_score integer not null default 0,
  is_top_performer boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Pipeline stages (Kanban columns)
-- ---------------------------------------------------------------------------

create table public.pipeline_stages (
  id text primary key,
  label text not null,
  emoji text not null,
  sort_order integer not null,
  stage_group public.lead_stage not null
);

-- ---------------------------------------------------------------------------
-- Leads
-- ---------------------------------------------------------------------------

create table public.leads (
  id text primary key,
  customer_name text not null,
  email text,
  phone text,
  property text,
  property_type text,
  status text not null,
  stage public.lead_stage not null,
  source text not null,
  last_activity_at timestamptz not null default now(),
  ai_recommendation text not null default '',
  closing_probability integer not null default 0,
  ai_priority_score integer not null default 0,
  priority public.lead_priority not null default 'Medium',
  budget text,
  tags text[] not null default '{}',
  pipeline_stage_id text not null references public.pipeline_stages (id),
  assigned_to uuid references public.profiles (id) on delete set null,
  preferred_contact text,
  buyer_type text,
  financing text,
  property_size text,
  property_rooms text,
  year_built text,
  asking_price text,
  municipality text,
  viewing_date date,
  ai_summary_headline text,
  ai_summary_text text,
  ai_key_insights text[] not null default '{}',
  ai_confidence integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Lead notes
-- ---------------------------------------------------------------------------

create table public.lead_notes (
  id uuid primary key default gen_random_uuid(),
  lead_id text not null references public.leads (id) on delete cascade,
  content text not null,
  author text not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Lead tasks
-- ---------------------------------------------------------------------------

create table public.lead_tasks (
  id uuid primary key default gen_random_uuid(),
  lead_id text not null references public.leads (id) on delete cascade,
  title text not null,
  due_date date,
  priority public.lead_priority not null default 'Medium',
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Activities (calls, emails, messages, documents, timeline events)
-- ---------------------------------------------------------------------------

create table public.activities (
  id uuid primary key default gen_random_uuid(),
  lead_id text not null references public.leads (id) on delete cascade,
  type public.activity_type not null,
  title text not null,
  description text,
  actor text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------

create index leads_pipeline_stage_id_idx on public.leads (pipeline_stage_id);
create index leads_stage_idx on public.leads (stage);
create index leads_last_activity_at_idx on public.leads (last_activity_at desc);
create index activities_lead_id_idx on public.activities (lead_id);
create index activities_created_at_idx on public.activities (created_at desc);
create index lead_notes_lead_id_idx on public.lead_notes (lead_id);
create index lead_tasks_lead_id_idx on public.lead_tasks (lead_id);

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.pipeline_stages enable row level security;
alter table public.leads enable row level security;
alter table public.lead_notes enable row level security;
alter table public.lead_tasks enable row level security;
alter table public.activities enable row level security;

create policy "profiles_select"
  on public.profiles for select
  using (true);

create policy "pipeline_stages_select"
  on public.pipeline_stages for select
  using (true);

create policy "leads_select"
  on public.leads for select
  using (true);

create policy "leads_update"
  on public.leads for update
  using (true);

create policy "lead_notes_select"
  on public.lead_notes for select
  using (true);

create policy "lead_tasks_select"
  on public.lead_tasks for select
  using (true);

create policy "activities_select"
  on public.activities for select
  using (true);
