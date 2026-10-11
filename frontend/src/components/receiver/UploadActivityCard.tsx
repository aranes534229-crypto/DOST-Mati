// components/receiver/UploadActivityCard.tsx

import type { ApexOptions } from "apexcharts";
import { useMemo, useState } from "react";
import Chart from "react-apexcharts";
import { MoreDotIcon } from "../../icons";
import DashboardCard from "../dashboard/DashboardCard";
import { CHART_AXIS_LABEL, CHART_COLORS, CHART_FONT, CHART_GRID } from "../dashboard/chartTheme";
import { useChartMounted } from "../dashboard/useChartMounted";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

// ── Mini Stat ────────────────────────────────────────────────────────────────

function ActivityStat({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: number;
  sub: string;
  accent: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-theme-xs font-medium tracking-wide text-gray-400 uppercase dark:text-gray-500">
        {label}
      </p>
      <p className={`text-2xl font-bold ${accent}`}>{value}</p>
      <p className="text-theme-xs text-gray-500 dark:text-gray-400">{sub}</p>
    </div>
  );
}

// ── Upload Activity Card ───────────────────────────────────────────────────────

// Daily uploads for the past 7 days (Mon–Sun)
const DAILY_DATA = [4, 7, 3, 8, 6, 5, 5];
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SERIES = [{ name: "Uploads", data: DAILY_DATA }];

export default function UploadActivityCard({ fill = false }: { fill?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useChartMounted();

  const todayUploads = DAILY_DATA[DAILY_DATA.length - 1];
  const weekUploads = DAILY_DATA.reduce((a, b) => a + b, 0);

  const options = useMemo<ApexOptions>(
    () => ({
      colors: [CHART_COLORS.primary],
      chart: {
        fontFamily: CHART_FONT,
        type: "bar",
        height: fill ? "100%" : 160,
        toolbar: { show: false },
        sparkline: { enabled: false },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
          animateGradually: { enabled: true, delay: 120 },
          dynamicAnimation: { enabled: true, speed: 350 },
        },
      },
      plotOptions: {
        bar: { horizontal: false, columnWidth: "45%", borderRadius: 6, borderRadiusApplication: "end" },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 3, colors: ["transparent"] },
      xaxis: {
        categories: WEEKDAYS,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { fontSize: "11px", colors: Array(7).fill(CHART_AXIS_LABEL) } },
      },
      yaxis: { show: true, labels: { style: { fontSize: "11px", colors: [CHART_AXIS_LABEL] } } },
      grid: {
        yaxis: { lines: { show: true } },
        xaxis: { lines: { show: false } },
        borderColor: CHART_GRID,
      },
      fill: { opacity: 1 },
      tooltip: { x: { show: true }, y: { formatter: (val) => `${val} docs` } },
    }),
    [fill],
  );

  return (
    <DashboardCard
      title="Upload Activity"
      desc="Documents you've uploaded this week"
      className={fill ? "flex min-h-0 flex-1 flex-col" : "h-full"}
      bodyClassName={fill ? "flex min-h-0 flex-1 flex-col" : undefined}
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
              View More
            </DropdownItem>
          </Dropdown>
        </div>
      }
    >
      <div className="flex min-h-0 flex-1 flex-col">
        {/* Stats row */}
        <div className="mb-4 flex flex-shrink-0 items-center justify-around rounded-2xl bg-gray-50 py-4 ring-1 ring-gray-100 dark:bg-white/[0.03] dark:ring-white/[0.06]">
          <ActivityStat
            label="Today"
            value={todayUploads}
            sub="documents uploaded"
            accent="text-primary dark:text-secondary"
          />
          <div className="h-10 w-px bg-gray-200 dark:bg-gray-800" />
          <ActivityStat label="This Week" value={weekUploads} sub="documents uploaded" accent="text-success" />
        </div>

        {/* Bar chart — hard-masked box with a CSS floor; Apex fills it */}
        <div className="relative w-full flex-1 min-h-[200px] overflow-hidden">
          {mounted && (
            <Chart
              key="chart"
              options={options}
              series={SERIES}
              type="bar"
              height={fill ? "100%" : 160}
            />
          )}
        </div>
      </div>
    </DashboardCard>
  );
}
