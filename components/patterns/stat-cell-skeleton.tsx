import { Skeleton } from "@/components/ui/skeleton";
import { STAT_CELL } from "@/components/patterns/stat-cell";

export function StatCellSkeleton() {
    return (
        <div className={STAT_CELL}>
            <Skeleton className="size-3 shrink-0 rounded-full" />
            <Skeleton className="h-2.5 w-24" />
            <Skeleton className="ml-auto h-4 w-12 shrink-0 rounded-md" />
        </div>
    );
}

StatCellSkeleton.displayName = "StatCellSkeleton";
