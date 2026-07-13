import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Deal {
  id: string
  property: string
  buyer: string
  price: number
  stage: 'showing' | 'offer' | 'negotiating' | 'inspection' | 'closing'
  daysInStage: number
  nextStep: string
}

const deals: Deal[] = [
  {
    id: '1',
    property: '456 Oak Avenue',
    buyer: 'John Doe',
    price: 3200000,
    stage: 'offer',
    daysInStage: 5,
    nextStep: 'Buyer inspection tomorrow',
  },
  {
    id: '2',
    property: '789 Sunset Blvd',
    buyer: 'Sarah Johnson',
    price: 2950000,
    stage: 'negotiating',
    daysInStage: 8,
    nextStep: 'Counter-offer review',
  },
  {
    id: '3',
    property: '234 Oak Street',
    buyer: 'Michael Chen',
    price: 4500000,
    stage: 'inspection',
    daysInStage: 3,
    nextStep: 'Appraisal completion',
  },
  {
    id: '4',
    property: '567 Palm Drive',
    buyer: 'Elizabeth Brown',
    price: 3800000,
    stage: 'closing',
    daysInStage: 1,
    nextStep: 'Final walkthrough',
  },
]

const stages = [
  { id: 'showing', label: 'Showing', color: 'text-info' },
  { id: 'offer', label: 'Offer', color: 'text-warning' },
  { id: 'negotiating', label: 'Negotiating', color: 'text-warning' },
  { id: 'inspection', label: 'Inspection', color: 'text-warning' },
  { id: 'closing', label: 'Closing', color: 'text-success' },
]

const getStageProgress = (stage: string) => {
  const stageIndex = stages.findIndex((s) => s.id === stage)
  return Math.round(((stageIndex + 1) / stages.length) * 100)
}

const getStatusColor = (stage: string) => {
  switch (stage) {
    case 'showing':
      return 'text-info bg-info/10 border-info/20'
    case 'offer':
    case 'negotiating':
    case 'inspection':
      return 'text-warning bg-warning/10 border-warning/20'
    case 'closing':
      return 'text-success bg-success/10 border-success/20'
    default:
      return 'text-text-secondary'
  }
}

const getStatusLabel = (stage: string) => {
  return stages.find((s) => s.id === stage)?.label || 'Unknown'
}

export default function AgentPipelinePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h3 font-display font-light text-text">Sales Pipeline</h1>
        <p className="text-text-secondary mt-2">{deals.length} active deals worth ${deals.reduce((sum, d) => sum + d.price, 0) / 1000000} M</p>
      </div>

      <div className="space-y-4">
        {deals.map((deal) => (
          <Card key={deal.id} className="hover:border-accent/50 transition-colors">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-h6 font-light text-text">{deal.property}</h3>
                    <p className="text-sm text-text-secondary mt-1">{deal.buyer}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(deal.stage)}`}>
                    {getStatusLabel(deal.stage)}
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-h5 font-light text-accent">${(deal.price / 1000000).toFixed(2)}M</span>
                  <span className="text-xs text-text-secondary">{deal.daysInStage} days in this stage</span>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-text-secondary">Deal Progress</span>
                    <span className="text-xs text-accent font-medium">{getStageProgress(deal.stage)}%</span>
                  </div>
                  <div className="w-full h-2 bg-primary-dark rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-accent-dark transition-all"
                      style={{ width: `${getStageProgress(deal.stage)}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-text-secondary">
                    {stages.map((s) => (
                      <span key={s.id}>{s.label}</span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <p className="text-sm">
                    <span className="text-text-secondary">Next: </span>
                    <span className="text-text font-medium">{deal.nextStep}</span>
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="secondary" className="flex-1 text-sm h-9">
                    Update Status
                  </Button>
                  <Button variant="ghost" className="flex-1 text-sm h-9">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pipeline Health</CardTitle>
          <CardDescription>Key metrics and insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-text-secondary mb-2">Avg Days in Pipeline</p>
              <p className="text-h5 font-light text-text">
                {Math.round(deals.reduce((sum, d) => sum + d.daysInStage, 0) / deals.length)}
              </p>
              <p className="text-xs text-text-secondary mt-1">Target: 45-60 days</p>
            </div>

            <div>
              <p className="text-sm text-text-secondary mb-2">Total Pipeline Value</p>
              <p className="text-h5 font-light text-accent">
                ${(deals.reduce((sum, d) => sum + d.price, 0) / 1000000).toFixed(1)}M
              </p>
              <p className="text-xs text-text-secondary mt-1">from {deals.length} deals</p>
            </div>

            <div>
              <p className="text-sm text-text-secondary mb-2">Close Rate</p>
              <p className="text-h5 font-light text-success">68%</p>
              <p className="text-xs text-text-secondary mt-1">vs 52% industry avg</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
