// components/admin/AdminMetrix.tsx
import MetricCard from "../dashboard/MetricCard";
import type { MetricTone } from "../dashboard/tone";

// ── Icons (inherit color from the MetricCard tone chip) ───────────────

function FolderIcon({ className }: { className?: string }) {
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

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
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

interface MetricDef {
  label: string;
  value: number;
  icon: React.ReactNode;
  tone: MetricTone;
}

// ── Component ─────────────────────────────────────────────────────────
// Only four KPIs — the rest of the breakdown lives inside the Analytics chart.
export default function AdminMetrics() {
  const metrics: MetricDef[] = [
    {
      label: "Total Documents",
      value: 1250,
      icon: <FolderIcon className="size-6" />,
      tone: "primary",
    },
    {
      label: "Pending Documents",
      value: 120,
      icon: <ClockIcon className="size-6" />,
      tone: "warning",
    },
    {
      label: "On-Going",
      value: 300,
      icon: <RefreshIcon className="size-6" />,
      tone: "info",
    },
    {
      label: "Completed",
      value: 830,
      icon: <CheckCircleIcon className="size-6" />,
      tone: "success",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
      {metrics.map((m) => (
        <MetricCard key={m.label} {...m} />
      ))}
    </div>
  );
}
