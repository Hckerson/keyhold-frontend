import {
    BadgeCheck,
    Building2,
    FileText,
    MapPin,
    Phone,
    ShieldCheck,
    type LucideIcon,
} from "lucide-react";
import {
    signalTone,
    type NotificationCadence,
    type NotificationChannel,
} from "@/lib/config/account-tones";
import type {
    AccountCredential,
    SecurityControl,
    ShareDatum,
} from "@/lib/types";
import { percentOf, sum } from "@/lib/utils";
import type { User } from "@/lib/validations/user";
import type { NotificationPreference } from "@/lib/validations/notification";
import type { NotificationType } from "@/lib/enums/enums";

const UNVERIFIED_ISSUER = "Not on file";
const IDENTITY_ISSUER = "Identity document";

export type NotificationRuleId = NotificationType;

export interface NotificationRule {
    id: NotificationRuleId;
    channel: NotificationChannel;
    title: string;
    cadence: NotificationCadence;
}

export type NotificationState = Record<NotificationRuleId, boolean>;

export const NOTIFICATION_RULES: readonly NotificationRule[] = [
    {
        id: "CONNECTION_REQUEST",
        channel: "push",
        title: "New Lead Alerts",
        cadence: "instant",
    },
    {
        id: "OFFER_RESPONSE",
        channel: "push",
        title: "Offer Activity",
        cadence: "instant",
    },
    {
        id: "VIEWING_CONFIRMATION",
        channel: "sms",
        title: "Showing Reminders",
        cadence: "instant",
    },
    {
        id: "MESSAGE_RECEIVED",
        channel: "email",
        title: "Client Messages",
        cadence: "daily",
    },
    {
        id: "STATUS_CHANGE",
        channel: "email",
        title: "Listing Milestones",
        cadence: "daily",
    },
    {
        id: "UNDER_OFFER",
        channel: "email",
        title: "Under Offer",
        cadence: "daily",
    },
];

export const EMPTY_NOTIFICATION_STATE: NotificationState =
    NOTIFICATION_RULES.reduce(
        (state, rule) => ({ ...state, [rule.id]: false }),
        {} as NotificationState,
    );

export const toNotificationState = (
    preferences: NotificationPreference[],
): NotificationState => {
    const byType = new Map(
        preferences.map((preference) => [preference.type, preference]),
    );

    return NOTIFICATION_RULES.reduce(
        (state, rule) => ({
            ...state,
            [rule.id]: byType.get(rule.id)?.enabled ?? false,
        }),
        {} as NotificationState,
    );
};

export const toNotificationPayload = (
    preferences: NotificationPreference[],
    state: NotificationState,
): NotificationPreference[] => {
    const byType = new Map(
        preferences.map((preference) => [preference.type, preference]),
    );

    return preferences.map((preference) => {
        const enabled = state[preference.type];
        return enabled === undefined
            ? preference
            : { ...(byType.get(preference.type) ?? preference), enabled };
    });
};

export const NOTIFICATION_RULE_COUNT = NOTIFICATION_RULES.length;

export const enabledNotificationCount = (state: NotificationState) =>
    NOTIFICATION_RULES.filter((rule) => state[rule.id]).length;

export const areNotificationsDirty = (
    state: NotificationState,
    baseline: NotificationState,
) => NOTIFICATION_RULES.some((rule) => state[rule.id] !== baseline[rule.id]);

export const agentCredentials = (
    user: User | undefined,
): AccountCredential[] => [
    {
        id: "email",
        label: "Email Address",
        issuer: user?.email ?? UNVERIFIED_ISSUER,
        state: user?.emailVerified ? "verified" : "missing",
        expiresInMinutes: 0,
    },
    {
        id: "phone",
        label: "Phone Number",
        issuer: user?.phoneNumber ?? UNVERIFIED_ISSUER,
        state: user?.phoneVerified ? "verified" : "missing",
        expiresInMinutes: 0,
    },
    {
        id: "identity",
        label: "Government ID",
        issuer: IDENTITY_ISSUER,
        state: user?.kycVerified ? "verified" : "missing",
        expiresInMinutes: 0,
    },
    {
        id: "licence",
        label: "Real Estate Licence",
        issuer: user?.agencyName ?? UNVERIFIED_ISSUER,
        state: user?.licenseNumber ? "verified" : "missing",
        expiresInMinutes: 0,
    },
];

export const verifiedCredentialCount = (credentials: AccountCredential[]) =>
    credentials.filter((credential) => credential.state === "verified").length;

export const AGENT_SECURITY_DIALOG = "password" as const;

export type AgentSecurityDialog = typeof AGENT_SECURITY_DIALOG;

export const SECURITY_CONTROLS: readonly SecurityControl<AgentSecurityDialog>[] =
    [
        {
            id: "password",
            label: "Password",
            caption: "Send a reset link to the email on this account",
            action: "Send link",
            state: "enabled",
        },
    ];

export interface ProfileSignal {
    id: string;
    icon: LucideIcon;
    label: string;
    impact: number;
    complete: boolean;
}

export const profileSignals = (
    user: User | undefined,
    listingCount: number,
): ProfileSignal[] => [
    {
        id: "licence",
        icon: BadgeCheck,
        label: "Licence number on file",
        impact: 24,
        complete: Boolean(user?.licenseNumber),
    },
    {
        id: "brokerage",
        icon: Building2,
        label: "Brokerage named",
        impact: 20,
        complete: Boolean(user?.agencyName),
    },
    {
        id: "identity",
        icon: ShieldCheck,
        label: "Identity verified",
        impact: 18,
        complete: Boolean(user?.kycVerified),
    },
    {
        id: "bio",
        icon: FileText,
        label: "Long-form biography",
        impact: 16,
        complete: Boolean(user?.bio),
    },
    {
        id: "contact",
        icon: Phone,
        label: "Phone reachable",
        impact: 12,
        complete: Boolean(user?.phoneNumber),
    },
    {
        id: "listings",
        icon: MapPin,
        label: "Listings published",
        impact: 10,
        complete: listingCount > 0,
    },
];

export const profileStrength = (signals: ProfileSignal[]) =>
    percentOf(
        sum(signals.filter((signal) => signal.complete).map((s) => s.impact)),
        sum(signals.map((signal) => signal.impact)),
    );

export const profileSignalShares = (signals: ProfileSignal[]): ShareDatum[] => {
    const peak = Math.max(...signals.map((signal) => signal.impact));

    return signals.map((signal) => ({
        id: signal.id,
        icon: signal.icon,
        label: signal.label,
        value: `${signal.impact}%`,
        percent: percentOf(signal.impact, peak),
        tone: signalTone(signal.complete),
    }));
};
