import {
    BadgeCheck,
    Building2,
    FileText,
    MapPin,
    Phone,
    ShieldCheck,
    type LucideIcon,
} from "lucide-react";
import type { ShareDatum } from "@/components/patterns/share-row";
import {
    signalTone,
    type NotificationCadence,
    type NotificationChannel,
} from "@/lib/config/account-tones";
import type { AccountCredential, SecurityControl } from "@/lib/types";
import { percentOf, sum } from "@/lib/utils";
import type { User } from "@/lib/validations/user";

const UNVERIFIED_ISSUER = "Not on file";
const IDENTITY_ISSUER = "Identity document";

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
