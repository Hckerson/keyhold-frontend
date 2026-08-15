"use client";

import { AlertPreferenceRow } from "@/components/features/dashboard/alert-preference-row";
import { ALERT_TYPE_KEYS } from "@/lib/config/alert-tones";
import type { AlertChannel, AlertPreference, AlertType } from "@/lib/types";

export interface AlertPreferenceListProps {
    preferences: Record<AlertType, AlertPreference>;
    onToggleEnabled: (type: AlertType) => void;
    onToggleChannel: (type: AlertType, channel: AlertChannel) => void;
}

export function AlertPreferenceList({
    preferences,
    onToggleEnabled,
    onToggleChannel,
}: AlertPreferenceListProps) {
    return (
        <ul className="divide-border divide-y">
            {ALERT_TYPE_KEYS.map((type) => (
                <AlertPreferenceRow
                    key={type}
                    type={type}
                    preference={preferences[type]}
                    onToggleEnabled={() => onToggleEnabled(type)}
                    onToggleChannel={(channel) =>
                        onToggleChannel(type, channel)
                    }
                />
            ))}
        </ul>
    );
}

AlertPreferenceList.displayName = "AlertPreferenceList";
