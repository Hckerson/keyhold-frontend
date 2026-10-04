"use client";

import { Switch } from "@/components/ui/forms/switch";
import { PolicyDomainMark } from "@/components/features/admin/policy-domain-mark";
import { PolicyEnforcementMark } from "@/components/features/admin/policy-enforcement-mark";
import { PolicyReachMark } from "@/components/features/admin/policy-reach-mark";
import type { PolicySwitch, PolicySwitchId } from "@/lib/types";

export interface PolicySwitchRowProps {
    policy: PolicySwitch;
    enabled: boolean;
    onToggle: (id: PolicySwitchId) => void;
}

export function PolicySwitchRow({
    policy,
    enabled,
    onToggle,
}: PolicySwitchRowProps) {
    const captionId = `policy-caption-${policy.id}`;

    return (
        <tr className="ease-smooth hover:bg-background-muted h-12 transition-colors">
            <td className="py-0">
                <span className="block min-w-0">
                    <span className="text-text block truncate text-xs font-semibold">
                        {policy.title}
                    </span>
                    <span
                        id={captionId}
                        className="text-text-secondary block truncate text-xs"
                    >
                        {policy.caption}
                    </span>
                </span>
            </td>
            <td className="py-0 pl-3">
                <PolicyDomainMark domain={policy.domain} />
            </td>
            <td className="py-0 pl-3">
                <PolicyEnforcementMark
                    enforcement={policy.enforcement}
                    enabled={enabled}
                />
            </td>
            <td className="py-0 pl-3">
                <PolicyReachMark
                    reach={policy.reach}
                    enabled={enabled}
                    label={policy.title}
                />
            </td>
            <td className="py-0 pl-3">
                <span className="flex justify-end">
                    <Switch
                        checked={enabled}
                        onChange={() => onToggle(policy.id)}
                        aria-label={policy.title}
                        aria-describedby={captionId}
                    />
                </span>
            </td>
        </tr>
    );
}

PolicySwitchRow.displayName = "PolicySwitchRow";
