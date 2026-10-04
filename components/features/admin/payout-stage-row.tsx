import { AgeMark } from "@/components/features/shared/age-mark";
import { PayoutStateMark } from "@/components/features/admin/payout-state-mark";
import { ToneReading } from "@/components/patterns/tone-reading";
import { payoutAgeTone, PAYOUT_STATES } from "@/lib/config/payout-tones";
import { stageShare } from "@/lib/data/admin-payments";
import { formatCompactUsd } from "@/lib/utils";
import type { PayoutStage } from "@/lib/types";

export interface PayoutStageRowProps {
    stage: PayoutStage;
    stages: PayoutStage[];
}

export function PayoutStageRow({ stage, stages }: PayoutStageRowProps) {
    const meta = PAYOUT_STATES[stage.id];
    const share = stageShare(stage, stages);

    return (
        <tr className="ease-smooth hover:bg-background-muted h-11 transition-colors">
            <td className="py-0">
                <PayoutStateMark state={stage.id} />
            </td>
            <td className="text-text py-0 pl-3 text-right text-xs font-semibold tabular-nums">
                {formatCompactUsd(stage.amount)}
            </td>
            <td className="py-0 pl-3">
                <ToneReading
                    value={`${share}%`}
                    tone={meta.chartTone}
                    label={`${meta.label} holds ${share}% of escrow holds`}
                />
            </td>
            <td className="py-0 pl-3 text-right">
                <AgeMark
                    minutes={stage.oldestMinutes}
                    tone={
                        meta.held
                            ? payoutAgeTone(stage.oldestMinutes)
                            : "neutral"
                    }
                />
            </td>
        </tr>
    );
}

PayoutStageRow.displayName = "PayoutStageRow";
