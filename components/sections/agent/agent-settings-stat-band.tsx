import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/lib/types";

const BAND_LABEL = "Profile and alert routing at a glance";

export interface AgentSettingsStatBandProps {
    stats: StatDatum[];
    pending?: boolean;
}

export function AgentSettingsStatBand({
    stats,
    pending,
}: AgentSettingsStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} pending={pending} />;
}

AgentSettingsStatBand.displayName = "AgentSettingsStatBand";
