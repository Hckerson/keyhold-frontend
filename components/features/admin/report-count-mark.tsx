import { reportTone } from "@/lib/config/moderation-tones";
import { chartToneText } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";

const NO_REPORTS = "—";
const REPORTS_NOUN = "user reports";

export interface ReportCountMarkProps {
    reports: number;
    className?: string;
}

export function ReportCountMark({ reports, className }: ReportCountMarkProps) {
    if (reports === 0) {
        return (
            <span className={cn("text-text-muted text-xs", className)}>
                {NO_REPORTS}
            </span>
        );
    }

    return (
        <span
            className={cn(
                "text-xs tabular-nums",
                chartToneText[reportTone(reports)],
                className,
            )}
        >
            {reports}
            <span className="sr-only"> {REPORTS_NOUN}</span>
        </span>
    );
}

ReportCountMark.displayName = "ReportCountMark";
