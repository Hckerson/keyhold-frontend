"use client";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { SignalGrid, type Signal } from "@/components/patterns/signal-grid";
import {
    flagActionsByStatus,
    flagStatusMeta,
    flagTypeMeta,
    type AbuseReport,
    type FlagSettleMode,
} from "@/lib/data/admin-flags";

const REPORTED_LABEL = "What was reported";
const DETAILS_LABEL = "Reporter's account";
const NO_DETAILS = "The reporter left no further detail.";
const SETTLED_LEDE = "This report is settled. Its record is read-only.";

export interface AbuseReportPaneProps {
    report: AbuseReport;
    pending: boolean;
    onAction: (mode: FlagSettleMode) => void;
}

export function AbuseReportPane({
    report,
    pending,
    onAction,
}: AbuseReportPaneProps) {
    const meta = flagStatusMeta[report.status];
    const actions = flagActionsByStatus[report.status];

    const signals: Signal[] = [
        { label: "Kind", value: flagTypeMeta[report.type].label },
        { label: "Reported by", value: report.reporter },
        { label: "Reason", value: report.reason },
        { label: "Open", value: `${report.waitingDays}d` },
    ];

    return (
        <section className="bg-background-muted border-border-light overflow-hidden rounded-xl border shadow-sm">
            <div className="border-border-light flex items-start justify-between gap-3 border-b px-4 py-3">
                <div className="min-w-0">
                    <h2 className="text-text truncate text-xs font-semibold">
                        {report.subject}
                    </h2>
                    <p className="text-text-muted truncate text-xs">
                        {flagTypeMeta[report.type].label}
                    </p>
                </div>
                <StatusBadge tone={meta.tone} size="md">
                    {meta.label}
                </StatusBadge>
            </div>

            <div className="flex flex-col gap-4 px-4 py-3">
                <SignalGrid signals={signals} />

                {report.subjectDetail && (
                    <div>
                        <p className="micro-label">{REPORTED_LABEL}</p>
                        <p className="text-text-secondary mt-1.5 text-xs break-words">
                            {report.subjectDetail}
                        </p>
                    </div>
                )}

                <div>
                    <p className="micro-label">{DETAILS_LABEL}</p>
                    <p className="text-text-secondary mt-1.5 text-xs break-words">
                        {report.details ?? NO_DETAILS}
                    </p>
                </div>
            </div>

            <div className="border-border-light bg-background-alt flex flex-wrap items-center gap-2 border-t px-4 py-3">
                {actions.length === 0 ? (
                    <p className="text-text-muted text-xs">{SETTLED_LEDE}</p>
                ) : (
                    actions.map((action) => (
                        <Button
                            key={action.mode}
                            emphasis={action.destructive ? "outline" : "solid"}
                            tone={action.destructive ? "error" : "accent"}
                            isLoading={pending}
                            onClick={() => onAction(action.mode)}
                        >
                            {action.label}
                        </Button>
                    ))
                )}
            </div>
        </section>
    );
}

AbuseReportPane.displayName = "AbuseReportPane";
