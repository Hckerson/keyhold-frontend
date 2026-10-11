import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/lib/types";

const BAND_LABEL = "Book of business";

export interface AgentOverviewStatBandProps {
    stats: StatDatum[];
    pending?: boolean;
}

export function AgentOverviewStatBand({
    stats,
    pending,
}: AgentOverviewStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} pending={pending} />;
}

AgentOverviewStatBand.displayName = "AgentOverviewStatBand";
