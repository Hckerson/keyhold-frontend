"use client";

import { StatusBadge } from "@/components/ui/status-badge";
import {
    flagStatusMeta,
    flagTypeMeta,
    type AbuseReport,
} from "@/lib/data/admin-flags";
import { cn } from "@/lib/utils";

export interface AbuseReportRowProps {
    report: AbuseReport;
    selected: boolean;
    onSelect: (id: string) => void;
}

export function AbuseReportRow({
    report,
    selected,
    onSelect,
}: AbuseReportRowProps) {
    const meta = flagStatusMeta[report.status];

    return (
        <button
            type="button"
            aria-current={selected}
            onClick={() => onSelect(report.id)}
            className={cn(
                "ease-smooth focus-visible:ring-accent flex w-full items-start gap-2.5 border-l-2 px-3 py-2.5 text-left transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                selected
                    ? "border-l-accent bg-accent-light"
                    : "hover:bg-background-alt border-l-transparent",
            )}
        >
            <div className="min-w-0 flex-1">
                <p className="text-text truncate text-xs font-semibold">
                    {report.subject}
                </p>
                <p className="text-text-muted mt-1 truncate text-xs">
                    {flagTypeMeta[report.type].label} · {report.reason}
                </p>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-1">
                <StatusBadge tone={meta.tone}>{meta.label}</StatusBadge>
                <p
                    className={cn(
                        "font-mono text-[10px] tracking-wide tabular-nums",
                        meta.open && report.waitingDays > 0
                            ? "text-warning"
                            : "text-text-muted",
                    )}
                >
                    {report.waitingDays}d
                </p>
            </div>
        </button>
    );
}

AbuseReportRow.displayName = "AbuseReportRow";
