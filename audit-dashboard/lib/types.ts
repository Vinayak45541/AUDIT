export interface AuditReport {
  _id: string
  companyName: string
  year: number
  auditorName: string
  reportSummary: string
  riskLevel?: string
  createdAt?: string
  updatedAt?: string
}
