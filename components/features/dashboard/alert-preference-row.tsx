"use client";

import { Switch } from "@/components/ui/forms/switch";
import { AlertChannelToggle } from "@/components/features/dashboard/alert-channel-toggle";
import { AlertTypeGlyph } from "@/components/features/dashboard/alert-type-glyph";
import {
    ALERT_CHANNELS,
    ALERT_CHANNEL_KEYS,
    ALERT_TYPES,
    alertDeliveryGrid,
} from "@/lib/config/alert-tones";
import { chartToneText } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type {
    AlertChannel,
    AlertPreference,
    AlertType,
    AlertVolume,
} from "@/lib/types";

export interface AlertPreferenceRowProps {
    type: AlertType;
    preference: AlertPreference;
    volume?: AlertVolume;
    onToggleEnabled: () => void;
    onToggleChannel: (channel: AlertChannel) => void;
}

export function AlertPreferenceRow({
    type,
    preference,
    volume,
    onToggleEnabled,
    onToggleChannel,
}: AlertPreferenceRowProps) {
    const { label, chartTone } = ALERT_TYPES[type];
    const { enabled } = preference;

    return (
        <li
            className={cn(
                alertDeliveryGrid(volume ? "volume" : "plain"),
                "h-9",
            )}
        >
            <AlertTypeGlyph type={type} muted={!enabled} />

            <span
                className={cn(
                    "truncate text-xs font-medium",
                    enabled ? "text-text" : "text-text-muted",
                )}
            >
                {label}
            </span>

            {volume && (
                <>
                    <span
                        className={cn(
                            "text-right font-mono text-[10px] tabular-nums",
                            enabled ? "text-text-secondary" : "text-text-muted",
                        )}
                    >
                        {volume.count}
                    </span>
                    <span
                        className={cn(
                            "text-right text-xs font-medium tabular-nums",
                            enabled
                                ? chartToneText[chartTone]
                                : "text-text-muted",
                        )}
                    >
                        {volume.percent}%
                    </span>
                </>
            )}

            {ALERT_CHANNEL_KEYS.map((channel) => (
                <AlertChannelToggle
                    key={channel}
                    channel={channel}
                    active={enabled && preference.channels[channel]}
                    disabled={!enabled}
                    label={`Deliver ${label} alerts by ${ALERT_CHANNELS[channel].label}`}
                    onToggle={() => onToggleChannel(channel)}
                />
            ))}

            <Switch
                size="sm"
                checked={enabled}
                onChange={onToggleEnabled}
                aria-label={`Enable ${label} alerts`}
                className="justify-self-center"
            />
        </li>
    );
}

AlertPreferenceRow.displayName = "AlertPreferenceRow";
