import type { RegionPerformance } from "@/lib/types";
import type { CsvSection } from "@/lib/utils/download";
import type { ReportSectionId } from "@/lib/config/report-export";
import type { TimeFilter } from "@/lib/enums/enums";

export const REPORT_EXPORT_FILENAME = (period: TimeFilter) =>
    `platform-report-${period}.csv`;

const REGION_SECTION: CsvSection = {
    title: "Regional performance",
    columns: ["Rank", "Region", "Listings", "Average price", "Volume", "Share"],
    rows: [],
};

const PERIOD_SECTION: CsvSection = {
    title: "Trend",
    columns: ["Period", "GMV", "Closed deals", "Members joined"],
    rows: [],
};

export const toReportSections = (
    sections: readonly ReportSectionId[],
    regions: RegionPerformance[],
    periods: Record<string, string | number>[],
): CsvSection[] => [
    ...(sections.includes("regions")
        ? [
              {
                  ...REGION_SECTION,
                  rows: regions.map((region) => [
                      region.rank,
                      region.region,
                      region.listings,
                      region.avgPrice,
                      region.volume,
                      `${region.share}%`,
                  ]),
              },
          ]
        : []),
    ...(sections.includes("periods")
        ? [
              {
                  ...PERIOD_SECTION,
                  rows: periods.map((period) => [
                      period.month,
                      period.gmv,
                      period.deals,
                      period.users,
                  ]),
              },
          ]
        : []),
];
