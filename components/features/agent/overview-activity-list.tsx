import { OverviewActivityRow } from "@/components/features/agent/overview-activity-row";
import type { ActivityEntry } from "@/lib/types";

export interface OverviewActivityListProps {
    entries: ActivityEntry[];
}

export function OverviewActivityList({ entries }: OverviewActivityListProps) {
    return (
        <ul className="divide-border divide-y">
            {entries.map((entry) => (
                <OverviewActivityRow key={entry.id} entry={entry} />
            ))}
        </ul>
    );
}

OverviewActivityList.displayName = "OverviewActivityList";
