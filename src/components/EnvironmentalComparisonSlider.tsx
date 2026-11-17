"use client";

import React, { useState } from "react";
import { ImageCompare } from "@/components/ui/image-compare";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { SlidersHorizontal, CheckCircle2, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function EnvironmentalComparisonSlider() {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  return (
    <section
      id="restorasi-sebelum-sesudah"
      className="py-16 sm:py-24 border-t border-border/80 bg-background relative overflow-hidden"
      aria-labelledby="comparison-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <Badge
              variant="outline"
              className="text-xs font-mono font-bold uppercase tracking-wider text-primary border-primary/30"
            >
              Komparasi Interaktif Dampak
            </Badge>
            <h2
              id="comparison-heading"
              className="text-2xl sm:text-4xl font-black text-foreground tracking-tight leading-tight"
            >
              Transformasi Nyata: Dari Timbunan Liar Menjadi Jalur Sirkular
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Geser tuas interaktif di bawah untuk melihat perbedaan langsung antara kawasan yang belum tertata dengan jalur konservasi yang telah menerapkan sistem sirkularitas CircuLife.
            </p>
          </div>

          {/* Quick preset buttons */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs shrink-0">
            <button
              type="button"
              onClick={() => setSliderPosition(0)}
              className={cn(
                "px-3 py-1.5 rounded-lg border transition-all cursor-pointer",
                sliderPosition <= 10
                  ? "bg-amber-600/10 border-amber-500/40 text-amber-800 dark:text-amber-300 font-bold"
                  : "border-border/70 hover:bg-muted text-muted-foreground"
              )}
            >
              Kondisi Awal (<AnimatedNumber value={0} compact />%)
            </button>
            <button
              type="button"
              onClick={() => setSliderPosition(50)}
              className={cn(
                "px-3 py-1.5 rounded-lg border transition-all cursor-pointer",
                sliderPosition > 35 && sliderPosition < 65
                  ? "bg-primary/10 border-primary/40 text-primary font-bold"
                  : "border-border/70 hover:bg-muted text-muted-foreground"
              )}
            >
             50 : 50
            </button>
            <button
              type="button"
              onClick={() => setSliderPosition(100)}
              className={cn(
                "px-3 py-1.5 rounded-lg border transition-all cursor-pointer",
                sliderPosition >= 90
                  ? "bg-emerald-600/10 border-emerald-500/40 text-emerald-800 dark:text-emerald-300 font-bold"
                  : "border-border/70 hover:bg-muted text-muted-foreground"
              )}
            >
              Hasil Sirkular 100%
            </button>
          </div>
        </div>

        {/* Visual Comparison Split Box */}
        <Card className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
          <ImageCompare
            beforeSrc="/image-lomba/tumpukan-botol-plastik.webp"
            afterSrc="/image-lomba/kreasi-daur-ulang.webp"
            beforeAlt="Kondisi awal jalur tercemar sampah plastik dan botol berserakan"
            afterAlt="Jalur konservasi bersih dan asri hasil restorasi sirkular CircuLife"
            beforeLabel="SEBELUM : TIMBUNAN SAMPAH LIAR"
            afterLabel="SESUDAH : INTERVENSI CIRCULIFE"
            value={100 - sliderPosition}
            onValueChange={(position) => setSliderPosition(100 - position)}
            style={{ touchAction: "pan-y" }}
            className="h-[320px] sm:h-[480px] lg:h-[560px] w-full rounded-none border-0"
          />
          <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6">
            <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/40 p-4">
              <h3 className="flex items-center gap-2 font-bold"><AlertTriangle className="size-4" aria-hidden="true" /> Kondisi awal</h3>
              <p className="text-sm text-muted-foreground">Timbunan botol plastik sekali pakai, kaleng gas sisa tercecer, dan ancaman degradasi ekosistem lereng.</p>
              <dl className="grid grid-cols-3 gap-2 text-center text-xs">
                <div><dt>Sampah / Bln</dt><dd className="font-mono font-bold">1.450 kg</dd></div>
                <div><dt>Risiko Bahaya Gas</dt><dd className="font-bold">TINGGI</dd></div>
                <div><dt>Daur Ulang</dt><dd className="font-mono font-bold">0%</dd></div>
              </dl>
            </div>
            <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/40 p-4">
              <h3 className="flex items-center gap-2 font-bold"><CheckCircle2 className="size-4" aria-hidden="true" /> Hasil sirkular</h3>
              <p className="text-sm text-muted-foreground">Jalur tertata dengan Eco-Paving Block K-250, drop-box limbah terpilah, dan reboisasi pohon endemik.</p>
              <dl className="grid grid-cols-3 gap-2 text-center text-xs">
                <div><dt>Timbunan Sampah</dt><dd className="font-mono font-bold">-94%</dd></div>
                <div><dt>Eco-Paving K-250</dt><dd className="font-mono font-bold">850 m²</dd></div>
                <div><dt>Pohon Tertanam</dt><dd className="font-mono font-bold">+ 1200</dd></div>
              </dl>
            </div>
          </div>

          {/* Accessible Keyboard Controls & Description Bar */}
          <div className="p-4 sm:p-6 bg-muted/40 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 text-muted-foreground">
              <SlidersHorizontal className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              <span>Gunakan slider untuk mengatur proporsi tampilan ({Math.round(sliderPosition)} % hasil sirkular).</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-72">
              <span className="text-[10px] text-muted-foreground uppercase font-bold">Awal</span>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Posisi slider pembanding restorasi"
              />
              <span className="text-[10px] text-primary uppercase font-bold">Sirkular</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
