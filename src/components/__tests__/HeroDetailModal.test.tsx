import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HeroDetailModal from "../HeroDetailModal";
import { HERO_CAROUSEL_DATA } from "@/data/heroCarouselData";

describe("HeroDetailModal Component", () => {
  it("does not render when open is false", () => {
    const onOpenChange = vi.fn();
    render(
      <HeroDetailModal
        open={false}
        onOpenChange={onOpenChange}
        items={HERO_CAROUSEL_DATA}
      />
    );

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("renders modal with initial item details and counter pill", () => {
    const onOpenChange = vi.fn();
    render(
      <HeroDetailModal
        open={true}
        initialIndex={0}
        onOpenChange={onOpenChange}
        items={HERO_CAROUSEL_DATA}
      />
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    // Verify portal directly in document.body
    expect(document.body.contains(dialog)).toBe(true);
    expect(dialog).toHaveClass("z-[100]");

    expect(
      screen.getByRole("heading", { name: HERO_CAROUSEL_DATA[0].title, level: 2 })
    ).toBeInTheDocument();
    expect(screen.getByText(HERO_CAROUSEL_DATA[0].badge)).toBeInTheDocument();
    expect(screen.getByText(HERO_CAROUSEL_DATA[0].description)).toBeInTheDocument();
    expect(screen.getByText(HERO_CAROUSEL_DATA[0].impactDescription)).toBeInTheDocument();
    expect(screen.getByTestId("hero-modal-counter")).toHaveTextContent("01 / 09");
  });

  it("configures details column with responsive classes to hide explanation on mobile", () => {
    const onOpenChange = vi.fn();
    render(
      <HeroDetailModal
        open={true}
        initialIndex={0}
        onOpenChange={onOpenChange}
        items={HERO_CAROUSEL_DATA}
      />
    );

    const detailsCol = screen.getByTestId("hero-modal-details");
    expect(detailsCol).toHaveClass("hidden");
    expect(detailsCol).toHaveClass("md:flex");
  });

  it("navigates forward and loops back using next button", () => {
    const onOpenChange = vi.fn();
    render(
      <HeroDetailModal
        open={true}
        initialIndex={8}
        onOpenChange={onOpenChange}
        items={HERO_CAROUSEL_DATA}
      />
    );

    expect(screen.getByTestId("hero-modal-counter")).toHaveTextContent("09 / 09");

    const nextBtn = screen.getByRole("button", { name: "Foto berikutnya" });
    fireEvent.click(nextBtn);

    expect(screen.getByTestId("hero-modal-counter")).toHaveTextContent("01 / 09");
    expect(
      screen.getByRole("heading", { name: HERO_CAROUSEL_DATA[0].title, level: 2 })
    ).toBeInTheDocument();
  });

  it("navigates backward and loops to the end using prev button", () => {
    const onOpenChange = vi.fn();
    render(
      <HeroDetailModal
        open={true}
        initialIndex={0}
        onOpenChange={onOpenChange}
        items={HERO_CAROUSEL_DATA}
      />
    );

    const prevBtn = screen.getByRole("button", { name: "Foto sebelumnya" });
    fireEvent.click(prevBtn);

    expect(screen.getByTestId("hero-modal-counter")).toHaveTextContent("09 / 09");
    expect(
      screen.getByRole("heading", { name: HERO_CAROUSEL_DATA[8].title, level: 2 })
    ).toBeInTheDocument();
  });

  it("supports keyboard navigation with ArrowRight, ArrowLeft, and Escape", () => {
    const onOpenChange = vi.fn();
    render(
      <HeroDetailModal
        open={true}
        initialIndex={0}
        onOpenChange={onOpenChange}
        items={HERO_CAROUSEL_DATA}
      />
    );

    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getByTestId("hero-modal-counter")).toHaveTextContent("02 / 09");

    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByTestId("hero-modal-counter")).toHaveTextContent("01 / 09");

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("closes when close button is clicked", () => {
    const onOpenChange = vi.fn();
    render(
      <HeroDetailModal
        open={true}
        initialIndex={0}
        onOpenChange={onOpenChange}
        items={HERO_CAROUSEL_DATA}
      />
    );

    const closeBtn = screen.getByRole("button", { name: "Tutup dialog" });
    fireEvent.click(closeBtn);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("closes when backdrop is clicked", () => {
    const onOpenChange = vi.fn();
    render(
      <HeroDetailModal
        open={true}
        initialIndex={0}
        onOpenChange={onOpenChange}
        items={HERO_CAROUSEL_DATA}
      />
    );

    const backdrop = screen.getByRole("dialog");
    fireEvent.click(backdrop);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
