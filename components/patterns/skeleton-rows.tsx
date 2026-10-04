import { Skeleton } from "@/components/ui/skeleton";
import { PanelInset } from "@/components/ui/panel-inset";
import { cn } from "@/lib/utils";

const DEFAULT_ROWS = 6;

export interface SkeletonRowsProps {
    rows?: number;
    tall?: boolean;
}

export function SkeletonRows({ rows = DEFAULT_ROWS, tall }: SkeletonRowsProps) {
    return (
        <PanelInset>
            <ul aria-busy="true" className="divide-border-light divide-y">
                {Array.from({ length: rows }, (_, slot) => (
                    <li
                        key={slot}
                        className={cn(
                            "flex items-center gap-3",
                            tall ? "h-11" : "h-9",
                        )}
                    >
                        {tall && <Skeleton className="size-8 shrink-0" />}
                        <Skeleton className="h-3 flex-1" />
                        <Skeleton className="h-3 w-16 shrink-0" />
                    </li>
                ))}
            </ul>
        </PanelInset>
    );
}

SkeletonRows.displayName = "SkeletonRows";
