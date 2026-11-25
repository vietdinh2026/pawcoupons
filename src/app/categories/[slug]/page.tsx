import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CouponBoard from "@/components/CouponBoard";
import { getCouponsForPetCategory } from "@/lib/data";
import { GUIDES } from "@/lib/guides";
import {
  PET_CATEGORY_DETAILS,
  getPetCategoryDetail,
} from "@/lib/types";

export const dynamic = "force-dynamic";
// Never cache Supabase reads: without this, Next.js caches the fetch
// result from the first request and later SQL edits would not show up
// until a redeploy.
export const revalidate = 0;

function normalizeBaseUrl(rawUrl?: string): string {
  const fallback = "https://pawcoupons.com";
  return (rawUrl || fallback).trim().replace(/\/+$/, "");
}

/** One guide that fits this category, shown as a "save more" box. */
function guideSlugForCategory(slug: string): string | null {
  if (slug === "food-treats") return "how-to-save-at-chewy";
  if (slug === "pharmacy") return "how-to-save-on-pet-pharmacy";
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const cat = getPetCategoryDetail(params.slug);
  if (!cat) {
    return {
      title: "Category Not Found",
      robots: { index: false, follow: false },
    };
  }

  const { coupons } = await getCouponsForPetCategory(cat.value);
  const best = coupons.reduce(
    (max, c) => Math.max(max, c.discount_value ?? 0),
    0
  );
  const discountLabel = best > 0 ? `Up to ${best}% Off` : "Latest Deals";
  const title = `${cat.label} Coupons — ${discountLabel}`;
  const description = `${cat.description} Save with ${
    coupons.length > 0
      ? `${coupons.length} active coupon${coupons.length === 1 ? "" : "s"}`
      : "verified promo codes"
  } on PawCoupons.`;
  const canonicalPath = `/categories/${cat.value}`;

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

export default async function CategoryDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const cat = getPetCategoryDetail(params.slug);
  if (!cat) notFound();

  const { coupons, votes } = await getCouponsForPetCategory(cat.value);
  const guideSlug = guideSlugForCategory(cat.value);
  const guide = guideSlug
    ? GUIDES.find((g) => g.slug === guideSlug)
    : undefined;

  const base = normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Categories",
        item: `${base}/categories`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cat.label,
        item: `${base}/categories/${cat.value}`,
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Link
        href="/categories"
        className="text-sm font-semibold text-brand-700 hover:underline"
      >
        ← All categories
      </Link>

      {/* Category header */}
      <section className="mt-3 rounded-3xl border bg-white p-6 sm:p-8">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          {cat.label} Coupons
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600">{cat.description}</p>
        <p className="mt-3 rounded-2xl bg-brand-50 p-4 text-sm leading-relaxed text-slate-700">
          <strong className="font-semibold text-slate-900">How to save here: </strong>
          {cat.tip}
        </p>
        <p className="mt-3 text-sm text-slate-400">
          {coupons.length} active coupon{coupons.length === 1 ? "" : "s"}
        </p>
      </section>

      <div className="mt-8">
        <CouponBoard
          coupons={coupons}
          votes={votes}
          initialPetCategory={cat.value}
          lockPetCategory
        />
      </div>

      {guide && (
        <section className="mt-8 rounded-2xl border border-brand-200 bg-brand-50 p-5">
          <h2 className="font-bold text-slate-900">
            Want to save more on {cat.label.toLowerCase()}?
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            Read our step-by-step guide before you check out.
          </p>
          <Link
            href={`/guides/${guide.slug}`}
            className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:underline"
          >
            {guide.title} →
          </Link>
        </section>
      )}

      <section className="mt-8">
        <h2 className="text-xl font-extrabold">Other categories</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PET_CATEGORY_DETAILS.filter((c) => c.value !== cat.value).map(
            (c) => (
              <Link
                key={c.value}
                href={`/categories/${c.value}`}
                className="rounded-2xl border bg-white p-4 hover:border-brand-300"
              >
                <span className="font-bold text-slate-900">{c.label}</span>
                <span className="mt-1 block text-sm text-slate-500">
                  {c.description}
                </span>
              </Link>
            )
          )}
        </div>
      </section>
    </div>
  );
}
