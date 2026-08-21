import { StatCell, type StatDatum } from "@/components/patterns/stat-cell";

export interface StatBandProps {
    label: string;
    stats: StatDatum[];
}

export function StatBand({ label, stats }: StatBandProps) {
    return (
        <section
            aria-label={label}
            className="border-border-light bg-background-muted overflow-hidden rounded-lg border shadow-sm"
        >
            <div className="stat-band">
                {stats.map((stat) => (
                    <StatCell key={stat.id} stat={stat} />
                ))}
            </div>
        </section>
    );
}

StatBand.displayName = "StatBand";
