import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";

export interface RelatedItem {
  href: string;
  thumbnail: string;
  thumbnailAlt: string;
  tag: string;
  title: string;
  description: string;
}

export const RELATED_READINGS_DATA: RelatedItem[] = [
  {
    href: "/insight/paving-block-umc",
    thumbnail: "/image-lomba/Kolase%20Daur%20Ulang%20Plastik%20Menjadi%20Paving.png",
    thumbnailAlt: "Kolase foto kegiatan mahasiswa UMC mengolah limbah plastik menjadi paving block",
    tag: "PENGELOLAAN SAMPAH • 5 MNT BACA",
    title: "Dari Sampah Menjadi Manfaat: Mahasiswa UMC Membuat Paving Block Berbahan Limbah Plastik",
    description:
      "Riset terapan KKN 33 UMC: limbah plastik rumah tangga diolah jadi paving block K-250 lewat formula 40/60, rekayasa termal terkontrol, dan skema poin bank sampah.",
  },
  {
    href: "/insight/upcycling-botol-plastik",
    thumbnail: "/image-lomba/kreasi-daur-ulang.png",
    thumbnailAlt: "Kerajinan pot gantung dan produk kreatif dari botol plastik bekas",
    tag: "INOVASI DAUR ULANG • 3 MNT BACA",
    title: "Mengubah Botol Plastik Bekas Menjadi Produk Kreatif Bernilai Guna",
    description:
      "Botol PET yang biasanya berakhir di TPA bisa menjadi pot gantung, organizer perlengkapan, hingga instalasi estetis dengan panduan alat rumahan yang mudah.",
  },
];

export default function RelatedReadings() {
  return (
    <section aria-labelledby="bacaan-terkait-heading" className="mt-16 sm:mt-20">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#1E3028] pb-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#A3E635]">
              EKSPLORASI LANJUTAN
            </p>
            <h2
              id="bacaan-terkait-heading"
              className="mt-1.5 text-xl sm:text-2xl font-bold tracking-tight text-[#F8FAFC]"
            >
              Bacaan Terkait Sirkularitas
            </h2>
          </div>
          <Link
            href="/edukasi"
            className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#94A3B8] transition-colors hover:text-[#A3E635]"
          >
            <span>Lihat Semua Artikel</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        {/* 2-Column Card Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {RELATED_READINGS_DATA.map((item) => (
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
                  {item.tag}
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
