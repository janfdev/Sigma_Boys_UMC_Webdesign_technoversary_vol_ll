import type { Metadata } from "next";
import ArticleBody from "@/components/ArticleBody";
import ArticleHero from "@/components/ArticleHero";
import RelatedArticles from "@/components/RelatedArticles";
import StatsGrid from "@/components/StatsGrid";
import { CIREMAI_ARTICLE, RELATED_INSIGHTS } from "@/data/articleData";

export const metadata: Metadata = {
  title: "Menjaga Gunung Ciremai, Menjaga Masa Depan Ekosistem | CircuLife",
  description:
    "Peran Gunung Ciremai (3.078 mdpl) sebagai menara air alami Jawa Barat: 54 titik mata air, fauna endemik, dan protokol nol sampah di jalur pendakian.",
};

export default function GunungCiremaiArticlePage() {
  return (
    <article className="pb-4">
      <ArticleHero article={CIREMAI_ARTICLE} />
      <StatsGrid article={CIREMAI_ARTICLE} stats={CIREMAI_ARTICLE.stats} />
      <ArticleBody article={CIREMAI_ARTICLE} />
      <RelatedArticles items={RELATED_INSIGHTS} />
    </article>
  );
}