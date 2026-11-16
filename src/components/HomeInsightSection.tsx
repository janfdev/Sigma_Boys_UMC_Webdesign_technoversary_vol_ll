import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { CIRCULIFE_ARTICLES } from "@/lib/constants";
import { CIREMAI_ARTICLE } from "@/data/articleData";

const FEATURED_TOPICS = ["DAS Cisanggarung", "Flora Endemik", "Patroli Masyarakat"];

const CATEGORY_LABEL: Record<string, string> = {
  PANDUAN: "Panduan Warga",
  TEKNOLOGI: "Teknologi Tepat Guna",
  ORGANIK: "Pengolahan Organik",
  UPCYCLING: "Upcycling",
};

const FEATURED = {
  href: `/konservasi/${CIREMAI_ARTICLE.slug}`,
  image: CIREMAI_ARTICLE.image.src,
  imageAlt: CIREMAI_ARTICLE.image.alt,
  title: CIREMAI_ARTICLE.title,
  summary:
    "Mengenal pentingnya pelestarian sabuk hutan lindung, perlindungan keanekaragaman hayati endemik macan tutul Jawa, dan keterlibatan komunitas tapak dalam menjaga kawasan tangkapan air bagi tiga kabupaten penyangga di Jawa Barat bagian timur.",
};

const ARCHIVE = CIRCULIFE_ARTICLES.slice(0, 4);

/** Bento spans: one tall lead card, two stacked, one full-width strip. */
const BENTO_SPAN = [
  "md:col-span-4 md:row-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-6",
];

export default function HomeInsightSection() {
  return (
    <section aria-labelledby="sorotan-lingkungan-heading" className="py-16" id="sorotan-lingkungan">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <article className="grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card lg:grid-cols-12">
          <div className="relative min-h-[340px] lg:col-span-7">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={FEATURED.imageAlt}
              className="absolute inset-0 size-full object-cover"
              height={720}
              loading="lazy"
              src={FEATURED.image}
              width={1280}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,20,14,.45),rgba(7,20,14,0)_45%,rgba(7,20,14,.75))]"
            />

            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-primary backdrop-blur-md">
                Sorotan Lingkungan
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/80 backdrop-blur-md">
                <MapPin aria-hidden="true" className="size-3" />
                Kuningan, Jawa Barat
              </span>
            </div>

            <p className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] rounded-md border border-white/10 bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-primary backdrop-blur-md">
              Elevasi: 3.078 mdpl // Atap Jawa Barat
            </p>
          </div>

          <div className="flex flex-col p-6 sm:p-8 lg:col-span-5">
            <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-primary">
              [ Konservasi Alam ] / 6 mnt baca / Kajian Lapangan 2026
            </p>
            <h2
              className="mt-4 text-2xl font-extrabold uppercase leading-tight tracking-tight text-foreground sm:text-3xl"
              id="sorotan-lingkungan-heading"
            >
              {FEATURED.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{FEATURED.summary}</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {FEATURED_TOPICS.map((topic) => (
                <li
                  className="rounded border border-border bg-background px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
                  key={topic}
                >
                  {topic}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-9 items-center justify-center rounded-md border border-primary/30 bg-primary/10 font-mono text-[11px] font-bold text-primary"
                >
                  RC
                </span>
                <span className="font-mono text-[10px] uppercase leading-tight tracking-[0.12em] text-foreground">
                  Tim Riset CircuLife
                  <span className="mt-0.5 block text-muted-foreground">Divisi Konservasi Tapak</span>
                </span>
              </div>
              <Link
                className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.1em] text-primary-foreground transition-colors hover:bg-primary/90"
                href={FEATURED.href}
              >
                Baca Selengkapnya
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
            </div>
          </div>
        </article>

        {ARCHIVE.length > 0 ? (
          <div className="mt-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
              [ Arsip Entri Terbaru ]
            </p>
            <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <h2 className="text-2xl font-extrabold uppercase tracking-tight text-foreground sm:text-3xl">
                Informasi Terkini untuk Lingkungan
              </h2>
              <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
                Ikuti perkembangan terbaru seputar regulasi limbah, pemilahan hulu, dan dinamika
                keanekaragaman hayati.
              </p>
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-6">
              {ARCHIVE.map((item, index) => {
                const wide = index === 3;
                // The lead card spans two rows, so its photo grows to eat the
                // leftover height instead of leaving a void under the copy.
                const tall = index === 0;
                return (
                  <li className={BENTO_SPAN[index] ?? ""} key={item.id}>
                    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40">
                      <div className={wide ? "flex flex-col sm:flex-row" : "flex flex-1 flex-col"}>
                        <div
                          className={
                            wide
                              ? "aspect-[16/10] shrink-0 overflow-hidden sm:aspect-auto sm:w-56"
                              : tall
                                ? "min-h-[240px] flex-1 overflow-hidden"
                                : "aspect-[16/10] overflow-hidden"
                          }
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt={item.title}
                            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            height={360}
                            loading="lazy"
                            src={item.imageUrl}
                            width={640}
                          />
                        </div>
                        <div className={tall ? "flex flex-col p-4" : "flex flex-1 flex-col p-4"}>
                          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
                            {CATEGORY_LABEL[item.category] ?? item.category} / {item.readTime}
                          </p>
                          <h3
                            className={
                              index === 0
                                ? "mt-2 text-base font-semibold leading-snug tracking-tight text-foreground"
                                : "mt-2 text-sm font-semibold leading-snug tracking-tight text-foreground"
                            }
                          >
                            {item.title}
                          </h3>
                          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                            {item.summary}
                          </p>
                          <Link
                            className="mt-auto inline-flex items-center gap-1.5 pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors group-hover:text-primary"
                            href="/edukasi"
                          >
                            Baca Artikel
                            <ArrowRight aria-hidden="true" className="size-3" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}