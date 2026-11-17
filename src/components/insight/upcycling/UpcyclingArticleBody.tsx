import React from "react";
import UpcyclingFlowBar from "./UpcyclingFlowBar";
import UpcyclingStepGrid from "./UpcyclingStepGrid";
import InspirationGallery from "./InspirationGallery";
import UpcyclingQuoteCard from "./UpcyclingQuoteCard";
import PointBonusBanner from "./PointBonusBanner";
import ArticleReactionBottomBar from "../ArticleReactionBottomBar";

export const UPCYCLING_TAGS = [
  "UpcyclingIndonesia",
  "DaurUlangPlastik",
  "KriyaSirkular",
  "CircuLifeInsight",
];

export default function UpcyclingArticleBody() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-10 sm:px-6 sm:pt-14 font-sans">
      <div className="space-y-12 sm:space-y-16">
        {/* Bagian 01: Konsep Upcycling & Diagram Alur Transformasi */}
        <section aria-labelledby="section-01-heading">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#10B981]">
            BAGIAN 01 // KONSEP UPCYCLING
          </p>
          <h2
            id="section-01-heading"
            className="mt-2 text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#F8FAFC]"
          >
            DARI SAMPAH KONSUMSI MENJADI ELEMEN DEKORASI FUNGSIONAL
          </h2>

          <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            <p>
              Botol plastik berbahan <strong className="text-[#F8FAFC]">Polyethylene Terephthalate (PET)</strong> adalah
              salah satu jenis sampah anorganik yang paling melimpah di lingkungan perkotaan. Sifat fisiknya
              yang transparan, lentur namun tidak mudah pecah, serta kedap air menjadikannya material dasar
              yang sangat mumpuni untuk proyek kerajinan tangan (*upcycling*) daripada sekadar dibuang
              menumpuk di tempat sampah.
            </p>
            <p>
              Berbeda dari proses daur ulang industri (*recycling*) yang memerlukan proses pencacahan dan
              peleburan termal berenergi tinggi, kriya daur ulang mandiri memanfaatkan bentuk utuh botol.
              Dengan memotong, merapikan tepi, dan merakit ulang komponennya, kita dapat mempertahankan 95%
              massa material tanpa menghasilkan emisi karbon tambahan.
            </p>
          </div>

          {/* Horizontal Process Flowchart Bar */}
          <UpcyclingFlowBar />
        </section>

        {/* Bagian 02: Panduan Langkah Demi Langkah */}
        <section aria-labelledby="section-02-heading">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#10B981]">
            BAGIAN 02 // TUTORIAL PRAKTIS
          </p>
          <h2
            id="section-02-heading"
            className="mt-2 text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#F8FAFC]"
          >
            PANDUAN LANGKAH DEMI LANGKAH: POT HIDROPONIK SUMBU (WICK SYSTEM)
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            Untuk memulai proyek ini, siapkan alat dan bahan sederhana yang mudah ditemukan di rumah:
            satu buah botol PET bekas ukuran 1,5 liter, gunting atau cutter tajam, potongan kain flanel
            atau sumbu kompor berukuran 2 x 20 cm, solder atau paku yang dipanaskan untuk membuat lubang,
            serta cat akrilik tahan air (opsional) untuk menghias bagian luar.
          </p>

          {/* 4-Step Tutorial Grid */}
          <UpcyclingStepGrid />
        </section>

        {/* Bagian 03: Galeri Inspirasi Produk Lainnya */}
        <section aria-labelledby="section-03-heading">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#10B981]">
            BAGIAN 03 // INSPIRASI PRODUK
          </p>
          <h2
            id="section-03-heading"
            className="mt-2 text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#F8FAFC]"
          >
            INSPIRASI WADAH ALAT TULIS &amp; KAP LAMPU HIAS TERAS
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            Selain pot tanaman, karakteristik dasar botol PET yang memiliki lekukan kontur bunga di
            bagian bawahnya memberikan ruang eksplorasi bentuk geometris yang sangat menarik untuk
            elemen dekorasi meja maupun instalasi pencahayaan ruangan:
          </p>

          {/* 2-Column Visual Showcase */}
          <InspirationGallery />

          {/* Highlight Quote Box */}
          <UpcyclingQuoteCard />
        </section>

        {/* Bagian 04: Dampak Lingkungan & Poin Insentif */}
        <section aria-labelledby="section-04-heading">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#10B981]">
            BAGIAN 04 // DAMPAK &amp; NILAI EKONOMI
          </p>
          <h2
            id="section-04-heading"
            className="mt-2 text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#F8FAFC]"
          >
            DAMPAK LINGKUNGAN DAN POTENSI PENJUALAN DI BAZAR KOMUNITAS
          </h2>

          <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            <p>
              Setiap kali Anda mengolah satu botol plastik 1,5 liter menjadi produk fungsional, Anda telah
              mencegah pelepasan sekitar 50 gram gas rumah kaca ekuivalen yang biasanya tercipta selama proses
              ekstraksi minyak bumi untuk produksi botol baru. Dalam skala kolektif rukun warga, pengalihan
              ratusan botol dari TPA secara langsung menjaga kebersihan drainase lingkungan dan memangkas
              risiko sumbatan banjir saat musim hujan.
            </p>
            <p>
              Lebih jauh lagi, produk kriya berbahan botol PET terbukti memiliki daya tarik komersial yang nyata.
              Pot hidroponik yang dihias rapi bersama bibit sayur selada atau pakcoy siap panen biasa laku
              dijual pada kisaran <strong className="text-[#A3E635]">Rp15.000 hingga Rp45.000 per unit</strong> di bazar
              komunitas perkotaan, pasar kaget Car Free Day, dan pameran sekolah, membuka peluang ekonomi kreatif
              mandiri bagi kelompok ibu rumah tangga dan pemuda karang taruna.
            </p>
          </div>

          {/* Eco-Points Callout Banner */}
          <PointBonusBanner />
        </section>

        {/* Bottom Reaction & Tags Bar */}
        <ArticleReactionBottomBar initialCount={52} tags={UPCYCLING_TAGS} />
      </div>
    </div>
  );
}
