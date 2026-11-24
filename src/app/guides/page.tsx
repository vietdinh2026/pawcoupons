import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Savings Guides",
  description:
    "Step-by-step guides to saving at top US pet stores: Chewy, Petco, pet pharmacy, Black Friday 2026 and more. Real promo codes, membership perks and sale timing.",
  alternates: {
    canonical: "/guides",
  },
  openGraph: {
    title: "Savings Guides | PawCoupons",
    description:
      "Step-by-step guides to saving at top US pet stores: Chewy, Petco, pet pharmacy, Black Friday 2026 and more. Real promo codes, membership perks and sale timing.",
    url: "/guides",
    type: "website",
  },
};

function normalizeBaseUrl(rawUrl?: string): string {
  const fallback = "https://pawcoupons.com";
  return (rawUrl || fallback).trim().replace(/\/+$/, "");
}

export default function GuidesPage() {
  const baseUrl = normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL);

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
        name: "Savings Guides",
        item: `${baseUrl}/guides`,
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <h1 className="text-3xl font-extrabold">Savings Guides</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Step-by-step guides to saving at the stores PawCoupons covers — how
        promo codes work, which membership perks are actually worth it, and
        when to shop for the deepest discounts. Every guide links to the
        live codes, so you never follow a stale deal.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GUIDES.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="rounded-2xl border bg-white p-5 hover:border-brand-300"
          >
            <h2 className="font-bold leading-snug text-slate-900">
              {g.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {g.description}
            </p>
            <span className="mt-3 inline-block text-sm font-semibold text-brand-700">
              Read the guide →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
