import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import { CIREMAI_ARTICLE } from "@/data/articleData";

const FEATURED_TOPICS = ["DAS Cisanggarung", "Flora Endemik", "Patroli Masyarakat"];

const FEATURED = {
  href: `/konservasi/${CIREMAI_ARTICLE.slug}`,
  image: CIREMAI_ARTICLE.image.src,
  imageAlt: CIREMAI_ARTICLE.image.alt,
  title: CIREMAI_ARTICLE.title,
  summary:
    "Mengenal pentingnya pelestarian sabuk hutan lindung, perlindungan keanekaragaman hayati endemik macan tutul Jawa, dan keterlibatan komunitas tapak dalam menjaga kawasan tangkapan air bagi tiga kabupaten penyangga di Jawa Barat bagian timur.",
};

const RESEARCH = {
  ref: "REF // POL-008-B / Februari 2026",
  title: "Dari Sampah Menjadi Manfaat: Mahasiswa UMC Membuat Paving Block Berbahan Limbah Plastik",
  summary:
    "Mengapa pemilahan dari tingkat rumah tangga, rukun tetangga, dan warung menjadi kunci vital dalam mengurangi beban tempat pemrosesan akhir (TPA) secara berkelanjutan, sekaligus menciptakan bahan baku bersih bagi industri daur ulang.",
  // Three frames of the same field activity: sorted plastic, the press, the finished paving.
  collage: [
    { src: "/image-lomba/Kolase Daur Ulang Plastik Menjadi Paving.png", alt: "Pemilahan limbah plastik sebelum dicacah" },
    { src: "/image-lomba/mesin-press-paving.png", alt: "Mesin press mencetak paving block" },
    { src: "/image-lomba/pemasangan-paving.png", alt: "Paving block hasil daur ulang dipasang" },
  ],
};

const SIDE_ENTRIES = [
  {
    header: "Gerakan Komunitas",
    readTime: "4 Mnt Baca",
    title: "Mulai dari Kebiasaan Kecil, Mengenal Gaya Hidup Zero Waste untuk Masa Depan",
    summary:
      "Zero waste tidak berarti nol sampah sejak hari pertama. Ia tumbuh dari kebiasaan belanja, memilah, dan menolak kemasan sekali pakai di tingkat rumah tangga.",
    image: "/image-lomba/gaya-hidup-zero-waste.webp",
    cta: "Baca Artikel",
  },
  {
    header: "Inovasi Daur Ulang",
    readTime: "3 Mnt Baca",
    title: "Mengubah Botol Plastik Bekas Menjadi Produk Kreatif Bernilai Guna.",
    summary:
      "Botol PET yang biasanya berakhir di TPA bisa menjadi pot gantung, organizer, hingga lentera. Panduan singkat menyiapkan bahan, alat, dan langkah pemotongan yang aman.",
    image: "/image-lomba/kreasi-daur-ulang.png",
    cta: "Baca Panduan",
  },
];

export default function HomeInsightSection() {
  return (
    <section aria-labelledby="sorotan-lingkungan-heading" className="py-16" id="sorotan-lingkungan">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <article className="grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card lg:grid-cols-12">
          <div className="relative min-h-[340px] lg:col-span-7">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={FEATURED.imageAlt}
              className="absolute inset-0 size-full object-cover"
              height={720}
              loading="lazy"
              src={FEATURED.image}
              width={1280}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,20,14,.45),rgba(7,20,14,0)_45%,rgba(7,20,14,.75))]"
            />

            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-primary backdrop-blur-md">
                Sorotan Lingkungan
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/80 backdrop-blur-md">
                <MapPin aria-hidden="true" className="size-3" />
                Kuningan, Jawa Barat
              </span>
            </div>

            <p className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] rounded-md border border-white/10 bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-primary backdrop-blur-md">
              Elevasi: 3.078 mdpl // Atap Jawa Barat
            </p>
          </div>

          <div className="flex flex-col p-6 sm:p-8 lg:col-span-5">
            <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-primary">
              [ Konservasi Alam ] / 6 mnt baca / Kajian Lapangan 2026
            </p>
            <h2
              className="mt-4 text-2xl font-extrabold uppercase leading-tight tracking-tight text-foreground sm:text-3xl"
              id="sorotan-lingkungan-heading"
            >
              {FEATURED.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{FEATURED.summary}</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {FEATURED_TOPICS.map((topic) => (
                <li
                  className="rounded border border-border bg-background px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
                  key={topic}
                >
                  {topic}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-9 items-center justify-center rounded-md border border-primary/30 bg-primary/10 font-mono text-[11px] font-bold text-primary"
                >
                  RC
                </span>
                <span className="font-mono text-[10px] uppercase leading-tight tracking-[0.12em] text-foreground">
                  Tim Riset CircuLife
                  <span className="mt-0.5 block text-muted-foreground">Divisi Konservasi Tapak</span>
                </span>
              </div>
              <Link
                className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.1em] text-primary-foreground transition-colors hover:bg-primary/90"
                href={FEATURED.href}
              >
                Baca Selengkapnya
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
            </div>
          </div>
        </article>

        <div className="mt-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
            [ Arsip Entri Terbaru ]
          </p>
          <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-foreground sm:text-3xl">
              Informasi Terkini untuk Lingkungan
            </h2>
            <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
              Ikuti perkembangan terbaru seputar regulasi limbah, pemilahan hulu, dan dinamika
              keanekaragaman hayati.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40 lg:col-span-7">
              <div className="relative">
                <div className="grid h-[300px] grid-cols-3 grid-rows-2 gap-1.5 sm:h-[360px]">
                  <div className="relative col-span-2 row-span-2 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={RESEARCH.collage[0].alt}
                      className="absolute inset-0 size-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                      height={480}
                      loading="lazy"
                      src={RESEARCH.collage[0].src}
                      width={640}
                    />
                  </div>
                  {RESEARCH.collage.slice(1).map((photo) => (
                    <div className="relative overflow-hidden" key={photo.src}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt={photo.alt}
                        className="absolute inset-0 size-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                        height={240}
                        loading="lazy"
                        src={photo.src}
                        width={320}
                      />
                    </div>
                  ))}
                </div>

                <span className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] rounded-full border border-primary/30 bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-primary backdrop-blur-md">
                  Pengelolaan Sampah &amp; Eksplorasi Kebijakan
                </span>
                <span className="absolute bottom-3 right-3 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/80 backdrop-blur-md">
                  5 Mnt Baca
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
                  {RESEARCH.ref}
                </p>
                <h3 className="mt-2 text-lg font-bold leading-snug tracking-tight text-foreground">
                  {RESEARCH.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {RESEARCH.summary}
                </p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    Laporan Investigasi Tapak
                  </span>
                  <Link
                    className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-primary transition-opacity hover:opacity-80"
                    href="/edukasi"
                  >
                    Pelajari Riset
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                  </Link>
                </div>
              </div>
            </article>

            <div className="flex flex-col gap-6 lg:col-span-5">
              {SIDE_ENTRIES.map((entry) => (
                <article
                  className="flex flex-1 overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40"
                  key={entry.title}
                >
                  <div className="relative w-24 shrink-0 overflow-hidden sm:w-32">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={entry.title}
                      className="absolute inset-0 size-full object-cover"
                      height={320}
                      loading="lazy"
                      src={entry.image}
                      width={256}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-primary">
                      [ {entry.header} ] / {entry.readTime}
                    </p>
                    <h3 className="mt-2 text-sm font-bold uppercase leading-snug tracking-tight text-foreground">
                      {entry.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                      {entry.summary}
                    </p>
                    <Link
                      className="mt-auto inline-flex min-h-9 items-center gap-1.5 self-end pt-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-primary transition-opacity hover:opacity-80"
                      href="/edukasi"
                    >
                      {entry.cta}
                      <ArrowUpRight aria-hidden="true" className="size-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}