"use client";

import { ALERT_CHANNELS } from "@/lib/config/alert-tones";
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
    const { icon: Icon } = ALERT_CHANNELS[channel];

    return (
        <button
            type="button"
            aria-label={label}
            aria-pressed={active}
            disabled={disabled}
            onClick={onToggle}
            className={cn(
                "ease-smooth focus-visible:ring-accent grid size-6 shrink-0 place-items-center rounded-md border transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40",
                active
                    ? "border-accent bg-accent-light text-accent"
                    : "border-border bg-background text-text-muted hover:border-border-dark hover:text-text-secondary",
            )}
        >
            <Icon className="size-3" strokeWidth={1.5} aria-hidden="true" />
        </button>
    );
}

AlertChannelToggle.displayName = "AlertChannelToggle";
