import { PayoutStageRow } from "@/components/features/admin/payout-stage-row";
import type { PayoutStage } from "@/lib/types";

const TABLE_CAPTION =
    "Payout stages by value held, share of total payout value and age of the oldest item";

export interface PayoutStageTableProps {
    stages: PayoutStage[];
}

export function PayoutStageTable({ stages }: PayoutStageTableProps) {
    return (
        <table className="table-flush w-full min-w-sm table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label text-left">
                        Stage
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-16 pl-3 text-right"
                    >
                        Held
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-24 pl-3 text-right"
                    >
                        Share
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-12 pl-3 text-right"
                    >
                        Oldest
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                {stages.map((stage) => (
                    <PayoutStageRow
                        key={stage.id}
                        stage={stage}
                        stages={stages}
                    />
                ))}
            </tbody>
        </table>
    );
}

PayoutStageTable.displayName = "PayoutStageTable";
