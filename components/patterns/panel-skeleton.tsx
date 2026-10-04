import { Skeleton } from "@/components/ui/skeleton";
import {
    SkeletonRows,
    type SkeletonRowsProps,
} from "@/components/patterns/skeleton-rows";
import { cn } from "@/lib/utils";

export interface PanelSkeletonProps extends SkeletonRowsProps {
    className?: string;
}

export function PanelSkeleton({ className, ...rows }: PanelSkeletonProps) {
    return (
        <div
            className={cn(
                "bg-background border-border min-w-0 rounded-xl border px-4 pb-4 shadow-sm",
                className,
            )}
        >
            <div className="border-border-light -mx-4 mb-2.5 flex h-11 items-center border-b px-4">
                <Skeleton className="h-3 w-32" />
            </div>
            <SkeletonRows {...rows} />
        </div>
    );
}

PanelSkeleton.displayName = "PanelSkeleton";
