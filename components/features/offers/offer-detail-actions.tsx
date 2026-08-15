"use client";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { OFFER_STATUSES } from "@/lib/config/offer-tones";
import type { OfferStatus } from "@/lib/types";

export interface OfferDetailActionsProps {
    status: OfferStatus;
    closed: boolean;
    canAccept: boolean;
    canCounter: boolean;
    onAccept: () => void;
    onCounter: () => void;
    onWithdraw: () => void;
}

export function OfferDetailActions({
    status,
    closed,
    canAccept,
    canCounter,
    onAccept,
    onCounter,
    onWithdraw,
}: OfferDetailActionsProps) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <StatusBadge tone={OFFER_STATUSES[status].tone}>
                {OFFER_STATUSES[status].label}
            </StatusBadge>
            <Button
                variant="primary"
                size="sm"
                disabled={!canAccept}
                onClick={onAccept}
            >
                Accept
            </Button>
            <Button
                variant="secondary"
                size="sm"
                disabled={!canCounter}
                onClick={onCounter}
            >
                Counter
            </Button>
            <Button
                variant="outline-danger"
                size="sm"
                disabled={closed}
                onClick={onWithdraw}
            >
                Withdraw
            </Button>
        </div>
    );
}
