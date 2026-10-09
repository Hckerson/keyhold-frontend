import type { TimeFilter } from "@/lib/enums/enums";
import type { FilterPill, ReportGrain } from "@/lib/types";

export const DEFAULT_REPORT_PERIOD: TimeFilter = "month";

export const REPORT_WINDOWS: readonly FilterPill<TimeFilter>[] = [
    { id: "day", label: "7 days" },
    { id: "month", label: "12 months" },
    { id: "year", label: "5 years" },
];

export const REPORT_DAY_WINDOW = 7;

export const reportGrainOf = (period: TimeFilter): ReportGrain =>
    period === "day" ? "day" : "month";

export const REPORT_GRAINS: Record<
    ReportGrain,
    {
        noun: string;
        column: string;
        statement: string;
        caption: string;
        empty: string;
        inProgress: string;
        band: string;
    }
> = {
    month: {
        noun: "month",
        column: "Month",
        statement: "Monthly statement",
        caption: "Volume, deals, listings and members by month",
        empty: "No months to report",
        inProgress: "is month to date",
        band: "Totals for the window, with the last complete month",
    },
    day: {
        noun: "day",
        column: "Day",
        statement: "Daily statement",
        caption: "Volume, deals, listings and members by day",
        empty: "No days to report",
        inProgress: "is still in progress",
        band: "Totals for the window, with the last complete day",
    },
};

export type ReportSectionId = "periods" | "regions";

export interface ReportSectionChoice {
    id: ReportSectionId;
    label: string;
    caption: string;
}

const MARKETS_CHOICE: ReportSectionChoice = {
    id: "regions",
    label: "Markets",
    caption: "Settled volume by region, all time",
};

export const reportSectionChoices = (
    marketsReady: boolean,
    grain: ReportGrain,
): ReportSectionChoice[] => [
    {
        id: "periods",
        label: REPORT_GRAINS[grain].statement,
        caption: REPORT_GRAINS[grain].caption,
    },
    ...(marketsReady ? [MARKETS_CHOICE] : []),
];

export const reportExportFilename = (period: TimeFilter) =>
    `platform-report-${period}.csv`;

export const REPORT_EXPORT_COPY = {
    trigger: "Export",
    title: "Export report",
    hint: "A CSV of the window on screen",
    sections: "Tables to include",
    cancel: "Not now",
    confirm: "Download CSV",
    marketsUnavailable:
        "Markets are unavailable right now, so they are left out.",
    window: "Selected window",
} as const;
