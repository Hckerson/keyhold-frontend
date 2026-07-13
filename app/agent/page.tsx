import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface PipelineStage {
  name: string
  count: number
  value: number
}

const pipelineStages: PipelineStage[] = [
  { name: 'Leads', count: 12, value: 0 },
  { name: 'Showing', count: 8, value: 18400000 },
  { name: 'Under Offer', count: 3, value: 9850000 },
  { name: 'Closing', count: 2, value: 6200000 },
]

const recentActivity = [
  {
    id: 1,
    type: 'offer',
    title: 'Offer Received',
    description: '$3.1M offer on 456 Oak Avenue',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'showing',
    title: 'Property Showed',
    description: '789 Sunset Blvd shown to client',
    time: '5 hours ago',
  },
  {
    id: 3,
    type: 'listing',
    title: 'New Listing Posted',
    description: '234 Oak Street listed at $4.5M',
    time: '1 day ago',
  },
]

export default function AgentDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h3 font-display font-light text-text mb-2">Welcome back, Sarah</h1>
        <p className="text-text-secondary">Your sales pipeline and performance overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/agent/pipeline" className="group">
          <Card className="hover:border-accent/50 transition-colors h-full">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-text-secondary">Total Pipeline</p>
                <p className="text-h4 font-light text-text">$34.45M</p>
                <p className="text-xs text-accent">25 active deals</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/agent/listings" className="group">
          <Card className="hover:border-accent/50 transition-colors h-full">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-text-secondary">Active Listings</p>
                <p className="text-h4 font-light text-text">14</p>
                <p className="text-xs text-success">8 new this month</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/agent/leads" className="group">
          <Card className="hover:border-accent/50 transition-colors h-full">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-text-secondary">Active Leads</p>
                <p className="text-h4 font-light text-text">12</p>
                <p className="text-xs text-warning">3 hot prospects</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/agent/analytics" className="group">
          <Card className="hover:border-accent/50 transition-colors h-full">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-text-secondary">Closed This Year</p>
                <p className="text-h4 font-light text-text">$42.3M</p>
                <p className="text-xs text-success">+12% vs last year</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Pipeline</CardTitle>
              <CardDescription>Current deals by stage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pipelineStages.map((stage) => (
                  <div key={stage.name}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-text">{stage.name}</h4>
                      <span className="text-sm text-text-secondary">{stage.count} deals</span>
                    </div>
                    <div className="w-full h-2 bg-primary-dark rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-accent-dark"
                        style={{ width: `${Math.min((stage.count / 12) * 100, 100)}%` }}
                      />
                    </div>
                    {stage.value > 0 && (
                      <p className="text-xs text-text-secondary mt-1">
                        ${(stage.value / 1000000).toFixed(2)}M in pipeline
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates on your deals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-4 pb-4 border-b border-border last:border-b-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-text">{activity.title}</h4>
                      <p className="text-sm text-text-secondary mt-1">{activity.description}</p>
                      <p className="text-xs text-text-secondary mt-2">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-h5">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/agent/listings" className="block">
                <Button variant="secondary" className="w-full text-sm">
                  List Property
                </Button>
              </Link>
              <Link href="/agent/leads" className="block">
                <Button variant="secondary" className="w-full text-sm">
                  Add Lead
                </Button>
              </Link>
              <Link href="/agent/calendar" className="block">
                <Button variant="secondary" className="w-full text-sm">
                  Schedule Showing
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-h5">This Month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-text-secondary">Showings</p>
                <p className="text-h6 font-light text-accent mt-1">24</p>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-text-secondary">Offers Received</p>
                <p className="text-h6 font-light text-accent mt-1">8</p>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-text-secondary">Closed Deals</p>
                <p className="text-h6 font-light text-success mt-1">2</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
