import React from "react";
import { act, render, screen } from "@testing-library/react";
import { flushSync } from "react-dom";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AnimatedNumber } from "../ui/animated-number";

afterEach(() => vi.restoreAllMocks());

describe("registry AnimatedNumber", () => {
  it("finishes at the latest value without restarting for unrelated renders", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({ matches: false } as MediaQueryList);
    let time = 0;
    let frame: FrameRequestCallback | undefined;
    vi.spyOn(performance, "now").mockImplementation(() => time);
    const started = 0;
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => { frame = callback; return 1; });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => { frame = undefined; });
    const tick = (next: number) => act(() => { time = next; const callback = frame; frame = undefined; callback?.(time); });
    const { rerender } = render(<AnimatedNumber value={1200} duration={100} />);
    tick(started + 50);
    const node = () => document.querySelector('[data-slot="animated-number"]');
    const intermediate = node()?.textContent;
    rerender(<AnimatedNumber value={1200} duration={100} className="font-bold" />);
    expect(node()?.textContent).toBe(intermediate);
    rerender(<AnimatedNumber value={850} duration={100} />);
    tick(started + 150);
    expect(screen.getByText("850")).toHaveTextContent("850");
    expect(frame).toBeUndefined();
  });

  it("reserves enough width for animated fractional frames", () => {
    render(<AnimatedNumber value={1} />);
    expect(screen.getByText("1")).toHaveStyle({ minWidth: "4ch" });
  });

  it("renders tightly without minWidth when compact is enabled", () => {
    render(<AnimatedNumber value={1} compact />);
    const el = screen.getByText("1");
    expect(el).toHaveClass("inline");
    expect(el.style.minWidth).toBe("");
  });

  it("renders the final value immediately for zero duration", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({ matches: false } as MediaQueryList);
    render(<AnimatedNumber value={42} duration={0} />);
    expect(screen.getByText("42")).toHaveTextContent("42");
  });

  it("hydrates final server values without mismatch under reduced motion", () => {
    const container = document.createElement("div");
    container.innerHTML = renderToString(<AnimatedNumber value={184.6} />);
    expect(container.textContent).toBe("184,6");
    const errors: unknown[] = [];
    let root: ReturnType<typeof hydrateRoot>;
    act(() => { flushSync(() => { root = hydrateRoot(container, <AnimatedNumber value={184.6} />, { onRecoverableError: error => errors.push(error) }); }); });
    expect(container.textContent).toBe("184,6");
    expect(errors).toEqual([]);
    act(() => root.unmount());
  });
});
