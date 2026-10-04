import { ModerationAgentRow } from "@/components/features/admin/moderation-agent-row";
import type { ModerationAgentLoad } from "@/lib/types";

const LIST_LABEL =
    "Submitting agents by listings sent, listings still open and user reports raised against them";

export interface ModerationAgentTableProps {
    loads: ModerationAgentLoad[];
}

export function ModerationAgentTable({ loads }: ModerationAgentTableProps) {
    return (
        <ul aria-label={LIST_LABEL} className="card-grid gap-2">
            {loads.map((load) => (
                <ModerationAgentRow key={load.id} load={load} />
            ))}
        </ul>
    );
}

ModerationAgentTable.displayName = "ModerationAgentTable";
