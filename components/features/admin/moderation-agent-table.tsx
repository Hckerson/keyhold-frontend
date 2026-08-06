import { ModerationAgentRow } from "@/components/features/admin/moderation-agent-row";
import type { ModerationAgentLoad } from "@/lib/types";

const TABLE_CAPTION =
    "Submitting agents by listings sent, listings still open and user reports raised against them";

export interface ModerationAgentTableProps {
    loads: ModerationAgentLoad[];
}

export function ModerationAgentTable({ loads }: ModerationAgentTableProps) {
    return (
        <table className="table-flush w-full min-w-sm table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label text-left">
                        Agent
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-12 pl-3 text-right"
                    >
                        Sent
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-12 pl-3 text-right"
                    >
                        Open
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-16 pl-3 text-right"
                    >
                        Reports
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                {loads.map((load) => (
                    <ModerationAgentRow key={load.id} load={load} />
                ))}
            </tbody>
        </table>
    );
}

ModerationAgentTable.displayName = "ModerationAgentTable";
