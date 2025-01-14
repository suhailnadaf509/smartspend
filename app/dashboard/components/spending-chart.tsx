'use client'

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const data = [
  { month: 'Jan', personal: 400, group: 240 },
  { month: 'Feb', personal: 300, group: 139 },
  { month: 'Mar', personal: 200, group: 980 },
  { month: 'Apr', personal: 278, group: 390 },
  { month: 'May', personal: 189, group: 480 },
  { month: 'Jun', personal: 239, group: 380 },
  { month: 'Jul', personal: 349, group: 430 },
]

export function SpendingChart() {
  return (
    <ChartContainer
      config={{
        personal: {
          label: "Personal Expenses",
          color: "hsl(var(--chart-1))",
        },
        group: {
          label: "Group Expenses",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="personal"
            stroke="var(--color-personal)"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="group"
            stroke="var(--color-group)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

