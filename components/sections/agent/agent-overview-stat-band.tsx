import { StatBand } from "@/components/patterns/stat-band";
import { stats } from "@/lib/data/agent-overview";

const BAND_LABEL = "Book of business";

export function AgentOverviewStatBand() {
    return <StatBand label={BAND_LABEL} stats={stats} />;
}

AgentOverviewStatBand.displayName = "AgentOverviewStatBand";
