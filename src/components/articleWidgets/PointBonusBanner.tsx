import React from "react";
import Link from "next/link";
import { Gift, ArrowRight } from "lucide-react";

export default function PointBonusBanner() {
  return (
    <div className="my-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-primary/40 bg-card p-4 sm:p-5 transition-colors hover:border-primary/60">
      <div className="flex items-start sm:items-center gap-3.5">
        <div
          aria-hidden="true"
          className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-primary/50 bg-primary/15 text-primary"
        >
          <Gift className="size-5" />
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-foreground">
          Punya stok botol plastik PET bersih dalam jumlah banyak di rumah? Setorkan melalui mitra
          Bank Sampah CircuLife untuk mendapatkan konversi{" "}
          <strong className="text-primary font-semibold">+150 Poin Reward</strong> per kilogram!
        </p>
      </div>

      <Link
        href="/lapor"
        className="inline-flex w-full sm:w-auto justify-center shrink-0 items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/15 px-3.5 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary/25"
      >
        <span>Setor Sekarang</span>
        <ArrowRight className="size-3" aria-hidden="true" />
      </Link>
    </div>
  );
}
