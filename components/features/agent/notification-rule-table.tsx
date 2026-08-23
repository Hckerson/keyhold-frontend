"use client";

import { NotificationRuleRow } from "@/components/features/agent/notification-rule-row";
import type {
    NotificationRule,
    NotificationRuleId,
    NotificationState,
} from "@/lib/data/agent-account";

const TABLE_CAPTION =
    "Alert routing by notification, delivery channel, cadence, weekly send volume and current state";

export interface NotificationRuleTableProps {
    rules: readonly NotificationRule[];
    state: NotificationState;
    onToggle: (id: NotificationRuleId) => void;
}

export function NotificationRuleTable({
    rules,
    state,
    onToggle,
}: NotificationRuleTableProps) {
    return (
        <table className="table-flush w-full min-w-2xl table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label text-left">
                        Alert
                    </th>
                    <th scope="col" className="micro-label w-28 pl-3 text-left">
                        Channel
                    </th>
                    <th scope="col" className="micro-label w-24 pl-3 text-left">
                        Cadence
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
                {rules.map((rule) => (
                    <NotificationRuleRow
                        key={rule.id}
                        rule={rule}
                        enabled={state[rule.id]}
                        onToggle={onToggle}
                    />
                ))}
            </tbody>
        </table>
    );
}

NotificationRuleTable.displayName = "NotificationRuleTable";
