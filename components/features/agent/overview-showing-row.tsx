import { StatusDot } from "@/components/patterns/status-dot";
import type { ShowingTiming, StatusTone, UpcomingShowing } from "@/lib/types";

const timingTone: Record<ShowingTiming, StatusTone> = {
    today: "warning",
    tomorrow: "info",
    later: "neutral",
};

export interface OverviewShowingRowProps {
    showing: UpcomingShowing;
}

export function OverviewShowingRow({ showing }: OverviewShowingRowProps) {
    return (
        <li className="flex h-9 items-center gap-2">
            <StatusDot tone={timingTone[showing.timing]} />
            <span className="text-text min-w-0 flex-1 truncate text-xs font-medium">
                {showing.address}
            </span>
            <span className="text-text-secondary w-20 shrink-0 truncate text-xs">
                {showing.client}
            </span>
            <span className="micro-label shrink-0">{showing.when}</span>
        </li>
    );
}

OverviewShowingRow.displayName = "OverviewShowingRow";
