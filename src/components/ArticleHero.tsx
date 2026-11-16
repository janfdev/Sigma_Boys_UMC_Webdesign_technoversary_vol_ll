"use client";

import { Bookmark, Check, Share2 } from "lucide-react";
import { useState } from "react";
import type { ConservationArticle } from "@/data/articleData";
import { cn } from "@/lib/utils";

const META_CLASS = "font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground";

export default function ArticleHero({ article }: { article: ConservationArticle }) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: article.title, url });
        return;
      } catch {
        // Fall through to the clipboard when the share sheet is dismissed.
      }
    }
    await navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="mx-auto w-full max-w-4xl px-4 pt-12 sm:px-6 sm:pt-16">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em]">
          {article.breadcrumb.map((crumb, index) => {
            const last = index === article.breadcrumb.length - 1;
            return (
              <li className="flex items-center gap-2" key={crumb}>
                <span className={last ? "text-primary" : "text-muted-foreground"}>{crumb}</span>
                {last ? null : (
                  <span aria-hidden="true" className="text-muted-foreground/50">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-primary">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
        {article.badge}
        <span aria-hidden="true" className="text-primary/50">
          /
        </span>
        {article.location}
      </span>

      <h1 className="mt-5 text-3xl font-black leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {article.title}
      </h1>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        {article.lead}
      </p>

      <div className="mt-8 flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
          <div>
            <dt className={META_CLASS}>Penulis</dt>
            <dd className="mt-1 text-xs font-medium text-foreground">{article.author}</dd>
          </div>
          <div>
            <dt className={META_CLASS}>Tanggal</dt>
            <dd className="mt-1 text-xs font-medium text-foreground">
              <time dateTime={article.dateTime}>{article.date}</time>
            </dd>
          </div>
          <div>
            <dt className={META_CLASS}>Durasi</dt>
            <dd className="mt-1 text-xs font-medium text-foreground">{article.readTime}</dd>
          </div>
          <div>
            <dt className={META_CLASS}>Topik</dt>
            <dd className="mt-1 text-xs font-medium text-foreground">{article.topic}</dd>
          </div>
        </dl>

        <div className="flex shrink-0 items-center gap-2">
          <button
            aria-pressed={saved}
            className={cn(
              "inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border px-4 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
              saved
                ? "border-primary/40 bg-primary/15 text-primary"
                : "border-border bg-background text-foreground hover:border-primary/40"
            )}
            onClick={() => setSaved((value) => !value)}
            type="button"
          >
            {saved ? (
              <Check aria-hidden="true" className="size-3.5" />
            ) : (
              <Bookmark aria-hidden="true" className="size-3.5" />
            )}
            {saved ? "Tersimpan" : "Simpan"}
          </button>
          <button
            className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border border-border bg-background px-4 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground transition-colors hover:border-primary/40"
            onClick={share}
            type="button"
          >
            <Share2 aria-hidden="true" className="size-3.5" />
            {copied ? "Tersalin" : "Bagikan"}
          </button>
        </div>
      </div>
    </header>
  );
}