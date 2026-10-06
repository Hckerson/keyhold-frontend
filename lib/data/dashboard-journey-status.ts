import type { JourneyStatus } from "@/lib/types";
import type { ConnectionListItem } from "@/lib/validations/connection-list";
import type { Transaction } from "@/lib/validations/transaction";
import { formatWeekdayAndTime } from "@/lib/utils/format";

const nextViewing = (connections: ConnectionListItem[], now = new Date()) => {
    const upcoming = connections
        .flatMap((connection) =>
            connection.viewings
                .filter((viewing) => viewing.confirmedTime)
                .map((viewing) => ({
                    at: new Date(viewing.confirmedTime as string),
                    agent: connection.seller.fullName,
                })),
        )
        .filter((entry) => entry.at > now)
        .sort((a, b) => a.at.getTime() - b.at.getTime());

    return upcoming[0];
};

export const journeyStatus = (
    connections: ConnectionListItem[],
    purchases: Transaction[],
): JourneyStatus | null => {
    const held = purchases.find(
        (purchase) => purchase.escrowHold?.status === "HELD",
    );
    if (held) {
        return {
            title: "Funds in escrow",
            detail: `${held.property?.address ?? "Your purchase"} · awaiting release`,
        };
    }

    const viewing = nextViewing(connections);
    if (viewing) {
        return {
            title: "Next viewing",
            detail: `${viewing.agent} · ${formatWeekdayAndTime(viewing.at)}`,
        };
    }

    const countered = connections.find((connection) =>
        connection.offers.some((offer) => offer.status === "COUNTERED"),
    );
    if (countered) {
        return {
            title: "Offer countered",
            detail: `${countered.seller.fullName} · ${countered.property.address}`,
        };
    }

    const awaiting = connections.find(
        (connection) => connection.status === "PENDING",
    );
    if (awaiting) {
        return {
            title: "Awaiting the listing office",
            detail: `${awaiting.seller.fullName} · ${awaiting.property.address}`,
        };
    }

    return null;
};
