import { Button } from "@/components/ui/button";

export function HeroSection() {
    return (
        <section className="bg-background relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
            <div className="from-primary-light/20 to-background pointer-events-none absolute inset-0 bg-gradient-to-b" />

            <div className="relative z-10 max-w-4xl space-y-8 px-6 text-center md:px-12">
                <h1 className="text-h1 font-display text-text leading-tight font-light">
                    Luxury Properties Await
                </h1>

                <p className="text-text-secondary mx-auto max-w-2xl text-lg leading-relaxed">
                    Discover exclusive real estate with white-glove concierge
                    service. Premium marketplace for high-net-worth buyers and
                    luxury agents.
                </p>

                <div className="flex flex-col justify-center gap-6 pt-8 sm:flex-row">
                    <Button variant="primary" size="lg">
                        Browse Properties
                    </Button>
                    <Button variant="secondary" size="lg">
                        Learn More
                    </Button>
                </div>
            </div>

            <div className="from-background pointer-events-none absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t to-transparent" />
        </section>
    );
}
