import {
    Home,
    Users,
    TrendingUp,
    FileSignature,
    UserPlus,
    CalendarPlus,
} from "lucide-react";
import { format, isToday, isTomorrow } from "date-fns";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { StatDatum } from "@/components/patterns/stat-cell";
import type { ActivityEntry, QuickAction } from "@/lib/types";
import type { Lead, LeadStage } from "@/lib/types/lead";
import { formatAge, formatCompactUsd } from "@/lib/utils";
import { daysBetween, minutesSince } from "@/lib/utils/elapsed";
import type { ConnectionListItem } from "@/lib/validations/connection-list";
import type { SellerStats } from "@/lib/validations/stats";
import type { Transaction } from "@/lib/validations/transaction";

export const DAYS_ON_MARKET_BENCHMARK = 60;
export const FAST_SALE_DAYS = 21;
export const SLOW_SALE_DAYS = 40;

const SHOWING_TIME_FORMAT = "EEE H:mm";
const CLOSED_DATE_FORMAT = "MMM dd";
const RECENT_LIMIT = 3;
const ACTIVITY_LIMIT = 5;
const PERCENT = 100;

export interface PipelineSummary {
    label: string;
    value: number;
    dealCount: number;
    href: string;
}

export interface PipelineStage {
    id: string;
    name: string;
    count: number;
    value: number;
    tone: ChartTone;
}

export interface ClosedSale {
    id: string;
    address: string;
    price: number;
    closedOn: string;
    overAskPct: number;
    days: number;
}

export type ShowingTiming = "today" | "tomorrow" | "later";

export interface UpcomingShowing {
    id: string;
    address: string;
    client: string;
    when: string;
    timing: ShowingTiming;
}

export interface RecentLead {
    id: string;
    name: string;
    listingPrice: number;
    stage: LeadStage;
    received: string;
}

export const agentQuickActions: QuickAction[] = [
    {
        id: "list-property",
        label: "List a property",
        href: "/agent/listings",
        icon: Home,
        tone: "accent",
    },
    {
        id: "add-lead",
        label: "Review enquiries",
        href: "/agent/leads",
        icon: UserPlus,
        tone: "info",
    },
    {
        id: "schedule-showing",
        label: "Open the calendar",
        href: "/agent/calendar",
        icon: CalendarPlus,
        tone: "highlight",
    },
];

export const agentStats = (
    seller: SellerStats | undefined,
    leads: Lead[],
): StatDatum[] => [
    {
        id: "listings",
        label: "Active listings",
        value: `${seller?.activeListings ?? 0}`,
        icon: Home,
        href: "/agent/listings",
        tone: "accent",
    },
    {
        id: "leads",
        label: "Open enquiries",
        value: `${leads.filter((lead) => lead.stage !== "declined").length}`,
        icon: Users,
        href: "/agent/leads",
        tone: "info",
    },
    {
        id: "offers",
        label: "Open offers",
        value: `${seller?.pendingOffers ?? 0}`,
        icon: FileSignature,
        href: "/agent/pipeline",
        tone: "warning",
    },
    {
        id: "closed",
        label: "Closed volume",
        value: formatCompactUsd(seller?.closedValue ?? 0),
        icon: TrendingUp,
        href: "/agent/analytics",
        tone: "success",
    },
];

const stageValue = (connections: ConnectionListItem[]) =>
    connections.reduce(
        (total, connection) => total + connection.property.price,
        0,
    );

const salesValue = (sales: Transaction[]) =>
    sales.reduce((total, sale) => total + sale.finalPrice, 0);

export const pipelineStagesFrom = (
    connections: ConnectionListItem[],
    sales: Transaction[],
): PipelineStage[] => {
    const enquiries = connections.filter(
        (connection) => connection.status === "PENDING",
    );
    const negotiating = connections.filter(
        (connection) =>
            connection.status === "ACCEPTED" && connection._count.offers > 0,
    );
    const inProgress = sales.filter((sale) => sale.status !== "COMPLETED");
    const closed = sales.filter((sale) => sale.status === "COMPLETED");

    return [
        {
            id: "leads",
            name: "Enquiries",
            count: enquiries.length,
            value: stageValue(enquiries),
            tone: "neutral",
        },
        {
            id: "offers",
            name: "Offers",
            count: negotiating.length,
            value: stageValue(negotiating),
            tone: "info",
        },
        {
            id: "pending",
            name: "Pending",
            count: inProgress.length,
            value: salesValue(inProgress),
            tone: "warning",
        },
        {
            id: "closed",
            name: "Closed",
            count: closed.length,
            value: salesValue(closed),
            tone: "success",
        },
    ];
};

export const pipelineSummaryFrom = (
    stages: PipelineStage[],
): PipelineSummary => ({
    label: "Total pipeline",
    value: stages.reduce((total, stage) => total + stage.value, 0),
    dealCount: stages.reduce((total, stage) => total + stage.count, 0),
    href: "/agent/pipeline",
});

export const closedSalesFrom = (sales: Transaction[]): ClosedSale[] =>
    sales
        .filter((sale) => sale.status === "COMPLETED" && sale.completedAt)
        .slice(0, RECENT_LIMIT)
        .map((sale) => {
            const ask = sale.property?.price ?? 0;
            const closedAt = sale.completedAt ?? sale.updatedAt;

            return {
                id: sale.id,
                address: sale.property?.address ?? sale.property?.title ?? "",
                price: sale.finalPrice,
                closedOn: format(new Date(closedAt), CLOSED_DATE_FORMAT),
                overAskPct:
                    ask > 0
                        ? Number(
                              (
                                  ((sale.finalPrice - ask) / ask) *
                                  PERCENT
                              ).toFixed(1),
                          )
                        : 0,
                days: daysBetween(sale.createdAt, closedAt),
            };
        });

const timingOf = (iso: string): ShowingTiming => {
    const when = new Date(iso);
    if (isToday(when)) return "today";
    if (isTomorrow(when)) return "tomorrow";
    return "later";
};

export const upcomingShowingsFrom = (
    connections: ConnectionListItem[],
): UpcomingShowing[] =>
    connections
        .flatMap((connection) =>
            connection.viewings.flatMap(({ id, confirmedTime }) =>
                confirmedTime && new Date(confirmedTime) >= new Date()
                    ? [
                          {
                              id,
                              confirmedTime,
                              address: connection.property.address,
                              client: connection.buyer.fullName,
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
        .slice(0, RECENT_LIMIT)
        .map(({ id, address, client, confirmedTime }) => ({
            id,
            address,
            client,
            when: format(new Date(confirmedTime), SHOWING_TIME_FORMAT),
            timing: timingOf(confirmedTime),
        }));

export const recentLeadsFrom = (leads: Lead[]): RecentLead[] =>
    leads.slice(0, RECENT_LIMIT).map((lead) => ({
        id: lead.id,
        name: lead.name,
        listingPrice: lead.listingPrice,
        stage: lead.stage,
        received: lead.lastContact,
    }));

export const recentActivityFrom = (
    connections: ConnectionListItem[],
): ActivityEntry[] =>
    connections
        .flatMap<{ entry: ActivityEntry; at: string }>((connection) => {
            const place = connection.property.address;
            const events: { entry: ActivityEntry; at: string }[] = [];

            const offer = connection.offers[0];
            if (offer)
                events.push({
                    at: offer.createdAt,
                    entry: {
                        id: offer.id,
                        type: "offer",
                        title: "Offer received",
                        description: `${formatCompactUsd(offer.offeredPrice)} on ${place}`,
                        time: formatAge(minutesSince(offer.createdAt)),
                    },
                });

            const viewing = connection.viewings[0];
            if (viewing)
                events.push({
                    at: viewing.createdAt,
                    entry: {
                        id: viewing.id,
                        type: "showing",
                        title: "Viewing requested",
                        description: `${connection.buyer.fullName} on ${place}`,
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
                        description: `${connection.buyer.fullName} on ${place}`,
                        time: formatAge(minutesSince(message.createdAt)),
                    },
                });

            return events;
        })
        .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
        .slice(0, ACTIVITY_LIMIT)
        .map(({ entry }) => entry);
