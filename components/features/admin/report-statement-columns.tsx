import { ReportFigure } from "@/components/features/admin/report-figure";
import { ReportMonthCell } from "@/components/features/admin/report-month-cell";
import {
    REPORT_MEASURES,
    REPORT_MEASURE_IDS,
} from "@/lib/config/report-measures";
import {
    formatMeasure,
    measureTotal,
    measureValue,
} from "@/lib/data/admin-reports";
import { formatCountOf } from "@/lib/utils";
import type {
    DataTableColumn,
    DataTableConfig,
    DataTableGroupDef,
    ReportMeasureId,
    ReportMonth,
} from "@/lib/types";

const MIN_WIDTH = "44rem";
const MONTH_NOUN = "month";
const CAPTION =
    "Monthly statement grouped by year, newest first: settled GMV, closed deals, average deal, estimated commission, new listings and new members, with a subtotal for each year and a total for the window";

const measureColumn =
    (focus: ReportMeasureId) =>
    (id: ReportMeasureId): DataTableColumn<ReportMonth> => ({
        id,
        label: REPORT_MEASURES[id].column,
        align: "right",
        width: REPORT_MEASURES[id].width,
        emphasis: id === focus ? "focal" : "muted",
        sortValue: (month) => measureValue(month, id) ?? -1,
        render: (month) => (
            <ReportFigure value={formatMeasure(id, measureValue(month, id))} />
        ),
        summary: (rows) => (
            <ReportFigure
                value={formatMeasure(id, measureTotal(rows, id))}
                className={id === focus ? "text-text" : "text-text-secondary"}
            />
        ),
        footer: (rows) => (
            <ReportFigure
                value={formatMeasure(id, measureTotal(rows, id))}
                className={id === focus ? "text-text font-semibold" : undefined}
            />
        ),
    });

export function buildStatementConfig(
    focus: ReportMeasureId,
    years: DataTableGroupDef[],
): DataTableConfig<ReportMonth> {
    return {
        variant: "bare",
        caption: CAPTION,
        rowKey: (month) => month.key,
        defaultSort: { id: "month", direction: "desc" },
        grouping: { groups: years, of: (month) => month.year },
        minWidth: MIN_WIDTH,
        columns: [
            {
                id: "month",
                label: "Month",
                emphasis: "identity",
                sortValue: (month) => month.key,
                render: (month) => <ReportMonthCell month={month} />,
                footer: (rows) => formatCountOf(rows.length, MONTH_NOUN),
            },
            ...REPORT_MEASURE_IDS.map(measureColumn(focus)),
        ],
    };
}
