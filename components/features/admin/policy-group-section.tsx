"use client";

import { PolicySwitchRow } from "@/components/features/admin/policy-switch-row";
import { SettingsSection } from "@/components/features/admin/settings-section";
import { POLICY_GROUPS } from "@/lib/config/settings-tones";
import {
    changedFrom,
    groupReading,
    policiesInGroup,
} from "@/lib/data/admin-policies";
import type { PolicyGroup, PolicyState, PolicySwitchId } from "@/lib/types";

export interface PolicyGroupSectionProps {
    group: PolicyGroup;
    policies: PolicyState;
    baseline: PolicyState;
    onToggle: (id: PolicySwitchId) => void;
}

export function PolicyGroupSection({
    group,
    policies,
    baseline,
    onToggle,
}: PolicyGroupSectionProps) {
    return (
        <SettingsSection
            id={group}
            title={POLICY_GROUPS[group].title}
            lede={POLICY_GROUPS[group].lede}
            meta={groupReading(policies, group)}
            flush
        >
            <ul className="divide-border-light divide-y">
                {policiesInGroup(group).map((policy) => (
                    <PolicySwitchRow
                        key={policy.id}
                        policy={policy}
                        enabled={policies[policy.id]}
                        was={changedFrom(policies, baseline, policy.id)}
                        onToggle={onToggle}
                    />
                ))}
            </ul>
        </SettingsSection>
    );
}

PolicyGroupSection.displayName = "PolicyGroupSection";
