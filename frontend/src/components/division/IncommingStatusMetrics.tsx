import type { MetricTone } from "../dashboard/tone";
import MetricCard from "../dashboard/MetricCard";
import type { StatusType } from "../ui/modal/document/StatusUpdateModal";

// ── Icons (inherit color from the MetricCard tone chip) ──────────────

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
      />
    </svg>
  );
}

// ── Types ──────────────────────────────────────────────────────────────

type StatusFilter = StatusType | "All";

interface IncomingStatusMetricsProps {
  total: number;
  completed: number;
  onGoing: number;
  pending: number;
  activeStatus: StatusFilter;
  onSelect: (status: StatusFilter) => void;
}

interface MetricDef {
  key: StatusFilter;
  label: string;
  value: number;
  icon: React.ReactNode;
  tone: MetricTone;
}

// ── Component ─────────────────────────────────────────────────────────

export default function IncomingStatusMetrics({
  total,
  completed,
  onGoing,
  pending,
  activeStatus,
  onSelect,
}: IncomingStatusMetricsProps) {
  const metrics: MetricDef[] = [
    {
      key: "All",
      label: "Total Assigned",
      value: total,
      icon: <DocumentIcon className="size-6" />,
      tone: "primary",
    },
    {
      key: "Completed",
      label: "Completed",
      value: completed,
      icon: <CheckCircleIcon className="size-6" />,
      tone: "success",
    },
    {
      key: "On-Going",
      label: "On-Going",
      value: onGoing,
      icon: <ClockIcon className="size-6" />,
      tone: "info",
    },
    {
      key: "Pending",
      label: "Pending",
      value: pending,
      icon: <AlertIcon className="size-6" />,
      tone: "danger",
    },
  ];

  function handleClick(key: StatusFilter) {
    onSelect(activeStatus === key ? "All" : key);
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6 xl:grid-cols-4">
      {metrics.map((m) => (
        <MetricCard
          key={m.key}
          label={m.label}
          value={m.value}
          icon={m.icon}
          tone={m.tone}
          active={activeStatus === m.key}
          onClick={() => handleClick(m.key)}
        />
      ))}
    </div>
  );
}
