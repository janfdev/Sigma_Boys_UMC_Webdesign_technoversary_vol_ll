export type ArticleStat = {
  label: string;
  value: string;
  note: string;
};

export type ArticleSection = {
  id: string;
  index: string;
  tag: string;
  heading: string;
  paragraphs: string[];
  quote?: { text: string; attribution: string };
  widget?: "hydrology";
};

export type RelatedInsight = {
  href: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  imageAlt: string;
};

export type ConservationArticle = {
  slug: string;
  breadcrumb: string[];
  badge: string;
  location: string;
  title: string;
  lead: string;
  author: string;
  date: string;
  dateTime: string;
  readTime: string;
  topic: string;
  image: { src: string; alt: string; caption: string; credit: string };
  stats: ArticleStat[];
  sections: ArticleSection[];
};

export const CIREMAI_ARTICLE: ConservationArticle = {
  slug: "gunung-ciremai",
  breadcrumb: ["Beranda", "Insight", "Konservasi Alam"],
  badge: "Konservasi Alam & Ketahanan Air",
  location: "Cirebon, Jawa Barat",
  title: "Menjaga Gunung Ciremai, Menjaga Masa Depan Ekosistem.",
  lead:
    "Peran vital atap Jawa Barat (3.078 mdpl) sebagai menara air alami bagi jutaan warga dan benteng perlindungan keanekaragaman hayati lereng timur.",
  author: "Tim Riset CircuLife & Balai TNGC",
  date: "12 Februari 2026",
  dateTime: "2026-02-12",
  readTime: "6 menit baca",
  topic: "Fokus Keberlanjutan Riset",
  image: {
    src: "/image-lomba/Gunung%20Ciremai.jpg",
    alt: "Panorama Gunung Ciremai dengan hamparan sawah terasering di lerengnya",
    caption:
      "Panorama Gunung Ciremai (3.078 mdpl) merangkul wilayah pertanian Jawa Barat dan sekitarnya.",
    credit: "DOC: TNGC X CIRCULIFE",
  },
  stats: [
    {
      label: "Titik Tertinggi",
      value: "3.078 mdpl",
      note: "Puncak tertinggi Jawa Barat",
    },
    {
      label: "Penyangga Mata Air",
      value: "54 Titik",
      note: "Menyuplai Majalengka & Kuningan",
    },
    {
      label: "Luas Kawasan",
      value: "14.841 Ha",
      note: "Taman nasional sejak 2004",
    },
    {
      label: "Fauna Endemik",
      value: ">25 Spesies",
      note: "Dilindungi undang-undang",
    },
  ],
  sections: [
    {
      id: "hidrologi",
      index: "01",
      tag: "Nilai Hidrologi Regional",
      heading: "Sabuk Hijau Penjaga Tata Air",
      paragraphs: [
        "Tutupan hutan di kawasan Gunung Ciremai bekerja seperti spons raksasa. Setiap tetes hujan yang jatuh di lereng tidak langsung meluncur ke hilir, tetapi meresap ke lapisan tanah, tersimpan di akuifer vulkanik, lalu keluar kembali sebagai mata air di kaki gunung sepanjang tahun. Karena itu Ciremai disebut menara air alami bagi Kabupaten Kuningan, Cirebon, Majalengka, dan Indramayu.",
        "Kontribusinya terasa pada layanan harian: PDAM Tirta Kamuning dan PDAM Tirta Giri Nata mengambil air baku dari kawasan ini, sementara 54.000 hektar sawah produktif di hilir bergantung pada debit irigasi yang stabil. Ketika tutupan hutan terganggu, yang turun bukan hanya volume air, tetapi juga kepastian jadwal tanam petani dan biaya pengolahan air bersih bagi rumah tangga.",
      ],
      quote: {
        text:
          "Kelestarian Ciremai bukan sekadar perlindungan rimba, melainkan jaminan ketahanan air dan kehidupan jutaan warga di kaki gunung.",
        attribution: "Manifesto Kajian Ekosistem Balai TNGC 2026",
      },
    },
    {
      id: "biodiversitas",
      index: "02",
      tag: "Biodiversitas & Fauna",
      heading: "Perlindungan Fauna Endemik & Patroli Tapak",
      paragraphs: [
        "Di bawah kanopi hutan pegunungan hidup satwa yang tidak ditemukan di tempat lain: Macan Tutul Jawa (Panthera pardus melas), Elang Jawa (Nisaetus bartelsi), dan Surili (Presbytis comata). Ketiganya bergantung pada hutan yang utuh dan bertingkat, dari lantai hutan sampai tajuk tinggi, sehingga fragmentasi jalur sekecil apa pun langsung memotong ruang jelajah mereka.",
        "Balai TNGC bersama Sintas Indonesia memantau populasi lewat jaringan kamera jebak (camera trap) yang dipasang bergilir di jalur-jalur satwa. Catatan perjumpaan, sidik, dan suara menjadi dasar evaluasi patroli. Di sisi lain, tekanan wisata dan perluasan kebun di batas kawasan terus diuji, sehingga patroli tapak menjadi pekerjaan harian, bukan kegiatan seremonial tahunan.",
        "Untuk memahami seberapa besar ketergantungan layanan ekosistem ini pada tutupan lahan, gunakan simulasi di bawah. Geser curah hujan dan bandingkan dua kondisi tutupan untuk melihat dampaknya terhadap debit mata air.",
      ],
      widget: "hydrology",
    },
    {
      id: "komunitas",
      index: "03",
      tag: "Keberlanjutan & Komunitas",
      heading: "Aksi Sirkular: Protokol Nol Sampah di Jalur Pendakian",
      paragraphs: [
        "Sekitar 40.000 pendaki mendaki Ciremai setiap tahun melalui empat jalur utama: Palutungan, Linggarjati, Linggasana, dan Apuy. Volume kunjungan sebesar itu menghasilkan timbulan sampah yang tidak bisa diserahkan pada proses alam, terutama kemasan sekali pakai dan sisa logistik kelompok.",
        "Zero Waste Expedition Protocol mengubah alurnya: logistik bawaan dicatat dengan barcode digital saat check in, sampah yang turun ditimbang dan dicocokkan dengan catatan tersebut, lalu fraksi organik diproses dengan biokonversi maggot BSF di basecamp sebelum kembali ke lereng sebagai kompos. Yang tersisa hanya residu anorganik yang benar-benar tidak dapat diolah.",
        "Pendekatan ini menutup lingkaran: kesadaran pendaki, data logistik, dan pengolahan sisa menjadi satu sistem yang bisa diaudit. Konservasi puncak akhirnya bergantung pada kedisiplinan jalur, bukan hanya pada luas kawasan yang dipagari.",
      ],
    },
  ],
};

export const RELATED_INSIGHTS: RelatedInsight[] = [
  {
    href: "/edukasi",
    title: "Mengubah Botol Bekas Jadi Produk Bernilai Tinggi",
    excerpt:
      "Alur pemilahan PET, pencacahan, sampai pencetakan paving block K-250 yang menyerap plastik dari lingkungan sekitar.",
    category: "Daur Ulang",
    readTime: "4 menit baca",
    image: "/image-lomba/Kolase%20Daur%20Ulang%20Plastik%20Menjadi%20Paving.png",
    imageAlt: "Kolase proses daur ulang plastik menjadi paving block",
  },
  {
    href: "/edukasi",
    title: "Lentera PET: Upcycling Botol Jadi Sumber Cahaya",
    excerpt:
      "Kriya sederhana dari botol PET bekas yang memberi penerangan alternatif dan nilai tambah bagi warga lereng.",
    category: "Upcycling",
    readTime: "3 menit baca",
    image: "/image-lomba/Lentera%20Bunga%20PET%20di%20Senja%20Hari.png",
    imageAlt: "Lentera bunga dari botol PET menyala saat senja",
  },
  {
    href: "/edukasi",
    title: "Maggot BSF: Biokonversi Sampah Organik di Lereng Ciremai",
    excerpt:
      "Larva Black Soldier Fly memangkas volume sisa organik dan menghasilkan kasgot sebagai pupuk persemaian bibit.",
    category: "Organik",
    readTime: "5 menit baca",
    image: "/image-lomba/larva-bsf.png",
    imageAlt: "Larva Black Soldier Fly pada media biokonversi",
  },
];