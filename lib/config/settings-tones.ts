import type { PolicyEnforcement, PolicyGroup } from "@/lib/types";

export const POLICY_EFFECTS: Record<PolicyEnforcement, string> = {
    blocking: "Blocking",
    advisory: "Advisory",
};

export interface PolicyGroupMeta {
    title: string;
    lede: string;
}

export const POLICY_GROUPS: Record<PolicyGroup, PolicyGroupMeta> = {
    moderation: {
        title: "Moderation",
        lede: "What is screened before a listing or an agent reaches the market",
    },
    operations: {
        title: "Operations",
        lede: "Availability, signups, reporting and payout automation",
    },
};

export const POLICY_GROUP_ORDER: readonly PolicyGroup[] = [
    "moderation",
    "operations",
];
