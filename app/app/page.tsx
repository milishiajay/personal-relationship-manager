
import { Suspense } from 'react'
import DashboardStats from '@/components/dashboard-stats'
import RecentActivity from '@/components/recent-activity'
import UpcomingReminders from '@/components/upcoming-reminders'
import QuickActions from '@/components/quick-actions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Calendar, Clock, Bell } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to Your Relationship Manager
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Keep track of your personal connections, interactions, and important moments
        </p>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Dashboard Stats */}
      <Suspense fallback={<div>Loading stats...</div>}>
        <DashboardStats />
      </Suspense>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading activity...</div>}>
              <RecentActivity />
            </Suspense>
          </CardContent>
        </Card>

        {/* Upcoming Reminders */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-green-500" />
              <span>Upcoming Reminders</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading reminders...</div>}>
              <UpcomingReminders />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}