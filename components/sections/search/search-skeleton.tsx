import { Skeleton } from "@/components/ui/skeleton";
import { FILTER_GROUPS } from "@/lib/config/search-filters";

const CARD_SLOTS = [0, 1, 2, 3, 4, 5];

function CardSkeleton() {
    return (
        <div className="border-border-light bg-background-muted flex flex-col overflow-hidden rounded-xl border pb-2.5 shadow-sm">
            <Skeleton className="h-48 w-full rounded-none" />

            <div className="border-border-light bg-background relative z-10 mx-2.5 -mt-7 flex flex-col gap-2 rounded-lg border p-3">
                <Skeleton className="h-2.5 w-24" />
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-9 w-full rounded-md" />
                <Skeleton className="h-3 w-1/2" />
            </div>
        </div>
    );
}

CardSkeleton.displayName = "CardSkeleton";

export function SearchResultsSkeleton() {
    return (
        <div className="flex w-full flex-col gap-4">
            <div className="border-border-dark flex flex-col gap-1.5 border-b pb-4">
                <Skeleton className="h-2.5 w-24" />
                <Skeleton className="h-6 w-56" />
                <Skeleton className="h-3 w-full max-w-96" />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[240px_1fr]">
                <div className="border-border bg-background hidden flex-col overflow-hidden rounded-xl border shadow-sm lg:flex">
                    <div className="border-border-dark flex items-center justify-between gap-2 border-b px-3 py-2">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-3 w-10" />
                    </div>

                    <div className="divide-border divide-y">
                        <div className="flex flex-col gap-1.5 px-3 py-3">
                            <Skeleton className="h-2.5 w-16" />
                            <Skeleton className="h-9 w-full rounded-lg" />
                        </div>
                        {FILTER_GROUPS.map((group) => (
                            <div key={group.key} className="px-3 py-2">
                                <Skeleton className="h-3 w-24" />
                            </div>
                        ))}
                    </div>

                    <div className="border-border-dark border-t px-3 py-2">
                        <Skeleton className="h-8 w-full rounded-lg" />
                    </div>
                </div>

                <div className="border-border bg-background flex min-w-0 flex-col overflow-hidden rounded-xl border shadow-sm">
                    <div className="border-border-dark flex flex-wrap items-center justify-between gap-3 border-b px-3 py-2">
                        <Skeleton className="h-5 w-28" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-8 w-16 rounded-lg" />
                            <Skeleton className="h-8 w-44 rounded-lg" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 xl:grid-cols-3">
                        {CARD_SLOTS.map((card) => (
                            <CardSkeleton key={card} />
                        ))}
                    </div>

                    <div className="border-border-dark flex items-center justify-between gap-2 border-t px-3 py-2">
                        <Skeleton className="h-2.5 w-32" />
                        <Skeleton className="h-7 w-40 rounded-md" />
                    </div>
                </div>
            </div>
        </div>
    );
}

SearchResultsSkeleton.displayName = "SearchResultsSkeleton";
