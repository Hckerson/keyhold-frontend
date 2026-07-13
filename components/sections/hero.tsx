import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-light/20 to-background pointer-events-none" />

      <div className="relative z-10 max-w-4xl px-6 md:px-12 text-center space-y-8">
        <h1 className="text-h1 font-display font-light leading-tight text-text">
          Luxury Properties Await
        </h1>

        <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
          Discover exclusive real estate with white-glove concierge service. Premium
          marketplace for high-net-worth buyers and luxury agents.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
          <Button variant="primary" size="lg">
            Browse Properties
          </Button>
          <Button variant="secondary" size="lg">
            Learn More
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
