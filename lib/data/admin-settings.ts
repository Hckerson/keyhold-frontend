import type { ConfigField } from "@/components/patterns/config-field-grid";
import type { SettingsToggle } from "@/lib/data/dashboard-settings";

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

export const isAdminConfigDirty = (current: AdminConfig) => {
    const initial: Record<string, string> = INITIAL_ADMIN_CONFIG;
    return Object.entries(current).some(
        ([key, value]) => initial[key] !== value,
    );
};

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

export const MODERATION_TOGGLES: readonly SettingsToggle[] = [
    {
        title: "Automatic Photo Scanning",
        description: "Flag listings whose images fail the content scan",
        defaultChecked: true,
    },
    {
        title: "Require Agent License Verification",
        description: "Block publishing until a license is on file",
        defaultChecked: true,
    },
    {
        title: "Manual Review Above Threshold",
        description: "Route high-value listings to a human moderator",
        defaultChecked: true,
    },
    {
        title: "Auto-Suspend On Repeat Rejections",
        description: "Suspend an agent after three rejected listings",
        defaultChecked: false,
    },
];

export const OPERATIONS_TOGGLES: readonly SettingsToggle[] = [
    {
        title: "Maintenance Mode",
        description: "Take the marketplace offline for everyone but admins",
        defaultChecked: false,
    },
    {
        title: "New Signups",
        description: "Allow buyers and agents to create accounts",
        defaultChecked: true,
    },
    {
        title: "Daily Health Digest",
        description: "Email uptime and error-rate summaries to admins",
        defaultChecked: true,
    },
    {
        title: "Payout Automation",
        description: "Release agent commissions once escrow clears",
        defaultChecked: true,
    },
];
