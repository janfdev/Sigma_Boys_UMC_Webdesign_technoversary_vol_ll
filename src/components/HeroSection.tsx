import Link from "next/link";
import { preload } from "react-dom";
import { Layers, PackageCheck } from "lucide-react";
import CarouselCards, { type RailItem } from "@/components/kokonutui/carousel-cards";
import { Typewriter } from "@/components/ui/typewriter";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides: RailItem[] = [
  { id: "kasgot", alt: "Bibit tanaman diberi pupuk kasgot", file: "bibit-pupuk-kasgot.webp" },
  { id: "kolase", alt: "Proses pengolahan plastik menjadi paving", file: "Kolase Daur Ulang Plastik Menjadi Paving.webp" },
  { id: "paving", alt: "Pemasangan paving daur ulang di tepi sungai", file: "pemasangan-paving.webp" },
  { id: "organizer", alt: "Organizer alat tulis dari botol plastik", file: "Organizer Alat Tulis Botol Daur Ulang.webp" },
  { id: "lentera", alt: "Lentera bunga dari botol PET", file: "Lentera Bunga PET di Senja Hari.webp" },
].map(({ id, alt, file }) => ({
  id,
  image: `/image-lomba/${encodeURIComponent(file)}`,
  imageAlt: alt,
}));

export default function HeroSection() {
  preload("/image-lomba/Gunung%20Ciremai-mobile.webp", {
    as: "image",
    fetchPriority: "high",
    media: "(max-width: 640px)",
  });
  preload("/image-lomba/Gunung%20Ciremai.webp", {
    as: "image",
    fetchPriority: "high",
    media: "(min-width: 641px)",
  });

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-[#0b1611] text-white">
      <picture className="absolute inset-0 -z-20 h-full w-full">
        <source
          media="(max-width: 640px)"
          srcSet="/image-lomba/Gunung%20Ciremai-mobile.webp"
          type="image/webp"
        />
        <source srcSet="/image-lomba/Gunung%20Ciremai.webp" type="image/webp" />
        <img
          src="/image-lomba/Gunung%20Ciremai.webp"
          alt=""
          width={1280}
          height={800}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
      </picture>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,20,14,.82),rgba(7,20,14,.88)_65%,#0b1611)]" />
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-24 lg:px-8">
        <h1 id="hero-heading" className="mx-auto max-w-4xl text-4xl font-black leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl">
          Sampah Bukan Akhir.
          <span className="block font-medium mt-1.5 sm:mt-2 text-emerald-300">
            Ini Awal{' '}
            <span className="text-emerald-400">
              <Typewriter phrases={['Perubahan.', 'Nilai Baru.', 'Inovasi Sirkular.', 'Masa Depan Bersih.']} />
            </span>
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-emerald-50/90 sm:text-base">
          Bukan sekadar membuang, tetapi memahami, memilah, dan mengolah. Bersama CIRCULIFE, wujudkan perubahan menuju lingkungan yang lebih bersih dan berkelanjutan.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/lapor" className={cn(buttonVariants({ size: "lg" }), "h-12 cursor-pointer gap-2 rounded-full bg-emerald-300 px-7 text-xs font-bold uppercase tracking-wide text-emerald-950 hover:bg-emerald-200 active:bg-emerald-400")}>
            <PackageCheck className="size-4" aria-hidden="true" />
            Mulai Pilah &amp; Setor
          </Link>
          <a href="#alur-sirkular" className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/25 bg-black/30 px-7 text-sm font-medium text-white transition-colors hover:bg-white/15 active:bg-white/20">
            <Layers className="size-4" aria-hidden="true" />
            Lihat Alur Daur Ulang
          </a>
        </div>
        <div className="dark mx-auto mt-10 max-w-4xl overflow-hidden sm:mt-12">
          <CarouselCards
            initialIndex={2}
            items={slides}
            loop={true}
            showHeader={false}
            title="Pemanfaatan sampah menjadi produk bernilai"
          />
        </div>
      </div>
    </section>
  );
}
