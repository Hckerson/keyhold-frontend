import {
    REPORT_MEASURES,
    REPORT_MEASURE_IDS,
} from "@/lib/config/report-measures";
import { grainOf, measureValue } from "@/lib/data/admin-reports";
import {
    REPORT_GRAINS,
    type ReportSectionId,
} from "@/lib/config/report-export";
import type { ReportMarket, ReportMonth } from "@/lib/types";
import type { CsvSection } from "@/lib/utils/download";

const PARTIAL_NOTE = "to date";

const statementSection = (months: ReportMonth[]): CsvSection => ({
    title: REPORT_GRAINS[grainOf(months)].statement,
    columns: [
        REPORT_GRAINS[grainOf(months)].column,
        ...REPORT_MEASURE_IDS.map((id) => REPORT_MEASURES[id].label),
    ],
    rows: months.map((month) => [
        month.partial ? `${month.label} (${PARTIAL_NOTE})` : month.label,
        ...REPORT_MEASURE_IDS.map((id) => {
            const value = measureValue(month, id);
            return value === null ? null : Math.round(value);
        }),
    ]),
});

const marketSection = (markets: ReportMarket[]): CsvSection => ({
    title: "Markets",
    columns: ["Region", "Listings", "Average price", "Settled volume", "Share"],
    rows: markets.map((market) => [
        market.region,
        market.listings,
        Math.round(market.avgPrice),
        market.volume,
        `${market.share}%`,
    ]),
});

export const toReportSections = (
    sections: readonly ReportSectionId[],
    months: ReportMonth[],
    markets: ReportMarket[],
): CsvSection[] => [
    ...(sections.includes("periods") ? [statementSection(months)] : []),
    ...(sections.includes("regions") ? [marketSection(markets)] : []),
];
