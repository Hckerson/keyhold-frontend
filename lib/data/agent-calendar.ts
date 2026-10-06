import { addDays, format, startOfWeek } from "date-fns";
import { parseLocalDate } from "@/lib/utils";
import type {
    Appointment,
    AppointmentGroup,
    AppointmentTypeShare,
    CalendarViewMode,
    RescheduleDraft,
    SelectOption,
} from "@/lib/types";
import type { ConnectionListItem } from "@/lib/validations/connection-list";
import {
    APPOINTMENT_TYPES,
    APPOINTMENT_TYPE_KEYS,
} from "@/lib/config/appointment-tones";

const MINUTES_PER_HOUR = 60;
const HOURS_PER_HALF_DAY = 12;

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

export const toClientOptions = (
    connections: ConnectionListItem[],
): SelectOption<string>[] =>
    connections.map((connection) => ({
        value: connection.id,
        label: `${connection.buyer.fullName} · ${connection.property.address}`,
    }));
