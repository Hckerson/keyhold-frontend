"use client";

import { useState } from "react";
import { toOfferDetail } from "@/lib/data/offer-details";
import { useConnection } from "@/lib/hooks/use-connections";
import { useConversation } from "@/lib/hooks/use-messages";
import { useOfferMessage } from "@/lib/hooks/use-offer-message";
import {
    useAcceptCounter,
    useCreateOffer,
    useOffer,
} from "@/lib/hooks/use-offers";
import { useDealMilestones } from "@/lib/hooks/use-deal-milestones";
import { useCheckout } from "@/lib/hooks/use-checkout";
import { useConfirmation } from "@/lib/hooks/use-confirmation";
import { usePurchaseEligibility } from "@/lib/hooks/use-purchase-eligibility";
import { useSession } from "@/lib/hooks/use-session";
import { toDigits } from "@/lib/utils";
import type { CreateOfferInput } from "@/lib/validations/offer";
import type { OfferConfirmAction } from "@/lib/types";

const COUNTER_WINDOW_DAYS = 7;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function useOfferDetail(id: string) {
    const { user } = useSession();
    const offerQuery = useOffer(id);
    const offer = offerQuery.data;

    const connectionQuery = useConnection(offer?.connectionId);

    const accepted = offer?.status === "ACCEPTED";
    const milestones = useDealMilestones(id, accepted);
    const conversation = useConversation(offer?.connectionId);

    const checkout = useCheckout();
    const acceptCounter = useAcceptCounter();
    const createOffer = useCreateOffer();
    const message = useOfferMessage(offer?.connectionId);
    const counterConfirmation = useConfirmation<CreateOfferInput, string>(
        createOffer,
    );
    const acceptConfirmation = useConfirmation<string>(acceptCounter);

    const [counterAmount, setCounterAmount] = useState("");
    const [counterNote, setCounterNote] = useState("");

    const confirmations = {
        accept: acceptConfirmation,
        counter: counterConfirmation,
    };
    const confirming: OfferConfirmAction | null = acceptConfirmation.open
        ? "accept"
        : counterConfirmation.open
          ? "counter"
          : null;
    const activeConfirmation = confirmations[confirming ?? "counter"];

    const detail = offer
        ? toOfferDetail(
              offer,
              connectionQuery.data,
              conversation.data ?? [],
              user?.id,
          )
        : undefined;

    const status = detail?.status;
    const closed =
        status === "accepted" ||
        status === "rejected" ||
        status === "withdrawn";

    const isBuyer =
        Boolean(user?.id) && connectionQuery.data?.buyerId === user?.id;
    const canPurchase = usePurchaseEligibility({
        accepted: status === "accepted",
        isBuyer,
        propertyId: offer?.propertyId,
    });

    const counterValue = Number(toDigits(counterAmount));
    const canCounter = Boolean(offer) && !closed && counterValue > 0;
    const canAccept = status === "countered";

    const requestConfirm = (action: OfferConfirmAction) => {
        if (offer && !activeConfirmation.pending)
            confirmations[action].request(offer.id);
    };

    const confirmCounter = () => {
        if (!offer || !canCounter) return;
        counterConfirmation.confirm(
            {
                connectionId: offer.connectionId,
                offeredPrice: counterValue,
                offeredTerms: counterNote || offer.offeredTerms,
                expiresAt: new Date(
                    new Date().getTime() + COUNTER_WINDOW_DAYS * MS_PER_DAY,
                ).toISOString(),
            },
            () => {
                setCounterAmount("");
                setCounterNote("");
            },
        );
    };

    const startPurchase = () => {
        if (!offer || !canPurchase) return;
        void checkout.open({
            offerId: offer.id,
            finalPrice: offer.offeredPrice,
            terms: offer.offeredTerms,
        });
    };

    const confirmAccept = () => {
        if (!offer || !canAccept) return;
        acceptConfirmation.confirm(offer.id);
    };

    return {
        detail,
        status,
        milestones,
        offerPrice: offer?.offeredPrice ?? 0,
        timeline: detail?.timeline ?? [],
        messages: detail?.messages ?? [],
        counterAmount,
        counterNote,
        confirming,
        confirmPending: activeConfirmation.pending,
        confirmFailed: activeConfirmation.failed,
        closed,
        counterValue,
        canCounter,
        canAccept,
        canPurchase,
        checkout,
        isPending: offerQuery.isPending,
        isError: offerQuery.isError,
        refetch: offerQuery.refetch,
        setCounterAmount,
        setCounterNote,
        requestConfirm,
        dismissConfirm: activeConfirmation.dismiss,
        addUserMessage: message.send,
        sendingMessage: message.sending,
        confirmCounter,
        confirmAccept,
        startPurchase,
    };
}
