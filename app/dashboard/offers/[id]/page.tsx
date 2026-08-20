"use client";

import { use } from "react";
import { OFFER_STATUSES } from "@/lib/config/offer-tones";
import { OfferDetailHeader } from "@/components/features/offers/offer-detail-header";
import { OfferDetailPanels } from "@/components/features/offers/offer-detail-panels";
import { OfferConfirmModal } from "@/components/features/offers/offer-confirm-modal";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { useOfferDetail } from "@/lib/hooks/use-offer-detail";

export default function OfferDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const offer = useOfferDetail(id);

    if (offer.isError || (!offer.isPending && !offer.detail))
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.buyerOffer}
                onRetry={() => void offer.refetch()}
            />
        );

    if (!offer.detail || !offer.status) return null;

    return (
        <div className="space-y-3">
            <OfferDetailHeader
                detail={offer.detail}
                status={offer.status}
                canAccept={offer.canAccept}
                canCounter={offer.canCounter}
                onAccept={() => offer.setConfirming("accept")}
                onCounter={() => offer.setConfirming("counter")}
            />

            <OfferDetailPanels
                detail={offer.detail}
                offerPrice={offer.offerPrice}
                timeline={offer.timeline}
                messages={offer.messages}
                counterAmount={offer.counterAmount}
                counterNote={offer.counterNote}
                closed={offer.closed}
                statusLabel={OFFER_STATUSES[offer.status].label}
                canSubmitCounter={offer.canCounter}
                onCounterAmountChange={offer.setCounterAmount}
                onCounterNoteChange={offer.setCounterNote}
                onSubmitCounter={() => offer.setConfirming("counter")}
                onSendMessage={offer.addUserMessage}
            />

            <OfferConfirmModal
                action={offer.confirming}
                address={offer.detail.address}
                counterPrice={offer.detail.counterPrice}
                counterValue={offer.counterValue}
                onClose={() => offer.setConfirming(null)}
                onAccept={offer.confirmAccept}
                onCounter={offer.confirmCounter}
            />
        </div>
    );
}
