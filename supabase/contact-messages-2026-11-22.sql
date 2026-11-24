-- PawCoupons — contact form table (2026-11-22, corrected)
-- Run this file in the Supabase SQL Editor (project `pawcoupons`) so the
-- new /contact page can save messages. No redeploy needed for this
-- table itself — but the /contact page is a code change, so upload the
-- new code zip to GitHub and let Vercel deploy it first (or run this
-- SQL first; either order works, the form just needs both).
--
-- CORRECTED 2026-11-22: the first version of this file only granted
-- SELECT to anon/authenticated, so the form failed with 42501
-- "permission denied for table contact_messages". The server writes
-- with the service_role key, which bypasses RLS but NOT table
-- privileges — since 2026-10-30 Supabase no longer auto-grants
-- privileges on new tables, so service_role needs an explicit GRANT.
-- The public read policy from the first version is also removed:
-- contact messages contain visitors' names and emails and must not
-- be publicly readable. If you already ran the first version, run
-- supabase/fix-service-role-grants-2026-11-22.sql instead.

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  topic text not null default 'Other',
  message text not null,
  status text not null default 'open'
    check (status in ('open', 'resolved')),
  created_at timestamptz not null default now()
);

create index if not exists idx_contact_messages_status on contact_messages(status);

alter table contact_messages enable row level security;

-- No public read policy: only the owner (service_role) reads messages.
grant select, insert, update, delete on public.contact_messages to service_role;
