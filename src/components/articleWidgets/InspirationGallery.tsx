import React from "react";
import Image from "next/image";

export const GALLERY_ITEMS = [
  {
    image: "/image-lomba/Organizer%20Alat%20Tulis%20Botol%20Daur%20Ulang.png",
    alt: "Wadah alat tulis meja dari potongan botol plastik bekas yang dicat warna-warni",
    category: "KATEGORI: ALAT TULIS",
    caption:
      "Potongan bagian bawah botol yang dihaluskan tepinya menggunakan panas setrika dan dicat motif geometris menjadi wadah pulpen yang kokoh.",
  },
  {
    image: "/image-lomba/Lentera%20Bunga%20PET%20di%20Senja%20Hari.png",
    alt: "Kap lampu gantung berbentuk kelopak bunga dari dasar botol plastik menyala saat senja",
    category: "KATEGORI: PENCAHAYAAN",
    caption:
      "Susunan dasar botol plastik transparan yang dirangkai melingkar menghasilkan bias cahaya artistik seperti kelopak bunga kristal.",
  },
];

export default function InspirationGallery() {
  return (
    <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      {GALLERY_ITEMS.map((item) => (
        <figure
          key={item.category}
          className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/40"
        >
          {/* Image Container with Badge Overlay */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-background">
            <Image
              src={item.image}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 400px"
            />
            {/* Category Overlay Badge */}
            <div className="absolute left-3 top-3 z-10">
              <span className="rounded-md border border-primary/50 bg-background/80 backdrop-blur-sm px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
                {item.category}
              </span>
            </div>
          </div>

          {/* Caption */}
          <figcaption className="p-4 text-xs sm:text-sm leading-relaxed text-muted-foreground border-t border-border">
            {item.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
