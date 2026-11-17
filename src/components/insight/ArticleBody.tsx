import React from "react";
import FivePillarsGrid from "./FivePillarsGrid";
import ActionStepsList from "./ActionStepsList";
import QuoteCard from "./QuoteCard";
import SortingIllustration from "./SortingIllustration";
import ArticleReactionBottomBar from "./ArticleReactionBottomBar";

export default function ArticleBody() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-10 sm:px-6 sm:pt-14 font-sans">
      <div className="space-y-12 sm:space-y-16">
        {/* Section 01: Konsep Dasar & Grid 5R */}
        <section aria-labelledby="section-01-heading">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#A3E635]">
            01 // FILOSOFI DASAR
          </p>
          <h2
            id="section-01-heading"
            className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#F8FAFC]"
          >
            Mengubah Paradigma: Bukan Sempurna, Tapi Konsisten
          </h2>

          <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            <p>
              Gerakan <strong className="text-[#F8FAFC]">Zero Waste</strong> kerap disalahpahami
              sebagai tuntutan hidup yang harus bebas sampah secara mutlak sejak hari pertama.
              Beban ekspektasi ini sering kali memicu keputusasaan sebelum kebiasaan sempat terbentuk.
              Padahal, filosofi zero waste sejatinya adalah proses bertahap untuk meminimalkan volume
              residu yang kita kirimkan ke Tempat Pemrosesan Akhir (TPA) melalui kesadaran penuh dalam
              memilih dan mengonsumsi barang.
            </p>
            <p>
              Hierarki pengelolaan sampah modern menempatkan langkah pencegahan di posisi teratas.
              Melalui penerapan kerangka kerja 5R (<em className="text-[#A3E635] not-italic font-medium">Refuse, Reduce, Reuse, Recycle, Rot</em>),
              setiap individu diajak mengenali siklus hidup dari setiap kemasan yang masuk ke rumah
              dan memprioritaskan pemanfaatan kembali sebelum mempertimbangkan opsi daur ulang.
            </p>
          </div>

          {/* 5R Pillars Grid */}
          <FivePillarsGrid />
        </section>

        {/* Section 02: Daftar Langkah Praktis */}
        <section aria-labelledby="section-02-heading">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#A3E635]">
            02 // PANDUAN PRAKTIS
          </p>
          <h2
            id="section-02-heading"
            className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#F8FAFC]"
          >
            Tiga Langkah Sederhana yang Dapat Dimulai Hari Ini
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            Memulai transisi ke gaya hidup ramah lingkungan tidak menuntut Anda langsung membeli
            perlengkapan serba baru. Kunci keberhasilan terletak pada konsistensi membangun kebiasaan
            harian dari hal-hal yang paling mudah dikendalikan di sekitar kita:
          </p>

          {/* 3 Stacked Action Cards */}
          <ActionStepsList />

          {/* Highlight Quote Box */}
          <QuoteCard />

          {/* Mid-Article Full-Width Illustration Banner */}
          <SortingIllustration />
        </section>

        {/* Section 03: Pengelolaan Organik */}
        <section aria-labelledby="section-03-heading">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#A3E635]">
            03 // KOMPOS &amp; ORGANIK
          </p>
          <h2
            id="section-03-heading"
            className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#F8FAFC]"
          >
            Mengelola Sisa Makanan Dapur dari Sumbernya
          </h2>

          <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            <p>
              Berdasarkan data Sistem Informasi Pengelolaan Sampah Nasional (SIPSN), lebih dari 40%
              hingga 50% komposisi sampah perkotaan di Indonesia didominasi oleh sampah organik dan
              sisa makanan rumah tangga. Ketika sampah organik ini tercampur dalam kantong plastik
              dan menumpuk di TPA tanpa sirkulasi udara, proses dekomposisi berlangsung secara anaerobik
              dan melepaskan gas metana (CH₄), salah satu pemicu pemanasan global dengan daya rusak
              28 kali lebih agresif dibanding karbon dioksida.
            </p>
            <p>
              Mengolah sisa makanan di rumah sejatinya tidak rumit dan tidak menimbulkan bau menyengat
              jika sirkulasi oksigen terjaga. Anda dapat memulainya lewat metode sederhana seperti
              lubang resapan biopori di halaman, pot komposter gerabah aerobik dengan penambahan
              mikroorganisme lokal (MOL), pembuatan larutan eco-enzyme serbaguna dari kulit buah,
              hingga biokonversi larva maggot BSF (Black Soldier Fly) skala komunitas yang mampu
              mengurai residu organik dengan sangat cepat sekaligus menghasilkan pupuk kasgot bernutrisi
              tinggi bagi tanaman.
            </p>
          </div>
        </section>

        {/* Section 04: Dampak Makro */}
        <section aria-labelledby="section-04-heading">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#A3E635]">
            04 // DAMPAK EKOSISTEM
          </p>
          <h2
            id="section-04-heading"
            className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#F8FAFC]"
          >
            Dampak Nyata pada Pengurangan Beban TPA Daerah
          </h2>

          <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            <p>
              Setiap kilogram sampah organik yang dikomposkan di rumah dan setiap botol plastik yang
              dialihkan ke bank sampah adalah kontribusi nyata dalam memperpanjang usia operasional TPA
              di berbagai wilayah Indonesia. Lebih dari sekadar menjaga estetika kebersihan lingkungan,
              gaya hidup zero waste memutus siklus konsumsi linier &ldquo;ambil-pakai-buang&rdquo; dan
              mengaktifkan rantai pasok ekonomi sirkular yang inklusif.
            </p>
            <p>
              Melalui integrasi platform digital CircuLife, sampah anorganik terpilah Anda dapat disetorkan
              untuk dikonversi menjadi material bernilai guna seperti paving block berstandar teknik,
              sementara limbah organik kembali menjadi nutrisi penyubur tanah. Lingkaran keberlanjutan
              ini tidak bermula dari kebijakan yang rumit, melainkan dari satu keputusan kecil yang Anda
              ambil di dapur hari ini.
            </p>
          </div>
        </section>

        {/* Bottom Reaction & Tags Bar */}
        <ArticleReactionBottomBar />
      </div>
    </div>
  );
}
