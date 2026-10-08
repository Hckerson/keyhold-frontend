import { Skeleton } from "@/components/ui/skeleton";

export interface ConsoleSkeletonHeaderProps {
    identity?: boolean;
}

export function ConsoleSkeletonHeader({
    identity,
}: ConsoleSkeletonHeaderProps) {
    if (!identity)
        return (
            <div className="flex flex-col gap-2">
                <Skeleton className="h-7 w-56" />
                <Skeleton className="h-3 w-full max-w-md" />
            </div>
        );

    return (
        <div className="flex flex-col gap-4">
            <Skeleton className="h-4 w-24" />
            <div className="flex items-center gap-4">
                <Skeleton className="size-16 shrink-0 rounded-full" />
                <div className="flex min-w-0 flex-col gap-1.5">
                    <Skeleton className="h-7 w-56" />
                    <Skeleton className="h-4 w-72" />
                    <Skeleton className="h-4 w-20" />
                </div>
            </div>
        </div>
    );
}

ConsoleSkeletonHeader.displayName = "ConsoleSkeletonHeader";
