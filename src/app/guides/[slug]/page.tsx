import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import StoreFaq from "@/components/StoreFaq";
import { faqJsonLd } from "@/lib/faq";
import { getGuide, GUIDES, type Guide } from "@/lib/guides";
import { getPetCategoryDetail } from "@/lib/types";

/** Markdown rendering for guide bodies, styled to match the site. */
const markdownComponents: Components = {
  h2: ({ node, ...props }) => (
    <h2 className="mt-10 text-2xl font-extrabold first:mt-0" {...props} />
  ),
  p: ({ node, ...props }) => (
    <p className="mt-4 leading-relaxed text-slate-700" {...props} />
  ),
  ul: ({ node, ...props }) => (
    <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed text-slate-700" {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol className="mt-3 list-decimal space-y-2 pl-6 leading-relaxed text-slate-700" {...props} />
  ),
  a: ({ node, href, ...props }) =>
    href?.startsWith("/") ? (
      <Link href={href} className="font-semibold text-brand-700 underline" {...props} />
    ) : (
      <a href={href} className="font-semibold text-brand-700 underline" {...props} />
    ),
  table: ({ node, ...props }) => (
    <div className="mt-4 overflow-x-auto rounded-xl border">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: ({ node, ...props }) => (
    <th className="border-b bg-slate-50 px-3 py-2 text-left font-bold text-slate-900" {...props} />
  ),
  td: ({ node, ...props }) => (
    <td className="border-b px-3 py-2 align-top leading-relaxed text-slate-700" {...props} />
  ),
  img: ({ node, ...props }) => (
    // Plain <img> (not next/image): inline guide images have unknown
    // dimensions, and the path is already a local /guides/... file.
    // eslint-disable-next-line @next/next/no-img-element
    <img className="mt-6 w-full rounded-3xl border object-cover" {...props} />
  ),
};

function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {children}
    </ReactMarkdown>
  );
}

/**
 * Guide pages are pure content (SEO): no live coupons on the page.
 * With no per-request data, the pages can be prerendered at build
 * time from the Markdown files instead of rendering on every visit.
 */
export async function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

function normalizeBaseUrl(rawUrl?: string): string {
  const fallback = "https://pawcoupons.com";
  return (rawUrl || fallback).trim().replace(/\/+$/, "");
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const guide = getGuide(params.slug);
  if (!guide) {
    return {
      title: "Guide Not Found",
      robots: { index: false, follow: false },
    };
  }

  const canonicalPath = `/guides/${guide.slug}`;

  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${guide.title} | PawCoupons`,
      description: guide.description,
      url: canonicalPath,
      type: "article",
      modifiedTime: guide.updatedAt,
      publishedTime: guide.updatedAt,
      ...(guide.image ? { images: [guide.image] } : {}),
    },
  };
}

function breadcrumbJsonLd(guideTitle: string, slug: string, base: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${base}/guides` },
      {
        "@type": "ListItem",
        position: 3,
        name: guideTitle,
        item: `${base}/guides/${slug}`,
      },
    ],
  };
}

export default async function GuidePage({
  params,
}: {
  params: { slug: string };
}) {
  const foundGuide = getGuide(params.slug);
  if (!foundGuide) notFound();
  const guide: Guide = foundGuide;

  const relatedGuides = (guide.relatedGuides ?? [])
    .map((slug) => GUIDES.find((g) => g.slug === slug))
    .filter((g): g is Guide => Boolean(g));
  const relatedCategories = (guide.relatedCategories ?? [])
    .map((slug) => getPetCategoryDetail(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const base = normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL);
  const articleUrl = `${base}/guides/${guide.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.updatedAt,
    dateModified: guide.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    author: { "@type": "Organization", name: "PawCoupons", url: base },
    publisher: { "@type": "Organization", name: "PawCoupons", url: base },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(guide.title, guide.slug, base)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(guide.faqs)) }}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        {" / "}
        <Link href="/guides" className="hover:underline">
          Guides
        </Link>
        {" / "}
        <span className="text-slate-900">{guide.title}</span>
      </nav>

      <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl">
        {guide.title}
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Last updated:{" "}
        <time dateTime={guide.updatedAt}>
          {new Date(`${guide.updatedAt}T00:00:00`).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </time>{" "}
        · PawCoupons
      </p>

      <div className="mt-6 max-w-3xl">
        <Markdown>{guide.intro}</Markdown>
      </div>

      {guide.body && (
        <div className="mt-10 max-w-3xl">
          <Markdown>{guide.body}</Markdown>
        </div>
      )}

      <div className="max-w-3xl">
        <StoreFaq
          title="Frequently asked questions"
          items={guide.faqs}
        />
      </div>

      {(relatedGuides.length > 0 || relatedCategories.length > 0) && (
        <section className="mt-10 max-w-3xl">
          <h2 className="text-2xl font-extrabold">Related guides & categories</h2>
          {relatedGuides.length > 0 && (
            <ul className="mt-4 space-y-3">
              {relatedGuides.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/guides/${g.slug}`}
                    className="font-semibold text-brand-700 underline hover:text-brand-600"
                  >
                    {g.title}
                  </Link>
                  <p className="mt-1 text-sm text-slate-600">{g.description}</p>
                </li>
              ))}
            </ul>
          )}
          {relatedCategories.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {relatedCategories.map((c) => (
                <Link
                  key={c.value}
                  href={`/categories/${c.value}`}
                  className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-700 hover:border-brand-300"
                >
                  {c.label} coupons →
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      <p className="mt-10 max-w-3xl border-t pt-4 text-sm text-slate-500">
        More guides:{" "}
        <Link href="/guides" className="font-semibold text-brand-700 underline">
          all savings guides
        </Link>{" "}
        ·{" "}
        <Link href="/stores" className="font-semibold text-brand-700 underline">
          all stores
        </Link>
      </p>
    </div>
  );
}
