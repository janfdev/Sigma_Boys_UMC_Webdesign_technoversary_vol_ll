import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import CircuLifeLogo from "../CircuLifeLogo";

describe("CircuLifeLogo Component", () => {
  it("should render the logo mark image with accessibility attributes", () => {
    const { container } = render(<CircuLifeLogo />);
    const img = container.querySelector("img");

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/brand/circulife-mark.png");
    expect(img).toHaveAttribute("alt", "CircuLife Logo Mark");
  });

  it("should render with wordmark when showWordmark is true", () => {
    render(<CircuLifeLogo showWordmark={true} />);

    expect(screen.getByText("CIRCULIFE")).toBeInTheDocument();
  });

  it("should render subtitle tag when showTag is true", () => {
    render(<CircuLifeLogo showWordmark={true} showTag={true} />);

    expect(screen.getByText(/Zero Waste & Value Hub/i)).toBeInTheDocument();
  });
});
