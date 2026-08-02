"use client";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { statusTone } from "@/lib/data/offer-details";
import { OFFER_STATUS_LABEL } from "@/components/features/dashboard/offer-row";
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
            <StatusBadge tone={statusTone[status]}>
                {OFFER_STATUS_LABEL[status]}
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
