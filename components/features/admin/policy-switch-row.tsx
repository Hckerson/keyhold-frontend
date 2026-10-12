"use client";

import { Switch } from "@/components/ui/forms/switch";
import { SettingRow } from "@/components/patterns/setting-row";
import { POLICY_EFFECTS } from "@/lib/config/settings-tones";
import { SETTINGS_COPY } from "@/lib/data/admin-settings";
import { cn } from "@/lib/utils";
import type { PolicySwitch, PolicySwitchId } from "@/lib/types";

export interface PolicySwitchRowProps {
    policy: PolicySwitch;
    enabled: boolean;
    was?: boolean;
    onToggle: (id: PolicySwitchId) => void;
}

export function PolicySwitchRow({
    policy,
    enabled,
    was,
    onToggle,
}: PolicySwitchRowProps) {
    const captionId = `policy-caption-${policy.id}`;
    const changed = was !== undefined;

    return (
        <SettingRow
            title={policy.title}
            caption={policy.caption}
            captionId={captionId}
        >
            <span
                className={cn(
                    "hidden shrink-0 text-xs sm:inline",
                    changed || enabled
                        ? "text-text-secondary"
                        : "text-text-muted",
                )}
            >
                {changed
                    ? was
                        ? SETTINGS_COPY.wasOn
                        : SETTINGS_COPY.wasOff
                    : POLICY_EFFECTS[policy.enforcement]}
            </span>
            <Switch
                checked={enabled}
                onChange={() => onToggle(policy.id)}
                aria-label={policy.title}
                aria-describedby={captionId}
            />
        </SettingRow>
    );
}

PolicySwitchRow.displayName = "PolicySwitchRow";
