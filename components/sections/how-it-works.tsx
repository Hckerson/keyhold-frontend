import { Container } from '@/components/ui/container'
import { Card, CardContent } from '@/components/ui/card'

interface Step {
  number: number
  title: string
  description: string
}

interface HowItWorksProps {
  steps?: Step[]
}

export function HowItWorks({ steps }: HowItWorksProps) {
  const defaultSteps = [
    {
      number: 1,
      title: 'Browse Properties',
      description: 'Explore our curated selection of luxury properties with detailed information and photography.',
    },
    {
      number: 2,
      title: 'Request Viewing',
      description: 'Schedule a private viewing with our concierge team. We handle all the details.',
    },
    {
      number: 3,
      title: 'Make an Offer',
      description: 'Submit your offer through our secure platform with full transparency.',
    },
    {
      number: 4,
      title: 'Close the Deal',
      description: 'Our team manages the closing process from inspection to final walkthrough.',
    },
  ]

  const displaySteps = steps || defaultSteps

  return (
    <section className="py-16 md:py-24 bg-background-muted">
      <Container>
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-h2 font-display font-light text-text">
              How It Works
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              A seamless process designed for luxury buyers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displaySteps.map((step) => (
              <Card key={step.number} className="text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-accent text-text-inverse flex items-center justify-center mx-auto text-h6 font-semibold">
                    {step.number}
                  </div>
                  <h3 className="text-h6 font-body font-medium text-text">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
