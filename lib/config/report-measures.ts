import type { ReportMeasureId } from "@/lib/types";

export interface ReportMeasureMeta {
    label: string;
    column: string;
    width: string;
    money: boolean;
    divideBy: number;
    fractionDigits: number;
    suffix: string;
}

const MILLIONS = {
    money: true,
    divideBy: 1_000_000,
    fractionDigits: 1,
    suffix: "M",
};
const THOUSANDS = {
    money: true,
    divideBy: 1_000,
    fractionDigits: 0,
    suffix: "K",
};
const UNITS = { money: false, divideBy: 1, fractionDigits: 0, suffix: "" };

export const REPORT_MEASURES: Record<ReportMeasureId, ReportMeasureMeta> = {
    gmv: { label: "Settled GMV", column: "GMV", width: "5.5rem", ...MILLIONS },
    deals: {
        label: "Closed deals",
        column: "Deals",
        width: "4.5rem",
        ...UNITS,
    },
    average: {
        label: "Average deal",
        column: "Avg deal",
        width: "6.5rem",
        ...MILLIONS,
    },
    commission: {
        label: "Est. commission",
        column: "Commission",
        width: "7rem",
        ...THOUSANDS,
    },
    listings: {
        label: "New listings",
        column: "Listings",
        width: "5rem",
        ...UNITS,
    },
    members: {
        label: "New members",
        column: "Members",
        width: "5.5rem",
        ...UNITS,
    },
};

export const REPORT_MEASURE_IDS = Object.keys(
    REPORT_MEASURES,
) as ReportMeasureId[];

export const DEFAULT_REPORT_MEASURE: ReportMeasureId = "gmv";
