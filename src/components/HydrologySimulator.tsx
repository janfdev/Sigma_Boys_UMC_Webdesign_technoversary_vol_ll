"use client";

import { CloudRain, Droplets, Trees, TrendingDown } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export const RAIN_MIN = 50;
export const RAIN_MAX = 300;
export const RAIN_DEFAULT = 180;
/** Debit acuan pada 180 mm/bulan dengan tutupan hutan alami. */
export const FLOW_BASE = 4250;
/** Lahan kritis kehilangan sekitar 45 persen daya serap. */
export const CRITICAL_FACTOR = 0.55;

export type FlowTone = "critical" | "watch" | "safe";

export function calculateFlow(rain: number, forest: boolean) {
  const clamped = Math.min(Math.max(rain, RAIN_MIN), RAIN_MAX);
  // ponytail: response is linear in rainfall; swap for a curve once real
  // catchment discharge data is available for calibration.
  const raw = (FLOW_BASE * clamped) / RAIN_DEFAULT;
  return Math.round(raw * (forest ? 1 : CRITICAL_FACTOR));
}

export function flowStatus(flow: number): { label: string; tone: FlowTone } {
  if (flow < 2000) {
    return { label: "KRITIS", tone: "critical" };
  }
  if (flow < 4500) {
    return { label: "CADANGAN OPTIMAL", tone: "watch" };
  }
  return { label: "SUPLAI AMAN", tone: "safe" };
}

const TONE_CLASS: Record<FlowTone, string> = {
  critical: "border-red-500/40 bg-red-500/10 text-red-400",
  watch: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  safe: "border-primary/40 bg-primary/15 text-primary",
};

const RAIN_MARKS = [50, 120, 180, 240, 300];

export default function HydrologySimulator() {
  const [rain, setRain] = useState(RAIN_DEFAULT);
  const [forest, setForest] = useState(true);

  const flow = useMemo(() => calculateFlow(rain, forest), [rain, forest]);
  const status = flowStatus(flow);
  const ratio = Math.min(flow / (FLOW_BASE * 1.6), 1);
  const rainRatio = (rain - RAIN_MIN) / (RAIN_MAX - RAIN_MIN);
  const drops = forest ? 6 : 4;

  return (
    <section
      aria-labelledby="simulasi-hidrologi-heading"
      className="overflow-hidden rounded-2xl border border-border bg-card"
      id="simulasi-hidrologi"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
        <div>
          <h3
            className="text-sm font-semibold tracking-tight text-foreground sm:text-base"
            id="simulasi-hidrologi-heading"
          >
            Simulasi Hidrologi &amp; Serapan Air Gunung Ciremai
          </h3>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Model edukasi / bukan data pengukuran resmi
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
          <span aria-hidden="true" className="size-1.5 animate-pulse rounded-full bg-primary" />
          Live Model
        </span>
      </div>

      <div className="px-4 pt-4 sm:px-5">
        <svg
          aria-label={`Penampang gunung: curah hujan ${rain} milimeter per bulan, tutupan ${
            forest ? "hutan alami" : "lahan kritis"
          }, debit mata air ${flow} liter per detik`}
          className="h-auto w-full"
          role="img"
          viewBox="0 0 640 240"
        >
          <defs>
            <linearGradient id="hydro-sky" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.12" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* grid */}
          <g className="stroke-border" strokeWidth="0.6">
            {[40, 80, 120, 160, 200].map((y) => (
              <line key={y} x1="8" x2="632" y1={y} y2={y} />
            ))}
            {[80, 160, 240, 320, 400, 480, 560].map((x) => (
              <line key={x} x1={x} x2={x} y1="16" y2="232" />
            ))}
          </g>

          <rect fill="url(#hydro-sky)" height="120" width="640" x="0" y="0" />

          {/* rain cloud: density follows the slider */}
          <g className="fill-muted-foreground/40">
            <ellipse cx="120" cy="52" rx="46" ry="16" />
            <ellipse cx="96" cy="46" rx="24" ry="13" />
            <ellipse cx="146" cy="44" rx="22" ry="12" />
          </g>
          <g className="stroke-primary" strokeLinecap="round" strokeWidth="1.6">
            {Array.from({ length: drops }).map((_, index) => (
              <line
                className={cn("hydro-rain", !forest && "opacity-60")}
                key={index}
                style={{
                  animationDelay: `${index * 0.18}s`,
                  opacity: 0.35 + rainRatio * 0.65,
                }}
                x1={78 + index * 18}
                x2={78 + index * 18}
                y1="70"
                y2="96"
              />
            ))}
          </g>

          {/* mountain cross-section */}
          <path
            className="fill-secondary/40 stroke-primary"
            d="M40 210 L200 120 L260 88 L320 58 L392 96 L470 140 L600 210 Z"
            strokeWidth="2"
          />
          <path
            className="fill-none stroke-primary/40"
            d="M60 210 Q200 150 320 58 Q440 150 580 210"
            strokeDasharray="4 6"
            strokeWidth="1"
          />

          {/* infiltration arrows */}
          <g className="stroke-primary/70" strokeWidth="1.4">
            {[
              [200, 128],
              [260, 100],
              [460, 152],
            ].map(([x, y], index) => (
              <line
                className={cn("hydro-seep", !forest && "opacity-50")}
                key={x}
                style={{ animationDelay: `${index * 0.3}s` }}
                x1={x}
                x2={x}
                y1={y}
                y2={y + 34}
              />
            ))}
          </g>

          {/* forest vs eroded ground markers */}
          {forest ? (
            <g className="fill-primary/70">
              {[150, 190, 230, 420, 460, 500].map((x, index) => (
                <path
                  d={`M${x} 196 l10 -20 l10 20 Z`}
                  key={x}
                  opacity={0.5 + (index % 3) * 0.18}
                />
              ))}
            </g>
          ) : (
            <g className="fill-muted-foreground/30">
              {[150, 220, 430, 500].map((x) => (
                <rect height="6" key={x} rx="2" width="26" x={x} y="190" />
              ))}
            </g>
          )}

          {/* spring outlets at the foot of the mountain */}
          {[
            [92, 206],
            [548, 206],
          ].map(([x, y]) => (
            <g key={x}>
              <circle
                className={forest ? "fill-primary/25" : "fill-red-500/20"}
                cx={x}
                cy={y}
                r={6 + ratio * 12}
                style={{ transition: "r 400ms ease-out" }}
              />
              <circle
                className={forest ? "fill-primary" : "fill-red-400"}
                cx={x}
                cy={y}
                r={3 + ratio * 4}
                style={{ transition: "r 400ms ease-out" }}
              />
            </g>
          ))}

          <text
            className="fill-muted-foreground font-mono"
            fontSize="9"
            letterSpacing="0.14em"
            x="92"
            y="228"
          >
            MATA AIR
          </text>
          <text
            className="fill-muted-foreground font-mono"
            fontSize="9"
            letterSpacing="0.14em"
            textAnchor="end"
            x="548"
            y="228"
          >
            MATA AIR
          </text>
          <text
            className="fill-muted-foreground font-mono"
            fontSize="9"
            letterSpacing="0.14em"
            textAnchor="middle"
            x="320"
            y="46"
          >
            3.078 MDPL
          </text>
        </svg>
      </div>

      <div className="grid gap-4 px-4 py-5 sm:px-5 md:grid-cols-3">
        <div>
          <label
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
            htmlFor="curah-hujan"
          >
            <CloudRain aria-hidden="true" className="size-3.5" />
            Curah Hujan
          </label>
          <output
            className="mt-2 block text-lg font-bold tabular-nums text-foreground"
            htmlFor="curah-hujan"
          >
            {rain} <span className="text-xs font-medium text-muted-foreground">mm/bulan</span>
          </output>
          <input
            aria-valuetext={`${rain} milimeter per bulan`}
            className="mt-2 w-full cursor-pointer accent-primary"
            id="curah-hujan"
            max={RAIN_MAX}
            min={RAIN_MIN}
            onChange={(event) => setRain(Number(event.target.value))}
            step={10}
            type="range"
            value={rain}
          />
          <div
            aria-hidden="true"
            className="mt-1 flex justify-between font-mono text-[10px] text-muted-foreground/70"
          >
            {RAIN_MARKS.map((mark) => (
              <span key={mark}>{mark}</span>
            ))}
          </div>
        </div>

        <div>
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            <Trees aria-hidden="true" className="size-3.5" />
            Tutupan Lahan
          </span>
          <div className="mt-2 inline-flex rounded-full border border-border bg-background p-0.5">
            {[
              { label: "Hutan Alami", value: true },
              { label: "Lahan Kritis", value: false },
            ].map((option) => (
              <button
                aria-pressed={forest === option.value}
                className={cn(
                  "cursor-pointer rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors",
                  forest === option.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                key={option.label}
                onClick={() => setForest(option.value)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-[11px] leading-snug text-muted-foreground">
            {forest
              ? "Akar dan serasah menjaga pori tanah, air meresap lambat dan stabil."
              : "Permukaan padat mempercepat limpasan, mata air menyusut."}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-background p-3">
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            <Droplets aria-hidden="true" className="size-3.5" />
            Debit Mata Air
          </span>
          <p className="mt-1 text-2xl font-black tabular-nums text-primary">
            {flow.toLocaleString("id-ID")}
            <span className="ml-1 text-xs font-medium text-muted-foreground">L/detik</span>
          </p>
          <span
            className={cn(
              "mt-2 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]",
              TONE_CLASS[status.tone]
            )}
          >
            {status.tone === "critical" ? (
              <TrendingDown aria-hidden="true" className="size-3" />
            ) : (
              <Droplets aria-hidden="true" className="size-3" />
            )}
            {status.label}
          </span>
          <p className="mt-2 text-[11px] leading-snug text-muted-foreground">
            Acuan 180 mm pada hutan alami: {FLOW_BASE.toLocaleString("id-ID")} L/detik.
          </p>
        </div>
      </div>
    </section>
  );
}