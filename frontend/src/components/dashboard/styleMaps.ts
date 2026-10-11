// components/dashboard/styleMaps.ts
// Shared class bundles for the dashboard surfaces. These were previously keyed
// by a classic/airy appearance flag while the redesign was piloted; now that
// every dashboard uses the Clean & Airy style they are plain constants.

export const CARD_SHELL =
  "rounded-3xl bg-white shadow-theme-md ring-1 ring-gray-100 dark:bg-white/[0.03] dark:shadow-none dark:ring-white/[0.06]";

export const CARD_HEADER =
  "flex items-start justify-between gap-4 px-6 pt-6 pb-4 sm:px-7 sm:pt-7 sm:pb-5";

export const CARD_BODY = "p-7 sm:p-8";

export const CARD_BODY_WITH_HEADER = "px-6 pb-6 sm:px-7 sm:pb-7";

export const CARD_TITLE =
  "text-xl font-semibold tracking-tight text-gray-900 dark:text-white/90";

export const CARD_DESC = "mt-1 text-theme-sm text-gray-500 dark:text-gray-400";

export const METRIC_CHIP = "h-14 w-14 rounded-2xl";

export const METRIC_LABEL =
  "text-xs font-semibold tracking-wide text-gray-400 uppercase dark:text-gray-500";

export const METRIC_VALUE =
  "mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white/90";

export const ACTIVITY_CHIP = "h-10 w-10 rounded-xl";

export const ACTIVITY_PADDING = "px-2.5 py-3";

export const ACTIVITY_RADIUS = "rounded-2xl";

export const QUICK_ACTION_TILE =
  "rounded-2xl bg-gray-50 p-4 ring-1 ring-transparent transition hover:ring-primary/20 dark:bg-white/[0.03]";

export const QUICK_ACTION_ICON =
  "h-10 w-10 rounded-2xl bg-white text-primary shadow-theme-xs dark:bg-white/10 dark:text-secondary";

export const QUICK_ACTION_ICON_COMPACT =
  "h-9 w-9 rounded-xl bg-white text-primary shadow-theme-xs dark:bg-white/10 dark:text-secondary";

export const QUICK_ACTION_TILE_COMPACT =
  "rounded-xl bg-gray-50 px-3 py-2 ring-1 ring-transparent transition hover:ring-primary/20 dark:bg-white/[0.03]";

export const STRIP_RADIUS = "rounded-2xl";

export const GREETING =
  "text-2xl font-semibold tracking-tight text-gray-900 dark:text-white/90";
