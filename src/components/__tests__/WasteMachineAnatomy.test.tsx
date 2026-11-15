import { visibleText } from "@/test/visibleText";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";
import WasteMachineAnatomy from "../WasteMachineAnatomy";

describe("WasteMachineAnatomy Component", () => {
  it("should render machine figure title and callouts", () => {
    render(<WasteMachineAnatomy />);
    expect(
      screen.getByText(visibleText(/The Circular Extruder & Hex-Paving Hydraulic Press Rig/i))
    ).toBeInTheDocument();
    expect(screen.getByText(visibleText(/1. Masukan Cacahan/i))).toBeInTheDocument();
    expect(screen.getByText(visibleText(/2. Pemanas Termal 220°C/i))).toBeInTheDocument();
    expect(screen.getByText(visibleText(/3. Balok Paving K-250/i))).toBeInTheDocument();
  });

  it("should update pressure and cycle state upon interacting with cycle buttons", () => {
    render(<WasteMachineAnatomy />);
    const feedBtn = screen.getByRole("button", { name: /1\s*\. Masuk/i });
    fireEvent.click(feedBtn);
    expect(screen.getByText(visibleText(/40 Bar/i))).toBeInTheDocument();

    const meltBtn = screen.getByRole("button", { name: /2\s*\. Lebur/i });
    fireEvent.click(meltBtn);
    expect(screen.getByText(visibleText(/110 Bar/i))).toBeInTheDocument();
  });
});
