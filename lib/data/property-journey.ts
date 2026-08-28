import { BUYER_ROUTES } from "@/lib/constants";
import { PROPERTY_STAGES } from "@/lib/config/property-journey";
import type {
    PropertyAction,
    PropertyJourney,
    PropertyStage,
    StageAction,
} from "@/lib/types";
import type { ConnectionListItem } from "@/lib/validations/connection-list";
import type { Offer } from "@/lib/validations/offer";
import type { Transaction } from "@/lib/validations/transaction";
import type { Viewing } from "@/lib/validations/viewing";

const LIVE_OFFER_STATUSES: Offer["status"][] = ["PENDING", "COUNTERED"];
const LIVE_VIEWING_STATUSES: Viewing["status"][] = ["PENDING", "CONFIRMED"];

const byNewest = <T extends { createdAt: string }>(entries: T[]) =>
    [...entries].sort(
        (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

const liveOffer = (connection: ConnectionListItem) =>
    byNewest(connection.offers).find((offer) =>
        LIVE_OFFER_STATUSES.includes(offer.status),
    );

const liveViewing = (connection: ConnectionListItem) =>
    byNewest(connection.viewings).find((viewing) =>
        LIVE_VIEWING_STATUSES.includes(viewing.status),
    );

const acceptedStage = (connection: ConnectionListItem): PropertyStage => {
    const offer = liveOffer(connection);
    if (offer) return offer.status === "COUNTERED" ? "countered" : "offered";
    return liveViewing(connection) ? "viewing" : "connected";
};

const connectionStage = (connection: ConnectionListItem): PropertyStage => {
    if (connection.status === "PENDING") return "requested";
    if (connection.status === "REJECTED") return "declined";
    return acceptedStage(connection);
};

export const propertyJourney = (
    propertyId: string,
    connections: ConnectionListItem[],
    savedIds: string[],
    purchases: Transaction[],
): PropertyJourney => {
    const connection = connections.find(
        (entry) => entry.propertyId === propertyId,
    );
    const purchase = purchases.find((entry) => entry.propertyId === propertyId);
    const saved = savedIds.includes(propertyId);

    const base = {
        connectionId: connection?.id ?? null,
        offerId: connection ? (liveOffer(connection)?.id ?? null) : null,
        transactionId: purchase?.id ?? null,
        saved,
    };

    if (purchase)
        return {
            ...base,
            stage: purchase.status === "COMPLETED" ? "owned" : "closing",
        };

    if (!connection) return { ...base, stage: "browsing" };

    return { ...base, stage: connectionStage(connection) };
};

const hrefFor = (journey: PropertyJourney) => {
    if (journey.transactionId) return BUYER_ROUTES.transactions;
    if (journey.offerId) return BUYER_ROUTES.offer(journey.offerId);
    return BUYER_ROUTES.offers;
};

const resolve = (
    action: StageAction | null,
    journey: PropertyJourney,
): PropertyAction | null => {
    if (!action) return null;
    return {
        ...action,
        href: action.kind === "track" ? hrefFor(journey) : null,
    };
};

export const journeyActions = (journey: PropertyJourney) => {
    const meta = PROPERTY_STAGES[journey.stage];
    return {
        primary: resolve(meta.primary, journey) as PropertyAction,
        secondary: resolve(meta.secondary, journey),
    };
};
