import { REPORT_SIGNAL_META } from "@/lib/config/report-tones";
import { chartToneSoft } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { ReportSignalId } from "@/lib/types";

export interface ReportSignalMarkProps {
    id: ReportSignalId;
    className?: string;
}

export function ReportSignalMark({ id, className }: ReportSignalMarkProps) {
    const { icon: Icon, label, tone } = REPORT_SIGNAL_META[id];

    return (
        <span className={cn("flex min-w-0 items-center gap-2", className)}>
            <span
                className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-md",
                    chartToneSoft[tone],
                )}
            >
                <Icon className="size-3" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className="text-text min-w-0 truncate text-xs font-medium">
                {label}
            </span>
        </span>
    );
}

ReportSignalMark.displayName = "ReportSignalMark";
