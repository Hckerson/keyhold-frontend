import { StatusDot } from "@/components/patterns/status-dot";
import { SIGNAL_SEVERITIES } from "@/lib/config/admin-tones";
import { cn } from "@/lib/utils";
import type { SignalSeverity } from "@/lib/types";

export interface SignalSeverityMarkProps {
    severity: SignalSeverity;
    className?: string;
}

export function SignalSeverityMark({
    severity,
    className,
}: SignalSeverityMarkProps) {
    const meta = SIGNAL_SEVERITIES[severity];

    return (
        <span className={cn("flex min-w-0 items-center gap-1.5", className)}>
            <StatusDot tone={meta.tone} />
            <span className="text-text-secondary min-w-0 truncate text-xs">
                {meta.label}
            </span>
        </span>
    );
}

SignalSeverityMark.displayName = "SignalSeverityMark";
