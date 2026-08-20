import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Book of business";

export interface AgentOverviewStatBandProps {
    stats: StatDatum[];
}

export function AgentOverviewStatBand({ stats }: AgentOverviewStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} />;
}

AgentOverviewStatBand.displayName = "AgentOverviewStatBand";
