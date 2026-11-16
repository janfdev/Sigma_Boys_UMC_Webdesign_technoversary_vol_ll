import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";
import LatestInsightSection from "../LatestInsightSection";
import { CIRCULIFE_ARTICLES } from "@/lib/constants";

describe("LatestInsightSection", () => {
  it("renders the section heading and every article headline", () => {
    render(<LatestInsightSection />);

    expect(screen.getByRole("heading", { name: /Informasi Terkini untuk Lingkungan/i })).toBeInTheDocument();

    for (const article of CIRCULIFE_ARTICLES) {
      expect(screen.getByText(article.title)).toBeInTheDocument();
    }
  });

  it("shows article metadata and CTA links", () => {
    render(<LatestInsightSection />);

    expect(screen.getAllByRole("link", { name: /Baca Selengkapnya/i }).length).toBe(1);
    expect(screen.getAllByText(/Teknologi Tepat Guna/i).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("img").length).toBeGreaterThan(0);
  });

  it("renders nothing when there are no articles", () => {
    const { container } = render(<LatestInsightSection articles={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});