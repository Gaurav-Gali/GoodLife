"use client"

import { useMemo } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { mockIssues } from "@/data/mockIssues"

function generateChartData(issues: typeof mockIssues) {
  const today = new Date()
  const data = []

  for (let i = -10; i <= 0; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    const dateStr = date.toISOString().split("T")[0]

    const listedCount = issues.filter(
      (issue) => issue.date === dateStr && issue.status === "listed"
    ).length
    const progressCount = issues.filter(
      (issue) => issue.date === dateStr && issue.status === "progress"
    ).length
    const resolvedCount = issues.filter(
      (issue) => issue.date === dateStr && issue.status === "resolved"
    ).length

    const label = `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}`

    data.push({
      day: label,
      listed: listedCount,
      progress: progressCount,
      resolved: resolvedCount,
    })
  }

  return data
}

export default function WeeklyProgressChart({ issues = mockIssues }: { issues?: typeof mockIssues }) {
  // Recalculate chart data whenever issues change
  const chartData = useMemo(() => generateChartData(issues), [issues])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Issue Progress (Last 10 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="listed" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="progress" stroke="#82ca9d" strokeWidth={2} />
              <Line type="monotone" dataKey="resolved" stroke="#ffc658" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
