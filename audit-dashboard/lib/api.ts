import type { AuditReport } from "./types"
import { mockAuditReports } from "./mock-data"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Fetch all audit reports
export const fetchAuditReports = async (): Promise<AuditReport[]> => {
  // Simulate API call
  await delay(800)
  return [...mockAuditReports]
}

// Fetch a single audit report by ID
export const fetchAuditReportById = async (id: string): Promise<AuditReport> => {
  // Simulate API call
  await delay(500)
  const report = mockAuditReports.find((r) => r._id === id)

  if (!report) {
    throw new Error("Audit report not found")
  }

  return { ...report }
}

// Create a new audit report
export const createAuditReport = async (data: Omit<AuditReport, "_id">): Promise<AuditReport> => {
  // Simulate API call
  await delay(1000)

  const newReport: AuditReport = {
    _id: `mock-${Date.now()}`,
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  // Add to mock data
  mockAuditReports.unshift(newReport)

  return newReport
}

// Update an existing audit report
export const updateAuditReport = async (id: string, data: Partial<AuditReport>): Promise<AuditReport> => {
  // Simulate API call
  await delay(800)

  const index = mockAuditReports.findIndex((r) => r._id === id)

  if (index === -1) {
    throw new Error("Audit report not found")
  }

  const updatedReport = {
    ...mockAuditReports[index],
    ...data,
    updatedAt: new Date().toISOString(),
  }

  mockAuditReports[index] = updatedReport

  return { ...updatedReport }
}

// Analyze an audit report
export const analyzeAuditReport = async (id: string): Promise<AuditReport> => {
  // Simulate API call with longer delay for "AI processing"
  await delay(2000)

  const index = mockAuditReports.findIndex((r) => r._id === id)

  if (index === -1) {
    throw new Error("Audit report not found")
  }

  // Simulate risk analysis
  const riskLevels = ["Low", "Medium", "High"]
  const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)]

  const updatedReport = {
    ...mockAuditReports[index],
    riskLevel,
    updatedAt: new Date().toISOString(),
  }

  mockAuditReports[index] = updatedReport

  return { ...updatedReport }
}
