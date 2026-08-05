"use client";

import { PolicySwitchRow } from "@/components/features/admin/policy-switch-row";
import type { PolicyState, PolicySwitch, PolicySwitchId } from "@/lib/types";

const TABLE_CAPTION =
    "Platform policies by rule, domain, enforcement, marketplace reach and current state";

export interface PolicySwitchTableProps {
    policies: readonly PolicySwitch[];
    state: PolicyState;
    onToggle: (id: PolicySwitchId) => void;
}

export function PolicySwitchTable({
    policies,
    state,
    onToggle,
}: PolicySwitchTableProps) {
    return (
        <table className="table-flush w-full table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label text-left">
                        Rule
                    </th>
                    <th scope="col" className="micro-label w-32 pl-3 text-left">
                        Domain
                    </th>
                    <th scope="col" className="micro-label w-24 pl-3 text-left">
                        Enforcement
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-28 pl-3 text-right"
                    >
                        Reach
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-16 pl-3 text-right"
                    >
                        State
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                {policies.map((policy) => (
                    <PolicySwitchRow
                        key={policy.id}
                        policy={policy}
                        enabled={state[policy.id]}
                        onToggle={onToggle}
                    />
                ))}
            </tbody>
        </table>
    );
}

PolicySwitchTable.displayName = "PolicySwitchTable";
