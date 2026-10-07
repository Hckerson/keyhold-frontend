import { DEFAULT_COMMISSION_RATE } from "@/lib/constants";
import { REPORT_MEASURES } from "@/lib/config/report-measures";
import { fillMonths, monthLabel } from "@/lib/data/admin-overview";
import {
    formatCompactUsd,
    formatCount,
    formatCountOf,
    formatMonthName,
} from "@/lib/utils";
import type {
    DataTableGroupDef,
    ReportMeasureId,
    ReportMonth,
} from "@/lib/types";
import type { GrowthPoint, TrendStats } from "@/lib/validations/stats";

type Tally = Pick<ReportMonth, "gmv" | "deals" | "listings" | "members">;

const NO_ACTIVITY = "No activity recorded yet";
const MONTH_NOUN = "month";
const EMPTY_TALLY: Tally = { gmv: 0, deals: 0, listings: 0, members: 0 };

const VALUE_OF: Record<ReportMeasureId, (tally: Tally) => number | null> = {
    gmv: (tally) => tally.gmv,
    deals: (tally) => tally.deals,
    average: (tally) => (tally.deals ? tally.gmv / tally.deals : null),
    commission: (tally) => tally.gmv * DEFAULT_COMMISSION_RATE,
    listings: (tally) => tally.listings,
    members: (tally) => tally.members,
};

const monthKeyOf = (today: Date) =>
    `${today.getUTCFullYear()}-${String(today.getUTCMonth() + 1).padStart(2, "0")}`;

const valueAt = (points: GrowthPoint[], key: string) =>
    points.find((point) => point.name === key)?.value ?? 0;

export const reportMonths = (
    trend: TrendStats | undefined,
    today = new Date(),
): ReportMonth[] => {
    if (!trend) return [];
    const keys = [trend.gmv, trend.deals, trend.listings, trend.users]
        .flat()
        .map((point) => point.name)
        .sort();
    if (keys.length === 0) return [];

    const axis = fillMonths([
        { name: keys[0], value: 0 },
        { name: keys[keys.length - 1], value: 0 },
    ]);
    const current = monthKeyOf(today);

    return axis.map(({ name }, index) => {
        const year = name.slice(0, 4);
        const month = monthLabel(name);
        const marksYear = index === 0 || name.endsWith("-01");

        return {
            key: name,
            year,
            name: formatMonthName(name),
            label: `${month} ${year}`,
            tick: marksYear ? `${month} ’${year.slice(2)}` : month,
            gmv: valueAt(trend.gmv, name),
            deals: valueAt(trend.deals, name),
            listings: valueAt(trend.listings, name),
            members: valueAt(trend.users, name),
            partial: name === current,
        };
    });
};

export const measureValue = (tally: Tally, id: ReportMeasureId) =>
    VALUE_OF[id](tally);

export const measureTotal = (months: ReportMonth[], id: ReportMeasureId) =>
    VALUE_OF[id](
        months.reduce(
            (total, month) => ({
                gmv: total.gmv + month.gmv,
                deals: total.deals + month.deals,
                listings: total.listings + month.listings,
                members: total.members + month.members,
            }),
            EMPTY_TALLY,
        ),
    );

export const formatMeasure = (id: ReportMeasureId, value: number | null) => {
    if (!value) return null;
    return REPORT_MEASURES[id].money
        ? formatCompactUsd(value)
        : formatCount(value);
};

export const reportWindowLabel = (months: ReportMonth[]) => {
    if (months.length === 0) return NO_ACTIVITY;
    const first = months[0].label;
    const last = months[months.length - 1].label;
    return first === last ? first : `${first} – ${last}`;
};

export const reportYears = (months: ReportMonth[]): DataTableGroupDef[] =>
    [...new Set(months.map((month) => month.year))]
        .reverse()
        .map((year, index) => ({
            id: year,
            label: year,
            caption: formatCountOf(
                months.filter((month) => month.year === year).length,
                MONTH_NOUN,
            ),
            collapsed: index > 0,
        }));
