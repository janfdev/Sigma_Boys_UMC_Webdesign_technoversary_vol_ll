import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomeInsightSection from "@/components/HomeInsightSection";
import { CIRCULIFE_ARTICLES } from "@/lib/constants";

describe("HomeInsightSection", () => {
  it("links the featured card to the Ciremai article", () => {
    render(<HomeInsightSection />);
    const cta = screen.getByRole("link", { name: /Baca Selengkapnya/i });
    expect(cta).toHaveAttribute("href", "/konservasi/gunung-ciremai");
    expect(screen.getByText(/Menjaga Gunung Ciremai/i)).toBeTruthy();
  });

  it("renders the archive once, under a single heading", () => {
    render(<HomeInsightSection />);
    expect(screen.getAllByText(/Informasi Terkini untuk Lingkungan/i)).toHaveLength(1);
    for (const article of CIRCULIFE_ARTICLES.slice(0, 4)) {
      expect(screen.getByText(article.title)).toBeTruthy();
    }
  });
});