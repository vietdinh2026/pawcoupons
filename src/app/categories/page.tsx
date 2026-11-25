import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LatestGuidesSection from "@/components/LatestGuidesSection";
import { getActiveCoupons } from "@/lib/data";
import { PET_CATEGORY_DETAILS } from "@/lib/types";

export const dynamic = "force-dynamic";
// Never cache Supabase reads: without this, Next.js caches the fetch
// result from the first request and later SQL edits would not show up
// until a redeploy.
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Browse Pet Categories",
  description:
    "Browse pet coupons by category on PawCoupons: food and treats, pharmacy, toys and gear, litter and cleaning, and services and subscription boxes — with active codes for each.",
  alternates: {
    canonical: "/categories",
  },
  openGraph: {
    title: "Browse Pet Categories | PawCoupons",
    description:
      "Browse pet coupons by category on PawCoupons: food and treats, pharmacy, toys and gear, litter and cleaning, and services and subscription boxes — with active codes for each.",
    url: "/categories",
    type: "website",
  },
};

export default async function CategoriesPage() {
  const { coupons } = await getActiveCoupons();

  const countByCategory = new Map<string, number>();
  const bestByCategory = new Map<string, number>();
  const storesByCategory = new Map<string, Set<string>>();
  for (const c of coupons) {
    const key = c.pet_category ?? "food-treats";
    countByCategory.set(key, (countByCategory.get(key) ?? 0) + 1);
    bestByCategory.set(
      key,
      Math.max(bestByCategory.get(key) ?? 0, c.discount_value ?? 0)
    );
    if (!storesByCategory.has(key)) storesByCategory.set(key, new Set());
    if (c.store?.name) storesByCategory.get(key)!.add(c.store.name);
  }

  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://pawcoupons.com"
  )
    .trim()
    .replace(/\/+$/, "");

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${baseUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Categories",
        item: `${baseUrl}/categories`,
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <h1 className="text-3xl font-extrabold">Browse Pet Categories</h1>
      <p className="mt-2 text-slate-600">
        Every coupon on PawCoupons, grouped by what your pet actually needs —
        food, medicine, toys, litter or a monthly box.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PET_CATEGORY_DETAILS.map((cat) => {
          const count = countByCategory.get(cat.value) ?? 0;
          const best = bestByCategory.get(cat.value) ?? 0;
          const stores = Array.from(storesByCategory.get(cat.value) ?? []).slice(
            0,
            3
          );
          return (
            <Link
              key={cat.value}
              href={`/categories/${cat.value}`}
              className="overflow-hidden rounded-2xl border bg-white transition hover:shadow-md"
            >
              <Image
                src={cat.image}
                alt={cat.label}
                width={600}
                height={400}
                className="h-40 w-full object-cover"
              />
              <div className="p-5">
                <h2 className="text-lg font-bold">{cat.label}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                  {cat.description}
                </p>
                <p className="mt-3 text-sm font-semibold text-brand-700">
                  {count} active coupon{count === 1 ? "" : "s"}
                  {best > 0 ? ` · Up to ${best}% off` : ""}
                </p>
                {stores.length > 0 && (
                  <p className="mt-1 text-xs text-slate-400">
                    {stores.join(" · ")}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <LatestGuidesSection className="mt-12" />
    </div>
  );
}
