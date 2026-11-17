import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import UpcyclingBotolPlastikArticlePage from "@/app/insight/upcycling-botol-plastik/page";

describe("Upcycling botol plastik article page", () => {
  it("renders the headline and the four narrative sections", () => {
    render(<UpcyclingBotolPlastikArticlePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Mengubah Botol Plastik Bekas Menjadi Produk Kreatif Bernilai Guna/i,
      })
    ).toBeTruthy();

    for (const heading of [
      /Dari Sampah Konsumsi Menjadi Elemen Dekorasi Fungsional/i,
      /Panduan Langkah Demi Langkah: Pot Hidroponik Sumbu/i,
      /Inspirasi Wadah Alat Tulis/i,
      /Dampak Lingkungan dan Potensi Penjualan di Bazar Komunitas/i,
    ]) {
      expect(screen.getByRole("heading", { level: 2, name: heading })).toBeTruthy();
    }
  });

  it("keeps the material flow, the tutorial steps, the gallery and the eco-points banner", () => {
    render(<UpcyclingBotolPlastikArticlePage />);

    expect(screen.getByText(/ALUR TRANSFORMASI MATERIAL PET/i)).toBeTruthy();
    expect(screen.getByText("SORTIR & CUCI")).toBeTruthy();
    expect(screen.getByText("PRODUK SIAP PAKAI")).toBeTruthy();

    expect(screen.getByText("STEP 01")).toBeTruthy();
    expect(screen.getByText(/Pemotongan Badan Botol/i)).toBeTruthy();
    expect(screen.getByText("STEP 04")).toBeTruthy();

    expect(screen.getByText("KATEGORI: ALAT TULIS")).toBeTruthy();
    expect(screen.getByText("KATEGORI: PENCAHAYAAN")).toBeTruthy();

    expect(screen.getByText(/Kreativitas sejati dalam ekonomi sirkular/i)).toBeTruthy();
    expect(screen.getByText(/Divisi Inovasi Produk CircuLife/i)).toBeTruthy();

    expect(screen.getByText(/\+150 Poin Reward/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /Setor Sekarang/i })).toHaveAttribute("href", "/lapor");
  });

  it("counts an appreciation click", () => {
    render(<UpcyclingBotolPlastikArticlePage />);

    const button = screen.getByRole("button", { name: /Apresiasi \(52\)/i });
    expect(button).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(button);

    expect(screen.getByRole("button", { name: /Apresiasi \(53\)/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });
});
