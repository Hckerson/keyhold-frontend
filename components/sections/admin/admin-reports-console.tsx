"use client";

import { useMemo, useState } from "react";
import { ReportExportModal } from "@/components/features/admin/report-export-modal";
import { AdminReportsHeader } from "@/components/sections/admin/admin-reports-header";
import { AdminReportsMain } from "@/components/sections/admin/admin-reports-main";
import { AdminReportsStatBand } from "@/components/sections/admin/admin-reports-stat-band";
import { ConsoleGroup } from "@/components/patterns/console-group";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    DEFAULT_REPORT_PERIOD,
    REPORT_EXPORT_COPY,
    reportExportFilename,
    reportGrainOf,
    reportSectionChoices,
    type ReportSectionId,
} from "@/lib/config/report-export";
import { reportMonths, reportWindowLabel } from "@/lib/data/admin-reports";
import { trendGrain } from "@/lib/data/admin-reports-days";
import { reportMarkets } from "@/lib/data/admin-reports-audience";
import { toReportSections } from "@/lib/data/admin-reports-csv";
import { reportMeasures } from "@/lib/data/admin-reports-measures";
import { useRegionMetrics, useTrendStats } from "@/lib/hooks/use-stats";
import { downloadCsv } from "@/lib/utils/download";
import type { TimeFilter } from "@/lib/enums/enums";

export function AdminReportsConsole() {
    const [period, setPeriod] = useState<TimeFilter>(DEFAULT_REPORT_PERIOD);
    const [exporting, setExporting] = useState(false);

    const regions = useRegionMetrics();
    const trend = useTrendStats(period);

    const grain = trendGrain(trend.data, reportGrainOf(period));
    const months = useMemo(
        () => reportMonths(trend.data, new Date(), grain),
        [trend.data, grain],
    );
    const measures = useMemo(() => reportMeasures(months), [months]);
    const markets = useMemo(
        () => reportMarkets(regions.data ?? []),
        [regions.data],
    );

    if (trend.isError)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.adminReports}
                onRetry={() => void trend.refetch()}
            />
        );

    const span = reportWindowLabel(months);
    const updating = trend.isPending || trend.isPlaceholderData;

    const onExport = (sections: ReportSectionId[]) => {
        downloadCsv(
            toReportSections(sections, months, markets),
            reportExportFilename(period),
        );
        setExporting(false);
    };

    return (
        <div className="flex flex-col gap-4">
            <AdminReportsHeader
                span={updating ? undefined : span}
                period={period}
                onPeriodChange={setPeriod}
                exportDisabled={updating}
                onExport={() => setExporting(true)}
            />

            <ConsoleGroup
                label={REPORT_EXPORT_COPY.window}
                dimmed={trend.isPlaceholderData}
            >
                <AdminReportsStatBand
                    measures={measures}
                    grain={grain}
                    pending={trend.isPending}
                />
                <AdminReportsMain months={months} pending={trend.isPending} />
            </ConsoleGroup>

            <ReportExportModal
                open={exporting}
                span={span}
                choices={reportSectionChoices(regions.isSuccess, grain)}
                note={
                    regions.isError
                        ? REPORT_EXPORT_COPY.marketsUnavailable
                        : undefined
                }
                onClose={() => setExporting(false)}
                onExport={onExport}
            />
        </div>
    );
}

AdminReportsConsole.displayName = "AdminReportsConsole";
