import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import UpcyclingBotolPlastikArticlePage from "@/app/insight/upcycling-botol-plastik/page";

describe("Upcycling Botol Plastik Article Page", () => {
  it("renders the main headline, breadcrumb, and author info", () => {
    render(<UpcyclingBotolPlastikArticlePage />);

    // 1. Headline H1
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /MENGUBAH BOTOL PLASTIK BEKAS MENJADI PRODUK KREATIF BERNILAI GUNA/i,
      })
    ).toBeTruthy();

    // 2. Breadcrumbs & Badges
    expect(screen.getByText(/Kembali Ke Arsip Insight/i)).toBeTruthy();
    expect(screen.getAllByText(/Inovasi Daur Ulang/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Panduan Kreatif/i)).toBeTruthy();
    expect(screen.getByText(/REF \/\//i)).toBeTruthy();

    // 3. Author info
    expect(screen.getByText(/Tim Kreatif CircuLife/i)).toBeTruthy();
    expect(screen.getByText(/Divisi Edukasi & Inovasi Sirkular/i)).toBeTruthy();
  });

  it("renders Bagian 01 and the 4-step material transformation flow bar", () => {
    render(<UpcyclingBotolPlastikArticlePage />);

    expect(screen.getByText(/BAGIAN 01 \/\/ KONSEP UPCYCLING/i)).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /DARI SAMPAH KONSUMSI MENJADI ELEMEN DEKORASI FUNGSIONAL/i,
      })
    ).toBeTruthy();

    // Flowchart steps
    expect(screen.getByText(/ALUR TRANSFORMASI MATERIAL PET/i)).toBeTruthy();
    expect(screen.getByText(/EFISIENSI RESIDU: 95%/i)).toBeTruthy();
    expect(screen.getByText("SORTIR & CUCI")).toBeTruthy();
    expect(screen.getByText("PEMOTONGAN POLA")).toBeTruthy();
    expect(screen.getByText("FINISHING & CAT")).toBeTruthy();
    expect(screen.getByText("PRODUK SIAP PAKAI")).toBeTruthy();
  });

  it("renders Bagian 02 with the 4-step tutorial cards", () => {
    render(<UpcyclingBotolPlastikArticlePage />);

    expect(screen.getByText(/BAGIAN 02 \/\/ TUTORIAL PRAKTIS/i)).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /PANDUAN LANGKAH DEMI LANGKAH: POT HIDROPONIK SUMBU/i,
      })
    ).toBeTruthy();

    // 4 Steps
    expect(screen.getByText("STEP 01")).toBeTruthy();
    expect(screen.getByText(/Pemotongan Badan Botol/i)).toBeTruthy();

    expect(screen.getByText("STEP 02")).toBeTruthy();
    expect(screen.getByText(/Pembuatan Lubang Aerasi/i)).toBeTruthy();

    expect(screen.getByText("STEP 03")).toBeTruthy();
    expect(screen.getByText(/Pemasangan Sumbu Kapiler/i)).toBeTruthy();

    expect(screen.getByText("STEP 04")).toBeTruthy();
    expect(screen.getByText(/Penanaman & Dekorasi Estetika/i)).toBeTruthy();
  });

  it("renders Bagian 03 gallery, quote, and Bagian 04 eco-points bonus banner", () => {
    render(<UpcyclingBotolPlastikArticlePage />);

    // Bagian 03
    expect(screen.getByText(/BAGIAN 03 \/\/ INSPIRASI PRODUK/i)).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /INSPIRASI WADAH ALAT TULIS & KAP LAMPU HIAS TERAS/i,
      })
    ).toBeTruthy();

    expect(screen.getByText("KATEGORI: ALAT TULIS")).toBeTruthy();
    expect(screen.getByText("KATEGORI: PENCAHAYAAN")).toBeTruthy();

    // Quote
    expect(
      screen.getByText(/Kreativitas sejati dalam ekonomi sirkular bukan tentang menciptakan sampah baru/i)
    ).toBeTruthy();
    expect(screen.getByText(/DIVISI INOVASI PRODUK CIRCULIFE/i)).toBeTruthy();

    // Bagian 04
    expect(screen.getByText(/BAGIAN 04 \/\/ DAMPAK & NILAI EKONOMI/i)).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /DAMPAK LINGKUNGAN DAN POTENSI PENJUALAN DI BAZAR KOMUNITAS/i,
      })
    ).toBeTruthy();

    // Point banner
    expect(screen.getByText(/\+150 Poin Reward/i)).toBeTruthy();
    expect(screen.getByText(/Setor Sekarang/i)).toBeTruthy();
  });

  it("handles appreciation and save button interactions", () => {
    render(<UpcyclingBotolPlastikArticlePage />);

    // Appreciation toggle
    const appreciateBtn = screen.getByRole("button", { name: /Apresiasi \(52\)/i });
    expect(appreciateBtn).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(appreciateBtn);
    expect(screen.getByRole("button", { name: /Apresiasi \(53\)/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    );

    fireEvent.click(screen.getByRole("button", { name: /Apresiasi \(53\)/i }));
    expect(screen.getByRole("button", { name: /Apresiasi \(52\)/i })).toHaveAttribute(
      "aria-pressed",
      "false"
    );

    // Save article toggle
    const saveBtn = screen.getByRole("button", { name: /Simpan/i });
    expect(saveBtn).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(saveBtn);
    expect(screen.getByRole("button", { name: /Tersimpan/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  it("renders recommended environmental articles section", () => {
    render(<UpcyclingBotolPlastikArticlePage />);

    expect(screen.getByText(/REKOMENDASI TERKAIT LINGKUNGAN/i)).toBeTruthy();
    expect(screen.getByText(/PENGELOLAAN SAMPAH/i)).toBeTruthy();
    expect(
      screen.getByText(/Dari Sampah Menjadi Manfaat: Mahasiswa UMC Membuat Paving Block/i)
    ).toBeTruthy();
    expect(screen.getByText(/GERAKAN KOMUNITAS/i)).toBeTruthy();
    expect(
      screen.getByText(/Mulai Dari Kebiasaan Kecil, Mengenal Gaya Hidup Zero Waste/i)
    ).toBeTruthy();

    expect(screen.getByText(/Kembali Ke Daftar Insight/i)).toBeTruthy();
  });
});
