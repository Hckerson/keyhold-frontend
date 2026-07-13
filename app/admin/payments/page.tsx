import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface RevenueMetric {
  label: string
  value: string
  change: string
  isPositive: boolean
}

interface MonthlyRevenue {
  month: string
  commission: number
  fees: number
}

const metrics: RevenueMetric[] = [
  { label: 'Total Revenue (YTD)', value: '$1.24M', change: '+18% vs last year', isPositive: true },
  { label: 'Monthly Avg', value: '$176K', change: '+5% trend', isPositive: true },
  { label: 'Commission Revenue', value: '$950K', change: '76% of total', isPositive: true },
  { label: 'Outstanding Payments', value: '$42K', change: '3 pending transactions', isPositive: false },
]

const monthlyData: MonthlyRevenue[] = [
  { month: 'Jan', commission: 145000, fees: 28000 },
  { month: 'Feb', commission: 152000, fees: 31000 },
  { month: 'Mar', commission: 138000, fees: 26000 },
  { month: 'Apr', commission: 168000, fees: 35000 },
  { month: 'May', commission: 175000, fees: 38000 },
  { month: 'Jun', commission: 192000, fees: 42000 },
  { month: 'Jul', commission: 180000, fees: 39000 },
]

const maxRevenue = Math.max(...monthlyData.map((d) => d.commission + d.fees))

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h3 font-display font-light text-text">Payment & Revenue</h1>
        <p className="text-text-secondary mt-2">Track commissions, fees, and platform revenue</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-text-secondary">{metric.label}</p>
                <p className="text-h4 font-light text-text">{metric.value}</p>
                <p className={`text-xs ${metric.isPositive ? 'text-success' : 'text-warning'}`}>
                  {metric.change}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Commission vs platform fees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data) => {
                const total = data.commission + data.fees
                return (
                  <div key={data.month}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-text">{data.month}</span>
                      <span className="text-sm text-text-secondary">${(total / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex gap-0.5 h-2 bg-primary-dark rounded-full overflow-hidden">
                      <div
                        className="bg-accent"
                        style={{ width: `${(data.commission / maxRevenue) * 100}%` }}
                        title="Commission"
                      />
                      <div
                        className="bg-info"
                        style={{ width: `${(data.fees / maxRevenue) * 100}%` }}
                        title="Platform Fees"
                      />
                    </div>
                    <div className="flex gap-4 mt-1 text-xs text-text-secondary">
                      <span>Commission: ${(data.commission / 1000).toFixed(0)}K</span>
                      <span>Fees: ${(data.fees / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-text-secondary">Commission (2.5%)</span>
                  <span className="text-sm font-medium text-text">76%</span>
                </div>
                <div className="w-full h-2 bg-primary-dark rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-accent rounded-full" />
                </div>
                <p className="text-xs text-text-secondary mt-1">$950K YTD</p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-text-secondary">Platform Fees</span>
                  <span className="text-sm font-medium text-text">24%</span>
                </div>
                <div className="w-full h-2 bg-primary-dark rounded-full overflow-hidden">
                  <div className="h-full w-1/4 bg-info rounded-full" />
                </div>
                <p className="text-xs text-text-secondary mt-1">$290K YTD</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Processing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-primary-dark rounded">
                <div>
                  <p className="text-sm font-medium text-text">Pending Payouts</p>
                  <p className="text-xs text-text-secondary mt-1">Agent commission payments</p>
                </div>
                <p className="text-h5 font-light text-warning">$42K</p>
              </div>

              <div className="flex items-center justify-between p-3 bg-primary-dark rounded">
                <div>
                  <p className="text-sm font-medium text-text">Processing Time</p>
                  <p className="text-xs text-text-secondary mt-1">Average payment time</p>
                </div>
                <p className="text-sm font-medium text-text">3-5 days</p>
              </div>

              <Button variant="secondary" className="w-full text-sm">
                Process Payouts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
