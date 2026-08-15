import { ProgressBar } from "@/components/ui/progress-bar";
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
            className={cn("flex items-center justify-end gap-1.5", className)}
            aria-label={`${label} ${cleared} of ${total} ${CLEARED_LABEL}`}
        >
            <ProgressBar value={percent} tone={tone} className="w-10" />
            <span
                className={cn(
                    "w-6 shrink-0 text-right text-xs font-medium tabular-nums",
                    chartToneText[tone],
                )}
            >
                {cleared}/{total}
            </span>
        </span>
    );
}

EscrowMeter.displayName = "EscrowMeter";
