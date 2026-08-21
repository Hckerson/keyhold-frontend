import { Skeleton } from "@/components/ui/skeleton";

const STAT_SLOTS = [0, 1, 2, 3];
const ROW_SLOTS = [0, 1, 2, 3, 4, 5];
const RAIL_SLOTS = [0, 1, 2];

function StatSkeleton() {
    return (
        <div className="border-border-light bg-background flex flex-col gap-2 rounded-lg border p-3">
            <Skeleton className="h-2.5 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-2.5 w-16" />
        </div>
    );
}

StatSkeleton.displayName = "StatSkeleton";

export function ConsoleSkeleton() {
    return (
        <div className="flex w-full flex-col gap-4">
            <div className="border-border-dark flex flex-col gap-1.5 border-b pb-4">
                <Skeleton className="h-2.5 w-24" />
                <Skeleton className="h-6 w-64" />
                <Skeleton className="h-3 w-full max-w-md" />
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {STAT_SLOTS.map((slot) => (
                    <StatSkeleton key={slot} />
                ))}
            </div>

            <div className="console-split gap-3">
                <div className="border-border-light bg-background flex min-w-0 flex-col gap-2.5 rounded-lg border p-3">
                    <Skeleton className="h-3 w-40" />
                    {ROW_SLOTS.map((slot) => (
                        <Skeleton key={slot} className="h-9 w-full" />
                    ))}
                </div>

                <div className="border-border-light bg-background flex min-w-0 flex-col gap-2.5 rounded-lg border p-3">
                    <Skeleton className="h-3 w-28" />
                    {RAIL_SLOTS.map((slot) => (
                        <Skeleton key={slot} className="h-16 w-full" />
                    ))}
                </div>
            </div>
        </div>
    );
}

ConsoleSkeleton.displayName = "ConsoleSkeleton";
