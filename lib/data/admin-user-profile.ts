import { BadgeCheck, Home, ShieldAlert, Wallet } from "lucide-react";
import type { StatDatum } from "@/components/patterns/stat-cell";
import type { AccountCredential, ManagedUser } from "@/lib/types";
import type { Suspension } from "@/lib/validations/suspension";
import type { User } from "@/lib/validations/user";
import { formatCount, formatMillions } from "@/lib/utils";

const UNVERIFIED_ISSUER = "Not on file";
const IDENTITY_ISSUER = "Government-issued document";
const NO_EXPIRY = 0;

export const SUSPENSION_DATE_FORMAT = "MMM d, yyyy";

export const PROFILE_BACK = { label: "Back to users", href: "/admin/users" };

export const PROFILE_COPY = {
    lede: "Everything the platform holds on this account",
    credentials: "Verification",
    credentialsLede: "What this account has proved about itself",
    credentialsHeading: "Credential",
    credentialsCaption: "Verification state for each credential on file",
    account: "Account",
    accountLede: "Directory record",
    profile: "Profile",
    history: "Suspension history",
    historyLede: "Every restriction placed on this account",
    historyEmpty: "No suspensions on record",
    historyEmptyLede: "This account has never been restricted.",
    lifted: "Lifted",
    active: "Active",
    indefinite: "Indefinite",
    days: "days",
    missing: "Not provided",
} as const;

export const profileCredentials = (
    user: User | undefined,
): AccountCredential[] => [
    {
        id: "email",
        label: "Email address",
        issuer: user?.email ?? UNVERIFIED_ISSUER,
        state: user?.emailVerified ? "verified" : "missing",
        expiresInMinutes: NO_EXPIRY,
    },
    {
        id: "phone",
        label: "Phone number",
        issuer: user?.phoneNumber ?? UNVERIFIED_ISSUER,
        state: user?.phoneVerified ? "verified" : "missing",
        expiresInMinutes: NO_EXPIRY,
    },
    {
        id: "identity",
        label: "Identity",
        issuer: IDENTITY_ISSUER,
        state: user?.kycVerified ? "verified" : "missing",
        expiresInMinutes: NO_EXPIRY,
    },
];

export const verifiedCount = (credentials: AccountCredential[]) =>
    credentials.filter((credential) => credential.state === "verified").length;

export const profileStats = (
    managed: ManagedUser,
    credentials: AccountCredential[],
    suspensions: Suspension[],
): StatDatum[] => [
    {
        id: "volume",
        icon: Wallet,
        label: "Lifetime volume",
        value: formatMillions(managed.volume, 2),
        tone: "success",
    },
    {
        id: "deals",
        icon: Home,
        label: "Closed deals",
        value: formatCount(managed.transactions),
        tone: "accent",
    },
    {
        id: "verified",
        icon: BadgeCheck,
        label: "Credentials verified",
        value: `${verifiedCount(credentials)}/${credentials.length}`,
        tone: "info",
    },
    {
        id: "suspensions",
        icon: ShieldAlert,
        label: "Suspensions",
        value: formatCount(suspensions.length),
        tone: suspensions.length > 0 ? "warning" : "neutral",
    },
];

export const profileFields = (user: User | undefined) => [
    { id: "bio", label: "Bio", value: user?.bio },
    { id: "jobTitle", label: "Job title", value: user?.jobTitle },
    { id: "agencyName", label: "Agency", value: user?.agencyName },
    { id: "licenseNumber", label: "Licence", value: user?.licenseNumber },
];

export const rankSuspensions = (suspensions: Suspension[]) =>
    [...suspensions].sort(
        (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
