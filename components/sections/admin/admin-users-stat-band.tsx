import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Account directory at a glance";

export interface AdminUsersStatBandProps {
    stats: StatDatum[];
    pending?: boolean;
}

export function AdminUsersStatBand({
    stats,
    pending,
}: AdminUsersStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} pending={pending} />;
}

AdminUsersStatBand.displayName = "AdminUsersStatBand";
