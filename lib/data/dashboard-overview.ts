import {
    CalendarDays,
    FileText,
    Heart,
    MessageSquare,
    Users,
} from "lucide-react";
import type { OfferBook, OfferPosition, StatDatum } from "@/lib/types";
import { BUYER_ROUTES } from "@/lib/constants";
import { OFFER_STATUS_BY_API } from "@/lib/utils/status-maps";
import type { ConnectionListItem } from "@/lib/validations/connection-list";

export const OFFER_STRONG_RATIO = 0.97;
export const OFFER_FAIR_RATIO = 0.93;

const liveOffers = (connections: ConnectionListItem[]) =>
    connections.flatMap((connection) =>
        connection.offers
            .filter(
                (offer) =>
                    offer.status === "PENDING" || offer.status === "COUNTERED",
            )
            .map((offer) => ({ connection, offer })),
    );

export const offerPositionsFrom = (
    connections: ConnectionListItem[],
): OfferPosition[] =>
    liveOffers(connections).map(({ connection, offer }) => ({
        id: offer.id,
        address: `${connection.property.address}, ${connection.property.locality}`,
        image: connection.property.images[0]?.url ?? "",
        offered: offer.offeredPrice,
        list: connection.property.price,
        status: OFFER_STATUS_BY_API[offer.status],
    }));

export const offerBookFrom = (positions: OfferPosition[]): OfferBook => ({
    label: "Offers in play",
    value: positions.reduce((total, position) => total + position.offered, 0),
    liveCount: positions.length,
    awaitingCount: positions.filter(
        (position) => position.status === "countered",
    ).length,
    href: BUYER_ROUTES.offers,
});

export const buyerStats = (
    connections: ConnectionListItem[],
    savedCount: number,
    unreadCount: number,
): StatDatum[] => [
    {
        id: "saved",
        label: "Saved",
        value: `${savedCount}`,
        icon: Heart,
        href: BUYER_ROUTES.saved,
        tone: "neutral",
    },
    {
        id: "offers",
        label: "Live offers",
        value: `${liveOffers(connections).length}`,
        icon: FileText,
        href: BUYER_ROUTES.offers,
        tone: "neutral",
    },
    {
        id: "viewings",
        label: "Viewings",
        value: `${connections.reduce(
            (total, connection) => total + connection._count.viewings,
            0,
        )}`,
        icon: CalendarDays,
        href: BUYER_ROUTES.viewings,
        tone: "neutral",
    },
    {
        id: "enquiries",
        label: "Enquiries",
        value: `${connections.length}`,
        icon: Users,
        href: BUYER_ROUTES.messages,
        tone: "neutral",
    },
    {
        id: "messages",
        label: "Unread",
        value: `${unreadCount}`,
        icon: MessageSquare,
        href: BUYER_ROUTES.messages,
        tone: "accent",
    },
];
