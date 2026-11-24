-- PawCoupons — fix "permission denied for table" (42501) on writes
-- Run this file in the Supabase SQL Editor (project `pawcoupons`).
-- No code change, no redeploy needed — just run this SQL, then test
-- the /contact form again.
--
-- ROOT CAUSE: Supabase stopped auto-granting privileges on new tables
-- (public schema) on 2026-10-30. A table created after that gets NO
-- grant for any role unless you add one. The service_role key used by
-- PawCoupons's server actions bypasses Row Level Security, but NOT the
-- privilege system — so every write (contact form, coupon submissions,
-- broken-code reports, votes, click logging) failed with 42501
-- "permission denied for table ...", even though the tables and RLS
-- policies existed. The fix is an explicit GRANT to service_role.
--
-- PRIVACY FIX (same file): contact_messages was wrongly given a public
-- read policy + SELECT for anon, which would let anyone read visitors'
-- names and emails through the API. That access is removed below —
-- only the site owner (service_role) can read contact messages.

-- 1. Give the server (service_role) the write access it needs.
grant select, insert, update, delete on public.contact_messages to service_role;
grant select, insert, update, delete on public.submissions to service_role;
grant select, insert, update, delete on public.reports to service_role;
grant select, insert, update, delete on public.votes to service_role;
grant select, insert, update, delete on public.clicks to service_role;
grant select, insert, update, delete on public.stores to service_role;
grant select, insert, update, delete on public.coupons to service_role;

-- 2. Contact messages are private: no public read.
drop policy if exists "public read contact_messages" on contact_messages;
revoke select on public.contact_messages from anon, authenticated;
