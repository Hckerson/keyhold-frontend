"use client";

import { Switch } from "@/components/ui/forms/switch";
import { NotificationCadenceMark } from "@/components/features/agent/notification-cadence-mark";
import { NotificationChannelMark } from "@/components/features/agent/notification-channel-mark";
import type {
    NotificationRule,
    NotificationRuleId,
} from "@/lib/data/agent-account";

export interface NotificationRuleRowProps {
    rule: NotificationRule;
    enabled: boolean;
    onToggle: (id: NotificationRuleId) => void;
}

export function NotificationRuleRow({
    rule,
    enabled,
    onToggle,
}: NotificationRuleRowProps) {
    return (
        <tr className="ease-smooth hover:bg-background-muted h-11 transition-colors">
            <td className="py-0">
                <span className="text-text block truncate text-xs font-semibold">
                    {rule.title}
                </span>
            </td>
            <td className="py-0 pl-3">
                <NotificationChannelMark channel={rule.channel} />
            </td>
            <td className="py-0 pl-3">
                <NotificationCadenceMark
                    cadence={rule.cadence}
                    enabled={enabled}
                />
            </td>
            <td className="py-0 pl-3">
                <span className="flex justify-end">
                    <Switch
                        checked={enabled}
                        onChange={() => onToggle(rule.id)}
                        aria-label={rule.title}
                    />
                </span>
            </td>
        </tr>
    );
}

NotificationRuleRow.displayName = "NotificationRuleRow";
