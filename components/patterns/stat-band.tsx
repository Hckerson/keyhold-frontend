import { StatCell, type StatDatum } from "@/components/patterns/stat-cell";
import { StatCellSkeleton } from "@/components/patterns/stat-cell-skeleton";

const PENDING_SLOTS = 4;

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
            className="border-border bg-background overflow-hidden rounded-xl border shadow-sm"
        >
            <div className="stat-band">
                {pending
                    ? Array.from(
                          { length: stats.length || PENDING_SLOTS },
                          (_, slot) => <StatCellSkeleton key={slot} />,
                      )
                    : stats.map((stat) => (
                          <StatCell key={stat.id} stat={stat} />
                      ))}
            </div>
        </section>
    );
}

StatBand.displayName = "StatBand";
