import { Mail, MessageSquare, Smartphone, type LucideIcon } from "lucide-react";
import type { DotTone } from "@/components/patterns/status-dot";
import type { ChartTone } from "@/lib/config/chart-tones";

export const NOTIFICATION_CHANNEL_KEYS = ["push", "email", "sms"] as const;
export type NotificationChannel = (typeof NOTIFICATION_CHANNEL_KEYS)[number];

export interface NotificationChannelMeta {
    label: string;
    icon: LucideIcon;
    tone: ChartTone;
}

export const NOTIFICATION_CHANNELS: Record<
    NotificationChannel,
    NotificationChannelMeta
> = {
    push: { label: "Push", icon: Smartphone, tone: "accent" },
    email: { label: "Email", icon: Mail, tone: "info" },
    sms: { label: "SMS", icon: MessageSquare, tone: "highlight" },
};

export const NOTIFICATION_CADENCE_KEYS = [
    "instant",
    "daily",
    "weekly",
] as const;
export type NotificationCadence = (typeof NOTIFICATION_CADENCE_KEYS)[number];

export interface NotificationCadenceMeta {
    label: string;
    tone: DotTone;
    chartTone: ChartTone;
}

export const NOTIFICATION_CADENCES: Record<
    NotificationCadence,
    NotificationCadenceMeta
> = {
    instant: { label: "Instant", tone: "success", chartTone: "success" },
    daily: { label: "Daily", tone: "info", chartTone: "info" },
    weekly: { label: "Weekly", tone: "neutral", chartTone: "neutral" },
};

export const NOTIFICATION_MUTED_LABEL = "Muted";

export const CREDENTIAL_STATE_KEYS = [
    "verified",
    "expiring",
    "missing",
] as const;
export type CredentialState = (typeof CREDENTIAL_STATE_KEYS)[number];

export interface CredentialStateMeta {
    label: string;
    tone: DotTone;
}

export const CREDENTIAL_STATES: Record<CredentialState, CredentialStateMeta> = {
    verified: { label: "Verified", tone: "success" },
    expiring: { label: "Expiring", tone: "warning" },
    missing: { label: "Missing", tone: "error" },
};

export const SECURITY_STATE_KEYS = [
    "enabled",
    "recommended",
    "critical",
] as const;
export type SecurityState = (typeof SECURITY_STATE_KEYS)[number];

export interface SecurityStateMeta {
    label: string;
    tone: DotTone;
    danger: boolean;
}

export const SECURITY_STATES: Record<SecurityState, SecurityStateMeta> = {
    enabled: { label: "Enabled", tone: "success", danger: false },
    recommended: { label: "Recommended", tone: "warning", danger: false },
    critical: { label: "Irreversible", tone: "error", danger: true },
};

export const NEVER_CHANGED_LABEL = "Never";

interface ToneFloor {
    floor: number;
    tone: ChartTone;
}

const STRENGTH_FLOORS: ToneFloor[] = [
    { floor: 90, tone: "success" },
    { floor: 70, tone: "accent" },
    { floor: 50, tone: "warning" },
];

export const strengthTone = (percent: number): ChartTone =>
    STRENGTH_FLOORS.find((band) => percent >= band.floor)?.tone ?? "error";

export const signalTone = (complete: boolean): ChartTone =>
    complete ? "accent" : "warning";

export const CREDENTIAL_RENEWAL_SLA_MINUTES = 86_400;

export const expiryTone = (minutes: number): ChartTone => {
    if (minutes < CREDENTIAL_RENEWAL_SLA_MINUTES / 3) return "error";
    return minutes < CREDENTIAL_RENEWAL_SLA_MINUTES ? "warning" : "success";
};

export const RESPONSE_TARGET_HOURS = 4;

export const responseTone = (hours: number): ChartTone => {
    if (!Number.isFinite(hours) || hours <= 0) return "neutral";
    if (hours <= RESPONSE_TARGET_HOURS / 2) return "success";
    return hours <= RESPONSE_TARGET_HOURS ? "warning" : "error";
};
