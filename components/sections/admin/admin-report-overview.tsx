import { Panel } from "@/components/ui/panel";
import { ReportHeadlineCard } from "@/components/features/admin/report-headline-card";
import { ReportSignalList } from "@/components/features/admin/report-signal-list";
import { REPORT_HEADLINE, REPORT_SIGNALS } from "@/lib/data/admin-reports";

export function AdminReportOverview() {
    return (
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
            <ReportHeadlineCard headline={REPORT_HEADLINE} />

            <Panel
                title="Platform signals"
                description="Month over month movement"
                bodyClassName="pt-1"
            >
                <ReportSignalList signals={REPORT_SIGNALS} />
            </Panel>
        </div>
    );
}

AdminReportOverview.displayName = "AdminReportOverview";
