import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface PerformanceMetric {
  label: string
  value: string | number
  change: string
  isPositive: boolean
}

interface MonthlyData {
  month: string
  sales: number
  volume: number
}

const metrics: PerformanceMetric[] = [
  { label: 'Total Sales This Year', value: '$42.3M', change: '+12% vs 2023', isPositive: true },
  { label: 'Average Sale Price', value: '$2.85M', change: '+5% avg market', isPositive: true },
  { label: 'Days to Close', value: 48, change: '-8 days vs market', isPositive: true },
  { label: 'Client Satisfaction', value: '4.8/5', change: '18% above average', isPositive: true },
]

const monthlyData: MonthlyData[] = [
  { month: 'Jan', sales: 3, volume: 8.5 },
  { month: 'Feb', sales: 4, volume: 11.2 },
  { month: 'Mar', sales: 3, volume: 8.1 },
  { month: 'Apr', sales: 5, volume: 14.3 },
  { month: 'May', sales: 4, volume: 11.8 },
  { month: 'Jun', sales: 6, volume: 17.4 },
  { month: 'Jul', sales: 2, volume: 5.9 },
]

const maxVolume = Math.max(...monthlyData.map((d) => d.volume))

export default function AgentAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h3 font-display font-light text-text">Performance Analytics</h1>
        <p className="text-text-secondary mt-2">Track your sales performance and market insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-text-secondary">{metric.label}</p>
                <p className="text-h4 font-light text-text">{metric.value}</p>
                <p className={`text-xs ${metric.isPositive ? 'text-success' : 'text-error'}`}>
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
            <CardTitle>Sales by Month</CardTitle>
            <CardDescription>2024 performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data) => (
                <div key={data.month}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text">{data.month}</span>
                    <span className="text-sm text-text-secondary">{data.sales} sales</span>
                  </div>
                  <div className="w-full h-2 bg-primary-dark rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-accent-dark"
                      style={{ width: `${(data.volume / maxVolume) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-text-secondary mt-1">${data.volume}M volume</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market Comparison</CardTitle>
            <CardDescription>Your performance vs market average</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text">Average Sale Price</span>
              </div>
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <div className="h-24 bg-primary-dark rounded-t-lg flex items-end justify-center">
                    <div
                      className="bg-accent h-full w-16 rounded-t-lg flex items-center justify-center text-xs font-medium text-white"
                      style={{ height: '85%' }}
                    >
                      You
                    </div>
                  </div>
                  <p className="text-xs text-center text-text-secondary mt-2">$2.85M</p>
                </div>
                <div className="flex-1">
                  <div className="h-24 bg-primary-dark rounded-t-lg flex items-end justify-center">
                    <div
                      className="bg-text-secondary/50 h-full w-16 rounded-t-lg flex items-center justify-center text-xs font-medium text-white"
                      style={{ height: '65%' }}
                    >
                      Market
                    </div>
                  </div>
                  <p className="text-xs text-center text-text-secondary mt-2">$2.15M</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm font-medium text-text mb-3">Key Advantages</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  <span className="text-text-secondary">Higher average transaction value</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  <span className="text-text-secondary">Faster closing times</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  <span className="text-text-secondary">Higher client satisfaction</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quarterly Breakdown</CardTitle>
          <CardDescription>Sales volume and transaction count</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-primary-dark rounded-lg">
              <p className="text-sm text-text-secondary mb-3">Q1 2024</p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-text-secondary">Sales</p>
                  <p className="text-h5 font-light text-text">10</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Volume</p>
                  <p className="text-h5 font-light text-accent">$27.8M</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-primary-dark rounded-lg">
              <p className="text-sm text-text-secondary mb-3">Q2 2024</p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-text-secondary">Sales</p>
                  <p className="text-h5 font-light text-text">15</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Volume</p>
                  <p className="text-h5 font-light text-accent">$42.1M</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-primary-dark rounded-lg">
              <p className="text-sm text-text-secondary mb-3">Q3 2024 (YTD)</p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-text-secondary">Sales</p>
                  <p className="text-h5 font-light text-text">2</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Volume</p>
                  <p className="text-h5 font-light text-accent">$5.9M</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
