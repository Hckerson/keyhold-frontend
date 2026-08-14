import { chartToneSoft } from "@/lib/config/chart-tones";
import {
    NOTIFICATION_CHANNELS,
    type NotificationChannel,
} from "@/lib/config/account-tones";
import { cn } from "@/lib/utils";

export interface NotificationChannelMarkProps {
    channel: NotificationChannel;
    className?: string;
}

export function NotificationChannelMark({
    channel,
    className,
}: NotificationChannelMarkProps) {
    const { icon: Icon, label, tone } = NOTIFICATION_CHANNELS[channel];

    return (
        <span className={cn("flex min-w-0 items-center gap-2", className)}>
            <span
                className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-md",
                    chartToneSoft[tone],
                )}
            >
                <Icon className="size-3" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className="text-text-secondary min-w-0 truncate text-xs">
                {label}
            </span>
        </span>
    );
}

NotificationChannelMark.displayName = "NotificationChannelMark";
