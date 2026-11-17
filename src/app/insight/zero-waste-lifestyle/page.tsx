import type { Metadata } from "next";
import ArticlePage from "@/components/ArticlePage";
import { getArticle } from "@/data/articleData";

export const metadata: Metadata = {
  title: "Mulai dari Kebiasaan Kecil: Mengenal Gaya Hidup Zero Waste | CircuLife",
  description:
    "Panduan praktis penerapan gaya hidup minim sampah: kerangka 5R, tiga langkah harian, pengelolaan sampah organik, dan dampaknya bagi beban TPA daerah.",
};

export default function Page() {
  return <ArticlePage article={getArticle("zero-waste-lifestyle")!} relatedLimit={3} />;
}
