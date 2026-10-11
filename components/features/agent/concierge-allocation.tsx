import { ToneReading } from "@/components/patterns/tone-reading";
import { allocationTone } from "@/lib/config/concierge-tones";

const ALLOCATED_NOUN = "allocated";

export interface ConciergeAllocationProps {
    percent: number;
    className?: string;
}

export function ConciergeAllocation({
    percent,
    className,
}: ConciergeAllocationProps) {
    return (
        <ToneReading
            value={`${percent}%`}
            tone={allocationTone(percent)}
            label={`${percent}% ${ALLOCATED_NOUN}`}
            className={className}
        />
    );
}

ConciergeAllocation.displayName = "ConciergeAllocation";
