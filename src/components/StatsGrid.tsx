import type { ArticleStat, ConservationArticle } from "@/data/articleData";

export default function StatsGrid({
  article,
  stats,
}: {
  article: ConservationArticle;
  stats: ArticleStat[];
}) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
      <figure className="mt-10">
        <div className="overflow-hidden rounded-2xl border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={article.image.alt}
            className="h-auto w-full object-cover"
            height={720}
            loading="eager"
            src={article.image.src}
            width={1280}
          />
        </div>
        <figcaption className="mt-3 flex flex-col gap-1 text-[11px] leading-relaxed sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <span className="text-muted-foreground">{article.image.caption}</span>
          <span className="shrink-0 font-mono uppercase tracking-[0.14em] text-muted-foreground">
            {article.image.credit}
          </span>
        </figcaption>
      </figure>

      {stats.length > 0 ? (
      <dl className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div className="rounded-xl border border-border bg-card p-4" key={stat.label}>
            <dt className="font-mono text-[10px] uppercase leading-tight tracking-[0.14em] text-muted-foreground">
              {stat.label}
            </dt>
            <dd className="mt-2 text-lg font-bold tabular-nums text-primary sm:text-xl">
              {stat.value}
            </dd>
            <dd className="mt-1 text-[11px] leading-snug text-muted-foreground">{stat.note}</dd>
          </div>
        ))}
      </dl>
      ) : null}
    </div>
  );
}