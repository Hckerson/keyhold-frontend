import { cn } from "@/lib/utils";

const NO_DEALS = "—";
const DEALS_NOUN = "closed deals";

export interface UserDealMarkProps {
    deals: number;
    className?: string;
}

export function UserDealMark({ deals, className }: UserDealMarkProps) {
    if (deals === 0) {
        return (
            <span className={cn("text-text-muted text-xs", className)}>
                {NO_DEALS}
            </span>
        );
    }

    return (
        <span
            className={cn(
                "text-text-secondary text-xs font-medium tabular-nums",
                className,
            )}
        >
            {deals}
            <span className="sr-only"> {DEALS_NOUN}</span>
        </span>
    );
}

UserDealMark.displayName = "UserDealMark";
