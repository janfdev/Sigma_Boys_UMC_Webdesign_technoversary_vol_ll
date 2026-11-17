
import { AnimatedNumber } from "@/components/ui/animated-number";
import React from "react";
import Link from "next/link";
import { CircuLifeMark } from "@/components/CircuLifeLogo";
import {
  Recycle,
  PhoneCall,
  MapPin,
  Heart,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  Layers,
  Sprout,
  BookOpen,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card text-foreground">
      {/* 1. Hotline & Emergency Callout Banner */}
      <div className="border-b border-primary/20 bg-primary/10 px-4 py-3.5 sm:px-6 lg:px-8 dark:bg-primary/20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 font-semibold text-foreground">
            <Recycle className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>Hotline Kemitraan &amp; Penyetoran CircuLife 24 Jam: 0821-2345-6789</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Sistem Aktif 24/7
            </span>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "h-8 px-3.5 gap-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-full border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground shadow-xs"
              )}
            >
              <PhoneCall className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Hubungi Kami</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main 4-Column Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Column 1: Brand, Tagline & Verified Impact (4 cols) */}
          <div className="space-y-4 lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-90 group"
              aria-label="CIRCULIFE Beranda"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-card border border-border/80 shadow-sm ring-1 ring-primary/20 p-1.5 overflow-hidden transition-transform group-hover:scale-105">
                <CircuLifeMark className="h-full w-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-foreground font-sans leading-none">
                  CIRCULIFE
                </span>
                <span className="text-[10px] font-mono font-medium text-muted-foreground uppercase tracking-wider mt-1">
                  Digital Zero Waste &amp; Value Hub
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground max-w-sm">
              Platform sirkularitas terpadu pengolahan limbah plastik, kaleng logam, dan sisa organik menjadi eco-paving block K-250, tungku biomassa, dan pupuk kompos bio-kasgot bernilai tambah tinggi bagi masyarakat.
            </p>

            <div className="space-y-2 pt-1 font-mono text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>Kuningan &amp; Cirebon, Jawa Barat, Indonesia</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span><AnimatedNumber value={24} /> Sentra Drop Point &amp; <AnimatedNumber value={18} /> KSM Binaan Terverifikasi</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigasi Utama (3 cols) */}
          <div className="space-y-3.5 lg:col-span-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <Layers className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <span>Navigasi Layanan</span>
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground font-medium">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
                  Beranda (Alur Pemanfaatan Sampah)
                </Link>
              </li>
              <li>
                <Link href="/inovasi" className="transition-colors hover:text-primary">
                  Inovasi Sirkular &amp; Katalog Produk
                </Link>
              </li>
              <li>
                <Link href="/pantau" className="transition-colors hover:text-primary">
                  Hitung Dampak &amp; Reduksi Karbon
                </Link>
              </li>
              <li>
                <Link href="/edukasi" className="transition-colors hover:text-primary">
                  Panduan Zero Waste &amp; Kuis Interaktif
                </Link>
              </li>
              <li>
                <Link href="/lapor" className="transition-colors hover:text-primary font-semibold text-primary">
                  Setor Sampah &amp; Klaim Reward
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Dokumentasi & Riset (3 cols) */}
          <div className="space-y-3.5 lg:col-span-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <BookOpen className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <span>Dokumentasi &amp; Riset</span>
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground font-medium">
              <li>
                <Link href="/galeri" className="transition-colors hover:text-primary">
                  Galeri Transformasi &amp; Produk
                </Link>
              </li>
              <li>
                <Link href="/insight/gunung-ciremai" className="transition-colors hover:text-primary">
                  Konservasi Sabuk DAS Ciremai
                </Link>
              </li>
              <li>
                <Link href="/insight/paving-block-umc" className="transition-colors hover:text-primary">
                  Riset Paving Block Plastik UMC
                </Link>
              </li>
              <li>
                <Link href="/insight/zero-waste-lifestyle" className="transition-colors hover:text-primary">
                  Gaya Hidup Zero Waste 5R
                </Link>
              </li>
              <li>
                <Link href="/insight/upcycling-botol-plastik" className="transition-colors hover:text-primary">
                  Tutorial Upcycling Botol Plastik
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Profil & Kemitraan (2 cols) */}
          <div className="space-y-3.5 lg:col-span-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <Sprout className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <span>Tentang &amp; Mitra</span>
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground font-medium">
              <li>
                <Link href="/about" className="transition-colors hover:text-primary">
                  Tentang Kami &amp; Pilar 2030
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-primary">
                  Kontak &amp; Kemitraan KSM
                </Link>
              </li>
              <li>
                <Link href="/contact?subject=Mitra_DropPoint" className="transition-colors hover:text-primary">
                  Daftar Jadi Drop Point
                </Link>
              </li>
              <li>
                <Link href="/about#sdg-matrix" className="transition-colors hover:text-primary">
                  Matriks SDGs UN No. 11, 12, 13
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 sm:my-10" />

        {/* 3. Bottom Bar: Copyright & Competition info */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row font-mono">
          <p className="tabular-nums text-center sm:text-left">
            &copy; 2026 CIRCULIFE / EcoDigital for Environment Web Design Competition.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 font-medium text-foreground text-[11px]">
            <span>Mewujudkan Indonesia Minim Sampah</span>
            <span className="text-muted-foreground">•</span>
            <span className="inline-flex items-center gap-1 text-primary">
              <Heart className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
              Sirkularitas Nyata
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
