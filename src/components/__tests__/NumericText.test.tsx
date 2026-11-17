import React from "react";
import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { NumericText } from "../NumericText";

describe("quantitative UI text", () => {
  it("formats amounts, decimals, signs, ranges and units in Indonesian", () => {
    const { container } = render(<NumericText text="1.200 kg; 850 m²; -94%; +42.8 ton; 1.100 - 3.078 mdpl; 0; 01; 6.0%" />);
    expect(container.textContent).toBe("1.200 kg; 850 m²; -94%; +42,8 ton; 1.100 - 3.078 mdpl; 0; 01; 6,0%");
  });

  it("animates percentage values while preserving their percent suffix", () => {
    const { container } = render(<NumericText text="88%; -94%" />);
    expect(container.textContent).toBe("88%; -94%");
    expect(container.querySelectorAll('[data-slot="animated-number"]')).toHaveLength(2);
  });

  it("preserves ambiguous grouped numbers and excessive precision verbatim", () => {
    const text = "1,200.50 kg; 1,234,567 kg; 0." + "1".repeat(101);
    const { container } = render(<NumericText text={text} />);
    expect(container.textContent).toBe(text);
    expect(container.querySelector('[data-slot="animated-number"]')).toBeNull();
  });

  it("preserves standards, dates, phones, formulas and names", () => {
    const text = "K-250 / SNI 03-0691-1996 / ISO 19867-1 / CO2e / P2O5 / CH4 / RW 04 / 0812-9900-2026 / Oktober 2026 / 07.00 - 18.00 WIB";
    const { container } = render(<NumericText text={text} />);
    expect(container.textContent).toBe(text);
    expect(container.querySelector('[data-slot="animated-number"]')).toBeNull();
  });

  it("renders final server values and immediately retargets under reduced motion", () => {
    expect(renderToString(<NumericText text="142.5 Ton" />)).toContain("142,5");
    const { rerender } = render(<NumericText text="142.5 Ton" />);
    expect(screen.getByText("142,5")).toHaveTextContent("142,5");
    rerender(<NumericText text="0 Ton" />);
    expect(screen.getByText("0")).toHaveTextContent("0");
  });
});
