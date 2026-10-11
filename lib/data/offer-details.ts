import { format } from "date-fns";
import type {
    OfferDetail,
    OfferStatus,
    ThreadMessage,
    TimelineEntry,
    TimelineTone,
} from "@/lib/types";
import {
    ENTRY_DATE_FORMAT,
    comparisonFrom,
    termsFrom,
} from "@/lib/data/offer-details-terms";
import { OFFER_STATUS_BY_API } from "@/lib/utils/status-maps";
import type { Connection } from "@/lib/validations/connection";
import type { Message } from "@/lib/validations/message";
import type { Offer } from "@/lib/validations/offer";

const ENTRY_TIME_FORMAT = "h:mm a";

const RESPONSE_TONE: Record<OfferStatus, TimelineTone> = {
    submitted: "neutral",
    countered: "info",
    accepted: "success",
    rejected: "error",
    withdrawn: "warning",
};

const RESPONSE_LABEL: Record<OfferStatus, string> = {
    submitted: "Offer submitted",
    countered: "Seller countered",
    accepted: "Offer accepted",
    rejected: "Seller declined",
    withdrawn: "Offer expired",
};

const stamp = (iso: string) => ({
    date: format(new Date(iso), ENTRY_DATE_FORMAT),
    time: format(new Date(iso), ENTRY_TIME_FORMAT),
});

export const timelineFrom = (offer: Offer): TimelineEntry[] => {
    const status = OFFER_STATUS_BY_API[offer.status];

    const entries: TimelineEntry[] = [
        {
            id: `${offer.id}-created`,
            label: "Offer submitted",
            ...stamp(offer.createdAt),
            amount: offer.offeredPrice,
            note: offer.offeredTerms,
            tone: "neutral",
        },
    ];

    if (offer.respondedAt) {
        entries.push({
            id: `${offer.id}-response`,
            label: RESPONSE_LABEL[status],
            ...stamp(offer.respondedAt),
            amount: offer.responsePrice ?? undefined,
            note: offer.responseFeedback ?? undefined,
            tone: RESPONSE_TONE[status],
        });
    }

    entries.push({
        id: `${offer.id}-expiry`,
        label: "Offer expires",
        ...stamp(offer.expiresAt),
        tone: new Date(offer.expiresAt) < new Date() ? "error" : "warning",
    });

    return entries;
};

export const threadFrom = (
    messages: Message[],
    viewerId: string | undefined,
): ThreadMessage[] =>
    [...messages]
        .sort(
            (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime(),
        )
        .map((message) => ({
            id: message.id,
            senderRole: message.senderId === viewerId ? "user" : "agent",
            author: message.sender?.fullName ?? "",
            content: message.content,
            timestamp: format(new Date(message.createdAt), ENTRY_TIME_FORMAT),
            documents: (message.attachments ?? []).map((attachment) => ({
                id: attachment.id,
                filename: attachment.filename,
                url: attachment.url,
                mimeType: attachment.mimeType,
                sizeBytes: attachment.sizeBytes,
                sharedBy: message.sender?.fullName ?? "",
                sharedAt: format(
                    new Date(attachment.createdAt),
                    ENTRY_TIME_FORMAT,
                ),
            })),
        }));

export const toOfferDetail = (
    offer: Offer,
    connection: Connection | undefined,
    messages: Message[],
    viewerId: string | undefined,
): OfferDetail => {
    const listPrice = connection?.property?.price ?? offer.offeredPrice;

    return {
        id: offer.id,
        connectionId: offer.connectionId,
        address:
            connection?.property?.address ??
            connection?.property?.title ??
            offer.property?.title ??
            "",
        listPrice,
        offerPrice: offer.offeredPrice,
        counterPrice: offer.responsePrice ?? undefined,
        status: OFFER_STATUS_BY_API[offer.status],
        agent: connection?.seller?.fullName ?? "",
        timeline: timelineFrom(offer),
        comparison: comparisonFrom(offer, listPrice),
        messages: threadFrom(messages, viewerId),
        terms: termsFrom(offer),
    };
};
