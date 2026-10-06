import type { ConfigField, MaintenanceAction, SelectOption } from "@/lib/types";

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
