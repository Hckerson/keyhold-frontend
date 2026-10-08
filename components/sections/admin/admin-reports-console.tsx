"use client";

import { useMemo, useState } from "react";
import { ReportExportModal } from "@/components/features/admin/report-export-modal";
import { AdminReportsHeader } from "@/components/sections/admin/admin-reports-header";
import { AdminReportsMain } from "@/components/sections/admin/admin-reports-main";
import { AdminReportsRail } from "@/components/sections/admin/admin-reports-rail";
import { AdminReportsStatBand } from "@/components/sections/admin/admin-reports-stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    DEFAULT_REPORT_PERIOD,
    reportExportFilename,
    type ReportSectionId,
} from "@/lib/config/report-export";
import { reportMonths, reportWindowLabel } from "@/lib/data/admin-reports";
import {
    membersReading,
    reportMarkets,
    reportShares,
    rolesLine,
} from "@/lib/data/admin-reports-audience";
import { toReportSections } from "@/lib/data/admin-reports-csv";
import { reportMeasures } from "@/lib/data/admin-reports-measures";
import {
    useRegionMetrics,
    useTrendStats,
    useUserStats,
} from "@/lib/hooks/use-stats";
import { useTierDistribution, useUsers } from "@/lib/hooks/use-users";
import { downloadCsv } from "@/lib/utils/download";
import { toRoleSegments, toTierSegments } from "@/lib/utils/to-user-segments";
import type { TimeFilter } from "@/lib/enums/enums";

export function AdminReportsConsole() {
    const [period, setPeriod] = useState<TimeFilter>(DEFAULT_REPORT_PERIOD);
    const [exporting, setExporting] = useState(false);

    const users = useUserStats();
    const directory = useUsers();
    const tiers = useTierDistribution();
    const regions = useRegionMetrics();
    const trend = useTrendStats(period);

    const months = useMemo(() => reportMonths(trend.data), [trend.data]);
    const measures = useMemo(() => reportMeasures(months), [months]);
    const markets = useMemo(
        () => reportMarkets(regions.data ?? []),
        [regions.data],
    );
    const tierShares = useMemo(
        () => reportShares(toTierSegments(tiers.data)),
        [tiers.data],
    );
    const roles = useMemo(
        () => rolesLine(toRoleSegments(directory.data ?? [])),
        [directory.data],
    );

    const queries = [users, directory, tiers, regions, trend];

    if (queries.some((entry) => entry.isError))
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.adminReports}
                onRetry={() => queries.forEach((entry) => void entry.refetch())}
            />
        );

    const span = reportWindowLabel(months);

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
                span={span}
                period={period}
                onPeriodChange={setPeriod}
                onExport={() => setExporting(true)}
            />

            <AdminReportsStatBand
                measures={measures}
                pending={trend.isPending}
            />

            <div className="console-split gap-3">
                <AdminReportsMain months={months} pending={trend.isPending} />
                <AdminReportsRail
                    markets={markets}
                    tiers={tierShares}
                    roles={roles}
                    members={membersReading(users.data)}
                    pending={queries.some((entry) => entry.isPending)}
                />
            </div>

            <ReportExportModal
                open={exporting}
                span={span}
                onClose={() => setExporting(false)}
                onExport={onExport}
            />
        </div>
    );
}

AdminReportsConsole.displayName = "AdminReportsConsole";
