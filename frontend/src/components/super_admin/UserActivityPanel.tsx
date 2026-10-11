// components/super_admin/UserActivityPanel.tsx
import { useState } from "react";
import { MoreDotIcon } from "../../icons";
import Pagination from "../common/Pagination";
import EmptyState from "../dashboard/EmptyState";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

type ActivityType = "upload" | "validate" | "status" | "login" | "permission";

interface ActivityEntry {
  id: number;
  type: ActivityType;
  actor: string;
  role: "Receiver" | "Admin" | "Super Admin";
  action: string;
  count?: number;
  unit?: string;
  time: string;
  date: "today" | "yesterday";
}

const activities: ActivityEntry[] = [
  { id: 1, type: "upload", actor: "Maria Santos", role: "Receiver", action: "uploaded", count: 20, unit: "documents", time: "2:45 PM", date: "today" },
  { id: 2, type: "validate", actor: "Ramon Garcia", role: "Admin", action: "validated", count: 35, unit: "documents", time: "1:30 PM", date: "today" },
  { id: 3, type: "status", actor: "Liza Torres", role: "Admin", action: "updated status on", count: 10, unit: "documents", time: "11:10 AM", date: "today" },
  { id: 4, type: "login", actor: "Juan dela Cruz", role: "Receiver", action: "logged in", time: "9:02 AM", date: "today" },
  { id: 5, type: "permission", actor: "Super Admin", role: "Super Admin", action: "changed permissions for Ana Reyes", time: "8:30 AM", date: "today" },
  { id: 6, type: "upload", actor: "Carlos Mendoza", role: "Receiver", action: "uploaded", count: 8, unit: "documents", time: "4:55 PM", date: "yesterday" },
  { id: 7, type: "validate", actor: "Ramon Garcia", role: "Admin", action: "validated", count: 22, unit: "documents", time: "3:20 PM", date: "yesterday" },
  { id: 8, type: "permission", actor: "Super Admin", role: "Super Admin", action: "added new user — Ana Reyes (Receiver)", time: "10:00 AM", date: "yesterday" },
];

const typeConfig: Record<ActivityType, { chip: string; icon: React.ReactNode }> = {
  upload: {
    chip: "bg-blue-light-100 text-blue-light-600 dark:bg-blue-light-500/10 dark:text-blue-light-400",
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0L8 8m4-4l4 4" />
      </svg>
    ),
  },
  validate: {
    chip: "bg-success/10 text-success",
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  status: {
    chip: "bg-warning/10 text-warning",
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  login: {
    chip: "bg-secondary/10 text-secondary",
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
      </svg>
    ),
  },
  permission: {
    chip: "bg-primary/10 text-primary dark:bg-primary/20 dark:text-secondary",
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
  },
};

// Pill styling — previously only a text color, which made the rounded chip invisible.
const roleBadge: Record<ActivityEntry["role"], string> = {
  Receiver: "bg-primary/10 text-primary dark:bg-primary/20 dark:text-secondary",
  Admin: "bg-success/10 text-success",
  "Super Admin": "bg-secondary/10 text-secondary",
};

function buildDescription(a: ActivityEntry): string {
  if (a.count !== undefined) return `${a.action} ${a.count} ${a.unit}`;
  return a.action;
}

function ActivityItem({ entry }: { entry: ActivityEntry }) {
  const cfg = typeConfig[entry.type];
  return (
    <div className="flex items-start gap-3 border-b border-gray-100 py-3 last:border-0 dark:border-white/[0.05]">
      <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl ${cfg.chip}`}>
        {cfg.icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-theme-sm font-semibold text-gray-800 dark:text-white/90">
              {entry.actor}
            </span>
            <span className={`rounded-full px-2 py-0.5 text-theme-xs font-medium ${roleBadge[entry.role]}`}>
              {entry.role}
            </span>
          </div>
          <span className="flex-shrink-0 whitespace-nowrap text-theme-xs text-gray-400 dark:text-gray-500">
            {entry.time}
          </span>
        </div>
        <p className="mt-0.5 text-theme-sm text-gray-500 dark:text-gray-400">
          {buildDescription(entry)}
        </p>
      </div>
    </div>
  );
}

const ITEMS_PER_PAGE = 4;

/** Content-only activity feed (rendered inside the Activity & Logs tabs). */
export default function UserActivityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<ActivityType | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);

  const allFiltered = activities.filter((a) => filter === "all" || a.type === filter);
  const totalPages = Math.max(1, Math.ceil(allFiltered.length / ITEMS_PER_PAGE));
  const pageStart = (currentPage - 1) * ITEMS_PER_PAGE;
  const pagedItems = allFiltered.slice(pageStart, pageStart + ITEMS_PER_PAGE);

  const filterOptions: { label: string; value: ActivityType | "all" }[] = [
    { label: "All Activity", value: "all" },
    { label: "Uploads", value: "upload" },
    { label: "Validations", value: "validate" },
    { label: "Status Changes", value: "status" },
    { label: "Logins", value: "login" },
    { label: "Permissions", value: "permission" },
  ];

  return (
    <>
      {/* Filter chips + export control */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((f) => (
            <button
              key={f.value}
              onClick={() => {
                setCurrentPage(1);
                setFilter(f.value);
              }}
              className={`rounded-full px-3 py-1 text-theme-xs font-medium transition-colors ${
                filter === f.value
                  ? "bg-primary text-white dark:bg-secondary"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.08]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative inline-block flex-shrink-0">
          <button className="dropdown-toggle" onClick={() => setIsOpen((v) => !v)}>
            <MoreDotIcon className="size-6 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
          <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)} className="w-40 p-2">
            <DropdownItem
              onItemClick={() => setIsOpen(false)}
              className="flex w-full rounded-lg text-left font-normal text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Export Log
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      {/* Feed */}
      {pagedItems.length === 0 ? (
        <EmptyState message="No activity matches this filter." />
      ) : (
        <>
          <div>
            {pagedItems.map((e) => (
              <ActivityItem key={e.id} entry={e} />
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}
    </>
  );
}
