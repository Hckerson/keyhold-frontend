import { chartToneText } from "@/lib/config/chart-tones";
import { PAYOUT_STATES } from "@/lib/config/payout-tones";
import { cn } from "@/lib/utils";
import type { Payout } from "@/lib/types";

export interface PayoutAgentMarkProps {
    payout: Payout;
}

export function PayoutAgentMark({ payout }: PayoutAgentMarkProps) {
    const meta = PAYOUT_STATES[payout.state];
    const Icon = meta.icon;

    return (
        <span title={meta.label} className="flex min-w-0 items-center gap-2">
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
            <span className="truncate">{payout.recipient}</span>
            <span className="sr-only">, {meta.label}</span>
        </span>
    );
}

PayoutAgentMark.displayName = "PayoutAgentMark";
