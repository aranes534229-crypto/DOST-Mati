// components/admin/RecentActivity.tsx
import { useNavigate } from "react-router";
import type { ReactNode } from "react";
import DashboardCard from "../dashboard/DashboardCard";
import ActivityRow from "../dashboard/ActivityRow";
import type { MetricTone } from "../dashboard/tone";

interface ActivityItem {
  title: string;
  meta: string;
  time: string;
  tone: MetricTone;
  icon: ReactNode;
}

function UploadIcon() {
  return (
    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0L7 9m5-5l5 5M5 20h14" />
    </svg>
  );
}

function RouteIcon() {
  return (
    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function CompleteIcon() {
  return (
    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

const activity: ActivityItem[] = [
  {
    title: "Road Widening Proposal uploaded",
    meta: "DOC-2024-087 · J. Reyes",
    time: "12m ago",
    tone: "info",
    icon: <UploadIcon />,
  },
  {
    title: "Bridge Inspection Report routed",
    meta: "DOC-2024-086 · → Roads Division",
    time: "38m ago",
    tone: "primary",
    icon: <RouteIcon />,
  },
  {
    title: "Equipment Request completed",
    meta: "DOC-2024-085 · M. Santos",
    time: "1h ago",
    tone: "success",
    icon: <CompleteIcon />,
  },
  {
    title: "Drainage Repair uploaded",
    meta: "DOC-2024-084 · L. Cruz",
    time: "2h ago",
    tone: "info",
    icon: <UploadIcon />,
  },
  {
    title: "Right-of-Way Clearance routed",
    meta: "DOC-2024-083 · → Planning Division",
    time: "4h ago",
    tone: "primary",
    icon: <RouteIcon />,
  },
];

export default function RecentActivity() {
  const navigate = useNavigate();

  return (
    <DashboardCard
      title="Recent Activity"
      desc="Latest uploads & routing"
      className="h-full"
      bodyClassName="space-y-1"
      headerRight={
        <button
          onClick={() => navigate("/upload-queue")}
          className="text-theme-sm font-medium text-primary hover:underline dark:text-secondary"
        >
          View all
        </button>
      }
    >
      {activity.map((item, i) => (
        <ActivityRow
          key={i}
          icon={item.icon}
          tone={item.tone}
          title={item.title}
          meta={item.meta}
          time={item.time}
        />
      ))}
    </DashboardCard>
  );
}
