export interface HeroCarouselItem {
  id: number;
  image: string; // Path mengarah ke file asli di folder carousel-hero
  badge: string; // Misal: "UPCYCLE", "EDUKASI", "KONSERVASI", "DAUR ULANG"
  title: string;
  description: string;
  impactTitle: string; // Default: "Dampak Lingkungan"
  impactDescription: string;
}

export const HERO_CAROUSEL_DATA: HeroCarouselItem[] = [
  {
    id: 1,
    image: "/carousel-hero/Gambar1.webp",
    badge: "PENCEMARAN SUNGAI",
    title: "Pencemaran Sungai oleh Sampah Plastik",
    description:
      "Sampah plastik yang dibuang sembarangan terbawa aliran air dan menumpuk di sungai. Kondisi ini mengancam ekosistem perairan, merusak habitat ikan, serta menurunkan kualitas air bersih bagi masyarakat sekitar.",
    impactTitle: "Dampak Lingkungan",
    impactDescription:
      "Merusak ekosistem sungai, mengancam kehidupan biota air, dan meningkatkan risiko penyumbatan aliran air pemicu banjir bandang.",
  },
  {
    id: 2,
    image: "/carousel-hero/Gambar2.webp",
    badge: "KRISIS TPA",
    title: "Krisis Penumpukan di Tempat Pembuangan Akhir",
    description:
      "Gunungan sampah campuran tanpa pemilahan terus menggunung hingga melampaui kapasitas tampung TPA. Gas metana yang terperangkap memicu potensi kebakaran dan pencemaran air tanah akibat rembesan air lindi beracun.",
    impactTitle: "Dampak Lingkungan",
    impactDescription:
      "Pelepasan gas rumah kaca metana berdaya rusak tinggi, pencemaran air lindi ke air tanah warga, dan hilangnya ruang terbuka hijau.",
  },
  {
    id: 3,
    image: "/carousel-hero/Gambar3.webp",
    badge: "AKSI BERSIH",
    title: "Aksi Relawan Bersih Pantai & Pesisir",
    description:
      "Inisiatif pembersihan pantai oleh relawan komunitas CircuLife untuk mencegah sampah plastik terbawa ombak ke laut lepas. Setiap botol dan kemasan yang dipungut langsung disalurkan ke fasilitas pemilahan sirkular.",
    impactTitle: "Dampak Lingkungan",
    impactDescription:
      "Mencegah mikroplastik masuk ke rantai makanan laut dan menyelamatkan satwa pesisir dari bahaya terjerat limbah anorganik.",
  },
  {
    id: 4,
    image: "/carousel-hero/Gambar4.webp",
    badge: "PEMILAHAN SUMBER",
    title: "Pemilahan Sampah dari Rumah Tangga",
    description:
      "Langkah mendasar circular economy dimulai dari pemilahan di tingkat rumah tangga: memisahkan botol plastik PET bersih, kardus, dan limbah organik agar memiliki nilai daur ulang maksimal sebelum diangkut.",
    impactTitle: "Dampak Lingkungan",
    impactDescription:
      "Meningkatkan efisiensi daur ulang material hingga 85% dan mengurangi beban residu yang harus dikirim ke tempat pembuangan akhir.",
  },
  {
    id: 5,
    image: "/carousel-hero/Gambar5.webp",
    badge: "TEKNOLOGI SIRKULAR",
    title: "Fasilitas Pemilahan Otomatis Berbasis Sensor",
    description:
      "Konveyor otomatis dan sensor optik memisahkan jenis plastik berdasarkan polimer PET, HDPE, dan PP dengan presisi tinggi. Teknologi ini memastikan bahan baku cacahan plastik bebas kontaminan untuk proses manufaktur.",
    impactTitle: "Dampak Lingkungan",
    impactDescription:
      "Menghasilkan bahan baku daur ulang berkualitas tinggi, menekan konsumsi energi pengolahan, dan mempercepat siklus ekonomi sirkular.",
  },
  {
    id: 6,
    image: "/carousel-hero/Gambar6.webp",
    badge: "UPCYCLE PAVING",
    title: "Inovasi Eco-Paving Block Kuat Tekan K-250",
    description:
      "Pemanfaatan cacahan limbah plastik kemasan dan kresek yang dilebur bersama pasir silika menghasilkan paving block berstandar kuat tekan K-250 untuk infrastruktur jalan setapak desa dan trotoar perkotaan.",
    impactTitle: "Dampak Lingkungan",
    impactDescription:
      "Menyerap 2,5 kg limbah plastik per unit paving, mencegah pembakaran sampah liar, serta menyediakan material konstruksi ramah lingkungan.",
  },
  {
    id: 7,
    image: "/carousel-hero/Gambar7.webp",
    badge: "ZERO WASTE",
    title: "Gaya Hidup Zero Waste Mandiri",
    description:
      "Membiasakan penggunaan perlengkapan guna ulang seperti kantong belanja kain, tumbler tahan panas, alat makan kayu, dan beeswax wrap untuk menggantikan plastik sekali pakai dalam rutinitas harian.",
    impactTitle: "Dampak Lingkungan",
    impactDescription:
      "Mengurangi timbulan sampah plastik harian per kapita hingga 70% dan membentuk budaya konsumsi yang bertanggung jawab.",
  },
  {
    id: 8,
    image: "/carousel-hero/Gambar8.webp",
    badge: "BIOKONVERSI ORGANIK",
    title: "Komposter Organik Rumah Tangga & Kasgot",
    description:
      "Pengolahan sisa makanan, kulit buah, dan sampah dapur menggunakan komposter aerob atau biokonversi larva Maggot BSF menghasilkan pupuk kasgot kaya hara untuk persemaian bibit pohon penghijauan.",
    impactTitle: "Dampak Lingkungan",
    impactDescription:
      "Menghentikan pembentukan gas metana di TPA dari sampah organik yang membusuk, serta menyuburkan tanah secara alami tanpa bahan kimia sintetis.",
  },
  {
    id: 9,
    image: "/carousel-hero/Gambar9.webp",
    badge: "RESTORASI EKOSISTEM",
    title: "Restorasi Ekosistem Sungai dan Sabuk Hijau",
    description:
      "Hasil nyata dari penghentian pembuangan sampah sembarangan dan pemulihan sabuk hijau: aliran sungai kembali jernih, keanekaragaman hayati pulih, dan ruang hijau menjadi oase berkelanjutan bagi generasi mendatang.",
    impactTitle: "Dampak Lingkungan",
    impactDescription:
      "Menjaga kualitas sumber air tawar alami, merehabilitasi habitat flora-fauna endemik, serta menciptakan lingkungan hidup yang asri dan tangguh iklim.",
  },
];
