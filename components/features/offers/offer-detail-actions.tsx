"use client";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { OFFER_STATUSES } from "@/lib/config/offer-tones";
import { STRIPE_COPY } from "@/lib/config/stripe";
import type { OfferStatus } from "@/lib/types";

export interface OfferDetailActionsProps {
    status: OfferStatus;
    canAccept: boolean;
    canCounter: boolean;
    canPurchase: boolean;
    purchasePending: boolean;
    onAccept: () => void;
    onCounter: () => void;
    onPurchase: () => void;
}

export function OfferDetailActions({
    status,
    canAccept,
    canCounter,
    canPurchase,
    purchasePending,
    onAccept,
    onCounter,
    onPurchase,
}: OfferDetailActionsProps) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <StatusBadge tone={OFFER_STATUSES[status].tone}>
                {OFFER_STATUSES[status].label}
            </StatusBadge>

            {canPurchase ? (
                <Button
                    variant="primary"
                    size="sm"
                    disabled={purchasePending}
                    onClick={onPurchase}
                >
                    {STRIPE_COPY.action}
                </Button>
            ) : (
                <>
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
                </>
            )}
        </div>
    );
}
