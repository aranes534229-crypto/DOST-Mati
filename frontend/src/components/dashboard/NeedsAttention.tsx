// components/dashboard/NeedsAttention.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { getRoleDashboardConfig, type AttentionItem } from "../../config/roleDashboardConfig";
import { useUser } from "../../context/currentUser/use-user";
import { AlertIcon, ArrowRightIcon } from "../../icons";
import { STRIP_RADIUS } from "./styleMaps";

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function AlertDangerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
      />
    </svg>
  );
}

/**
 * Role-aware attention strip. Items come from `roleDashboardConfig`, so every
 * role (including super admin and division) shows its own counts instead of
 * falling through to the admin set.
 */
export default function NeedsAttentionStrip() {
  const { currentUser } = useUser();
  const config = getRoleDashboardConfig(currentUser?.role_id);
  const items: AttentionItem[] = config.attentionItems;
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState(false);

  const visibleItems = items.filter((i) => i.value > 0);
  if (visibleItems.length === 0 || dismissed) return null;

  const alerts = visibleItems.filter((i) => i.tier === "alert");
  const indicators = visibleItems.filter((i) => i.tier === "indicator");
  const hasAlerts = alerts.length > 0;

  const stripBg = hasAlerts ? "bg-danger/[0.04]" : "bg-gray-50";
  const stripBorder = hasAlerts ? "border-danger/20" : "border-gray-200";
  const stripBgDark = hasAlerts ? "dark:bg-danger/[0.04]" : "dark:bg-white/[0.02]";
  const stripBorderDark = hasAlerts ? "dark:border-danger/20" : "dark:border-white/[0.05]";
  const iconBg = hasAlerts ? "bg-danger/10" : "bg-gray-200/60 dark:bg-white/[0.06]";
  const IconComponent = hasAlerts ? AlertDangerIcon : AlertIcon;

  return (
    <div
      className={`flex items-center gap-3 overflow-x-auto border ${STRIP_RADIUS} ${stripBorder} ${stripBg} px-3 py-2.5 ${stripBgDark} ${stripBorderDark}`}
    >
      <span
        className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg ${iconBg}`}
      >
        <IconComponent className="size-4" />
      </span>

      <div className="flex flex-1 items-center gap-2 overflow-x-auto">
        {alerts.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.to)}
            className="group flex flex-shrink-0 items-center gap-2 rounded-lg border border-danger/20 bg-white px-3 py-1.5 transition hover:border-danger/40 dark:border-danger/20 dark:bg-white/[0.03]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-danger" />
            <span className="text-theme-sm font-bold text-danger">{item.value}</span>
            <span className="text-theme-xs text-gray-500 dark:text-gray-400">
              {item.label}
            </span>
            <ArrowRightIcon className="size-3 text-gray-300 opacity-0 transition group-hover:opacity-100" />
          </button>
        ))}

        {indicators.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.to)}
            className="group flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-gray-500 transition hover:border-gray-300 hover:text-gray-700 dark:border-white/[0.08] dark:text-gray-400 dark:hover:text-gray-200"
          >
            <span className="text-theme-sm font-semibold">{item.value}</span>
            <span className="text-theme-xs">{item.label}</span>
            <ArrowRightIcon className="size-3 opacity-0 transition group-hover:opacity-100" />
          </button>
        ))}
      </div>

      <button
        onClick={() => setDismissed(true)}
        className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        aria-label="Dismiss alert"
      >
        <CloseIcon className="size-4" />
      </button>
    </div>
  );
}
