import type { ReactNode } from "react";
import { PAYOUT_STATES } from "@/lib/config/payout-tones";
import type { Payout } from "@/lib/types";

export interface PaidMuteProps {
    payout: Payout;
    children: ReactNode;
}

export function PaidMute({ payout, children }: PaidMuteProps) {
    return (
        <span
            className={
                PAYOUT_STATES[payout.state].held
                    ? undefined
                    : "text-text-secondary"
            }
        >
            {children}
        </span>
    );
}

PaidMute.displayName = "PaidMute";
