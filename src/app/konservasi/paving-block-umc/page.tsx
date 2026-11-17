import type { Metadata } from "next";
import ArticleBody from "@/components/ArticleBody";
import ArticleBottomBar from "@/components/ArticleBottomBar";
import ArticleHero from "@/components/ArticleHero";
import RelatedArticles from "@/components/RelatedArticles";
import StatsGrid from "@/components/StatsGrid";
import { PAVING_ARTICLE, PAVING_RELATED } from "@/data/articleData";

export const metadata: Metadata = {
  title: "Dari Sampah Menjadi Manfaat: Mahasiswa UMC Membuat Paving Block | CircuLife",
  description:
    "Riset terapan KKN 33 UMC: limbah plastik rumah tangga diolah jadi paving block K-250 lewat formula 40/60, rekayasa termal 180-220 derajat, dan skema poin bank sampah.",
};

export default function PavingBlockUmcArticlePage() {
  return (
    <article className="pb-4">
      <ArticleHero article={PAVING_ARTICLE} />
      <StatsGrid article={PAVING_ARTICLE} stats={PAVING_ARTICLE.stats} />
      <ArticleBody article={PAVING_ARTICLE} />
      <ArticleBottomBar
        appreciationBase={PAVING_ARTICLE.appreciationBase ?? 0}
        tags={PAVING_ARTICLE.tags ?? []}
      />
      <RelatedArticles columns={2} items={PAVING_RELATED} />
    </article>
  );
}
