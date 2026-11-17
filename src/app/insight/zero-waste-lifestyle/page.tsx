import type { Metadata } from "next";
import ArticleHeader from "@/components/insight/ArticleHeader";
import ArticleBody from "@/components/insight/ArticleBody";
import RelatedReadings from "@/components/insight/RelatedReadings";

export const metadata: Metadata = {
  title: "Mulai Dari Kebiasaan Kecil, Mengenal Gaya Hidup Zero Waste Untuk Masa Depan | CircuLife",
  description:
    "Panduan praktis dan edukasi penerapan gaya hidup minim sampah (zero waste) dalam keseharian melalui pendekatan 5R Framework, daftar langkah aksi bertahap, ilustrasi pemilahan sampah, dan pengelolaan sisa makanan dapur.",
  openGraph: {
    title: "Mulai Dari Kebiasaan Kecil, Mengenal Gaya Hidup Zero Waste Untuk Masa Depan | CircuLife",
    description:
      "Panduan praktis dan edukasi penerapan gaya hidup minim sampah (zero waste) dalam keseharian melalui pendekatan 5R Framework, daftar langkah aksi bertahap, dan pengelolaan sampah organik rumah tangga.",
    url: "https://circulife.abyte.my.id/insight/zero-waste-lifestyle",
    siteName: "CircuLife",
    images: [
      {
        url: "/image-lomba/zero-waste-lifestyle.jpg",
        width: 1200,
        height: 630,
        alt: "Ilustrasi Zero Waste Lifestyle CircuLife",
      },
    ],
    locale: "id_ID",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mulai Dari Kebiasaan Kecil, Mengenal Gaya Hidup Zero Waste Untuk Masa Depan",
    description:
      "Panduan praktis penerapan gaya hidup minim sampah (zero waste) dalam keseharian bersama CircuLife.",
    images: ["/image-lomba/zero-waste-lifestyle.jpg"],
  },
};

export default function ZeroWasteLifestyleArticlePage() {
  return (
    <article className="min-h-screen bg-[#0A110E] pb-16 text-[#F8FAFC]">
      <ArticleHeader />
      <ArticleBody />
      <RelatedReadings />
    </article>
  );
}
