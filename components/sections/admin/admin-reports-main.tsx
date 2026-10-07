"use client";

import { useMemo } from "react";
import { CalendarRange } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { DataTable } from "@/components/patterns/data-table";
import { SkeletonRows } from "@/components/patterns/skeleton-rows";
import { buildStatementConfig } from "@/components/features/admin/report-statement-columns";
import { reportYears } from "@/lib/data/admin-reports";
import type { ReportMeasureId, ReportMonth } from "@/lib/types";

const TITLE = "Monthly statement";
const LEDE = "Newest first, with a subtotal for each year";
const EMPTY_TITLE = "No months to report";
const EMPTY_LEDE = "Settled deals, listings and sign-ups land here by month.";

export interface AdminReportsMainProps {
    months: ReportMonth[];
    measure: ReportMeasureId;
    pending?: boolean;
}

export function AdminReportsMain({
    months,
    measure,
    pending,
}: AdminReportsMainProps) {
    const years = useMemo(() => reportYears(months), [months]);
    const config = useMemo(
        () => buildStatementConfig(measure, years),
        [measure, years],
    );

    return (
        <Panel
            title={TITLE}
            description={LEDE}
            count={months.length}
            className="console-span-2 self-start"
        >
            {pending ? (
                <SkeletonRows tall />
            ) : months.length > 0 ? (
                <DataTable
                    key={years.map((year) => year.id).join()}
                    {...config}
                    data={months}
                    className="-mx-4 -mt-2.5 -mb-4"
                />
            ) : (
                <EmptyState
                    icon={CalendarRange}
                    title={EMPTY_TITLE}
                    description={EMPTY_LEDE}
                />
            )}
        </Panel>
    );
}

AdminReportsMain.displayName = "AdminReportsMain";
