import { chartToneText } from "@/lib/config/chart-tones";
import { PAYOUT_STATES } from "@/lib/config/payout-tones";
import { cn } from "@/lib/utils";
import type { PayoutState } from "@/lib/types";

export interface PayoutStateMarkProps {
    state: PayoutState;
}

export function PayoutStateMark({ state }: PayoutStateMarkProps) {
    const meta = PAYOUT_STATES[state];
    const Icon = meta.icon;

    return (
        <span className="flex items-center gap-1.5">
            <Icon
                aria-hidden="true"
                strokeWidth={1.5}
                className={cn(
                    "size-3 shrink-0",
                    meta.held
                        ? chartToneText[meta.chartTone]
                        : "text-text-muted",
                )}
            />
            <span className={meta.held ? "text-text" : "text-text-muted"}>
                {meta.label}
            </span>
        </span>
    );
}

PayoutStateMark.displayName = "PayoutStateMark";
