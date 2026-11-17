import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";

export const RELATED_ENVIRONMENT_ITEMS = [
  {
    href: "/insight/paving-block-umc",
    thumbnail: "/image-lomba/Kolase%20Daur%20Ulang%20Plastik%20Menjadi%20Paving.png",
    thumbnailAlt: "Kolase foto kegiatan mahasiswa UMC mengolah limbah plastik menjadi paving block",
    badge: "PENGELOLAAN SAMPAH",
    title: "Dari Sampah Menjadi Manfaat: Mahasiswa UMC Membuat Paving Block Berbahan Limbah Plastik",
    description:
      "Riset terapan KKN 33 UMC: limbah plastik rumah tangga diolah jadi paving block K-250 lewat formula 40/60 dan skema poin bank sampah.",
  },
  {
    href: "/insight/zero-waste-lifestyle",
    thumbnail: "/image-lomba/zero-waste-lifestyle.jpg",
    thumbnailAlt: "Ilustrasi Zero Waste Lifestyle CircuLife",
    badge: "GERAKAN KOMUNITAS",
    title: "Mulai Dari Kebiasaan Kecil, Mengenal Gaya Hidup Zero Waste Untuk Masa Depan",
    description:
      "Panduan praktis memulai gaya hidup minim sampah dari rumah melalui pendekatan 5R, pemilahan wadah, dan komposting organik.",
  },
];

export default function RelatedEnvironment() {
  return (
    <section aria-labelledby="rekomendasi-lingkungan-heading" className="mt-16 sm:mt-20">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#1E3028] pb-4">
          <div>
            <h2
              id="rekomendasi-lingkungan-heading"
              className="text-xl font-extrabold uppercase tracking-tight text-[#F8FAFC]"
            >
              REKOMENDASI TERKAIT LINGKUNGAN
            </h2>
          </div>
          <Link
            href="/edukasi"
            className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#10B981] transition-colors hover:text-[#A3E635]"
          >
            <span>Lihat Semua Arsip</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        {/* 2-Column Card Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {RELATED_ENVIRONMENT_ITEMS.map((item) => (
            <article
              key={item.title}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#1E3028] bg-[#111C17] transition-all duration-300 hover:border-[#A3E635]/40 hover:bg-[#14231D]"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A110E]">
                <Image
                  src={item.thumbnail}
                  alt={item.thumbnailAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-5">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#10B981]">
                  {item.badge}
                </span>

                <h3 className="mt-2 text-sm sm:text-base font-bold leading-snug tracking-tight text-[#F8FAFC] group-hover:text-[#A3E635] transition-colors">
                  <Link href={item.href}>{item.title}</Link>
                </h3>

                <p className="mt-2 line-clamp-3 flex-1 text-xs sm:text-sm leading-relaxed text-[#94A3B8]">
                  {item.description}
                </p>

                <div className="mt-4 pt-3 border-t border-[#1E3028]">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A3E635] transition-colors hover:text-[#bef264]"
                  >
                    <span>Baca Artikel</span>
                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Center Pill Button */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/edukasi"
            className="inline-flex items-center gap-2 rounded-full border border-[#1E3028] bg-[#111C17] px-6 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-[#F8FAFC] transition-colors hover:border-[#A3E635]/40 hover:text-[#A3E635]"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Kembali Ke Daftar Insight
          </Link>
        </div>
      </div>
    </section>
  );
}
