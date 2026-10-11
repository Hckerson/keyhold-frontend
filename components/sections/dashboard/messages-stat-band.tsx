import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/lib/types";

const BAND_LABEL = "Message activity at a glance";

export interface MessagesStatBandProps {
    stats: StatDatum[];
    pending?: boolean;
}

export function MessagesStatBand({ stats, pending }: MessagesStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} pending={pending} />;
}

MessagesStatBand.displayName = "MessagesStatBand";
