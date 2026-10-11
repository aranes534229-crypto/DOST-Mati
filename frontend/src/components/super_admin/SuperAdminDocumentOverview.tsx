// components/super_admin/SuperAdminDocumentOverview.tsx

import type { ApexOptions } from "apexcharts";
import clsx from "clsx";
import { useMemo, useState } from "react";
import Chart from "react-apexcharts";
import { MoreDotIcon } from "../../icons";
import DashboardCard from "../dashboard/DashboardCard";
import { CHART_AXIS_LABEL, CHART_FONT, CHART_GRID } from "../dashboard/chartTheme";
import { useChartMounted } from "../dashboard/useChartMounted";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

interface OverviewStat {
  label: string;
  value: number;
  icon: React.ReactNode;
}

function TotalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
      />
    </svg>
  );
}
function InboxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
    </svg>
  );
}
function OutboxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
    </svg>
  );
}
function ArchiveIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
      />
    </svg>
  );
}

const stats: OverviewStat[] = [
  { label: "Total Documents", value: 3840, icon: <TotalIcon className="size-5" /> },
  { label: "Incoming", value: 2100, icon: <InboxIcon className="size-5" /> },
  { label: "Outgoing", value: 1200, icon: <OutboxIcon className="size-5" /> },
  { label: "Archived", value: 540, icon: <ArchiveIcon className="size-5" /> },
];

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const SERIES = [
  { name: "Total", data: [280, 310, 290, 340, 360, 400, 380, 420, 450, 500, 480, 530] },
  { name: "Incoming", data: [160, 175, 160, 190, 200, 220, 210, 240, 260, 290, 270, 300] },
  { name: "Outgoing", data: [80, 95, 90, 105, 115, 130, 125, 140, 150, 165, 160, 175] },
];

export default function SystemDocumentOverview({ fill = false }: { fill?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useChartMounted();

  const options = useMemo<ApexOptions>(
    () => ({
      legend: { show: false },
      colors: ["var(--color-primary)", "var(--color-success)", "var(--color-secondary)"],
      chart: {
        fontFamily: CHART_FONT,
        height: fill ? "100%" : 260,
        type: "area",
        toolbar: { show: false },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
          animateGradually: { enabled: true, delay: 120 },
          dynamicAnimation: { enabled: true, speed: 350 },
        },
      },
      stroke: { curve: "smooth", width: [2, 2, 2] },
      fill: { type: "gradient", gradient: { opacityFrom: 0.45, opacityTo: 0 } },
      markers: { size: 0, hover: { size: 5 } },
      dataLabels: { enabled: false },
      grid: {
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } },
        borderColor: CHART_GRID,
      },
      xaxis: {
        type: "category",
        categories: MONTHS,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { fontSize: "11px", colors: Array(12).fill(CHART_AXIS_LABEL) } },
      },
      yaxis: { labels: { style: { fontSize: "11px", colors: [CHART_AXIS_LABEL] } } },
      tooltip: { x: { show: true } },
    }),
    [fill],
  );

  return (
    <DashboardCard
      className={fill ? "flex min-h-0 flex-1 flex-col" : undefined}
      bodyClassName={fill ? "flex min-h-0 flex-1 flex-col" : undefined}
      title="System Document Overview"
      desc="High-level document flow across the entire system"
      headerRight={
        <div className="relative inline-block">
          <button className="dropdown-toggle" onClick={() => setIsOpen((v) => !v)}>
            <MoreDotIcon className="size-6 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
          <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)} className="w-40 p-2">
            <DropdownItem
              onItemClick={() => setIsOpen(false)}
              className="flex w-full rounded-lg text-left font-normal text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Export CSV
            </DropdownItem>
            <DropdownItem
              onItemClick={() => setIsOpen(false)}
              className="flex w-full rounded-lg text-left font-normal text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              View Report
            </DropdownItem>
          </Dropdown>
        </div>
      }
    >
      {/* Stat pills row */}
      <div className="mb-5 grid flex-shrink-0 grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3 ring-1 ring-gray-100 dark:bg-white/[0.03] dark:ring-white/[0.06]"
          >
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-white text-primary dark:bg-white/[0.05] dark:text-secondary">
              {s.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-lg leading-none font-bold text-gray-800 dark:text-white/90">
                {s.value.toLocaleString()}
              </p>
              <p className="mt-0.5 truncate text-theme-xs text-gray-400 dark:text-gray-500">
                {s.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mb-3 flex flex-shrink-0 items-center gap-5">
        {[
          { label: "Total", color: "var(--color-primary)" },
          { label: "Incoming", color: "var(--color-success)" },
          { label: "Outgoing", color: "var(--color-secondary)" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: l.color }} />
            <span className="text-theme-xs text-gray-500 dark:text-gray-400">{l.label}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div
        className={clsx(
          "max-w-full overflow-x-auto no-scrollbar",
          fill ? "min-h-0 flex-1" : "min-h-[260px]",
        )}
      >
        <div className="h-full min-w-[600px] xl:min-w-full">
          {mounted && (
            <Chart
              key="chart"
              options={options}
              series={SERIES}
              type="area"
              height={fill ? "100%" : 260}
            />
          )}
        </div>
      </div>
    </DashboardCard>
  );
}
