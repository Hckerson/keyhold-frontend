"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ReportExportModal } from "@/components/features/admin/report-export-modal";
import { AdminReportsHeader } from "@/components/sections/admin/admin-reports-header";
import { AdminReportsMain } from "@/components/sections/admin/admin-reports-main";
import { AdminReportsRail } from "@/components/sections/admin/admin-reports-rail";
import { AdminReportsStatBand } from "@/components/sections/admin/admin-reports-stat-band";
import { ConsoleSkeleton } from "@/components/patterns/console-skeleton";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    regionPerformance,
    reportSignals,
    reportStats,
    toReportSections,
    REPORT_EXPORT_FILENAME,
} from "@/lib/data/admin-reports";
import {
    reportMonths,
    reportPeriodLabel,
    reportTrendMetrics,
} from "@/lib/data/admin-report-trend";
import {
    DEFAULT_REPORT_PERIOD,
    REPORT_SECTION_IDS,
    type ReportSectionId,
} from "@/lib/config/report-export";
import {
    usePlatformStats,
    useRegionMetrics,
    useTrendStats,
    useUserStats,
} from "@/lib/hooks/use-stats";
import { useTierDistribution, useUsers } from "@/lib/hooks/use-users";
import { toRoleSegments, toTierSegments } from "@/lib/utils/to-user-segments";
import { downloadCsv } from "@/lib/utils/download";
import type { TimeFilter } from "@/lib/enums/enums";

export function AdminReportsConsole() {
    const [period, setPeriod] = useState<TimeFilter>(DEFAULT_REPORT_PERIOD);
    const [customising, setCustomising] = useState(false);
    const [queued, setQueued] = useState<readonly ReportSectionId[] | null>(
        null,
    );

    const platform = usePlatformStats();
    const users = useUserStats();
    const directory = useUsers();
    const tiers = useTierDistribution();
    const regions = useRegionMetrics();
    const trend = useTrendStats(period);

    const ranked = useMemo(
        () => regionPerformance(regions.data ?? []),
        [regions.data],
    );

    const months = useMemo(() => reportMonths(trend.data), [trend.data]);

    const roles = useMemo(
        () => toRoleSegments(directory.data ?? []),
        [directory.data],
    );

    const tierSegments = useMemo(
        () => toTierSegments(tiers.data),
        [tiers.data],
    );

    const exportReport = useCallback(
        (chosen: TimeFilter, sections: readonly ReportSectionId[]) =>
            downloadCsv(
                toReportSections(sections, ranked, months),
                REPORT_EXPORT_FILENAME(chosen),
            ),
        [ranked, months],
    );

    const onDownload = useCallback(
        () => exportReport(period, REPORT_SECTION_IDS),
        [exportReport, period],
    );

    const onGenerate = useCallback(
        (chosen: TimeFilter, sections: ReportSectionId[]) => {
            setPeriod(chosen);
            setCustomising(false);
            setQueued(sections);
        },
        [],
    );

    useEffect(() => {
        if (!queued || trend.isFetching) return;
        exportReport(period, queued);
        setQueued(null);
    }, [queued, trend.isFetching, exportReport, period]);

    const queries = [platform, users, directory, tiers, regions, trend];

    if (queries.some((entry) => entry.isError))
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.adminReports}
                onRetry={() => queries.forEach((entry) => void entry.refetch())}
            />
        );

    if (queries.some((entry) => entry.isPending)) return <ConsoleSkeleton />;

    return (
        <div className="flex flex-col gap-4">
            <AdminReportsHeader
                period={reportPeriodLabel(trend.data)}
                onDownload={onDownload}
                onCustomise={() => setCustomising(true)}
            />

            <AdminReportsStatBand
                stats={reportStats(platform.data, users.data)}
            />

            <div className="console-split gap-3">
                <AdminReportsMain
                    regions={ranked}
                    metrics={reportTrendMetrics(trend.data)}
                    months={months}
                    period={reportPeriodLabel(trend.data)}
                />
                <AdminReportsRail
                    signals={reportSignals(
                        platform.data,
                        users.data,
                        regions.data ?? [],
                        trend.data,
                    )}
                    roles={roles}
                    tiers={tierSegments}
                />
            </div>

            <ReportExportModal
                key={period}
                open={customising}
                period={period}
                onClose={() => setCustomising(false)}
                onGenerate={onGenerate}
            />
        </div>
    );
}

AdminReportsConsole.displayName = "AdminReportsConsole";
