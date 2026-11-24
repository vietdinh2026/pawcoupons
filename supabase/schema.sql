-- ============================================================
-- PawCoupons — Supabase (Postgres) schema
-- Run this file in the Supabase SQL Editor (Dashboard > SQL Editor).
-- It creates all tables, enables Row Level Security with permissive
-- read policies, and seeds a SAMPLE starter catalog of 12 US
-- stores/coupons. The seed codes are SAMPLE data only — replace them
-- with real affiliate links/codes from your networks before going live.
-- ============================================================

-- ---------- Tables ----------

create table if not exists stores (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_url text,
  website_url text,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists coupons (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references stores(id) on delete cascade,
  title text not null,
  code text,
  description text,
  discount_type text not null default 'percent'
    check (discount_type in ('percent', 'fixed', 'free_shipping', 'other')),
  discount_value numeric,
  affiliate_url text not null,
  affiliate_network text,
  category text not null default 'Other',
  pet_category text not null default 'food-treats'
    check (pet_category in ('food-treats', 'pharmacy', 'toys-gear', 'litter-cleaning', 'services-boxes')),
  tags text[] not null default '{}',
  expires_at timestamptz,
  is_verified boolean not null default false,
  status text not null default 'active'
    check (status in ('active', 'expired', 'reported')),
  created_at timestamptz not null default now()
);

create table if not exists clicks (
  id uuid primary key default gen_random_uuid(),
  coupon_id uuid not null references coupons(id) on delete cascade,
  clicked_at timestamptz not null default now(),
  referrer text
);

create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  coupon_id uuid not null references coupons(id) on delete cascade,
  reason text,
  status text not null default 'open'
    check (status in ('open', 'resolved')),
  created_at timestamptz not null default now()
);

create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  store_name text not null,
  coupon_title text not null,
  code text,
  affiliate_url text,
  email text,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

-- "Did it work?" up/down votes on coupons
create table if not exists votes (
  id uuid primary key default gen_random_uuid(),
  coupon_id uuid not null references coupons(id) on delete cascade,
  vote text not null check (vote in ('up', 'down')),
  created_at timestamptz not null default now()
);

-- Messages sent through the /contact page
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

-- ---------- Indexes ----------

create index if not exists idx_coupons_store_id on coupons(store_id);
create index if not exists idx_coupons_status on coupons(status);
create index if not exists idx_coupons_category on coupons(category);
create index if not exists idx_coupons_pet_category on coupons(pet_category);
create index if not exists idx_coupons_expires_at on coupons(expires_at);
create index if not exists idx_clicks_coupon_id on clicks(coupon_id);
create index if not exists idx_clicks_clicked_at on clicks(clicked_at);
create index if not exists idx_reports_coupon_id on reports(coupon_id);
create index if not exists idx_reports_status on reports(status);
create index if not exists idx_submissions_status on submissions(status);
create index if not exists idx_votes_coupon_id on votes(coupon_id);
create index if not exists idx_contact_messages_status on contact_messages(status);

-- ---------- Row Level Security ----------
-- Public read access for the storefront; writes go through the
-- service-role key in server actions / API routes. Tighten these
-- policies (and add admin auth) before going live.

alter table stores enable row level security;
alter table coupons enable row level security;
alter table clicks enable row level security;
alter table reports enable row level security;
alter table submissions enable row level security;
alter table votes enable row level security;
alter table contact_messages enable row level security;

drop policy if exists "public read stores" on stores;
create policy "public read stores" on stores for select using (true);

drop policy if exists "public read coupons" on coupons;
create policy "public read coupons" on coupons for select using (true);

drop policy if exists "public read clicks" on clicks;
create policy "public read clicks" on clicks for select using (true);

drop policy if exists "public read reports" on reports;
create policy "public read reports" on reports for select using (true);

drop policy if exists "public read submissions" on submissions;
create policy "public read submissions" on submissions for select using (true);

drop policy if exists "public read votes" on votes;
create policy "public read votes" on votes for select using (true);

-- contact_messages has NO public read policy on purpose: messages contain
-- visitors' names and emails. Only the owner (service_role, which
-- bypasses RLS) can read them.

-- ---------- Table privileges ----------
-- RLS policies alone are NOT enough: the anon/authenticated roles also
-- need SELECT privileges on the tables, otherwise every read fails with
-- "permission denied for table ..." (PostgREST error 42501).
grant select on public.stores to anon, authenticated;
grant select on public.coupons to anon, authenticated;
grant select on public.votes to anon, authenticated;
grant select on public.clicks to anon, authenticated;
grant select on public.reports to anon, authenticated;
grant select on public.submissions to anon, authenticated;

-- Server writes go through the service_role key, which bypasses RLS but
-- NOT table privileges. Since 2026-10-30 Supabase no longer auto-grants
-- privileges on new tables, so every table the server writes to needs an
-- explicit GRANT to service_role, or writes fail with 42501
-- "permission denied for table ...".
grant select, insert, update, delete on public.stores to service_role;
grant select, insert, update, delete on public.coupons to service_role;
grant select, insert, update, delete on public.votes to service_role;
grant select, insert, update, delete on public.clicks to service_role;
grant select, insert, update, delete on public.reports to service_role;
grant select, insert, update, delete on public.submissions to service_role;
grant select, insert, update, delete on public.contact_messages to service_role;

-- ---------- Seed data ----------
-- No seed data in this file. The pet catalog (stores + coupons) lives in
-- supabase/paw-coupons-2026-11-24.sql — run schema.sql first, then that file.
