// components/admin/StaleDocumentsSummary.tsx
import { useNavigate } from "react-router";
import { AlertIcon, ArrowRightIcon } from "../../icons";
import { getStaleCounts } from "./staleDocumentsData";

export default function StaleDocumentsSummary() {
  const navigate = useNavigate();
  // Derive counts from the shared data module instead of hard-coding them, so
  // the summary can never drift from the Stale Documents report page.
  const counts = getStaleCounts();

  return (
    <button
      onClick={() => navigate("/admin/stale-documents")}
      className="group flex w-full flex-col items-start gap-4 rounded-3xl bg-white p-7 text-left shadow-theme-md ring-1 ring-gray-100 transition duration-200 hover:-translate-y-0.5 hover:shadow-theme-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger/30 dark:bg-white/[0.03] dark:shadow-none dark:ring-white/[0.06]"
    >
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-warning/10 text-warning">
          <AlertIcon className="size-5" />
        </span>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
            Stale Documents
          </h3>
          <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
            No status change for 11+ months
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-between">
        <span className="text-theme-sm font-semibold text-danger">
          {counts.overdue} Overdue
        </span>
        <span className="text-theme-sm font-semibold text-warning">
          {counts.approaching} Approaching
        </span>
      </div>

      <span className="inline-flex items-center gap-1 text-theme-sm font-medium text-primary dark:text-secondary">
        View Details
        <ArrowRightIcon className="size-4 transition group-hover:translate-x-0.5" />
      </span>
    </button>
  );
}
