import { format } from "date-fns";
import type { MetricItem, OfferStatus } from "@/lib/types";
import { CONTINGENCIES_META } from "@/lib/config/contingency-tones";
import type { ThreadDocument } from "@/lib/types/message";
import { formatUsd } from "@/lib/utils";
import { OFFER_STATUS_BY_API } from "@/lib/utils/status-maps";
import type { Connection } from "@/lib/validations/connection";
import type { Message } from "@/lib/validations/message";
import type { Offer } from "@/lib/validations/offer";

export const OFFER_TERMS_COPY = {
    title: "Offer Terms",
    lede: "What the buyer committed to alongside the number",
    moveIn: "Preferred move-in",
    earnest: "Earnest money",
    contingencies: "Contingencies",
    none: "Not specified",
    unconditional: "Unconditional",
} as const;

export type TimelineTone = "neutral" | "success" | "warning" | "info" | "error";

const ENTRY_DATE_FORMAT = "MMM d, yyyy";
const ENTRY_TIME_FORMAT = "h:mm a";
const NOT_SET = "—";

export interface TimelineEntry {
    id: string;
    label: string;
    date: string;
    time: string;
    amount?: number;
    note?: string;
    tone: TimelineTone;
}

export interface ComparisonRow {
    key: string;
    label: string;
    yours: string;
    counter: string;
    detail: string;
}

export interface ThreadMessage {
    id: string;
    senderRole: "user" | "agent";
    author: string;
    content: string;
    timestamp: string;
    documents: ThreadDocument[];
}

export interface OfferDetail {
    id: string;
    connectionId: string;
    address: string;
    listPrice: number;
    offerPrice: number;
    counterPrice?: number;
    status: OfferStatus;
    agent: string;
    timeline: TimelineEntry[];
    comparison: ComparisonRow[];
    messages: ThreadMessage[];
    terms: MetricItem[];
}

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

export const comparisonFrom = (
    offer: Offer,
    listPrice: number,
): ComparisonRow[] => {
    const counter = offer.responsePrice;

    return [
        {
            key: "price",
            label: "Price",
            yours: formatUsd(offer.offeredPrice),
            counter: counter ? formatUsd(counter) : NOT_SET,
            detail: `Listed at ${formatUsd(listPrice)}`,
        },
        {
            key: "terms",
            label: "Terms",
            yours: offer.offeredTerms,
            counter: offer.responseFeedback ?? NOT_SET,
            detail: "Conditions attached to each side of the negotiation",
        },
        {
            key: "expiry",
            label: "Expires",
            yours: format(new Date(offer.expiresAt), ENTRY_DATE_FORMAT),
            counter: offer.respondedAt
                ? format(new Date(offer.respondedAt), ENTRY_DATE_FORMAT)
                : NOT_SET,
            detail: "When the offer lapses, and when the seller replied",
        },
    ];
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

export const termsFrom = (offer: Offer): MetricItem[] => [
    {
        label: OFFER_TERMS_COPY.moveIn,
        value: offer.moveInDate
            ? format(new Date(offer.moveInDate), ENTRY_DATE_FORMAT)
            : OFFER_TERMS_COPY.none,
    },
    {
        label: OFFER_TERMS_COPY.earnest,
        value: offer.earnestMoney
            ? formatUsd(offer.earnestMoney)
            : OFFER_TERMS_COPY.none,
    },
    {
        label: OFFER_TERMS_COPY.contingencies,
        value:
            offer.contingencies && offer.contingencies.length > 0
                ? offer.contingencies
                      .map((id) => CONTINGENCIES_META[id].label)
                      .join(" · ")
                : OFFER_TERMS_COPY.unconditional,
    },
];

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
