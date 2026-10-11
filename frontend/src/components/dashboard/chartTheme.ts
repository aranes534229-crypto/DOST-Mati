// components/dashboard/chartTheme.ts
// Central chart palette + shared Apex defaults so every dashboard chart pulls
// colors from the same custom properties instead of hard-coded hex values.

export const CHART_COLORS = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  accent: "var(--color-accent)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  danger: "var(--color-danger)",
  gray: "var(--color-gray-400)",
} as const;

export const CHART_FONT = "Outfit, sans-serif";
export const CHART_AXIS_LABEL = "var(--color-gray-400)";
export const CHART_GRID = "var(--color-gray-100)";
export const CHART_MUTED = "var(--color-gray-400)";

// Apex renders to canvas, so it needs concrete colors (Tailwind dark: variants
// don't apply). Pair these with the active theme for legible center labels.
export const CHART_VALUE_LIGHT = "#1f2937";
export const CHART_VALUE_DARK = "#e5e7eb";
