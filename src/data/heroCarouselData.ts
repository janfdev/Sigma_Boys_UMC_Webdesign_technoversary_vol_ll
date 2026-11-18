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
      "Sampah plastik yang dibuang sembarangan dapat terbawa aliran air dan menumpuk di sungai. Kondisi ini mengancam ekosistem perairan, mengganggu kehidupan biota, serta menurunkan kualitas lingkungan.",
    impactTitle: "Dampak Lingkungan",
    impactDescription:
      "Merusak ekosistem sungai, mengancam biota air, dan meningkatkan risiko penyumbatan aliran air.",
  },
  {
    id: 2,
    image: "/carousel-hero/Gambar2.webp",
    badge: "KRISIS TPA",
    title: "Menumpuknya Sampah di Tempat Pembuangan Akhir",
    description:
      "Meningkatnya volume sampah rumah tangga dan plastik menyebabkan tempat pembuangan akhir semakin terbebani. Tanpa pengelolaan yang tepat, tumpukan sampah dapat menimbulkan pencemaran tanah, air, dan udara.",
    impactTitle: "Dampak Lingkungan",
    impactDescription:
      "Memicu pencemaran lingkungan, bau tidak sedap, serta peningkatan emisi gas dari timbunan sampah.",
  },
  {
    id: 3,
    image: "/carousel-hero/Gambar3.webp",
    badge: "AKSI BERSIH",
    title: "Bersama Bergerak Membersihkan Lingkungan",
    description:
      "Aksi bersih lingkungan merupakan bentuk kepedulian masyarakat dalam menjaga kebersihan alam. Melalui kegiatan gotong royong, relawan mengumpulkan sampah plastik dan limbah lainnya agar lingkungan kembali bersih dan sehat.",
    impactTitle: "Dampak Positif",
    impactDescription:
      "Meningkatkan kesadaran masyarakat, menjaga kebersihan lingkungan, dan membangun budaya gotong royong.",
  },
  {
    id: 4,
    image: "/carousel-hero/Gambar4.webp",
    badge: "PEMILAHAN SUMBER",
    title: "Mengubah Limbah Plastik Menjadi Material Baru",
    description:
      "Sampah plastik yang telah dikumpulkan dan dipilah dapat melalui proses pencucian, pencacahan, hingga pengolahan menjadi bahan baku baru. Proses ini membantu memperpanjang siklus penggunaan material plastik.",
    impactTitle: "Manfaat Daur Ulang",
    impactDescription:
      "Mengurangi kebutuhan bahan baku baru, menekan volume sampah, dan mendukung ekonomi sirkular.",
  },
  {
    id: 5,
    image: "/carousel-hero/Gambar5.webp",
    badge: "UPCYCLE",
    title: "Pemilahan Sampah Berdasarkan Jenis",
    description:
      "Pemilahan sampah merupakan langkah awal dalam pengelolaan limbah yang bertanggung jawab. Dengan memisahkan sampah organik, anorganik, dan bahan berbahaya, proses pengolahan serta daur ulang dapat dilakukan dengan lebih efektif.",
    impactTitle: "Manfaat Pemilahan",
    impactDescription:
      "Mempermudah proses daur ulang, mengurangi pencampuran limbah, dan meningkatkan nilai guna sampah.",
  },
  {
    id: 6,
    image: "/carousel-hero/Gambar6.webp",
    badge: "UPCYCLE PAVING",
    title: "Inovasi Kreatif Mengubah Sampah Menjadi Produk Bernilai",
    description:
      "Limbah plastik dapat dimanfaatkan menjadi berbagai produk inovatif seperti ecobrick, paving block berbahan plastik daur ulang, hingga kerajinan kreatif. Inovasi ini menunjukkan bahwa sampah memiliki potensi untuk dikembangkan menjadi sesuatu yang bernilai guna.",
    impactTitle: "Dampak Positif",
    impactDescription:
      "Mendorong kreativitas, membuka peluang usaha, dan meningkatkan nilai ekonomi dari limbah plastik.",
  },
  {
    id: 7,
    image: "/carousel-hero/Gambar7.webp",
    badge: "ZERO WASTE",
    title: "Penerapan Zero-Waste Lifestyle",
    description:
      "Zero-waste lifestyle merupakan gaya hidup yang berupaya meminimalkan produksi sampah melalui kebiasaan sederhana. Menggunakan tas belanja kain, botol minum pakai ulang, dan peralatan makan pribadi menjadi langkah nyata menjaga lingkungan.",
    impactTitle: "Dampak Positif",
    impactDescription:
      "Mengurangi penggunaan plastik sekali pakai, menghemat sumber daya, dan membentuk kebiasaan konsumsi berkelanjutan.",
  },
  {
    id: 8,
    image: "/carousel-hero/Gambar8.webp",
    badge: "BIOKONVERSI ORGANIK",
    title: "Pengolahan Sampah Organik Menjadi Kompos",
    description:
      "Sampah organik seperti sisa makanan, kulit buah, dan dedaunan dapat diolah melalui proses pengomposan. Hasilnya berupa pupuk alami yang dapat dimanfaatkan untuk menyuburkan tanah dan mendukung pertumbuhan tanaman.",
    impactTitle: "Dampak Positif",
    impactDescription:
      "Mengurangi timbunan sampah organik, meningkatkan kesuburan tanah, dan mendukung pertanian berkelanjutan.",
  },
  {
    id: 9,
    image: "/carousel-hero/Gambar9.webp",
    badge: "RESTORASI EKOSISTEM",
    title: "Mewujudkan Masa Depan Lingkungan yang Lebih Hijau",
    description:
      "Lingkungan yang bersih dan lestari merupakan hasil dari kepedulian serta tindakan berkelanjutan. Dengan mengurangi sampah, menerapkan daur ulang, dan menjaga alam, kita dapat menciptakan masa depan yang lebih sehat bagi generasi mendatang.",
    impactTitle: "Dampak Positif",
    impactDescription:
      "Menjaga keseimbangan ekosistem, meningkatkan kualitas hidup, dan mewariskan lingkungan yang lebih baik.",
  },
];
