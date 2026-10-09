import type { ReportMeasureId } from "@/lib/types";

export interface ReportMeasureMeta {
    label: string;
    column: string;
    derived: boolean;
    money: boolean;
    divideBy: number;
    fractionDigits: number;
    suffix: string;
}

const MONEY_PREFIX = "$";

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
    gmv: { label: "Settled GMV", column: "GMV", derived: false, ...MILLIONS },
    deals: {
        label: "Closed deals",
        column: "Deals",
        derived: false,
        ...UNITS,
    },
    average: {
        label: "Average deal",
        column: "Avg deal",
        derived: true,
        ...MILLIONS,
    },
    commission: {
        label: "Est. commission",
        column: "Commission",
        derived: true,
        ...THOUSANDS,
    },
    listings: {
        label: "New listings",
        column: "Listings",
        derived: false,
        ...UNITS,
    },
    members: {
        label: "New members",
        column: "Members",
        derived: false,
        ...UNITS,
    },
};

export const REPORT_MEASURE_IDS = Object.keys(
    REPORT_MEASURES,
) as ReportMeasureId[];

export const DEFAULT_REPORT_MEASURE: ReportMeasureId = "gmv";

export const measureAxis = (id: ReportMeasureId) => {
    const meta = REPORT_MEASURES[id];
    return {
        divideBy: meta.divideBy,
        fractionDigits: meta.fractionDigits,
        valuePrefix: meta.money ? MONEY_PREFIX : "",
        valueSuffix: meta.suffix,
    };
};
