import { chartToneText } from "@/lib/config/chart-tones";
import { USER_TIERS } from "@/lib/config/user-tones";
import { cn } from "@/lib/utils";
import type { UserTier } from "@/lib/types";

export interface UserTierMarkProps {
    tier: UserTier;
    className?: string;
}

export function UserTierMark({ tier, className }: UserTierMarkProps) {
    const meta = USER_TIERS[tier];

    return (
        <span
            className={cn(
                "block truncate text-xs font-medium",
                chartToneText[meta.tone],
                className,
            )}
        >
            {meta.label}
        </span>
    );
}

UserTierMark.displayName = "UserTierMark";
