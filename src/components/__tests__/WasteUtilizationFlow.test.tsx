import { visibleText } from "@/test/visibleText";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import WasteUtilizationFlow from "../WasteUtilizationFlow";

describe("WasteUtilizationFlow Component", () => {
  it("should render the section heading and 4 stage navigation buttons", () => {
    render(<WasteUtilizationFlow />);

    expect(
      screen.getByText(visibleText(/Bagaimana Sampah Menjadi Barang Bernilai\?/i))
    ).toBeInTheDocument();

    expect(screen.getByText("Pemilahan di Sumber")).toBeInTheDocument();
    expect(screen.getByText("Penyetoran & Logistik Pintar")).toBeInTheDocument();
    expect(screen.getByText("Transformasi Nilai Sirkular")).toBeInTheDocument();
    expect(screen.getByText("Distribusi & Dampak Sirkular")).toBeInTheDocument();
  });

  it("should display initial active stage (Step 1) details by default", () => {
    render(<WasteUtilizationFlow />);

    expect(screen.getByText(visibleText(/Tahap 1 dari 4/i))).toBeInTheDocument();
    expect(screen.getByText(visibleText(/1\. Material Input Masuk/i))).toBeInTheDocument();
    expect(screen.getByText(visibleText(/2\. Proses Transformasi/i))).toBeInTheDocument();
    expect(screen.getByText(visibleText(/3\. Produk Output Bernilai/i))).toBeInTheDocument();
    expect(screen.getByText(visibleText(/Botol Plastik PET/i))).toBeInTheDocument();
  });

  it("should navigate to next stage when clicking on 'Selanjutnya' button", () => {
    render(<WasteUtilizationFlow />);

    const nextButton = screen.getByRole("button", { name: /selanjutnya/i });
    fireEvent.click(nextButton);

    expect(screen.getByText(visibleText(/Tahap 2 dari 4/i))).toBeInTheDocument();
    expect(screen.getByText(visibleText(/Penimbangan presisi/i))).toBeInTheDocument();
  });

  it("should switch stage when clicking directly on a stepper button", () => {
    render(<WasteUtilizationFlow />);

    const step3Button = screen.getByText("Transformasi Nilai Sirkular");
    fireEvent.click(step3Button);

    expect(screen.getByText(visibleText(/Tahap 3 dari 4/i))).toBeInTheDocument();
    expect(screen.getByText(visibleText(/Eco-Paving Block Standar K-250/i))).toBeInTheDocument();
  });
});
