import type {
    ConfigChange,
    MaintenanceOperation,
    PolicyState,
    PolicySwitch,
    PolicySwitchId,
} from "@/lib/types";

export const POLICY_SWITCHES: readonly PolicySwitch[] = [
    {
        id: "photo-scan",
        domain: "moderation",
        title: "Automatic Photo Scanning",
        caption: "Flag listings whose images fail the content scan",
        enforcement: "blocking",
        reach: 100,
    },
    {
        id: "license-verification",
        domain: "access",
        title: "Require Agent License Verification",
        caption: "Block publishing until a license is on file",
        enforcement: "blocking",
        reach: 42,
    },
    {
        id: "high-value-review",
        domain: "moderation",
        title: "Manual Review Above Threshold",
        caption: "Route listings over the auto-approve ceiling to a moderator",
        enforcement: "blocking",
        reach: 18,
    },
    {
        id: "repeat-rejection-suspend",
        domain: "access",
        title: "Auto-Suspend On Repeat Rejections",
        caption: "Suspend an agent after three rejected listings",
        enforcement: "advisory",
        reach: 6,
    },
    {
        id: "maintenance-mode",
        domain: "availability",
        title: "Maintenance Mode",
        caption: "Take the marketplace offline for everyone but admins",
        enforcement: "blocking",
        reach: 100,
    },
    {
        id: "open-signups",
        domain: "access",
        title: "New Signups",
        caption: "Allow buyers and agents to create accounts",
        enforcement: "advisory",
        reach: 100,
    },
    {
        id: "health-digest",
        domain: "platform",
        title: "Daily Health Digest",
        caption: "Email uptime and error-rate summaries to admins",
        enforcement: "advisory",
        reach: 3,
    },
    {
        id: "payout-automation",
        domain: "payout",
        title: "Payout Automation",
        caption: "Release agent commissions once escrow clears",
        enforcement: "blocking",
        reach: 74,
    },
];

export const INITIAL_POLICY_STATE: PolicyState = {
    "photo-scan": true,
    "license-verification": true,
    "high-value-review": true,
    "repeat-rejection-suspend": false,
    "maintenance-mode": false,
    "open-signups": true,
    "health-digest": true,
    "payout-automation": true,
};

export const POLICY_COUNT = POLICY_SWITCHES.length;

export const enabledPolicyCount = (state: PolicyState) =>
    POLICY_SWITCHES.filter((policy) => state[policy.id]).length;

export const blockingPolicyCount = (state: PolicyState) =>
    POLICY_SWITCHES.filter(
        (policy) => policy.enforcement === "blocking" && state[policy.id],
    ).length;

export const arePoliciesDirty = (state: PolicyState) =>
    POLICY_SWITCHES.some(
        (policy) => state[policy.id] !== INITIAL_POLICY_STATE[policy.id],
    );

export const isPolicyOn = (state: PolicyState, id: PolicySwitchId) => state[id];

export const KEY_AGE_MINUTES = 49_320;

export const MAINTENANCE_OPERATIONS: readonly MaintenanceOperation[] = [
    {
        id: "rotate-keys",
        label: "Rotate API Keys",
        caption: "Issue new server keys and revoke the current pair",
        action: "Rotate",
        risk: "elevated",
        lastRunMinutes: KEY_AGE_MINUTES,
    },
    {
        id: "export-audit",
        label: "Export Audit Log",
        caption: "Download every moderation and payout action",
        action: "Export",
        risk: "routine",
        lastRunMinutes: 2_880,
    },
    {
        id: "purge-cache",
        label: "Purge Listing Cache",
        caption: "Force a full re-index of the public marketplace",
        action: "Purge",
        risk: "destructive",
        lastRunMinutes: 10_080,
    },
];

export const CONFIG_CHANGES: readonly ConfigChange[] = [
    {
        id: "chg-1",
        actor: "Dana Whitfield",
        role: "Platform admin",
        field: "Commission rate",
        from: "2.75%",
        to: "2.5%",
        ageMinutes: 180,
    },
    {
        id: "chg-2",
        actor: "Marcus Vale",
        role: "Trust & safety",
        field: "Manual review above threshold",
        from: "Off",
        to: "On",
        ageMinutes: 900,
    },
    {
        id: "chg-3",
        actor: "Dana Whitfield",
        role: "Platform admin",
        field: "Escrow hold",
        from: "5 days",
        to: "3 days",
        ageMinutes: 2_640,
    },
    {
        id: "chg-4",
        actor: "Priya Raman",
        role: "Finance",
        field: "Listing fee",
        from: "$395",
        to: "$495",
        ageMinutes: 7_200,
    },
    {
        id: "chg-5",
        actor: "Marcus Vale",
        role: "Trust & safety",
        field: "Auto-suspend on repeat rejections",
        from: "On",
        to: "Off",
        ageMinutes: 11_520,
    },
];

export const [LAST_CONFIG_CHANGE] = CONFIG_CHANGES;
