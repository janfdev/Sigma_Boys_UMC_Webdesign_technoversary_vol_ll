import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { RelatedInsight } from "@/data/articleData";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function RelatedArticles({ items }: { items: RelatedInsight[] }) {
  return (
    <section aria-labelledby="artikel-terkait-heading" className="mt-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border pb-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
              Rekomendasi Bacaan
            </p>
            <h2
              className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
              id="artikel-terkait-heading"
            >
              Artikel Terkait
            </h2>
          </div>
          <Link
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary"
            href="/edukasi"
          >
            Semua Insight -&gt;
          </Link>
        </div>

        <ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item) => (
            <li key={item.title}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40">
                <div className="aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={item.imageAlt}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    height={320}
                    loading="lazy"
                    src={item.image}
                    width={512}
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
                    {item.category} / {item.readTime}
                  </p>
                  <h3 className="mt-2 text-sm font-semibold leading-snug tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {item.excerpt}
                  </p>
                  <Link
                    className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors group-hover:text-primary"
                    href={item.href}
                  >
                    Baca Artikel
                    <ArrowRight aria-hidden="true" className="size-3" />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <Link
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "cursor-pointer gap-2 rounded-full font-mono text-[11px] uppercase tracking-[0.14em]"
            )}
            href="/edukasi"
          >
            <ArrowLeft aria-hidden="true" className="size-3.5" />
            Kembali ke Daftar Artikel
          </Link>
        </div>
      </div>
    </section>
  );
}