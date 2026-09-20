import { StatCell, type StatDatum } from "@/components/patterns/stat-cell";

export interface StatBandProps {
    label: string;
    stats: StatDatum[];
    pending?: boolean;
}

export function StatBand({ label, stats, pending }: StatBandProps) {
    return (
        <section
            aria-label={label}
            aria-busy={pending || undefined}
            className="border-border-light bg-background-muted overflow-hidden rounded-lg border shadow-sm"
        >
            <div className="stat-band">
                {stats.map((stat) => (
                    <StatCell key={stat.id} stat={stat} pending={pending} />
                ))}
            </div>
        </section>
    );
}

StatBand.displayName = "StatBand";
