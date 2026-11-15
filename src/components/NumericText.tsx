"use client";

import React from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";

// ponytail: only explicitly selected display text; never scan or mutate the DOM.
const tokens = /(?:SNI|ISO|NFPA|WCAG|IP|K-|B-|RW |Pos |SDG |Target |Fig |kode |Kelas |Tier |v)\s*[\dA-Z][\w.:-]*|#[\dA-Fa-f]+|\b\w*[A-Za-z]\d\w*\b|\b(?:2026|2030)\b|\b\d{2}[.:]\d{2}(?:\s*-\s*\d{2}[.:]\d{2})?\s*WIB|\b0\d{2,}(?:[- ]\d+)*|[+-]?\d+(?:[.,]\d+)*/g;

export function NumericText({ text, svg = false }: { text: string | number | undefined; svg?: boolean }) {
  const source = String(text ?? "");
  const parts: React.ReactNode[] = [];
  let cursor = 0;
  for (const match of source.matchAll(tokens)) {
    const token = match[0];
    const index = match.index!;
    parts.push(source.slice(cursor, index));
    if (/^[+-]?\d+(?:[.,]\d+)*$/.test(token) && !/^(2026|2030)$/.test(token) && !/^0\d{2,}/.test(token)) {
      const grouped = /^[+-]?\d{1,3}(?:\.\d{3})+(?:,\d+)?$/.test(token);
      const plain = /^[+-]?\d+(?:[.,]\d+)?$/.test(token);
      const decimalDigits = grouped ? token.split(",")[1] : plain && /[.,]/.test(token) ? token.split(/[.,]/)[1] : undefined;
      const safe = (grouped || plain) && (decimalDigits?.length ?? 0) <= 20;
      if (!safe) {
        parts.push(token);
        cursor = index + token.length;
        continue;
      }
      const normalized = grouped ? token.replaceAll(".", "").replace(",", ".") : token.replace(",", ".");
      const decimals = decimalDigits?.length ?? 0;
      const number = Number(normalized);
      if (!Number.isFinite(number)) {
        parts.push(token);
        cursor = index + token.length;
        continue;
      }
      const formatter = new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        minimumIntegerDigits: /^0\d$/.test(token) ? 2 : 1,
        signDisplay: token.startsWith("+") ? "always" : "auto",
      });
      parts.push(<AnimatedNumber key={index} value={number} format={formatter.format} as={svg ? "tspan" : "span"} />);
    } else {
      parts.push(token);
    }
    cursor = index + token.length;
  }
  parts.push(source.slice(cursor));
  return <>{parts}</>;
}
