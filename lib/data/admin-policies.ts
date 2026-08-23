import type { PolicyState, PolicySwitch, PolicySwitchId } from "@/lib/types";

export const POLICY_SWITCHES: readonly PolicySwitch[] = [
    {
        id: "maintenance-mode",
        domain: "availability",
        title: "Maintenance Mode",
        caption: "Take the marketplace offline for everyone but admins",
        enforcement: "blocking",
    },
    {
        id: "open-signups",
        domain: "availability",
        title: "Open Signups",
        caption: "Allow anyone to register a buyer or agent account",
        enforcement: "advisory",
    },
];

export const POLICY_SETTING_KEY: Record<PolicySwitchId, string> = {
    "maintenance-mode": "maintenanceMode",
    "open-signups": "openSignups",
};

export const POLICY_COUNT = POLICY_SWITCHES.length;

export const enabledPolicyCount = (state: PolicyState) =>
    POLICY_SWITCHES.filter((policy) => state[policy.id]).length;

export const blockingPolicyCount = (state: PolicyState) =>
    POLICY_SWITCHES.filter(
        (policy) => policy.enforcement === "blocking" && state[policy.id],
    ).length;

export const arePoliciesDirty = (state: PolicyState, baseline: PolicyState) =>
    POLICY_SWITCHES.some((policy) => state[policy.id] !== baseline[policy.id]);

export const isPolicyOn = (state: PolicyState, id: PolicySwitchId) => state[id];
