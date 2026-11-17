import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import InsightArchivePage from "@/app/insight/page";
import { ARTICLE_INSIGHTS, SUMMARY_INSIGHTS, relatedTo } from "@/data/insights";

describe("Insight archive", () => {
  it("links every article entry to its own page", () => {
    render(<InsightArchivePage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /Informasi Terkini untuk Lingkungan/i })
    ).toBeTruthy();

    for (const entry of ARTICLE_INSIGHTS) {
      const links = screen.getAllByRole("link", { name: new RegExp(entry.title.slice(0, 30), "i") });
      expect(links[0]).toHaveAttribute("href", `/insight/${entry.slug}`);
    }
  });

  it("expands every page-less summary inline with an anchor id", () => {
    const { container } = render(<InsightArchivePage />);

    for (const entry of SUMMARY_INSIGHTS) {
      const details = container.querySelector(`details#${entry.slug}`);
      expect(details?.querySelector("summary")?.textContent).toContain(entry.title.slice(0, 20));
      expect(details?.querySelector("p")?.textContent).toBe(entry.excerpt);
    }
  });

  it("never recommends the article you are already reading", () => {
    for (const entry of ARTICLE_INSIGHTS) {
      const related = relatedTo(entry.slug, 3);
      expect(related).toHaveLength(3);
      expect(related.map((item) => item.href)).not.toContain(`/insight/${entry.slug}`);
    }
  });
});
