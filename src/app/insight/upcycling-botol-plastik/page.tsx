import type { Metadata } from "next";
import ArticlePage from "@/components/ArticlePage";
import { getArticle } from "@/data/articleData";

export const metadata: Metadata = {
  title: "Mengubah Botol Plastik Bekas Menjadi Produk Kreatif Bernilai Guna | CircuLife",
  description:
    "Panduan kriya botol PET: alur transformasi material, tutorial pot hidroponik sumbu, galeri inspirasi, sampai potensi penjualan di bazar komunitas.",
};

export default function Page() {
  return <ArticlePage article={getArticle("upcycling-botol-plastik")!} relatedLimit={3} />;
}
