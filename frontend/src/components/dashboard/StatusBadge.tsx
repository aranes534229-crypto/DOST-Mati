// components/dashboard/StatusBadge.tsx
import Badge from "../ui/badge/Badge";
import { getStatusBadgeColor } from "./status";

interface StatusBadgeProps {
  status: string;
  size?: "sm" | "md";
}

/**
 * Canonical status badge. Uses the shared status->tone map so "Completed",
 * "Received" and "Valid" all read the same across dashboards.
 */
export default function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  return (
    <Badge size={size} color={getStatusBadgeColor(status)}>
      {status}
    </Badge>
  );
}
