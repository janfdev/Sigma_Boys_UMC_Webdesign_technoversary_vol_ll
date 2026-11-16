import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CIRCULIFE_ARTICLES } from "@/lib/constants";
import type { ArticleItem } from "@/types";

const CATEGORY_LABEL: Record<string, string> = {
  TEKNOLOGI: "Teknologi Tepat Guna",
  ORGANIK: "Pengolahan Organik",
  UPCYCLING: "Upcycling Kreatif",
  PANDUAN: "Panduan Warga",
};

const CATEGORY_TOPICS: Record<string, string[]> = {
  TEKNOLOGI: ["Material Sirkular", "Paving K-250", "Riset Terapan"],
  ORGANIK: ["Biokonversi", "Maggot BSF", "Kompos Kasgot"],
  UPCYCLING: ["Logam Bekas", "Tungku Biomassa", "Keamanan Limbah"],
  PANDUAN: ["Pemilahan Hulu", "Prinsip 5R", "Rumah Tangga"],
};

const categoryLabel = (category: string) =>
  CATEGORY_LABEL[category] ?? category.replace(/_/g, " ").toLowerCase();

const categoryTopics = (category: string) => CATEGORY_TOPICS[category] ?? [];

const bodyPreview = (article: ArticleItem) => {
  const firstParagraph = Array.isArray(article.content) ? article.content[0] : article.content;
  return [article.summary, firstParagraph].filter(Boolean).join(" ");
};

export default function LatestInsightSection({
  articles = CIRCULIFE_ARTICLES,
}: {
  articles?: ArticleItem[];
}) {
  const featured = articles.find((article) => article.category === "TEKNOLOGI") ?? articles[0];
  if (!featured) return null;

  const [lead, ...stacked] = articles.filter((article) => article.id !== featured.id);
  const featuredTopics = categoryTopics(featured.category);

  return (
    <section
      id="informasi-terkini"
      aria-labelledby="informasi-terkini-heading"
      className="dark bg-background text-foreground py-16 sm:py-24 border-b border-border"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-20">
        {/* Feature split: dokumentasi + berita utama */}
        <article className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          <figure className="lg:col-span-7 relative overflow-hidden rounded-2xl bg-muted aspect-[4/3] lg:aspect-[16/11]">
            {featured.imageUrl && (
              <img
                src={featured.imageUrl}
                alt={`Dokumentasi ${categoryLabel(featured.category)}: ${featured.title}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            )}
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 pt-12 text-[11px] font-mono uppercase tracking-wider text-white/90">
              {categoryLabel(featured.category)} / {featured.author}
            </figcaption>
          </figure>

          <div className="lg:col-span-5 space-y-5">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono font-bold uppercase tracking-wider text-primary">
              {[categoryLabel(featured.category), featured.readTime, featured.date].map((part) => (
                <span key={part} className="whitespace-nowrap">
                  {part} <span className="text-muted-foreground/60">{part === featured.date ? "" : "|"}</span>
                </span>
              ))}
            </p>

            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight leading-[1.12]">
              {featured.title}
            </h2>

            <p className="text-sm leading-relaxed text-muted-foreground">{featured.summary}</p>

            {featuredTopics.length > 0 && (
              <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                {featuredTopics.map((topic, index) => (
                  <li key={topic} className="whitespace-nowrap">
                    {topic}
                    {index < featuredTopics.length - 1 && (
                      <span className="ml-3 text-muted-foreground/50" aria-hidden="true">
                        |
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                {featured.author}
              </span>
              <Link
                href="/edukasi"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Baca Selengkapnya
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </article>

        {/* Header daftar berita */}
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-8 lg:items-end">
          <div className="lg:col-span-7 space-y-3">
            <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-primary">
              Berita Terbaru
            </span>
            <h2
              id="informasi-terkini-heading"
              className="text-3xl sm:text-4xl font-black tracking-tight leading-[1.15]"
            >
              Informasi Terkini untuk Lingkungan
            </h2>
          </div>
          <p className="lg:col-span-5 text-sm leading-relaxed text-muted-foreground">
            Ikuti perkembangan terbaru seputar regulasi, inovasi pengolahan, dan dinamika lingkungan
            hidup dari sentra sirkular CircuLife.
          </p>
        </div>

        {/* Grid berita: 1 kartu utama + 2 kartu susun */}
        <div className="grid lg:grid-cols-12 gap-4 sm:gap-6">
          {lead && (
            <article className="lg:col-span-8 flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card transition-colors hover:border-primary/40">
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  {lead.imageUrl && (
                    <img
                      src={lead.imageUrl}
                      alt={`Ilustrasi ${categoryLabel(lead.category)}: ${lead.title}`}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  )}
                  <ul className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-3">
                    {categoryTopics(lead.category)
                      .slice(0, 2)
                      .map((topic) => (
                        <li
                          key={topic}
                          className="rounded-full bg-black/70 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-white backdrop-blur-sm"
                        >
                          {topic}
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="space-y-3 p-5 sm:p-6">
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                    <span className="whitespace-nowrap">
                      Oleh <span className="text-primary">{lead.author}</span>{" "}
                      <span className="text-muted-foreground/60" aria-hidden="true">
                        |
                      </span>
                    </span>
                    <span className="whitespace-nowrap">{lead.date}</span>
                  </p>
                  <h3 className="text-xl sm:text-2xl font-black leading-snug text-foreground">
                    {lead.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:6] overflow-hidden">
                    {bodyPreview(lead)}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 p-5 sm:p-6">
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                  {categoryLabel(lead.category)}
                </span>
                <Link
                  href="/edukasi"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                >
                  Pelajari Riset
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          )}

          <div className="lg:col-span-4 grid gap-4 sm:gap-6">
            {stacked.slice(0, 2).map((article) => (
              <article
                key={article.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card transition-colors hover:border-primary/40"
              >
                {article.imageUrl && (
                  <div className="aspect-[16/10] lg:aspect-[21/9] w-full overflow-hidden bg-muted">
                    <img
                      src={article.imageUrl}
                      alt={`Ilustrasi ${categoryLabel(article.category)}: ${article.title}`}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="flex-1 space-y-2.5 p-5">
                  <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary">
                    {categoryLabel(article.category)}
                  </p>
                  <h3 className="text-base font-black leading-snug text-foreground">
                    {article.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">
                    {article.summary}
                  </p>
                </div>
                <div className="border-t border-border/70 px-5 py-4">
                  <Link
                    href="/edukasi"
                    className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                  >
                    Baca Panduan
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}