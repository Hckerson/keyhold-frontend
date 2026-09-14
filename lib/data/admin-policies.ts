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
        domain: "moderation",
        title: "Automatic Photo Scanning",
        caption: "Screen every uploaded listing image before it goes live",
        enforcement: "blocking",
        reach: 100,
    },
    {
        id: "agent-license-verification",
        group: "moderation",
        domain: "access",
        title: "Require Agent License Verification",
        caption: "Hold agent accounts until a licence document clears review",
        enforcement: "blocking",
        reach: 22,
    },
    {
        id: "manual-review-threshold",
        group: "moderation",
        domain: "moderation",
        title: "Manual Review Above Threshold",
        caption:
            "Route listings priced over the auto-approve limit to a reviewer",
        enforcement: "blocking",
        reach: 64,
    },
    {
        id: "auto-suspend-repeat-rejections",
        group: "moderation",
        domain: "moderation",
        title: "Auto-Suspend On Repeat Rejections",
        caption: "Suspend an account after three rejected listings in a row",
        enforcement: "advisory",
        reach: 8,
    },
    {
        id: "maintenance-mode",
        group: "operations",
        domain: "availability",
        title: "Maintenance Mode",
        caption: "Take the marketplace offline for everyone but admins",
        enforcement: "blocking",
        reach: 100,
    },
    {
        id: "open-signups",
        group: "operations",
        domain: "availability",
        title: "Open Signups",
        caption: "Allow anyone to register a buyer or agent account",
        enforcement: "advisory",
        reach: 100,
    },
    {
        id: "daily-health-digest",
        group: "operations",
        domain: "platform",
        title: "Daily Health Digest",
        caption: "Email admins a uptime and error-rate summary each morning",
        enforcement: "advisory",
        reach: 4,
    },
    {
        id: "payout-automation",
        group: "operations",
        domain: "payout",
        title: "Payout Automation",
        caption: "Release cleared agent commissions without a manual approval",
        enforcement: "blocking",
        reach: 46,
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

export const POLICY_COUNT = POLICY_SWITCHES.length;

export const policiesInGroup = (group: PolicyGroup) =>
    POLICY_SWITCHES.filter((policy) => policy.group === group);

export const enabledPolicyCount = (state: PolicyState) =>
    POLICY_SWITCHES.filter((policy) => state[policy.id]).length;

export const enabledInGroup = (state: PolicyState, group: PolicyGroup) =>
    policiesInGroup(group).filter((policy) => state[policy.id]).length;

export const blockingPolicyCount = (state: PolicyState) =>
    POLICY_SWITCHES.filter(
        (policy) => policy.enforcement === "blocking" && state[policy.id],
    ).length;

export const arePoliciesDirty = (state: PolicyState, baseline: PolicyState) =>
    POLICY_SWITCHES.some((policy) => state[policy.id] !== baseline[policy.id]);

export const isPolicyOn = (state: PolicyState, id: PolicySwitchId) => state[id];
