"use client";

import { ALERT_CHANNELS } from "@/lib/config/alert-tones";
import { chartToneSoft } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { AlertChannel } from "@/lib/types";

export interface AlertChannelToggleProps {
    channel: AlertChannel;
    active: boolean;
    label: string;
    disabled?: boolean;
    onToggle: () => void;
}

export function AlertChannelToggle({
    channel,
    active,
    label,
    disabled,
    onToggle,
}: AlertChannelToggleProps) {
    const { icon: Icon, chartTone } = ALERT_CHANNELS[channel];

    return (
        <button
            type="button"
            aria-label={label}
            aria-pressed={active}
            disabled={disabled}
            onClick={onToggle}
            className={cn(
                "ease-smooth focus-visible:ring-accent grid h-9 place-items-center rounded-md transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40",
                !disabled && !active && "hover:bg-background-alt",
            )}
        >
            <span
                className={cn(
                    "ease-smooth grid size-5 place-items-center rounded-md transition-colors duration-200",
                    active && chartToneSoft[chartTone],
                )}
            >
                {active ? (
                    <Icon
                        className="size-3"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                ) : (
                    <span
                        className="bg-border-dark size-1.5 rounded-full"
                        aria-hidden="true"
                    />
                )}
            </span>
        </button>
    );
}

AlertChannelToggle.displayName = "AlertChannelToggle";
