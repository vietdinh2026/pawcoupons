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

/** A date is only usable in the sitemap when it parses to a real time. */
function validDate(raw: string | Date | null | undefined, fallback: Date): Date {
  if (!raw) return fallback;
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

/**
 * Newest valid guide date, or the fallback when there are no guides
 * (e.g. the content/ folder has not been uploaded yet). Without this
 * guard, Math.max() over an empty list is -Infinity and
 * new Date(-Infinity) is an Invalid Date — which crashes the whole
 * build while prerendering /sitemap.xml ("RangeError: Invalid time value").
 */
function newestGuideDate(
  guides: { updatedAt: string }[],
  fallback: Date
): Date {
  const times = guides
    .map((g) => new Date(g.updatedAt).getTime())
    .filter((t) => !Number.isNaN(t));
  return times.length ? new Date(Math.max(...times)) : fallback;
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
      lastModified: newestGuideDate(GUIDES, fallbackDate),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...GUIDES.map((guide) => ({
      url: `${base}/guides/${guide.slug}`,
      lastModified: validDate(guide.updatedAt, fallbackDate),
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
