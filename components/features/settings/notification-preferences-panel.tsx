"use client";

import { Panel } from "@/components/ui/panel";
import { ToggleRow } from "@/components/ui/forms/toggle-row";
import {
    NOTIFICATION_TOGGLES,
    type NotificationPreferences,
} from "@/lib/data/dashboard-settings";

export interface NotificationPreferencesPanelProps {
    notifications: NotificationPreferences;
    onChange: (key: keyof NotificationPreferences, enabled: boolean) => void;
}

export function NotificationPreferencesPanel({
    notifications,
    onChange,
}: NotificationPreferencesPanelProps) {
    return (
        <Panel
            title="Notification Settings"
            description="Control how you receive updates"
        >
            <div className="space-y-2">
                {NOTIFICATION_TOGGLES.map((item) => (
                    <ToggleRow
                        key={item.key}
                        title={item.title}
                        description={item.description}
                        checked={notifications[item.key]}
                        onCheckedChange={(value) => onChange(item.key, value)}
                    />
                ))}
            </div>
        </Panel>
    );
}
