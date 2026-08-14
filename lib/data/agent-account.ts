import {
    BadgeCheck,
    FileText,
    MapPin,
    Quote,
    UserRound,
    Video,
    type LucideIcon,
} from "lucide-react";
import type { ShareDatum } from "@/components/patterns/share-row";
import {
    signalTone,
    type CredentialState,
    type NotificationCadence,
    type NotificationChannel,
    type SecurityState,
} from "@/lib/config/agent-settings-tones";
import { percentOf, sum } from "@/lib/utils";

export type NotificationRuleId =
    | "new-lead"
    | "offer-activity"
    | "showing-reminder"
    | "client-message"
    | "listing-milestone"
    | "performance-digest";

export interface NotificationRule {
    id: NotificationRuleId;
    channel: NotificationChannel;
    title: string;
    cadence: NotificationCadence;
    volume: number;
}

export type NotificationState = Record<NotificationRuleId, boolean>;

export const NOTIFICATION_RULES: readonly NotificationRule[] = [
    {
        id: "new-lead",
        channel: "push",
        title: "New Lead Alerts",
        cadence: "instant",
        volume: 34,
    },
    {
        id: "offer-activity",
        channel: "push",
        title: "Offer Activity",
        cadence: "instant",
        volume: 12,
    },
    {
        id: "showing-reminder",
        channel: "sms",
        title: "Showing Reminders",
        cadence: "instant",
        volume: 21,
    },
    {
        id: "client-message",
        channel: "email",
        title: "Client Messages",
        cadence: "daily",
        volume: 48,
    },
    {
        id: "listing-milestone",
        channel: "email",
        title: "Listing Milestones",
        cadence: "daily",
        volume: 9,
    },
    {
        id: "performance-digest",
        channel: "email",
        title: "Performance Digest",
        cadence: "weekly",
        volume: 1,
    },
];

export const INITIAL_NOTIFICATION_STATE: NotificationState = {
    "new-lead": true,
    "offer-activity": true,
    "showing-reminder": true,
    "client-message": true,
    "listing-milestone": false,
    "performance-digest": false,
};

export const NOTIFICATION_RULE_COUNT = NOTIFICATION_RULES.length;

export const PEAK_NOTIFICATION_VOLUME = Math.max(
    ...NOTIFICATION_RULES.map((rule) => rule.volume),
);

export const enabledNotificationCount = (state: NotificationState) =>
    NOTIFICATION_RULES.filter((rule) => state[rule.id]).length;

export const weeklyAlertVolume = (state: NotificationState) =>
    sum(
        NOTIFICATION_RULES.filter((rule) => state[rule.id]).map(
            (rule) => rule.volume,
        ),
    );

export const areNotificationsDirty = (state: NotificationState) =>
    NOTIFICATION_RULES.some(
        (rule) => state[rule.id] !== INITIAL_NOTIFICATION_STATE[rule.id],
    );

export interface AgentCredential {
    id: string;
    label: string;
    issuer: string;
    state: CredentialState;
    expiresInMinutes: number;
}

export const AGENT_CREDENTIALS: readonly AgentCredential[] = [
    {
        id: "dre-license",
        label: "DRE License",
        issuer: "CA Dept. of Real Estate",
        state: "verified",
        expiresInMinutes: 267_840,
    },
    {
        id: "brokerage",
        label: "Brokerage Association",
        issuer: "Agent Pro Realty",
        state: "verified",
        expiresInMinutes: 528_480,
    },
    {
        id: "eo-insurance",
        label: "E&O Insurance",
        issuer: "Meridian Underwriters",
        state: "expiring",
        expiresInMinutes: 40_320,
    },
    {
        id: "luxury-cert",
        label: "Luxury Specialist",
        issuer: "Institute for Luxury Home Marketing",
        state: "missing",
        expiresInMinutes: 0,
    },
];

export const CREDENTIAL_COUNT = AGENT_CREDENTIALS.length;

export const verifiedCredentialCount = AGENT_CREDENTIALS.filter(
    (credential) => credential.state === "verified",
).length;

export interface SecurityControl {
    id: string;
    label: string;
    caption: string;
    action: string;
    state: SecurityState;
    lastChangedMinutes?: number;
}

export const SECURITY_CONTROLS: readonly SecurityControl[] = [
    {
        id: "password",
        label: "Password",
        caption: "Rotate the credentials used to sign in to the agent portal",
        action: "Change",
        state: "enabled",
        lastChangedMinutes: 129_600,
    },
    {
        id: "two-factor",
        label: "Two-Factor Authentication",
        caption: "Require a second factor on every new device",
        action: "Enable",
        state: "recommended",
    },
    {
        id: "delete",
        label: "Delete Account",
        caption: "Unpublish every listing and erase your agent profile",
        action: "Delete",
        state: "critical",
    },
];

export interface ProfileSignal {
    id: string;
    icon: LucideIcon;
    label: string;
    impact: number;
    complete: boolean;
}

export const PROFILE_SIGNALS: readonly ProfileSignal[] = [
    {
        id: "license",
        icon: BadgeCheck,
        label: "License verified",
        impact: 20,
        complete: true,
    },
    {
        id: "headshot",
        icon: UserRound,
        label: "Professional headshot",
        impact: 18,
        complete: true,
    },
    {
        id: "testimonials",
        icon: Quote,
        label: "Client testimonials",
        impact: 18,
        complete: true,
    },
    {
        id: "bio",
        icon: FileText,
        label: "Long-form biography",
        impact: 16,
        complete: true,
    },
    {
        id: "service-area",
        icon: MapPin,
        label: "Service area mapped",
        impact: 14,
        complete: true,
    },
    {
        id: "intro-video",
        icon: Video,
        label: "Intro video",
        impact: 14,
        complete: false,
    },
];

const PEAK_SIGNAL_IMPACT = Math.max(
    ...PROFILE_SIGNALS.map((signal) => signal.impact),
);

export const PROFILE_STRENGTH = percentOf(
    sum(
        PROFILE_SIGNALS.filter((signal) => signal.complete).map(
            (signal) => signal.impact,
        ),
    ),
    sum(PROFILE_SIGNALS.map((signal) => signal.impact)),
);

export const profileSignalShares: ShareDatum[] = PROFILE_SIGNALS.map(
    (signal) => ({
        id: signal.id,
        icon: signal.icon,
        label: signal.label,
        value: `${signal.impact}%`,
        percent: percentOf(signal.impact, PEAK_SIGNAL_IMPACT),
        tone: signalTone(signal.complete),
    }),
);
