import { StatusDot } from "@/components/patterns/status-dot";
import { PAYOUT_STATES } from "@/lib/config/payout-tones";
import { cn } from "@/lib/utils";
import type { PayoutState } from "@/lib/types";

export interface PayoutStateMarkProps {
    state: PayoutState;
    className?: string;
}

export function PayoutStateMark({ state, className }: PayoutStateMarkProps) {
    const meta = PAYOUT_STATES[state];

    return (
        <span className={cn("flex min-w-0 items-center gap-1.5", className)}>
            <StatusDot tone={meta.tone} />
            <span className="text-text-secondary min-w-0 truncate text-xs">
                {meta.label}
            </span>
        </span>
    );
}

PayoutStateMark.displayName = "PayoutStateMark";
