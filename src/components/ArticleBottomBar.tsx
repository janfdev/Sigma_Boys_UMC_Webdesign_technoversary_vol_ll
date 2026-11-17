"use client";

import { Share2, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ArticleBottomBar({
  tags,
  appreciationBase,
}: {
  tags: string[];
  appreciationBase: number;
}) {
  const [appreciated, setAppreciated] = useState(false);
  const count = appreciationBase + (appreciated ? 1 : 0);

  const share = async () => {
    const url = window.location.href;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: document.title, url });
        return;
      } catch {
        // Dismissed: no fallback needed for a plain share button.
      }
    } else {
      await navigator.clipboard?.writeText(url);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              className="rounded-full border border-border bg-card px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
              key={tag}
            >
              #{tag}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            aria-pressed={appreciated}
            className={cn(
              "inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border px-4 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
              appreciated
                ? "border-primary/40 bg-primary/15 text-primary"
                : "border-border bg-background text-foreground hover:border-primary/40"
            )}
            onClick={() => setAppreciated((value) => !value)}
            type="button"
          >
            <ThumbsUp aria-hidden="true" className="size-3.5" />
            Apresiasi ({count})
          </button>
          <button
            aria-label="Bagikan artikel"
            className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border border-border bg-background px-4 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground transition-colors hover:border-primary/40"
            onClick={share}
            type="button"
          >
            <Share2 aria-hidden="true" className="size-3.5" />
            Bagikan
          </button>
        </div>
      </div>
    </div>
  );
}
