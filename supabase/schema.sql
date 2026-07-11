-- ─────────────────────────────────────────────────────────────
-- divinegabriel.dev — content store
-- Run this once in your Supabase project (SQL Editor).
-- A single row (id = 1) holds a JSON blob of dashboard overrides
-- that get deep-merged over the hardcoded defaults in lib/data.ts.
-- ─────────────────────────────────────────────────────────────

create table if not exists public.site_content (
  id integer primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by text
);

-- Seed the single row.
insert into public.site_content (id, data)
values (1, '{}'::jsonb)
on conflict (id) do nothing;

-- The app reads/writes with the service-role key from the server only,
-- so we keep RLS on with no public policies (service role bypasses RLS).
alter table public.site_content enable row level security;
