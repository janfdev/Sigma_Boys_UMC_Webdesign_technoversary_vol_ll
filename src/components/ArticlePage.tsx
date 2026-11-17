import ArticleBody from "@/components/ArticleBody";
import ArticleBottomBar from "@/components/ArticleBottomBar";
import ArticleHero from "@/components/ArticleHero";
import RelatedArticles from "@/components/RelatedArticles";
import StatsGrid from "@/components/StatsGrid";
import type { ConservationArticle } from "@/data/articleData";
import { relatedTo } from "@/data/insights";

/** Shared shell for every insight article: hero, stats, body, reactions, recommendations. */
export default function ArticlePage({
  article,
  relatedLimit = 3,
}: {
  article: ConservationArticle;
  relatedLimit?: 2 | 3;
}) {
  const hasTags = Boolean(article.tags?.length);

  return (
    <article className="pb-4">
      <ArticleHero article={article} />
      <StatsGrid article={article} stats={article.stats} />
      <ArticleBody article={article} />
      {hasTags ? (
        <ArticleBottomBar
          appreciationBase={article.appreciationBase ?? 0}
          tags={article.tags ?? []}
        />
      ) : null}
      <RelatedArticles
        columns={relatedLimit === 2 ? 2 : 3}
        items={relatedTo(article.slug, relatedLimit)}
      />
    </article>
  );
}