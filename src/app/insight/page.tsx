import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ARTICLE_INSIGHTS, SUMMARY_INSIGHTS } from "@/data/insights";

export const metadata: Metadata = {
  title: "Arsip Insight Lingkungan | CircuLife",
  description:
    "Kumpulan kajian lapangan, riset terapan, dan panduan sirkularitas CircuLife: konservasi Ciremai, paving block limbah plastik, zero waste, dan upcycling botol PET.",
};

const META = "font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground";

export default function InsightArchivePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
      <header className="border-b border-border pb-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
          [ Arsip Insight ]
        </p>
        <h1 className="mt-3 text-3xl font-black leading-[1.15] tracking-tight text-foreground sm:text-5xl">
          Informasi Terkini untuk Lingkungan
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Kajian lapangan, riset terapan, dan panduan praktis yang kami susun bersama komunitas tapak.
          Setiap entri dapat dibaca utuh atau diringkas langsung di halaman ini.
        </p>
      </header>

      <section aria-labelledby="kajian-heading" className="pt-10">
        <h2
          className="text-xl font-bold tracking-tight text-foreground sm:text-2xl"
          id="kajian-heading"
        >
          Kajian &amp; Riset Lapangan
        </h2>

        <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLE_INSIGHTS.map((entry) => (
            <li key={entry.slug}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-background">
                  <Image
                    alt={entry.imageAlt}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                    src={entry.image}
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-primary">
                    {entry.category}
                  </p>
                  <h3 className="mt-2 text-sm font-bold leading-snug tracking-tight text-foreground sm:text-base">
                    <Link href={entry.href}>{entry.title}</Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {entry.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                    <span className={META}>{entry.readTime}</span>
                    <Link
                      className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-primary transition-colors hover:text-primary/80"
                      href={entry.href}
                    >
                      Baca Artikel
                      <ArrowRight aria-hidden="true" className="size-3" />
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="ringkasan-heading" className="pt-14">
        <h2
          className="text-xl font-bold tracking-tight text-foreground sm:text-2xl"
          id="ringkasan-heading"
        >
          Ringkasan Panduan
        </h2>
        <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
          Catatan singkat dari tim lapangan. Buka kartu untuk membaca ringkasannya tanpa berpindah
          halaman.
        </p>

        <div className="mt-6 space-y-3">
          {SUMMARY_INSIGHTS.map((entry) => (
            <details
              className="group rounded-xl border border-border bg-card px-4 py-3 transition-colors open:border-primary/40 sm:px-5"
              id={entry.slug}
              key={entry.slug}
            >
              <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-3">
                <span className="flex items-center gap-3">
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 shrink-0 text-primary transition-transform group-open:rotate-180"
                  />
                  <span className="text-sm font-semibold text-foreground sm:text-base">
                    {entry.title}
                  </span>
                </span>
                <span className={META}>
                  {entry.category} / {entry.readTime}
                </span>
              </summary>
              <div className="mt-3 flex flex-col gap-3 border-t border-border pt-3 sm:flex-row">
                <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-lg bg-background sm:w-48">
                  <Image
                    alt={entry.imageAlt}
                    className="object-cover"
                    fill
                    sizes="(max-width: 640px) 100vw, 192px"
                    src={entry.image}
                  />
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {entry.excerpt}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <footer className="mt-14 border-t border-border pt-6">
        <Link
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary"
          href="/edukasi"
        >
          Protokol pemilahan &amp; kuis literasi sirkular
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </Link>
      </footer>
    </main>
  );
}