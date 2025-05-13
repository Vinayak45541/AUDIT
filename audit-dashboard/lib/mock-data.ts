import type { AuditReport } from "./types"

// Mock data for development
export const mockAuditReports: AuditReport[] = [
  {
    _id: "mock-1",
    companyName: "Acme Corporation",
    year: 2023,
    auditorName: "John Smith",
    reportSummary:
      "Annual financial audit for Acme Corporation. The company showed strong financial controls with minor issues in accounts receivable reconciliation.",
    riskLevel: "Low",
    createdAt: "2023-10-15T10:30:00Z",
    updatedAt: "2023-10-15T10:30:00Z",
  },
  {
    _id: "mock-2",
    companyName: "TechGiant Inc.",
    year: 2023,
    auditorName: "Sarah Johnson",
    reportSummary:
      "Comprehensive audit of TechGiant's financial statements. Several discrepancies were found in revenue recognition practices and expense categorization.",
    riskLevel: "High",
    createdAt: "2023-09-22T14:15:00Z",
    updatedAt: "2023-09-22T14:15:00Z",
  },
  {
    _id: "mock-3",
    companyName: "Global Logistics Ltd.",
    year: 2022,
    auditorName: "Michael Chen",
    reportSummary:
      "Annual audit focusing on inventory management and supply chain operations. Some inconsistencies in inventory valuation were identified.",
    riskLevel: "Medium",
    createdAt: "2022-12-05T09:45:00Z",
    updatedAt: "2022-12-05T09:45:00Z",
  },
  {
    _id: "mock-4",
    companyName: "HealthCare Partners",
    year: 2023,
    auditorName: "Emily Rodriguez",
    reportSummary:
      "Audit of healthcare billing practices and compliance with regulatory requirements. Generally compliant with minor documentation issues.",
    createdAt: "2023-08-18T11:20:00Z",
    updatedAt: "2023-08-18T11:20:00Z",
  },
  {
    _id: "mock-5",
    companyName: "EcoEnergy Solutions",
    year: 2022,
    auditorName: "David Wilson",
    reportSummary:
      "Financial and operational audit of renewable energy projects. Strong financial controls but some concerns about project cost overruns.",
    riskLevel: "Medium",
    createdAt: "2022-11-30T16:10:00Z",
    updatedAt: "2022-11-30T16:10:00Z",
  },
  {
    _id: "mock-6",
    companyName: "Retail Innovations",
    year: 2023,
    auditorName: "Jessica Lee",
    reportSummary:
      "Comprehensive audit of retail operations including inventory management and cash handling procedures. Several significant control weaknesses identified.",
    riskLevel: "High",
    createdAt: "2023-07-12T13:40:00Z",
    updatedAt: "2023-07-12T13:40:00Z",
  },
  {
    _id: "mock-7",
    companyName: "Construction Experts",
    year: 2022,
    auditorName: "Robert Taylor",
    reportSummary:
      "Audit of project accounting and contract management. Well-documented processes with minor issues in subcontractor payment verification.",
    riskLevel: "Low",
    createdAt: "2022-10-08T15:25:00Z",
    updatedAt: "2022-10-08T15:25:00Z",
  },
]
