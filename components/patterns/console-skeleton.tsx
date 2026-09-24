import { Skeleton } from "@/components/ui/skeleton";
import { StatCellSkeleton } from "@/components/patterns/stat-cell-skeleton";
import { cn } from "@/lib/utils";

const STAT_SLOTS = [0, 1, 2, 3];
const ROW_SLOTS = [0, 1, 2, 3, 4, 5];
const RAIL_SLOTS = [0, 1, 2, 3];
const PANEL = "bg-background border-border rounded-xl border shadow-sm";

function PanelSkeleton({
    rows,
    className,
}: {
    rows: number[];
    className?: string;
}) {
    return (
        <div className={cn(PANEL, "min-w-0", className)}>
            <div className="border-border-light flex h-11 items-center border-b px-4">
                <Skeleton className="h-3 w-32" />
            </div>
            <div className="flex flex-col gap-2 p-4">
                {rows.map((slot) => (
                    <Skeleton key={slot} className="h-9 w-full" />
                ))}
            </div>
        </div>
    );
}

PanelSkeleton.displayName = "PanelSkeleton";

export function ConsoleSkeleton() {
    return (
        <div className="flex w-full flex-col gap-4" aria-busy="true">
            <div className="flex flex-col gap-1.5">
                <Skeleton className="h-6 w-56" />
                <Skeleton className="h-3 w-full max-w-md" />
            </div>

            <div className={cn(PANEL, "overflow-hidden")}>
                <div className="stat-band">
                    {STAT_SLOTS.map((slot) => (
                        <StatCellSkeleton key={slot} />
                    ))}
                </div>
            </div>

            <div className="console-split gap-3">
                <PanelSkeleton rows={ROW_SLOTS} className="console-span-2" />
                <PanelSkeleton rows={RAIL_SLOTS} />
            </div>
        </div>
    );
}

ConsoleSkeleton.displayName = "ConsoleSkeleton";
