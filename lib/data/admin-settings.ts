import { KeyRound, Power, Server, ShieldCheck, UserPlus } from "lucide-react";
import type { ConfigField } from "@/components/patterns/config-field-grid";
import type { StatDatum } from "@/components/patterns/stat-cell";
import { keyAgeTone } from "@/lib/config/settings-tones";
import {
    enabledPolicyCount,
    isPolicyOn,
    KEY_AGE_MINUTES,
    POLICY_COUNT,
} from "@/lib/data/admin-policies";
import { formatAge } from "@/lib/utils";
import type { PolicyState } from "@/lib/types";

export const SETTINGS_FORM_ID = "admin-settings-form";
export const ENVIRONMENT_LABEL = "Production";
export const CONFIG_REVISION = 148;

export const INITIAL_ADMIN_CONFIG = {
    platformName: "Luxury Estates",
    supportEmail: "support@luxuryestates.com",
    baseCurrency: "USD",
    timezone: "America/Los_Angeles",
    commissionRate: "2.5",
    platformFee: "495",
    listingExpiryDays: "90",
    maxPhotosPerListing: "24",
    autoApproveThreshold: "1000000",
    escrowHoldDays: "3",
};
export type AdminConfig = typeof INITIAL_ADMIN_CONFIG;

export const changedFieldCount = (current: AdminConfig) => {
    const initial: Record<string, string> = INITIAL_ADMIN_CONFIG;
    return Object.entries(current).filter(
        ([key, value]) => initial[key] !== value,
    ).length;
};

export const isAdminConfigDirty = (current: AdminConfig) =>
    changedFieldCount(current) > 0;

export const PLATFORM_FIELDS: readonly ConfigField<keyof AdminConfig>[] = [
    {
        name: "platformName",
        label: "Platform Name",
        placeholder: "Luxury Estates",
    },
    {
        name: "supportEmail",
        label: "Support Email",
        placeholder: "support@luxuryestates.com",
        type: "email",
    },
    { name: "baseCurrency", label: "Base Currency", placeholder: "USD" },
    {
        name: "timezone",
        label: "Reporting Timezone",
        placeholder: "America/Los_Angeles",
    },
];

export const MARKETPLACE_FIELDS: readonly ConfigField<keyof AdminConfig>[] = [
    {
        name: "commissionRate",
        label: "Commission Rate",
        placeholder: "2.5",
        suffix: "%",
        variant: "numeric",
    },
    {
        name: "platformFee",
        label: "Listing Fee",
        placeholder: "495",
        prefix: "$",
        variant: "numeric",
    },
    {
        name: "listingExpiryDays",
        label: "Listing Expiry",
        placeholder: "90",
        suffix: "days",
        variant: "numeric",
    },
    {
        name: "maxPhotosPerListing",
        label: "Max Photos Per Listing",
        placeholder: "24",
        variant: "numeric",
    },
    {
        name: "autoApproveThreshold",
        label: "Auto-Approve Below",
        placeholder: "1000000",
        prefix: "$",
        variant: "numeric",
    },
    {
        name: "escrowHoldDays",
        label: "Escrow Hold",
        placeholder: "3",
        suffix: "days",
        variant: "numeric",
    },
];

const MARKETPLACE_LIVE = "Live";
const MARKETPLACE_OFFLINE = "Offline";
const SIGNUPS_OPEN = "Open";
const SIGNUPS_CLOSED = "Closed";

export const buildSettingsStats = (state: PolicyState): StatDatum[] => {
    const offline = isPolicyOn(state, "maintenance-mode");
    const signupsOpen = isPolicyOn(state, "open-signups");

    return [
        {
            id: "environment",
            icon: Server,
            label: "Environment",
            value: ENVIRONMENT_LABEL,
            tone: "neutral",
        },
        {
            id: "policies",
            icon: ShieldCheck,
            label: "Policies on",
            value: `${enabledPolicyCount(state)}/${POLICY_COUNT}`,
            tone: "accent",
        },
        {
            id: "marketplace",
            icon: Power,
            label: "Marketplace",
            value: offline ? MARKETPLACE_OFFLINE : MARKETPLACE_LIVE,
            tone: offline ? "error" : "success",
        },
        {
            id: "signups",
            icon: UserPlus,
            label: "Signups",
            value: signupsOpen ? SIGNUPS_OPEN : SIGNUPS_CLOSED,
            tone: signupsOpen ? "info" : "warning",
            href: "/admin/users",
        },
        {
            id: "keys",
            icon: KeyRound,
            label: "Key age",
            value: formatAge(KEY_AGE_MINUTES),
            tone: keyAgeTone(KEY_AGE_MINUTES),
        },
    ];
};
