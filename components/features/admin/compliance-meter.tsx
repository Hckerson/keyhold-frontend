import { ProgressBar } from "@/components/ui/progress-bar";
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
            className={cn("flex items-center justify-end gap-1.5", className)}
            aria-label={`${label} ${score}% ${CLEAR_LABEL}`}
        >
            <ProgressBar
                value={score}
                tone={complianceTone(score)}
                className="w-10"
            />
            <span className="text-text w-8 shrink-0 text-right text-xs font-medium tabular-nums">
                {score}%
            </span>
        </span>
    );
}

ComplianceMeter.displayName = "ComplianceMeter";
