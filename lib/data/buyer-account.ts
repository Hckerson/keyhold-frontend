import {
    BadgeCheck,
    CalendarClock,
    Eye,
    MapPin,
    Phone,
    Search,
    Signpost,
    UserRound,
    Wallet,
    type LucideIcon,
} from "lucide-react";
import type { ShareDatum } from "@/components/patterns/share-row";
import { signalTone } from "@/lib/config/account-tones";
import type {
    AccountCredential,
    PrivacyControl,
    SecurityControl,
} from "@/lib/types";
import { percentOf, sum } from "@/lib/utils";

export const SETTINGS_DIALOG_KEYS = [
    "password",
    "two-factor",
    "delete",
] as const;
export type SettingsDialogKey = (typeof SETTINGS_DIALOG_KEYS)[number];

export const BUYER_DOCUMENTS: readonly AccountCredential[] = [
    {
        id: "pre-approval",
        label: "Pre-Approval Letter",
        issuer: "First Republic Bank",
        state: "verified",
        expiresInMinutes: 64_800,
    },
    {
        id: "proof-of-funds",
        label: "Proof of Funds",
        issuer: "Charles Schwab",
        state: "expiring",
        expiresInMinutes: 25_920,
    },
    {
        id: "identity",
        label: "Government ID",
        issuer: "CA Dept. of Motor Vehicles",
        state: "verified",
        expiresInMinutes: 892_800,
    },
    {
        id: "email",
        label: "Email Address",
        issuer: "john@example.com",
        state: "verified",
        expiresInMinutes: 525_600,
    },
    {
        id: "phone",
        label: "Phone Number",
        issuer: "(310) 555-0123",
        state: "missing",
        expiresInMinutes: 0,
    },
];

export const DOCUMENT_COUNT = BUYER_DOCUMENTS.length;

export const verifiedDocumentCount = BUYER_DOCUMENTS.filter(
    (document) => document.state === "verified",
).length;

export const buyerSecurityControls = (
    twoFactorEnabled: boolean,
): readonly SecurityControl<SettingsDialogKey>[] => [
    {
        id: "password",
        label: "Password",
        caption: "Rotate the password you use to sign in to the dashboard",
        action: "Change",
        state: "enabled",
        lastChangedMinutes: 86_400,
    },
    {
        id: "two-factor",
        label: "Two-Factor Authentication",
        caption: "Require a second factor on every new device",
        action: twoFactorEnabled ? "Disable" : "Enable",
        state: twoFactorEnabled ? "enabled" : "recommended",
    },
    {
        id: "delete",
        label: "Delete Account",
        caption: "Erase your saved searches, offers and viewing history",
        action: "Delete",
        state: "critical",
    },
];

export type PrivacyControlId =
    | "profile-visibility"
    | "activity-sharing"
    | "contact-sharing";

export type PrivacyState = Record<PrivacyControlId, boolean>;

export const PRIVACY_CONTROLS: readonly PrivacyControl<PrivacyControlId>[] = [
    {
        id: "profile-visibility",
        icon: Eye,
        label: "Profile visible to agents",
        audience: "Verified agents",
        scope: "profile",
    },
    {
        id: "activity-sharing",
        icon: Signpost,
        label: "Search activity sharing",
        audience: "Recommendation engine",
        scope: "activity",
    },
    {
        id: "contact-sharing",
        icon: Phone,
        label: "Contact details on enquiry",
        audience: "Listing agents",
        scope: "contact",
    },
];

export const PRIVACY_CONTROL_COUNT = PRIVACY_CONTROLS.length;

export const INITIAL_PRIVACY_STATE: PrivacyState = {
    "profile-visibility": true,
    "activity-sharing": false,
    "contact-sharing": true,
};

export const sharedAudienceCount = (state: PrivacyState) =>
    PRIVACY_CONTROLS.filter((control) => state[control.id]).length;

export const isPrivacyDirty = (state: PrivacyState) =>
    PRIVACY_CONTROLS.some(
        (control) => state[control.id] !== INITIAL_PRIVACY_STATE[control.id],
    );

export interface SearchSignal {
    id: string;
    icon: LucideIcon;
    label: string;
    impact: number;
    complete: boolean;
}

export const SEARCH_SIGNALS: readonly SearchSignal[] = [
    {
        id: "budget",
        icon: Wallet,
        label: "Budget range set",
        impact: 22,
        complete: true,
    },
    {
        id: "location",
        icon: MapPin,
        label: "Preferred location",
        impact: 20,
        complete: true,
    },
    {
        id: "pre-approval",
        icon: BadgeCheck,
        label: "Pre-approval on file",
        impact: 20,
        complete: true,
    },
    {
        id: "saved-searches",
        icon: Search,
        label: "Saved searches tuned",
        impact: 16,
        complete: true,
    },
    {
        id: "availability",
        icon: CalendarClock,
        label: "Tour availability",
        impact: 12,
        complete: false,
    },
    {
        id: "agent",
        icon: UserRound,
        label: "Buying agent linked",
        impact: 10,
        complete: false,
    },
];

const PEAK_SIGNAL_IMPACT = Math.max(
    ...SEARCH_SIGNALS.map((signal) => signal.impact),
);

export const SEARCH_PROFILE_STRENGTH = percentOf(
    sum(
        SEARCH_SIGNALS.filter((signal) => signal.complete).map(
            (signal) => signal.impact,
        ),
    ),
    sum(SEARCH_SIGNALS.map((signal) => signal.impact)),
);

export const searchSignalShares: ShareDatum[] = SEARCH_SIGNALS.map(
    (signal) => ({
        id: signal.id,
        icon: signal.icon,
        label: signal.label,
        value: `${signal.impact}%`,
        percent: percentOf(signal.impact, PEAK_SIGNAL_IMPACT),
        tone: signalTone(signal.complete),
    }),
);
