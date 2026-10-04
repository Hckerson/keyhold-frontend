import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_AGENTS = 3;

export function ModerationAgentSkeleton() {
    return (
        <div aria-busy="true" className="card-grid gap-2">
            {Array.from({ length: SKELETON_AGENTS }, (_, slot) => (
                <Skeleton key={slot} className="h-14 rounded-lg" />
            ))}
        </div>
    );
}

ModerationAgentSkeleton.displayName = "ModerationAgentSkeleton";
