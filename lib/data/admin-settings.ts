import { Power, Server, ShieldCheck, UserPlus } from "lucide-react";
import type { StatDatum } from "@/components/patterns/stat-cell";
import type { ConfigField } from "@/components/patterns/config-field-grid";
import type { SelectOption } from "@/components/ui/forms/select";
import {
    POLICY_COUNT,
    POLICY_SETTING_KEY,
    POLICY_SWITCHES,
    enabledPolicyCount,
    isPolicyOn,
} from "@/lib/data/admin-policies";
import type { PolicyState } from "@/lib/types";
import type {
    PlatformSetting,
    UpdateSettingsInput,
} from "@/lib/validations/setting";
import type { SettingCategory } from "@/lib/enums/enums";

export const SETTINGS_FORM_ID = "admin-settings-form";
export const ENVIRONMENT_LABEL = "Live";

const TRUE = "true";

export const DEFAULT_REPORTING_TIMEZONE = "America/New_York";

export const REPORTING_TIMEZONES: readonly SelectOption<string>[] = [
    { value: "UTC", label: "UTC" },
    { value: "America/New_York", label: "New York (ET)" },
    { value: "America/Chicago", label: "Chicago (CT)" },
    { value: "America/Denver", label: "Denver (MT)" },
    { value: "America/Los_Angeles", label: "Los Angeles (PT)" },
    { value: "Europe/London", label: "London (GMT)" },
    { value: "Europe/Paris", label: "Paris (CET)" },
    { value: "Asia/Dubai", label: "Dubai (GST)" },
    { value: "Asia/Singapore", label: "Singapore (SGT)" },
    { value: "Australia/Sydney", label: "Sydney (AET)" },
];

export const ADMIN_CONFIG_KEYS = [
    "platformName",
    "supportEmail",
    "baseCurrency",
    "reportingTimezone",
    "commissionRate",
    "platformFee",
    "listingExpiryDays",
    "maxPhotosPerListing",
    "autoApproveThreshold",
    "escrowHoldDays",
] as const;

export type AdminConfigKey = (typeof ADMIN_CONFIG_KEYS)[number];

export type AdminConfig = Record<AdminConfigKey, string>;

export const EMPTY_ADMIN_CONFIG: AdminConfig = ADMIN_CONFIG_KEYS.reduce(
    (config, key) => ({ ...config, [key]: "" }),
    {} as AdminConfig,
);

export const EMPTY_POLICY_STATE: PolicyState = POLICY_SWITCHES.reduce(
    (state, policy) => ({ ...state, [policy.id]: false }),
    {} as PolicyState,
);

export const toAdminConfig = (settings: PlatformSetting[]): AdminConfig => {
    const byKey = new Map(
        settings.map((setting) => [setting.key, setting.value]),
    );

    return ADMIN_CONFIG_KEYS.reduce(
        (config, key) => ({ ...config, [key]: byKey.get(key) ?? "" }),
        {} as AdminConfig,
    );
};

export const toPolicyState = (settings: PlatformSetting[]): PolicyState => {
    const byKey = new Map(
        settings.map((setting) => [setting.key, setting.value]),
    );

    return POLICY_SWITCHES.reduce(
        (state, policy) => ({
            ...state,
            [policy.id]: byKey.get(POLICY_SETTING_KEY[policy.id]) === TRUE,
        }),
        {} as PolicyState,
    );
};

export const changedFieldCount = (
    current: AdminConfig,
    baseline: AdminConfig,
) => ADMIN_CONFIG_KEYS.filter((key) => current[key] !== baseline[key]).length;

export const isAdminConfigDirty = (
    current: AdminConfig,
    baseline: AdminConfig,
) => changedFieldCount(current, baseline) > 0;

export const toSettingsPayload = (
    settings: PlatformSetting[],
    config: AdminConfig,
    policies: PolicyState,
): UpdateSettingsInput => {
    const categoryOf = (key: string): SettingCategory =>
        settings.find((setting) => setting.key === key)?.category ?? "PLATFORM";

    return {
        settings: [
            ...ADMIN_CONFIG_KEYS.map((key) => ({
                key,
                value: config[key],
                category: categoryOf(key),
            })),
            ...POLICY_SWITCHES.map((policy) => ({
                key: POLICY_SETTING_KEY[policy.id],
                value: String(policies[policy.id]),
                category: categoryOf(POLICY_SETTING_KEY[policy.id]),
            })),
        ],
    };
};

export const PLATFORM_FIELDS: readonly ConfigField<AdminConfigKey>[] = [
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
        name: "reportingTimezone",
        label: "Reporting Timezone",
        placeholder: DEFAULT_REPORTING_TIMEZONE,
        options: REPORTING_TIMEZONES,
    },
];

export const MARKETPLACE_FIELDS: readonly ConfigField<AdminConfigKey>[] = [
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
        placeholder: "0",
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

export const buildSettingsStats = (
    state: PolicyState,
    changes: number,
): StatDatum[] => {
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
            id: "changes",
            icon: ShieldCheck,
            label: "Logged changes",
            value: `${changes}`,
            tone: "info",
        },
    ];
};

export type MaintenanceActionId = "purge-verifications" | "restore-defaults";

export interface MaintenanceAction {
    id: MaintenanceActionId;
    title: string;
    caption: string;
    label: string;
    confirmTitle: string;
    confirmLede: string;
    failure: string;
    danger: boolean;
}

export const MAINTENANCE_ACTIONS: readonly MaintenanceAction[] = [
    {
        id: "purge-verifications",
        title: "Purge expired verifications",
        caption:
            "Delete every email and phone verification whose window has closed",
        label: "Purge",
        confirmTitle: "Purge expired verifications?",
        confirmLede:
            "Expired email and phone verification records are deleted permanently. Active verifications and user accounts are untouched.",
        failure: "The expired verifications were not purged",
        danger: true,
    },
    {
        id: "restore-defaults",
        title: "Restore default settings",
        caption:
            "Reset every platform, marketplace and policy value to its shipped default",
        label: "Restore defaults",
        confirmTitle: "Restore default settings?",
        confirmLede:
            "Every configured value on this page is overwritten with its shipped default, including all eight policy toggles. The change is recorded against your account in the change log.",
        failure: "The default settings were not restored",
        danger: true,
    },
];
