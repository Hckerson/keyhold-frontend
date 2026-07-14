import { Container } from "@/components/ui/container";

interface Stat {
    value: string;
    label: string;
}

interface TrustSignalsProps {
    stats?: Stat[];
}

export function TrustSignals({ stats }: TrustSignalsProps) {
    const defaultStats = [
        { value: "2,500+", label: "Properties Listed" },
        { value: "95%", label: "Client Satisfaction" },
        { value: "8.5M", label: "Total Deals Closed" },
        { value: "500+", label: "Luxury Agents" },
    ];

    const displayStats = stats || defaultStats;

    return (
        <section className="bg-background border-border border-y py-16 md:py-24">
            <Container>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {displayStats.map((stat, index) => (
                        <div key={index} className="space-y-2 text-center">
                            <p className="text-h3 font-display text-accent font-light">
                                {stat.value}
                            </p>
                            <p className="text-text-secondary text-base">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
