import { format, isToday, isTomorrow } from "date-fns";
import type {
    ActivityEntry,
    OverviewViewing,
    ViewingTiming,
} from "@/lib/types";
import { formatAge, formatCompactUsd } from "@/lib/utils";
import { minutesSince } from "@/lib/utils/elapsed";
import { VIEWING_STATUS_BY_API } from "@/lib/utils/status-maps";
import type { ConnectionListItem } from "@/lib/validations/connection-list";

const VIEWING_TIME_FORMAT = "EEE H:mm";
const VIEWING_LIMIT = 3;
const ACTIVITY_LIMIT = 5;

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
