// config/roleDashboardConfig.ts
// Role-rules layer: what each role's dashboard is called, what needs their
// attention, and which quick actions they get. Keeping this in one place means
// components stay config-driven instead of branching on `role === n` inline.

import { getStaleCounts } from "../components/admin/staleDocumentsData";
import type { Roles } from "../context/currentUser/curr-user.type";

export interface AttentionItem {
  label: string;
  value: number;
  to: string;
  /** "alert" demands a response; "indicator" is a quiet status count. */
  tier: "alert" | "indicator";
}

export type QuickActionIcon =
  | "upload"
  | "validation"
  | "incoming"
  | "users"
  | "logs"
  | "settings"
  | "assigned"
  | "invalid";

export interface QuickAction {
  label: string;
  to: string;
  icon: QuickActionIcon;
  /** Only the user-management module currently has permissions to gate on. */
  permission?: "user_management_view";
}

export interface RoleDashboardConfig {
  role: Roles;
  roleName: string;
  title: string;
  description: string;
  subtitle: string;
  landingPath: string;
  attentionItems: AttentionItem[];
  quickActions: QuickAction[];
}

const stale = getStaleCounts();

export const ROLE_DASHBOARD_CONFIG: Record<Roles, RoleDashboardConfig> = {
  1: {
    role: 1,
    roleName: "Super Admin",
    title: "Super Admin Dashboard | Document Tracking System",
    description:
      "Full system visibility — user statistics, document overview, live activity feed, and audit logs.",
    subtitle: "Here's the system at a glance.",
    landingPath: "/super-admin/dashboard",
    attentionItems: [
      { label: "Failed Logins", value: 2, to: "/activities", tier: "alert" },
      { label: "System Warnings", value: 3, to: "/activities", tier: "indicator" },
    ],
    quickActions: [
      { label: "Manage Users", to: "/users", icon: "users", permission: "user_management_view" },
      { label: "System Logs", to: "/activities", icon: "logs" },
      { label: "Settings", to: "/setting", icon: "settings" },
    ],
  },
  2: {
    role: 2,
    roleName: "Admin",
    title: "Admin Dashboard | Document Tracking System",
    description:
      "Monitor system-wide document flow, validation queue, and division workload across the Provincial Engineer's Office.",
    subtitle: "Here's what needs your attention today.",
    landingPath: "/admin/dashboard",
    attentionItems: [
      {
        label: "Stale Documents",
        value: stale.overdue,
        to: "/admin/stale-documents",
        tier: "alert",
      },
      { label: "Invalid Documents", value: 6, to: "/upload-invalid", tier: "alert" },
      { label: "Pending Documents", value: 120, to: "/upload-queue", tier: "indicator" },
    ],
    quickActions: [
      { label: "Upload Documents", to: "/upload-direct", icon: "upload" },
      { label: "Go to Validation", to: "/upload-queue", icon: "validation" },
      { label: "View Incoming", to: "/incoming", icon: "incoming" },
    ],
  },
  3: {
    role: 3,
    roleName: "Receiving Officer",
    title: "My Dashboard | Document Tracking System",
    description:
      "View and manage all documents you've uploaded — track status, review history, and monitor upload activity.",
    subtitle: "Here's your document activity.",
    landingPath: "/receiving-officer/dashboard",
    attentionItems: [
      { label: "Invalid Documents", value: 3, to: "/invalid-documents", tier: "alert" },
    ],
    quickActions: [
      { label: "Upload Document", to: "/incoming-upload", icon: "upload" },
      { label: "My Uploads", to: "/uploads", icon: "assigned" },
      { label: "Invalid Documents", to: "/invalid-documents", icon: "invalid" },
    ],
  },
  4: {
    role: 4,
    roleName: "Division",
    title: "Division Dashboard | Document Tracking System",
    description:
      "Track documents routed to your division — monitor workload, status, and routing.",
    subtitle: "Here's your division's assigned workload.",
    landingPath: "/division/dashboard",
    attentionItems: [
      {
        label: "Pending Assigned",
        value: 2,
        to: "/division/dashboard",
        tier: "indicator",
      },
    ],
    quickActions: [
      { label: "Assigned Documents", to: "/division/dashboard", icon: "assigned" },
    ],
  },
};

export function getRoleDashboardConfig(
  role: Roles | null | undefined,
): RoleDashboardConfig {
  return role ? ROLE_DASHBOARD_CONFIG[role] : ROLE_DASHBOARD_CONFIG[2];
}

export function getLandingPath(role: Roles | null | undefined): string | null {
  return role ? ROLE_DASHBOARD_CONFIG[role].landingPath : null;
}
