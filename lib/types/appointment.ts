import type {
    AppointmentStatus,
    AppointmentType,
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
