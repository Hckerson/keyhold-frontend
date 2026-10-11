import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface TileBandSkeletonProps {
    tiles: number;
    className: string;
}

export function TileBandSkeleton({ tiles, className }: TileBandSkeletonProps) {
    return (
        <div className={cn("console-split gap-2", className)}>
            {Array.from({ length: tiles }, (_, slot) => (
                <Skeleton key={slot} className="h-20 rounded-lg" />
            ))}
        </div>
    );
}

TileBandSkeleton.displayName = "TileBandSkeleton";
