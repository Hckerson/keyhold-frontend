"use client";

import { useState } from "react";
import type { OfferConfirmAction } from "@/components/features/offers/offer-confirm-modal";
import { toOfferDetail } from "@/lib/data/offer-details";
import { useConnection } from "@/lib/hooks/use-connections";
import { useConversation, useSendMessage } from "@/lib/hooks/use-messages";
import {
    useAcceptCounter,
    useCreateOffer,
    useOffer,
} from "@/lib/hooks/use-offers";
import { useSession } from "@/lib/hooks/use-session";
import { toDigits } from "@/lib/utils";

const COUNTER_WINDOW_DAYS = 7;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function useOfferDetail(id: string) {
    const { user } = useSession();
    const offerQuery = useOffer(id);
    const offer = offerQuery.data;

    const connectionQuery = useConnection(offer?.connectionId);
    const conversation = useConversation(offer?.connectionId);

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

    const counterValue = Number(toDigits(counterAmount));
    const canCounter = Boolean(offer) && !closed && counterValue > 0;
    const canAccept = status === "countered";

    const addUserMessage = (content: string) => {
        if (!offer) return;
        void sendMessage.mutateAsync({
            connectionId: offer.connectionId,
            content,
        });
    };

    const confirmCounter = () => {
        if (!offer || !canCounter) return;
        void createOffer
            .mutateAsync({
                connectionId: offer.connectionId,
                offeredPrice: counterValue,
                offeredTerms: counterNote || offer.offeredTerms,
                expiresAt: new Date(
                    Date.now() + COUNTER_WINDOW_DAYS * MS_PER_DAY,
                ).toISOString(),
            })
            .then(() => {
                setCounterAmount("");
                setCounterNote("");
            });
        setConfirming(null);
    };

    const confirmAccept = () => {
        if (!offer || !canAccept) return;
        void acceptCounter.mutateAsync(offer.id);
        setConfirming(null);
    };

    return {
        detail,
        status,
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
        isPending: offerQuery.isPending,
        isError: offerQuery.isError,
        refetch: offerQuery.refetch,
        setCounterAmount,
        setCounterNote,
        setConfirming,
        addUserMessage,
        confirmCounter,
        confirmAccept,
    };
}
