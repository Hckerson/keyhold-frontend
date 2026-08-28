import { TransactionStageRow } from "@/components/features/admin/transaction-stage-row";
import type { TransactionStage } from "@/lib/types";

const TABLE_CAPTION =
    "Deal pipeline stages by count, volume and share of total deal volume";

export interface TransactionStageTableProps {
    stages: TransactionStage[];
}

export function TransactionStageTable({ stages }: TransactionStageTableProps) {
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
                        className="micro-label w-10 pl-3 text-right"
                    >
                        Deals
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-16 pl-3 text-right"
                    >
                        Volume
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-24 pl-3 text-right"
                    >
                        Share
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                {stages.map((stage) => (
                    <TransactionStageRow
                        key={stage.id}
                        stage={stage}
                        stages={stages}
                    />
                ))}
            </tbody>
        </table>
    );
}

TransactionStageTable.displayName = "TransactionStageTable";
