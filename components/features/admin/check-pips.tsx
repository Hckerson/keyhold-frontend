import {
    CHECK_STATES,
    COMPLIANCE_CHECKS,
    COMPLIANCE_CHECK_KEYS,
} from "@/lib/config/moderation-tones";
import { chartToneSoft } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { ComplianceReport } from "@/lib/types";

const describe = (compliance: ComplianceReport) =>
    COMPLIANCE_CHECK_KEYS.map(
        (id) =>
            `${COMPLIANCE_CHECKS[id].label} ${CHECK_STATES[compliance[id]].label.toLowerCase()}`,
    ).join(", ");

export interface CheckPipsProps {
    compliance: ComplianceReport;
    openOnly?: boolean;
    className?: string;
}

export function CheckPips({ compliance, openOnly, className }: CheckPipsProps) {
    const shown = COMPLIANCE_CHECK_KEYS.filter(
        (id) => !openOnly || compliance[id] !== "pass",
    );

    return (
        <span
            role="img"
            aria-label={describe(compliance)}
            className={cn("flex items-center gap-1", className)}
        >
            {shown.length === 0 && (
                <span className="text-text-muted text-xs">
                    {CHECK_STATES.pass.label}
                </span>
            )}
            {shown.map((id) => {
                const Icon = COMPLIANCE_CHECKS[id].icon;
                const state = CHECK_STATES[compliance[id]];

                return (
                    <span
                        key={id}
                        title={`${COMPLIANCE_CHECKS[id].label}: ${state.label}`}
                        className={cn(
                            "grid size-5 shrink-0 place-items-center rounded-sm",
                            chartToneSoft[state.tone],
                        )}
                    >
                        <Icon
                            aria-hidden="true"
                            strokeWidth={1.5}
                            className="size-3"
                        />
                    </span>
                );
            })}
        </span>
    );
}

CheckPips.displayName = "CheckPips";
