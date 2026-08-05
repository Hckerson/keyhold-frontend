import { ALERT_CHANNELS } from "@/lib/config/alert-tones";
import { cn } from "@/lib/utils";
import type { AlertChannel } from "@/lib/types";

export interface AlertChannelMarkProps {
    channel: AlertChannel;
    className?: string;
}

export function AlertChannelMark({
    channel,
    className,
}: AlertChannelMarkProps) {
    const { icon: Icon, label } = ALERT_CHANNELS[channel];

    return (
        <span
            className={cn(
                "text-text-secondary flex min-w-0 items-center gap-1.5 text-xs",
                className,
            )}
        >
            <Icon
                className="text-text-muted size-3 shrink-0"
                strokeWidth={1.5}
                aria-hidden="true"
            />
            <span className="truncate">{label}</span>
        </span>
    );
}

AlertChannelMark.displayName = "AlertChannelMark";
