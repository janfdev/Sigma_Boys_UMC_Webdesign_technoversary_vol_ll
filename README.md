# CircuLife: Zero Waste & Waste-to-Value Hub

Platform terpadu pengelolaan dan konversi limbah berbasis ekonomi sirkular untuk kompetisi **EcoDigital For Environment: Web Design Competition**. Proyek ini menghubungkan pemilahan sampah di sumber, logistik drop-point cerdas, transformasi material menjadi produk bernilai (eco-paving block, pupuk bio-kasgot, tungku upcycled), dan distribusi dampak lingkungan.

---

## Prasyarat Sistem

Sebelum menjalankan proyek, pastikan perangkat Anda telah terpasang:
- **Bun**: v1.4.0 atau versi yang lebih baru (disarankan, proyek memakai `bun.lock`)
- **Node.js**: v20.0.0 atau lebih baru (opsional, jika memakai npm/pnpm)
- **Git**: untuk kloning repositori

---

## Panduan Instalasi & Menjalankan Proyek

### 1. Kloning Repositori
```bash
git clone https://github.com/janfdev/circulife.git
cd circulife
```

### 2. Pasang Dependensi
```bash
bun install
```

### 3. Variabel Lingkungan (opsional)
Proyek berjalan tanpa file `.env`. Jika ingin mengubah domain yang dipakai `metadataBase`, `sitemap.xml`, dan `robots.txt`, buat `.env.local`:
```bash
NEXT_PUBLIC_SITE_URL=https://domain-anda.example
```
Tanpa variabel ini, domain default `https://circulife.abyte.my.id` yang dipakai.

### 4. Jalankan Development Server
```bash
bun run dev
```
Buka browser dan akses [http://localhost:3000](http://localhost:3000).

### 5. Menjalankan Test
Seluruh pengujian otomatis memakai Vitest dan React Testing Library, termasuk audit kepatuhan Anti-Slop R-02 (tidak boleh ada karakter em-dash di `src/`):
```bash
bun run test
```

### 6. Kompilasi Produksi (Production Build)
```bash
bun run build
```
Perintah ini sekaligus memeriksa tipe TypeScript. Untuk audit tipe saja tanpa build:
```bash
bunx tsc --noEmit
```

### 7. Menjalankan Build Produksi Secara Lokal
Jalankan langkah 6 lebih dahulu, karena `next start` membaca hasil build di `.next`:
```bash
bun run start
```

> `bun run lint` belum bisa dipakai: proyek ini tidak memasang ESLint dan Next.js 15.5 sudah menonaktifkan `next lint` interaktif. Gunakan `bunx tsc --noEmit` dan `bun run test` sebagai gerbang kualitas.

---

## Struktur Halaman & Fitur Aplikasi

Proyek ini memenuhi 4 halaman wajib perlombaan web design serta modul pendukung:

1. **Home (`/`)**:
   - Telemetry HUD: metrik ringkas dampak limbah terkelola dan pohon tertanam.
   - Hero banner dengan call to action alur pemanfaatan sampah.
   - Alur Pemanfaatan Sampah Interaktif 4 Tahap: pemilahan sumber, logistik pintar, konversi nilai sirkular, dan distribusi dampak.
   - Sorotan lingkungan yang menarik kartu terbaru dari arsip insight, plus bento grid pilar zero waste dan papan status drop-point komunitas.

2. **Tentang Kami (`/about`)**:
   - Visi dan misi ekosistem CircuLife 2030.
   - Metrik dampak kumulatif: tonase sampah, paving block terdistribusi, dan mitra binaan.
   - Model ekonomi sirkular 4 pilar.

3. **Konten / Artikel & Galeri (`/galeri`)**:
   - Galeri transformasi visual: proses pengolahan botol plastik, komposting maggot BSF, dan upcycling kaleng bekas.
   - Artikel ringkasan gaya hidup zero waste dan teknologi daur ulang, masing-masing bertaut ke arsip.

4. **Kontak & FAQ (`/contact`)**:
   - Formulir pendaftaran mitra bank sampah dan penyetoran limbah massal.
   - Direktori kontak dan pusat logistik.
   - Komponen accordion FAQ seputar tata cara pemilahan dan penukaran poin.

5. **Arsip Insight (`/insight`)**:
   - Satu sumber untuk semua artikel: beranda, rekomendasi di dalam artikel, `/galeri`, dan arsip ini membaca data yang sama dari `src/data/insights.ts`.
   - Empat artikel lengkap, masing-masing punya rute sendiri:
     `/insight/gunung-ciremai` (konservasi DAS Ciremai), `/insight/paving-block-umc` (paving block limbah plastik), `/insight/zero-waste-lifestyle`, `/insight/upcycling-botol-plastik`.
   - Entri ringkasan tanpa halaman sendiri dibuka langsung di arsip.

6. **Rute Pendukung**:
   - **Form Setor Sampah (`/lapor`)**: antarmuka pelaporan dan penimbangan sampah berinsentif poin.
   - **Pantau Status (`/pantau`)**: simulator parameter sirkularitas dan direktori posko drop-point.
   - **Edukasi SOP (`/edukasi`)**: pedoman pemilahan sampah dan kuis interaktif 2 tahap.
   - **Katalog Restorasi (`/konservasi`)**: direktori spesifikasi produk sirkular dan indikator emisi karbon.

---

## Teknologi & Arsitektur

- **Runtime & Package Manager**: Bun v1.4.0
- **Framework Frontend**: Next.js 15 (App Router, React 19)
- **Styling**: Tailwind CSS v3, CSS variables HSL (Civic Forest Theme)
- **Komponen UI**: shadcn UI, Base UI (`@base-ui/react`), Lucide React icons
- **Pengujian**: Vitest, React Testing Library, jsdom
- **Kepatuhan Desain**: Anti-Slop R-02 (bebas karakter em-dash), tipografi Poppins Google Fonts, angka telemetri `tabular-nums`

---

## Skrip yang Tersedia

| Perintah | Deskripsi |
| :--- | :--- |
| `bun run dev` | Menjalankan Next.js development server pada port 3000 |
| `bun run build` | Audit tipe TypeScript dan kompilasi build produksi Next.js |
| `bun run start` | Menjalankan server Next.js mode produksi, jalankan setelah `bun run build` |
| `bun run test` | Menjalankan seluruh test suite Vitest, termasuk audit Anti-Slop |
| `bunx tsc --noEmit` | Audit tipe TypeScript saja, tanpa build |

> Skrip `lint` belum tersedia; lihat catatan pada langkah 7.