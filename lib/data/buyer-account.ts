import {
    BadgeCheck,
    CalendarClock,
    Phone,
    Search,
    Signpost,
    UserRound,
    type LucideIcon,
} from "lucide-react";
import { signalTone } from "@/lib/config/account-tones";
import type {
    AccountCredential,
    SecurityControl,
    ShareDatum,
} from "@/lib/types";
import { percentOf, sum } from "@/lib/utils";
import type { User } from "@/lib/validations/user";

const UNVERIFIED_ISSUER = "Not on file";
const IDENTITY_ISSUER = "Identity document";

export const SETTINGS_DIALOG_KEYS = ["password"] as const;
export type SettingsDialogKey = (typeof SETTINGS_DIALOG_KEYS)[number];

export const buyerDocuments = (user: User | undefined): AccountCredential[] => [
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
];

export const documentCount = (documents: AccountCredential[]) =>
    documents.length;

export const verifiedDocumentCount = (documents: AccountCredential[]) =>
    documents.filter((document) => document.state === "verified").length;

export const buyerSecurityControls =
    (): readonly SecurityControl<SettingsDialogKey>[] => [
        {
            id: "password",
            label: "Password",
            caption: "Send a reset link to the email on this account",
            action: "Send link",
            state: "enabled",
        },
    ];

export interface SearchSignal {
    id: string;
    icon: LucideIcon;
    label: string;
    impact: number;
    complete: boolean;
}

export const searchSignals = (
    user: User | undefined,
    savedCount: number,
    enquiryCount: number,
): SearchSignal[] => [
    {
        id: "identity",
        icon: BadgeCheck,
        label: "Identity verified",
        impact: 24,
        complete: Boolean(user?.kycVerified),
    },
    {
        id: "contact",
        icon: Phone,
        label: "Phone on file",
        impact: 20,
        complete: Boolean(user?.phoneNumber),
    },
    {
        id: "email",
        icon: Signpost,
        label: "Email verified",
        impact: 20,
        complete: Boolean(user?.emailVerified),
    },
    {
        id: "profile",
        icon: UserRound,
        label: "Profile written",
        impact: 16,
        complete: Boolean(user?.bio),
    },
    {
        id: "saved",
        icon: Search,
        label: "Homes saved",
        impact: 12,
        complete: savedCount > 0,
    },
    {
        id: "agent",
        icon: CalendarClock,
        label: "Agent contacted",
        impact: 8,
        complete: enquiryCount > 0,
    },
];

export const searchProfileStrength = (signals: SearchSignal[]) =>
    percentOf(
        sum(signals.filter((signal) => signal.complete).map((s) => s.impact)),
        sum(signals.map((signal) => signal.impact)),
    );

export const searchSignalShares = (signals: SearchSignal[]): ShareDatum[] => {
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
