import React from "react";
import { Droplets, Scissors, Paintbrush, Sparkles, ArrowRight } from "lucide-react";

export const FLOW_STEPS = [
  {
    step: "01",
    title: "SORTIR & CUCI",
    desc: "Lepas label & bilas bersih",
    icon: Droplets,
  },
  {
    step: "02",
    title: "PEMOTONGAN POLA",
    desc: "Bagi botol sesuai desain",
    icon: Scissors,
  },
  {
    step: "03",
    title: "FINISHING & CAT",
    desc: "Haluskan tepi & beri warna",
    icon: Paintbrush,
  },
  {
    step: "04",
    title: "PRODUK SIAP PAKAI",
    desc: "Siap tanam atau pakai",
    icon: Sparkles,
  },
];

export default function UpcyclingFlowBar() {
  return (
    <div className="my-6 rounded-xl border border-border bg-card p-4 sm:p-5">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 font-mono text-[11px] uppercase tracking-wider">
        <span className="text-primary">ALUR TRANSFORMASI MATERIAL PET</span>
        <span className="text-primary">EFISIENSI RESIDU: 95%</span>
      </div>

      {/* 4-Step Flow Grid with visual connectors */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {FLOW_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isLast = idx === FLOW_STEPS.length - 1;
          return (
            <div
              key={step.step}
              className="relative flex flex-col justify-between rounded-lg border border-border bg-background p-3 transition-colors hover:border-primary/40"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary">
                    {step.step}.
                  </span>
                  <span className="flex size-6 items-center justify-center rounded bg-card text-primary">
                    <Icon className="size-3.5" aria-hidden="true" />
                  </span>
                </div>
                <h4 className="mt-2 text-xs font-bold uppercase tracking-tight text-foreground">
                  {step.title}
                </h4>
                <p className="mt-1 text-[11px] leading-tight text-muted-foreground">
                  {step.desc}
                </p>
              </div>

              {!isLast ? (
                <div
                  aria-hidden="true"
                  className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 text-border"
                >
                  <ArrowRight className="size-3 text-primary" />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
