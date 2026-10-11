// components/dashboard/QuickActions.tsx
import clsx from "clsx";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import {
  getRoleDashboardConfig,
  type QuickAction,
  type QuickActionIcon,
} from "../../config/roleDashboardConfig";
import { useUser } from "../../context/currentUser/use-user";
import { Can } from "../../features/auth/authorization/Can";
import {
  ArrowRightIcon,
  AssignedDocumentsIcon,
  Document,
  ErrorIcon,
  PlugInIcon,
  SettingIcon,
  SystemLogsIcon,
  UserManagementIcon,
} from "../../icons";
import DashboardCard from "./DashboardCard";
import {
  QUICK_ACTION_ICON,
  QUICK_ACTION_ICON_COMPACT,
  QUICK_ACTION_TILE,
  QUICK_ACTION_TILE_COMPACT,
} from "./styleMaps";

const ACTION_ICONS: Record<QuickActionIcon, ReactNode> = {
  upload: <PlugInIcon className="size-5" />,
  validation: <Document className="size-5" />,
  incoming: <ArrowRightIcon className="size-5" />,
  users: <UserManagementIcon className="size-5" />,
  logs: <SystemLogsIcon className="size-5" />,
  settings: <SettingIcon className="size-5" />,
  assigned: <AssignedDocumentsIcon className="size-5" />,
  invalid: <ErrorIcon className="size-5" />,
};

function ActionButton({ action, compact = false }: { action: QuickAction; compact?: boolean }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(action.to)}
      className={clsx(
        "group flex flex-row items-center gap-3 text-left",
        compact ? QUICK_ACTION_TILE_COMPACT : QUICK_ACTION_TILE,
      )}
    >
      <span
        className={clsx(
          "flex items-center justify-center",
          compact ? QUICK_ACTION_ICON_COMPACT : QUICK_ACTION_ICON,
        )}
      >
        {ACTION_ICONS[action.icon]}
      </span>
      <span className="text-theme-sm font-medium text-gray-800 dark:text-white/90">
        {action.label}
      </span>
    </button>
  );
}

/**
 * Role-driven quick actions. The action list comes from `roleDashboardConfig`
 * and any action flagged `user_management_view` is hidden unless the user has
 * that permission (via the shared `<Can>` guard).
 */
export default function QuickActions({
  className,
  bodyClassName,
  compact = false,
}: {
  className?: string;
  bodyClassName?: string;
  /** Renders a tight vertical list (for narrow side columns). */
  compact?: boolean;
}) {
  const { currentUser } = useUser();
  const actions = getRoleDashboardConfig(currentUser?.role_id).quickActions;

  const renderButton = (action: QuickAction) =>
    action.permission === "user_management_view" ? (
      <Can
        key={action.label}
        module="user_management_permissions"
        permission="view"
      >
        <ActionButton action={action} compact={compact} />
      </Can>
    ) : (
      <ActionButton key={action.label} action={action} compact={compact} />
    );

  if (compact) {
    return (
      <DashboardCard className={className} noBodyPadding>
        <div className="flex flex-col gap-2 p-3">
          {actions.map(renderButton)}
        </div>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard
      title="Quick Actions"
      desc="Jump straight into common tasks"
      className={className}
      bodyClassName={bodyClassName}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {actions.map(renderButton)}
      </div>
    </DashboardCard>
  );
}
