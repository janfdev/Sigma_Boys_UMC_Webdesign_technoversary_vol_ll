import React from "react";
import { Quote } from "lucide-react";

export default function UpcyclingQuoteCard() {
  return (
    <blockquote className="my-8 rounded-r-xl border-l-4 border-[#A3E635] border-y border-r border-[#1E3028] bg-[#111C17] p-6 sm:p-7 transition-colors hover:border-[#A3E635]/40">
      <div className="flex items-start gap-3 sm:gap-4">
        <div aria-hidden="true" className="shrink-0 text-[#A3E635]">
          <Quote className="size-7 sm:size-8 fill-[#A3E635]/20 text-[#A3E635]" />
        </div>
        <div className="flex-1">
          <p className="text-sm sm:text-base italic leading-relaxed text-[#F8FAFC]">
            &ldquo;Kreativitas sejati dalam ekonomi sirkular bukan tentang menciptakan sampah baru yang
            cantik, melainkan melihat potensi fungsi baru di balik material yang dianggap tak lagi
            bernilai.&rdquo;
          </p>
          <footer className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-[#A3E635]">
            - DIVISI INOVASI PRODUK CIRCULIFE
          </footer>
        </div>
      </div>
    </blockquote>
  );
}
