import { chartToneText } from "@/lib/config/chart-tones";
import { USER_ROLES } from "@/lib/config/user-tones";
import { cn } from "@/lib/utils";
import type { ManagedUserRole } from "@/lib/types";

export interface UserRoleMarkProps {
    role: ManagedUserRole;
    className?: string;
}

export function UserRoleMark({ role, className }: UserRoleMarkProps) {
    const meta = USER_ROLES[role];

    return (
        <span
            className={cn(
                "block truncate font-mono text-[10px] font-medium tracking-wide uppercase",
                chartToneText[meta.tone],
                className,
            )}
        >
            {meta.label}
        </span>
    );
}

UserRoleMark.displayName = "UserRoleMark";
