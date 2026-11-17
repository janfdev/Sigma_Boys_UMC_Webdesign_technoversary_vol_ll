"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bookmark, Check, Share2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function UpcyclingArticleHeader() {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: "MENGUBAH BOTOL PLASTIK BEKAS MENJADI PRODUK KREATIF BERNILAI GUNA",
          url,
        });
        return;
      } catch {
        // Fall back to clipboard if share sheet dismissed
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="mx-auto w-full max-w-4xl px-4 pt-10 sm:px-6 sm:pt-14">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em]">
          <li className="flex items-center gap-1.5">
            <Link
              href="/edukasi"
              className="inline-flex items-center gap-1 text-[#94A3B8] transition-colors hover:text-[#A3E635]"
            >
              <ArrowLeft className="size-3" aria-hidden="true" />
              Kembali Ke Arsip Insight
            </Link>
          </li>
          <li aria-hidden="true" className="text-[#1E3028]">/</li>
          <li>
            <Link href="/" className="text-[#94A3B8] transition-colors hover:text-[#A3E635]">
              Beranda
            </Link>
          </li>
          <li aria-hidden="true" className="text-[#1E3028]">/</li>
          <li>
            <Link href="/edukasi" className="text-[#94A3B8] transition-colors hover:text-[#A3E635]">
              Insight
            </Link>
          </li>
          <li aria-hidden="true" className="text-[#1E3028]">/</li>
          <li className="text-[#A3E635]">Inovasi Daur Ulang</li>
        </ol>
      </nav>

      {/* Category Badges & Reference Code */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#10B981]/40 bg-[#10B981]/15 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[#10B981]">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-[#10B981]" />
            Inovasi Daur Ulang
          </span>
          <span className="font-mono text-xs text-[#94A3B8]">Panduan Kreatif</span>
        </div>

        <div className="font-mono text-xs text-[#94A3B8]">
          <span className="text-[#A3E635]">REF //</span> DIY-012 • 3 MNT BACA
        </div>
      </div>

      {/* Main Headline H1 (Uppercase Extra-Bold) */}
      <h1 className="mt-5 text-3xl font-extrabold uppercase leading-tight tracking-tight text-[#F8FAFC] sm:text-5xl font-sans">
        MENGUBAH BOTOL PLASTIK BEKAS MENJADI PRODUK KREATIF BERNILAI GUNA
      </h1>

      {/* Lead Summary Paragraph */}
      <div className="my-6 border-l-2 border-[#A3E635] pl-4 sm:pl-5">
        <p className="text-sm sm:text-base leading-relaxed text-[#A7B8B0]">
          Botol plastik jenis Polyethylene Terephthalate (PET, kode daur ulang #1) memiliki ketahanan
          fisik dan kejernihan material yang ideal untuk diolah kembali. Melalui sentuhan kreativitas
          dan teknik pemotongan sederhana, limbah kemasan air mineral dapat ditransformasikan menjadi
          pot hidroponik sistem sumbu, wadah alat tulis meja, kap lampu hias teras, hingga celengan
          karakter yang estetis dan bernilai ekonomi sirkular.
        </p>
      </div>

      {/* Author & Action Bar */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#1E3028] bg-[#111C17] p-3.5 sm:p-4">
        {/* Author Info */}
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-[#A3E635]/40 bg-[#1E3028] font-mono text-sm font-bold text-[#A3E635]"
          >
            RC
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-[#F8FAFC]">
              Tim Kreatif CircuLife
            </p>
            <p className="text-[11px] text-[#94A3B8]">
              Divisi Edukasi &amp; Inovasi Sirkular • Februari 2026
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-pressed={saved}
            onClick={() => setSaved((prev) => !prev)}
            className={cn(
              "inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border px-3.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]",
              saved
                ? "border-[#A3E635]/50 bg-[#A3E635]/15 text-[#A3E635]"
                : "border-[#1E3028] bg-[#0A110E] text-[#F8FAFC] hover:border-[#A3E635]/40"
            )}
          >
            {saved ? (
              <>
                <Check className="size-3.5 text-[#A3E635]" aria-hidden="true" />
                <span>Tersimpan</span>
              </>
            ) : (
              <>
                <Bookmark className="size-3.5 text-[#94A3B8]" aria-hidden="true" />
                <span>Simpan</span>
              </>
            )}
          </button>

          <button
            type="button"
            aria-label="Bagikan artikel ini"
            onClick={handleShare}
            className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-[#1E3028] bg-[#0A110E] px-3.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#F8FAFC] transition-colors hover:border-[#A3E635]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
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

      {/* Hero Featured Image & Caption */}
      <figure className="mt-8 overflow-hidden rounded-2xl border border-[#1E3028] bg-[#111C17]">
        <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
          <Image
            src="/image-lomba/kreasi-daur-ulang.png"
            alt="Ragam kreasi kerajinan dari botol plastik bekas termasuk pot tanaman gantung dan celengan karakter"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
        <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-[#1E3028] bg-[#0E1713] px-4 py-3 text-xs">
          <span className="text-[#94A3B8]">
            Ragam kreasi upcycling botol plastik bekas menjadi produk dekoratif dan fungsional rumah tangga.
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#A3E635]">
            DOKUMENTASI: STUDIO KREATIF CIRCULIFE
          </span>
        </figcaption>
      </figure>
    </header>
  );
}
