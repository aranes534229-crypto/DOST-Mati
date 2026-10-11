// pages/Dashboard/SuperAdminDashboard.tsx
import clsx from "clsx";
import { useRef, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import DashboardCard from "../../components/dashboard/DashboardCard";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import { useViewportFill } from "../../components/dashboard/useViewportFill";
import SystemDocumentOverview from "../../components/super_admin/SuperAdminDocumentOverview";
import SuperAdminUserStats from "../../components/super_admin/SuperAdminUserStats";
import SystemLogsPanel from "../../components/super_admin/SystemLogsPanel";
import UserActivityPanel from "../../components/super_admin/UserActivityPanel";
import { getRoleDashboardConfig } from "../../config/roleDashboardConfig";
import { useUser } from "../../context/currentUser/use-user";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "activity", label: "User Activity" },
  { id: "logs", label: "System Logs" },
] as const;
type TabId = (typeof TABS)[number]["id"];

export default function SuperAdminDashboard() {
  const { currentUser } = useUser();
  const config = getRoleDashboardConfig(currentUser?.role_id);
  const [tab, setTab] = useState<TabId>("overview");

  // Fill one screen at lg+ so the page never scrolls; below that the page
  // scrolls normally. A definite height (not max-height) lets the Overview
  // chart stretch to the bottom of the viewport.
  const rootRef = useRef<HTMLDivElement>(null);
  const fill = useViewportFill(rootRef, { minWidth: 1024, bottomGap: 32 });
  const fit = fill !== undefined;

  return (
    <>
      <PageMeta title={config.title} description={config.description} />

      <div
        ref={rootRef}
        style={fit ? { height: fill } : undefined}
        className={clsx(
          "flex flex-col gap-5 rounded-3xl bg-gray-100/70 p-3 dark:bg-white/[0.02] sm:p-4",
          fit && "overflow-y-auto no-scrollbar",
        )}
      >
        <DashboardHeader>
          <div className="inline-flex w-fit rounded-full bg-gray-100/80 p-1 dark:bg-white/[0.04]">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                aria-pressed={tab === t.id}
                className={`rounded-full px-4 py-1.5 text-theme-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                  tab === t.id
                    ? "bg-white text-primary shadow-theme-xs dark:bg-white/10 dark:text-white"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </DashboardHeader>

        {tab === "overview" && (
          <div className="flex min-h-0 flex-1 flex-col gap-5">
            <div className="flex-shrink-0">
              <SuperAdminUserStats />
            </div>
            <SystemDocumentOverview fill={fit} />
          </div>
        )}

        {tab === "activity" && (
          <DashboardCard
            className={clsx("flex flex-col", fit && "flex-1 min-h-0")}
            title="User Activity"
            desc="Real-time actions across all roles"
            bodyClassName="flex-1 min-h-0 overflow-y-auto no-scrollbar"
          >
            <UserActivityPanel />
          </DashboardCard>
        )}

        {tab === "logs" && (
          <DashboardCard
            className={clsx("flex flex-col", fit && "flex-1 min-h-0")}
            title="System Logs"
            desc="Recent audit trail — last 24 hours"
            bodyClassName="flex-1 min-h-0 overflow-y-auto no-scrollbar"
          >
            <SystemLogsPanel />
          </DashboardCard>
        )}
      </div>
    </>
  );
}
