import type { ReportMonth } from "@/lib/types";

const TO_DATE = "to date";

export interface ReportMonthCellProps {
    month: ReportMonth;
}

export function ReportMonthCell({ month }: ReportMonthCellProps) {
    return (
        <span className="flex min-w-0 items-baseline gap-2">
            <span className="truncate">{month.name}</span>
            {month.partial && (
                <span className="text-text-muted shrink-0 font-normal">
                    {TO_DATE}
                </span>
            )}
        </span>
    );
}

ReportMonthCell.displayName = "ReportMonthCell";
