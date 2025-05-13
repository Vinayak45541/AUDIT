"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import type { AuditReport } from "@/lib/types"
import { fetchAuditReports } from "@/lib/api"

export function DashboardPage() {
  const [reports, setReports] = useState<AuditReport[]>([])
  const [filteredReports, setFilteredReports] = useState<AuditReport[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getReports = async () => {
      try {
        setIsLoading(true)
        const data = await fetchAuditReports()
        setReports(data)
        setFilteredReports(data)
        setError(null)
      } catch (err) {
        setError("Failed to fetch audit reports. Please try again later.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    getReports()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredReports(reports)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = reports.filter(
      (report) =>
        report.companyName.toLowerCase().includes(query) ||
        report.year.toString().includes(query) ||
        report.auditorName.toLowerCase().includes(query),
    )
    setFilteredReports(filtered)
  }, [searchQuery, reports])

  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Audit Reports</h1>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by company or year..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Auditor Name</TableHead>
                <TableHead>Risk Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6">
                    {reports.length === 0
                      ? "No audit reports found. Add some reports to get started."
                      : "No matching reports found."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredReports.map((report) => (
                  <TableRow key={report._id}>
                    <TableCell className="font-medium">{report.companyName}</TableCell>
                    <TableCell>{report.year}</TableCell>
                    <TableCell>{report.auditorName}</TableCell>
                    <TableCell>
                      {report.riskLevel ? (
                        <Badge className={`${getRiskBadgeColor(report.riskLevel)}`}>{report.riskLevel}</Badge>
                      ) : (
                        <Badge variant="outline">Not Analyzed</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
