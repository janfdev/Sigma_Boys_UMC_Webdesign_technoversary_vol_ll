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
  widget?: "hydrology" | "material-ratio" | "video";
  videoId?: string;
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
  tags?: string[];
  appreciationBase?: number;
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

export const PAVING_ARTICLE: ConservationArticle = {
  slug: "paving-block-umc",
  breadcrumb: ["Beranda", "Insight", "Pengelolaan Sampah"],
  badge: "Pengelolaan Sampah & Eksplorasi Kebijakan",
  location: "Cirebon, Jawa Barat",
  title: "Dari Sampah Menjadi Manfaat: Mahasiswa UMC Membuat Paving Block Berbahan Limbah Plastik",
  lead:
    "Inisiatif mahasiswa Kuliah Kerja Nyata (KKN) 33 Universitas Muhammadiyah Cirebon (UMC) mengolah limbah plastik rumah tangga menjadi produk paving block bernilai guna dan ramah lingkungan.",
  author: "Tim Riset CircuLife & KKN 33 UMC",
  date: "20 Februari 2026",
  dateTime: "2026-02-20",
  readTime: "5 menit baca",
  topic: "Divisi Investigasi Tapak",
  image: {
    src: "/image-lomba/pemasangan-paving.png",
    alt: "Paving block berbahan limbah plastik dipasang di jalan lingkungan oleh mahasiswa KKN 33 UMC",
    caption: "Paving block berbahan limbah plastik rumah tangga dipasang di jalan lingkungan kampung.",
    credit: "DOC: KKN 33 UMC X CIRCULIFE",
  },
  stats: [],
  tags: ["KKN33UMC", "PavingBlockPlastik", "EkonomiSirkular", "InovasiLimbah"],
  appreciationBase: 48,
  sections: [
    {
      id: "konteks",
      index: "01",
      tag: "Urgensi & Latar Belakang",
      heading: "Urgensi Pengelolaan Sampah dari Hulu dan Beban TPA",
      paragraphs: [
        "Penumpukan sampah plastik dimulai dari titik paling dekat dengan kehidupan sehari-hari: dapur rumah tangga, warung kelontong, dan pos ronda rukun tetangga. Kemasan sekali pakai menumpuk setiap hari dalam kantong tercampur, sehingga ketika sampai di tempat pemrosesan akhir (TPA) nilainya sudah hilang: basah, kotor, dan sulit dipisahkan.",
        "Karena itu pemilahan dari hulu menjadi kunci vital. Sampah terpilah sejak awal mengurangi beban TPA secara berkelanjutan sekaligus menciptakan bahan baku bersih bagi industri daur ulang. Paving block plastik buatan mahasiswa UMC membuktikan rantai ini bekerja: plastik yang dipilah warga menjadi input produksi, bukan residu yang ditimbun.",
      ],
    },
    {
      id: "formula",
      index: "02",
      tag: "Teknologi & Komposisi",
      heading: "Formula & Rekayasa Termal Paving Block Plastik",
      paragraphs: [
        "Cacahan plastik jenis Low-Density Polyethylene (LDPE) dan Polypropylene (PP) dilebur pada suhu terkontrol sebelum dicampur dengan agregat pasir. Suhu peleburan dijaga pada rentang 180 derajat sampai 220 derajat Celsius agar plastik meleleh merata tanpa terbakar, lalu adonan panas dicetak dan dipadatkan dengan mesin press.",
        "Produk yang dihasilkan tahan air (waterproof), bobotnya lebih ringan dibanding paving konvensional, dan biaya produksinya lebih efisien karena bahan baku utama berasal dari sampah terpilah warga.",
      ],
      quote: {
        text: "Inovasi ini membuktikan bahwa sampah plastik bukan akhir dari siklus materi, melainkan bahan baku bernilai ekonomi tinggi jika dikelola dengan teknologi tepat guna dan kepedulian sosial mandiri.",
        attribution: "Tim KKN 33 UMC 2026",
      },
      widget: "material-ratio",
    },
    {
      id: "dokumentasi",
      index: "03",
      tag: "Dokumentasi Lapangan",
      heading: "Dokumentasi Proses di Lapangan",
      paragraphs: [
        "Video di bawah merekam tahapan pencacahan, peleburan, dan pencetakan paving block oleh Mahasiswa KKN 33 UMC bersama warga.",
      ],
      widget: "video",
      videoId: "zvu01_wvbBc",
    },
    {
      id: "sirkularitas",
      index: "04",
      tag: "Ekosistem Berkelanjutan",
      heading: "Skema Sirkularitas dan Poin Bank Sampah",
      paragraphs: [
        "Pengumpulan sampah plastik warga diintegrasikan melalui sistem Bank Sampah: setiap setoran tercatat dan dikonversi menjadi insentif poin digital CircuLife. Mekanisme ini mendorong partisipasi aktif masyarakat karena nilai ekonomi sampah terlihat langsung, bukan janji di ujung rantai.",
        "Plastik terkumpul menjadi bahan baku paving block, paving block dipakai untuk fasilitas umum kampung, dan poin yang kembali ke warga menutup lingkaran insentifnya.",
      ],
    },
  ],
};

export const PAVING_RELATED: RelatedInsight[] = [
  {
    href: "/insight/zero-waste-lifestyle",
    title: "Mulai dari Kebiasaan Kecil, Mengenal Gaya Hidup Zero Waste untuk Masa Depan",
    excerpt:
      "Zero waste tidak berarti nol sampah sejak hari pertama. Ia tumbuh dari kebiasaan belanja, memilah, dan menolak kemasan sekali pakai.",
    category: "Gerakan Komunitas",
    readTime: "4 menit baca",
    image: "/image-lomba/gaya-hidup-zero-waste.webp",
    imageAlt: "Ilustrasi kampanye gaya hidup zero waste dengan tempat sampah terpilah",
  },
  {
    href: "/insight/upcycling-botol-plastik",
    title: "Mengubah Botol Plastik Bekas Menjadi Produk Kreatif Bernilai Guna",
    excerpt:
      "Botol PET yang biasanya berakhir di TPA bisa menjadi pot gantung, organizer, hingga lentera dengan alat sederhana.",
    category: "Inovasi Daur Ulang",
    readTime: "3 menit baca",
    image: "/image-lomba/kreasi-daur-ulang.png",
    imageAlt: "Kerajinan pot tanaman dari botol plastik bekas",
  },
];

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