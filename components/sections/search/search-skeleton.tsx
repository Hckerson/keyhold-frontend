import { Skeleton } from "@/components/ui/skeleton";

function CardSkeleton() {
    return (
        <div className="border-border bg-background-muted flex flex-col gap-3 overflow-hidden rounded-xl border p-3 shadow-sm">
            <Skeleton className="aspect-4/3 w-full rounded-lg" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-3 w-full" />
            <div className="border-border flex items-center gap-3 border-t pt-3">
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="h-3 w-24" />
            </div>
        </div>
    );
}

export function SearchResultsSkeleton() {
    return (
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
            <div className="border-border bg-background-muted hidden flex-col gap-4 rounded-xl border p-4 shadow-sm lg:flex">
                <Skeleton className="h-4 w-24" />
                {[0, 1, 2, 3].map((group) => (
                    <div key={group} className="flex flex-col gap-2">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-3/4" />
                    </div>
                ))}
            </div>

            <div className="flex min-w-0 flex-col gap-5">
                <div className="border-border flex items-end justify-between gap-3 border-b pb-4">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-8 w-56" />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {[0, 1, 2, 3, 4, 5].map((card) => (
                        <CardSkeleton key={card} />
                    ))}
                </div>
            </div>
        </div>
    );
}

SearchResultsSkeleton.displayName = "SearchResultsSkeleton";
