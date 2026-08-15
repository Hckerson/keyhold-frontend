import { StatusDot } from "@/components/patterns/status-dot";
import { MODERATION_STATUSES } from "@/lib/config/moderation-tones";
import { cn } from "@/lib/utils";
import type { ModerationStatus } from "@/lib/types";

export interface ModerationStatusMarkProps {
    status: ModerationStatus;
    className?: string;
}

export function ModerationStatusMark({
    status,
    className,
}: ModerationStatusMarkProps) {
    const meta = MODERATION_STATUSES[status];

    return (
        <span className={cn("flex min-w-0 items-center gap-1.5", className)}>
            <StatusDot tone={meta.tone} />
            <span className="text-text-secondary min-w-0 truncate text-xs">
                {meta.label}
            </span>
        </span>
    );
}

ModerationStatusMark.displayName = "ModerationStatusMark";
