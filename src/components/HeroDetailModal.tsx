"use client";

import * as React from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(initialIndex);

  React.useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!open || !mounted || items.length === 0) {
    return null;
  }

  const activeItem = items[activeIndex] || items[0];
  const counterText = `${String(activeIndex + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="hero-modal-title"
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-sm sm:max-w-md md:max-w-4xl max-h-[min(90dvh,820px)] bg-[#0D2118] border-2 border-[#4ADE80] rounded-2xl sm:rounded-3xl p-3 sm:p-5 md:p-8 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Close di Pojok Kanan Atas Modal */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Tutup dialog"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-5 md:right-5 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#163326]/90 hover:bg-[#1E4634] text-[#A7B8B0] hover:text-white flex items-center justify-center transition cursor-pointer backdrop-blur-sm shadow-md"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
        </button>

        {/* Layout Grid: 1 Kolom (Gambar saja) di Mobile, 12 Kolom (Gambar + Detail) di Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8 items-center">
          {/* Kolom Kiri: Interactive Image Viewer */}
          <div className="w-full md:col-span-6">
            <div className="relative aspect-square w-full rounded-xl sm:rounded-2xl border-2 sm:border-[3px] border-[#34D399]/70 overflow-hidden bg-[#0A110E]">
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
                className="absolute top-1/2 -translate-y-1/2 left-2.5 sm:left-3 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition backdrop-blur-sm cursor-pointer shadow"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              </button>

              {/* Tombol Navigasi Kanan (Next) */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Foto berikutnya"
                className="absolute top-1/2 -translate-y-1/2 right-2.5 sm:right-3 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition backdrop-blur-sm cursor-pointer shadow"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              </button>

              {/* Slide Counter Pill */}
              <div
                data-testid="hero-modal-counter"
                className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 z-10 bg-black/70 backdrop-blur-md text-white font-mono text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full tracking-wider pointer-events-none"
              >
                {counterText}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Konten Edukasi & Dampak Lingkungan (Khusus Layar Desktop md ke atas) */}
          <div
            data-testid="hero-modal-details"
            className="hidden md:flex md:col-span-6 flex-col justify-center"
          >
            {/* Category Pill Badge */}
            <div className="mb-3 sm:mb-4">
              <span className="inline-flex items-center gap-1.5 bg-[#4ADE80] text-[#062415] font-bold text-[11px] sm:text-xs uppercase tracking-wider px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full">
                <Recycle className="w-3.5 h-3.5" aria-hidden="true" />
                {activeItem.badge}
              </span>
            </div>

            {/* Judul Utama */}
            <h2
              id="hero-modal-title"
              className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight tracking-tight mb-2 sm:mb-3"
            >
              {activeItem.title}
            </h2>

            {/* Paragraf Deskripsi Utama */}
            <p className="text-xs sm:text-sm md:text-[15px] text-[#CBD5E1] leading-relaxed mb-4 sm:mb-6">
              {activeItem.description}
            </p>

            {/* Callout Box: Dampak Lingkungan */}
            <div className="bg-[#091912] border border-[#1E4634] rounded-xl sm:rounded-2xl p-3.5 sm:p-5">
              <div className="flex items-center gap-2 sm:gap-2.5 mb-1.5 sm:mb-2">
                <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-[#4ADE80] shrink-0" aria-hidden="true" />
                <h3 className="text-sm sm:text-base text-[#4ADE80] font-bold">
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

  return createPortal(modalContent, document.body);
}
