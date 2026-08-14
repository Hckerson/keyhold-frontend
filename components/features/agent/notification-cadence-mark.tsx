import { StatusDot } from "@/components/patterns/status-dot";
import {
    NOTIFICATION_CADENCES,
    NOTIFICATION_MUTED_LABEL,
    type NotificationCadence,
} from "@/lib/config/account-tones";
import { chartToneText } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";

export interface NotificationCadenceMarkProps {
    cadence: NotificationCadence;
    enabled: boolean;
    className?: string;
}

export function NotificationCadenceMark({
    cadence,
    enabled,
    className,
}: NotificationCadenceMarkProps) {
    const meta = NOTIFICATION_CADENCES[cadence];

    return (
        <span className={cn("flex min-w-0 items-center gap-1.5", className)}>
            <StatusDot tone={enabled ? meta.tone : "neutral"} />
            <span
                className={cn(
                    "min-w-0 truncate text-xs",
                    enabled ? chartToneText[meta.chartTone] : "text-text-muted",
                )}
            >
                {enabled ? meta.label : NOTIFICATION_MUTED_LABEL}
            </span>
        </span>
    );
}

NotificationCadenceMark.displayName = "NotificationCadenceMark";
