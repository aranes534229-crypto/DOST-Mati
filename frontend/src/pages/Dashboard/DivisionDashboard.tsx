// pages/Dashboard/DivisionDashboard.tsx
import { useMemo, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import DashboardCard from "../../components/dashboard/DashboardCard";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import IncomingStatusMetrics from "../../components/division/IncommingStatusMetrics";
import {
  CURRENT_DIVISION,
  divisionMockRecords,
} from "../../components/division/divisionMockData";
import DivisionIncomingDocumentsTable, {
  type IncomingDocument,
} from "../../components/tables/Division/AssigendDocumentsTable";
import type { StatusType } from "../../components/ui/modal/document/StatusUpdateModal";
import { getRoleDashboardConfig } from "../../config/roleDashboardConfig";
import { useUser } from "../../context/currentUser/use-user";

export default function DivisionDashboard() {
  const { currentUser } = useUser();
  const config = getRoleDashboardConfig(currentUser?.role_id);

  const [allRecords, setAllRecords] = useState<IncomingDocument[]>(divisionMockRecords);
  const [statusFilter, setStatusFilter] = useState<StatusType | "All">("All");

  const divisionRecords = useMemo(
    () => allRecords.filter((r) => r.routedDivisions.includes(CURRENT_DIVISION)),
    [allRecords],
  );

  const metrics = useMemo(() => {
    const completed = divisionRecords.filter((r) => r.status === "Completed").length;
    const onGoing = divisionRecords.filter((r) => r.status === "On-Going").length;
    const pending = divisionRecords.filter((r) => r.status === "Pending").length;
    return { total: divisionRecords.length, completed, onGoing, pending };
  }, [divisionRecords]);

  function handleRecordsChange(updated: IncomingDocument[]) {
    setAllRecords((prev) => prev.map((r) => updated.find((u) => u.id === r.id) ?? r));
  }

  return (
    <>
      <PageMeta title={config.title} description={config.description} />

      <div className="flex flex-col gap-5 rounded-3xl bg-gray-100/70 p-3 dark:bg-white/[0.02] sm:p-4">
        <DashboardHeader />

        <IncomingStatusMetrics
          total={metrics.total}
          completed={metrics.completed}
          onGoing={metrics.onGoing}
          pending={metrics.pending}
          activeStatus={statusFilter}
          onSelect={setStatusFilter}
        />

        <DashboardCard title={`Assigned Documents — ${CURRENT_DIVISION}`}>
          <DivisionIncomingDocumentsTable
            division={CURRENT_DIVISION}
            records={divisionRecords}
            onRecordsChange={handleRecordsChange}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />
        </DashboardCard>
      </div>
    </>
  );
}
