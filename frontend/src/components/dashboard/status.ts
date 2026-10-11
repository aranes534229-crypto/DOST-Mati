// components/dashboard/status.ts
// Single source of truth for mapping a document/entity status to a semantic
// tone. Keeps badges, dots and text colors consistent across all dashboards.

export type StatusTone = "success" | "warning" | "danger" | "info" | "neutral";

const STATUS_TONES: Record<string, StatusTone> = {
  completed: "success",
  received: "success",
  active: "success",
  valid: "success",
  "on-going": "warning",
  ongoing: "warning",
  "on-queue": "warning",
  pending: "danger",
  rejected: "danger",
  invalid: "danger",
  overdue: "danger",
  approaching: "warning",
  inactive: "neutral",
};

export function getStatusTone(status: string): StatusTone {
  return STATUS_TONES[status.trim().toLowerCase()] ?? "neutral";
}

export interface ToneClasses {
  text: string;
  bg: string;
  dot: string;
}

export const TONE_CLASSES: Record<StatusTone, ToneClasses> = {
  success: {
    text: "text-success",
    bg: "bg-success/10",
    dot: "bg-success",
  },
  warning: {
    text: "text-warning",
    bg: "bg-warning/10",
    dot: "bg-warning",
  },
  danger: {
    text: "text-danger",
    bg: "bg-danger/10",
    dot: "bg-danger",
  },
  info: {
    text: "text-blue-light-600 dark:text-blue-light-400",
    bg: "bg-blue-light-100 dark:bg-blue-light-500/10",
    dot: "bg-blue-light-500",
  },
  neutral: {
    text: "text-gray-500 dark:text-gray-400",
    bg: "bg-gray-100 dark:bg-white/[0.06]",
    dot: "bg-gray-400",
  },
};

type BadgeColor = "success" | "error" | "warning" | "info" | "light";

export function getStatusBadgeColor(status: string): BadgeColor {
  switch (getStatusTone(status)) {
    case "success":
      return "success";
    case "danger":
      return "error";
    case "warning":
      return "warning";
    case "info":
      return "info";
    default:
      return "light";
  }
}
