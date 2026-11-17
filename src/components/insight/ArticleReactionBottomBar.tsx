"use client";

import React, { useState } from "react";
import { ThumbsUp, Share2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ArticleReactionBottomBarProps {
  initialCount?: number;
  tags?: string[];
}

export const DEFAULT_TAGS = [
  "ZeroWasteIndonesia",
  "GayaHidupBerkelanjutan",
  "PilahSampah",
  "CircuLifeInsight",
];

export default function ArticleReactionBottomBar({
  initialCount = 64,
  tags = DEFAULT_TAGS,
}: ArticleReactionBottomBarProps) {
  const [appreciated, setAppreciated] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentCount = initialCount + (appreciated ? 1 : 0);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: "Mulai Dari Kebiasaan Kecil, Mengenal Gaya Hidup Zero Waste Untuk Masa Depan",
          url,
        });
        return;
      } catch {
        // Fall back to clipboard
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-10 border-y border-[#1E3028] py-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Tags List */}
        <ul className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-[#1E3028] bg-[#111C17] px-3 py-1 font-mono text-[11px] text-[#94A3B8] transition-colors hover:border-[#A3E635]/40 hover:text-[#A3E635]"
            >
              #{tag}
            </li>
          ))}
        </ul>

        {/* Reaction & Share Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-pressed={appreciated}
            onClick={() => setAppreciated((prev) => !prev)}
            className={cn(
              "inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border px-4 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]",
              appreciated
                ? "border-[#A3E635]/50 bg-[#A3E635]/15 text-[#A3E635]"
                : "border-[#1E3028] bg-[#111C17] text-[#F8FAFC] hover:border-[#A3E635]/40"
            )}
          >
            <ThumbsUp
              className={cn(
                "size-3.5 transition-transform",
                appreciated ? "fill-[#A3E635] text-[#A3E635] scale-110" : "text-[#94A3B8]"
              )}
              aria-hidden="true"
            />
            <span>Apresiasi ({currentCount})</span>
          </button>

          <button
            type="button"
            aria-label="Bagikan artikel ini"
            onClick={handleShare}
            className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border border-[#1E3028] bg-[#111C17] px-4 font-mono text-[11px] uppercase tracking-[0.12em] text-[#F8FAFC] transition-colors hover:border-[#A3E635]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-[#A3E635]" aria-hidden="true" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Share2 className="size-3.5 text-[#94A3B8]" aria-hidden="true" />
                <span>Bagikan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
