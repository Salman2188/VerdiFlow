-- VerdiFlow seed data
-- Run after migrations: supabase db reset  OR  psql -f supabase/seed.sql

-- ---------------------------------------------------------------------------
-- Profiles
-- ---------------------------------------------------------------------------

insert into public.profiles (
  id, full_name, email, agency, closed_deals, pipeline_value, conversion_rate, ai_score, is_top_performer
) values
  ('11111111-1111-4111-8111-111111111111', 'Alex Rivera', 'alex@verdiflow.no', 'VerdiFlow Eiendom', 8, 12400000, 38, 94, true),
  ('22222222-2222-4222-8222-222222222222', 'Sofia Berg', 'sofia@verdiflow.no', 'VerdiFlow Eiendom', 6, 9800000, 34, 89, false),
  ('33333333-3333-4333-8333-333333333333', 'Erik Nilsen', 'erik@verdiflow.no', 'VerdiFlow Eiendom', 5, 7200000, 31, 82, false),
  ('44444444-4444-4444-8444-444444444444', 'Maria Holm', 'maria@verdiflow.no', 'VerdiFlow Eiendom', 4, 5600000, 28, 78, false),
  ('55555555-5555-4555-8555-555555555555', 'Jonas Meier', 'jonas@verdiflow.no', 'VerdiFlow Eiendom', 3, 4100000, 24, 71, false)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Pipeline stages
-- ---------------------------------------------------------------------------

insert into public.pipeline_stages (id, label, emoji, sort_order, stage_group) values
  ('nye-leads', 'Nye leads', '⚪', 1, 'new'),
  ('kontaktet', 'Kontaktet', '💬', 2, 'active'),
  ('visning-booket', 'Visning booket', '📅', 3, 'warm'),
  ('bud-sendt', 'Bud sendt', '📄', 4, 'hot'),
  ('forhandling', 'Forhandling', '🤝', 5, 'hot'),
  ('solgt', 'Solgt', '✅', 6, 'hot')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Leads
-- ---------------------------------------------------------------------------

insert into public.leads (
  id, customer_name, email, phone, property, property_type, status, stage, source,
  last_activity_at, ai_recommendation, closing_probability, ai_priority_score, priority,
  budget, tags, pipeline_stage_id, assigned_to,
  preferred_contact, buyer_type, financing,
  property_size, property_rooms, year_built, asking_price, municipality, viewing_date,
  ai_summary_headline, ai_summary_text, ai_key_insights, ai_confidence, created_at, updated_at
) values
  (
    'lead-1', 'Jennifer Walsh', 'jennifer.walsh@email.no', '+47 412 33 891',
    'Eikeveien 14, Oslo', 'Enebolig', 'Tilbud sendt', 'hot', 'Finn.no',
    now() - interval '2 hours',
    'Send personlig oppfølging på motbud innen kl. 12.', 78, 94, 'Høy',
    '8,5–9,2 mill', array['Motbud', 'Haster'], 'bud-sendt', '11111111-1111-4111-8111-111111111111',
    'Telefon', 'Flytting fra utlandet', 'Godkjent lån — DNB',
    '185 m²', '5 rom / 3 soverom', '2018', '8 950 000 kr', 'Oslo — Ullern', '2026-03-10',
    'Motbud mottatt — høy sannsynlighet for lukking denne uken',
    'Jennifer er svært motivert og har godkjent finansiering. Hun motsatte seg med 8,7 mill. etter visning i går. Konkurrerende bud fra annen megler utløper torsdag. Rask, personlig oppfølging er avgjørende.',
    array[
      'Har sett 4 lignende objekter — Eikeveien er favoritt',
      'Responserer best på telefon mellom 09–11',
      'Bekymret for felleskostnader — adresser dette i neste samtale',
      'Partner godkjenner endelig beslutning — begge bør involveres'
    ],
    92, now() - interval '12 days', now() - interval '12 days'
  ),
  (
    'lead-2', 'Lisa & David Park', 'park.family@gmail.com', '+47 928 11 442',
    'Bjerkveien 8, Bærum', 'Tomannsbolig', 'Motbud mottatt', 'hot', 'Referanse',
    now() - interval '5 hours',
    'AI-utkast til svar er klart — gjennomgå og send.', 72, 91, 'Høy',
    '12–13 mill', array['Motbud', 'Familie'], 'forhandling', '11111111-1111-4111-8111-111111111111',
    null, null, null,
    null, null, null, null, null, null,
    null, null, array[]::text[], null,
    now() - interval '10 days', now() - interval '10 days'
  ),
  (
    'lead-3', 'Anders & Kari Nilsen', 'a.k.nilsen@outlook.com', '+47 901 55 203',
    'Finn.no — Lillestrøm', 'Rekkehus', 'Ny henvendelse', 'new', 'Finn.no',
    now() - interval '3 hours',
    'Ring innen 30 min for høyest konvertering.', 22, 88, 'Høy',
    '5,5–6,2 mill', array['Ny', 'Førstegangskjøper'], 'nye-leads', '11111111-1111-4111-8111-111111111111',
    null, null, null,
    null, null, null, null, null, null,
    null, null, array[]::text[], null,
    now() - interval '1 day', now() - interval '1 day'
  ),
  (
    'lead-4', 'Michael Torres', 'm.torres@firma.no', '+47 977 44 128',
    'Maple Dr 42, Asker', 'Enebolig', 'Visning booket', 'warm', 'Hjemmeside',
    now() - interval '18 hours',
    'Bekreft visning og forbered prisargument.', 54, 76, 'Medium',
    '7–8 mill', array['Visning', 'Investor'], 'visning-booket', '22222222-2222-4222-8222-222222222222',
    null, null, null,
    null, null, null, null, null, null,
    null, null, array[]::text[], null,
    now() - interval '6 days', now() - interval '6 days'
  ),
  (
    'lead-5', 'Erik Johansen', 'erik.j@live.no', '+47 934 22 667',
    'Strandpromenaden 3, Drammen', 'Leilighet', 'Under vurdering', 'active', 'Zett',
    now() - interval '1 day',
    'Del nylig solgt lignende objekt for å skape urgency.', 41, 62, 'Medium',
    '4,2–4,8 mill', array['Sammenligning'], 'forhandling', '33333333-3333-4333-8333-333333333333',
    null, null, null,
    null, null, null, null, null, null,
    null, null, array[]::text[], null,
    now() - interval '14 days', now() - interval '14 days'
  ),
  (
    'lead-6', 'Nina Berg', 'nina.berg@email.no', '+47 915 88 301',
    'Kirkegata 22, Trondheim', 'Leilighet', 'Dialog pågår', 'active', 'Finn.no',
    now() - interval '2 days',
    'Planlegg oppfølgingssamtale denne uken.', 38, 48, 'Lav',
    '3,5–4 mill', array['Oppfølging'], 'kontaktet', '44444444-4444-4444-8444-444444444444',
    null, null, null,
    null, null, null, null, null, null,
    null, null, array[]::text[], null,
    now() - interval '8 days', now() - interval '8 days'
  ),
  (
    'lead-7', 'Thomas & Marie Holm', 'holm.couple@icloud.com', '+47 988 33 774',
    'Skogveien 17, Stavanger', 'Enebolig', 'Visning booket', 'warm', 'Referanse',
    now() - interval '4 hours',
    'Send forberedelsesmail med nabolagsinfo før visning.', 61, 82, 'Høy',
    '9,5–10,5 mill', array['Visning', 'Premium'], 'visning-booket', '11111111-1111-4111-8111-111111111111',
    null, null, null,
    null, null, null, null, null, null,
    null, null, array[]::text[], null,
    now() - interval '5 days', now() - interval '5 days'
  ),
  (
    'lead-8', 'Sofia Lindqvist', 'sofia.l@proton.me', '+47 920 66 119',
    'Havnegata 5, Bergen', 'Leilighet', 'Ny henvendelse', 'new', 'Sosiale medier',
    now() - interval '1 hour',
    'Svar på Instagram-DM og book introduksjonssamtale.', 18, 85, 'Høy',
    '5–5,8 mill', array['Ny', 'Sosial'], 'nye-leads', '22222222-2222-4222-8222-222222222222',
    null, null, null,
    null, null, null, null, null, null,
    null, null, array[]::text[], null,
    now() - interval '6 hours', now() - interval '6 hours'
  ),
  (
    'lead-9', 'Henrik & Anna Svendsen', 'svendsen.familie@online.no', '+47 906 44 552',
    'Granlia 9, Sandvika', 'Rekkehus', 'Tilbud sendt', 'hot', 'Meglertjeneste',
    now() - interval '8 hours',
    'Følg opp tilbud — de vurderer konkurrerende objekt.', 69, 79, 'Høy',
    '6,8–7,5 mill', array['Tilbud', 'Konkurranse'], 'bud-sendt', '33333333-3333-4333-8333-333333333333',
    null, null, null,
    null, null, null, null, null, null,
    null, null, array[]::text[], null,
    now() - interval '9 days', now() - interval '9 days'
  ),
  (
    'lead-10', 'Camilla Røstad', 'camilla.rostad@firma.no', '+47 913 77 228',
    'Parkveien 31, Kristiansand', 'Leilighet', 'Dialog pågår', 'active', 'Finn.no',
    now() - interval '9 days',
    'Reaktiver med personlig markedsoppdatering — risiko for tap.', 29, 71, 'Medium',
    '3,8–4,2 mill', array['Inaktiv', 'Reaktivering'], 'kontaktet', '44444444-4444-4444-8444-444444444444',
    null, null, null,
    null, null, null, null, null, null,
    null, null, array[]::text[], null,
    now() - interval '20 days', now() - interval '20 days'
  ),
  (
    'lead-11', 'Jonas Meier', 'j.meier@email.no', '+47 995 12 884',
    'Fjordgata 2, Tromsø', 'Leilighet', 'Under vurdering', 'active', 'Zett',
    now() - interval '12 days',
    'Send siste påminnelse før lead arkiveres automatisk.', 15, 35, 'Lav',
    '2,9–3,4 mill', array['Inaktiv'], 'forhandling', '55555555-5555-4555-8555-555555555555',
    null, null, null,
    null, null, null, null, null, null,
    null, null, array[]::text[], null,
    now() - interval '25 days', now() - interval '25 days'
  ),
  (
    'lead-12', 'Petra & Ole Haugen', 'haugen.paret@gmail.com', '+47 922 55 901',
    'Solheimsveien 44, Oslo', 'Tomannsbolig', 'Ny henvendelse', 'new', 'Hjemmeside',
    now() - interval '45 minutes',
    'Ny lead fra kontaktskjema — ring nå mens interessen er høy.', 25, 92, 'Høy',
    '11–12 mill', array['Ny', 'Premium'], 'nye-leads', '11111111-1111-4111-8111-111111111111',
    null, null, null,
    null, null, null, null, null, null,
    null, null, array[]::text[], null,
    now() - interval '45 minutes', now() - interval '45 minutes'
  )
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Lead notes (lead-1)
-- ---------------------------------------------------------------------------

insert into public.lead_notes (id, lead_id, content, author, created_at) values
  (
    'a1000001-0000-4000-8000-000000000001', 'lead-1',
    'Flytter fra London Q2 2026. Barn 8 og 11 år — nærhet til International School viktig. Partner (James) mer prisbevisst.',
    'Alex Rivera', now() - interval '5 days'
  ),
  (
    'a1000002-0000-4000-8000-000000000002', 'lead-1',
    'Visning: Kunden begeistret for hagen og garasjen. Bekymret for støy fra E18 — viste støyrapport.',
    'Alex Rivera', now() - interval '2 days'
  )
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Lead tasks (lead-1)
-- ---------------------------------------------------------------------------

insert into public.lead_tasks (id, lead_id, title, due_date, priority, completed, created_at) values
  ('b1000001-0000-4000-8000-000000000001', 'lead-1', 'Svar på motbud innen kl. 12', current_date, 'Høy', false, now() - interval '1 day'),
  ('b1000002-0000-4000-8000-000000000002', 'lead-1', 'Send oppdatert budskjema til selger', current_date + 1, 'Høy', false, now() - interval '1 day'),
  ('b1000003-0000-4000-8000-000000000003', 'lead-1', 'Book oppfølgingssamtale med begge parter', current_date + 2, 'Medium', false, now() - interval '2 days'),
  ('b1000004-0000-4000-8000-000000000004', 'lead-1', 'Visning gjennomført', current_date - 3, 'Medium', true, now() - interval '3 days')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Activities (lead-1)
-- ---------------------------------------------------------------------------

insert into public.activities (id, lead_id, type, title, description, actor, metadata, created_at) values
  (
    'c1000001-0000-4000-8000-000000000001', 'lead-1', 'status', 'Motbud mottatt',
    'Kunden motsatte seg med 8 700 000 kr. AI anbefaler svar innen 4 timer.',
    'System', '{}'::jsonb, now() - interval '2 hours'
  ),
  (
    'c1000002-0000-4000-8000-000000000002', 'lead-1', 'call', 'Utgående samtale — 12 min',
    'Diskuterte felleskostnader og nabolag. Kunden ønsker å legge inn motbud.',
    'Alex Rivera', '{"direction":"ut","duration":"12 min"}'::jsonb, now() - interval '5 hours'
  ),
  (
    'c1000003-0000-4000-8000-000000000003', 'lead-1', 'email', 'E-post sendt: Takk for visning',
    'Oppfølgingsmail med nabolagsinfo og lignende solgte objekter.',
    'Alex Rivera', '{"direction":"ut","subject":"E-post sendt: Takk for visning","preview":"Oppfølgingsmail med nabolagsinfo og lignende solgte objekter."}'::jsonb,
    now() - interval '1 day'
  ),
  (
    'c1000004-0000-4000-8000-000000000004', 'lead-1', 'task', 'Visning gjennomført',
    'Kunden møtte opp med partner. Positiv tilstand og beliggenhet.',
    'Alex Rivera', '{}'::jsonb, now() - interval '2 days'
  ),
  (
    'c1000005-0000-4000-8000-000000000005', 'lead-1', 'message', 'SMS mottatt',
    '«Vi er veldig interesserte — kan vi få til visning i helgen?»',
    'Jennifer Walsh', '{"direction":"inn","channel":"SMS"}'::jsonb, now() - interval '4 days'
  ),
  (
    'c1000006-0000-4000-8000-000000000006', 'lead-1', 'document', 'Finansieringsbevis lastet opp',
    'DNB — lån inntil 9,2 mill. godkjent.',
    'Jennifer Walsh', '{"name":"Finansieringsbevis DNB.pdf","file_type":"Finansiering","size":"245 KB"}'::jsonb,
    now() - interval '6 days'
  ),
  (
    'c1000007-0000-4000-8000-000000000007', 'lead-1', 'call', 'Innkommende samtale — 8 min',
    'Første kontakt via Finn.no. Kunden spurte om visning og prisforhandling.',
    'Jennifer Walsh', '{"direction":"inn","duration":"8 min"}'::jsonb, now() - interval '8 days'
  ),
  (
    'c1000008-0000-4000-8000-000000000008', 'lead-1', 'call', 'Utgående samtale — 12 min',
    'Diskuterte felleskostnader og nabolag. Kunden klar for motbud.',
    'Alex Rivera', '{"direction":"ut","duration":"12 min"}'::jsonb, now() - interval '5 hours'
  ),
  (
    'c1000009-0000-4000-8000-000000000009', 'lead-1', 'email', 'Takk for visning — Eikeveien 14',
    'Hei Jennifer, takk for en hyggelig visning i dag. Vedlagt finner du...',
    'Alex Rivera', '{"direction":"ut","subject":"Takk for visning — Eikeveien 14","preview":"Hei Jennifer, takk for en hyggelig visning i dag. Vedlagt finner du..."}'::jsonb,
    now() - interval '1 day'
  ),
  (
    'c1000010-0000-4000-8000-000000000010', 'lead-1', 'email', 'Re: Visning Eikeveien 14',
    'Tusen takk! Vi er veldig begeistret. Har dere mottatt andre bud?',
    'Jennifer Walsh', '{"direction":"inn","subject":"Re: Visning Eikeveien 14","preview":"Tusen takk! Vi er veldig begeistret. Har dere mottatt andre bud?"}'::jsonb,
    now() - interval '1 day'
  ),
  (
    'c1000011-0000-4000-8000-000000000011', 'lead-1', 'message', 'SMS mottatt',
    'Hei Alex, vi har diskutert og vil gjerne legge inn et motbud på 8,7 mill.',
    'Jennifer Walsh', '{"direction":"inn","channel":"SMS"}'::jsonb, now() - interval '2 hours'
  ),
  (
    'c1000012-0000-4000-8000-000000000012', 'lead-1', 'document', 'Tilstandsrapport Eikeveien 14.pdf',
    'Tilstandsrapport delt med kunden.',
    'Alex Rivera', '{"name":"Tilstandsrapport Eikeveien 14.pdf","file_type":"Tilstandsrapport","size":"1,2 MB"}'::jsonb,
    now() - interval '3 days'
  ),
  (
    'c1000013-0000-4000-8000-000000000013', 'lead-1', 'document', 'Budskjema signert.pdf',
    'Signert budskjema mottatt fra kunden.',
    'Jennifer Walsh', '{"name":"Budskjema signert.pdf","file_type":"Kontrakt","size":"380 KB"}'::jsonb,
    now() - interval '2 hours'
  )
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Light activities for other leads (timeline + tabs)
-- ---------------------------------------------------------------------------

insert into public.activities (lead_id, type, title, description, actor, metadata, created_at)
select
  l.id,
  'status',
  l.status,
  l.ai_recommendation,
  'System',
  '{}'::jsonb,
  l.last_activity_at
from public.leads l
where l.id <> 'lead-1';
