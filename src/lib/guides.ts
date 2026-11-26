import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { FaqItem } from "./faq";

/**
 * Guides now live as Markdown files in `content/guides/<slug>.md`,
 * separate from the UI code. Each file has YAML frontmatter for the
 * metadata (title, description, updatedAt, store/category, image,
 * related links, FAQs) and a Markdown body for the article itself:
 * intro paragraphs, `##` sections, lists, tables and links.
 *
 * `src/lib/guides.ts` is only the loader: it reads the files, parses
 * the frontmatter and splits the body into an intro (everything before
 * the first `##` heading, shown above the live codes) and the rest
 * (shown below the live codes). Nothing about a guide's wording lives
 * in TypeScript any more — to write or edit a guide, edit its .md file.
 */
export interface Guide {
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  /** Store this guide is about (its live coupons are shown on the page). */
  storeSlug?: string;
  /** Pet category whose live coupons are shown under this guide. */
  petCategory?: string;
  /** Illustration image path, e.g. "/guides/dog-and-cat-food-by-age.webp". */
  image?: string;
  /** Slugs of other guides this one genuinely relates to (by content, not by default). */
  relatedGuides?: string[];
  /** Pet category slugs this guide genuinely covers. */
  relatedCategories?: string[];
  faqs: FaqItem[];
  /** Full Markdown body (intro + sections). */
  content: string;
  /** Markdown before the first `##` heading — shown above the live codes. */
  intro: string;
  /** Markdown after the intro — shown below the live codes. */
  body: string;
}

const GUIDES_DIR = path.join(process.cwd(), "content", "guides");

function splitContent(content: string): { intro: string; body: string } {
  const idx = content.search(/\n## /);
  if (idx === -1) return { intro: content.trim(), body: "" };
  return {
    intro: content.slice(0, idx).trim(),
    body: content.slice(idx).trim(),
  };
}

function loadGuide(slug: string): Guide {
  const filePath = path.join(GUIDES_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const title = data.title as string | undefined;
  const description = data.description as string | undefined;
  const updatedAt = data.updatedAt as string | undefined;
  if (!title || !description || !updatedAt) {
    throw new Error(
      `Guide ${slug}.md is missing required frontmatter (title, description, updatedAt).`
    );
  }

  const { intro, body } = splitContent(content);

  return {
    slug,
    title,
    description,
    updatedAt,
    storeSlug: (data.storeSlug as string | undefined) ?? undefined,
    petCategory: (data.petCategory as string | undefined) ?? undefined,
    image: (data.image as string | undefined) ?? undefined,
    relatedGuides: (data.relatedGuides as string[] | undefined) ?? undefined,
    relatedCategories:
      (data.relatedCategories as string[] | undefined) ?? undefined,
    faqs: (data.faqs as FaqItem[] | undefined) ?? [],
    content: content.trim(),
    intro,
    body,
  };
}

function loadAllGuides(): Guide[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs
    .readdirSync(GUIDES_DIR)
    // Files starting with "_" (e.g. _TEMPLATE.md) are not guides.
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
    .map((file) => file.replace(/\.md$/, ""))
    .sort()
    .map((slug) => loadGuide(slug));
}

export const GUIDES: Guide[] = loadAllGuides();

export function getSortedGuides(): Guide[] {
  return [...GUIDES].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function getGuide(slug: string): Guide | undefined {
  const normalized = slug.trim().toLowerCase();
  return GUIDES.find((g) => g.slug === normalized);
}

export function getGuideForStore(storeSlug: string): Guide | undefined {
  const normalized = storeSlug.trim().toLowerCase();
  return GUIDES.find((g) => g.storeSlug === normalized);
}
