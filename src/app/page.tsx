import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import CouponBoard from "@/components/CouponBoard";
import { getActiveCoupons, getAllStores } from "@/lib/data";
import { getSortedGuides } from "@/lib/guides";

export const dynamic = "force-dynamic";
// Never cache Supabase reads: without this, Next.js caches the fetch
// result from the first request and later SQL edits (new codes, new
// descriptions) would not show up until a redeploy.
export const revalidate = 0;

export const metadata: Metadata = {
  title: "PawCoupons — Verified Pet Coupons & Promo Codes",
  description:
    "Find working coupon codes and deals for pet stores. Save on pet food, treats, pharmacy, toys, litter and subscription boxes.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PawCoupons — Verified Pet Coupons & Promo Codes",
    description:
      "Find working coupon codes and deals for pet stores. Save on pet food, treats, pharmacy, toys, litter and subscription boxes.",
    url: "/",
    type: "website",
  },
};

function normalizeBaseUrl(rawUrl?: string): string {
  const fallback = "https://pawcoupons.com";
  return (rawUrl || fallback).trim().replace(/\/+$/, "");
}

function formatCurrentCheckedDate(): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  }).format(new Date());
}

export default async function Home({
  searchParams,
}: {
  searchParams?: { store?: string };
}) {
  const { coupons, votes } = await getActiveCoupons();

  // Legacy store links (?store=Chewy) redirect to the canonical
  // SEO-friendly store page (/stores/chewy). The store page is the only
  // copy of the store header — the homepage must NOT render a second
  // copy of the same content.
  const storeParam = searchParams?.store?.trim().toLowerCase();
  let allStores = null;
  if (storeParam) {
    const byName =
      coupons.find(
        (c) => c.store?.name?.toLowerCase() === storeParam
      )?.store ?? null;
    if (byName) redirect(`/stores/${byName.slug}`);

    // The store may have no active coupons, so look it up directly
    // by name or slug as a fallback.
    allStores = await getAllStores();
    const byStore =
      allStores.find(
        (s) =>
          s.name.toLowerCase() === storeParam ||
          s.slug.toLowerCase() === storeParam
      ) ?? null;
    if (byStore) redirect(`/stores/${byStore.slug}`);
    // Unknown store: fall through to the generic hero below.
  }

  if (!allStores) {
    allStores = await getAllStores();
  }

  const couponCountBySlug = new Map<string, number>();
  for (const c of coupons) {
    const slug = c.store?.slug;
    if (slug) {
      couponCountBySlug.set(slug, (couponCountBySlug.get(slug) ?? 0) + 1);
    }
  }

  const popularStores = [...allStores]
    .filter((s) => (couponCountBySlug.get(s.slug) ?? 0) > 0)
    .sort(
      (a, b) =>
        (couponCountBySlug.get(b.slug) ?? 0) -
        (couponCountBySlug.get(a.slug) ?? 0)
    )
    .slice(0, 8);

  const baseUrl = normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL);
  const checkedDate = formatCurrentCheckedDate();
  const latestGuides = getSortedGuides().slice(0, 3);

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PawCoupons",
    url: baseUrl,
    description:
      "Verified pet coupons and promo codes from top US pet stores, checked daily.",
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PawCoupons",
    url: baseUrl,
  };

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      {/* Hero */}
      <section className="rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-slate-900 px-6 py-10 text-white shadow-md sm:px-10 sm:py-12">
        <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white">
          Updated daily · US Pet Stores
        </span>
        <h1 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
          Pet coupons &amp; promo codes that actually work
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-100">
          Hand-checked deals from top US pet stores — Chewy, Petco, PetSmart
          and more. Click a coupon, copy the code, and save at checkout — our
          links go straight to the store.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#coupons"
            className="rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-brand-700 shadow-sm transition hover:bg-brand-50"
          >
            Browse coupons
          </a>
          <Link
            href="/submit"
            className="rounded-xl border border-white/50 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            Submit a coupon
          </Link>
        </div>
      </section>

      {/* Real offers banner */}
      <div className="flex items-start gap-3 rounded-2xl border border-brand-200/80 bg-brand-50/70 px-4 py-3 text-sm leading-relaxed text-slate-800 sm:px-5 sm:py-3.5">
  <span
    aria-hidden="true"
    className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500"
  />
  <p>
    <strong className="font-semibold text-slate-900">
      Real offers, checked {checkedDate}:
    </strong>{" "}
    every coupon below is a current public offer from the store — no sample
    codes. Offers expire fast and some only work for new customers or members,
    so if one doesn&apos;t work, please report it with the &ldquo;Report broken
    code&rdquo; link on the coupon.
  </p>
</div>

      {/* Popular stores */}
      {popularStores.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-base font-extrabold tracking-tight text-slate-900">
              Popular pet stores
            </h2>
            <Link
              href="/stores"
              className="text-sm font-bold text-brand-700 transition hover:text-brand-800 hover:underline"
            >
              All stores →
            </Link>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {popularStores.map((store) => {
              const count = couponCountBySlug.get(store.slug) ?? 0;
              return (
                <Link
                  key={store.slug}
                  href={`/stores/${store.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-sm font-semibold text-slate-800 transition hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
                >
                  <span>{store.name}</span>
                  <span className="rounded-md bg-white px-1.5 py-0.5 text-xs font-bold text-slate-500 ring-1 ring-slate-200">
                    {count}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Coupons */}
      <div id="coupons" className="scroll-mt-6">
        <CouponBoard coupons={coupons} votes={votes} />
      </div>

      {/* Savings guides */}
      <section className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm sm:p-8">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Savings guides
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Practical tips for saving on pet food, pharmacy, toys and more.
            </p>
          </div>
          <Link
            href="/guides"
            className="shrink-0 text-sm font-bold text-brand-700 transition hover:text-brand-800 hover:underline"
          >
            All guides →
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {latestGuides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-md"
            >
              <div>
                <h3 className="font-bold leading-snug text-slate-900 group-hover:text-brand-700">
                  {g.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-700">
                  {g.description}
                </p>
              </div>
              <span className="mt-4 inline-block text-xs font-bold text-brand-700">
                Read guide →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          {
            step: "01",
            title: "1. Find a deal",
            text: "Search or filter by store and pet category to find a coupon for what your pet needs.",
          },
          {
            step: "02",
            title: "2. Copy the code",
            text: "Tap “Show Code” to reveal and copy the promo code — or go straight to the store.",
          },
          {
            step: "03",
            title: "3. Save at checkout",
            text: "Paste the code at checkout and save — no account or sign-up needed.",
          },
        ].map((s) => (
          <div
            key={s.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <span className="text-xs font-extrabold tracking-wider text-brand-600">
              STEP {s.step}
            </span>
            <h3 className="mt-1 font-bold text-slate-900">{s.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
              {s.text}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
