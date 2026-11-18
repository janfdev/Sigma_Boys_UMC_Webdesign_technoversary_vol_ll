"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Leaf, Recycle, X } from "lucide-react";
import type { HeroCarouselItem } from "@/data/heroCarouselData";

export interface HeroDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialIndex?: number;
  items: HeroCarouselItem[];
}

export default function HeroDetailModal({
  open,
  onOpenChange,
  initialIndex = 0,
  items,
}: HeroDetailModalProps) {
  const [activeIndex, setActiveIndex] = React.useState(initialIndex);

  React.useEffect(() => {
    if (open && initialIndex >= 0 && initialIndex < items.length) {
      setActiveIndex(initialIndex);
    }
  }, [open, initialIndex, items.length]);

  const handlePrev = React.useCallback(() => {
    if (!items.length) return;
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const handleNext = React.useCallback(() => {
    if (!items.length) return;
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handleClose = React.useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, handleClose, handlePrev, handleNext]);

  React.useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!open || items.length === 0) {
    return null;
  }

  const activeItem = items[activeIndex] || items[0];
  const counterText = `${String(activeIndex + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="hero-modal-title"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0D2118] border-2 border-[#4ADE80] rounded-3xl p-5 sm:p-8 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Close di Pojok Kanan Atas Modal */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Tutup dialog"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-9 h-9 rounded-full bg-[#163326] hover:bg-[#1E4634] text-[#A7B8B0] hover:text-white flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Layout Grid 2 Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Kolom Kiri: Interactive Image Viewer */}
          <div className="md:col-span-6 w-full">
            <div className="relative aspect-square sm:aspect-[4/4] w-full rounded-2xl border-[3px] border-[#34D399]/70 overflow-hidden bg-[#0A110E]">
              {/* Gambar aktif */}
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="object-cover w-full h-full transition-opacity duration-300"
              />

              {/* Tombol Navigasi Kiri (Prev) */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Foto sebelumnya"
                className="absolute top-1/2 -translate-y-1/2 left-3 z-10 w-9 h-9 rounded-full bg-black/55 hover:bg-black/80 text-white flex items-center justify-center transition backdrop-blur-sm cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>

              {/* Tombol Navigasi Kanan (Next) */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Foto berikutnya"
                className="absolute top-1/2 -translate-y-1/2 right-3 z-10 w-9 h-9 rounded-full bg-black/55 hover:bg-black/80 text-white flex items-center justify-center transition backdrop-blur-sm cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>

              {/* Slide Counter Pill */}
              <div
                data-testid="hero-modal-counter"
                className="absolute bottom-3 left-3 z-10 bg-black/65 backdrop-blur-md text-white font-mono text-xs font-semibold px-3 py-1 rounded-full tracking-wider pointer-events-none"
              >
                {counterText}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Konten Edukasi & Dampak Lingkungan */}
          <div className="md:col-span-6 flex flex-col justify-center">
            {/* Category Pill Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 bg-[#4ADE80] text-[#062415] font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                <Recycle className="w-3.5 h-3.5" aria-hidden="true" />
                {activeItem.badge}
              </span>
            </div>

            {/* Judul Utama */}
            <h2
              id="hero-modal-title"
              className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight mb-3"
            >
              {activeItem.title}
            </h2>

            {/* Paragraf Deskripsi Utama */}
            <p className="text-sm sm:text-[15px] text-[#CBD5E1] leading-relaxed mb-6">
              {activeItem.description}
            </p>

            {/* Callout Box: Dampak Lingkungan */}
            <div className="bg-[#091912] border border-[#1E4634] rounded-2xl p-4 sm:p-5">
              <div className="flex items-center gap-2.5 mb-2">
                <Leaf className="w-5 h-5 text-[#4ADE80] shrink-0" aria-hidden="true" />
                <h3 className="text-[#4ADE80] font-bold text-base">
                  {activeItem.impactTitle || "Dampak Lingkungan"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                {activeItem.impactDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
