import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HydrologySimulator, {
  FLOW_BASE,
  RAIN_DEFAULT,
  RAIN_MAX,
  RAIN_MIN,
  calculateFlow,
  flowStatus,
} from "@/components/HydrologySimulator";

describe("calculateFlow", () => {
  it("returns the PRD baseline at the default rainfall", () => {
    expect(calculateFlow(RAIN_DEFAULT, true)).toBe(FLOW_BASE);
  });

  it("scales linearly with rainfall", () => {
    expect(calculateFlow(360, true)).toBe(calculateFlow(RAIN_MAX, true));
    expect(calculateFlow(90, true)).toBe(Math.round(FLOW_BASE / 2));
  });

  it("clamps rainfall outside the slider range", () => {
    expect(calculateFlow(0, true)).toBe(calculateFlow(RAIN_MIN, true));
    expect(calculateFlow(10_000, true)).toBe(calculateFlow(RAIN_MAX, true));
  });

  it("drops roughly 45 percent on critical land", () => {
    const forest = calculateFlow(RAIN_DEFAULT, true);
    const critical = calculateFlow(RAIN_DEFAULT, false);
    expect(critical / forest).toBeCloseTo(0.55, 2);
  });
});

describe("flowStatus", () => {
  it("bands the discharge into three states", () => {
    expect(flowStatus(1500).label).toBe("KRITIS");
    expect(flowStatus(FLOW_BASE).label).toBe("CADANGAN OPTIMAL");
    expect(flowStatus(5000).label).toBe("SUPLAI AMAN");
  });
});

describe("HydrologySimulator", () => {
  it("recalculates the discharge when rainfall and land cover change", () => {
    render(<HydrologySimulator />);
    const slider = screen.getByRole("slider", { name: /Curah Hujan/i });

    fireEvent.change(slider, { target: { value: "300" } });
    expect(screen.getByText(calculateFlow(300, true).toLocaleString("id-ID"))).toBeTruthy();
    expect(screen.getByText(flowStatus(calculateFlow(300, true)).label)).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /Lahan Kritis/i }));
    expect(screen.getByText(calculateFlow(300, false).toLocaleString("id-ID"))).toBeTruthy();
  });
});