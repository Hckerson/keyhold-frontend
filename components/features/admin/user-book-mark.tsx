import { dealsLabel } from "@/lib/data/admin-users";
import { cn, formatCompactUsd } from "@/lib/utils";

const NO_DEALS = "—";
const VOLUME_NOUN = "lifetime volume";

export interface UserBookMarkProps {
    deals: number;
    volume: number;
    className?: string;
}

export function UserBookMark({ deals, volume, className }: UserBookMarkProps) {
    if (deals === 0 && volume === 0)
        return (
            <span className={cn("text-text-muted text-xs", className)}>
                {NO_DEALS}
            </span>
        );

    return (
        <span
            className={cn(
                "flex items-baseline justify-end gap-1.5 text-xs tabular-nums",
                className,
            )}
        >
            <span className="text-text font-semibold">
                {formatCompactUsd(volume)}
                <span className="sr-only"> {VOLUME_NOUN}</span>
            </span>
            <span className="text-text-muted">{dealsLabel(deals)}</span>
        </span>
    );
}

UserBookMark.displayName = "UserBookMark";
