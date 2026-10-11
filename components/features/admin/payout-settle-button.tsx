"use client";

import { Button } from "@/components/ui/button";
import {
    SETTLE_ACTION_LABEL,
    SETTLE_TRIGGER_LABEL,
} from "@/lib/config/escrow-settle";
import { PAYOUT_STATES } from "@/lib/config/payout-tones";
import type { Payout } from "@/lib/types";

export interface PayoutSettleButtonProps {
    payout: Payout;
    onSettle: (payout: Payout) => void;
}

export function PayoutSettleButton({
    payout,
    onSettle,
}: PayoutSettleButtonProps) {
    if (!PAYOUT_STATES[payout.state].settlable) return null;

    return (
        <Button
            type="button"
            emphasis="quiet"
            aria-label={`${SETTLE_ACTION_LABEL} ${payout.recipient}`}
            onClick={() => onSettle(payout)}
            className="reveal -my-1"
        >
            {SETTLE_TRIGGER_LABEL}
        </Button>
    );
}

PayoutSettleButton.displayName = "PayoutSettleButton";
