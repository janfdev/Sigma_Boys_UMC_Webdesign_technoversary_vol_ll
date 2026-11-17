import React from "react";
import { ShoppingBag, SplitSquareVertical, PackageOpen } from "lucide-react";

export interface ActionStep {
  number: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  tag: string;
}

export const ACTION_STEPS: ActionStep[] = [
  {
    number: 1,
    title: "Bawa Starter Kit Ramah Lingkungan",
    description:
      "Membiasakan diri membawa tas belanja lipat (tote bag), botol minum isi ulang (tumbler), serta kotak makan pribadi saat beraktivitas di luar rumah atau membeli makanan bungkus. Kebiasaan sederhana ini secara instan memangkas puluhan lembar kantong kresek dan kemasan styrofoam setiap bulannya.",
    icon: ShoppingBag,
    tag: "Perlengkapan Harian",
  },
  {
    number: 2,
    title: "Memilah Tempat Sampah di Rumah",
    description:
      "Menyediakan minimal dua wadah terpisah di dapur: satu khusus sampah organik (sisa makanan, kulit buah) dan satu untuk sampah anorganik bersih (kertas, botol PET, kaleng) agar bernilai jual di Bank Sampah. Pemilahan sejak hulu menjaga material daur ulang tidak tercemar residu basah dan siap masuk rantai sirkular.",
    icon: SplitSquareVertical,
    tag: "Pemisahan Sumber",
  },
  {
    number: 3,
    title: "Membeli Bahan dalam Ukuran Curah (Bulk)",
    description:
      "Mengurangi kemasan saset sekali pakai dengan membeli kebutuhan pokok seperti beras, minyak, sabun, atau rempah dalam kemasan besar maupun toko curah (bulk store). Mengisi ulang wadah lama yang sudah ada di rumah jauh lebih hemat pengeluaran sekaligus menekan timbulan limbah plastik fleksibel.",
    icon: PackageOpen,
    tag: "Konsumsi Bijak",
  },
];

export default function ActionStepsList() {
  return (
    <div className="my-6 flex flex-col gap-3.5">
      {ACTION_STEPS.map((step) => {
        const Icon = step.icon;
        return (
          <div
            key={step.number}
            className="group flex items-start gap-4 rounded-xl border border-border bg-card p-4 sm:p-5 transition-all duration-200 hover:border-primary/40 hover:bg-card"
          >
            {/* Number box matching PRD spec: w-7 h-7 (or responsive sm:w-8 sm:h-8) rounded bg-primary/15 border border-primary/40 */}
            <div
              aria-hidden="true"
              className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded border border-primary/40 bg-primary/15 font-mono text-xs sm:text-sm font-bold text-primary"
            >
              {step.number}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm sm:text-base font-bold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-wider text-primary inline-flex items-center gap-1">
                  <Icon className="size-3" aria-hidden="true" />
                  {step.tag}
                </span>
              </div>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
