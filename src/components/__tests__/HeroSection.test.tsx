import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HeroSection from "../HeroSection";

describe("HeroSection Component", () => {
  it("renders hero headings, CTA buttons, and carousel cards", () => {
    render(<HeroSection />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Sampah Bukan Akhir.");
    expect(screen.getByRole("link", { name: /Mulai Pilah/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Lihat Alur Daur Ulang/i })).toBeInTheDocument();
  });

  it("opens HeroDetailModal when a carousel slide is selected", () => {
    render(<HeroSection />);

    // Initially modal is not open
    expect(screen.queryByRole("dialog")).toBeNull();

    // Find and click one of the carousel slide buttons
    const slideButtons = screen.getAllByRole("button", { name: /Pencemaran Sungai/i });
    expect(slideButtons.length).toBeGreaterThan(0);
    fireEvent.click(slideButtons[0]);

    // Modal dialog should now be visible
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByTestId("hero-modal-counter")).toHaveTextContent("01 / 09");
  });
});
