"use client";

import { AnimatePresence, m } from "motion/react";
import { PresenceSwap } from "@/components/patterns/presence-swap";
import { AbuseReportRow } from "@/components/features/admin/abuse-report-row";
import { LIST_ROW_MOTION } from "@/lib/config/motion";
import type { AbuseReport } from "@/lib/data/admin-flags";

const RAIL_LABEL = "Reports";
const EMPTY_LEDE = "No reports in this view.";

export interface AbuseReportRailProps {
    reports: AbuseReport[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export function AbuseReportRail({
    reports,
    selectedId,
    onSelect,
}: AbuseReportRailProps) {
    return (
        <div className="bg-background-muted border-border-light overflow-hidden rounded-xl border shadow-sm">
            <div className="border-border-light flex items-center justify-between gap-2 border-b px-3 py-2">
                <p className="micro-label">{RAIL_LABEL}</p>
                <span className="text-text-muted font-mono text-[10px] tabular-nums">
                    {reports.length}
                </span>
            </div>

            <PresenceSwap swapKey={reports.length === 0 ? "empty" : "queue"}>
                {reports.length === 0 ? (
                    <p className="text-text-muted px-3 py-10 text-center text-xs">
                        {EMPTY_LEDE}
                    </p>
                ) : (
                    <ul className="divide-border scroll-y max-h-[32rem] divide-y">
                        <AnimatePresence initial={false}>
                            {reports.map((report) => (
                                <m.li
                                    key={report.id}
                                    {...LIST_ROW_MOTION}
                                    className="overflow-hidden"
                                >
                                    <AbuseReportRow
                                        report={report}
                                        selected={report.id === selectedId}
                                        onSelect={onSelect}
                                    />
                                </m.li>
                            ))}
                        </AnimatePresence>
                    </ul>
                )}
            </PresenceSwap>
        </div>
    );
}

AbuseReportRail.displayName = "AbuseReportRail";
