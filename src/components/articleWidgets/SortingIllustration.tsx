import React from "react";
import Image from "next/image";

export const BIN_CATEGORIES = [
  {
    color: "bg-[#3B82F6]",
    borderColor: "border-[#3B82F6]/40",
    name: "Biru",
    category: "Kertas & Karton",
    items: "Kardus, majalah, kertas arsip, karton bersih",
  },
  {
    color: "bg-[#F97316]",
    borderColor: "border-[#F97316]/40",
    name: "Oranye",
    category: "Plastik & Botol PET",
    items: "Botol minuman, jeriken, gelas plastik, wadah PP",
  },
  {
    color: "bg-[#22C55E]",
    borderColor: "border-[#22C55E]/40",
    name: "Hijau",
    category: "Organik & Dapur",
    items: "Sisa sayuran, kulit buah, ampas kopi, daun kering",
  },
  {
    color: "bg-[#64748B]",
    borderColor: "border-[#64748B]/40",
    name: "Abu-Abu",
    category: "Residu & Non-Daur",
    items: "Tisu basah, puntung, masker medis, sachet multilapis",
  },
];

export default function SortingIllustration() {
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-border bg-card">
      {/* Banner Image */}
      <div className="relative aspect-[16/9] w-full bg-background sm:aspect-[2/1]">
        <Image
          src="/image-lomba/gaya-hidup-zero-waste.webp"
          alt="Ilustrasi pemilahan sampah ke dalam 4 tempat sampah berbeda warna bertuliskan ZERO WASTE dan BRING YOUR OWN CUP"
          fill
          className="object-contain p-2 sm:p-4"
          sizes="(max-width: 896px) 100vw, 896px"
        />
      </div>

      {/* Educational Color Legend Footer */}
      <div className="border-t border-border bg-card p-4 sm:p-5">
        <figcaption className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-primary">
          INFOGRAFIS // STANDARISASI KODE WARNA TEMPAT SAMPAH PILAH
        </figcaption>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {BIN_CATEGORIES.map((bin) => (
            <div
              key={bin.name}
              className="rounded-lg border border-border bg-card p-2.5 transition-colors hover:border-primary/30"
            >
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className={`size-2.5 rounded-full ${bin.color} ring-2 ring-white/10`}
                />
                <span className="font-mono text-xs font-semibold text-foreground">
                  {bin.name}
                </span>
              </div>
              <p className="mt-1 text-xs font-medium text-primary">{bin.category}</p>
              <p className="mt-0.5 text-[10px] leading-tight text-muted-foreground">{bin.items}</p>
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}
