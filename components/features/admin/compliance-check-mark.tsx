import { CHECK_STATES, COMPLIANCE_CHECKS } from "@/lib/config/moderation-tones";
import { chartToneSoft, chartToneText } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { CheckState, ComplianceCheckId } from "@/lib/types";

export interface ComplianceCheckMarkProps {
    id: ComplianceCheckId;
    state: CheckState;
}

export function ComplianceCheckMark({ id, state }: ComplianceCheckMarkProps) {
    const check = COMPLIANCE_CHECKS[id];
    const meta = CHECK_STATES[state];
    const StateIcon = meta.icon;

    return (
        <li className="flex min-w-0 items-center gap-2">
            <span
                className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-md",
                    chartToneSoft[meta.tone],
                )}
            >
                <StateIcon
                    className="size-3"
                    strokeWidth={1.5}
                    aria-hidden="true"
                />
            </span>
            <span className="text-text-secondary min-w-0 flex-1 truncate text-xs">
                {check.label}
            </span>
            <span
                className={cn(
                    "shrink-0 text-xs font-medium",
                    chartToneText[meta.tone],
                )}
            >
                {meta.label}
            </span>
        </li>
    );
}

ComplianceCheckMark.displayName = "ComplianceCheckMark";
