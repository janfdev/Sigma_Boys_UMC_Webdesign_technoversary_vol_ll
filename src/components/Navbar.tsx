"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircuLifeMark } from "@/components/CircuLifeLogo";
import {
  Menu,
  X,
  PackageCheck,
  ChevronDown,
  Calculator,
  BookOpen,
  Image as ImageIcon,
  Newspaper,
  Home,
  Layers,
  Users,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { NavbarDarkShadow } from "@/components/ui/navbar-dark-shadow";

export interface NavbarProps {
  currentPath?: string;
}

export const NAV_ITEMS = [
  { href: "/", label: "Beranda" },
  { href: "/konservasi", label: "Produk Olahan" },
  { href: "/pantau", label: "Hitung Dampak" },
  { href: "/edukasi", label: "Panduan" },
  { href: "/insight", label: "Insight" },
  { href: "/galeri", label: "Dokumentasi" },
  { href: "/about", label: "Tentang Kami" },
  { href: "/contact", label: "Kontak" },
  { href: "/lapor", label: "Setor Sampah", isAction: true },
];

export default function Navbar({ currentPath }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let pathname = "/";
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    pathname = usePathname() || "/";
  } catch {
    pathname = "/";
  }
  const activePath = currentPath ?? pathname;

  const isEcosystemActive =
    activePath === "/pantau" ||
    activePath === "/edukasi" ||
    activePath === "/galeri" ||
    activePath.startsWith("/insight");

  // Lock background scroll when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <NavbarDarkShadow
      mobileMenuOpen={mobileMenuOpen}
      onBackdropClick={() => setMobileMenuOpen(false)}
      brand={
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl group"
        >
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-card border border-border/80 shadow-[0_1px_2px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)] ring-1 ring-primary/20 transition-transform group-hover:scale-105">
            <CircuLifeMark className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <span className="text-base font-black tracking-tight text-foreground sm:text-lg">
            CIRCULIFE
          </span>
        </Link>
      }
      desktopNav={
        <nav className="flex items-center gap-1.5" aria-label="Navigasi Utama">
          {/* 1. Beranda */}
          <Link
            href="/"
            className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all ${
              activePath === "/"
                ? "bg-primary/10 text-primary font-black"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            }`}
          >
            Beranda
          </Link>

          {/* 2. Produk Olahan */}
          <Link
            href="/konservasi"
            className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all ${
              activePath === "/konservasi"
                ? "bg-primary/10 text-primary font-black"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            }`}
          >
            Produk Olahan
          </Link>

          {/* 3. Dropdown Menu: Wawasan & Fitur */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer outline-none ${
                isEcosystemActive
                  ? "bg-primary/10 text-primary font-black"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              <span>Fitur &amp; Wawasan</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-60 p-2 rounded-2xl border border-border/80 bg-popover text-popover-foreground shadow-xl"
            >
              <DropdownMenuItem
                render={
                  <Link
                    href="/pantau"
                    className="flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-xl transition-colors cursor-pointer w-full group/item"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-colors shrink-0">
                      <Calculator className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-bold block text-foreground leading-tight">Hitung Dampak</span>
                      <span className="text-[11px] text-muted-foreground block mt-0.5">Kalkulator konversi limbah</span>
                    </div>
                  </Link>
                }
              />
              <DropdownMenuItem
                render={
                  <Link
                    href="/edukasi"
                    className="flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-xl transition-colors cursor-pointer w-full group/item"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-colors shrink-0">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-bold block text-foreground leading-tight">Panduan &amp; Kuis</span>
                      <span className="text-[11px] text-muted-foreground block mt-0.5">Modul pemilahan zero waste</span>
                    </div>
                  </Link>
                }
              />
              <DropdownMenuItem
                render={
                  <Link
                    href="/insight"
                    className="flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-xl transition-colors cursor-pointer w-full group/item"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-colors shrink-0">
                      <Newspaper className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-bold block text-foreground leading-tight">Arsip Insight</span>
                      <span className="text-[11px] text-muted-foreground block mt-0.5">Kajian &amp; riset lapangan</span>
                    </div>
                  </Link>
                }
              />
              <DropdownMenuItem
                render={
                  <Link
                    href="/galeri"
                    className="flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-xl transition-colors cursor-pointer w-full group/item"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-colors shrink-0">
                      <ImageIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-bold block text-foreground leading-tight">Dokumentasi</span>
                      <span className="text-[11px] text-muted-foreground block mt-0.5">Foto transformasi fisik</span>
                    </div>
                  </Link>
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 4. Tentang Kami */}
          <Link
            href="/about"
            className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all ${
              activePath === "/about"
                ? "bg-primary/10 text-primary font-black"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            }`}
          >
            Tentang
          </Link>

          {/* Action Button: Setor Sampah */}
          <Link
            href="/lapor"
            className={`ml-1.5 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
              activePath === "/lapor"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            <PackageCheck className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Setor Sampah</span>
          </Link>

          {/* Theme Toggler */}
          <AnimatedThemeToggler
            variant="circle"
            duration={450}
            aria-label="Toggle tema gelap atau terang"
            className="ml-1 h-9 w-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors border border-border/80 [&_svg]:h-4 [&_svg]:w-4"
          />
        </nav>
      }
      actions={
        <div className="flex items-center gap-2 lg:hidden">
          <AnimatedThemeToggler
            variant="circle"
            duration={450}
            aria-label="Toggle tema gelap atau terang"
            className="h-9 w-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border border-border/80 [&_svg]:h-4 [&_svg]:w-4"
          />

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            aria-expanded={mobileMenuOpen}
            className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border-border/80 shadow-xs active:scale-95 transition-transform"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        </div>
      }
      mobileMenu={
        <nav className="flex flex-col gap-4 text-left" aria-label="Navigasi Mobile">
          {/* Top Status Header */}
          <div className="flex items-center justify-between pb-3 border-b border-border/70">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                CircuLife Ecosystem
              </span>
            </div>
            <Badge variant="outline" className="font-mono text-[10px] border-primary/30 text-primary">
              Zero Waste Hub
            </Badge>
          </div>

          {/* Section 1: Halaman Utama */}
          <div className="space-y-1">
            <span className="px-2 font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Navigasi Utama
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex h-11 items-center gap-2.5 rounded-xl px-3 text-xs font-bold transition-all ${
                  activePath === "/"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-foreground hover:bg-muted/70 bg-muted/30"
                }`}
              >
                <Home className="h-4 w-4 shrink-0 opacity-80" />
                <span className="truncate">Beranda</span>
              </Link>

              <Link
                href="/konservasi"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex h-11 items-center gap-2.5 rounded-xl px-3 text-xs font-bold transition-all ${
                  activePath === "/konservasi"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-foreground hover:bg-muted/70 bg-muted/30"
                }`}
              >
                <Layers className="h-4 w-4 shrink-0 opacity-80" />
                <span className="truncate">Produk Olahan</span>
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex h-11 items-center gap-2.5 rounded-xl px-3 text-xs font-bold transition-all ${
                  activePath === "/about"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-foreground hover:bg-muted/70 bg-muted/30"
                }`}
              >
                <Users className="h-4 w-4 shrink-0 opacity-80" />
                <span className="truncate">Tentang Kami</span>
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex h-11 items-center gap-2.5 rounded-xl px-3 text-xs font-bold transition-all ${
                  activePath === "/contact"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-foreground hover:bg-muted/70 bg-muted/30"
                }`}
              >
                <PhoneCall className="h-4 w-4 shrink-0 opacity-80" />
                <span className="truncate">Kontak</span>
              </Link>
            </div>
          </div>

          {/* Section 2: Fitur & Wawasan Interaktif */}
          <div className="space-y-1.5 pt-1">
            <span className="px-2 font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
              Fitur &amp; Wawasan Sirkular
            </span>
            <div className="flex flex-col gap-1">
              <Link
                href="/pantau"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all ${
                  activePath === "/pantau"
                    ? "bg-primary/10 border border-primary/30 text-primary font-bold"
                    : "text-foreground hover:bg-muted/70"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <Calculator className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold block text-foreground truncate">Hitung Dampak</span>
                    <span className="text-[11px] text-muted-foreground block truncate">Kalkulator konversi limbah</span>
                  </div>
                </div>
              </Link>

              <Link
                href="/edukasi"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all ${
                  activePath === "/edukasi"
                    ? "bg-primary/10 border border-primary/30 text-primary font-bold"
                    : "text-foreground hover:bg-muted/70"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold block text-foreground truncate">Panduan &amp; Kuis</span>
                    <span className="text-[11px] text-muted-foreground block truncate">Modul pemilahan zero waste</span>
                  </div>
                </div>
              </Link>

              <Link
                href="/insight"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all ${
                  activePath.startsWith("/insight")
                    ? "bg-primary/10 border border-primary/30 text-primary font-bold"
                    : "text-foreground hover:bg-muted/70"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <Newspaper className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold block text-foreground truncate">Arsip Insight</span>
                    <span className="text-[11px] text-muted-foreground block truncate">Kajian &amp; riset lapangan</span>
                  </div>
                </div>
              </Link>

              <Link
                href="/galeri"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all ${
                  activePath === "/galeri"
                    ? "bg-primary/10 border border-primary/30 text-primary font-bold"
                    : "text-foreground hover:bg-muted/70"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <ImageIcon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold block text-foreground truncate">Dokumentasi</span>
                    <span className="text-[11px] text-muted-foreground block truncate">Foto transformasi fisik</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Section 3: Prominent Setor Sampah Action Button */}
          <div className="pt-2 border-t border-border/70">
            <Link
              href="/lapor"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm shadow-md transition-all active:scale-[0.98] group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-foreground/15 text-primary-foreground shrink-0">
                  <PackageCheck className="h-5 w-5" />
                </div>
                <div className="text-left min-w-0">
                  <span className="block font-black leading-tight text-primary-foreground truncate">Setor Sampah</span>
                  <span className="text-[11px] opacity-90 block mt-0.5 text-primary-foreground/80 truncate">Timbang di drop point &amp; klaim reward</span>
                </div>
              </div>
              <Badge className="bg-primary-foreground/20 text-primary-foreground border-none font-mono text-[10px] uppercase font-bold shrink-0 ml-2">
                Aksi Warga
              </Badge>
            </Link>
          </div>
        </nav>
      }
    />
  );
}