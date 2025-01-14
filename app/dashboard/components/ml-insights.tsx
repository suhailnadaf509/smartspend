import { Brain, TrendingUp, Users } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

const insights = [
  {
    icon: TrendingUp,
    title: 'Spending Pattern Detected',
    description: 'Your food expenses are 15% higher this month',
  },
  {
    icon: Users,
    title: 'Group Suggestion',
    description: 'Create a group for your weekly lunch buddies',
  },
  {
    icon: Brain,
    title: 'Smart Split Suggestion',
    description: 'Based on past patterns, split grocery bills 60/40',
  },
]

export function MLInsights() {
  return (
    <div className="space-y-4">
      {insights.map((insight, index) => (
        <Card key={index}>
          <CardContent className="flex items-center space-x-4 p-4">
            <div className="rounded-full bg-primary/10 p-2">
              <insight.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{insight.title}</p>
              <p className="text-sm text-muted-foreground">
                {insight.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

