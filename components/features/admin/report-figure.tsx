import { NO_READING } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface ReportFigureProps {
    value: string | null;
    className?: string;
}

export function ReportFigure({ value, className }: ReportFigureProps) {
    if (!value) {
        return (
            <span className="text-text-muted font-normal">{NO_READING}</span>
        );
    }

    return <span className={cn("tabular-nums", className)}>{value}</span>;
}

ReportFigure.displayName = "ReportFigure";
