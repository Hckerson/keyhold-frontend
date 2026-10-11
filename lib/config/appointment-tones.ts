import {
    CalendarCheck,
    CalendarClock,
    CircleCheck,
    CircleX,
    DoorOpen,
    Users,
    Video,
    type LucideIcon,
} from "lucide-react";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { ViewingMode, ViewingStatus } from "@/lib/types/viewing";
import type { StatusTone } from "@/lib/types";

export const APPOINTMENT_TYPE_KEYS: ViewingMode[] = [
    "in-person",
    "virtual",
    "open-house",
];

export type AppointmentType = ViewingMode;

export const APPOINTMENT_STATUS_KEYS: ViewingStatus[] = [
    "confirmed",
    "pending",
    "completed",
    "cancelled",
];

export type AppointmentStatus = ViewingStatus;

export interface AppointmentTypeMeta {
    icon: LucideIcon;
    tone: ChartTone;
    label: string;
}

export const APPOINTMENT_TYPES: Record<AppointmentType, AppointmentTypeMeta> = {
    "in-person": { icon: DoorOpen, tone: "accent", label: "In person" },
    virtual: { icon: Video, tone: "neutral", label: "Virtual" },
    "open-house": { icon: Users, tone: "neutral", label: "Open house" },
};

export interface AppointmentStatusMeta {
    icon: LucideIcon;
    tone: StatusTone;
    label: string;
}

export const APPOINTMENT_STATUSES: Record<
    AppointmentStatus,
    AppointmentStatusMeta
> = {
    confirmed: {
        icon: CalendarCheck,
        tone: "success",
        label: "Confirmed",
    },
    pending: {
        icon: CalendarClock,
        tone: "warning",
        label: "Awaiting confirmation",
    },
    completed: { icon: CircleCheck, tone: "info", label: "Walked" },
    cancelled: { icon: CircleX, tone: "neutral", label: "Cancelled" },
};
