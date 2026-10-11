"use client";

import { AlertPreferenceRow } from "@/components/features/dashboard/alert-preference-row";
import {
    ALERT_CHANNELS,
    ALERT_CHANNEL_KEYS,
    ALERT_TYPE_KEYS,
    alertDeliveryGrid,
} from "@/lib/config/alert-tones";
import { cn } from "@/lib/utils";
import type {
    AlertChannel,
    AlertPreference,
    AlertType,
    AlertVolume,
} from "@/lib/types";

const SIGNAL_HEAD = "Signal";
const VOLUME_HEAD = "Fired";
const STATE_HEAD = "On";

export interface AlertPreferenceListProps {
    preferences: Record<AlertType, AlertPreference>;
    volumes?: Record<AlertType, AlertVolume>;
    onToggleEnabled: (type: AlertType) => void;
    onToggleChannel: (type: AlertType, channel: AlertChannel) => void;
}

export function AlertPreferenceList({
    preferences,
    volumes,
    onToggleEnabled,
    onToggleChannel,
}: AlertPreferenceListProps) {
    return (
        <div>
            <div
                className={cn(
                    alertDeliveryGrid(volumes ? "volume" : "plain"),
                    "micro-label border-border-light bg-background-alt -mx-3 h-7 rounded-t-md border-b px-3",
                )}
            >
                <span />
                <span className="truncate">{SIGNAL_HEAD}</span>
                {volumes && (
                    <span className="col-span-2 text-right">{VOLUME_HEAD}</span>
                )}
                {ALERT_CHANNEL_KEYS.map((channel) => (
                    <span key={channel} className="text-center">
                        {ALERT_CHANNELS[channel].short}
                    </span>
                ))}
                <span className="text-center">{STATE_HEAD}</span>
            </div>

            <ul className="divide-border-light divide-y">
                {ALERT_TYPE_KEYS.map((type) => (
                    <AlertPreferenceRow
                        key={type}
                        type={type}
                        preference={preferences[type]}
                        volume={volumes?.[type]}
                        onToggleEnabled={() => onToggleEnabled(type)}
                        onToggleChannel={(channel) =>
                            onToggleChannel(type, channel)
                        }
                    />
                ))}
            </ul>
        </div>
    );
}

AlertPreferenceList.displayName = "AlertPreferenceList";
