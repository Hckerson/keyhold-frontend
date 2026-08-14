import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Profile and alert routing at a glance";

export interface AgentSettingsStatBandProps {
    stats: StatDatum[];
}

export function AgentSettingsStatBand({ stats }: AgentSettingsStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} />;
}

AgentSettingsStatBand.displayName = "AgentSettingsStatBand";
