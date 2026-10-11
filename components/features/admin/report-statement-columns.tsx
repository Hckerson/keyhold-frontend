import { ReportFigure } from "@/components/features/admin/report-figure";
import { ReportMonthCell } from "@/components/features/admin/report-month-cell";
import { REPORT_GRAINS } from "@/lib/config/report-export";
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
    ReportGrain,
    ReportMeasureId,
    ReportMonth,
} from "@/lib/types";

const MIN_WIDTH = "36rem";
const MONTH_WIDTH = "11rem";
const CAPTION_DETAIL =
    "grouped by year, newest first: settled GMV, closed deals, average deal, estimated commission, new listings and new members, with a subtotal for each year and a total for the window";

const measureColumn =
    (focus: ReportMeasureId) =>
    (id: ReportMeasureId): DataTableColumn<ReportMonth> => ({
        id,
        label: REPORT_MEASURES[id].column,
        align: "right",
        wide: REPORT_MEASURES[id].derived,
        emphasis: id === focus ? "value" : "muted",
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
                className={id === focus ? "text-text" : undefined}
            />
        ),
    });

export function buildStatementConfig(
    focus: ReportMeasureId,
    years: DataTableGroupDef[],
    grain: ReportGrain,
): DataTableConfig<ReportMonth> {
    const copy = REPORT_GRAINS[grain];

    return {
        variant: "bare",
        caption: `${copy.statement} ${CAPTION_DETAIL}`,
        rowKey: (month) => month.key,
        defaultSort: { id: "month", direction: "desc" },
        grouping: { groups: years, of: (month) => month.year },
        minWidth: MIN_WIDTH,
        columns: [
            {
                id: "month",
                label: copy.column,
                width: MONTH_WIDTH,
                emphasis: "identity",
                sortValue: (month) => month.key,
                render: (month) => <ReportMonthCell month={month} />,
                footer: (rows) => formatCountOf(rows.length, copy.noun),
            },
            ...REPORT_MEASURE_IDS.map(measureColumn(focus)),
        ],
    };
}
