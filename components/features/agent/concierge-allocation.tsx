import { ProgressBar } from "@/components/ui/progress-bar";
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
        <span className={cn("flex items-center gap-1.5", className)}>
            <ProgressBar
                value={percent}
                tone={allocationTone(percent)}
                className="w-10 shrink-0"
            />
            <span className="text-text-secondary w-8 shrink-0 text-right text-xs tabular-nums">
                {percent}%
            </span>
        </span>
    );
}

ConciergeAllocation.displayName = "ConciergeAllocation";
