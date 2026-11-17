import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ZeroWasteLifestyleArticlePage from "@/app/insight/zero-waste-lifestyle/page";

describe("Zero Waste Lifestyle article page", () => {
  it("renders the headline and the four narrative sections", () => {
    render(<ZeroWasteLifestyleArticlePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Mulai Dari Kebiasaan Kecil, Mengenal Gaya Hidup Zero Waste Untuk Masa Depan/i,
      })
    ).toBeTruthy();

    for (const heading of [
      /Mengubah Paradigma: Bukan Sempurna, Tapi Konsisten/i,
      /Tiga Langkah Sederhana yang Dapat Dimulai Hari Ini/i,
      /Mengelola Sisa Makanan Dapur dari Sumbernya/i,
      /Dampak Nyata pada Pengurangan Beban TPA Daerah/i,
    ]) {
      expect(screen.getByRole("heading", { level: 2, name: heading })).toBeTruthy();
    }
  });

  it("keeps the 5R pillars, the three action steps, the quote and the sorting legend", () => {
    render(<ZeroWasteLifestyleArticlePage />);

    for (const pillar of ["REFUSE", "REDUCE", "REUSE", "RECYCLE", "ROT"]) {
      expect(screen.getByText(pillar)).toBeTruthy();
    }
    expect(screen.getByText(/Bawa Starter Kit Ramah Lingkungan/i)).toBeTruthy();
    expect(screen.getByText(/Memilah Tempat Sampah di Rumah/i)).toBeTruthy();
    expect(screen.getByText(/Membeli Bahan dalam Ukuran Curah/i)).toBeTruthy();

    expect(screen.getByText(/Kita tidak membutuhkan segelintir orang/i)).toBeTruthy();
    expect(screen.getByText(/Anne Marie Bonneau, Zero Waste Chef/i)).toBeTruthy();

    for (const bin of ["Biru", "Oranye", "Hijau", "Abu-Abu"]) {
      expect(screen.getByText(bin)).toBeTruthy();
    }
  });

  it("counts an appreciation click and links the archive", () => {
    render(<ZeroWasteLifestyleArticlePage />);

    const button = screen.getByRole("button", { name: /Apresiasi \(64\)/i });
    expect(button).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(button);

    expect(screen.getByRole("button", { name: /Apresiasi \(65\)/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getByRole("link", { name: /Semua Insight/i })).toHaveAttribute("href", "/insight");
  });
});
