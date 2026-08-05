import { StatusDot } from "@/components/patterns/status-dot";
import { VIEWING_STATUSES } from "@/lib/config/viewing-tones";
import { cn } from "@/lib/utils";
import type { ViewingStatus } from "@/lib/types";

export interface ViewingStatusMarkProps {
    status: ViewingStatus;
    className?: string;
}

export function ViewingStatusMark({
    status,
    className,
}: ViewingStatusMarkProps) {
    const meta = VIEWING_STATUSES[status];

    return (
        <span className={cn("flex min-w-0 items-center gap-1.5", className)}>
            <StatusDot tone={meta.tone} />
            <span className="text-text-secondary min-w-0 truncate text-xs">
                {meta.label}
            </span>
        </span>
    );
}

ViewingStatusMark.displayName = "ViewingStatusMark";
