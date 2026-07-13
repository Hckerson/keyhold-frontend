import { Container } from '@/components/ui/container'

interface Stat {
  value: string
  label: string
}

interface TrustSignalsProps {
  stats?: Stat[]
}

export function TrustSignals({ stats }: TrustSignalsProps) {
  const defaultStats = [
    { value: '2,500+', label: 'Properties Listed' },
    { value: '95%', label: 'Client Satisfaction' },
    { value: '8.5M', label: 'Total Deals Closed' },
    { value: '500+', label: 'Luxury Agents' },
  ]

  const displayStats = stats || defaultStats

  return (
    <section className="py-16 md:py-24 bg-background border-y border-border">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayStats.map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <p className="text-h3 font-display font-light text-accent">
                {stat.value}
              </p>
              <p className="text-base text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
