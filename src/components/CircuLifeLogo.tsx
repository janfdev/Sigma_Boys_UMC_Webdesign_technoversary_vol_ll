import React from "react";
import { cn } from "@/lib/utils";

export interface CircuLifeLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showWordmark?: boolean;
  showTag?: boolean;
}

export function CircuLifeMark({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/circulife-mark.png"
      alt="CircuLife Logo Mark"
      className={cn("shrink-0 object-contain", className)}
      width={48}
      height={48}
      loading="eager"
      decoding="async"
    />
  );
}

export function CircuLifeLogo({
  className,
  size = "md",
  showWordmark = false,
  showTag = false,
}: CircuLifeLogoProps) {
  const sizeMap = {
    sm: "h-8 w-8",
    md: "h-10 w-10 sm:h-11 sm:w-11",
    lg: "h-12 w-12 sm:h-14 sm:w-14",
    xl: "h-16 w-16 sm:h-20 sm:w-20",
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-xl bg-card border border-border/80 shadow-sm transition-transform group-hover:scale-105 p-1.5 overflow-hidden",
          sizeMap[size]
        )}
      >
        <CircuLifeMark className="h-full w-full object-contain" />
      </div>

      {showWordmark && (
        <div className="flex flex-col">
          <span className="text-base font-black tracking-tight text-foreground sm:text-lg leading-tight font-sans">
            CIRCULIFE
          </span>
          {showTag && (
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground tabular-nums">
              Digital Zero Waste & Value Hub
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default CircuLifeLogo;
