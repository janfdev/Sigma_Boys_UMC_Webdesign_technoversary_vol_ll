import type { Metadata } from "next";
import UpcyclingArticleHeader from "@/components/insight/upcycling/UpcyclingArticleHeader";
import UpcyclingArticleBody from "@/components/insight/upcycling/UpcyclingArticleBody";
import RelatedEnvironment from "@/components/insight/upcycling/RelatedEnvironment";

export const metadata: Metadata = {
  title: "MENGUBAH BOTOL PLASTIK BEKAS MENJADI PRODUK KREATIF BERNILAI GUNA | CircuLife",
  description:
    "Panduan praktis DIY upcycling botol plastik bekas (PET #1) menjadi pot hidroponik sistem sumbu, wadah alat tulis, kap lampu hias teras, dan estimasi nilai jual di bazar komunitas.",
  openGraph: {
    title: "MENGUBAH BOTOL PLASTIK BEKAS MENJADI PRODUK KREATIF BERNILAI GUNA | CircuLife",
    description:
      "Tutorial langkah demi langkah mengolah botol plastik bekas menjadi produk fungsional ramah lingkungan.",
    url: "https://circulife.abyte.my.id/insight/upcycling-botol-plastik",
    siteName: "CircuLife",
    images: [
      {
        url: "/image-lomba/kreasi-daur-ulang.png",
        width: 1200,
        height: 630,
        alt: "Ragam kreasi daur ulang botol plastik bekas CircuLife",
      },
    ],
    locale: "id_ID",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "MENGUBAH BOTOL PLASTIK BEKAS MENJADI PRODUK KREATIF BERNILAI GUNA",
    description:
      "Panduan praktis kriya sirkular dan upcycling botol plastik bekas bersama CircuLife.",
    images: ["/image-lomba/kreasi-daur-ulang.png"],
  },
};

export default function UpcyclingBotolPlastikArticlePage() {
  return (
    <article className="min-h-screen bg-[#0A110E] pb-16 text-[#F8FAFC]">
      <UpcyclingArticleHeader />
      <UpcyclingArticleBody />
      <RelatedEnvironment />
    </article>
  );
}
