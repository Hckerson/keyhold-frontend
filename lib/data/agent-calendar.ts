import { addDays, format, startOfWeek } from "date-fns";
import { parseLocalDate } from "@/lib/utils";
import {
    APPOINTMENT_TYPES,
    type Appointment,
    type AppointmentType,
} from "@/components/features/agent/appointment-row";

export type CalendarViewMode = "month" | "week";

export const APPOINTMENT_TYPE_KEYS = Object.keys(APPOINTMENT_TYPES).filter(
    (key): key is AppointmentType => key in APPOINTMENT_TYPES,
);

export const ANCHOR = { year: 2024, month: 6, day: 13 };

export const VIEW_MODES: { id: CalendarViewMode; label: string }[] = [
    { id: "month", label: "Month" },
    { id: "week", label: "Week" },
];

export const isoOf = (year: number, month: number, day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

export const formatDay = (iso: string) =>
    format(parseLocalDate(iso), "EEEE, MMMM d, yyyy");

export const shortDate = (date: Date) => format(date, "MMM d");

export const weekBounds = (iso: string) => {
    const start = startOfWeek(parseLocalDate(iso));
    return { start, end: addDays(start, 6) };
};

export const groupAppointmentsByDate = (items: Appointment[]) =>
    Array.from(new Set(items.map((item) => item.date))).map((date) => ({
        date,
        items: items.filter((item) => item.date === date),
    }));

export const appointments: Appointment[] = [
    {
        id: "1",
        type: "showing",
        title: "Property Showing",
        property: "456 Oak Avenue",
        client: "John Doe",
        date: "2024-07-13",
        time: "2:00 PM",
        duration: "1 hour",
        notes: "Client interested in modern updates",
    },
    {
        id: "2",
        type: "meeting",
        title: "Client Meeting",
        property: "789 Sunset Blvd",
        client: "Sarah Johnson",
        date: "2024-07-13",
        time: "3:30 PM",
        duration: "30 mins",
        notes: "Discuss counter-offer strategy",
    },
    {
        id: "3",
        type: "inspection",
        title: "Home Inspection",
        property: "234 Oak Street",
        client: "Michael Chen",
        date: "2024-07-13",
        time: "10:00 AM",
        duration: "2 hours",
        notes: "Professional inspector scheduled",
    },
    {
        id: "4",
        type: "follow-up",
        title: "Follow-up Call",
        property: "567 Palm Drive",
        client: "Elizabeth Brown",
        date: "2024-07-11",
        time: "9:00 AM",
        duration: "15 mins",
        notes: "Check in after second viewing",
    },
    {
        id: "5",
        type: "showing",
        title: "Private Showing",
        property: "12 Canyon Ridge",
        client: "Priya Raman",
        date: "2024-07-12",
        time: "11:00 AM",
        duration: "45 mins",
        notes: "Buyer flying in from New York",
    },
    {
        id: "6",
        type: "closing",
        title: "Closing Appointment",
        property: "890 Beverly Grove",
        client: "Daniel Ortiz",
        date: "2024-07-15",
        time: "1:00 PM",
        duration: "1 hour",
        notes: "Final walkthrough before signing",
    },
    {
        id: "7",
        type: "follow-up",
        title: "Nurture Call",
        property: "234 Oak Street",
        client: "Jennifer Davis",
        date: "2024-07-16",
        time: "4:00 PM",
        duration: "20 mins",
        notes: "Send comparable sales summary",
    },
    {
        id: "8",
        type: "meeting",
        title: "Listing Presentation",
        property: "77 Hillcrest Terrace",
        client: "Robert Lang",
        date: "2024-07-20",
        time: "10:30 AM",
        duration: "1 hour",
        notes: "Bring updated pricing analysis",
    },
    {
        id: "9",
        type: "showing",
        title: "Open House",
        property: "456 Oak Avenue",
        client: "Public",
        date: "2024-07-20",
        time: "1:00 PM",
        duration: "3 hours",
        notes: "Catering and signage confirmed",
    },
    {
        id: "10",
        type: "inspection",
        title: "Appraisal Visit",
        property: "789 Sunset Blvd",
        client: "Sarah Johnson",
        date: "2024-07-26",
        time: "9:30 AM",
        duration: "90 mins",
        notes: "Lender-ordered appraisal",
    },
];

export const appointmentsOn = (iso: string) =>
    appointments.filter((item) => item.date === iso);

export const appointmentsInRange = (start: Date, end: Date) =>
    appointments.filter((item) => {
        const date = parseLocalDate(item.date);
        return date >= start && date <= end;
    });

export const markedDays = (year: number, month: number) => {
    const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
    return appointments
        .filter((item) => item.date.startsWith(prefix))
        .map((item) => Number(item.date.slice(8, 10)));
};
