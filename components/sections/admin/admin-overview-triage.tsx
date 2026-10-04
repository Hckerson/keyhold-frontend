import { DeckPanel } from "@/components/patterns/deck-panel";
import { QueueDeck } from "@/components/features/admin/queue-deck";
import { deckReadiness, triageReading } from "@/lib/data/admin-overview-triage";
import type {
    DecisionLane,
    ModerationQueueId,
    QueueReadiness,
} from "@/lib/types";

const TITLE = "Decisions";

export interface AdminOverviewTriageProps {
    lanes: DecisionLane[];
    readiness: Record<ModerationQueueId, QueueReadiness>;
}

export function AdminOverviewTriage({
    lanes,
    readiness,
}: AdminOverviewTriageProps) {
    const overall = deckReadiness(readiness);

    return (
        <DeckPanel
            title={TITLE}
            summary={triageReading(lanes, overall)}
            pending={overall === "pending"}
        >
            <QueueDeck lanes={lanes} readiness={readiness} />
        </DeckPanel>
    );
}

AdminOverviewTriage.displayName = "AdminOverviewTriage";
