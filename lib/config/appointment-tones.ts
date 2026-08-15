import {
    Briefcase,
    CheckCircle2,
    Eye,
    PhoneCall,
    Search,
    type LucideIcon,
} from "lucide-react";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { DotTone } from "@/components/patterns/status-dot";

export const APPOINTMENT_TYPE_KEYS = [
    "showing",
    "meeting",
    "inspection",
    "closing",
    "follow-up",
] as const;

export type AppointmentType = (typeof APPOINTMENT_TYPE_KEYS)[number];

export const APPOINTMENT_STATUS_KEYS = [
    "confirmed",
    "tentative",
    "unconfirmed",
] as const;

export type AppointmentStatus = (typeof APPOINTMENT_STATUS_KEYS)[number];

export interface AppointmentTypeMeta {
    icon: LucideIcon;
    tone: ChartTone;
    label: string;
}

export const APPOINTMENT_TYPES: Record<AppointmentType, AppointmentTypeMeta> = {
    showing: { icon: Eye, tone: "info", label: "Showing" },
    meeting: { icon: Briefcase, tone: "neutral", label: "Meeting" },
    inspection: { icon: Search, tone: "warning", label: "Inspection" },
    closing: { icon: CheckCircle2, tone: "success", label: "Closing" },
    "follow-up": { icon: PhoneCall, tone: "accent", label: "Follow-up" },
};

export interface AppointmentStatusMeta {
    tone: DotTone;
    label: string;
}

export const APPOINTMENT_STATUSES: Record<
    AppointmentStatus,
    AppointmentStatusMeta
> = {
    confirmed: { tone: "success", label: "Confirmed" },
    tentative: { tone: "warning", label: "Tentative" },
    unconfirmed: { tone: "neutral", label: "Unconfirmed" },
};
