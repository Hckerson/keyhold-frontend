import {
    CalendarDays,
    FileText,
    Heart,
    MessageSquare,
    Search,
    Users,
} from "lucide-react";
import { format, isToday, isTomorrow } from "date-fns";
import type { StatDatum } from "@/components/patterns/stat-cell";
import type {
    ActivityEntry,
    Alert,
    AlertType,
    OfferStatus,
    QuickAction,
    ViewingStatus,
} from "@/lib/types";
import { formatAge, formatCompactUsd } from "@/lib/utils";
import { minutesSince } from "@/lib/utils/elapsed";
import { BUYER_ROUTES } from "@/lib/constants";
import {
    OFFER_STATUS_BY_API,
    VIEWING_STATUS_BY_API,
} from "@/lib/utils/status-maps";
import type { ConnectionListItem } from "@/lib/validations/connection-list";
import type { Transaction } from "@/lib/validations/transaction";

export const OFFER_STRONG_RATIO = 0.97;
export const OFFER_FAIR_RATIO = 0.93;

const VIEWING_TIME_FORMAT = "EEE H:mm";
const VIEWING_LIMIT = 3;
const ACTIVITY_LIMIT = 5;
const TRIGGERED_LIMIT = 4;

export const TRIGGERED_ALERT_TYPES: AlertType[] = ["PRICE_DROP", "NEW_LISTING"];

export interface OfferBook {
    label: string;
    value: number;
    liveCount: number;
    awaitingCount: number;
    href: string;
}

export interface OfferPosition {
    id: string;
    address: string;
    image: string;
    offered: number;
    list: number;
    status: OfferStatus;
}

export type ViewingTiming = "today" | "tomorrow" | "later";

export interface OverviewViewing {
    id: string;
    address: string;
    agent: string;
    when: string;
    timing: ViewingTiming;
    status: ViewingStatus;
}

export type TaskState = "done" | "active" | "todo";

export interface JourneyTask {
    id: string;
    label: string;
    href: string;
    state: TaskState;
}

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
    href: "/dashboard/offers",
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
        href: "/dashboard/saved",
        tone: "neutral",
    },
    {
        id: "offers",
        label: "Live offers",
        value: `${liveOffers(connections).length}`,
        icon: FileText,
        href: "/dashboard/offers",
        tone: "highlight",
    },
    {
        id: "viewings",
        label: "Viewings",
        value: `${connections.reduce(
            (total, connection) => total + connection._count.viewings,
            0,
        )}`,
        icon: CalendarDays,
        href: "/dashboard/viewings",
        tone: "info",
    },
    {
        id: "enquiries",
        label: "Enquiries",
        value: `${connections.length}`,
        icon: Users,
        href: "/dashboard/messages",
        tone: "warning",
    },
    {
        id: "messages",
        label: "Unread",
        value: `${unreadCount}`,
        icon: MessageSquare,
        href: "/dashboard/messages",
        tone: "accent",
    },
];

const timingOf = (iso: string): ViewingTiming => {
    const when = new Date(iso);
    if (isToday(when)) return "today";
    if (isTomorrow(when)) return "tomorrow";
    return "later";
};

export const upcomingViewingsFrom = (
    connections: ConnectionListItem[],
): OverviewViewing[] =>
    connections
        .flatMap((connection) =>
            connection.viewings.flatMap((viewing) =>
                viewing.confirmedTime &&
                new Date(viewing.confirmedTime) >= new Date()
                    ? [
                          {
                              id: viewing.id,
                              confirmedTime: viewing.confirmedTime,
                              address: connection.property.address,
                              agent: connection.seller.fullName,
                              status: VIEWING_STATUS_BY_API[viewing.status],
                          },
                      ]
                    : [],
            ),
        )
        .sort(
            (a, b) =>
                new Date(a.confirmedTime).getTime() -
                new Date(b.confirmedTime).getTime(),
        )
        .slice(0, VIEWING_LIMIT)
        .map(({ confirmedTime, ...viewing }) => ({
            ...viewing,
            when: format(new Date(confirmedTime), VIEWING_TIME_FORMAT),
            timing: timingOf(confirmedTime),
        }));

export const buyerActivityFrom = (
    connections: ConnectionListItem[],
): ActivityEntry[] =>
    connections
        .flatMap<{ entry: ActivityEntry; at: string }>((connection) => {
            const place = connection.property.address;
            const agent = connection.seller.fullName;
            const events: { entry: ActivityEntry; at: string }[] = [];

            const offer = connection.offers[0];
            if (offer)
                events.push({
                    at: offer.respondedAt ?? offer.createdAt,
                    entry: {
                        id: offer.id,
                        type: "offer",
                        title:
                            offer.status === "COUNTERED"
                                ? "Seller countered"
                                : "Offer submitted",
                        description: `${formatCompactUsd(
                            offer.responsePrice ?? offer.offeredPrice,
                        )} on ${place}`,
                        time: formatAge(
                            minutesSince(offer.respondedAt ?? offer.createdAt),
                        ),
                    },
                });

            const viewing = connection.viewings[0];
            if (viewing)
                events.push({
                    at: viewing.createdAt,
                    entry: {
                        id: viewing.id,
                        type: "viewing",
                        title:
                            viewing.status === "CONFIRMED"
                                ? "Viewing confirmed"
                                : "Viewing requested",
                        description: `${place} with ${agent}`,
                        time: formatAge(minutesSince(viewing.createdAt)),
                    },
                });

            const message = connection.messages[0];
            if (message)
                events.push({
                    at: message.createdAt,
                    entry: {
                        id: message.id,
                        type: "message",
                        title: "New message",
                        description: `${agent} on ${place}`,
                        time: formatAge(minutesSince(message.createdAt)),
                    },
                });

            return events;
        })
        .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
        .slice(0, ACTIVITY_LIMIT)
        .map(({ entry }) => entry);

const taskState = (done: boolean, active: boolean): TaskState =>
    done ? "done" : active ? "active" : "todo";

export const journeyTasksFrom = (
    connections: ConnectionListItem[],
    savedCount: number,
    purchases: Transaction[],
): JourneyTask[] => {
    const hasEnquiry = connections.length > 0;
    const hasViewing = connections.some(
        (connection) => connection._count.viewings > 0,
    );
    const hasOffer = connections.some(
        (connection) => connection._count.offers > 0,
    );
    const hasPurchase = purchases.length > 0;

    const steps: [string, string, string, boolean][] = [
        [
            "shortlist",
            "Save homes you like",
            "/dashboard/saved",
            savedCount > 0,
        ],
        ["enquire", "Reach out to an agent", "/search", hasEnquiry],
        ["viewing", "Book a viewing", "/dashboard/viewings", hasViewing],
        ["offer", "Submit an offer", "/dashboard/offers", hasOffer],
        ["escrow", "Open the transaction", "/dashboard/offers", hasPurchase],
    ];

    const firstOpen = steps.findIndex(([, , , done]) => !done);

    return steps.map(([id, label, href, done], index) => ({
        id,
        label,
        href,
        state: taskState(done, index === firstOpen),
    }));
};

export const triggeredAlertsFrom = (alerts: Alert[]): Alert[] =>
    alerts
        .filter((alert) => TRIGGERED_ALERT_TYPES.includes(alert.type))
        .sort(
            (a, b) =>
                Number(!b.read) - Number(!a.read) ||
                a.minutesAgo - b.minutesAgo,
        )
        .slice(0, TRIGGERED_LIMIT);

export const buyerQuickActions: QuickAction[] = [
    {
        id: "browse",
        label: "Browse properties",
        href: "/search",
        icon: Search,
        tone: "accent",
    },
    {
        id: "offers",
        label: "Manage offers",
        href: BUYER_ROUTES.offers,
        icon: FileText,
        tone: "highlight",
    },
    {
        id: "viewings",
        label: "View all viewings",
        href: BUYER_ROUTES.viewings,
        icon: CalendarDays,
        tone: "info",
    },
    {
        id: "messages",
        label: "Messages",
        href: BUYER_ROUTES.messages,
        icon: MessageSquare,
        tone: "neutral",
    },
];
