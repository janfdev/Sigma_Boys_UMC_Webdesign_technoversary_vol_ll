import type { ConservationArticle, ArticleWidgetName } from "@/data/articleData";
import HydrologySimulator from "@/components/HydrologySimulator";
import MaterialRatioBar from "@/components/MaterialRatioBar";
import VideoEmbedSection from "@/components/VideoEmbedSection";
import ActionStepsList from "@/components/articleWidgets/ActionStepsList";
import FivePillarsGrid from "@/components/articleWidgets/FivePillarsGrid";
import InspirationGallery from "@/components/articleWidgets/InspirationGallery";
import PointBonusBanner from "@/components/articleWidgets/PointBonusBanner";
import SortingIllustration from "@/components/articleWidgets/SortingIllustration";
import UpcyclingFlowBar from "@/components/articleWidgets/UpcyclingFlowBar";
import UpcyclingStepGrid from "@/components/articleWidgets/UpcyclingStepGrid";

// Prop-less widgets plug in through this map, so new ones are one line of data plus one entry.
const PLAIN_WIDGETS: Record<string, () => React.ReactElement> = {
  pillars: FivePillarsGrid,
  "action-steps": ActionStepsList,
  sorting: SortingIllustration,
  flow: UpcyclingFlowBar,
  steps: UpcyclingStepGrid,
  gallery: InspirationGallery,
  points: PointBonusBanner,
};

function Widget({ name, videoId }: { name: ArticleWidgetName; videoId?: string }) {
  if (name === "hydrology") {
    return (
      <div className="mt-8">
        <HydrologySimulator />
      </div>
    );
  }
  if (name === "material-ratio") return <MaterialRatioBar />;
  if (name === "video" && videoId) return <VideoEmbedSection videoId={videoId} />;

  const Plain = PLAIN_WIDGETS[name];
  return Plain ? <Plain /> : null;
}

export default function ArticleBody({ article }: { article: ConservationArticle }) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 pt-14 sm:px-6 sm:pt-16">
      <div className="space-y-14">
        {article.sections.map((section) => (
          <section aria-labelledby={`${section.id}-heading`} id={section.id} key={section.id}>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
              {section.index} // {section.tag}
            </p>
            <h2
              className="mt-3 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
              id={`${section.id}-heading`}
            >
              {section.heading}
            </h2>

            <div className="mt-4 space-y-4">
              {section.paragraphs.map((paragraph) => (
                <p
                  className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8"
                  key={paragraph.slice(0, 40)}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {section.quote ? (
              <blockquote className="mt-6 rounded-r-xl border-l-4 border-primary bg-card p-5 sm:p-6">
                <p className="text-sm italic leading-7 text-foreground sm:text-base">
                  {section.quote.text}
                </p>
                <footer className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-primary">
                  / {section.quote.attribution}
                </footer>
              </blockquote>
            ) : null}

            {section.widgets?.map((name) => (
              <Widget key={name} name={name} videoId={section.videoId} />
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}