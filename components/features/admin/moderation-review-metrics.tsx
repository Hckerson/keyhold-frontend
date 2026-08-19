import { format } from "date-fns";
import { MetricCell } from "@/components/patterns/metric-cell";
import { ReviewMetricStrip } from "@/components/patterns/review-metric-strip";
import { AgeMark } from "@/components/features/shared/age-mark";
import { ComplianceMeter } from "@/components/features/admin/compliance-meter";
import { ReportCountMark } from "@/components/features/admin/report-count-mark";
import { complianceScore, submittedAt } from "@/lib/data/admin-listings";
import { formatMillions } from "@/lib/utils";
import type { ModerationListing } from "@/lib/types";

const SUBMITTED_FORMAT = "MMM d · h:mm a";
const ASK_LABEL = "Asking";
const COMPLIANCE_LABEL = "Compliance";
const REPORTS_LABEL = "Reports";
const QUEUE_LABEL = "In queue";
const SUBMITTED_LABEL = "Submitted";

export interface ModerationReviewMetricsProps {
    listing: ModerationListing;
}

export function ModerationReviewMetrics({
    listing,
}: ModerationReviewMetricsProps) {
    return (
        <ReviewMetricStrip>
            <MetricCell label={ASK_LABEL}>
                <span className="tabular-nums">
                    {formatMillions(listing.price, 2)}
                </span>
            </MetricCell>
            <MetricCell label={COMPLIANCE_LABEL}>
                <ComplianceMeter
                    score={complianceScore(listing)}
                    label={listing.address}
                    className="justify-start"
                />
            </MetricCell>
            <MetricCell label={REPORTS_LABEL}>
                <ReportCountMark reports={listing.reports} />
            </MetricCell>
            <MetricCell label={QUEUE_LABEL}>
                <AgeMark minutes={listing.queuedMinutes} />
            </MetricCell>
            <MetricCell label={SUBMITTED_LABEL}>
                <span className="truncate tabular-nums">
                    {format(submittedAt(listing), SUBMITTED_FORMAT)}
                </span>
            </MetricCell>
        </ReviewMetricStrip>
    );
}

ModerationReviewMetrics.displayName = "ModerationReviewMetrics";
