"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createAuditReport } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export function UploadPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    year: new Date().getFullYear(),
    auditorName: "",
    reportSummary: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? Number.parseInt(value) || "" : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.companyName || !formData.year || !formData.auditorName || !formData.reportSummary) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)
      await createAuditReport(formData)
      toast({
        title: "Success",
        description: "Audit report created successfully",
      })
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Error creating audit report:", error)
      toast({
        title: "Error",
        description: "Failed to create audit report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload Audit Data</h1>
        <p className="text-muted-foreground mt-2">Enter audit information to add a new report to the system.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Audit Report Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                placeholder="Enter audit year"
                min={2000}
                max={new Date().getFullYear()}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="auditorName">Auditor Name</Label>
              <Input
                id="auditorName"
                name="auditorName"
                value={formData.auditorName}
                onChange={handleChange}
                placeholder="Enter auditor name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reportSummary">Report Summary</Label>
              <Textarea
                id="reportSummary"
                name="reportSummary"
                value={formData.reportSummary}
                onChange={handleChange}
                placeholder="Enter a detailed summary of the audit report"
                rows={5}
              />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Audit Report"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
