"use client";

import { use, useState } from "react";
import { OFFER_STATUSES } from "@/lib/config/offer-tones";
import { OfferDetailHeader } from "@/components/features/offers/offer-detail-header";
import { OfferDetailPanels } from "@/components/features/offers/offer-detail-panels";
import {
    OfferConfirmModal,
    type OfferConfirmAction,
} from "@/components/features/offers/offer-confirm-modal";
import {
    fallbackDetail,
    offerDetails,
    type ThreadMessage,
    type TimelineEntry,
} from "@/lib/data/offer-details";
import { toDigits } from "@/lib/utils";
import type { OfferStatus } from "@/lib/types";

const ACTION_DATE = "Jul 26, 2026";
const ACTION_TIME = "Just now";

export default function OfferDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const detail = offerDetails[id] ?? fallbackDetail;

    const [status, setStatus] = useState<OfferStatus>(detail.status);
    const [offerPrice, setOfferPrice] = useState(detail.offerPrice);
    const [timeline, setTimeline] = useState<TimelineEntry[]>(detail.timeline);
    const [messages, setMessages] = useState<ThreadMessage[]>(detail.messages);
    const [counterAmount, setCounterAmount] = useState("");
    const [counterNote, setCounterNote] = useState("");
    const [confirming, setConfirming] = useState<OfferConfirmAction | null>(
        null,
    );

    const closed = status === "accepted" || status === "withdrawn";
    const counterValue = Number(toDigits(counterAmount));
    const canCounter = !closed && counterValue > 0;

    const addTimelineEntry = (entry: Omit<TimelineEntry, "id">) => {
        setTimeline((prev) => [
            ...prev,
            { ...entry, id: `t${prev.length + 1}-${Date.now()}` },
        ]);
    };

    const addUserMessage = (content: string) => {
        setMessages((prev) => [
            ...prev,
            {
                id: `m${prev.length + 1}`,
                senderRole: "user",
                author: "You",
                content,
                timestamp: ACTION_TIME,
            },
        ]);
    };

    const confirmCounter = () => {
        addTimelineEntry({
            label: "You countered",
            date: ACTION_DATE,
            time: ACTION_TIME,
            amount: counterValue,
            note: counterNote || undefined,
            tone: "info",
        });
        if (counterNote) addUserMessage(counterNote);
        setOfferPrice(counterValue);
        setStatus("submitted");
        setCounterAmount("");
        setCounterNote("");
        setConfirming(null);
    };

    const confirmAccept = () => {
        addTimelineEntry({
            label: "You accepted the counter",
            date: ACTION_DATE,
            time: ACTION_TIME,
            amount: detail.counterPrice,
            tone: "success",
        });
        if (detail.counterPrice) setOfferPrice(detail.counterPrice);
        setStatus("accepted");
        setConfirming(null);
    };

    const confirmWithdraw = () => {
        addTimelineEntry({
            label: "You withdrew the offer",
            date: ACTION_DATE,
            time: ACTION_TIME,
            tone: "error",
        });
        setStatus("withdrawn");
        setConfirming(null);
    };

    return (
        <div className="space-y-3">
            <OfferDetailHeader
                detail={detail}
                status={status}
                closed={closed}
                canCounter={canCounter}
                onAccept={() => setConfirming("accept")}
                onCounter={() => setConfirming("counter")}
                onWithdraw={() => setConfirming("withdraw")}
            />

            <OfferDetailPanels
                detail={detail}
                offerPrice={offerPrice}
                timeline={timeline}
                messages={messages}
                counterAmount={counterAmount}
                counterNote={counterNote}
                closed={closed}
                statusLabel={OFFER_STATUSES[status].label}
                canSubmitCounter={canCounter}
                onCounterAmountChange={setCounterAmount}
                onCounterNoteChange={setCounterNote}
                onSubmitCounter={() => setConfirming("counter")}
                onSendMessage={addUserMessage}
            />

            <OfferConfirmModal
                action={confirming}
                address={detail.address}
                counterPrice={detail.counterPrice}
                counterValue={counterValue}
                onClose={() => setConfirming(null)}
                onAccept={confirmAccept}
                onCounter={confirmCounter}
                onWithdraw={confirmWithdraw}
            />
        </div>
    );
}
