// components/super_admin/SystemLogsPanel.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import Pagination from "../common/Pagination";
import EmptyState from "../dashboard/EmptyState";

type LogLevel = "info" | "warning" | "error" | "success";
type LogCategory = "login" | "document" | "permission" | "system";

interface LogEntry {
  id: number;
  level: LogLevel;
  category: LogCategory;
  message: string;
  actor?: string;
  ip?: string;
  timestamp: string;
}

const logs: LogEntry[] = [
  { id: 1, level: "success", category: "login", message: "Successful login", actor: "maria.santos", ip: "192.168.1.12", timestamp: "2024-06-20 14:45:02" },
  { id: 2, level: "info", category: "document", message: "Document INC-2024-044 created", actor: "juan.delacruz", ip: "192.168.1.25", timestamp: "2024-06-20 14:32:18" },
  { id: 3, level: "warning", category: "permission", message: "Role changed: Receiver → Admin", actor: "superadmin", ip: "192.168.1.1", timestamp: "2024-06-20 13:10:44" },
  { id: 4, level: "error", category: "login", message: "Failed login attempt (3rd try)", actor: "unknown", ip: "203.0.113.42", timestamp: "2024-06-20 12:58:31" },
  { id: 5, level: "info", category: "document", message: "Document OUT-2024-031 archived", actor: "ramon.garcia", ip: "192.168.1.30", timestamp: "2024-06-20 11:22:09" },
  { id: 6, level: "success", category: "permission", message: "New user created — ana.reyes", actor: "superadmin", ip: "192.168.1.1", timestamp: "2024-06-20 10:00:55" },
  { id: 7, level: "info", category: "system", message: "Scheduled backup completed", timestamp: "2024-06-20 03:00:00" },
  { id: 8, level: "warning", category: "system", message: "Storage usage at 78%", timestamp: "2024-06-20 00:01:00" },
  { id: 9, level: "success", category: "login", message: "Successful login", actor: "liza.torres", ip: "192.168.1.18", timestamp: "2024-06-19 16:05:33" },
  { id: 10, level: "info", category: "document", message: "Status updated on INC-2024-040", actor: "ramon.garcia", ip: "192.168.1.30", timestamp: "2024-06-19 15:44:21" },
];

const levelConfig: Record<LogLevel, { dot: string; badge: string; label: string }> = {
  success: { dot: "bg-success", badge: "bg-success/10 text-success", label: "Success" },
  info: {
    dot: "bg-blue-light-500",
    badge: "bg-blue-light-100 text-blue-light-600 dark:bg-blue-light-500/10 dark:text-blue-light-400",
    label: "Info",
  },
  warning: { dot: "bg-warning", badge: "bg-warning/10 text-warning", label: "Warning" },
  error: { dot: "bg-danger", badge: "bg-danger/10 text-danger", label: "Error" },
};

const categoryConfig: Record<LogCategory, { label: string; icon: React.ReactNode }> = {
  login: {
    label: "Login",
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
      </svg>
    ),
  },
  document: {
    label: "Document",
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  permission: {
    label: "Permission",
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
  },
  system: {
    label: "System",
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
  },
};

const LOGS_PER_PAGE = 5;

/** Content-only system log preview (rendered inside the Activity & Logs tabs). */
export default function SystemLogsPanel() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<LogCategory | "all">("all");
  const [activeLevel, setActiveLevel] = useState<LogLevel | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = logs.filter(
    (l) =>
      (activeCategory === "all" || l.category === activeCategory) &&
      (activeLevel === "all" || l.level === activeLevel),
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / LOGS_PER_PAGE));
  const pageStart = (currentPage - 1) * LOGS_PER_PAGE;
  const pagedLogs = filtered.slice(pageStart, pageStart + LOGS_PER_PAGE);

  const categories: (LogCategory | "all")[] = ["all", "login", "document", "permission", "system"];
  const levels: (LogLevel | "all")[] = ["all", "success", "info", "warning", "error"];

  const errorCount = logs.filter((l) => l.level === "error").length;
  const warningCount = logs.filter((l) => l.level === "warning").length;

  return (
    <>
      {/* Category filter + level summary */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => {
                setCurrentPage(1);
                setActiveCategory(c);
              }}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-theme-xs font-medium capitalize transition-colors ${
                activeCategory === c
                  ? "bg-primary text-white dark:bg-secondary"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.08]"
              }`}
            >
              {c !== "all" && categoryConfig[c as LogCategory].icon}
              {c === "all" ? "All" : categoryConfig[c as LogCategory].label}
            </button>
          ))}
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          {errorCount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-danger/10 px-2.5 py-1 text-theme-xs font-semibold text-danger">
              {errorCount} error{errorCount > 1 ? "s" : ""}
            </span>
          )}
          {warningCount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-warning/10 px-2.5 py-1 text-theme-xs font-semibold text-warning">
              {warningCount} warning{warningCount > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {/* Level filter */}
      <div className="mb-4 flex flex-wrap gap-2">
        {levels.map((l) => (
          <button
            key={l}
            onClick={() => {
              setCurrentPage(1);
              setActiveLevel(l);
            }}
            className={`rounded-full px-3 py-1 text-theme-xs font-medium capitalize transition-colors ${
              activeLevel === l
                ? l === "all"
                  ? "bg-gray-700 text-white dark:bg-gray-200 dark:text-gray-900"
                  : levelConfig[l as LogLevel].badge
                : "border border-gray-200 bg-gray-50 text-gray-400 hover:bg-gray-100 dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-gray-500 dark:hover:bg-white/[0.06]"
            }`}
          >
            {l === "all" ? "All Levels" : levelConfig[l as LogLevel].label}
          </button>
        ))}
      </div>

      {/* Log table */}
      {pagedLogs.length === 0 ? (
        <EmptyState message="No logs match your filters." />
      ) : (
        <>
          <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-white/[0.06]">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 dark:border-white/[0.06] dark:bg-white/[0.02]">
                  {["Level", "Category", "Message", "Actor / IP", "Timestamp"].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2.5 text-theme-xs font-semibold whitespace-nowrap text-gray-500 dark:text-gray-400"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {pagedLogs.map((log) => {
                  const lc = levelConfig[log.level];
                  const cc = categoryConfig[log.category];
                  return (
                    <tr key={log.id} className="transition-colors hover:bg-gray-50/60 dark:hover:bg-white/[0.02]">
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-theme-xs font-medium ${lc.badge}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${lc.dot}`} />
                          {lc.label}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 text-theme-xs text-gray-500 dark:text-gray-400">
                          {cc.icon}
                          {cc.label}
                        </span>
                      </td>
                      <td
                        className="max-w-[200px] truncate px-3 py-2.5 text-theme-sm text-gray-700 dark:text-gray-300"
                        title={log.message}
                      >
                        {log.message}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        {log.actor ? (
                          <div>
                            <p className="text-theme-xs font-medium text-gray-700 dark:text-gray-300">
                              {log.actor}
                            </p>
                            {log.ip && (
                              <p className="font-mono text-theme-xs text-gray-400 dark:text-gray-500">
                                {log.ip}
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-theme-xs text-gray-400 dark:text-gray-500">—</span>
                        )}
                      </td>
                      <td className="px-3 py-2.5 font-mono text-theme-xs whitespace-nowrap text-gray-400 dark:text-gray-500">
                        {log.timestamp}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}

      <button
        onClick={() => navigate("/activities")}
        className="mt-4 w-full py-2 text-center text-theme-sm font-medium text-primary transition-colors hover:underline dark:text-secondary"
      >
        View full audit log →
      </button>
    </>
  );
}
