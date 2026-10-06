import { OverviewViewingRow } from "@/components/features/dashboard/overview-viewing-row";
import type { OverviewViewing } from "@/lib/types";

export interface OverviewViewingListProps {
    viewings: OverviewViewing[];
}

export function OverviewViewingList({ viewings }: OverviewViewingListProps) {
    return (
        <ul className="divide-border divide-y">
            {viewings.map((viewing) => (
                <OverviewViewingRow key={viewing.id} viewing={viewing} />
            ))}
        </ul>
    );
}

OverviewViewingList.displayName = "OverviewViewingList";
