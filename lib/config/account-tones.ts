import {
    Activity,
    Mail,
    MessageSquare,
    Smartphone,
    UserRound,
    type LucideIcon,
} from "lucide-react";
import type { ChartTone } from "@/lib/config/chart-tones";
import type {
    CredentialState,
    PrivacyScope,
    SecurityState,
    StatusTone,
} from "@/lib/types";

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
    email: { label: "Email", icon: Mail, tone: "neutral" },
    sms: { label: "SMS", icon: MessageSquare, tone: "neutral" },
};

export const NOTIFICATION_CADENCE_KEYS = [
    "instant",
    "daily",
    "weekly",
] as const;
export type NotificationCadence = (typeof NOTIFICATION_CADENCE_KEYS)[number];

export interface NotificationCadenceMeta {
    label: string;
    tone: StatusTone;
    chartTone: ChartTone;
}

export const NOTIFICATION_CADENCES: Record<
    NotificationCadence,
    NotificationCadenceMeta
> = {
    instant: { label: "Instant", tone: "success", chartTone: "accent" },
    daily: { label: "Daily", tone: "info", chartTone: "neutral" },
    weekly: { label: "Weekly", tone: "neutral", chartTone: "neutral" },
};

export const NOTIFICATION_MUTED_LABEL = "Muted";

export interface CredentialStateMeta {
    label: string;
    tone: StatusTone;
}

export const CREDENTIAL_STATES: Record<CredentialState, CredentialStateMeta> = {
    verified: { label: "Verified", tone: "success" },
    expiring: { label: "Expiring", tone: "warning" },
    missing: { label: "Missing", tone: "error" },
};

export interface SecurityStateMeta {
    label: string;
    tone: StatusTone;
    danger: boolean;
}

export const SECURITY_STATES: Record<SecurityState, SecurityStateMeta> = {
    enabled: { label: "Enabled", tone: "success", danger: false },
    recommended: { label: "Recommended", tone: "warning", danger: false },
    critical: { label: "Irreversible", tone: "error", danger: true },
};

export const NEVER_CHANGED_LABEL = "Never";

export interface PrivacyScopeMeta {
    label: string;
    icon: LucideIcon;
    tone: ChartTone;
}

export const PRIVACY_SCOPES: Record<PrivacyScope, PrivacyScopeMeta> = {
    profile: { label: "Profile", icon: UserRound, tone: "accent" },
    activity: { label: "Activity", icon: Activity, tone: "neutral" },
    contact: { label: "Contact", icon: Mail, tone: "neutral" },
};

export const PRIVACY_SHARED_LABEL = "Shared";
export const PRIVACY_WITHHELD_LABEL = "Private";

interface ToneFloor {
    floor: number;
    tone: ChartTone;
}

const STRENGTH_FLOORS: ToneFloor[] = [
    { floor: 90, tone: "accent" },
    { floor: 70, tone: "accent" },
    { floor: 50, tone: "neutral" },
];

export const strengthTone = (percent: number): ChartTone =>
    STRENGTH_FLOORS.find((band) => percent >= band.floor)?.tone ?? "error";

export const signalTone = (complete: boolean): ChartTone =>
    complete ? "accent" : "neutral";

export const CREDENTIAL_RENEWAL_SLA_MINUTES = 86_400;

export const expiryTone = (minutes: number): ChartTone => {
    if (minutes < CREDENTIAL_RENEWAL_SLA_MINUTES / 3) return "error";
    return minutes < CREDENTIAL_RENEWAL_SLA_MINUTES ? "neutral" : "accent";
};

export const RESPONSE_TARGET_HOURS = 4;

export const responseTone = (hours: number): ChartTone => {
    if (!Number.isFinite(hours) || hours <= 0) return "neutral";
    if (hours <= RESPONSE_TARGET_HOURS / 2) return "accent";
    return hours <= RESPONSE_TARGET_HOURS ? "neutral" : "error";
};
