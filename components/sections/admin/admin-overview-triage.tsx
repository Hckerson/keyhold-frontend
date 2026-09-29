import { DeckPanel } from "@/components/patterns/deck-panel";
import { QueueDeck } from "@/components/features/admin/queue-deck";
import { triageReading } from "@/lib/data/admin-overview-triage";
import type { DecisionLane, QueueReadiness } from "@/lib/types";

const TITLE = "Decisions";

export interface AdminOverviewTriageProps {
    lanes: DecisionLane[];
    readiness: QueueReadiness;
}

export function AdminOverviewTriage({
    lanes,
    readiness,
}: AdminOverviewTriageProps) {
    return (
        <DeckPanel
            title={TITLE}
            summary={triageReading(lanes, readiness)}
            pending={readiness === "pending"}
        >
            <QueueDeck lanes={lanes} readiness={readiness} />
        </DeckPanel>
    );
}

AdminOverviewTriage.displayName = "AdminOverviewTriage";
