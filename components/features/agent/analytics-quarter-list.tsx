import { AnalyticsQuarterRow } from "@/components/features/agent/analytics-quarter-row";
import type { QuarterSummary } from "@/lib/data/agent-analytics";

export interface AnalyticsQuarterListProps {
    quarters: QuarterSummary[];
}

export function AnalyticsQuarterList({ quarters }: AnalyticsQuarterListProps) {
    const totalVolume = quarters.reduce(
        (total, quarter) => total + quarter.volume,
        0,
    );

    return (
        <ul className="divide-border divide-y">
            {quarters.map((quarter) => (
                <AnalyticsQuarterRow
                    key={quarter.id}
                    quarter={quarter}
                    totalVolume={totalVolume}
                />
            ))}
        </ul>
    );
}

AnalyticsQuarterList.displayName = "AnalyticsQuarterList";
