// pages/Dashboard/AdminDashboard.tsx
import { useState } from "react";
import AdminMetrics from "../../components/admin/AdminMetrix";
import AnalyticsSection from "../../components/admin/AnalyticsSection";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentActivity from "../../components/admin/RecentActivity";
import StaleDocumentsSummary from "../../components/admin/StaleDocumentsSummary";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import PageMeta from "../../components/common/PageMeta";
import { getRoleDashboardConfig } from "../../config/roleDashboardConfig";
import { useUser } from "../../context/currentUser/use-user";

// Reduced from 3 tabs to 2: Quick Actions and Stale Documents don't meet the
// bar for hiding content behind a tab (short, frequently-needed content per
// NN/g's tab-usage heuristic). Activity remains separate since it's a growing
// log users don't need to see simultaneously with the KPI/chart view.
const TABS = ["Overview", "Activity"] as const;
type Tab = (typeof TABS)[number];

export default function AdminDashboard() {
  const { currentUser } = useUser();
  const config = getRoleDashboardConfig(currentUser?.role_id);
  const [tab, setTab] = useState<Tab>("Overview");

  return (
    <>
      <PageMeta title={config.title} description={config.description} />
      {/* Fills the parent route container's height — no page-level scroll.
          The tinted, rounded panel makes the white cards visibly float. */}
      <div className="flex h-full flex-col gap-5 overflow-hidden rounded-3xl bg-gray-100/70 p-3 dark:bg-white/[0.02] sm:p-4">
        <DashboardHeader>
          <div className="inline-flex w-fit rounded-full bg-gray-100/80 p-1 dark:bg-white/[0.04]">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                aria-pressed={tab === t}
                className={`rounded-full px-4 py-1.5 text-theme-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                  tab === t
                    ? "bg-white text-primary shadow-theme-xs dark:bg-white/10 dark:text-white"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </DashboardHeader>

        {/* ── Tab content — fills remaining height, no internal scroll ─ */}
        <div className="min-h-0 flex-1 overflow-hidden">
          {tab === "Overview" && (
            <div className="flex h-full flex-col gap-5">
              <div className="flex-shrink-0">
                <AdminMetrics />
              </div>
              {/* 12-col grid, consistent with the rest of the app.
                  Analytics gets primary weight (left, 8 cols); Quick Actions
                  and Stale Documents live in a secondary column (4 cols) so
                  they're always visible instead of gated behind a tab click. */}
              <div className="grid min-h-0 flex-1 grid-cols-12 items-stretch gap-5 overflow-hidden">
                <div className="col-span-12 min-h-0 xl:col-span-8">
                  <AnalyticsSection />
                </div>
                <div className="col-span-12 flex h-full min-h-0 flex-col gap-5 overflow-y-auto xl:col-span-4">
                  <StaleDocumentsSummary />
                  <QuickActions
                    className="flex flex-1 flex-col"
                    bodyClassName="flex flex-1 flex-col justify-center"
                  />
                </div>
              </div>
            </div>
          )}
          {tab === "Activity" && (
            <div className="h-full">
              <RecentActivity />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
