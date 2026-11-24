import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CouponBoard from "@/components/CouponBoard";
import StoreFaq from "@/components/StoreFaq";
import StoreLogo from "@/components/StoreLogo";
import { getActiveCoupons, getCouponsForStore, getStoreBySlug } from "@/lib/data";
import { buildStoreFaq, faqJsonLd } from "@/lib/faq";
import { getGuideForStore } from "@/lib/guides";

export const dynamic = "force-dynamic";
// Never cache Supabase reads: without this, Next.js caches the fetch
// result from the first request and later SQL edits (new codes, new
// descriptions) would not show up until a redeploy.
export const revalidate = 0;

function normalizeBaseUrl(rawUrl?: string): string {
  const fallback = "https://pawcoupons.com";
  return (rawUrl || fallback).trim().replace(/\/+$/, "");
}

function getBestDiscountLabel(
  coupons: Array<{ discount_value?: number | null }>
): string {
  const best = coupons.reduce(
    (max, c) => Math.max(max, c.discount_value ?? 0),
    0
  );
  return best > 0 ? `Up to ${best}% Off` : "Latest Deals";
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const store = await getStoreBySlug(params.slug);
  if (!store) {
    return {
      title: "Store Not Found",
      robots: { index: false, follow: false },
    };
  }

  const { coupons } = await getCouponsForStore(store.id);
  const discountLabel = getBestDiscountLabel(coupons);
  const title = `${store.name} Promo Codes — ${discountLabel}`;
  const fallbackDescription = `Save at ${store.name} with ${
    coupons.length > 0 ? `${coupons.length} active coupon${coupons.length === 1 ? "" : "s"}` : "verified promo codes"
  } and deals on PawCoupons.`;
  const description = store.description?.trim()
    ? `${store.description.trim()} (${discountLabel})`
    : fallbackDescription;
  const canonicalPath = `/stores/${store.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${title} | PawCoupons`,
      description,
      url: canonicalPath,
      type: "website",
    },
  };
}

export default async function StoreDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const store = await getStoreBySlug(params.slug);
  if (!store) notFound();

  const { coupons, votes } = await getCouponsForStore(store.id);
  const faqs = buildStoreFaq(store, coupons);
  const guide = getGuideForStore(store.slug);

  // Related stores: other stores sharing at least one coupon category.
  const myCategories = new Set(coupons.map((c) => c.category));
  const { coupons: allCoupons } = await getActiveCoupons();
  const relatedMap = new Map<string, { name: string; slug: string; best: number }>();
  for (const c of allCoupons) {
    if (!c.store || c.store.slug === store.slug) continue;
    if (!myCategories.has(c.category)) continue;
    const prev = relatedMap.get(c.store.slug);
    const best = Math.max(prev?.best ?? 0, c.discount_value ?? 0);
    relatedMap.set(c.store.slug, {
      name: c.store.name,
      slug: c.store.slug,
      best,
    });
  }
  const related = Array.from(relatedMap.values())
    .sort((a, b) => b.best - a.best)
    .slice(0, 4);

  const base = normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
      { "@type": "ListItem", position: 2, name: "Stores", item: `${base}/stores` },
      {
        "@type": "ListItem",
        position: 3,
        name: store.name,
        item: `${base}/stores/${store.slug}`,
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Link
        href="/stores"
        className="text-sm font-semibold text-brand-700 hover:underline"
      >
        ← All stores
      </Link>

      {/* Store header: big logo + name + SEO description */}
      <section className="mt-3 rounded-3xl border bg-white p-6 sm:p-8">
        <div className="flex items-start gap-5">
          <StoreLogo
            name={store.name}
            websiteUrl={store.website_url}
            size={96}
          />
          <div>
            <h1 className="text-3xl font-extrabold sm:text-4xl">
              {store.name}
            </h1>
            {store.description && (
              <p className="mt-2 max-w-2xl text-slate-600">
                {store.description}
              </p>
            )}
            <p className="mt-3 text-sm text-slate-400">
              {store.website_url?.replace(/^https?:\/\//, "")}
              {store.website_url ? " · " : ""}
              {coupons.length} active coupon
              {coupons.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>
      </section>

      <div className="mt-8">
        <CouponBoard
          coupons={coupons}
          votes={votes}
          initialStore={store.name}
        />
      </div>

      <StoreFaq
        title={`Frequently asked questions about ${store.name}`}
        items={faqs}
      />

      {guide && (
        <section className="mt-8 rounded-2xl border border-brand-200 bg-brand-50 p-5">
          <h2 className="font-bold text-slate-900">
            Want to save more at {store.name}?
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            Read our step-by-step guide — membership perks, verified
            discounts and the best times to shop.
          </p>
          <Link
            href={`/guides/${guide.slug}`}
            className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:underline"
          >
            {guide.title} →
          </Link>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-extrabold">Related stores</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/stores/${r.slug}`}
                className="rounded-2xl border bg-white p-4 hover:border-brand-300"
              >
                <span className="font-bold text-slate-900">{r.name}</span>
                {r.best > 0 && (
                  <span className="mt-1 block text-sm text-slate-500">
                    Up to {r.best}% off
                  </span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
