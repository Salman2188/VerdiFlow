-- VerdiFlow schema teardown
-- Run this BEFORE re-running the initial migration if a previous run failed partway.
-- Safe for a dev database with only VerdiFlow tables in public.

drop table if exists public.activities cascade;
drop table if exists public.lead_tasks cascade;
drop table if exists public.lead_notes cascade;
drop table if exists public.leads cascade;
drop table if exists public.pipeline_stages cascade;
drop table if exists public.profiles cascade;

drop type if exists public.activity_type cascade;
drop type if exists public.lead_priority cascade;
drop type if exists public.lead_stage cascade;
