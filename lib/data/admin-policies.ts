import type {
    PolicyGroup,
    PolicyState,
    PolicySwitch,
    PolicySwitchId,
} from "@/lib/types";

export const POLICY_SWITCHES: readonly PolicySwitch[] = [
    {
        id: "photo-scanning",
        group: "moderation",
        title: "Automatic Photo Scanning",
        caption: "Screen every uploaded listing image before it goes live",
        enforcement: "blocking",
        warnOff: "Saving lets listing photos go live unscreened.",
    },
    {
        id: "agent-license-verification",
        group: "moderation",
        title: "Require Agent License Verification",
        caption: "Hold agent accounts until a licence document clears review",
        enforcement: "blocking",
        warnOff: "Saving lets agents list before their licence clears review.",
    },
    {
        id: "manual-review-threshold",
        group: "moderation",
        title: "Manual Review Above Threshold",
        caption:
            "Route listings priced over the auto-approve limit to a reviewer",
        enforcement: "blocking",
    },
    {
        id: "auto-suspend-repeat-rejections",
        group: "moderation",
        title: "Auto-Suspend On Repeat Rejections",
        caption: "Suspend an account after three rejected listings in a row",
        enforcement: "advisory",
    },
    {
        id: "maintenance-mode",
        group: "operations",
        title: "Maintenance Mode",
        caption: "Take the marketplace offline for everyone but admins",
        enforcement: "blocking",
        warnOn: "Saving takes the marketplace offline for everyone but admins.",
    },
    {
        id: "open-signups",
        group: "operations",
        title: "Open Signups",
        caption: "Allow anyone to register a buyer or agent account",
        enforcement: "advisory",
        warnOff: "Saving stops new buyers and agents from registering.",
    },
    {
        id: "daily-health-digest",
        group: "operations",
        title: "Daily Health Digest",
        caption: "Email admins a uptime and error-rate summary each morning",
        enforcement: "advisory",
    },
    {
        id: "payout-automation",
        group: "operations",
        title: "Payout Automation",
        caption: "Release cleared agent commissions without a manual approval",
        enforcement: "blocking",
        warnOn: "Saving releases cleared commissions without a manual approval.",
    },
];

export const POLICY_SETTING_KEY: Record<PolicySwitchId, string> = {
    "photo-scanning": "photoScanning",
    "agent-license-verification": "agentLicenseVerification",
    "manual-review-threshold": "manualReviewThreshold",
    "auto-suspend-repeat-rejections": "autoSuspendRepeatRejections",
    "maintenance-mode": "maintenanceMode",
    "open-signups": "openSignups",
    "daily-health-digest": "dailyHealthDigest",
    "payout-automation": "payoutAutomation",
};

export const policiesInGroup = (group: PolicyGroup) =>
    POLICY_SWITCHES.filter((policy) => policy.group === group);

export const enabledInGroup = (state: PolicyState, group: PolicyGroup) =>
    policiesInGroup(group).filter((policy) => state[policy.id]).length;

export const isPolicyOn = (state: PolicyState, id: PolicySwitchId) => state[id];

export const groupReading = (state: PolicyState, group: PolicyGroup) =>
    `${enabledInGroup(state, group)} of ${policiesInGroup(group).length} on`;

export const pendingWarnings = (state: PolicyState, baseline: PolicyState) =>
    POLICY_SWITCHES.flatMap((policy) => {
        if (state[policy.id] === baseline[policy.id]) return [];
        const warning = state[policy.id] ? policy.warnOn : policy.warnOff;
        return warning ? [warning] : [];
    });

export const changedFrom = (
    state: PolicyState,
    baseline: PolicyState,
    id: PolicySwitchId,
) => (state[id] === baseline[id] ? undefined : baseline[id]);
