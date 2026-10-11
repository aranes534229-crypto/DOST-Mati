// components/division/divisionMockData.ts
// Shared mock data for the Division role. Used by both the Division dashboard
// and the Assigned Documents page so the numbers stay in sync.
import type { IncomingDocument } from "../tables/Division/AssigendDocumentsTable";

// TODO: replace with the logged-in user's division name once the division
// lookup is wired to the session.
export const CURRENT_DIVISION = "Maintenance Division";

export const divisionMockRecords: IncomingDocument[] = [
  {
    id: 1,
    code: "INC-2024-001",
    subject: "Budget Proposal FY2024",
    from: "Finance Department",
    to: "Executive Office",
    routedDivisions: ["Finance Division", "Office of the Provincial Engineer"],
    status: "Completed",
    fileUrl: "/files/budget-proposal-2024.pdf",
    dateReceived: "2024-01-10",
  },
  {
    id: 2,
    code: "INC-2024-002",
    subject: "Infrastructure Maintenance Request",
    from: "Facilities Management",
    to: "Operations Division",
    routedDivisions: ["Maintenance Division"],
    status: "On-Going",
    fileUrl: "/files/maintenance-request.pdf",
    dateReceived: "2024-01-14",
  },
  {
    id: 3,
    code: "INC-2024-003",
    subject: "Staff Regularization Endorsement",
    from: "HR Department",
    to: "Director's Office",
    routedDivisions: ["Human Resources Division", "Legal Division"],
    status: "Pending",
    fileUrl: "/files/regularization-endorsement.pdf",
    dateReceived: "2024-01-18",
  },
  {
    id: 4,
    code: "INC-2024-004",
    subject: "Road Widening Culvert Repair",
    from: "Administrative Office",
    to: "Maintenance Division",
    routedDivisions: ["Maintenance Division"],
    status: "Pending",
    fileUrl: "/files/culvert-repair.pdf",
    dateReceived: "2024-01-22",
  },
  {
    id: 5,
    code: "INC-2024-005",
    subject: "Streetlight Replacement Backlog",
    from: "Barangay Office",
    to: "Maintenance Division",
    routedDivisions: ["Maintenance Division"],
    status: "Completed",
    fileUrl: "/files/streetlight-backlog.pdf",
    dateReceived: "2024-01-25",
  },
  {
    id: 6,
    code: "INC-2024-006",
    subject: "Legal Compliance Audit Report",
    from: "Legal Affairs",
    to: "Compliance Office",
    routedDivisions: ["Legal Division", "Administrative Division"],
    status: "On-Going",
    fileUrl: "/files/audit-report.pdf",
    dateReceived: "2024-02-01",
  },
];
