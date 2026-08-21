import { StatusDot } from "@/components/patterns/status-dot";
import { SERVICE_STATES } from "@/lib/config/admin-tones";
import { chartToneText } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { ServiceState } from "@/lib/types";

export interface ServiceStateMarkProps {
    state: ServiceState;
    className?: string;
}

export function ServiceStateMark({ state, className }: ServiceStateMarkProps) {
    const meta = SERVICE_STATES[state];

    return (
        <span className={cn("flex min-w-0 items-center gap-1.5", className)}>
            <StatusDot tone={meta.tone} />
            <span
                className={cn(
                    "min-w-0 truncate text-xs",
                    chartToneText[meta.chartTone],
                )}
            >
                {meta.label}
            </span>
        </span>
    );
}

ServiceStateMark.displayName = "ServiceStateMark";
