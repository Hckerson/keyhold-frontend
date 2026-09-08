import type { Deal, DealStage } from "@/lib/types/deal";
import type { ConnectionListItem } from "@/lib/validations/connection-list";
import type { Transaction } from "@/lib/validations/transaction";
import { daysSince } from "@/lib/utils/elapsed";

const OPEN_OFFER_STATUSES = ["PENDING", "COUNTERED"];
const REJECTED = "REJECTED";

const NO_ACTIVITY = "No activity yet";

const stageOf = (
    connection: ConnectionListItem,
    transaction: Transaction | undefined,
): DealStage => {
    if (transaction?.status === "COMPLETED") return "closed";
    if (transaction) return "pending";
    if (connection.offers.some((offer) => offer.status !== REJECTED))
        return "offers";
    return "leads";
};

const stageStartedAt = (
    connection: ConnectionListItem,
    transaction: Transaction | undefined,
    stage: DealStage,
) => {
    if (stage === "closed")
        return (
            transaction?.completedAt ??
            transaction?.createdAt ??
            connection.createdAt
        );
    if (stage === "pending")
        return transaction?.createdAt ?? connection.createdAt;
    if (stage === "offers")
        return connection.offers[0]?.createdAt ?? connection.createdAt;
    return connection.createdAt;
};

const lastActivityOf = (connection: ConnectionListItem) => {
    const offer = connection.offers[0];
    const viewing = connection.viewings[0];
    const message = connection.messages[0];

    if (offer && OPEN_OFFER_STATUSES.includes(offer.status))
        return `Offer ${offer.status.toLowerCase()} ${daysSince(offer.createdAt)}d ago`;
    if (viewing)
        return `Viewing ${viewing.status.toLowerCase()} ${daysSince(viewing.createdAt)}d ago`;
    if (message) return `Message ${daysSince(message.createdAt)}d ago`;
    return NO_ACTIVITY;
};

export const toDeal = (
    connection: ConnectionListItem,
    sales: Transaction[],
): Deal => {
    const transaction = sales.find(
        (sale) => sale.propertyId === connection.propertyId,
    );
    const stage = stageOf(connection, transaction);
    const offer = connection.offers[0];

    return {
        id: connection.id,
        property: connection.property.address,
        buyer: connection.buyer.fullName,
        price:
            transaction?.finalPrice ??
            offer?.offeredPrice ??
            connection.property.price,
        stage,
        daysInStage: daysSince(stageStartedAt(connection, transaction, stage)),
        lastActivity: lastActivityOf(connection),
        notes: offer?.responseFeedback ?? offer?.offeredTerms ?? "",
        openOfferId:
            connection.offers.find((candidate) =>
                OPEN_OFFER_STATUSES.includes(candidate.status),
            )?.id ?? null,
    };
};

export const toDealBook = (
    connections: ConnectionListItem[],
    sales: Transaction[],
): Deal[] => connections.map((connection) => toDeal(connection, sales));
