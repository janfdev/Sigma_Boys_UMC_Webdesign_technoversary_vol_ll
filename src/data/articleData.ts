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
  widgets?: ArticleWidgetName[];
  videoId?: string;
};

export type ArticleWidgetName =
  | "hydrology"
  | "material-ratio"
  | "video"
  | "pillars"
  | "action-steps"
  | "sorting"
  | "flow"
  | "steps"
  | "gallery"
  | "points";

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
      widgets: ["hydrology"],
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
      widgets: ["material-ratio"],
    },
    {
      id: "dokumentasi",
      index: "03",
      tag: "Dokumentasi Lapangan",
      heading: "Dokumentasi Proses di Lapangan",
      paragraphs: [
        "Video di bawah merekam tahapan pencacahan, peleburan, dan pencetakan paving block oleh Mahasiswa KKN 33 UMC bersama warga.",
      ],
      widgets: ["video"],
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

const ZERO_WASTE_ARTICLE: ConservationArticle = {
  slug: "zero-waste-lifestyle",
  breadcrumb: ["Beranda", "Insight", "Gerakan Komunitas"],
  badge: "Gerakan Komunitas & Gaya Hidup",
  location: "Edukasi Publik",
  title: "Mulai Dari Kebiasaan Kecil, Mengenal Gaya Hidup Zero Waste Untuk Masa Depan",
  lead:
    "Mengurangi timbulan sampah rumah tangga tidak selalu harus dimulai dari perubahan ekstrem yang memberatkan. Melalui kebiasaan harian yang terukur, siapa pun dapat berkontribusi nyata dalam menjaga kelestarian lingkungan dan menekan beban tempat pemrosesan akhir.",
  author: "Tim Edukasi CircuLife",
  date: "8 Februari 2026",
  dateTime: "2026-02-08",
  readTime: "4 menit baca",
  topic: "Divisi Kampanye & Komunitas",
  image: {
    src: "/image-lomba/zero-waste-lifestyle.jpg",
    alt: "Ilustrasi grafis bertuliskan ZERO WASTE LIFESTYLE dengan kolase ikon daur ulang berbentuk hati",
    caption:
      "Kampanye gaya hidup zero waste: perubahan kecil yang dijaga konsisten menggeser kebiasaan konsumsi harian.",
    credit: "DOKUMENTASI: TIM EDUKASI CIRCULIFE",
  },
  stats: [],
  tags: ["ZeroWasteIndonesia", "GayaHidupBerkelanjutan", "PilahSampah", "CircuLifeInsight"],
  appreciationBase: 64,
  sections: [
    {
      id: "filosofi",
      index: "01",
      tag: "Filosofi Dasar",
      heading: "Mengubah Paradigma: Bukan Sempurna, Tapi Konsisten",
      paragraphs: [
        "Gerakan Zero Waste kerap disalahpahami sebagai tuntutan hidup yang harus bebas sampah secara mutlak sejak hari pertama. Beban ekspektasi ini sering kali memicu keputusasaan sebelum kebiasaan sempat terbentuk. Padahal, filosofi zero waste sejatinya adalah proses bertahap untuk meminimalkan volume residu yang kita kirimkan ke Tempat Pemrosesan Akhir (TPA) melalui kesadaran penuh dalam memilih dan mengonsumsi barang.",
        "Hierarki pengelolaan sampah modern menempatkan langkah pencegahan di posisi teratas. Melalui penerapan kerangka kerja 5R (Refuse, Reduce, Reuse, Recycle, Rot), setiap individu diajak mengenali siklus hidup dari setiap kemasan yang masuk ke rumah dan memprioritaskan pemanfaatan kembali sebelum mempertimbangkan opsi daur ulang.",
      ],
      widgets: ["pillars"],
    },
    {
      id: "panduan-praktis",
      index: "02",
      tag: "Panduan Praktis",
      heading: "Tiga Langkah Sederhana yang Dapat Dimulai Hari Ini",
      paragraphs: [
        "Memulai transisi ke gaya hidup ramah lingkungan tidak menuntut Anda langsung membeli perlengkapan serba baru. Kunci keberhasilan terletak pada konsistensi membangun kebiasaan harian dari hal-hal yang paling mudah dikendalikan di sekitar kita.",
      ],
      quote: {
        text:
          "Kita tidak membutuhkan segelintir orang yang menjalankan zero waste secara sempurna. Kita membutuhkan jutaan orang yang melakukannya secara tidak sempurna namun dengan konsisten setiap hari.",
        attribution: "Anne Marie Bonneau, Zero Waste Chef",
      },
      widgets: ["action-steps", "sorting"],
    },
    {
      id: "kompos",
      index: "03",
      tag: "Kompos & Organik",
      heading: "Mengelola Sisa Makanan Dapur dari Sumbernya",
      paragraphs: [
        "Berdasarkan data Sistem Informasi Pengelolaan Sampah Nasional (SIPSN), lebih dari 40% hingga 50% komposisi sampah perkotaan di Indonesia didominasi oleh sampah organik dan sisa makanan rumah tangga. Ketika sampah organik ini tercampur dalam kantong plastik dan menumpuk di TPA tanpa sirkulasi udara, proses dekomposisi berlangsung secara anaerobik dan melepaskan gas metana (CH4), salah satu pemicu pemanasan global dengan daya rusak 28 kali lebih agresif dibanding karbon dioksida.",
        "Mengolah sisa makanan di rumah sejatinya tidak rumit dan tidak menimbulkan bau menyengat jika sirkulasi oksigen terjaga. Anda dapat memulainya lewat metode sederhana seperti lubang resapan biopori di halaman, pot komposter gerabah aerobik dengan penambahan mikroorganisme lokal (MOL), pembuatan larutan eco-enzyme serbaguna dari kulit buah, hingga biokonversi larva maggot BSF (Black Soldier Fly) skala komunitas yang mampu mengurai residu organik dengan sangat cepat sekaligus menghasilkan pupuk kasgot bernutrisi tinggi bagi tanaman.",
      ],
    },
    {
      id: "dampak-tpa",
      index: "04",
      tag: "Dampak Ekosistem",
      heading: "Dampak Nyata pada Pengurangan Beban TPA Daerah",
      paragraphs: [
        "Setiap kilogram sampah organik yang dikomposkan di rumah dan setiap botol plastik yang dialihkan ke bank sampah adalah kontribusi nyata dalam memperpanjang usia operasional TPA di berbagai wilayah Indonesia. Lebih dari sekadar menjaga estetika kebersihan lingkungan, gaya hidup zero waste memutus siklus konsumsi linier ambil-pakai-buang dan mengaktifkan rantai pasok ekonomi sirkular yang inklusif.",
        "Melalui integrasi platform digital CircuLife, sampah anorganik terpilah Anda dapat disetorkan untuk dikonversi menjadi material bernilai guna seperti paving block berstandar teknik, sementara limbah organik kembali menjadi nutrisi penyubur tanah. Lingkaran keberlanjutan ini tidak bermula dari kebijakan yang rumit, melainkan dari satu keputusan kecil yang Anda ambil di dapur hari ini.",
      ],
    },
  ],
};

const UPCYCLING_ARTICLE: ConservationArticle = {
  slug: "upcycling-botol-plastik",
  breadcrumb: ["Beranda", "Insight", "Inovasi Daur Ulang"],
  badge: "Inovasi Daur Ulang",
  location: "Panduan Kreatif",
  title: "Mengubah Botol Plastik Bekas Menjadi Produk Kreatif Bernilai Guna",
  lead:
    "Botol plastik jenis Polyethylene Terephthalate (PET, kode daur ulang #1) memiliki ketahanan fisik dan kejernihan material yang ideal untuk diolah kembali. Melalui sentuhan kreativitas dan teknik pemotongan sederhana, limbah kemasan air mineral dapat ditransformasikan menjadi pot hidroponik sistem sumbu, wadah alat tulis meja, kap lampu hias teras, hingga celengan karakter yang estetis dan bernilai ekonomi sirkular.",
  author: "Tim Kreatif CircuLife",
  date: "14 Februari 2026",
  dateTime: "2026-02-14",
  readTime: "3 menit baca",
  topic: "Divisi Edukasi & Inovasi Sirkular",
  image: {
    src: "/image-lomba/kreasi-daur-ulang.png",
    alt: "Ragam kreasi kerajinan dari botol plastik bekas termasuk pot tanaman gantung dan celengan karakter",
    caption:
      "Ragam kreasi upcycling botol plastik bekas menjadi produk dekoratif dan fungsional rumah tangga.",
    credit: "DOKUMENTASI: STUDIO KREATIF CIRCULIFE",
  },
  stats: [],
  tags: ["UpcyclingIndonesia", "DaurUlangPlastik", "KriyaSirkular", "CircuLifeInsight"],
  appreciationBase: 52,
  sections: [
    {
      id: "konsep-upcycling",
      index: "01",
      tag: "Konsep Upcycling",
      heading: "Dari Sampah Konsumsi Menjadi Elemen Dekorasi Fungsional",
      paragraphs: [
        "Botol plastik berbahan Polyethylene Terephthalate (PET) adalah salah satu jenis sampah anorganik yang paling melimpah di lingkungan perkotaan. Sifat fisiknya yang transparan, lentur namun tidak mudah pecah, serta kedap air menjadikannya material dasar yang sangat mumpuni untuk proyek kerajinan tangan (upcycling) daripada sekadar dibuang menumpuk di tempat sampah.",
        "Berbeda dari proses daur ulang industri (recycling) yang memerlukan proses pencacahan dan peleburan termal berenergi tinggi, kriya daur ulang mandiri memanfaatkan bentuk utuh botol. Dengan memotong, merapikan tepi, dan merakit ulang komponennya, kita dapat mempertahankan 95% massa material tanpa menghasilkan emisi karbon tambahan.",
      ],
      widgets: ["flow"],
    },
    {
      id: "tutorial",
      index: "02",
      tag: "Tutorial Praktis",
      heading: "Panduan Langkah Demi Langkah: Pot Hidroponik Sumbu (Wick System)",
      paragraphs: [
        "Untuk memulai proyek ini, siapkan alat dan bahan sederhana yang mudah ditemukan di rumah: satu buah botol PET bekas ukuran 1,5 liter, gunting atau cutter tajam, potongan kain flanel atau sumbu kompor berukuran 2 x 20 cm, solder atau paku yang dipanaskan untuk membuat lubang, serta cat akrilik tahan air (opsional) untuk menghias bagian luar.",
      ],
      widgets: ["steps"],
    },
    {
      id: "inspirasi",
      index: "03",
      tag: "Inspirasi Produk",
      heading: "Inspirasi Wadah Alat Tulis & Kap Lampu Hias Teras",
      paragraphs: [
        "Selain pot tanaman, karakteristik dasar botol PET yang memiliki lekukan kontur bunga di bagian bawahnya memberikan ruang eksplorasi bentuk geometris yang sangat menarik untuk elemen dekorasi meja maupun instalasi pencahayaan ruangan.",
      ],
      quote: {
        text:
          "Kreativitas sejati dalam ekonomi sirkular bukan tentang menciptakan sampah baru yang cantik, melainkan melihat potensi fungsi baru di balik material yang dianggap tak lagi bernilai.",
        attribution: "Divisi Inovasi Produk CircuLife",
      },
      widgets: ["gallery"],
    },
    {
      id: "dampak-ekonomi",
      index: "04",
      tag: "Dampak & Nilai Ekonomi",
      heading: "Dampak Lingkungan dan Potensi Penjualan di Bazar Komunitas",
      paragraphs: [
        "Setiap kali Anda mengolah satu botol plastik 1,5 liter menjadi produk fungsional, Anda telah mencegah pelepasan sekitar 50 gram gas rumah kaca ekuivalen yang biasanya tercipta selama proses ekstraksi minyak bumi untuk produksi botol baru. Dalam skala kolektif rukun warga, pengalihan ratusan botol dari TPA secara langsung menjaga kebersihan drainase lingkungan dan memangkas risiko sumbatan banjir saat musim hujan.",
        "Lebih jauh lagi, produk kriya berbahan botol PET terbukti memiliki daya tarik komersial yang nyata. Pot hidroponik yang dihias rapi bersama bibit sayur selada atau pakcoy siap panen biasa laku dijual pada kisaran Rp15.000 hingga Rp45.000 per unit di bazar komunitas perkotaan, pasar kaget Car Free Day, dan pameran sekolah, membuka peluang ekonomi kreatif mandiri bagi kelompok ibu rumah tangga dan pemuda karang taruna.",
      ],
      widgets: ["points"],
    },
  ],
};

// Every article with a real route, in archive order.
export const ARTICLES: ConservationArticle[] = [
  CIREMAI_ARTICLE,
  PAVING_ARTICLE,
  ZERO_WASTE_ARTICLE,
  UPCYCLING_ARTICLE,
];

export const getArticle = (slug: string) => ARTICLES.find((item) => item.slug === slug);
