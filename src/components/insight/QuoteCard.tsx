import React from "react";
import { Quote } from "lucide-react";

export default function QuoteCard() {
  return (
    <blockquote className="relative my-8 overflow-hidden rounded-2xl border border-[#1E3028] bg-[#111C17] p-6 sm:p-8 transition-colors hover:border-[#A3E635]/30">
      {/* Glow highlight in corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-12 -top-12 size-36 rounded-full bg-[#A3E635]/10 blur-2xl"
      />

      {/* Large double quote mark in top left */}
      <div className="flex items-start gap-3 sm:gap-4">
        <div aria-hidden="true" className="shrink-0 text-[#A3E635]">
          <Quote className="size-8 sm:size-10 fill-[#A3E635]/20 text-[#A3E635]" />
        </div>

        <div className="relative z-10 flex-1">
          <p className="text-sm sm:text-base md:text-lg italic leading-relaxed text-[#F8FAFC]">
            &ldquo;Kita tidak membutuhkan segelintir orang yang menjalankan zero waste secara sempurna.
            Kita membutuhkan jutaan orang yang melakukannya secara tidak sempurna namun dengan
            konsisten setiap hari.&rdquo;
          </p>

          <footer className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-[#A3E635]">
            - ANNE MARIE BONNEAU, ZERO WASTE CHEF
          </footer>
        </div>
      </div>
    </blockquote>
  );
}
