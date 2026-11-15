import { describe, it, expect, beforeEach, vi } from "vitest";

beforeEach(() => {
  vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: true }));
});
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import EnvironmentalComparisonSlider from "../EnvironmentalComparisonSlider";

describe("EnvironmentalComparisonSlider Component", () => {
  it("should render heading, before condition, and after condition tags", () => {
    render(<EnvironmentalComparisonSlider />);

    expect(
      screen.getByText(/Transformasi Nyata: Dari Timbunan Liar Menjadi Jalur Sirkular/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/SEBELUM : TIMBUNAN SAMPAH LIAR/i)).toBeInTheDocument();
    expect(screen.getByText(/SESUDAH : INTERVENSI CIRCULIFE/i)).toBeInTheDocument();
  });

  it("should change slider position when clicking quick preset buttons", () => {
    render(<EnvironmentalComparisonSlider />);

    const beforePreset = screen.getByRole("button", { name: /Kondisi Awal/i });
    fireEvent.click(beforePreset);
    expect(screen.getByRole("slider", { name: /Posisi slider/ })).toHaveValue("0");

    const afterPreset = screen.getByRole("button", { name: /Hasil Sirkular/i });
    fireEvent.click(afterPreset);
    expect(screen.getByRole("slider", { name: /Posisi slider/ })).toHaveValue("100");

    const balancedPreset = screen.getByRole("button", { name: /50 : 50/i });
    fireEvent.click(balancedPreset);
    expect(screen.getByRole("slider", { name: /Posisi slider/ })).toHaveValue("50");
  });

  it("supports the comparison handle keyboard and reveals the correct endpoint", () => {
    const { container } = render(<EnvironmentalComparisonSlider />);
    const handle = screen.getByRole("slider", { name: /Image comparison slider/i });
    fireEvent.keyDown(handle, { key: "ArrowRight", shiftKey: true });
    expect(handle).toHaveAttribute("aria-valuenow", "60");
    fireEvent.click(screen.getByRole("button", { name: /Hasil Sirkular/i }));
    expect(handle).toHaveAttribute("aria-valuenow", "0");
    expect(container.querySelector('[data-slot="image-compare"] > div[style*="clip-path"]')).toHaveStyle({ clipPath: "inset(0 0 0 0%)" });
    expect(container.querySelector('[data-slot="image-compare"] > div[style*="clip-path"] img[alt*="restorasi"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="image-compare"]')).toBeInTheDocument();
  });

  it("should update slider position via range input slider", () => {
    render(<EnvironmentalComparisonSlider />);

    const slider = screen.getByLabelText(/Posisi slider pembanding restorasi/i);
    fireEvent.change(slider, { target: { value: "75" } });

    expect(screen.getByRole("slider", { name: /Posisi slider/ })).toHaveValue("75");
    expect(screen.getByRole("slider", { name: /Image comparison/ })).toHaveAttribute("aria-valuenow", "25");
  });
});
