import { CalendarClock, FileSignature, Hourglass, Timer } from "lucide-react";
import { GAP_BANDS, gapBandOf } from "@/lib/config/offer-tones";
import { askGapPercent } from "@/lib/data/offer-request";
import type {
    OfferRequestItem,
    RequestBook,
    StatDatum,
    ViewingRequestItem,
} from "@/lib/types";
import { formatAge } from "@/lib/utils/format";

const MS_PER_HOUR = 60 * 60 * 1000;
const URGENT_HOURS = 24;
const EXPIRED_LABEL = "Expired";

export const REQUESTS_COPY = {
    title: "Requests",
    viewingsTitle: "Viewings to confirm",
    viewingsLede: "Pick one of the times the buyer proposed",
    viewingsEmpty: "No viewings waiting",
    viewingsEmptyLede:
        "When a buyer proposes times for one of your listings, they arrive here.",
    offersTitle: "Offers to answer",
    offersLede: "Accept, counter or decline before the offer lapses",
    offersEmpty: "No offers waiting",
    offersEmptyLede:
        "Offers on your listings appear here the moment a buyer submits one.",
    stale: "Proposed times have passed",
} as const;

export const VIEWING_DECLINE_COPY = {
    title: "Decline this viewing request",
    warning: {
        title: "This cancels the buyer's request",
        body: "The buyer is told you declined and the request leaves your queue. To view the property they would need to send a new request.",
    },
    staleWarning: {
        title: "Every proposed time has passed",
        body: "None of the buyer's times can be confirmed any more, so declining cancels their request. To view the property they would need to send a new request with new times.",
    },
    failure: {
        title: "The request was not declined",
        body: "It is still waiting in your queue. Try again in a moment.",
    },
    cancel: "Keep it",
    confirm: "Decline request",
} as const;

export const VIEWING_CONFIRM_COPY = {
    title: "Confirm this viewing",
    warning: {
        title: "The buyer is booked for this time",
        body: "The buyer is told the viewing is confirmed. Changing the time afterwards means rescheduling it with them.",
    },
    failure: {
        title: "The viewing was not confirmed",
        body: "It is still waiting in your queue. The time may already be taken — try again or pick another.",
    },
    cancel: "Not yet",
    confirm: "Confirm viewing",
} as const;

export const confirmableTimes = (
    request: ViewingRequestItem,
    now = new Date(),
) => request.proposedTimes.filter((at) => new Date(at) > now);

export const isStale = (request: ViewingRequestItem, now = new Date()) =>
    confirmableTimes(request, now).length === 0;

export const hoursLeft = (request: OfferRequestItem, now = new Date()) =>
    Math.floor(
        (new Date(request.expiresAt).getTime() - now.getTime()) / MS_PER_HOUR,
    );

export const isExpired = (request: OfferRequestItem, now = new Date()) =>
    hoursLeft(request, now) <= 0;

export const isUrgent = (request: OfferRequestItem) => {
    const left = hoursLeft(request);
    return left > 0 && left <= URGENT_HOURS;
};

export const expiryLabel = (request: OfferRequestItem) => {
    const left = hoursLeft(request);
    if (left <= 0) return EXPIRED_LABEL;
    if (left < URGENT_HOURS) return `${left}h left`;
    return `${Math.floor(left / URGENT_HOURS)}d left`;
};

export const offerBand = (request: OfferRequestItem) =>
    GAP_BANDS[
        gapBandOf(askGapPercent(request.listPrice, request.offeredPrice))
    ];

export const waitedLabel = (minutesAgo: number) => formatAge(minutesAgo);

const byLongestWait = <T extends { minutesAgo: number }>(entries: T[]) =>
    [...entries].sort((a, b) => b.minutesAgo - a.minutesAgo);

export const rankViewings = (requests: ViewingRequestItem[]) =>
    [...byLongestWait(requests)].sort(
        (a, b) => Number(isStale(a)) - Number(isStale(b)),
    );

export const rankOffers = (requests: OfferRequestItem[]) =>
    [...byLongestWait(requests)].sort(
        (a, b) =>
            Number(isExpired(a)) - Number(isExpired(b)) ||
            Number(isUrgent(b)) - Number(isUrgent(a)),
    );

export const pendingCount = (book: RequestBook) =>
    book.viewings.length + book.offers.length;

export const requestsSummary = (book: RequestBook) => {
    const total = pendingCount(book);
    if (total === 0) return "Nothing waiting on you";
    return `${book.viewings.length} viewings · ${book.offers.length} offers awaiting your reply`;
};

export const requestStats = (book: RequestBook): StatDatum[] => [
    {
        id: "viewings",
        icon: CalendarClock,
        label: "Viewings to confirm",
        value: `${book.viewings.length}`,
        tone: "neutral",
    },
    {
        id: "offers",
        icon: FileSignature,
        label: "Offers to answer",
        value: `${book.offers.length}`,
        tone: "neutral",
    },
    {
        id: "urgent",
        icon: Timer,
        label: "Lapsing within a day",
        value: `${book.offers.filter(isUrgent).length}`,
        tone: "error",
    },
    {
        id: "longest",
        icon: Hourglass,
        label: "Longest wait",
        value:
            pendingCount(book) === 0
                ? "—"
                : waitedLabel(
                      Math.max(
                          ...[...book.viewings, ...book.offers].map(
                              (request) => request.minutesAgo,
                          ),
                      ),
                  ),
        tone: "neutral",
    },
];
