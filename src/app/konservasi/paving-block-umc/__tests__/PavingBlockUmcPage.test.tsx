import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PavingBlockUmcArticlePage from "@/app/konservasi/paving-block-umc/page";

describe("Paving block UMC article page", () => {
  it("renders the headline, the 40/60 material ratio and the field video", () => {
    render(<PavingBlockUmcArticlePage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /Paving Block Berbahan Limbah Plastik/i })
    ).toBeTruthy();
    expect(screen.getByRole("img", { name: /40 persen limbah plastik, 60 persen pasir/i })).toBeTruthy();
    expect(screen.getByText(/40% Limbah Plastik/i)).toBeTruthy();
    expect(screen.getByText(/60% Pasir/i)).toBeTruthy();

    const frame = screen.getByTitle(/Dokumentasi proses pencacahan/i);
    expect(frame).toHaveAttribute("src", "https://www.youtube.com/embed/zvu01_wvbBc");
  });

  it("counts an appreciation click", () => {
    render(<PavingBlockUmcArticlePage />);

    const button = screen.getByRole("button", { name: /Apresiasi \(48\)/i });
    expect(button).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(button);

    const pressed = screen.getByRole("button", { name: /Apresiasi \(49\)/i });
    expect(pressed).toHaveAttribute("aria-pressed", "true");
  });
});