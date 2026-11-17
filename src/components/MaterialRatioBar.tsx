export default function MaterialRatioBar() {
  return (
    <figure className="mt-6 rounded-2xl border border-border bg-background p-5 sm:p-6">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em]">
        <span className="text-muted-foreground">Rasio Komposisi Material</span>
        <span className="text-foreground">Total: 100%</span>
      </div>

      <div
        aria-label="Rasio komposisi: 40 persen limbah plastik, 60 persen pasir dan agregat"
        className="mt-3 flex h-7 overflow-hidden rounded-lg font-mono text-xs font-bold"
        role="img"
      >
        {/* Two hues carry the split, so they get literal lime/emerald rather than theme tokens. */}
        <span
          className="flex items-center justify-center bg-[#A3E635] text-[10px] sm:text-[11px] text-[#0A110E] px-1 truncate"
          style={{ width: "40%" }}
        >
          40% Limbah Plastik
        </span>
        <span className="flex flex-1 items-center justify-center bg-emerald-500 text-[10px] sm:text-[11px] text-white px-1 truncate">
          60% Pasir &amp; Agregat
        </span>
      </div>

      <figcaption className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-muted-foreground">
        Suhu peleburan: ±180°C-220°C / Kuat tekan uji lab: standar mutu C/D (taman &amp; pejalan kaki)
      </figcaption>
    </figure>
  );
}
