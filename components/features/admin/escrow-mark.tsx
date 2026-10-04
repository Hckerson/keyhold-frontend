import { ToneReading } from "@/components/patterns/tone-reading";
import { escrowTone, MILESTONE_ORDER } from "@/lib/config/transaction-tones";
import { percentOf } from "@/lib/utils";

const CLEARED_LABEL = "milestones cleared";

export interface EscrowMarkProps {
    cleared: number;
    label: string;
    className?: string;
}

export function EscrowMark({ cleared, label, className }: EscrowMarkProps) {
    const total = MILESTONE_ORDER.length;

    return (
        <ToneReading
            value={`${cleared}/${total}`}
            tone={escrowTone(percentOf(cleared, total))}
            label={`${label} ${cleared} of ${total} ${CLEARED_LABEL}`}
            className={className}
        />
    );
}

EscrowMark.displayName = "EscrowMark";
