'use client'

import { Bell, CreditCard, Group, LineChart, Plus, Search, Share2, Wallet } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { ActivityFeed } from './components/activity-feed'
import { GroupCards } from './components/group-cards'
import { MLInsights } from './components/ml-insights'
import { NotificationCenter } from './components/notification-center'
import { SpendingChart } from './components/spending-chart'

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Wallet className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">
                SplitSmart
              </span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/dashboard" className="transition-colors hover:text-foreground/80">
                Dashboard
              </Link>
              <Link href="/groups" className="transition-colors hover:text-foreground/80">
                Groups
              </Link>
              <Link href="/activity" className="transition-colors hover:text-foreground/80">
                Activity
              </Link>
              <Link href="/settings" className="transition-colors hover:text-foreground/80">
                Settings
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search expenses..." className="pl-8" />
              </div>
            </div>
            <NotificationCenter />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <img
                    src="/placeholder.svg?height=32&width=32"
                    alt="Avatar"
                    className="rounded-full"
                    height={32}
                    width={32}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="grid gap-6">
            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Owed to You</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$345.00</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">You Owe</CardTitle>
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$123.00</div>
                  <p className="text-xs text-muted-foreground">
                    -4% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Groups</CardTitle>
                  <Group className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">
                    +2 new this month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-4">
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Expense
              </Button>
              <Button variant="outline">
                <Group className="mr-2 h-4 w-4" /> Create Group
              </Button>
              <Button variant="secondary">
                <CreditCard className="mr-2 h-4 w-4" /> Settle Up
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              {/* Activity Feed */}
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your latest transactions and updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ActivityFeed />
                </CardContent>
              </Card>

              {/* ML Insights */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Smart Insights</CardTitle>
                  <CardDescription>
                    ML-powered spending analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MLInsights />
                </CardContent>
              </Card>
            </div>

            {/* Spending Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Spending Overview</CardTitle>
                <CardDescription>
                  Your spending patterns across groups
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <SpendingChart />
              </CardContent>
            </Card>

            {/* Group Overview */}
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Your Groups</h2>
              <Separator className="my-4" />
              <GroupCards />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

