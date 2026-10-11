// components/receiver/DocumentStatusChart.tsx

import type { ApexOptions } from "apexcharts";
import { useMemo } from "react";
import Chart from "react-apexcharts";
import { useTheme } from "../../context/ThemeContext";
import DashboardCard from "../dashboard/DashboardCard";
import {
  CHART_FONT,
  CHART_MUTED,
  CHART_VALUE_DARK,
  CHART_VALUE_LIGHT,
} from "../dashboard/chartTheme";
import { useChartMounted } from "../dashboard/useChartMounted";

interface LegendItemProps {
  color: string;
  label: string;
  count: number;
  percent: number;
}

function LegendItem({ color, label, count, percent }: LegendItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <span className="block h-3 w-3 flex-shrink-0 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-theme-sm text-gray-600 dark:text-gray-300">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-theme-sm font-semibold text-gray-800 dark:text-white/90">{count}</span>
        <span className="w-10 text-right text-theme-xs text-gray-400 dark:text-gray-500">{percent}%</span>
      </div>
    </div>
  );
}

const DATA = [
  { label: "Received", count: 100, color: "var(--color-success)" },
  { label: "On-Queue", count: 12, color: "var(--color-warning)" },
  { label: "Rejected", count: 3, color: "var(--color-danger)" },
];
const TOTAL = DATA.reduce((a, d) => a + d.count, 0);
const SERIES = DATA.map((d) => d.count);
const COLORS = DATA.map((d) => d.color);
const LABELS = DATA.map((d) => d.label);

export default function DocumentStatusChart({ fill = false }: { fill?: boolean }) {
  const { theme } = useTheme();
  const mounted = useChartMounted();
  const valueColor = theme === "dark" ? CHART_VALUE_DARK : CHART_VALUE_LIGHT;

  const options = useMemo<ApexOptions>(
    () => ({
      chart: {
        fontFamily: CHART_FONT,
        type: "donut",
        height: 220,
        toolbar: { show: false },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
          animateGradually: { enabled: true, delay: 120 },
          dynamicAnimation: { enabled: true, speed: 350 },
        },
      },
      colors: COLORS,
      labels: LABELS,
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
                formatter: () => `${TOTAL}`,
              },
              value: {
                show: true,
                fontSize: "24px",
                fontWeight: 700,
                color: valueColor,
                offsetY: 4,
              },
            },
          },
        },
      },
      tooltip: { y: { formatter: (val) => `${val} documents` } },
    }),
    [valueColor],
  );

  return (
    <DashboardCard
      title="Status Breakdown"
      desc="Distribution of your document statuses"
      className={fill ? "flex min-h-0 flex-1 flex-col" : "h-full"}
      bodyClassName={fill ? "flex min-h-0 flex-1 flex-col" : undefined}
    >
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        {mounted && (
          <Chart key="chart" options={options} series={SERIES} type="donut" height={220} width="100%" />
        )}
      </div>
      <div className="mt-5 flex-shrink-0 space-y-3 border-t border-gray-100 pt-5 dark:border-white/[0.05]">
        {DATA.map((d) => (
          <LegendItem
            key={d.label}
            color={d.color}
            label={d.label}
            count={d.count}
            percent={Math.round((d.count / TOTAL) * 100)}
          />
        ))}
      </div>
    </DashboardCard>
  );
}
