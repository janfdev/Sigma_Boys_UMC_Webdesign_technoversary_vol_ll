import React from "react";
import { Ban, TrendingDown, RefreshCw, Recycle, Sprout } from "lucide-react";

export interface PillarItem {
  number: string;
  name: string;
  action: string;
  description: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
}

export const FIVE_PILLARS: PillarItem[] = [
  {
    number: "01",
    name: "REFUSE",
    action: "Menolak",
    description: "Tolak plastik sekali pakai & barang tak perlu.",
    icon: Ban,
  },
  {
    number: "02",
    name: "REDUCE",
    action: "Mengurangi",
    description: "Kurangi konsumsi barang berlebihan.",
    icon: TrendingDown,
  },
  {
    number: "03",
    name: "REUSE",
    action: "Menggunakan Ulang",
    description: "Gunakan kembali wadah & kemasan.",
    icon: RefreshCw,
  },
  {
    number: "04",
    name: "RECYCLE",
    action: "Mendaur Ulang",
    description: "Pilah & salurkan ke bank sampah.",
    icon: Recycle,
  },
  {
    number: "05",
    name: "ROT",
    action: "Membusukkan",
    description: "Komposkan sisa organik dari dapur.",
    icon: Sprout,
  },
];

export default function FivePillarsGrid() {
  return (
    <div className="my-6">
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
        {FIVE_PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.name}
              className="group flex flex-col justify-between rounded-xl border border-border bg-card p-3 sm:p-3.5 transition-all duration-200 hover:border-primary/40 hover:bg-card last:col-span-2 sm:last:col-span-1"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary">
                    {pillar.number}.
                  </span>
                  <span className="flex size-6 items-center justify-center rounded bg-border text-primary transition-colors group-hover:bg-primary/20">
                    <Icon className="size-3.5" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-2.5 text-xs sm:text-sm font-bold tracking-tight text-foreground">
                  {pillar.name}
                </h3>
                <p className="text-[10px] uppercase tracking-wider text-primary font-mono">
                  {pillar.action}
                </p>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
