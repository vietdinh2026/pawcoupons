import type { MetadataRoute } from "next";

function normalizeBaseUrl(rawUrl?: string): string {
  const fallback = "https://pawcoupons.com";
  const value = (rawUrl || fallback).trim();
  return value.replace(/\/+$/, "");
}

export default function robots(): MetadataRoute.Robots {
  const base = normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/login/", "/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
