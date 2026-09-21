import { OverviewShowingRow } from "@/components/features/agent/overview-showing-row";
import type { UpcomingShowing } from "@/lib/types";

export interface OverviewShowingListProps {
    showings: UpcomingShowing[];
}

export function OverviewShowingList({ showings }: OverviewShowingListProps) {
    return (
        <ul className="divide-border divide-y">
            {showings.map((showing) => (
                <OverviewShowingRow key={showing.id} showing={showing} />
            ))}
        </ul>
    );
}

OverviewShowingList.displayName = "OverviewShowingList";
