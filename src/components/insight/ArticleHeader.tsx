"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bookmark, Check, Share2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ArticleHeader() {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

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
        // Fall back to clipboard copy if share sheet is canceled
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
          <li className="text-[#A3E635]">Gerakan Komunitas</li>
        </ol>
      </nav>

      {/* Category Badges & Reference Number */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#10B981]/40 bg-[#10B981]/15 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[#10B981]">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-[#10B981]" />
            Gerakan Komunitas &amp; Gaya Hidup
          </span>
          <span className="text-xs text-[#94A3B8]">Edukasi Publik</span>
        </div>

        <div className="font-mono text-xs text-[#94A3B8]">
          <span className="text-[#A3E635]">REF //</span> COM-014 • 4 MNT BACA
        </div>
      </div>

      {/* Main Headline H1 */}
      <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#F8FAFC] sm:text-5xl font-sans">
        Mulai Dari Kebiasaan Kecil, Mengenal Gaya Hidup Zero Waste Untuk Masa Depan
      </h1>

      {/* Styled Lead Callout Paragraph */}
      <div className="my-6 border-l-2 border-[#A3E635] pl-4 sm:pl-5">
        <p className="text-sm sm:text-base leading-relaxed text-[#A7B8B0]">
          Mengurangi timbulan sampah rumah tangga tidak selalu harus dimulai dari perubahan ekstrem
          yang memberatkan. Melalui kebiasaan harian yang terukur, siapa pun dapat berkontribusi
          nyata dalam menjaga kelestarian lingkungan dan menekan beban tempat pemrosesan akhir.
        </p>
      </div>

      {/* Author & Action Bar */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#1E3028] bg-[#111C17] p-3.5 sm:p-4">
        {/* Author Info */}
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#A3E635]/40 bg-[#1E3028] font-mono text-sm font-bold text-[#A3E635]"
          >
            RC
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-[#F8FAFC]">
              Tim Edukasi CircuLife
            </p>
            <p className="text-[11px] text-[#94A3B8]">
              Divisi Kampanye &amp; Komunitas • Februari 2026
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
                <span>Simpan Artikel</span>
              </>
            )}
          </button>

          <button
            type="button"
            aria-label="Bagikan artikel"
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

      {/* Hero Featured Illustration */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-[#1E3028] bg-[#EAE2D0]">
        <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
          <Image
            src="/image-lomba/zero-waste-lifestyle.jpg"
            alt="Ilustrasi grafis bertuliskan ZERO WASTE LIFESTYLE dengan kolase ikon-ikon daur ulang berbentuk hati"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
      </div>
    </header>
  );
}
