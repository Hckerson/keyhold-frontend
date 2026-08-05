import { StatusDot } from "@/components/patterns/status-dot";
import { USER_STATUSES } from "@/lib/config/user-tones";
import { cn } from "@/lib/utils";
import type { UserStatus } from "@/lib/types";

export interface UserStatusMarkProps {
    status: UserStatus;
    className?: string;
}

export function UserStatusMark({ status, className }: UserStatusMarkProps) {
    const meta = USER_STATUSES[status];

    return (
        <span className={cn("flex min-w-0 items-center gap-1.5", className)}>
            <StatusDot tone={meta.tone} />
            <span className="text-text-secondary min-w-0 truncate text-xs">
                {meta.label}
            </span>
        </span>
    );
}

UserStatusMark.displayName = "UserStatusMark";
