"use client";

import { useMemo } from "react";
import { CalendarRange } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { DataTable } from "@/components/patterns/data-table";
import { SkeletonRows } from "@/components/patterns/skeleton-rows";
import { buildStatementConfig } from "@/components/features/admin/report-statement-columns";
import { REPORT_GRAINS } from "@/lib/config/report-export";
import { grainOf, reportYears, statementNotes } from "@/lib/data/admin-reports";
import { DEFAULT_REPORT_MEASURE } from "@/lib/config/report-measures";
import type { ReportMonth } from "@/lib/types";

const LEDE = "A subtotal for each year · open a year to see its";

export interface AdminReportsMainProps {
    months: ReportMonth[];
    pending?: boolean;
}

export function AdminReportsMain({ months, pending }: AdminReportsMainProps) {
    const grain = grainOf(months);
    const copy = REPORT_GRAINS[grain];
    const years = useMemo(() => reportYears(months), [months]);
    const config = useMemo(
        () => buildStatementConfig(DEFAULT_REPORT_MEASURE, years, grain),
        [years, grain],
    );

    return (
        <Panel
            title={copy.statement}
            description={`${LEDE} ${copy.noun}s`}
            count={months.length}
        >
            {pending ? (
                <SkeletonRows tall />
            ) : months.length > 0 ? (
                <>
                    <DataTable
                        key={years.map((year) => year.id).join()}
                        {...config}
                        data={months}
                        className="-mx-4 -mt-2.5"
                    />
                    <p className="text-text-muted border-border-light -mx-4 -mb-4 border-t px-4 py-3 text-xs leading-relaxed">
                        {statementNotes(months)}
                    </p>
                </>
            ) : (
                <EmptyState
                    icon={CalendarRange}
                    title={copy.empty}
                    description={copy.caption}
                />
            )}
        </Panel>
    );
}

AdminReportsMain.displayName = "AdminReportsMain";
