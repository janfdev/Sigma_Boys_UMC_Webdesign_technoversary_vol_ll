# CircuLife : Digital Zero Waste & Waste-to-Value Hub

Platform terpadu pengelolaan dan valuasi limbah berbasis ekonomi sirkular dan gerakan komunitas untuk kompetisi **EcoDigital For Environment: Web Design Competition**. CircuLife menghubungkan pemilahan sampah dari sumbernya, jejaring workshop pengolahan komunitas lingkar Gunung Ciremai, transformasi limbah menjadi produk bernilai tambah (Eco-Paving Block K-250, Pupuk Organik Kasgot BSF, Tungku Ultralight Logam), serta sistem reward bibit pohon penghijauan (*1 Setoran 1 Pohon*).

---

## Prasyarat Sistem

Sebelum menjalankan proyek, pastikan perangkat Anda telah terpasang:
- **Bun**: v1.4.0 atau versi yang lebih baru (disarankan, menggunakan `bun.lock`)
- **Node.js**: v20.0.0 atau lebih baru (opsional, jika menggunakan npm/pnpm)
- **Git**: untuk kloning repositori

---

## Panduan Instalasi & Menjalankan Proyek

### 1. Kloning Repositori
```bash
git clone https://github.com/janfdev/circulife.git
cd circulife
```

### 2. Pasang Dependensi
Menggunakan Bun (direkomendasikan):
```bash
bun install
```
Atau menggunakan npm:
```bash
npm install
```

### 3. Variabel Lingkungan (Opsional)
Proyek dapat langsung berjalan secara mandiri tanpa konfigurasi `.env`. Jika ingin mengonfigurasi domain produksi untuk `metadataBase`, `sitemap.xml`, dan `robots.txt`, buat file `.env.local`:
```bash
NEXT_PUBLIC_SITE_URL=https://circulife.fizaa.me
```

### 4. Menjalankan Server Pengembangan (Dev Server)
```bash
bun run dev
# atau: npm run dev
```
Buka peramban dan akses [http://localhost:3000](http://localhost:3000).

### 5. Menjalankan Seluruh Pengujian (Automated Tests)
Seluruh pengujian unit otomatis menggunakan **Vitest** dan **React Testing Library** (113 tests di 31 test suites), mencakup pengujian fungsional komponen, simulator hidrologi, kalkulator valuasi dampak, dan audit kepatuhan Anti-Slop R-02:
```bash
bun run test
# atau: npm test
```

### 6. Kompilasi Produksi (Production Build)
```bash
bun run build
# atau: npm run build
```
Perintah ini melakukan pemeriksaan tipe TypeScript (*type-check*) dan menghasilkan 23 rute statis yang teroptimasi penuh.

### 7. Menjalankan Build Produksi Lokal
```bash
bun run start
# atau: npm run start
```

---

## Struktur Halaman & Fitur Utama

Proyek ini dibangun dengan arsitektur **Next.js 15 App Router** dengan rute-rute terintegrasi:

### 1. Beranda (`/`)
* **Hero Section Interaktif**: Tipografi tajam dengan animasi Typewriter, responsive picture preloading beresolusi HD, dan tombol aksi langsung.
* **Hero Video Dialog (Motion Grafis)**: Dialog video modal untuk pemutaran animasi edukasi sampah CircuLife.
* **Tiga Alur Utama Sirkularitas**: Visualisasi alur pemilahan sumber, pengolahan sirkular, dan distribusi produk jadi.
* **Bento Grid Informasi Terkini Lingkungan**: Tiga kartu artikel unggulan dengan layout adaptif dan efek hover filter dinamis.
* **Campaign Action & Simulasi Dampak**: Call-to-action interaktif dengan kalkulator dampak reduksi karbon langsung.
* **Testimoni & FAQ Komunitas**: Ulasan pegiat bank sampah dan daftar pertanyaan umum.

### 2. Tentang Kami (`/about`)
* **Visi & Misi Ekosistem CircuLife 2030**: Arah strategis zero-waste kawasan konservasi dan desa penyangga.
* **Metrik Dampak Kumulatif**: Counter metrik interaktif tonase sampah terkelola, paving block terdistribusi, dan pohon tertanam.
* **Model 4 Pilar Ekonomi Sirkular**: Prinsip sirkularitas terpadu dari hulu ke hilir.

### 3. Inovasi & Teknologi Sirkular (`/inovasi`)
* **Katalog Produk Olahan Nilai Tambah**: Etalase produk sirkular nyata: Eco-Paving Block K-250, Pupuk Bio-Kasgot, Tungku Kaleng Ultralight, dan Kerajinan Sachet.
* **Modal Uji Lab & Spesifikasi Teknis**: Detail uji kuat tekan paving, rasio NPK kasgot, dan penghematan karbon tiap produk.
* **Anatomi Mesin Pengolahan**: Diagram interaktif mesin pencetak paving hidrolik dan reaktor biokonversi maggot.

### 4. Galeri Transformasi Visual (`/galeri`)
* **Etalase Visual Transformasi**: Galeri foto tahapan perubahan sampah dari limbah kotor menjadi produk siap guna.
* **Edukasi & Literasi Lapangan**: Artikel visual terpilih yang bertaut langsung ke arsip insight mendalam.
* **Video Motion Grafis**: Pemutaran materi literasi visual pengelolaan sampah.

### 5. Aksi Setor Sampah Komunitas (`/lapor`)
* **Formulir Setor & Valuasi Berbasis Komunitas**: Input data terstruktur dengan komponen **Shadcn UI Select** (`@radix-ui/react-select`).
* **Live HUD Simulasi Dampak**: Penghitungan estimasi paving block, kg kompos kasgot, reduksi CO2e, dan poin hijau secara langsung saat mengisi bobot sampah.
* **Hairline UI Toast Stack**: Sistem notifikasi melayang dengan squircle curves dan text morphing saat formulir diverifikasi.
* **Tiket Digital Boarding Pass**: Penerbitan kode registrasi `CRG-YYYYMM-XXX` dengan fitur cetak bukti dan salin kode instan.
* **Jejaring Hub Komunitas**: Informasi workshop eco-paving desa, sentra biokonversi maggot, dan bank sampah unit mitra.

### 6. Pantau Status & Telemetri Kawasan (`/pantau`)
* **Papan Status Jalur & Lingkungan**: Monitoring kondisi lereng Gunung Ciremai, cuaca, dan kapasitas pengolahan sampah.
* **Simulator Hidrologi Lingkungan**: Simulasi pengaruh curah hujan dan tutupan vegetasi terhadap debit air permukaan.
* **Waste Impact Simulator**: Simulator konversi sampah interaktif berdasarkan bobot dan jenis material.

### 7. Pusat Edukasi & SOP Pemilahan (`/edukasi`)
* **Pedoman Pemilahan 3 Wadah**: Standar Operasional Prosedur pemilahan organik, anorganik, dan residu/B3.
* **Kuis Interaktif Sirkular**: Modul evaluasi pemahaman pemilahan sampah dengan feedback skor instan.
* **Direktori Keanekaragaman Hayati**: Profil flora dan fauna endemik Taman Nasional Gunung Ciremai yang terlindungi oleh aksi zero waste.

### 8. Kontak & Kemitraan Komunitas (`/contact`)
* **Formulir Kemitraan Bank Sampah**: Pendaftaran unit pengolahan baru, kelompok tani, atau relawan aksi bersih.
* **Direktori Narahubung & Posko Relawan**: Informasi kontak langsung, hotline, dan kanal komunikasi komunitas.
* **Accordion FAQ**: Tanya jawab interaktif seputar penukaran bibit pohon dan tata cara setor sampah.

### 9. Arsip Insight Lingkungan (`/insight`)
Pusat literasi dan artikel ilmiah populer yang bersumber terpadu dari `src/data/insights.ts`:
* `/insight/gunung-ciremai` : Konservasi DAS dan keanekaragaman hayati lereng Ciremai.
* `/insight/paving-block-umc` : Inovasi paving block dari limbah plastik kresek & PET.
* `/insight/zero-waste-lifestyle` : Panduan praktis gaya hidup minim sampah dari rumah.
* `/insight/upcycling-botol-plastik` : Tutorial daur ulang botol plastik menjadi organizer dan lentera.

---

## Teknologi & Arsitektur

* **Framework Frontend**: Next.js 15.5 (App Router, React 19, Server & Client Components)
* **Runtime & Package Manager**: Bun v1.4.0 (kompatibel penuh dengan Node.js v20+)
* **Styling**: Tailwind CSS v3, CSS variables HSL (Civic Forest Theme, Dark & Light Mode Support)
* **Komponen & Desain UI**:
  * **Shadcn UI & Base UI**: Komponen kartu, alert, badge, tabs, accordion, dialog, select.
  * **Hairline UI**: Toast Stack notification dengan animasi continuous squircle & spring interaction.
  * **Kokonut UI**: Infinite loop Carousel Cards pada hero section.
  * **Lucide React**: Ikonografi vektor yang konsisten dan ringan.
* **Pengujian (Testing)**: Vitest v2.1.8, Testing Library React, JSDOM (113 tests passed).

---

## Skrip yang Tersedia

| Perintah | Deskripsi |
| :--- | :--- |
| `bun run dev` (atau `npm run dev`) | Menjalankan server pengembangan Next.js di `localhost:3000` |
| `bun run build` (atau `npm run build`) | Memeriksa tipe TypeScript dan mengompilasi build produksi statis |
| `bun run start` (atau `npm run start`) | Menjalankan server produksi lokal (setelah build) |
| `bun run test` (atau `npm test`) | Menjalankan seluruh test suite Vitest (113 tests) |
| `bunx tsc --noEmit` | Memeriksa validitas tipe TypeScript tanpa kompilasi build |

