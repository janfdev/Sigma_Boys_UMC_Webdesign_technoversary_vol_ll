import React from "react";
import { Scissors, Flame, Compass, Sprout } from "lucide-react";

export interface TutorialStep {
  step: string;
  estimate: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    step: "STEP 01",
    estimate: "ESTIMASI: 5 MNT",
    title: "Pemotongan Badan Botol",
    description:
      "Ukur dan tandai bagian tengah botol mineral 1,5L, lalu potong secara melingkar menjadi dua bagian. Bagian atas dengan leher botol berfungsi sebagai wadah tanam, sedangkan bagian bawah sebagai tandon larutan nutrisi.",
    icon: Scissors,
  },
  {
    step: "STEP 02",
    estimate: "ESTIMASI: 3 MNT",
    title: "Pembuatan Lubang Aerasi",
    description:
      "Buat lubang kecil pada tutup botol menggunakan solder atau paku panas untuk jalur sumbu kain. Tambahkan 3-4 lubang ventilasi kecil di sisi atas badan botol agar perakaran tanaman mendapat sirkulasi oksigen yang optimal.",
    icon: Flame,
  },
  {
    step: "STEP 03",
    estimate: "ESTIMASI: 4 MNT",
    title: "Pemasangan Sumbu Kapiler",
    description:
      "Masukkan potongan kain flanel atau sumbu katun berukuran 2 x 20 cm melalui lubang tutup botol hingga menjuntai ke dasar wadah bawah. Sumbu ini akan bekerja secara kapiler menyalurkan air nutrisi ke akar secara mandiri tanpa listrik.",
    icon: Compass,
  },
  {
    step: "STEP 04",
    estimate: "ESTIMASI: 8 MNT",
    title: "Penanaman & Dekorasi Estetika",
    description:
      "Balikkan bagian atas botol di atas wadah bawah yang telah diisi air nutrisi. Masukkan media tanam poros seperti sekam bakar atau hidroton dan bibit sayuran, lalu percantik tampilan luar menggunakan cat akrilik atau lilitan tali rami ramah lingkungan.",
    icon: Sprout,
  },
];

export default function UpcyclingStepGrid() {
  return (
    <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      {TUTORIAL_STEPS.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.step}
            className="group flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/40 hover:bg-card"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="inline-flex items-center gap-1.5 rounded bg-primary/15 border border-primary/40 px-2.5 py-0.5 font-mono text-xs font-bold text-primary">
                  <Icon className="size-3" aria-hidden="true" />
                  {item.step}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {item.estimate}
                </span>
              </div>

              {/* Step Content */}
              <h3 className="mt-4 text-base font-bold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
