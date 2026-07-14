import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";

interface Step {
    number: number;
    title: string;
    description: string;
}

interface HowItWorksProps {
    steps?: Step[];
}

export function HowItWorks({ steps }: HowItWorksProps) {
    const defaultSteps = [
        {
            number: 1,
            title: "Browse Properties",
            description:
                "Explore our curated selection of luxury properties with detailed information and photography.",
        },
        {
            number: 2,
            title: "Request Viewing",
            description:
                "Schedule a private viewing with our concierge team. We handle all the details.",
        },
        {
            number: 3,
            title: "Make an Offer",
            description:
                "Submit your offer through our secure platform with full transparency.",
        },
        {
            number: 4,
            title: "Close the Deal",
            description:
                "Our team manages the closing process from inspection to final walkthrough.",
        },
    ];

    const displaySteps = steps || defaultSteps;

    return (
        <section className="bg-background-muted py-16 md:py-24">
            <Container>
                <div className="space-y-12">
                    <div className="space-y-4 text-center">
                        <h2 className="text-h2 font-display text-text font-light">
                            How It Works
                        </h2>
                        <p className="text-text-secondary mx-auto max-w-2xl text-lg">
                            A seamless process designed for luxury buyers
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {displaySteps.map((step) => (
                            <Card key={step.number} className="text-center">
                                <CardContent className="space-y-4 p-6">
                                    <div className="bg-accent text-text-inverse text-h6 mx-auto flex h-12 w-12 items-center justify-center rounded-full font-semibold">
                                        {step.number}
                                    </div>
                                    <h3 className="text-h6 font-body text-text font-medium">
                                        {step.title}
                                    </h3>
                                    <p className="text-text-secondary text-sm">
                                        {step.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
