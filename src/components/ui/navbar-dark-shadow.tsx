"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface NavbarDarkShadowProps {
  children?: React.ReactNode;
  className?: string;
  threshold?: number;
  banner?: React.ReactNode;
  brand?: React.ReactNode;
  desktopNav?: React.ReactNode;
  actions?: React.ReactNode;
  mobileMenu?: React.ReactNode;
  mobileMenuOpen?: boolean;
  onBackdropClick?: () => void;
}

/**
 * NavbarDarkShadow
 * Tactile ridge-and-groove shadow system inspired by Aceternity UI.
 * Features auto-shrink responsive docking on scroll with hardware-accelerated transitions.
 */
export function NavbarDarkShadow({
  children,
  className,
  threshold = 30,
  banner,
  brand,
  desktopNav,
  actions,
  mobileMenu,
  mobileMenuOpen = false,
  onBackdropClick,
}: NavbarDarkShadowProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setIsScrolled(window.scrollY > threshold);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
        "bg-background/95 dark:bg-[#0A110E]/95 backdrop-blur-md",
        isScrolled ? "pt-3 sm:pt-3.5 pb-1.5" : "pt-0 pb-0",
        className
      )}
    >
      {/* Dynamic Announcement Banner with smooth collapse on scroll */}
      {banner && (
        <div
          className={cn(
            "w-full transition-all duration-300 ease-out origin-top",
            isScrolled
              ? "max-h-0 opacity-0 overflow-hidden pointer-events-none -translate-y-2"
              : "max-h-20 opacity-100 translate-y-0"
          )}
          aria-hidden={isScrolled}
        >
          {banner}
        </div>
      )}

      {/* Nav Container with Adaptive Resizing & Aceternity Tactile Ridge & Groove Dark Shadow */}
      <div
        className={cn(
          "mx-auto transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
          isScrolled
            ? "max-w-5xl px-3 sm:px-6"
            : "max-w-7xl px-4 sm:px-6 lg:px-8 w-full"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
            isScrolled
              ? "h-14 px-4 sm:px-6 rounded-2xl sm:rounded-full bg-card dark:bg-[#111C17] border border-border/70 dark:border-white/15 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_12px_32px_-8px_rgba(0,0,0,0.12),inset_0_1px_0_0_rgba(255,255,255,0.8),inset_0_-1px_0_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_16px_40px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.18),inset_0_-1px_0_0_rgba(0,0,0,0.6)] ring-1 ring-primary/10"
              : "h-16 sm:h-18 px-0 rounded-none border-b border-border/80 bg-transparent shadow-none"
          )}
        >
          {/* Brand Slot */}
          <div className="flex items-center transition-transform duration-200">
            {brand}
          </div>

          {/* Desktop Nav Slot (lg and above to prevent tablet width collisions) */}
          {desktopNav && (
            <div className="hidden lg:flex items-center gap-1">
              {desktopNav}
            </div>
          )}

          {/* Actions Slot (CTA button, theme toggle, mobile toggle) */}
          <div className="flex items-center gap-2">
            {actions}
          </div>
        </div>
      </div>

      {/* Children override if provided directly */}
      {children}

      {/* Mobile Menu Drawer with matching tactile dark shadow and dismissible backdrop */}
      {mobileMenuOpen && mobileMenu && (
        <>
          {/* Fullscreen Backdrop Scrim */}
          <div
            aria-hidden="true"
            onClick={onBackdropClick}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
          />
          <div
            data-testid="mobile-menu"
            className="relative z-50 mx-auto mt-2 max-w-[calc(100vw-1.5rem)] sm:max-w-lg max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain rounded-3xl border border-border/80 dark:border-[#1E3028] bg-card dark:bg-[#111C17] p-4 sm:p-5 shadow-2xl lg:hidden animate-in slide-in-from-top-2 duration-200"
          >
            {mobileMenu}
          </div>
        </>
      )}
    </header>
  );
}
