import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ZeroWasteLifestyleArticlePage from "@/app/insight/zero-waste-lifestyle/page";

describe("Zero Waste Lifestyle Article Page", () => {
  it("renders the main headline, breadcrumb, and author info", () => {
    render(<ZeroWasteLifestyleArticlePage />);

    // 1. Headline H1
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Mulai Dari Kebiasaan Kecil, Mengenal Gaya Hidup Zero Waste Untuk Masa Depan/i,
      })
    ).toBeTruthy();

    // 2. Breadcrumbs
    expect(screen.getByText(/Kembali Ke Arsip Insight/i)).toBeTruthy();
    expect(screen.getByText(/Gerakan Komunitas & Gaya Hidup/i)).toBeTruthy();
    expect(screen.getByText(/REF \/\//i)).toBeTruthy();

    // 3. Author info
    expect(screen.getByText(/Tim Edukasi CircuLife/i)).toBeTruthy();
    expect(screen.getByText(/Februari 2026/i)).toBeTruthy();
  });

  it("renders the 5R Framework pillars in Section 01", () => {
    render(<ZeroWasteLifestyleArticlePage />);

    expect(screen.getByText(/01 \/\/ FILOSOFI DASAR/i)).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Mengubah Paradigma: Bukan Sempurna, Tapi Konsisten/i,
      })
    ).toBeTruthy();

    // 5R Pillars
    expect(screen.getByText("REFUSE")).toBeTruthy();
    expect(screen.getByText("REDUCE")).toBeTruthy();
    expect(screen.getByText("REUSE")).toBeTruthy();
    expect(screen.getByText("RECYCLE")).toBeTruthy();
    expect(screen.getByText("ROT")).toBeTruthy();
  });

  it("renders 3 practical action steps and the Anne Marie Bonneau quote in Section 02", () => {
    render(<ZeroWasteLifestyleArticlePage />);

    expect(screen.getByText(/02 \/\/ PANDUAN PRAKTIS/i)).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Tiga Langkah Sederhana yang Dapat Dimulai Hari Ini/i,
      })
    ).toBeTruthy();

    // 3 Steps
    expect(screen.getByText(/Bawa Starter Kit Ramah Lingkungan/i)).toBeTruthy();
    expect(screen.getByText(/Memilah Tempat Sampah di Rumah/i)).toBeTruthy();
    expect(screen.getByText(/Membeli Bahan dalam Ukuran Curah \(Bulk\)/i)).toBeTruthy();

    // Quote
    expect(
      screen.getByText(/Kita tidak membutuhkan segelintir orang yang menjalankan zero waste secara sempurna/i)
    ).toBeTruthy();
    expect(screen.getByText(/ANNE MARIE BONNEAU, ZERO WASTE CHEF/i)).toBeTruthy();

    // Sorting Illustration bins
    expect(screen.getByText("Biru")).toBeTruthy();
    expect(screen.getByText("Oranye")).toBeTruthy();
    expect(screen.getByText("Hijau")).toBeTruthy();
    expect(screen.getByText("Abu-Abu")).toBeTruthy();
  });

  it("renders organic waste and macro impact sections (Sections 03 & 04)", () => {
    render(<ZeroWasteLifestyleArticlePage />);

    expect(screen.getByText(/03 \/\/ KOMPOS & ORGANIK/i)).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Mengelola Sisa Makanan Dapur dari Sumbernya/i,
      })
    ).toBeTruthy();

    expect(screen.getByText(/04 \/\/ DAMPAK EKOSISTEM/i)).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Dampak Nyata pada Pengurangan Beban TPA Daerah/i,
      })
    ).toBeTruthy();
  });

  it("handles interactive appreciation counter clicks and article saving", () => {
    render(<ZeroWasteLifestyleArticlePage />);

    // Appreciation button
    const appreciateBtn = screen.getByRole("button", { name: /Apresiasi \(64\)/i });
    expect(appreciateBtn).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(appreciateBtn);
    expect(screen.getByRole("button", { name: /Apresiasi \(65\)/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    );

    fireEvent.click(screen.getByRole("button", { name: /Apresiasi \(65\)/i }));
    expect(screen.getByRole("button", { name: /Apresiasi \(64\)/i })).toHaveAttribute(
      "aria-pressed",
      "false"
    );

    // Save article button
    const saveBtn = screen.getByRole("button", { name: /Simpan Artikel/i });
    expect(saveBtn).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(saveBtn);
    expect(screen.getByRole("button", { name: /Tersimpan/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  it("renders related readings section with 2 cards and return button", () => {
    render(<ZeroWasteLifestyleArticlePage />);

    expect(screen.getByText(/EKSPLORASI LANJUTAN/i)).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Bacaan Terkait Sirkularitas/i,
      })
    ).toBeTruthy();

    // Related cards
    expect(
      screen.getByText(/Dari Sampah Menjadi Manfaat: Mahasiswa UMC Membuat Paving Block/i)
    ).toBeTruthy();
    expect(
      screen.getByText(/Mengubah Botol Plastik Bekas Menjadi Produk Kreatif Bernilai Guna/i)
    ).toBeTruthy();

    // Return button
    expect(screen.getByText(/Kembali Ke Daftar Insight/i)).toBeTruthy();
  });
});
