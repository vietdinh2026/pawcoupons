# PawCoupons — Coupon-Sharing Site (Next.js + Supabase + Vercel)

PawCoupons is a coupon-sharing website for the US market, monetized with
affiliate marketing. Visitors find promo codes, copy them, and shop through
affiliate links; the owner manages stores/coupons and tracks clicks for
commission reconciliation.

> **Seed data:** the seed catalog (`supabase/paw-coupons-2026-11-24.sql`)
> contains 10 US pet stores and 31 coupons (Chewy, Petco, PetSmart,
> BarkBox, PetCareRx, 1-800-PetMeds, Pet Supplies Plus, PetFlow,
> Only Natural Pet, Hollywood Feed), checked against deal sites on
> 2026-11-24. `is_verified` is false for all of them — test each code at
> checkout before marking it verified. Run `supabase/schema.sql` first,
> then the seed file, in a new Supabase project.

---

## Tech stack

- **Next.js 14** (App Router, TypeScript) + **Tailwind CSS**
- **Supabase** (Postgres) — stores, coupons, clicks, reports, submissions, votes
- **Vercel** — hosting + daily cron job

## Features

- Public coupon board: search, category chips, store filter, sort (newest /
  expiring soonest / biggest discount)
- "Show Code" reveal-and-copy, "did it work" up/down votes, broken-code reports
- Public coupon submission form (approval queue in admin)
- Stores browse page, FTC Affiliate Disclosure page
- Owner admin (`/admin`): add/edit/delete stores & coupons, attach affiliate
  link + network, mark verified, change status, approve/reject submissions,
  resolve reports, click statistics (`/admin/stats`)
- Click tracking: every "Shop Now" tap goes through `/api/go/:id`, which
  records a row in `clicks` before redirecting to the affiliate URL
- Daily expiry job: `/api/cron/expire` marks past-expiry coupons as expired
  and hides codes reported broken 3+ times (scheduled via Vercel Cron in
  `vercel.json`, daily at 06:00 UTC)

---

## Setup (English)

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → **New project**.
2. Pick a name (e.g. `pawcoupons`), a database password, and a region close to
   your users (e.g. US East).
3. Open **SQL Editor** → **New query**, paste the whole content of
   `supabase/schema.sql`, and click **Run**. This creates all tables, RLS
   policies, and seeds the 12 sample coupons.
4. Go to **Project Settings → API** and copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (server-only!)

### 2. Run locally

```bash
cp .env.example .env.local   # fill in your Supabase values
npm install
npm run dev                  # open http://localhost:3000
```

### 3. Push to GitHub

```bash
git init
git add .
git commit -m "Initial PawCoupons code"
git branch -M main
git remote add origin https://github.com/<your-username>/pawcoupons.git
git push -u origin main
```

### 4. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New → Project** → import
   the `pawcoupons` repo.
2. Framework preset: **Next.js** (auto-detected).
3. Add the environment variables from `.env.example` (including
   `SUPABASE_SERVICE_ROLE_KEY` and a random `CRON_SECRET`).
4. Click **Deploy**.

### 5. Vercel Cron (daily expiry job)

`vercel.json` already contains the cron entry:

```json
{ "crons": [{ "path": "/api/cron/expire", "schedule": "0 6 * * *" }] }
```

- The cron runs daily at **06:00 UTC**. It is included automatically when
  the project is deployed on Vercel (Pro plan required for cron intervals
  under 24h; the daily schedule works on the free Hobby plan too — check
  Vercel's current cron limits).
- Vercel sends `Authorization: Bearer <CRON_SECRET>` automatically; the
  route rejects requests without a matching secret.

### 6. Admin login (password protection for /admin)

`/admin` is protected by a single-owner password:

- Set the `ADMIN_PASSWORD` env var (Vercel → Settings → Environment
  Variables) to a strong password, then redeploy.
- Visiting `/admin` without a session redirects to the login page at
  `/login`. After login, a httpOnly cookie keeps you logged in for 7 days
  (there is a **Log out** button at the top of the admin pages).
- How it is enforced: `middleware.ts` checks the session cookie on every
  `/admin` request (including server-action POSTs), and
  `src/app/admin/layout.tsx` double-checks it server-side before rendering.
  The cookie stores only a SHA-256 hash of the password, never the password
  itself. If `ADMIN_PASSWORD` is not set, login always fails (fail closed).
- To change the password, change the env var value and redeploy — all
  existing sessions stop working immediately.

### 7. Real coupons (replacing the sample data)

The seed in `supabase/schema.sql` is real public offers, verified
2026-11-21. To update the **live** database without re-seeding, run
`supabase/real-coupons-2026-11-21.sql` in the Supabase SQL Editor — it
takes effect immediately, no redeploy needed. The links are plain store
URLs (no affiliate links yet); update `affiliate_url` /
`affiliate_network` per coupon when each affiliate program approves you.
Codes expire fast — re-check them every 1–2 weeks and update or remove
the expired ones (the daily cron already hides past-due coupons).

---

## Cài đặt (Tiếng Việt)

### 1. Tạo project Supabase

1. Vào [supabase.com](https://supabase.com) → **New project**, đặt tên
   (ví dụ `pawcoupons`), chọn region gần người dùng Mỹ (US East).
2. Mở **SQL Editor** → **New query**, dán toàn bộ nội dung file
   `supabase/schema.sql` rồi bấm **Run**. File này tạo bảng, chính sách
   bảo mật và 12 coupon mẫu.
3. Vào **Project Settings → API** để lấy: Project URL, anon key,
   service_role key.

### 2. Chạy local

```bash
cp .env.example .env.local   # điền các giá trị Supabase
npm install
npm run dev                  # mở http://localhost:3000
```

### 3. Đẩy lên GitHub

```bash
git init
git add .
git commit -m "Initial PawCoupons code"
git branch -M main
git remote add origin https://github.com/<ten-cua-ban>/pawcoupons.git
git push -u origin main
```

### 4. Deploy lên Vercel

1. Vào [vercel.com](https://vercel.com) → **Add New → Project** → chọn repo
   `pawcoupons`.
2. Thêm các biến môi trường trong `.env.example` (gồm cả
   `SUPABASE_SERVICE_ROLE_KEY` và một `CRON_SECRET` ngẫu nhiên).
3. Bấm **Deploy**.

### 5. Cron job hàng ngày

File `vercel.json` đã có sẵn lịch chạy `/api/cron/expire` lúc 06:00 UTC
mỗi ngày — Vercel tự kích hoạt khi deploy, không cần cấu hình thêm.

### 6. ⚠️ Thêm mật khẩu admin TRƯỚC khi chạy thật

Trang `/admin` hiện **chưa có đăng nhập** — ai có link cũng sửa được
coupon. Xem mục 6 phần tiếng Anh ở trên để chọn cách bảo vệ (middleware
+ mật khẩu, hoặc Supabase Auth).

---

## Project structure

```
pawcoupons-code/
├── src/app/
│   ├── page.tsx              # Homepage — coupon board
│   ├── stores/page.tsx       # Browse stores
│   ├── submit/page.tsx       # Public coupon submission form
│   ├── disclosure/page.tsx   # FTC Affiliate Disclosure
│   ├── admin/page.tsx        # Owner admin (password-protected, see §6)
│   ├── admin/stats/page.tsx  # Click statistics
│   └── api/
│       ├── go/[id]/route.ts        # Click tracking + redirect
│       └── cron/expire/route.ts    # Daily expiry job
├── src/components/          # CouponCard, CouponBoard, ReportForm, AdminForms
├── src/lib/                  # supabase clients, server actions, data helpers
├── supabase/schema.sql       # Tables + RLS + 12 sample coupons
├── vercel.json               # Daily cron schedule
└── .env.example
```

## Scripts

| Command         | What it does              |
| --------------- | ------------------------- |
| `npm run dev`   | Start dev server          |
| `npm run build` | Production build          |
| `npm run start` | Run the production build  |
| `npm run lint`  | Lint the code             |
