import { CalendarDays, CheckCircle2, Clock, Flame, Users } from "lucide-react";
import { format } from "date-fns";
import { parseLocalDate } from "@/lib/utils";
import type { Appointment, AppointmentGroup, StatDatum } from "@/lib/types";
import type { AppointmentStatus } from "@/lib/config/appointment-tones";
import {
    formatHours,
    groupAppointmentsByDate,
} from "@/lib/data/agent-calendar";

const CONFIRMED: AppointmentStatus = "confirmed";
const EMPTY_VALUE = "—";

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
            tone: "neutral",
            icon: Clock,
        },
        {
            id: "confirmed",
            label: "Confirmed",
            value: `${confirmed}/${items.length}`,
            tone: "accent",
            icon: CheckCircle2,
        },
        {
            id: "clients",
            label: "Clients",
            value: String(clients),
            tone: "neutral",
            icon: Users,
        },
        {
            id: "busiest",
            label: "Busiest day",
            value: busiest
                ? format(parseLocalDate(busiest.date), "EEE d")
                : EMPTY_VALUE,
            tone: "neutral",
            icon: Flame,
        },
    ];
};
