import { StatusDot } from "@/components/patterns/status-dot";
import { SAVED_STATUSES } from "@/lib/config/saved-tones";
import { cn } from "@/lib/utils";
import type { SavedStatus } from "@/lib/types";

export interface SavedStatusMarkProps {
    status: SavedStatus;
    className?: string;
}

export function SavedStatusMark({ status, className }: SavedStatusMarkProps) {
    const meta = SAVED_STATUSES[status];

    return (
        <span className={cn("flex min-w-0 items-center gap-1.5", className)}>
            <StatusDot tone={meta.tone} />
            <span className="text-text-secondary min-w-0 truncate text-xs">
                {meta.label}
            </span>
        </span>
    );
}

SavedStatusMark.displayName = "SavedStatusMark";
