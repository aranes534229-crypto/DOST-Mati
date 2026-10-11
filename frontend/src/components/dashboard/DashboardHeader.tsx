// components/dashboard/DashboardHeader.tsx
import type { ReactNode } from "react";
import { getRoleDashboardConfig } from "../../config/roleDashboardConfig";
import { useUser } from "../../context/currentUser/use-user";
import NeedsAttentionStrip from "./NeedsAttention";
import { GREETING } from "./styleMaps";

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

interface DashboardHeaderProps {
  /** Extra content rendered below the attention strip (e.g. tab pills). */
  children?: ReactNode;
}

/**
 * Role-aware greeting + attention strip used by every dashboard. The name now
 * comes from the logged-in user instead of a hard-coded "user_name" literal.
 */
export default function DashboardHeader({ children }: DashboardHeaderProps) {
  const { currentUser } = useUser();
  const config = getRoleDashboardConfig(currentUser?.role_id);
  const name = currentUser?.full_name?.trim() || config.roleName;

  return (
    <div className="flex-shrink-0 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={GREETING}>
            {greeting()}, {name}
          </h1>
          <p className="text-theme-xs text-gray-500 dark:text-gray-400">
            {config.subtitle}
          </p>
        </div>
      </div>
      <NeedsAttentionStrip />
      {children}
    </div>
  );
}
