import type { ConservationArticle } from "@/data/articleData";
import HydrologySimulator from "@/components/HydrologySimulator";

export default function ArticleBody({ article }: { article: ConservationArticle }) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-14 sm:px-6 sm:pt-16">
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

            {section.widget === "hydrology" ? (
              <div className="mt-8">
                <HydrologySimulator />
              </div>
            ) : null}
          </section>
        ))}
      </div>
    </div>
  );
}