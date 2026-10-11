// components/admin/AnalyticsSection.tsx

import type { ApexOptions } from "apexcharts";
import clsx from "clsx";
import { useEffect, useState, type ReactNode } from "react";
import Chart from "react-apexcharts";
import { useNavigate } from "react-router";
import { ArrowRightIcon } from "../../icons";
import DashboardCard from "../dashboard/DashboardCard";
import { CHART_FONT, CHART_MUTED } from "../dashboard/chartTheme";

// ── Mock data (shared across tabs) ────────────────────────────────────────────
const statusData = [
  { label: "Completed", count: 830, color: "var(--color-success)" },
  { label: "On-Going", count: 300, color: "var(--color-warning)" },
  { label: "Pending", count: 120, color: "var(--color-danger)" },
];
const statusTotal = statusData.reduce((a, d) => a + d.count, 0);

const flow = [
  { label: "Incoming", value: 800, to: "/incoming", color: "text-blue-light-600 dark:text-blue-light-400", bg: "bg-blue-light-100 dark:bg-blue-light-500/10" },
  { label: "Outgoing", value: 450, to: "/outgoing", color: "text-secondary", bg: "bg-secondary/10" },
];

interface Division {
  name: string;
  count: number;
  dotColor: string;
}
const divisions: Division[] = [
  { name: "Roads Division", count: 30, dotColor: "var(--color-primary)" },
  { name: "Planning Division", count: 20, dotColor: "var(--color-secondary)" },
  { name: "Maintenance Division", count: 15, dotColor: "var(--color-accent)" },
  { name: "Bridge Division", count: 12, dotColor: "var(--color-success)" },
  { name: "Drainage Division", count: 8, dotColor: "var(--color-danger)" },
];

const queueStats = [
  {
    label: "Pending Extraction",
    value: 20,
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    label: "Routed Today",
    value: 50,
    color: "text-success",
    bg: "bg-success/10",
  },
];

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );
}

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0L7 9m5-5l5 5M5 20h14" />
    </svg>
  );
}

function RouteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

// ── Shared interactive tile (Incoming/Outgoing + queue stats) ──────────────────
interface StatTileProps {
  label: string;
  value: number;
  color: string;
  bg: string;
  icon: ReactNode;
  /** When provided the tile becomes a button (with a trailing chevron). */
  onClick?: () => void;
}

function StatTile({ label, value, color, bg, icon, onClick }: StatTileProps) {
  const className = clsx(
    "group/tile flex items-center gap-4 rounded-2xl bg-gray-50 p-4 ring-1 ring-gray-100 transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-theme-sm hover:ring-gray-200 motion-reduce:transition-none dark:bg-white/[0.03] dark:ring-white/[0.06] dark:hover:ring-white/[0.12]",
    onClick &&
      "w-full cursor-pointer text-left hover:ring-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
  );

  const inner = (
    <>
      <div
        className={clsx(
          "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300 ease-out group-hover/tile:scale-105 motion-reduce:transition-none motion-reduce:group-hover/tile:scale-100",
          bg,
          color,
        )}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-theme-xs font-medium tracking-wide text-gray-400 uppercase dark:text-gray-500">
          {label}
        </p>
        <p className={clsx("mt-0.5 text-2xl font-bold", color)}>{value}</p>
      </div>
      {onClick && (
        <ArrowRightIcon className="ml-auto size-4 flex-shrink-0 text-gray-300 transition duration-300 ease-out group-hover/tile:translate-x-0.5 group-hover/tile:text-gray-500 motion-reduce:transition-none motion-reduce:group-hover/tile:translate-x-0 dark:text-gray-600 dark:group-hover/tile:text-gray-300" />
      )}
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} aria-label={`View ${label} documents`} className={className}>
        {inner}
      </button>
    );
  }

  return <div className={className}>{inner}</div>;
}

// ── Tabs ──────────────────────────────────────────────────────────────────────
const TABS = ["Overview", "Divisions", "Uploads"] as const;
type Tab = (typeof TABS)[number];

export default function AnalyticsSection() {
  const [tab, setTab] = useState<Tab>("Overview");
  const navigate = useNavigate();

  const tabSwitcher = (
    <div className="inline-flex rounded-full bg-gray-100/80 p-1 dark:bg-white/[0.04]">
      {TABS.map((t) => (
        <button
          key={t}
          onClick={() => setTab(t)}
          aria-pressed={tab === t}
          className={`rounded-full px-3 py-1.5 text-theme-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
            tab === t
              ? "bg-white text-secondary shadow-theme-xs dark:bg-white/10 dark:text-white"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );

  return (
    <DashboardCard
      title="Analytics"
      desc="Status, division workload & upload flow"
      headerRight={tabSwitcher}
      className="h-full"
    >
      {tab === "Overview" && <OverviewTab />}
      {tab === "Divisions" && <DivisionsTab />}
      {tab === "Uploads" && <UploadsTab onViewQueue={() => navigate("/upload-queue")} />}
    </DashboardCard>
  );
}

// ── Overview: donut + Incoming/Outgoing ───────────────────────────────────────
function OverviewTab() {
  const navigate = useNavigate();
  const series = statusData.map((d) => d.count);
  const colors = statusData.map((d) => d.color);
  const labels = statusData.map((d) => d.label);

  const options: ApexOptions = {
    chart: {
      fontFamily: CHART_FONT,
      type: "donut",
      height: 240,
      toolbar: { show: false },
    },
    colors,
    labels,
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
    plotOptions: {
      pie: {
        donut: {
          size: "72%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              fontSize: "13px",
              fontWeight: 500,
              color: CHART_MUTED,
              formatter: () => `${statusTotal.toLocaleString()}`,
            },
            value: {
              show: true,
              fontSize: "24px",
              fontWeight: 700,
              color: "var(--color-text)",
              offsetY: 4,
            },
          },
        },
      },
    },
    tooltip: { y: { formatter: (val) => `${val} documents` } },
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Donut + legend */}
      <div>
        <div className="flex items-center justify-center">
          <Chart options={options} series={series} type="donut" height={240} width="100%" />
        </div>
        <div className="mt-4 space-y-1.5 border-t border-gray-100 pt-4 dark:border-white/[0.05]">
          {statusData.map((d) => (
            <div
              key={d.label}
              className="-mx-2 flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-white/[0.03]"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="block h-3 w-3 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: d.color }}
                />
                <span className="text-theme-sm text-gray-600 dark:text-gray-300">{d.label}</span>
              </div>
              <span className="text-theme-sm font-semibold text-gray-800 dark:text-white/90">
                {d.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Incoming / Outgoing — tucked inside the chart instead of their own cards */}
      <div className="flex flex-col justify-center gap-4">
        <p className="text-theme-xs font-medium tracking-wide text-gray-400 uppercase dark:text-gray-500">
          Document Flow
        </p>
        {flow.map((f) => (
          <StatTile
            key={f.label}
            label={f.label}
            value={f.value}
            color={f.color}
            bg={f.bg}
            onClick={() => navigate(f.to)}
            icon={
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    f.label === "Incoming"
                      ? "M12 8v8m0-8l-4 4m4-4l4 4M5 20h14"
                      : "M12 16V8m0 8l-4-4m4 4l4-4M5 4h14"
                  }
                />
              </svg>
            }
          />
        ))}
      </div>
    </div>
  );
}

// ── Divisions: workload bars ──────────────────────────────────────────────────
function DivisionsTab() {
  const max = Math.max(...divisions.map((d) => d.count));
  const total = divisions.reduce((a, d) => a + d.count, 0);

  // Grow the bars from 0 on tab open (rAF so the initial 0% actually paints).
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div>
      <div className="mb-5 flex items-center gap-3 rounded-2xl bg-primary/5 p-3.5 ring-1 ring-primary/10 dark:bg-secondary/5 dark:ring-secondary/10">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 dark:bg-secondary/10">
          <BuildingIcon className="size-5 text-primary dark:text-secondary" />
        </div>
        <div>
          <p className="text-theme-xs text-gray-500 dark:text-gray-400">Total assigned documents</p>
          <p className="text-lg font-bold text-gray-800 dark:text-white/90">{total}</p>
        </div>
      </div>
      <div className="space-y-3">
        {divisions.map((div, i) => {
          const percent = Math.round((div.count / max) * 100);
          return (
            <div
              key={div.name}
              className="-mx-2 space-y-1.5 rounded-lg px-2 py-1.5 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-white/[0.03]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className="block h-2.5 w-2.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: div.dotColor }}
                  />
                  <span className="text-theme-sm font-medium text-gray-700 dark:text-gray-300">
                    {div.name}
                  </span>
                </div>
                <span className="text-theme-sm font-semibold text-gray-800 dark:text-white/90">
                  {div.count}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-white/[0.06]">
                <div
                  className="h-full rounded-full transition-[width] duration-700 ease-out motion-reduce:transition-none"
                  style={{
                    width: `${ready ? percent : 0}%`,
                    backgroundColor: div.dotColor,
                    transitionDelay: `${i * 60}ms`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Uploads: summary, not a full list (progressive disclosure) ────────────────
function UploadsTab({ onViewQueue }: { onViewQueue: () => void }) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        {queueStats.map((s) => (
          <StatTile
            key={s.label}
            label={s.label}
            value={s.value}
            color={s.color}
            bg={s.bg}
            icon={
              s.label === "Pending Extraction" ? (
                <UploadIcon className="size-5" />
              ) : (
                <RouteIcon className="size-5" />
              )
            }
          />
        ))}
      </div>

      <button
        onClick={onViewQueue}
        className="group mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-2xl py-2.5 text-theme-sm font-medium text-gray-600 ring-1 ring-gray-200 transition duration-300 hover:bg-gray-50 hover:ring-gray-300 hover:shadow-theme-xs dark:text-gray-300 dark:ring-white/[0.06] dark:hover:bg-white/[0.03] dark:hover:ring-white/[0.12]"
      >
        View Queue
        <ArrowRightIcon className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
      </button>
    </div>
  );
}
