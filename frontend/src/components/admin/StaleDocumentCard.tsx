// components/admin/StaleDocumentCard.tsx
import { useMemo } from "react";
import { getStaleRows } from "./staleDocumentsData";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function TierText({ tier }: { tier: string }) {
  const colorClass = tier === "Overdue" ? "text-danger" : "text-warning";
  return <span className={`text-theme-sm font-semibold ${colorClass}`}>{tier}</span>;
}

// Full stale-documents table — shown on its own report page, not the dashboard.
export default function StaleDocumentsCard() {
  const rows = useMemo(() => getStaleRows(), []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50 dark:bg-white/[0.02]">
          <tr className="border-b border-gray-100 dark:border-white/[0.05]">
            <th className="px-3 py-2 text-theme-xs font-medium tracking-wide text-gray-400 uppercase dark:text-gray-500">
              Tracking No.
            </th>
            <th className="px-3 py-2 text-theme-xs font-medium tracking-wide text-gray-400 uppercase dark:text-gray-500">
              Current Status
            </th>
            <th className="px-3 py-2 text-theme-xs font-medium tracking-wide text-gray-400 uppercase dark:text-gray-500">
              Last Status Change
            </th>
            <th className="px-3 py-2 text-right text-theme-xs font-medium tracking-wide text-gray-400 uppercase dark:text-gray-500">
              Days Unchanged
            </th>
            <th className="px-3 py-2 text-right text-theme-xs font-medium tracking-wide text-gray-400 uppercase dark:text-gray-500">
              Tier
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
          {rows.map((doc) => (
            <tr key={doc.trackingNo}>
              <td className="px-3 py-3 text-theme-sm font-medium text-gray-800 dark:text-white/90">
                {doc.trackingNo}
                <p className="mt-0.5 max-w-[220px] truncate text-theme-xs font-normal text-gray-400 dark:text-gray-500">
                  {doc.subject}
                </p>
              </td>
              <td className="px-3 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                {doc.status}
              </td>
              <td className="px-3 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                {formatDate(doc.lastStatusChange)}
              </td>
              <td className="px-3 py-3 text-right text-theme-sm font-semibold text-gray-800 dark:text-white/90">
                {doc.days}
              </td>
              <td className="px-3 py-3 text-right">
                <TierText tier={doc.tier} />
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={5} className="px-3 py-6 text-center text-theme-sm text-gray-400">
                No stale documents to show.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
