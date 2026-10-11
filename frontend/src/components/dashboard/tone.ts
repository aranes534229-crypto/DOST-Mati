// components/dashboard/tone.ts
// Shared tone vocabulary for KPIs and activity chips. Kept in a non-component
// module so `MetricCard.tsx` stays fast-refresh friendly.

export type MetricTone =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

export const METRIC_TONE_CHIP: Record<MetricTone, string> = {
  primary: "bg-primary/10 text-primary dark:bg-primary/20 dark:text-secondary",
  secondary: "bg-secondary/10 text-secondary",
  accent: "bg-accent/10 text-accent",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
  info: "bg-blue-light-100 text-blue-light-600 dark:bg-blue-light-500/10 dark:text-blue-light-400",
  neutral: "bg-gray-100 text-gray-500 dark:bg-white/[0.06] dark:text-gray-400",
};

// Inheritable accent color for the airy hover border (the SVG stroke uses
// `currentColor`, so these text utilities drive it).
export const METRIC_TONE_TEXT: Record<MetricTone, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-blue-light-500",
  neutral: "text-gray-300 dark:text-gray-600",
};

// One step deeper than METRIC_TONE_CHIP — applied on card hover so the icon
// chip tint intensifies in sync with the border draw and lift.
export const METRIC_TONE_CHIP_HOVER: Record<MetricTone, string> = {
  primary: "group-hover/card:bg-primary/20 dark:group-hover/card:bg-primary/30",
  secondary:
    "group-hover/card:bg-secondary/20 dark:group-hover/card:bg-secondary/20",
  accent: "group-hover/card:bg-accent/20 dark:group-hover/card:bg-accent/20",
  success: "group-hover/card:bg-success/20 dark:group-hover/card:bg-success/20",
  warning: "group-hover/card:bg-warning/20 dark:group-hover/card:bg-warning/20",
  danger: "group-hover/card:bg-danger/20 dark:group-hover/card:bg-danger/20",
  info: "group-hover/card:bg-blue-light-200 dark:group-hover/card:bg-blue-light-500/20",
  neutral: "group-hover/card:bg-gray-200 dark:group-hover/card:bg-white/[0.1]",
};
