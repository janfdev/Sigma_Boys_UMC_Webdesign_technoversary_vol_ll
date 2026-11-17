import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomeInsightSection from "@/components/HomeInsightSection";

describe("HomeInsightSection", () => {
  it("links the featured card to the Ciremai article", () => {
    render(<HomeInsightSection />);
    const cta = screen.getByRole("link", { name: /Baca Selengkapnya/i });
    expect(cta).toHaveAttribute("href", "/insight/gunung-ciremai");
    expect(screen.getByText(/Menjaga Gunung Ciremai/i)).toBeTruthy();
  });

  it("renders the archive once, under a single heading", () => {
    render(<HomeInsightSection />);
    expect(screen.getAllByText(/Informasi Terkini untuk Lingkungan/i)).toHaveLength(1);
    expect(screen.getByText(/Paving Block Berbahan Limbah Plastik/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /Pelajari Riset/i })).toHaveAttribute(
      "href",
      "/insight/paving-block-umc"
    );
    expect(screen.getByText(/Zero Waste untuk Masa Depan/i)).toBeTruthy();
    expect(screen.getByText(/Mengubah Botol Plastik Bekas/i)).toBeTruthy();
  });
});