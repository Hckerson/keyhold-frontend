import { ProgressBar } from "@/components/ui/progress-bar";
import { complianceTone } from "@/lib/config/moderation-tones";
import { chartToneText } from "@/lib/config/chart-tones";
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
    const tone = complianceTone(score);

    return (
        <span
            className={cn("flex items-center justify-end gap-1.5", className)}
            aria-label={`${label} ${score}% ${CLEAR_LABEL}`}
        >
            <ProgressBar value={score} tone={tone} className="w-10" />
            <span
                className={cn(
                    "w-8 shrink-0 text-right text-xs font-medium tabular-nums",
                    chartToneText[tone],
                )}
            >
                {score}%
            </span>
        </span>
    );
}

ComplianceMeter.displayName = "ComplianceMeter";
