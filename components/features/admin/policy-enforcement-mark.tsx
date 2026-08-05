import { StatusDot } from "@/components/patterns/status-dot";
import {
    POLICY_ENFORCEMENTS,
    POLICY_OFF_LABEL,
} from "@/lib/config/settings-tones";
import { chartToneText } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { PolicyEnforcement } from "@/lib/types";

export interface PolicyEnforcementMarkProps {
    enforcement: PolicyEnforcement;
    enabled: boolean;
    className?: string;
}

export function PolicyEnforcementMark({
    enforcement,
    enabled,
    className,
}: PolicyEnforcementMarkProps) {
    const meta = POLICY_ENFORCEMENTS[enforcement];

    return (
        <span className={cn("flex min-w-0 items-center gap-1.5", className)}>
            <StatusDot tone={enabled ? meta.tone : "neutral"} />
            <span
                className={cn(
                    "min-w-0 truncate text-xs",
                    enabled ? chartToneText[meta.chartTone] : "text-text-muted",
                )}
            >
                {enabled ? meta.label : POLICY_OFF_LABEL}
            </span>
        </span>
    );
}

PolicyEnforcementMark.displayName = "PolicyEnforcementMark";
