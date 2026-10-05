import { CalendarDays, CheckCircle2, Clock, Flame, Users } from "lucide-react";
import { addDays, format, startOfWeek } from "date-fns";
import { parseLocalDate } from "@/lib/utils";
import type { RescheduleDraft, SelectOption, StatDatum } from "@/lib/types";
import type { ConnectionListItem } from "@/lib/validations/connection-list";
import {
    APPOINTMENT_TYPES,
    APPOINTMENT_TYPE_KEYS,
    type AppointmentStatus,
    type AppointmentType,
} from "@/lib/config/appointment-tones";

export type CalendarViewMode = "month" | "week";

export interface Appointment {
    id: string;
    type: AppointmentType;
    status: AppointmentStatus;
    title: string;
    property: string;
    client: string;
    date: string;
    start: string;
    durationMinutes: number;
    notes: string;
}

export interface AppointmentGroup {
    date: string;
    items: Appointment[];
}

export interface AppointmentTypeShare {
    type: AppointmentType;
    label: string;
    count: number;
}

const MINUTES_PER_HOUR = 60;
const HOURS_PER_HALF_DAY = 12;
const CONFIRMED: AppointmentStatus = "confirmed";
const EMPTY_VALUE = "—";

export const SCHEDULE_ACTION = "Propose a viewing";

export const RESCHEDULE_HINT =
    "The buyer reconfirms once you propose a new slot.";

const anchorDate = () => new Date();

export const ANCHOR = {
    get year() {
        return anchorDate().getFullYear();
    },
    get month() {
        return anchorDate().getMonth();
    },
    get day() {
        return anchorDate().getDate();
    },
};

export const VIEW_MODES: { id: CalendarViewMode; label: string }[] = [
    { id: "month", label: "Day" },
    { id: "week", label: "Week" },
];

export const isoOf = (year: number, month: number, day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

export const formatDay = (iso: string) =>
    format(parseLocalDate(iso), "EEEE, MMMM d, yyyy");

export const formatGroupDay = (iso: string) =>
    format(parseLocalDate(iso), "EEE · MMM d");

export const shortDate = (date: Date) => format(date, "MMM d");

export const weekBounds = (iso: string) => {
    const start = startOfWeek(parseLocalDate(iso));
    return { start, end: addDays(start, 6) };
};

export const startMinutes = (start: string) => {
    const [hourPart, minutePart] = start.split(":");
    return Number(hourPart) * MINUTES_PER_HOUR + Number(minutePart);
};

export const formatTime = (start: string) => {
    const [hourPart, minutePart] = start.split(":");
    const hour = Number(hourPart);
    const period = hour < HOURS_PER_HALF_DAY ? "AM" : "PM";
    const display = hour % HOURS_PER_HALF_DAY || HOURS_PER_HALF_DAY;
    return `${display}:${minutePart} ${period}`;
};

export const toRescheduleDraft = (
    appointment: Appointment,
): RescheduleDraft => ({
    date: appointment.date,
    time: formatTime(appointment.start),
});

export const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / MINUTES_PER_HOUR);
    const rest = minutes % MINUTES_PER_HOUR;
    if (!hours) return `${rest}m`;
    return rest ? `${hours}h ${rest}m` : `${hours}h`;
};

export const formatHours = (minutes: number) => {
    const hours = minutes / MINUTES_PER_HOUR;
    return `${Number.isInteger(hours) ? hours : hours.toFixed(1)}h`;
};

const byStart = (a: Appointment, b: Appointment) =>
    startMinutes(a.start) - startMinutes(b.start);

export const appointmentsOn = (items: Appointment[], iso: string) =>
    items.filter((item) => item.date === iso).sort(byStart);

export const appointmentsInRange = (
    items: Appointment[],
    start: Date,
    end: Date,
) =>
    items
        .filter((item) => {
            const date = parseLocalDate(item.date);
            return date >= start && date <= end;
        })
        .sort(byStart);

export const appointmentsInView = (
    items: Appointment[],
    mode: CalendarViewMode,
    iso: string,
    start: Date,
    end: Date,
) =>
    mode === "month"
        ? appointmentsOn(items, iso)
        : appointmentsInRange(items, start, end);

export const groupAppointmentsByDate = (
    items: Appointment[],
): AppointmentGroup[] =>
    Array.from(new Set(items.map((item) => item.date))).map((date) => ({
        date,
        items: items.filter((item) => item.date === date),
    }));

export const appointmentDays = (
    items: Appointment[],
    year: number,
    month: number,
) => {
    const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
    return items
        .filter((item) => item.date.startsWith(prefix))
        .map((item) => parseLocalDate(item.date).getDate());
};

export const appointmentTypeMix = (
    items: Appointment[],
): AppointmentTypeShare[] =>
    APPOINTMENT_TYPE_KEYS.map((type) => ({
        type,
        label: APPOINTMENT_TYPES[type].label,
        count: items.filter((item) => item.type === type).length,
    }));

export const calendarLoadStats = (items: Appointment[]): StatDatum[] => {
    const bookedMinutes = items.reduce(
        (total, item) => total + item.durationMinutes,
        0,
    );
    const confirmed = items.filter((item) => item.status === CONFIRMED).length;
    const clients = new Set(items.map((item) => item.client)).size;
    const busiest = groupAppointmentsByDate(
        items,
    ).reduce<AppointmentGroup | null>(
        (peak, group) =>
            !peak || group.items.length > peak.items.length ? group : peak,
        null,
    );

    return [
        {
            id: "appointments",
            label: "Appointments",
            value: String(items.length),
            tone: "accent",
            icon: CalendarDays,
        },
        {
            id: "booked",
            label: "Booked",
            value: formatHours(bookedMinutes),
            tone: "info",
            icon: Clock,
        },
        {
            id: "confirmed",
            label: "Confirmed",
            value: `${confirmed}/${items.length}`,
            tone: "success",
            icon: CheckCircle2,
        },
        {
            id: "clients",
            label: "Clients",
            value: String(clients),
            tone: "highlight",
            icon: Users,
        },
        {
            id: "busiest",
            label: "Busiest day",
            value: busiest
                ? format(parseLocalDate(busiest.date), "EEE d")
                : EMPTY_VALUE,
            tone: "warning",
            icon: Flame,
        },
    ];
};

export const toClientOptions = (
    connections: ConnectionListItem[],
): SelectOption<string>[] =>
    connections.map((connection) => ({
        value: connection.id,
        label: `${connection.buyer.fullName} · ${connection.property.address}`,
    }));

export const CREATE_EVENT_COPY = {
    title: "Schedule a viewing",
    hint: "The client is notified and confirms one of the times you propose.",
    client: "Client and property",
    date: "Date",
    slots: "Times to propose",
    mode: "Format",
    cancel: "Not now",
    confirm: "Propose times",
    empty: "You have no active enquiries to schedule against.",
    failed: "That viewing did not reach the client.",
    retry: "Check the details and try once more.",
} as const;
