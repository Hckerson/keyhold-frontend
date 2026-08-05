import type { ReportTrendMetric } from "@/lib/types";
import { CLOSED_DEALS_YTD, GMV_YTD } from "@/lib/data/admin-platform";
import { TOTAL_USERS, USER_GROWTH_SERIES } from "@/lib/data/admin-users";
import { formatCompactUsd, formatCount, formatMillions } from "@/lib/utils";

const MONTH_LABELS = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const GMV_WEIGHTS = [0.14, 0.15, 0.16, 0.18, 0.19, 0.18];
const DEAL_WEIGHTS = [0.15, 0.15, 0.17, 0.17, 0.18, 0.18];
const GMV_YOY_CHANGE = "+22%";

const sum = (values: number[]) =>
    values.reduce((total, value) => total + value, 0);

const average = (values: number[]) => Math.round(sum(values) / values.length);

const distribute = (total: number, weights: number[]) => {
    const parts = weights.map((weight) => Math.round(total * weight));
    const drift = total - sum(parts);
    return parts.map((part, index) =>
        index === parts.length - 1 ? part + drift : part,
    );
};

const peakMonthFor = (values: number[]) =>
    MONTH_LABELS[values.indexOf(Math.max(...values))];

const latestChange = (values: number[]) => {
    const prior = values[values.length - 2];
    const latest = values[values.length - 1];
    return Math.round(((latest - prior) / prior) * 1_000) / 10;
};

const signed = (value: number) => `${value >= 0 ? "+" : ""}${value}%`;

const GMV_BY_MONTH = distribute(GMV_YTD, GMV_WEIGHTS);
const DEALS_BY_MONTH = distribute(CLOSED_DEALS_YTD, DEAL_WEIGHTS);
const USERS_BY_MONTH = USER_GROWTH_SERIES;

export const REPORT_MONTHS: Record<string, string | number>[] =
    MONTH_LABELS.map((month, index) => ({
        month,
        gmv: GMV_BY_MONTH[index],
        deals: DEALS_BY_MONTH[index],
        users: USERS_BY_MONTH[index],
    }));

export const REPORT_PERIOD_LABEL = `${MONTH_LABELS[0]}–${
    MONTH_LABELS[MONTH_LABELS.length - 1]
} · ${MONTH_LABELS.length} months tracked`;

const dealsChange = latestChange(DEALS_BY_MONTH);
const usersChange = latestChange(USERS_BY_MONTH);

export const REPORT_TREND_METRICS: ReportTrendMetric[] = [
    {
        id: "gmv",
        label: "GMV",
        eyebrow: "Gross merchandise value · year to date",
        headline: formatMillions(GMV_YTD, 0),
        change: GMV_YOY_CHANGE,
        trend: "up",
        series: [{ key: "gmv", name: "Gross volume", tone: "accent" }],
        divideBy: 1_000_000,
        valuePrefix: "$",
        valueSuffix: "M",
        summary: [
            {
                label: "Peak month",
                value: `${peakMonthFor(GMV_BY_MONTH)} · ${formatCompactUsd(
                    Math.max(...GMV_BY_MONTH),
                )}`,
            },
            {
                label: "Monthly average",
                value: formatCompactUsd(average(GMV_BY_MONTH)),
            },
            {
                label: "Month over month",
                value: signed(latestChange(GMV_BY_MONTH)),
            },
        ],
    },
    {
        id: "deals",
        label: "Closed deals",
        eyebrow: "Closed deals · year to date",
        headline: formatCount(CLOSED_DEALS_YTD),
        change: signed(dealsChange),
        trend: dealsChange < 0 ? "down" : "up",
        series: [{ key: "deals", name: "Closed deals", tone: "info" }],
        divideBy: 1,
        valuePrefix: "",
        valueSuffix: "",
        summary: [
            {
                label: "Peak month",
                value: `${peakMonthFor(DEALS_BY_MONTH)} · ${Math.max(
                    ...DEALS_BY_MONTH,
                )}`,
            },
            {
                label: "Monthly average",
                value: formatCount(average(DEALS_BY_MONTH)),
            },
            {
                label: "Closed year to date",
                value: formatCount(CLOSED_DEALS_YTD),
            },
        ],
    },
    {
        id: "users",
        label: "Members",
        eyebrow: "Platform members · registered",
        headline: formatCount(TOTAL_USERS),
        change: signed(usersChange),
        trend: usersChange < 0 ? "down" : "up",
        series: [{ key: "users", name: "Platform members", tone: "highlight" }],
        divideBy: 1,
        valuePrefix: "",
        valueSuffix: "",
        summary: [
            { label: "Registered", value: formatCount(TOTAL_USERS) },
            {
                label: "Net added",
                value: `+${formatCount(
                    USERS_BY_MONTH[USERS_BY_MONTH.length - 1] -
                        USERS_BY_MONTH[0],
                )}`,
            },
            {
                label: "Peak month",
                value: `${peakMonthFor(USERS_BY_MONTH)} · ${formatCount(
                    Math.max(...USERS_BY_MONTH),
                )}`,
            },
        ],
    },
];
