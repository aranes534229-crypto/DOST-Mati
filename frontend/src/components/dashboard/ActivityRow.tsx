// components/dashboard/ActivityRow.tsx
import clsx from "clsx";
import type { ReactNode } from "react";
import { ACTIVITY_CHIP, ACTIVITY_PADDING, ACTIVITY_RADIUS } from "./styleMaps";
import { METRIC_TONE_CHIP, type MetricTone } from "./tone";

interface ActivityRowProps {
  icon: ReactNode;
  tone?: MetricTone;
  title: ReactNode;
  meta?: ReactNode;
  time?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Shared activity/feed row (icon chip + title + meta + timestamp). Used by
 * admin RecentActivity and super-admin log previews so they
 * render identically. The old admin row passed a `bg-*` class to an SVG
 * `stroke` prop, which silently failed — icons now inherit `currentColor`.
 */
export default function ActivityRow({
  icon,
  tone = "primary",
  title,
  meta,
  time,
  onClick,
  className,
}: ActivityRowProps) {
  const inner = (
    <>
      <span
        className={clsx(
          "flex flex-shrink-0 items-center justify-center",
          ACTIVITY_CHIP,
          METRIC_TONE_CHIP[tone],
        )}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-theme-sm font-medium text-gray-800 dark:text-white/90">
          {title}
        </div>
        {meta && (
          <div className="mt-0.5 truncate text-theme-xs text-gray-400 dark:text-gray-500">
            {meta}
          </div>
        )}
      </div>
      {time && (
        <span className="flex-shrink-0 text-theme-xs text-gray-400 dark:text-gray-500">
          {time}
        </span>
      )}
    </>
  );

  const base = clsx(
    "flex w-full items-center gap-3 text-left transition",
    ACTIVITY_PADDING,
    ACTIVITY_RADIUS,
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={clsx(base, "hover:bg-gray-50 dark:hover:bg-white/[0.03]", className)}
      >
        {inner}
      </button>
    );
  }

  return <div className={clsx(base, className)}>{inner}</div>;
}
