import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const CELL_BAND =
    "console-split border-border bg-border gap-px overflow-hidden rounded-xl border shadow-sm";

export interface FlowBandSkeletonProps {
    cells: number;
    className?: string;
}

export function FlowBandSkeleton({ cells, className }: FlowBandSkeletonProps) {
    return (
        <div className={cn(CELL_BAND, className)}>
            {Array.from({ length: cells }, (_, slot) => (
                <div
                    key={slot}
                    className="bg-background flex min-w-0 flex-col gap-2 p-4"
                >
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-4 w-28" />
                </div>
            ))}
        </div>
    );
}

FlowBandSkeleton.displayName = "FlowBandSkeleton";
