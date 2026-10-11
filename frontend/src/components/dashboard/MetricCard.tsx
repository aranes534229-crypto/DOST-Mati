// components/dashboard/MetricCard.tsx
import clsx from "clsx";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { METRIC_CHIP, METRIC_LABEL, METRIC_VALUE } from "./styleMaps";
import { METRIC_TONE_CHIP, METRIC_TONE_CHIP_HOVER, METRIC_TONE_TEXT, type MetricTone } from "./tone";

interface MetricCardProps {
  label: string;
  value: number | string;
  icon?: ReactNode;
  tone?: MetricTone;
  /** Turns the card into a selectable filter tile. */
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

/**
 * Canonical KPI card. Replaces the three divergent implementations
 * (AdminMetrics / ReceiverMetrics / SuperAdminUserStats) and the selectable
 * division tiles. Icons inherit color via `currentColor`.
 */
export default function MetricCard({
  label,
  value,
  icon,
  tone = "primary",
  onClick,
  active = false,
  className,
}: MetricCardProps) {
  const display = typeof value === "number" ? value.toLocaleString() : value;

  // Track the card's rendered size so we can draw a border path that starts at
  // the middle of the top edge (a <rect> would always start at its top-left).
  const borderRef = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = borderRef.current;
    if (!el) return;
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    update();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w, h } = size;
  const rr = Math.min(23, w / 2, h / 2);
  const borderPath =
    w > 0 && h > 0
      ? [
          `M ${w / 2} 0`,
          `H ${w - rr}`,
          `A ${rr} ${rr} 0 0 1 ${w} ${rr}`,
          `V ${h - rr}`,
          `A ${rr} ${rr} 0 0 1 ${w - rr} ${h}`,
          `H ${rr}`,
          `A ${rr} ${rr} 0 0 1 0 ${h - rr}`,
          `V ${rr}`,
          `A ${rr} ${rr} 0 0 1 ${rr} 0`,
          `H ${w / 2}`,
        ].join(" ")
      : "";

  // Surface pieces are chosen explicitly per state so the active/selected
  // styling never has to fight an inherited border or ring color.
  const shape =
    "group/card relative overflow-hidden rounded-3xl p-7 shadow-theme-md dark:shadow-none md:p-8";

  const background = active
    ? "bg-primary/[0.03] dark:bg-secondary/[0.05]"
    : "bg-white dark:bg-white/[0.03]";

  const outline = "ring-1 ring-gray-100 dark:ring-white/[0.06]";

  const hover = active
    ? ""
    : "transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-theme-xl motion-reduce:transition-none";

  // Hairline that "draws" around the card on hover: the path starts at the
  // middle of the top edge and runs clockwise, so the accent sweeps from the
  // top-center down the sides and back until the full border closes.
  const borderOverlay = (
    <span ref={borderRef} aria-hidden="true" className="pointer-events-none absolute inset-px">
      {borderPath && (
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className={clsx("h-full w-full overflow-visible", METRIC_TONE_TEXT[tone])}
        >
          <path
            d={borderPath}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            pathLength={100}
            strokeDasharray="100"
            className={clsx(
              "[stroke-dashoffset:100] transition-[stroke-dashoffset] duration-300 ease-out motion-reduce:transition-none",
              "group-hover/card:[stroke-dashoffset:0]",
              active && "[stroke-dashoffset:0]",
            )}
          />
        </svg>
      )}
    </span>
  );

  const content = (
    <div className="flex items-center gap-4">
      {icon && (
        <div
          className={clsx(
            "flex flex-shrink-0 items-center justify-center",
            "transition-[transform,background-color,border-color,color] duration-300 ease-out",
            "group-hover/card:scale-105",
            "motion-reduce:transition-none motion-reduce:group-hover/card:scale-100",
            METRIC_CHIP,
            METRIC_TONE_CHIP[tone],
            METRIC_TONE_CHIP_HOVER[tone],
          )}
        >
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <span className={METRIC_LABEL}>{label}</span>
        <h4 className={METRIC_VALUE}>{display}</h4>
      </div>
    </div>
  );

  const base = clsx("w-full text-left", shape, background, outline);

  if (onClick) {
    return (
      <button
        type="button"
        aria-pressed={active}
        onClick={onClick}
        className={clsx(base, hover, className)}
      >
        {borderOverlay}
        {content}
      </button>
    );
  }

  return (
    <div className={clsx(base, className)}>
      {borderOverlay}
      {content}
    </div>
  );
}
