import type { Choice } from "@/components/patterns/choice-chips";
import { TIME_FILTERS, type TimeFilter } from "@/lib/enums/enums";

export const DEFAULT_REPORT_PERIOD: TimeFilter = "month";

const PERIOD_CAPTIONS: Record<TimeFilter, string> = {
    day: "Day by day",
    month: "Month by month",
    year: "Year by year",
};

const PERIOD_LABELS: Record<TimeFilter, string> = {
    day: "Daily",
    month: "Monthly",
    year: "Yearly",
};

export const REPORT_PERIOD_CHOICES: readonly Choice<TimeFilter>[] =
    TIME_FILTERS.map((id) => ({
        id,
        label: PERIOD_LABELS[id],
        caption: PERIOD_CAPTIONS[id],
    }));

export const REPORT_SECTION_CHOICES = [
    { id: "regions", label: "Regions", caption: "Volume by market" },
    { id: "periods", label: "Trend", caption: "GMV, deals, members" },
] as const;

export type ReportSectionId = (typeof REPORT_SECTION_CHOICES)[number]["id"];

export const REPORT_SECTION_IDS: readonly ReportSectionId[] =
    REPORT_SECTION_CHOICES.map((choice) => choice.id);

export const REPORT_EXPORT_COPY = {
    title: "Generate a custom report",
    hint: "Choose the reporting interval and the tables to include.",
    period: "Reporting interval",
    sections: "Tables to include",
    cancel: "Not now",
    confirm: "Generate report",
} as const;
