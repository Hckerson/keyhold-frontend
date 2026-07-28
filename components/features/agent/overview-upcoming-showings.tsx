import { DetailRow } from "@/components/features/shared/detail-row";
import type { UpcomingShowing } from "@/lib/data/agent-overview";

export interface OverviewUpcomingShowingsProps {
    showings: UpcomingShowing[];
}

export function OverviewUpcomingShowings({
    showings,
}: OverviewUpcomingShowingsProps) {
    return (
        <div className="divide-border divide-y">
            {showings.map((showing) => (
                <DetailRow
                    key={showing.id}
                    primary={showing.address}
                    secondary={showing.client}
                    secondaryClassName="truncate"
                    value={
                        <span className="text-text-secondary shrink-0 text-xs tabular-nums">
                            {showing.when}
                        </span>
                    }
                />
            ))}
        </div>
    );
}

OverviewUpcomingShowings.displayName = "OverviewUpcomingShowings";
