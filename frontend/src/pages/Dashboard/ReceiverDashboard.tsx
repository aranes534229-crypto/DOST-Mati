// pages/Dashboard/ReceiverDashboard.tsx
import clsx from "clsx";
import { useRef, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import { useViewportFill } from "../../components/dashboard/useViewportFill";
import DocumentStatusChart from "../../components/receiver/DocumentStatusChart";
import ReceiverMetrics from "../../components/receiver/MetricCard";
import RecentUploads from "../../components/receiver/RecentUploads";
import UploadActivityCard from "../../components/receiver/UploadActivityCard";
import { getRoleDashboardConfig } from "../../config/roleDashboardConfig";
import { useUser } from "../../context/currentUser/use-user";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "uploads", label: "Recent Uploads" },
] as const;
type TabId = (typeof TABS)[number]["id"];

export default function ReceiverDashboard() {
  const { currentUser } = useUser();
  const config = getRoleDashboardConfig(currentUser?.role_id);
  const [tab, setTab] = useState<TabId>("overview");

  // Fill one screen at lg+ so the page never scrolls; below that the page
  // scrolls normally. A definite height lets the charts stretch to the bottom.
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
          fit && "overflow-hidden",
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
          <div className="flex h-full min-h-0 flex-1 flex-col gap-5 overflow-hidden">
            {/* KPI cards */}
            <div className="flex-shrink-0">
              <ReceiverMetrics />
            </div>

            {/* 8/4 charts fill the remaining 100vh frame */}
            <div className="grid grid-cols-12 gap-5 flex-1 min-h-[320px]">
              <div className="col-span-12 flex min-h-0 xl:col-span-8">
                <UploadActivityCard fill={fit} />
              </div>
              <div className="col-span-12 flex min-h-0 xl:col-span-4">
                <DocumentStatusChart fill={fit} />
              </div>
            </div>
          </div>
        )}

        {tab === "uploads" && <RecentUploads fill={fit} />}
      </div>
    </>
  );
}
