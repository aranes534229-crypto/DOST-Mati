// components/receiver/MetricCard.tsx
import MetricCard from "../dashboard/MetricCard";
import type { MetricTone } from "../dashboard/tone";

// ── Icons (inherit color from the MetricCard tone chip) ──────────────────────

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0L8 8m4-4l4 4" />
    </svg>
  );
}

function QueueIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
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

// ── Component ─────────────────────────────────────────────────────────────────
// On-Queue is 12 to reconcile with DocumentStatusChart (100 Received + 12
// On-Queue + 3 Rejected = 115 total).
export default function ReceiverMetrics() {
  const metrics: MetricDef[] = [
    { label: "Total Uploaded", value: 115, icon: <UploadIcon className="size-6" />, tone: "primary" },
    { label: "On-Queue", value: 12, icon: <QueueIcon className="size-6" />, tone: "warning" },
    { label: "Received", value: 100, icon: <CheckCircleIcon className="size-6" />, tone: "success" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3">
      {metrics.map((m) => (
        <MetricCard key={m.label} {...m} />
      ))}
    </div>
  );
}
