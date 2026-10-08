import { NO_READING } from "@/lib/constants";
import {
    REPORT_MEASURES,
    REPORT_MEASURE_IDS,
} from "@/lib/config/report-measures";
import { monthLabel, monthOverMonth } from "@/lib/data/admin-overview";
import {
    formatMeasure,
    measureTotal,
    measureValue,
} from "@/lib/data/admin-reports";
import type { ReportMeasure, ReportMeasureId, ReportMonth } from "@/lib/types";

export const reportMeasures = (months: ReportMonth[]): ReportMeasure[] => {
    const complete = months.filter((month) => !month.partial);
    const latest = complete[complete.length - 1];
    const prior = complete[complete.length - 2];

    return REPORT_MEASURE_IDS.map((id) => {
        const value = latest ? measureValue(latest, id) : null;
        const reading = formatMeasure(id, value);

        return {
            id,
            label: REPORT_MEASURES[id].label,
            total: formatMeasure(id, measureTotal(months, id)) ?? NO_READING,
            latest: reading && `${monthLabel(latest.key)} ${reading}`,
            delta: prior
                ? monthOverMonth([
                      { name: prior.key, value: measureValue(prior, id) ?? 0 },
                      { name: latest.key, value: value ?? 0 },
                  ])
                : null,
            against: prior ? monthLabel(prior.key) : null,
        };
    });
};

export const measureSeries = (months: ReportMonth[], id: ReportMeasureId) =>
    months.map((month) => ({
        month: month.tick,
        value: measureValue(month, id) ?? 0,
    }));
