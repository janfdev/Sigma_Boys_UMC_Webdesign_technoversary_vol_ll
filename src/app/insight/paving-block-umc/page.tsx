import type { Metadata } from "next";
import ArticlePage from "@/components/ArticlePage";
import { getArticle } from "@/data/articleData";

export const metadata: Metadata = {
  title: "Dari Sampah Menjadi Manfaat: Mahasiswa UMC Membuat Paving Block | CircuLife",
  description:
    "Riset terapan KKN 33 UMC: limbah plastik rumah tangga diolah jadi paving block K-250 lewat formula 40/60, rekayasa termal 180-220 derajat, dan skema poin bank sampah.",
};

export default function Page() {
  return <ArticlePage article={getArticle("paving-block-umc")!} relatedLimit={2} />;
}
