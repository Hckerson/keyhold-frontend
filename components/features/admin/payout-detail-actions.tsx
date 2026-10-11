"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { SETTLE_TRIGGER_LABEL } from "@/lib/config/escrow-settle";
import { PAYOUT_STATES } from "@/lib/config/payout-tones";
import type { Payout } from "@/lib/types";

const DEAL_ACTION = "Open deal";

export interface PayoutDetailActionsProps {
    payout: Payout;
    onSettle: (payout: Payout) => void;
}

export function PayoutDetailActions({
    payout,
    onSettle,
}: PayoutDetailActionsProps) {
    return (
        <div className="flex w-full items-center justify-end gap-2">
            <Link href={payout.href} className={buttonVariants()}>
                {DEAL_ACTION}
            </Link>
            {PAYOUT_STATES[payout.state].settlable && (
                <Button
                    type="button"
                    emphasis="solid"
                    tone="accent"
                    onClick={() => onSettle(payout)}
                >
                    {SETTLE_TRIGGER_LABEL}
                </Button>
            )}
        </div>
    );
}

PayoutDetailActions.displayName = "PayoutDetailActions";
