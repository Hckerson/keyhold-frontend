import { ActivityRow } from "@/components/features/shared/activity-row";
import type { ActivityEntry } from "@/lib/types";

export interface ActivityListProps {
    entries: ActivityEntry[];
}

export function ActivityList({ entries }: ActivityListProps) {
    return (
        <ul className="divide-border divide-y">
            {entries.map((entry) => (
                <ActivityRow key={entry.id} entry={entry} />
            ))}
        </ul>
    );
}

ActivityList.displayName = "ActivityList";
