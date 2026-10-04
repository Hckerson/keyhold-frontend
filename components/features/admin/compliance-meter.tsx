import { chartToneText } from "@/lib/config/chart-tones";
import { complianceTone } from "@/lib/config/moderation-tones";
import { cn } from "@/lib/utils";

const CLEAR_LABEL = "compliance clear";

export interface ComplianceMeterProps {
    score: number;
    label: string;
    className?: string;
}

export function ComplianceMeter({
    score,
    label,
    className,
}: ComplianceMeterProps) {
    return (
        <span
            role="img"
            className={cn("flex items-center justify-end gap-1.5", className)}
            aria-label={`${label} ${score}% ${CLEAR_LABEL}`}
        >
            <span
                className={cn(
                    "shrink-0 text-right text-xs font-medium tabular-nums",
                    chartToneText[complianceTone(score)],
                )}
            >
                {score}%
            </span>
        </span>
    );
}

ComplianceMeter.displayName = "ComplianceMeter";
