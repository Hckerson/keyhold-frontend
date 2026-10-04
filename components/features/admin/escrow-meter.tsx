import { escrowTone, MILESTONE_ORDER } from "@/lib/config/transaction-tones";
import { chartToneText } from "@/lib/config/chart-tones";
import { cn, percentOf } from "@/lib/utils";

const CLEARED_LABEL = "milestones cleared";

export interface EscrowMeterProps {
    cleared: number;
    label: string;
    className?: string;
}

export function EscrowMeter({ cleared, label, className }: EscrowMeterProps) {
    const total = MILESTONE_ORDER.length;
    const percent = percentOf(cleared, total);
    const tone = escrowTone(percent);

    return (
        <span
            role="img"
            className={cn("flex items-center justify-end gap-1.5", className)}
            aria-label={`${label} ${cleared} of ${total} ${CLEARED_LABEL}`}
        >
            <span
                className={cn(
                    "shrink-0 text-right text-xs font-medium tabular-nums",
                    chartToneText[tone],
                )}
            >
                {cleared}/{total}
            </span>
        </span>
    );
}

EscrowMeter.displayName = "EscrowMeter";
