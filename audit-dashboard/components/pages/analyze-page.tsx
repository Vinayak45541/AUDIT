"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, AlertTriangle } from "lucide-react"
import type { AuditReport } from "@/lib/types"
import { fetchAuditReports, analyzeAuditReport } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export function AnalyzePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [reports, setReports] = useState<AuditReport[]>([])
  const [selectedReportId, setSelectedReportId] = useState<string>("")
  const [selectedReport, setSelectedReport] = useState<AuditReport | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getReports = async () => {
      try {
        setIsLoading(true)
        const data = await fetchAuditReports()
        setReports(data)
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
    if (selectedReportId) {
      const report = reports.find((r) => r._id === selectedReportId)
      setSelectedReport(report || null)
    } else {
      setSelectedReport(null)
    }
  }, [selectedReportId, reports])

  const handleAnalyze = async () => {
    if (!selectedReportId) {
      toast({
        title: "Selection Required",
        description: "Please select an audit report to analyze",
        variant: "destructive",
      })
      return
    }

    try {
      setIsAnalyzing(true)
      const updatedReport = await analyzeAuditReport(selectedReportId)

      // Update the report in the local state
      setReports((prevReports) =>
        prevReports.map((report) => (report._id === updatedReport._id ? updatedReport : report)),
      )

      setSelectedReport(updatedReport)

      toast({
        title: "Analysis Complete",
        description: `Risk level determined: ${updatedReport.riskLevel}`,
      })

      // Refresh the page to show updated data
      router.refresh()
    } catch (error) {
      console.error("Error analyzing report:", error)
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the audit report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analyze Audit Risk</h1>
        <p className="text-muted-foreground mt-2">Select an audit report to analyze its risk level using AI.</p>
      </div>

      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          {error}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Risk Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="report-select" className="text-sm font-medium">
                Select Audit Report
              </label>
              <Select
                disabled={isLoading || reports.length === 0}
                value={selectedReportId}
                onValueChange={setSelectedReportId}
              >
                <SelectTrigger id="report-select">
                  <SelectValue placeholder="Select a report" />
                </SelectTrigger>
                <SelectContent>
                  {reports.map((report) => (
                    <SelectItem key={report._id} value={report._id}>
                      {report.companyName} ({report.year})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedReport && (
              <div className="space-y-4 border rounded-md p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Company</p>
                    <p>{selectedReport.companyName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Year</p>
                    <p>{selectedReport.year}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Auditor</p>
                    <p>{selectedReport.auditorName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Risk Level</p>
                    {selectedReport.riskLevel ? (
                      <Badge className={`${getRiskBadgeColor(selectedReport.riskLevel)}`}>
                        {selectedReport.riskLevel}
                      </Badge>
                    ) : (
                      <Badge variant="outline">Not Analyzed</Badge>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Report Summary</p>
                  <p className="text-sm mt-1">{selectedReport.reportSummary}</p>
                </div>
              </div>
            )}

            <Button onClick={handleAnalyze} disabled={!selectedReportId || isAnalyzing} className="w-full">
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Risk Level"
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
