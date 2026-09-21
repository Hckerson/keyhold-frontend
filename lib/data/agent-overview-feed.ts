import { format, isToday, isTomorrow } from "date-fns";
import type {
    ActivityEntry,
    ClosedSale,
    RecentLead,
    ShowingTiming,
    UpcomingShowing,
} from "@/lib/types";
import type { Lead } from "@/lib/types/lead";
import { formatAge, formatCompactUsd } from "@/lib/utils";
import { daysBetween, minutesSince } from "@/lib/utils/elapsed";
import type { ConnectionListItem } from "@/lib/validations/connection-list";
import type { Transaction } from "@/lib/validations/transaction";

export const DAYS_ON_MARKET_BENCHMARK = 60;
export const FAST_SALE_DAYS = 21;
export const SLOW_SALE_DAYS = 40;

const SHOWING_TIME_FORMAT = "EEE H:mm";
const CLOSED_DATE_FORMAT = "MMM dd";
const RECENT_LIMIT = 3;
const ACTIVITY_LIMIT = 5;
const PERCENT = 100;

export const closedSalesFrom = (sales: Transaction[]): ClosedSale[] =>
    sales
        .filter((sale) => sale.status === "COMPLETED" && sale.completedAt)
        .sort(
            (a, b) =>
                new Date(b.completedAt ?? b.updatedAt).getTime() -
                new Date(a.completedAt ?? a.updatedAt).getTime(),
        )
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
    [...leads]
        .sort((a, b) => a.lastContactMinutes - b.lastContactMinutes)
        .slice(0, RECENT_LIMIT)
        .map((lead) => ({
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
