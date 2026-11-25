import type { MetadataRoute } from "next";
import { getAllStores } from "@/lib/data";
import { GUIDES } from "@/lib/guides";

// Cache sitemap theo chu kỳ (vd: 1 giờ) thay vì force-dynamic mọi request
export const revalidate = 3600;

function normalizeBaseUrl(rawUrl?: string): string {
  const fallback = "https://pawcoupons.com";
  const value = (rawUrl || fallback).trim();
  return value.replace(/\/+$/, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL);
  const stores = await getAllStores();
  const fallbackDate = new Date("2026-11-01T00:00:00.000Z");

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: fallbackDate,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${base}/stores`,
      lastModified: fallbackDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${base}/categories`,
      lastModified: fallbackDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...[
      "food-treats",
      "pharmacy",
      "toys-gear",
      "litter-cleaning",
      "services-boxes",
    ].map((slug) => ({
      url: `${base}/categories/${slug}`,
      lastModified: fallbackDate,
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
    {
      url: `${base}/guides`,
      lastModified: new Date(
        Math.max(...GUIDES.map((g) => new Date(g.updatedAt).getTime()))
      ),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...GUIDES.map((guide) => ({
      url: `${base}/guides/${guide.slug}`,
      lastModified: new Date(guide.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...["about", "contact", "privacy", "disclosure", "submit"].map((slug) => ({
      url: `${base}/${slug}`,
      lastModified: fallbackDate,
      changeFrequency: "monthly" as const,
      priority: slug === "submit" ? 0.5 : 0.4,
    })),
  ];

  const storePages: MetadataRoute.Sitemap = stores
    .filter((store) => Boolean(store.slug))
    .map((store) => {
      const storeWithDate = store as typeof store & {
        updated_at?: string | Date | null;
        created_at?: string | Date | null;
      };
      const rawDate = storeWithDate.updated_at ?? storeWithDate.created_at;
      const parsedDate = rawDate ? new Date(rawDate) : fallbackDate;
      const lastModified = Number.isNaN(parsedDate.getTime())
        ? fallbackDate
        : parsedDate;

      return {
        url: `${base}/stores/${encodeURIComponent(store.slug)}`,
        lastModified,
        changeFrequency: "daily" as const,
        priority: 0.9,
      };
    });

  return [...staticPages, ...storePages];
}
