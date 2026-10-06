import {
    CalendarCheck,
    CalendarClock,
    Clock,
    Footprints,
    Wallet,
} from "lucide-react";
import {
    TIMING_BANDS,
    TIMING_BAND_KEYS,
    VIEWING_STATUSES,
    VIEWING_STATUS_KEYS,
    timingBandOf,
} from "@/lib/config/viewing-tones";
import {
    byStatus,
    countByStatus,
    countdownLabel,
    daysUntil,
    nextViewing,
    touringValue,
    walkedViewings,
} from "@/lib/data/viewings";
import type { ShareDatum, StatDatum, Viewing } from "@/lib/types";
import { formatCompactUsd, percentOf } from "@/lib/utils";

const NO_VIEWING_LABEL = "—";

export const viewingStats = (viewings: Viewing[]): StatDatum[] => {
    const next = nextViewing(viewings);

    return [
        {
            id: "next",
            icon: Clock,
            label: "Next up",
            value: next ? countdownLabel(daysUntil(next)) : NO_VIEWING_LABEL,
            tone: "accent",
        },
        {
            id: "confirmed",
            icon: CalendarCheck,
            label: "Confirmed",
            value: `${byStatus(viewings, "confirmed").length}`,
            tone: "success",
        },
        {
            id: "pending",
            icon: CalendarClock,
            label: "Awaiting",
            value: `${byStatus(viewings, "pending").length}`,
            tone: "warning",
        },
        {
            id: "walked",
            icon: Footprints,
            label: "Walked",
            value: `${walkedViewings(viewings).length}`,
            tone: "info",
        },
        {
            id: "value",
            icon: Wallet,
            label: "Value touring",
            value: formatCompactUsd(touringValue(viewings)),
            tone: "highlight",
        },
    ];
};

export const statusShares = (viewings: Viewing[]): ShareDatum[] => {
    const counts = countByStatus(viewings);
    return VIEWING_STATUS_KEYS.map((id) => ({
        id,
        icon: VIEWING_STATUSES[id].icon,
        label: VIEWING_STATUSES[id].label,
        value: `${counts[id]}`,
        percent: percentOf(counts[id], viewings.length),
        tone: VIEWING_STATUSES[id].chartTone,
    }));
};

export const timingShares = (viewings: Viewing[]): ShareDatum[] =>
    TIMING_BAND_KEYS.map((id) => {
        const count = viewings.filter(
            (viewing) => timingBandOf(daysUntil(viewing)) === id,
        ).length;
        return {
            id,
            icon: TIMING_BANDS[id].icon,
            label: TIMING_BANDS[id].label,
            value: `${count}`,
            percent: percentOf(count, viewings.length),
            tone: TIMING_BANDS[id].tone,
        };
    });

export const viewingsSummary = (viewings: Viewing[]) =>
    `${byStatus(viewings, "confirmed").length} confirmed · ${walkedViewings(viewings).length} walked`;
