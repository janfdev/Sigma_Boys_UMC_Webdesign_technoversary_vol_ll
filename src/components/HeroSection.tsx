import Link from "next/link";
import { Layers, PackageCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const photos = [
  { file: "Menanam Bibit dengan Pupuk Kasgot.png", alt: "Bibit tanaman diberi pupuk kasgot", position: "-rotate-6 translate-y-7", crop: "object-[65%_center]" },
  { file: "Kolase Daur Ulang Plastik Menjadi Paving.png", alt: "Proses pengolahan plastik menjadi paving", position: "-rotate-3 translate-y-3", crop: "object-center" },
  { file: "Pemasangan Paving Daur Ulang di Tepi Sungai.png", alt: "Pemasangan paving daur ulang di tepi sungai", position: "z-20", crop: "object-[45%_center]" },
  { file: "Organizer Alat Tulis Botol Daur Ulang.png", alt: "Organizer alat tulis dari botol plastik", position: "rotate-3 translate-y-3", crop: "object-[40%_center]" },
  { file: "Lentera Bunga PET di Senja Hari.png", alt: "Lentera bunga dari botol PET", position: "rotate-6 translate-y-7", crop: "object-center" },
];

export default function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-[#0b1611] text-white">
      <img
        src="/image-lomba/Gunung%20Ciremai.jpg"
        alt=""
        width={1920}
        height={1080}
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,20,14,.82),rgba(7,20,14,.88)_65%,#0b1611)]" />
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-24 lg:px-8">
        <h1 id="hero-heading" className="mx-auto max-w-4xl text-4xl font-black leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl">
          Sampah Bukan Akhir.
          <span className="block font-medium">Ini Awal Perubahan</span>
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
        <div className="mx-auto mt-14 flex max-w-5xl items-end justify-center pb-8 sm:mt-16" aria-label="Pemanfaatan sampah menjadi produk bernilai">
          {photos.map((photo, index) => (
            <div key={photo.file} className={cn("relative -mx-2 shrink-0 overflow-hidden rounded-xl border-2 border-white/80 bg-emerald-950 shadow-xl shadow-black/25 sm:-mx-3 sm:rounded-2xl", index === 2 ? "h-52 w-[37%] sm:h-80 sm:w-[26%]" : index === 1 || index === 3 ? "z-10 h-44 w-[29%] sm:h-72 sm:w-[23%]" : "hidden h-60 w-[21%] sm:block", photo.position)}>
              <img src={`/image-lomba/${encodeURIComponent(photo.file)}`} alt={photo.alt} width={520} height={720} className={cn("h-full w-full object-cover", photo.crop)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
