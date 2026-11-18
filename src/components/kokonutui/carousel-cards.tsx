"use client";

/**
 * @author: @dorianbaffier
 * @description: A card rail centered on the active item. It auto-advances when
 * enabled, with a pause control and keyboard navigation; it does not drag.
 * @version: 2.0.0
 * @date: 2026-10-14
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { Pause, Play, Star } from "lucide-react";
import {
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export type RailScene =
  | "city"
  | "mountains"
  | "dunes"
  | "lake"
  | "islands"
  | "skyline"
  | "terraces"
  | "coast";

export interface RailItem {
  id: string;
  /** Caption. Omit for a media-only card: no caption, no heart. */
  title?: string;
  location?: string;
  /** Photo URL, rendered with a plain <img>. Falls back to `scene`. */
  image?: string;
  /** Alt text for `image`. Empty by default: the title already names it. */
  imageAlt?: string;
  /** Built-in drawn artwork, used when there is no `image`. */
  scene?: RailScene;
  badge?: string;
  dates?: string;
  price?: number;
  currency?: string;
  priceLabel?: string;
  rating?: number;
  reviewCount?: number;
  href?: string;
  /** Show a play glyph on the media (video affordance). */
  play?: boolean;
}

export type ToggleFavorite = (id: string, favorite: boolean) => void;

export interface CarouselCardsProps {
  items?: RailItem[];
  title?: string;
  eyebrow?: string;
  /** Ids saved on first render. */
  defaultFavorites?: string[];
  /** Called when a card's heart is toggled, with the item id and new state. */
  onToggleFavorite?: ToggleFavorite;
  /** Called when a card without an `href` is clicked or activated. */
  onSelect?: (item: RailItem) => void;
  /** Auto-advance the rail, looping back to the first card. */
  autoplay?: boolean;
  /** Delay between auto-advances, in ms. Default 4500. */
  autoplayInterval?: number;
  /** Card index active on arrival. Default 0. */
  initialIndex?: number;
  /** Show the eyebrow/title/counter row. Default true. */
  showHeader?: boolean;
  className?: string;
  /** Infinite loop: swiping or navigating never hits a dead end. */
  loop?: boolean;
}

const DEFAULT_ITEMS: RailItem[] = [
  {
    id: "lisbon",
    title: "Weekend in Lisbon",
    location: "Lisbon, Portugal",
    scene: "city",
    badge: "2 nights",
    dates: "Oct 24 – 26",
    price: 340,
    rating: 4.92,
    reviewCount: 318,
  },
  {
    id: "dolomites",
    title: "Slow days in the Dolomites",
    location: "Val Gardena, Italy",
    scene: "mountains",
    badge: "4 nights",
    dates: "Nov 3 – 7",
    price: 610,
    rating: 4.97,
    reviewCount: 142,
  },
  {
    id: "dunes",
    title: "Two nights in the dunes",
    location: "Merzouga, Morocco",
    scene: "dunes",
    badge: "2 nights",
    dates: "Nov 14 – 16",
    price: 280,
    rating: 4.88,
    reviewCount: 96,
  },
  {
    id: "lapland",
    title: "Lake cabin under the aurora",
    location: "Inari, Finland",
    scene: "lake",
    badge: "3 nights",
    dates: "Dec 5 – 8",
    price: 520,
    rating: 4.95,
    reviewCount: 210,
  },
  {
    id: "naxos",
    title: "Island hopping by ferry",
    location: "Naxos, Greece",
    scene: "islands",
    badge: "5 nights",
    dates: "May 9 – 14",
    price: 740,
    rating: 4.9,
    reviewCount: 187,
  },
  {
    id: "tokyo",
    title: "Late trains and night markets",
    location: "Tokyo, Japan",
    scene: "skyline",
    badge: "4 nights",
    dates: "Mar 20 – 24",
    price: 890,
    rating: 4.96,
    reviewCount: 402,
  },
  {
    id: "ubud",
    title: "Rice terraces at dawn",
    location: "Ubud, Indonesia",
    scene: "terraces",
    badge: "3 nights",
    dates: "Jan 12 – 15",
    price: 390,
    rating: 4.91,
    reviewCount: 133,
  },
  {
    id: "coast-road",
    title: "Coast road, windows down",
    location: "Big Sur, United States",
    scene: "coast",
    badge: "3 nights",
    dates: "Apr 2 – 5",
    price: 560,
    rating: 4.89,
    reviewCount: 158,
  },
];

/*
 * Depth runs off the main thread: each card is a view timeline on the inline
 * axis (0% entering on the right, 50% centered, 100% leaving on the left).
 * Browsers without scroll-driven animations get flat cards with every
 * detail visible. Reduced motion keeps only the details fade.
 */
const RAIL_CSS = `
@keyframes kokonutui-rail-tilt {
  0% { transform: perspective(900px) translateZ(-180px) rotateY(-14deg); }
  50% { transform: perspective(900px) translateZ(0) rotateY(0deg); }
  100% { transform: perspective(900px) translateZ(-180px) rotateY(14deg); }
}
@keyframes kokonutui-rail-parallax {
  from { transform: translate3d(calc(var(--rail-depth) * -1), 0, 0); }
  to { transform: translate3d(var(--rail-depth), 0, 0); }
}
@keyframes kokonutui-rail-details {
  0%, 32% { opacity: 0; transform: translate3d(0, 6px, 0); }
  45%, 55% { opacity: 1; transform: translate3d(0, 0, 0); }
  68%, 100% { opacity: 0; transform: translate3d(0, 6px, 0); }
}
@supports (animation-timeline: view()) {
  .kokonutui-rail-card { view-timeline: --kokonutui-rail inline; }
  .kokonutui-rail-details {
    animation: kokonutui-rail-details linear both;
    animation-timeline: --kokonutui-rail;
  }
  @media (prefers-reduced-motion: no-preference) {
    .kokonutui-rail-tilt {
      animation: kokonutui-rail-tilt linear both;
      animation-timeline: --kokonutui-rail;
    }
    .kokonutui-rail-layer {
      animation: kokonutui-rail-parallax linear both;
      animation-timeline: --kokonutui-rail;
    }
  }
}
`;

/* ------------------------------------------------------------------ */
/* Drawn scenes: flat zinc layers, each parallaxing by its own depth.  */
/* ------------------------------------------------------------------ */

const TONE = {
  sun: "fill-white dark:fill-zinc-400",
  far: "fill-zinc-300 dark:fill-zinc-800",
  mid: "fill-zinc-400 dark:fill-zinc-900",
  near: "fill-zinc-600 dark:fill-zinc-950",
  sky: "fill-zinc-200 dark:fill-zinc-700",
} as const;

interface SceneLayer {
  /** Parallax travel each way, as a share of the layer width. */
  depth: number;
  content: ReactNode;
}

const pines = (xs: number[], base: number, height: number) =>
  xs
    .map(
      (x, i) =>
        `M${x - 5} ${base}L${x} ${base - height - (i % 3) * 4}L${x + 5} ${base}Z`
    )
    .join("");

const windows = (
  x: number,
  y: number,
  cols: number,
  rows: number
): ReactNode[] => {
  const out: ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if ((r * 7 + c * 3) % 4 !== 0) {
        out.push(
          <rect
            className={TONE.sky}
            height="3"
            key={`${x}-${r}-${c}`}
            width="3"
            x={x + c * 7}
            y={y + r * 9}
          />
        );
      }
    }
  }
  return out;
};

const SCENES: Record<RailScene, SceneLayer[]> = {
  city: [
    {
      depth: 2,
      content: <circle className={TONE.sun} cx="150" cy="56" r="16" />,
    },
    {
      depth: 4,
      content: (
        <path className={TONE.far} d="M0 128Q60 98 120 116T208 106V200H0Z" />
      ),
    },
    {
      depth: 7,
      content: (
        <path
          className={TONE.mid}
          d="M0 152H18V138L26 130L34 138V146H48V128H62V140H76V132L84 124L92 132V150H110V136H126V146H140V126L150 118L160 126V148H176V138H192V150H208V200H0Z"
        />
      ),
    },
    {
      depth: 11,
      content: (
        <>
          <path className={TONE.near} d="M0 180Q104 164 208 178V200H0Z" />
          <path
            className={TONE.near}
            d="M74 170V152Q74 148 78 148H118Q122 148 122 152V168Z"
          />
          <rect className={TONE.sky} height="7" width="8" x="80" y="152" />
          <rect className={TONE.sky} height="7" width="8" x="94" y="152" />
          <rect className={TONE.sky} height="7" width="8" x="108" y="152" />
        </>
      ),
    },
  ],
  mountains: [
    {
      depth: 2,
      content: <circle className={TONE.sun} cx="54" cy="48" r="12" />,
    },
    {
      depth: 4,
      content: (
        <>
          <path
            className={TONE.far}
            d="M0 122L30 92L52 108L84 60L112 100L140 72L172 110L208 86V200H0Z"
          />
          <path className={TONE.sun} d="M74 75L84 60L94 75L88 71L83 77Z" />
          <path className={TONE.sun} d="M133 82L140 72L148 82L143 79Z" />
        </>
      ),
    },
    {
      depth: 7,
      content: (
        <path
          className={TONE.mid}
          d="M0 152L40 118L70 140L104 110L140 146L176 120L208 140V200H0Z"
        />
      ),
    },
    {
      depth: 11,
      content: (
        <path
          className={TONE.near}
          d={`M0 182Q60 164 120 174T208 168V200H0Z${pines([18, 30, 42, 162, 176, 190], 178, 20)}`}
        />
      ),
    },
  ],
  dunes: [
    {
      depth: 2,
      content: <circle className={TONE.sun} cx="128" cy="66" r="22" />,
    },
    {
      depth: 4,
      content: (
        <path
          className={TONE.far}
          d="M0 128Q50 104 100 124Q150 142 208 112V200H0Z"
        />
      ),
    },
    {
      depth: 7,
      content: (
        <path
          className={TONE.mid}
          d="M0 158Q70 120 130 150Q170 168 208 146V200H0Z"
        />
      ),
    },
    {
      depth: 11,
      content: (
        <path
          className={TONE.near}
          d="M0 188Q40 160 96 176Q150 194 208 170V200H0Z"
        />
      ),
    },
  ],
  lake: [
    {
      depth: 2,
      content: <circle className={TONE.sun} cx="160" cy="42" r="8" />,
    },
    {
      depth: 4,
      content: (
        <path
          className={TONE.far}
          d={`M0 142V130H208V142Z${pines([8, 20, 32, 44, 56, 68, 80, 92, 104, 116, 128, 140, 152, 164, 176, 188, 200], 132, 14)}`}
        />
      ),
    },
    {
      depth: 7,
      content: (
        <>
          <rect className={TONE.mid} height="58" width="208" x="0" y="142" />
          <path
            className={TONE.sky}
            d="M40 156H96V158H40ZM120 166H184V168H120ZM24 176H76V178H24Z"
          />
        </>
      ),
    },
    {
      depth: 11,
      content: (
        <>
          <path
            className={TONE.near}
            d="M0 184Q60 172 120 182T208 178V200H0Z"
          />
          <path className={TONE.near} d="M132 180V162L148 148L164 162V180Z" />
          <rect className={TONE.sun} height="6" width="6" x="145" y="166" />
        </>
      ),
    },
  ],
  islands: [
    {
      depth: 2,
      content: <circle className={TONE.sun} cx="52" cy="54" r="14" />,
    },
    {
      depth: 4,
      content: (
        <>
          <rect className={TONE.mid} height="70" width="208" x="0" y="130" />
          <path className={TONE.far} d="M96 131Q130 104 176 126L188 131Z" />
          <path className={TONE.far} d="M10 131Q30 120 52 131Z" />
        </>
      ),
    },
    {
      depth: 7,
      content: (
        <>
          <path className={TONE.near} d="M52 160H88L82 167H58Z" />
          <path className={TONE.sun} d="M70 157V122L90 157Z" />
          <path className={TONE.sky} d="M66 157V130L54 157Z" />
          <path
            className={TONE.far}
            d="M20 178H60V180H20ZM110 172H170V174H110Z"
          />
        </>
      ),
    },
    {
      depth: 11,
      content: (
        <path
          className={TONE.near}
          d="M0 200V182Q20 170 44 180Q60 187 70 200ZM150 200Q170 176 208 176V200Z"
        />
      ),
    },
  ],
  skyline: [
    {
      depth: 2,
      content: <circle className={TONE.sun} cx="40" cy="40" r="9" />,
    },
    {
      depth: 4,
      content: (
        <path
          className={TONE.far}
          d="M0 200V120H16V96H30V120H44V80H58V112H76V60H82V40H86V60H92V110H110V90H128V118H150V70H166V112H180V96H196V124H208V200Z"
        />
      ),
    },
    {
      depth: 7,
      content: (
        <>
          <path
            className={TONE.mid}
            d="M0 200V140H24V118H50V146H70V108H100V150H120V126H148V134H170V112H196V144H208V200Z"
          />
          {windows(74, 116, 3, 4)}
          {windows(174, 120, 3, 3)}
          {windows(28, 126, 3, 2)}
        </>
      ),
    },
    {
      depth: 11,
      content: (
        <path
          className={TONE.near}
          d="M0 170H208V178H0ZM10 178H18V200H10ZM70 178H78V200H70ZM130 178H138V200H130ZM190 178H198V200H190Z"
        />
      ),
    },
  ],
  terraces: [
    {
      depth: 2,
      content: <circle className={TONE.sun} cx="104" cy="58" r="15" />,
    },
    {
      depth: 4,
      content: <path className={TONE.far} d="M0 108Q104 76 208 102V200H0Z" />,
    },
    {
      depth: 7,
      content: (
        <path
          className={TONE.mid}
          d="M0 136Q104 112 208 132V200H0ZM0 148Q104 126 208 146V150Q104 130 0 152ZM0 164Q104 142 208 162V166Q104 146 0 168Z"
        />
      ),
    },
    {
      depth: 11,
      content: (
        <path
          className={TONE.near}
          d="M0 184Q104 162 208 180V200H0ZM24 184Q20 166 27 148H30Q24 166 28 184ZM28 148Q15 140 6 148Q16 143 28 151ZM28 148Q41 138 51 146Q39 142 28 151ZM28 148Q23 134 12 132Q24 136 29 149ZM28 148Q35 134 45 132Q33 138 29 149Z"
        />
      ),
    },
  ],
  coast: [
    {
      depth: 2,
      content: <circle className={TONE.sun} cx="56" cy="92" r="13" />,
    },
    {
      depth: 4,
      content: (
        <>
          <rect className={TONE.mid} height="88" width="208" x="0" y="112" />
          <path className={TONE.far} d="M118 200V122Q150 96 208 98V200Z" />
        </>
      ),
    },
    {
      depth: 7,
      content: (
        <>
          <path
            className={TONE.near}
            d="M208 200V128Q172 132 150 160Q136 182 112 200Z"
          />
          <path
            className={TONE.sun}
            d="M208 146Q178 150 162 170Q150 186 136 200H140Q154 188 166 172Q182 154 208 150Z"
          />
        </>
      ),
    },
    {
      depth: 11,
      content: <path className={TONE.near} d="M0 200V172Q50 156 100 200Z" />,
    },
  ],
};

const LAYER_CLASS =
  "kokonutui-rail-layer absolute inset-y-0 -left-[15%] w-[130%]";

const Scene = ({ scene }: { scene: RailScene }) => (
  <div
    aria-hidden="true"
    className="absolute inset-0 bg-zinc-200 dark:bg-zinc-700"
  >
    {SCENES[scene].map((layer) => (
      <div
        className={LAYER_CLASS}
        key={layer.depth}
        style={{ "--rail-depth": `${layer.depth}%` } as CSSProperties}
      >
        <svg
          aria-hidden="true"
          className="h-full w-full"
          preserveAspectRatio="xMidYMax slice"
          viewBox="0 0 208 200"
        >
          {layer.content}
        </svg>
      </div>
    ))}
  </div>
);

/* ------------------------------------------------------------------ */
/* Heart: the fill rises from the base through a clip, no scale.       */
/* ------------------------------------------------------------------ */

const HEART =
  "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z";

const FavoriteButton = ({
  label,
  saved,
  onToggle,
}: {
  label: string;
  saved: boolean;
  onToggle: () => void;
}) => (
  <button
    aria-label={`Save ${label}`}
    aria-pressed={saved}
    className="absolute top-2.5 right-2.5 z-10 grid size-9 cursor-pointer place-items-center rounded-full bg-white text-zinc-900 shadow-sm ring-1 ring-black/5 transition-colors duration-150 ease-out hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-zinc-900 focus-visible:outline-offset-2 dark:bg-zinc-950 dark:text-zinc-100 dark:ring-white/10 dark:focus-visible:outline-zinc-100 dark:hover:bg-zinc-900"
    onClick={onToggle}
    type="button"
  >
    <span className="relative size-[18px]">
      <svg
        aria-hidden="true"
        className={cn(
          "absolute inset-0 size-full transition-colors duration-200",
          saved && "text-rose-500"
        )}
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d={HEART} />
      </svg>
      <span
        className="absolute inset-0 transition-[clip-path] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none"
        style={{ clipPath: saved ? "inset(0 0 0 0)" : "inset(100% 0 0 0)" }}
      >
        <svg
          aria-hidden="true"
          className="size-full fill-rose-500 stroke-rose-500"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d={HEART} />
        </svg>
      </span>
    </span>
  </button>
);

/* ------------------------------------------------------------------ */
/* Card                                                               */
/* ------------------------------------------------------------------ */

const CardDetails = ({ item }: { item: RailItem }) => (
  <div className="kokonutui-rail-details mt-2 flex items-center gap-1.5 text-xs">
    {item.rating !== undefined && (
      <span className="flex items-center gap-0.5 text-zinc-900 tabular-nums dark:text-zinc-100">
        <Star aria-hidden="true" className="size-3 fill-current" />
        {item.rating.toFixed(2)}
        {item.reviewCount !== undefined && (
          <span className="text-zinc-500 dark:text-zinc-400">
            ({item.reviewCount})
          </span>
        )}
      </span>
    )}
    {item.dates && (
      <span className="truncate text-zinc-500 dark:text-zinc-400">
        · {item.dates}
      </span>
    )}
    {item.price !== undefined && (
      <span className="ml-auto shrink-0 font-medium text-zinc-900 tabular-nums dark:text-zinc-100">
        {item.currency ?? "€"}
        {item.price}
        <span className="font-normal text-zinc-500 dark:text-zinc-400">
          {" "}
          {item.priceLabel ?? "total"}
        </span>
      </span>
    )}
  </div>
);

const STRETCHED =
  "outline-none after:absolute after:inset-0 after:rounded-2xl after:content-['']";

const CARD_SCALE = [1, 0.72, 0.56];

/** Keep the visual gap constant while the depth scale shrinks the card. */
const overlapFor = (previous: number, current: number) =>
  `calc(${(2 - previous - current).toFixed(2)} * var(--rail-card) / -2 - 0.75rem)`;

const RailCard = ({
  item,
  saved,
  current,
  scale,
  reducedMotion,
  marginInlineStart,
  onToggleSaved,
  onSelect,
}: {
  item: RailItem;
  saved: boolean;
  current: boolean;
  scale: number;
  reducedMotion: boolean;
  marginInlineStart?: string;
  onToggleSaved: (id: string) => void;
  onSelect?: (item: RailItem) => void;
}) => {
  // A card with no caption is media-only: the whole photo becomes the target.
  const caption =
    item.title ||
    item.location ||
    item.price !== undefined ||
    item.rating !== undefined ||
    item.dates;
  const control = item.href ? (
    <a
      aria-label={item.title ?? item.imageAlt}
      className={STRETCHED}
      data-rail-link=""
      draggable={false}
      href={item.href}
    >
      {item.title}
    </a>
  ) : onSelect ? (
    <button
      aria-label={item.title ?? item.imageAlt}
      className={cn(STRETCHED, "cursor-pointer text-left")}
      data-rail-link=""
      onClick={() => onSelect?.(item)}
      type="button"
    >
      {item.title}
    </button>
  ) : null;

  const cardDepth = {
    zIndex: 20 - Math.round((1 - scale) * 40),
    marginInlineStart,
    ...(reducedMotion ? {} : { transform: `scale(${scale})` }),
  };

  return (
    <li
      aria-current={current ? "true" : undefined}
      aria-roledescription="slide"
      className="kokonutui-rail-card w-[var(--rail-card)] flex-none transition-transform duration-500 ease-out"
      style={cardDepth}
    >
      <div className="kokonutui-rail-tilt group/rail-card relative">
      <div className="relative aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl border-[3px] border-white bg-zinc-200 shadow-xl ring-zinc-900 ring-offset-2 ring-offset-white focus-within:ring-2 dark:bg-zinc-800 dark:ring-zinc-100 dark:ring-offset-zinc-950 transition-all duration-300 group-hover/rail-card:scale-[1.02] group-hover/rail-card:border-emerald-400 group-hover/rail-card:shadow-2xl">
        {item.image ? (
          <div className={cn(LAYER_CLASS, "[--rail-depth:8%]")}>
            {/* biome-ignore lint/performance/noImgElement: a plain img keeps the component free of next/image config */}
            <img
              alt={item.imageAlt ?? ""}
              className="h-full w-full object-cover transition-transform duration-500 group-hover/rail-card:scale-105"
              decoding="async"
              draggable={false}
              fetchPriority={current ? "auto" : "low"}
              height={500}
              loading={current ? "eager" : "lazy"}
              src={item.image}
              width={520}
            />
          </div>
        ) : (
          <Scene scene={item.scene ?? "mountains"} />
        )}
        {item.badge && (
          <span className="absolute top-3 left-3 rounded-md bg-white px-1.5 py-0.5 font-medium text-[11px] text-zinc-900 shadow-sm dark:bg-zinc-950 dark:text-zinc-100">
            {item.badge}
          </span>
        )}
        {item.play && (
          <span
            aria-hidden="true"
            className="absolute right-2.5 bottom-2.5 grid size-8 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm"
          >
            <Play className="size-3.5 fill-current" />
          </span>
        )}
        {item.title && (
          <FavoriteButton
            label={item.title}
            onToggle={() => onToggleSaved(item.id)}
            saved={saved}
          />
        )}
        {!caption && control}
      </div>

      {caption && (
        <div className="px-0.5 pt-3">
          <h3 className="truncate font-medium text-sm text-zinc-900 tracking-tight dark:text-zinc-100">
            {/* The link is stretched over the card; the heart sits above it. */}
            {/* Without an href this is a button: a bare "#" link would navigate. */}
            {control}
          </h3>
          {item.location && (
            <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
              {item.location}
            </p>
          )}
          <CardDetails item={item} />
        </div>
      )}
    </div>
    </li>
  );
};

/* ------------------------------------------------------------------ */
/* Rail control: one index, one scroll position, no drag.             */
/* ------------------------------------------------------------------ */

const centerOf = (
  scroller: HTMLElement,
  track: HTMLUListElement,
  index: number
) => {
  const card = track.children[index] as HTMLElement | undefined;
  if (!card || scroller.clientWidth === 0 || card.offsetWidth === 0) {
    return null;
  }
  const center =
    track.offsetLeft +
    card.offsetLeft +
    card.offsetWidth / 2 -
    scroller.clientWidth / 2;
  const max = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
  return Math.min(Math.max(0, center), max);
};

const CONTROL_CLASS =
  "inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-zinc-300 bg-white/80 px-3 py-1.5 font-medium text-xs text-zinc-700 transition-colors duration-150 ease-out hover:bg-white focus-visible:outline-2 focus-visible:outline-zinc-900 focus-visible:outline-offset-2 dark:border-zinc-700 dark:bg-zinc-950/70 dark:text-zinc-200 dark:focus-visible:outline-zinc-100 dark:hover:bg-zinc-900";

export default function CarouselCards({
  items = DEFAULT_ITEMS,
  title = "Weekend escapes",
  eyebrow = "Picked for this autumn",
  defaultFavorites = [],
  onToggleFavorite,
  onSelect,
  autoplay = false,
  autoplayInterval = 4500,
  initialIndex = 0,
  showHeader = true,
  className,
  loop = false,
}: CarouselCardsProps) {
  const isLooping = Boolean(loop && items.length > 1);
  const loopOffset = isLooping ? items.length : 0;

  const displayItems = useMemo(() => {
    if (!isLooping) {
      return items.map((it, idx) => ({ ...it, renderKey: it.id, originalIndex: idx }));
    }
    return [
      ...items.map((it, idx) => ({ ...it, renderKey: `${it.id}-buf0-${idx}`, originalIndex: idx })),
      ...items.map((it, idx) => ({ ...it, renderKey: `${it.id}-mid-${idx}`, originalIndex: idx })),
      ...items.map((it, idx) => ({ ...it, renderKey: `${it.id}-buf1-${idx}`, originalIndex: idx })),
    ];
  }, [items, isLooping]);

  const scrollerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(initialIndex + loopOffset);
  const [saved, setSaved] = useState<ReadonlySet<string>>(
    () => new Set(defaultFavorites)
  );
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [playing, setPlaying] = useState(true);
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const recenterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingJumpRef = useRef(false);

  const activeRef = useRef(active);
  activeRef.current = active;

  useLayoutEffect(() => {
    if (pendingJumpRef.current) {
      pendingJumpRef.current = false;
      const scroller = scrollerRef.current;
      const track = trackRef.current;
      if (scroller && track) {
        const left = centerOf(scroller, track, active);
        if (left !== null) {
          scroller.scrollLeft = left;
        }
      }
    }
  }, [active]);

  const move = useCallback(
    (index: number, smooth = true) => {
      const maxIndex = displayItems.length - 1;
      const next = Math.min(Math.max(index, 0), maxIndex);
      activeRef.current = next;
      const scroller = scrollerRef.current;
      const track = trackRef.current;

      if (!smooth) {
        pendingJumpRef.current = true;
        setActive(next);
        if (scroller && track) {
          const left = centerOf(scroller, track, next);
          if (left !== null) {
            scroller.scrollLeft = left;
          }
        }
        return;
      }

      setActive(next);
      if (!(scroller && track)) {
        return;
      }
      const left = centerOf(scroller, track, next);
      if (left === null) {
        return;
      }
      if (!reducedMotion && typeof scroller.scrollTo === "function") {
        scroller.scrollTo({ left, behavior: "smooth" });
      } else {
        scroller.scrollLeft = left;
      }
    },
    [displayItems.length, reducedMotion]
  );

  useEffect(() => {
    move(initialIndex + loopOffset, false);
    const onResize = () => move(activeRef.current, false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [initialIndex, loopOffset, move]);

  const nearestIndex = useCallback(() => {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!(scroller && track)) {
      return null;
    }
    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    let nearest = 0;
    let best = Number.POSITIVE_INFINITY;
    Array.from(track.children).forEach((child, index) => {
      const card = child as HTMLElement;
      const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
      if (distance < best) {
        best = distance;
        nearest = index;
      }
    });
    return nearest;
  }, []);

  const syncFromScroll = useCallback(() => {
    const nearest = nearestIndex();
    if (nearest !== null) {
      setActive(nearest);
    }
  }, [nearestIndex]);

  const dragRef = useRef<{ startX: number; startLeft: number; moved: boolean } | null>(
    null
  );
  const draggedRef = useRef(false);

  const onPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (recenterTimeoutRef.current) {
      clearTimeout(recenterTimeoutRef.current);
      recenterTimeoutRef.current = null;
      if (isLooping && (activeRef.current < items.length || activeRef.current >= 2 * items.length)) {
        const mid = ((activeRef.current % items.length) + items.length) % items.length + items.length;
        move(mid, false);
      }
    }
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }
    dragRef.current = {
      startX: event.clientX,
      startLeft: scroller.scrollLeft,
      moved: false,
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    const scroller = scrollerRef.current;
    if (!(drag && scroller)) {
      return;
    }
    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) > 3) {
      drag.moved = true;
    }
    scroller.scrollLeft = drag.startLeft - delta;
  };

  const endDrag = () => {
    const drag = dragRef.current;
    dragRef.current = null;
    draggedRef.current = drag?.moved ?? false;
    const nearest = nearestIndex();
    if (drag?.moved && nearest !== null) {
      move(nearest);
      if (isLooping && (nearest < items.length || nearest >= 2 * items.length)) {
        const middleTarget = ((nearest % items.length) + items.length) % items.length + items.length;
        if (recenterTimeoutRef.current) {
          clearTimeout(recenterTimeoutRef.current);
        }
        recenterTimeoutRef.current = setTimeout(() => {
          move(middleTarget, false);
        }, 500);
      }
    }
  };

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    return () => {
      if (recenterTimeoutRef.current) {
        clearTimeout(recenterTimeoutRef.current);
      }
    };
  }, []);

  // Autoplay loops, and never fights a hidden tab or a reduced-motion request.
  const canPlay = autoplay && items.length > 1 && !reducedMotion;
  useEffect(() => {
    if (!(canPlay && playing && !focused && !hovered)) {
      return;
    }
    const id = setInterval(() => {
      if (document.hidden) {
        return;
      }
      if (isLooping) {
        const next = activeRef.current + 1;
        move(next);
        if (next >= 2 * items.length) {
          const middleTarget = ((next % items.length) + items.length) % items.length + items.length;
          if (recenterTimeoutRef.current) {
            clearTimeout(recenterTimeoutRef.current);
          }
          recenterTimeoutRef.current = setTimeout(() => {
            move(middleTarget, false);
          }, 500);
        }
      } else {
        move((activeRef.current + 1) % items.length);
      }
    }, autoplayInterval);
    return () => clearInterval(id);
  }, [autoplayInterval, canPlay, focused, hovered, isLooping, items.length, move, playing]);

  // Arrow keys step one card; Home and End jump to the ends.
  const onKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    let next: number;
    switch (event.key) {
      case "ArrowLeft":
        next = activeRef.current - 1;
        break;
      case "ArrowRight":
        next = activeRef.current + 1;
        break;
      case "Home":
        next = isLooping ? items.length : 0;
        break;
      case "End":
        next = isLooping ? 2 * items.length - 1 : items.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    move(next);
    if (isLooping && (next < items.length || next >= 2 * items.length)) {
      const middleTarget = ((next % items.length) + items.length) % items.length + items.length;
      if (recenterTimeoutRef.current) {
        clearTimeout(recenterTimeoutRef.current);
      }
      recenterTimeoutRef.current = setTimeout(() => {
        move(middleTarget, false);
      }, 500);
    }
  };

  const scales = displayItems.map(
    (_, index) => CARD_SCALE[Math.min(Math.abs(index - active), CARD_SCALE.length - 1)]
  );

  const toggleSaved = (id: string) => {
    const next = !saved.has(id);
    setSaved((prev) => {
      const copy = new Set(prev);
      if (next) {
        copy.add(id);
      } else {
        copy.delete(id);
      }
      return copy;
    });
    onToggleFavorite?.(id, next);
  };

  return (
    <section
      aria-label={title}
      aria-roledescription="carousel"
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setFocused(false);
        }
      }}
      className={cn(
        "w-full py-4 [--rail-card:13.5rem] sm:[--rail-card:15rem] lg:[--rail-card:16rem]",
        className
      )}
    >
      {(showHeader || canPlay) && (
        <div className="mb-2 flex items-center justify-between gap-4 px-4">
          {showHeader ? (
            <div className="min-w-0">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {eyebrow}
              </p>
              <h2 className="truncate font-semibold text-lg text-zinc-900 tracking-tight dark:text-zinc-100">
                {title}
              </h2>
            </div>
          ) : (
            <span />
          )}
          <div className="flex shrink-0 items-center gap-3">
            {canPlay && (
              <button
                aria-label={
                  playing
                    ? "Jeda putaran otomatis"
                    : "Lanjutkan putaran otomatis"
                }
                className={CONTROL_CLASS}
                onClick={() => setPlaying((value) => !value)}
                type="button"
              >
                {playing ? (
                  <Pause aria-hidden="true" className="size-3.5" />
                ) : (
                  <Play aria-hidden="true" className="size-3.5" />
                )}
                {playing ? "Jeda" : "Lanjut"}
              </button>
            )}
            <span
              aria-live="polite"
              className="text-xs text-zinc-500 tabular-nums dark:text-zinc-400"
            >
              <span className="sr-only">Kartu </span>
              {String(
                isLooping
                  ? (((active % items.length) + items.length) % items.length) + 1
                  : active + 1
              ).padStart(2, "0")}
              <span aria-hidden="true"> / </span>
              <span className="sr-only"> dari </span>
              {String(items.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      )}

      <section
        aria-label={`${title}, geser atau gunakan tombol panah untuk berpindah`}
        style={{ touchAction: "pan-y" }}
        className="relative overflow-x-hidden overscroll-x-contain py-6 outline-none [container-type:inline-size] focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-inset lg:cursor-grab lg:active:cursor-grabbing dark:focus-visible:ring-zinc-100"
        onClickCapture={(event) => {
          if (draggedRef.current) {
            draggedRef.current = false;
            event.preventDefault();
            event.stopPropagation();
          }
        }}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onScroll={syncFromScroll}
        ref={scrollerRef}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: a focusable rail is how keyboard users reach the arrow keys
        tabIndex={0}
      >
        <ul
          className="relative flex w-max items-center gap-0 px-[calc(50cqw-var(--rail-card)/2)]"
          ref={trackRef}
        >
          {displayItems.map((item, index) => (
            <RailCard
              current={index === active}
              item={item}
              key={item.renderKey}
              marginInlineStart={
                index === 0 ? undefined : overlapFor(scales[index - 1], scales[index])
              }
              reducedMotion={reducedMotion}
              scale={scales[index]}
              onSelect={onSelect}
              onToggleSaved={toggleSaved}
              saved={saved.has(item.id)}
            />
          ))}
        </ul>
      </section>

      <style href="kokonutui-carousel-cards" precedence="default">
        {RAIL_CSS}
      </style>
    </section>
  );
}
