import { CalendarDays, CheckCircle2, Clock, Flame, Users } from "lucide-react";
import { addDays, format, startOfWeek } from "date-fns";
import { parseLocalDate } from "@/lib/utils";
import type { StatDatum } from "@/components/patterns/stat-cell";
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
    share: number;
}

const MINUTES_PER_HOUR = 60;
const HOURS_PER_HALF_DAY = 12;
const FULL_PERCENT = 100;
const CONFIRMED: AppointmentStatus = "confirmed";
const EMPTY_VALUE = "—";

export const DURATION_SCALE_MINUTES = 180;

export const SCHEDULE_ACTION = "Schedule Appointment";

export const ANCHOR = { year: 2024, month: 6, day: 13 };

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

export const durationShare = (minutes: number) =>
    Math.min(FULL_PERCENT, (minutes / DURATION_SCALE_MINUTES) * FULL_PERCENT);

export const appointments: Appointment[] = [
    {
        id: "1",
        type: "showing",
        status: "confirmed",
        title: "Property Showing",
        property: "456 Oak Avenue",
        client: "John Doe",
        date: "2024-07-13",
        start: "14:00",
        durationMinutes: 60,
        notes: "Client interested in modern updates",
    },
    {
        id: "2",
        type: "meeting",
        status: "tentative",
        title: "Client Meeting",
        property: "789 Sunset Blvd",
        client: "Sarah Johnson",
        date: "2024-07-13",
        start: "15:30",
        durationMinutes: 30,
        notes: "Discuss counter-offer strategy",
    },
    {
        id: "3",
        type: "inspection",
        status: "confirmed",
        title: "Home Inspection",
        property: "234 Oak Street",
        client: "Michael Chen",
        date: "2024-07-13",
        start: "10:00",
        durationMinutes: 120,
        notes: "Professional inspector scheduled, meet on site fifteen minutes early to open the lockbox",
    },
    {
        id: "4",
        type: "follow-up",
        status: "unconfirmed",
        title: "Follow-up Call",
        property: "567 Palm Drive",
        client: "Elizabeth Brown",
        date: "2024-07-11",
        start: "09:00",
        durationMinutes: 15,
        notes: "Check in after second viewing",
    },
    {
        id: "5",
        type: "showing",
        status: "confirmed",
        title: "Private Showing",
        property: "12 Canyon Ridge",
        client: "Priya Raman",
        date: "2024-07-12",
        start: "11:00",
        durationMinutes: 45,
        notes: "Buyer flying in from New York",
    },
    {
        id: "6",
        type: "closing",
        status: "confirmed",
        title: "Closing Appointment",
        property: "890 Beverly Grove",
        client: "Daniel Ortiz",
        date: "2024-07-15",
        start: "13:00",
        durationMinutes: 60,
        notes: "Final walkthrough before signing",
    },
    {
        id: "7",
        type: "follow-up",
        status: "tentative",
        title: "Nurture Call",
        property: "234 Oak Street",
        client: "Jennifer Davis",
        date: "2024-07-16",
        start: "16:00",
        durationMinutes: 20,
        notes: "Send comparable sales summary",
    },
    {
        id: "8",
        type: "meeting",
        status: "confirmed",
        title: "Listing Presentation",
        property: "77 Hillcrest Terrace",
        client: "Robert Lang",
        date: "2024-07-20",
        start: "10:30",
        durationMinutes: 60,
        notes: "Bring updated pricing analysis",
    },
    {
        id: "9",
        type: "showing",
        status: "confirmed",
        title: "Open House",
        property: "456 Oak Avenue",
        client: "Public",
        date: "2024-07-20",
        start: "13:00",
        durationMinutes: 180,
        notes: "Catering and signage confirmed",
    },
    {
        id: "10",
        type: "inspection",
        status: "unconfirmed",
        title: "Appraisal Visit",
        property: "789 Sunset Blvd",
        client: "Sarah Johnson",
        date: "2024-07-26",
        start: "09:30",
        durationMinutes: 90,
        notes: "Lender-ordered appraisal",
    },
    {
        id: "11",
        type: "showing",
        status: "confirmed",
        title: "Twilight Tour",
        property: "18 Marina Vista",
        client: "Nora Whitfield",
        date: "2024-07-09",
        start: "17:30",
        durationMinutes: 45,
        notes: "Golden hour walkthrough of the terrace",
    },
    {
        id: "12",
        type: "meeting",
        status: "confirmed",
        title: "Buyer Consultation",
        property: "Downtown Office",
        client: "Aaron Diaz",
        date: "2024-07-10",
        start: "09:00",
        durationMinutes: 45,
        notes: "Review financing options and search criteria",
    },
];

const byStart = (first: Appointment, second: Appointment) =>
    first.date.localeCompare(second.date) ||
    startMinutes(first.start) - startMinutes(second.start);

export const appointmentsOn = (iso: string) =>
    appointments.filter((item) => item.date === iso).sort(byStart);

export const appointmentsInRange = (start: Date, end: Date) =>
    appointments
        .filter((item) => {
            const date = parseLocalDate(item.date);
            return date >= start && date <= end;
        })
        .sort(byStart);

export const appointmentsInView = (
    mode: CalendarViewMode,
    iso: string,
    start: Date,
    end: Date,
) => (mode === "month" ? appointmentsOn(iso) : appointmentsInRange(start, end));

export const groupAppointmentsByDate = (
    items: Appointment[],
): AppointmentGroup[] =>
    Array.from(new Set(items.map((item) => item.date))).map((date) => ({
        date,
        items: items.filter((item) => item.date === date),
    }));

export const appointmentDays = (year: number, month: number) => {
    const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
    return appointments
        .filter((item) => item.date.startsWith(prefix))
        .map((item) => parseLocalDate(item.date).getDate());
};

export const appointmentTypeMix = (
    items: Appointment[],
): AppointmentTypeShare[] => {
    const counts = APPOINTMENT_TYPE_KEYS.map((type) => ({
        type,
        label: APPOINTMENT_TYPES[type].label,
        count: items.filter((item) => item.type === type).length,
    }));
    const peak = counts.reduce((max, entry) => Math.max(max, entry.count), 0);

    return counts.map((entry) => ({
        ...entry,
        share: peak ? (entry.count / peak) * FULL_PERCENT : 0,
    }));
};

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
