// components/receiver/RecentUploads.tsx
import { useState } from "react";
import DashboardCard from "../dashboard/DashboardCard";
import StatusBadge from "../dashboard/StatusBadge";
import Pagination from "../common/Pagination";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";

type DocStatus = "On-Queue" | "Received" | "Rejected";

interface UploadedDocument {
  id: number;
  code: string;
  subject: string;
  status: DocStatus;
  dateUploaded: string;
}

const recentUploads: UploadedDocument[] = [
  { id: 1, code: "UP-2024-020", subject: "Road Request Letter", status: "On-Queue", dateUploaded: "2024-06-20" },
  { id: 2, code: "UP-2024-019", subject: "Project Endorsement Letter", status: "Received", dateUploaded: "2024-06-18" },
  { id: 3, code: "UP-2024-018", subject: "Budget Allocation Request", status: "Received", dateUploaded: "2024-06-17" },
  { id: 4, code: "UP-2024-017", subject: "Staff Deployment Memo", status: "Received", dateUploaded: "2024-06-15" },
  { id: 5, code: "UP-2024-016", subject: "Infrastructure Audit Report", status: "On-Queue", dateUploaded: "2024-06-14" },
  { id: 6, code: "UP-2024-015", subject: "Procurement Request Form", status: "Received", dateUploaded: "2024-06-12" },
  { id: 7, code: "UP-2024-014", subject: "Health Permit Application", status: "Rejected", dateUploaded: "2024-06-10" },
  { id: 8, code: "UP-2024-013", subject: "Zoning Compliance Report", status: "Rejected", dateUploaded: "2024-06-08" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

const UPLOADS_PER_PAGE = 5;

export default function RecentUploads({ fill = false }: { fill?: boolean }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(recentUploads.length / UPLOADS_PER_PAGE));
  const pageStart = (currentPage - 1) * UPLOADS_PER_PAGE;
  const pagedUploads = recentUploads.slice(pageStart, pageStart + UPLOADS_PER_PAGE);

  return (
    <DashboardCard
      title="Recent Uploads"
      desc="Your latest submitted documents"
      className={fill ? "flex min-h-0 flex-1 flex-col" : undefined}
      bodyClassName={fill ? "flex-1 min-h-0 overflow-y-auto no-scrollbar" : undefined}
      headerRight={
        <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-600 shadow-theme-xs transition hover:bg-gray-50 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
          See all
        </button>
      }
    >
      <div className="overflow-hidden">
        <Table>
          <TableHeader className="border-y border-gray-100 dark:border-gray-800">
            <TableRow>
              {["Document", "Code", "Status", "Date Uploaded"].map((h) => (
                <TableCell
                  key={h}
                  isHeader
                  className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="dark:divide-gray-800">
            {pagedUploads.map((doc) => (
              <TableRow
                key={doc.id}
                className="transition-colors hover:bg-gray-50/60 dark:hover:bg-white/[0.02]"
              >
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary dark:bg-secondary/10 dark:text-secondary">
                      <DocumentIcon className="h-4 w-4" />
                    </div>
                    <span
                      className="max-w-[180px] truncate text-theme-sm font-medium text-gray-800 dark:text-white/90"
                      title={doc.subject}
                    >
                      {doc.subject}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-3">
                  <span className="rounded bg-primary/5 px-2 py-0.5 font-mono text-theme-xs font-semibold text-primary dark:bg-secondary/10 dark:text-secondary">
                    {doc.code}
                  </span>
                </TableCell>

                <TableCell className="py-3">
                  <StatusBadge status={doc.status} />
                </TableCell>

                <TableCell className="py-3 text-theme-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  {formatDate(doc.dateUploaded)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </DashboardCard>
  );
}
