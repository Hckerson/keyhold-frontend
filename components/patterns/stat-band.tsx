import { StatCell, type StatDatum } from "@/components/patterns/stat-cell";

export interface StatBandProps {
    label: string;
    stats: StatDatum[];
}

export function StatBand({ label, stats }: StatBandProps) {
    return (
        <section
            aria-label={label}
            className="border-border-light bg-background-muted divide-border grid grid-cols-2 divide-x divide-y overflow-hidden rounded-lg border shadow-sm sm:flex sm:h-14 sm:divide-y-0"
        >
            {stats.map((stat) => (
                <StatCell key={stat.id} stat={stat} />
            ))}
        </section>
    );
}

StatBand.displayName = "StatBand";
