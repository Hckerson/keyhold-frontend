import { AgeMark } from "@/components/features/shared/age-mark";
import { payoutAgeTone, PAYOUT_STATES } from "@/lib/config/payout-tones";
import type { Payout } from "@/lib/types";

export interface PayoutHeldMarkProps {
    payout: Payout;
}

export function PayoutHeldMark({ payout }: PayoutHeldMarkProps) {
    if (!PAYOUT_STATES[payout.state].held) return null;

    return (
        <AgeMark
            minutes={payout.ageMinutes}
            tone={payoutAgeTone(payout.ageMinutes)}
        />
    );
}

PayoutHeldMark.displayName = "PayoutHeldMark";
