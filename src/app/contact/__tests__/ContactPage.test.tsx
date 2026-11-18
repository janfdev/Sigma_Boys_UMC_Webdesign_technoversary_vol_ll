import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import ContactPage from "../page";

describe("ContactPage Component", () => {
  it("should render main headings and form inputs", () => {
    render(<ContactPage />);

    expect(screen.getByText(/Hubungi Tim Kami/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nama Lengkap/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Kategori Inisiatif/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Pesan atau Kebutuhan/i)).toBeInTheDocument();
  });

  it("should show validation errors when submitting empty form", () => {
    render(<ContactPage />);

    const submitBtn = screen.getByRole("button", { name: /kirimkan formulir/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/nama lengkap wajib diisi/i)).toBeInTheDocument();
    expect(screen.getByText(/email valid wajib diisi/i)).toBeInTheDocument();
  });

  it("should show success alert when valid form is submitted", () => {
    render(<ContactPage />);

    fireEvent.change(screen.getByLabelText(/Nama Lengkap/i), { target: { value: "Budi Santoso" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "budi@circulife.id" } });
    fireEvent.change(screen.getByLabelText(/Pesan atau Kebutuhan/i), {
      target: { value: "Kami ingin menjalin kerjasama bank sampah di Kuningan." },
    });

    const submitBtn = screen.getByRole("button", { name: /kirimkan formulir/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/Pesan Anda Berhasil Terkirim/i)).toBeInTheDocument();
    expect(screen.getByText(/Budi Santoso/i)).toBeInTheDocument();
  });
});
