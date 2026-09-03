import {
    CalendarCheck,
    CalendarClock,
    Clock,
    Footprints,
    Wallet,
} from "lucide-react";
import type { ShareDatum } from "@/components/patterns/share-row";
import type { StatDatum } from "@/components/patterns/stat-cell";
import {
    TIMING_BANDS,
    TIMING_BAND_KEYS,
    VIEWING_MODES,
    VIEWING_STATUSES,
    VIEWING_STATUS_KEYS,
    timingBandOf,
} from "@/lib/config/viewing-tones";
import type { Viewing, ViewingMode } from "@/lib/types";
import { formatCompactUsd, parseLocalDate, percentOf, sum } from "@/lib/utils";
import { formatDayAndMonth } from "@/lib/utils/format";

const MS_PER_DAY = 86_400_000;
const MINUTES_PER_HOUR = 60;
const TIME_PATTERN = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;
const TODAY_LABEL = "Today";
const PAST_SUFFIX = "d ago";
const DAYS_SUFFIX = "d";
const NO_VIEWING_LABEL = "—";

export type ViewingStatusFilter = Viewing["status"] | "all";

export type ViewingModeFilter = ViewingMode | "all";

const startOfToday = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export const RESCHEDULE_HINT =
    "The agent reconfirms once you propose a new slot.";

export const TODAY = {
    get year() {
        return startOfToday().getFullYear();
    },
    get month() {
        return startOfToday().getMonth() + 1;
    },
    get day() {
        return startOfToday().getDate();
    },
};

export const VIEWING_FILTERS: { id: ViewingStatusFilter; label: string }[] = [
    { id: "all", label: "All" },
    ...VIEWING_STATUS_KEYS.filter((id) => VIEWING_STATUSES[id].scheduled).map(
        (id) => ({ id, label: VIEWING_STATUSES[id].label }),
    ),
];

export const MODE_OPTIONS: { value: ViewingModeFilter; label: string }[] = [
    { value: "all", label: "Every format" },
    { value: "in-person", label: VIEWING_MODES["in-person"].label },
    { value: "virtual", label: VIEWING_MODES.virtual.label },
    { value: "open-house", label: VIEWING_MODES["open-house"].label },
];

export interface CalendarMonth {
    year: number;
    month: number;
}

export const daysUntil = (viewing: Viewing) =>
    Math.round(
        (parseLocalDate(viewing.date).getTime() - startOfToday().getTime()) /
            MS_PER_DAY,
    );

export const startMinutes = (viewing: Viewing) => {
    const parts = TIME_PATTERN.exec(viewing.time);
    if (!parts) return 0;
    const hour = Number(parts[1]) % 12;
    const offset = parts[3].toUpperCase() === "PM" ? 12 : 0;
    return (hour + offset) * MINUTES_PER_HOUR + Number(parts[2]);
};

export const countdownLabel = (days: number) => {
    if (days === 0) return TODAY_LABEL;
    return days < 0 ? `${-days}${PAST_SUFFIX}` : `${days}${DAYS_SUFFIX}`;
};

const formatDayLabel = (date: Date) => formatDayAndMonth(date);

export const formatViewingDate = (date: string) =>
    formatDayLabel(parseLocalDate(date));

export const dayFilterLabel = (calendar: CalendarMonth, day: number) =>
    formatDayLabel(new Date(calendar.year, calendar.month, day));

export const isActive = (viewing: Viewing) =>
    VIEWING_STATUSES[viewing.status].active;

export const scheduledViewings = (viewings: Viewing[]) =>
    viewings.filter((viewing) => VIEWING_STATUSES[viewing.status].scheduled);

export const walkedViewings = (viewings: Viewing[]) =>
    viewings.filter((viewing) => viewing.status === "completed");

export const byStatus = (viewings: Viewing[], status: Viewing["status"]) =>
    viewings.filter((viewing) => viewing.status === status);

export const touringValue = (viewings: Viewing[]) =>
    sum(viewings.filter(isActive).map((viewing) => viewing.price));

export const rankViewings = (viewings: Viewing[]) =>
    [...viewings].sort(
        (a, b) =>
            Number(isActive(b)) - Number(isActive(a)) ||
            daysUntil(a) - daysUntil(b) ||
            startMinutes(a) - startMinutes(b) ||
            VIEWING_STATUSES[b.status].rank - VIEWING_STATUSES[a.status].rank,
    );

export const nextViewing = (viewings: Viewing[]) =>
    rankViewings(viewings.filter(isActive))[0];

export const matchesFilters = (
    viewing: Viewing,
    status: ViewingStatusFilter,
    mode: ViewingModeFilter,
) =>
    (status === "all" || viewing.status === status) &&
    (mode === "all" || viewing.mode === mode);

export const countByStatus = (
    viewings: Viewing[],
): Record<ViewingStatusFilter, number> => ({
    all: viewings.length,
    confirmed: byStatus(viewings, "confirmed").length,
    pending: byStatus(viewings, "pending").length,
    completed: byStatus(viewings, "completed").length,
    cancelled: byStatus(viewings, "cancelled").length,
});

const isInMonth = (date: string, calendar: CalendarMonth) => {
    const parsed = parseLocalDate(date);
    return (
        parsed.getFullYear() === calendar.year &&
        parsed.getMonth() === calendar.month
    );
};

export const markedDaysInMonth = (
    viewings: Viewing[],
    calendar: CalendarMonth,
) =>
    viewings
        .filter(
            (viewing) => isActive(viewing) && isInMonth(viewing.date, calendar),
        )
        .map((viewing) => parseLocalDate(viewing.date).getDate());

export const isOnDay = (
    viewing: Viewing,
    calendar: CalendarMonth,
    day: number,
) =>
    isInMonth(viewing.date, calendar) &&
    parseLocalDate(viewing.date).getDate() === day;

export const viewingsOnDate = (
    viewings: Viewing[],
    calendar: CalendarMonth,
    day: number | null,
) =>
    day === null
        ? []
        : viewings.filter((viewing) => isOnDay(viewing, calendar, day));

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
