"use client";

import { Switch } from "@/components/ui/forms/switch";
import { AlertChannelToggle } from "@/components/features/dashboard/alert-channel-toggle";
import { AlertTypeGlyph } from "@/components/features/dashboard/alert-type-glyph";
import {
    ALERT_CHANNELS,
    ALERT_CHANNEL_KEYS,
    ALERT_TYPES,
} from "@/lib/config/alert-tones";
import type { AlertChannel, AlertPreference, AlertType } from "@/lib/types";

export interface AlertPreferenceRowProps {
    type: AlertType;
    preference: AlertPreference;
    onToggleEnabled: () => void;
    onToggleChannel: (channel: AlertChannel) => void;
}

export function AlertPreferenceRow({
    type,
    preference,
    onToggleEnabled,
    onToggleChannel,
}: AlertPreferenceRowProps) {
    const { label } = ALERT_TYPES[type];

    return (
        <li className="flex h-11 items-center gap-2">
            <AlertTypeGlyph type={type} />
            <span className="text-text min-w-0 flex-1 truncate text-xs font-medium">
                {label}
            </span>
            <span className="flex shrink-0 items-center gap-1">
                {ALERT_CHANNEL_KEYS.map((channel) => (
                    <AlertChannelToggle
                        key={channel}
                        channel={channel}
                        active={
                            preference.enabled && preference.channels[channel]
                        }
                        disabled={!preference.enabled}
                        label={`Deliver ${label} alerts by ${ALERT_CHANNELS[channel].label}`}
                        onToggle={() => onToggleChannel(channel)}
                    />
                ))}
            </span>
            <Switch
                checked={preference.enabled}
                onChange={onToggleEnabled}
                aria-label={`Enable ${label} alerts`}
                className="ml-1 shrink-0"
            />
        </li>
    );
}

AlertPreferenceRow.displayName = "AlertPreferenceRow";
