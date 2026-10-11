import { Skeleton } from "@/components/ui/skeleton";
import { CELL_BAND } from "@/components/patterns/flow-band-skeleton";

export interface LeadBandSkeletonProps {
    cells: number;
}

export function LeadBandSkeleton({ cells }: LeadBandSkeletonProps) {
    return (
        <div className={CELL_BAND}>
            <div className="bg-background flex min-w-0 flex-col justify-between gap-3 p-4">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-8 w-28" />
                <Skeleton className="h-4 w-40" />
            </div>
            <div className="console-span-2 bg-border grid grid-cols-2 gap-px">
                {Array.from({ length: cells }, (_, slot) => (
                    <div
                        key={slot}
                        className="bg-background flex min-w-0 items-center gap-3 px-4 py-3"
                    >
                        <Skeleton className="h-8 min-w-0 flex-1" />
                        <Skeleton className="h-5 w-16 shrink-0" />
                    </div>
                ))}
            </div>
        </div>
    );
}

LeadBandSkeleton.displayName = "LeadBandSkeleton";
