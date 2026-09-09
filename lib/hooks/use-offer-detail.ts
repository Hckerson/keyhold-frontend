"use client";

import { useState } from "react";
import type { OfferConfirmAction } from "@/components/features/offers/offer-confirm-modal";
import { toOfferDetail } from "@/lib/data/offer-details";
import { useConnection } from "@/lib/hooks/use-connections";
import { useConversation, useSendMessage } from "@/lib/hooks/use-messages";
import {
    useAcceptCounter,
    useAttachMilestoneDocument,
    useCreateOffer,
    useOffer,
    useOfferMilestones,
    useUpdateMilestone,
} from "@/lib/hooks/use-offers";
import type { MilestoneKind } from "@/lib/enums/enums";
import type { DealMilestone } from "@/lib/validations/offer";
import { useCheckout } from "@/lib/hooks/use-checkout";
import { useSession } from "@/lib/hooks/use-session";
import { toDigits } from "@/lib/utils";

const COUNTER_WINDOW_DAYS = 7;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function useOfferDetail(id: string) {
    const { user } = useSession();
    const offerQuery = useOffer(id);
    const offer = offerQuery.data;

    const connectionQuery = useConnection(offer?.connectionId);

    const accepted = offer?.status === "ACCEPTED";
    const milestonesQuery = useOfferMilestones(id, accepted);
    const updateMilestone = useUpdateMilestone(id);
    const attachMilestone = useAttachMilestoneDocument(id);
    const conversation = useConversation(offer?.connectionId);

    const checkout = useCheckout();
    const acceptCounter = useAcceptCounter();
    const createOffer = useCreateOffer();
    const sendMessage = useSendMessage();

    const [counterAmount, setCounterAmount] = useState("");
    const [counterNote, setCounterNote] = useState("");
    const [confirming, setConfirming] = useState<OfferConfirmAction | null>(
        null,
    );

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
    const canPurchase = status === "accepted" && isBuyer;

    const counterValue = Number(toDigits(counterAmount));
    const canCounter = Boolean(offer) && !closed && counterValue > 0;
    const canAccept = status === "countered";

    const addUserMessage = (content: string) => {
        if (!offer) return;
        sendMessage.mutate({ connectionId: offer.connectionId, content });
    };

    const confirmCounter = () => {
        if (!offer || !canCounter) return;
        createOffer.mutate(
            {
                connectionId: offer.connectionId,
                offeredPrice: counterValue,
                offeredTerms: counterNote || offer.offeredTerms,
                expiresAt: new Date(
                    Date.now() + COUNTER_WINDOW_DAYS * MS_PER_DAY,
                ).toISOString(),
            },
            {
                onSuccess: () => {
                    setCounterAmount("");
                    setCounterNote("");
                    setConfirming(null);
                },
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
        acceptCounter.mutate(offer.id, {
            onSuccess: () => setConfirming(null),
        });
    };

    const onMilestoneDate = (kind: MilestoneKind, date: string) => {
        if (!date) return;
        updateMilestone.mutate({
            kind,
            status: "SCHEDULED",
            dueAt: new Date(`${date}T00:00:00`).toISOString(),
        });
    };

    const onMilestoneToggle = (milestone: DealMilestone) =>
        updateMilestone.mutate({
            kind: milestone.kind,
            status:
                milestone.status === "COMPLETED" ? "SCHEDULED" : "COMPLETED",
        });

    const onMilestoneAttach = (kind: MilestoneKind, file: File) =>
        attachMilestone.mutate({ kind, file });

    return {
        detail,
        status,
        milestones: milestonesQuery.data ?? [],
        milestonesBusy: updateMilestone.isPending || attachMilestone.isPending,
        onMilestoneDate,
        onMilestoneToggle,
        onMilestoneAttach,
        offerPrice: offer?.offeredPrice ?? 0,
        timeline: detail?.timeline ?? [],
        messages: detail?.messages ?? [],
        counterAmount,
        counterNote,
        confirming,
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
        setConfirming,
        addUserMessage,
        confirmCounter,
        confirmAccept,
        startPurchase,
    };
}
