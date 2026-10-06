"use client";

import { PortalHeader } from "@/components/patterns/portal-header";
import { OfferDetailActions } from "@/components/features/offers/offer-detail-actions";
import { formatUsd } from "@/lib/utils";
import type { OfferStatus, OfferDetail } from "@/lib/types";

const BACK_TO_OFFERS = { label: "Back to offers", href: "/dashboard/offers" };

export interface OfferDetailHeaderProps {
    detail: OfferDetail;
    status: OfferStatus;
    canAccept: boolean;
    canCounter: boolean;
    canPurchase: boolean;
    purchasePending: boolean;
    onAccept: () => void;
    onCounter: () => void;
    onPurchase: () => void;
}

export function OfferDetailHeader({
    detail,
    status,
    canAccept,
    canCounter,
    canPurchase,
    purchasePending,
    onAccept,
    onCounter,
    onPurchase,
}: OfferDetailHeaderProps) {
    return (
        <PortalHeader
            title={detail.address}
            lede={`Listed at ${formatUsd(detail.listPrice)} · Agent ${detail.agent}`}
            back={BACK_TO_OFFERS}
            action={
                <OfferDetailActions
                    status={status}
                    canAccept={canAccept}
                    canCounter={canCounter}
                    canPurchase={canPurchase}
                    purchasePending={purchasePending}
                    onAccept={onAccept}
                    onCounter={onCounter}
                    onPurchase={onPurchase}
                />
            }
        />
    );
}

OfferDetailHeader.displayName = "OfferDetailHeader";
