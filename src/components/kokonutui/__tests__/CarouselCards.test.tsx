import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CarouselCards, { type RailItem } from "../carousel-cards";

const items: RailItem[] = [
  { id: "satu", image: "/a.png", imageAlt: "Foto satu", href: "/galeri" },
  { id: "dua", image: "/b.png", imageAlt: "Foto dua", href: "/galeri" },
  { id: "tiga", image: "/c.png", imageAlt: "Foto tiga", href: "/galeri" },
];

const setReducedMotion = (reduce: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn((query: string) => ({
      matches: reduce && query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};

const slides = () => screen.getAllByRole("listitem");
const current = () => slides().findIndex((s) => s.getAttribute("aria-current") === "true");

describe("hero carousel", () => {
  beforeEach(() => {
    setReducedMotion(false);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts on the first card and marks it current", () => {
    render(<CarouselCards items={items} title="Galeri" />);
    expect(slides()).toHaveLength(3);
    expect(current()).toBe(0);
  });

  it("advances on its own and loops back to the first card", () => {
    render(<CarouselCards autoplay autoplayInterval={1000} items={items} title="Galeri" />);
    act(() => vi.advanceTimersByTime(1000));
    expect(current()).toBe(1);
    act(() => vi.advanceTimersByTime(1000));
    expect(current()).toBe(2);
    act(() => vi.advanceTimersByTime(1000));
    expect(current()).toBe(0);
  });

  it("pauses and resumes with the labelled control", () => {
    render(<CarouselCards autoplay autoplayInterval={1000} items={items} title="Galeri" />);
    fireEvent.click(screen.getByRole("button", { name: "Jeda putaran otomatis" }));
    act(() => vi.advanceTimersByTime(3000));
    expect(current()).toBe(0);
    fireEvent.click(screen.getByRole("button", { name: "Lanjutkan putaran otomatis" }));
    act(() => vi.advanceTimersByTime(1000));
    expect(current()).toBe(1);
  });

  it("pauses when a user focuses the controls", () => {
    render(<CarouselCards autoplay autoplayInterval={1000} items={items} title="Galeri" />);
    const pause = screen.getByRole("button", { name: "Jeda putaran otomatis" });
    act(() => pause.focus());
    act(() => vi.advanceTimersByTime(2000));
    expect(current()).toBe(0);
  });

  it("never autoplays under reduced motion and offers no pause control", () => {
    setReducedMotion(true);
    render(<CarouselCards autoplay autoplayInterval={1000} items={items} title="Galeri" />);
    act(() => vi.advanceTimersByTime(5000));
    expect(current()).toBe(0);
    expect(screen.queryByRole("button", { name: /putaran otomatis/ })).toBeNull();
  });

  it("ignores pointer drags and horizontal swipes", () => {
    render(<CarouselCards autoplay autoplayInterval={99999} items={items} title="Galeri" />);
    const region = screen.getByRole("region", { name: "Galeri" });
    fireEvent.pointerDown(region, { clientX: 400, pointerId: 1, button: 0 });
    fireEvent.pointerMove(region, { clientX: 40, pointerId: 1 });
    fireEvent.pointerUp(region, { clientX: 40, pointerId: 1 });
    expect(current()).toBe(0);
  });

  it("moves with the arrow keys from the focusable rail", () => {
    render(<CarouselCards autoplay={false} items={items} title="Galeri" />);
    const rail = screen.getByRole("region", { name: "Galeri, gunakan tombol panah untuk berpindah" });
    expect(rail).toHaveAttribute("tabindex", "0");
    const sections = screen.getAllByRole("region");
    fireEvent.keyDown(sections[1], { key: "ArrowRight" });
    expect(current()).toBe(1);
    fireEvent.keyDown(rail, { key: "End" });
    expect(current()).toBe(2);
    fireEvent.keyDown(rail, { key: "Home" });
    expect(current()).toBe(0);
  });

  it("keeps every card linked to the gallery by name", () => {
    render(<CarouselCards autoplay={false} items={items} title="Galeri" />);
    for (const item of items) {
      const link = screen.getByRole("link", { name: item.imageAlt });
      expect(link).toHaveAttribute("href", "/galeri");
    }
  });
});
