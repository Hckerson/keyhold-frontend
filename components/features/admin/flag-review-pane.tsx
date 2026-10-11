"use client";

import { FlagClaim } from "@/components/features/admin/flag-claim";
import { FlagDecisionBar } from "@/components/features/admin/flag-decision-bar";
import { FactList } from "@/components/patterns/fact-list";
import { ReviewOutcome } from "@/components/patterns/review-outcome";
import { ReviewPaneHeader } from "@/components/patterns/review-pane-header";
import { FLAG_STATES } from "@/lib/config/flag-tones";
import { FLAG_COPY, subjectLink } from "@/lib/data/admin-flags";
import {
    flagOutcome,
    memberFacts,
    paneTitle,
    reportedLine,
    reporterFacts,
} from "@/lib/data/admin-flag-detail";
import type { FlagReport, FlagSettleMode } from "@/lib/types";

export interface FlagReviewPaneProps {
    report: FlagReport;
    busy: boolean;
    onAction: (mode: FlagSettleMode) => void;
}

export function FlagReviewPane({
    report,
    busy,
    onAction,
}: FlagReviewPaneProps) {
    return (
        <section className="bg-background border-border @container overflow-hidden rounded-xl border shadow-sm">
            <ReviewPaneHeader
                title={paneTitle(report)}
                caption={reportedLine(report)}
                link={subjectLink(report)}
            />

            <div className="grid gap-x-6 gap-y-5 p-4 @2xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                <FlagClaim report={report} />
                <div className="flex min-w-0 flex-col gap-5">
                    {report.target?.kind === "USER" && (
                        <FactList
                            title={FLAG_COPY.memberHeading}
                            facts={memberFacts(report.target)}
                        />
                    )}
                    <FactList
                        title={FLAG_COPY.reporterHeading}
                        facts={reporterFacts(report)}
                    />
                </div>
            </div>

            {FLAG_STATES[report.status].open ? (
                <FlagDecisionBar
                    report={report}
                    busy={busy}
                    onAction={onAction}
                />
            ) : (
                <ReviewOutcome outcome={flagOutcome(report)} />
            )}
        </section>
    );
}

FlagReviewPane.displayName = "FlagReviewPane";
