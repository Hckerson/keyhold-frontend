import { StatBand } from "@/components/patterns/stat-band";
import { conciergeStats } from "@/lib/data/agent-concierge";

const BAND_LABEL = "VIP book at a glance";

export function ConciergeStatBand() {
    return <StatBand label={BAND_LABEL} stats={conciergeStats} />;
}

ConciergeStatBand.displayName = "ConciergeStatBand";
