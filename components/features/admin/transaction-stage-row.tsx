import { ShareMeter } from "@/components/patterns/share-meter";
import { TransactionStatusMark } from "@/components/features/admin/transaction-status-mark";
import { TRANSACTION_STATUSES } from "@/lib/config/transaction-tones";
import { stageShare } from "@/lib/data/admin-transactions";
import { formatCompactUsd, formatCount } from "@/lib/utils";
import type { TransactionStage } from "@/lib/types";

const SHARE_LABEL = "holds";
const VOLUME_NOUN = "of deal volume";

export interface TransactionStageRowProps {
    stage: TransactionStage;
    stages: TransactionStage[];
}

export function TransactionStageRow({
    stage,
    stages,
}: TransactionStageRowProps) {
    const meta = TRANSACTION_STATUSES[stage.id];
    const share = stageShare(stage, stages);

    return (
        <tr className="ease-smooth hover:bg-background-muted h-11 transition-colors">
            <td className="py-0">
                <TransactionStatusMark status={stage.id} />
            </td>
            <td className="text-text-secondary py-0 pl-3 text-right text-xs tabular-nums">
                {formatCount(stage.count)}
            </td>
            <td className="text-text py-0 pl-3 text-right text-xs font-semibold tabular-nums">
                {formatCompactUsd(stage.volume)}
            </td>
            <td className="py-0 pl-3">
                <ShareMeter
                    percent={share}
                    tone={meta.chartTone}
                    label={`${meta.label} ${SHARE_LABEL} ${share}% ${VOLUME_NOUN}`}
                />
            </td>
        </tr>
    );
}

TransactionStageRow.displayName = "TransactionStageRow";
