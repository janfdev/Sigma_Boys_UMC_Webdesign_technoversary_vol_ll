import { CIRCULIFE_ARTICLES } from "@/lib/constants";
import { ARTICLES, type RelatedInsight } from "@/data/articleData";

export type InsightEntry = {
  slug: string;
  href: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  imageAlt: string;
  date?: string;
  /** "summary" entries have no page of their own; they expand inline in the archive. */
  kind: "article" | "summary";
};

export const insightHref = (slug: string) => `/insight/${slug}`;

const articleEntries: InsightEntry[] = ARTICLES.map((article) => ({
  slug: article.slug,
  href: insightHref(article.slug),
  title: article.title,
  excerpt: article.lead,
  category: article.badge,
  readTime: article.readTime,
  image: article.image.src,
  imageAlt: article.image.alt,
  date: article.date,
  kind: "article",
}));

const summaryEntries: InsightEntry[] = CIRCULIFE_ARTICLES.map((item) => ({
  slug: item.slug ?? item.id,
  href: insightHref(item.slug ?? item.id),
  title: item.title,
  excerpt: item.summary,
  category: item.category,
  readTime: item.readTime,
  image: item.imageUrl ?? "",
  imageAlt: item.title,
  date: item.date,
  kind: "summary",
}));

export const INSIGHTS: InsightEntry[] = [...articleEntries, ...summaryEntries];
export const ARTICLE_INSIGHTS = articleEntries;
export const SUMMARY_INSIGHTS = summaryEntries;

/** Editorial highlight on the homepage. */
export const FEATURED_SLUG = "gunung-ciremai";

/** Same-topic first, then the rest; never the article you are reading. */
export function relatedTo(slug: string, limit = 3): RelatedInsight[] {
  const current = ARTICLE_INSIGHTS.find((entry) => entry.slug === slug);
  const pool = ARTICLE_INSIGHTS.filter((entry) => entry.slug !== slug);
  const sorted = current
    ? [...pool].sort(
        (a, b) => Number(b.category === current.category) - Number(a.category === current.category)
      )
    : pool;

  return sorted.slice(0, limit).map((entry) => ({
    href: entry.href,
    title: entry.title,
    excerpt: entry.excerpt,
    category: entry.category,
    readTime: entry.readTime,
    image: entry.image,
    imageAlt: entry.imageAlt,
  }));
}