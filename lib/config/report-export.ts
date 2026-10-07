import type { TimeFilter } from "@/lib/enums/enums";
import type { FilterPill } from "@/lib/types";

export const DEFAULT_REPORT_PERIOD: TimeFilter = "month";

export const REPORT_WINDOWS: readonly FilterPill<TimeFilter>[] = [
    { id: "day", label: "7 days" },
    { id: "month", label: "12 months" },
    { id: "year", label: "5 years" },
];

export const REPORT_SECTION_CHOICES = [
    {
        id: "periods",
        label: "Monthly statement",
        caption: "Volume, deals, listings and members by month",
    },
    {
        id: "regions",
        label: "Markets",
        caption: "Settled volume by region, all time",
    },
] as const;

export type ReportSectionId = (typeof REPORT_SECTION_CHOICES)[number]["id"];

export const REPORT_SECTION_IDS: readonly ReportSectionId[] =
    REPORT_SECTION_CHOICES.map((choice) => choice.id);

export const reportExportFilename = (period: TimeFilter) =>
    `platform-report-${period}.csv`;

export const REPORT_EXPORT_COPY = {
    trigger: "Export",
    title: "Export report",
    hint: "A CSV of the window on screen",
    sections: "Tables to include",
    cancel: "Not now",
    confirm: "Download CSV",
} as const;
