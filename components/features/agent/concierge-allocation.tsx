import { chartToneText } from "@/lib/config/chart-tones";
import { allocationTone } from "@/lib/config/concierge-tones";
import { cn } from "@/lib/utils";

export interface ConciergeAllocationProps {
    percent: number;
    className?: string;
}

export function ConciergeAllocation({
    percent,
    className,
}: ConciergeAllocationProps) {
    return (
        <span
            className={cn(
                "text-xs font-medium tabular-nums",
                chartToneText[allocationTone(percent)],
                className,
            )}
        >
            {percent}%
        </span>
    );
}

ConciergeAllocation.displayName = "ConciergeAllocation";
