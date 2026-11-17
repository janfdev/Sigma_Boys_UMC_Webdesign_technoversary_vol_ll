import type { Metadata } from "next";
import ArticlePage from "@/components/ArticlePage";
import { getArticle } from "@/data/articleData";

export const metadata: Metadata = {
  title: "Menjaga Gunung Ciremai, Menjaga Masa Depan Ekosistem | CircuLife",
  description:
    "Peran Gunung Ciremai (3.078 mdpl) sebagai menara air alami Jawa Barat: 54 titik mata air, fauna endemik, dan protokol nol sampah di jalur pendakian.",
};

export default function Page() {
  return <ArticlePage article={getArticle("gunung-ciremai")!} relatedLimit={3} />;
}
