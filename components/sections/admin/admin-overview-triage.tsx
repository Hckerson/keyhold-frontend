import { RegisterSection } from "@/components/patterns/register-section";
import { DecisionLaneBoard } from "@/components/features/admin/decision-lane-board";
import { ageTone } from "@/lib/config/admin-tones";
import {
    oldestWait,
    openDecisions,
    triageReading,
} from "@/lib/data/admin-overview-triage";
import { formatCount } from "@/lib/utils";
import type { DecisionLane, QueueReadiness } from "@/lib/types";

const INDEX = "01";
const TITLE = "Decide";
const UNKNOWN = "—";

export interface AdminOverviewTriageProps {
    lanes: DecisionLane[];
    readiness: QueueReadiness;
}

export function AdminOverviewTriage({
    lanes,
    readiness,
}: AdminOverviewTriageProps) {
    const ready = readiness === "ready";
    const open = openDecisions(lanes);

    return (
        <RegisterSection
            index={INDEX}
            title={TITLE}
            figure={ready ? formatCount(open) : UNKNOWN}
            figureTone={
                ready && open > 0 ? ageTone(oldestWait(lanes)) : undefined
            }
            reading={triageReading(lanes, readiness)}
            pending={readiness === "pending"}
        >
            <DecisionLaneBoard lanes={lanes} readiness={readiness} />
        </RegisterSection>
    );
}

AdminOverviewTriage.displayName = "AdminOverviewTriage";
