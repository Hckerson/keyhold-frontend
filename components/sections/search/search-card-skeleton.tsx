import { Skeleton } from "@/components/ui/skeleton";

export function SearchCardSkeleton() {
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

SearchCardSkeleton.displayName = "SearchCardSkeleton";
