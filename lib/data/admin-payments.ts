import {
    AlertTriangle,
    BadgeDollarSign,
    Hourglass,
    Percent,
    Wallet,
} from "lucide-react";
import type { ColumnSeries } from "@/components/ui/charts/column-chart";
import type { FilterPill } from "@/components/patterns/filter-pills";
import type { ShareDatum } from "@/components/patterns/share-row";
import type { StatDatum } from "@/components/patterns/stat-cell";
import type { SelectOption } from "@/components/ui/forms/select";
import {
    PAYOUT_METHOD_ORDER,
    PAYOUT_METHODS,
    PAYOUT_PIPELINE_ORDER,
    PAYOUT_SLA_MINUTES,
    PAYOUT_STATES,
    REVENUE_STREAM_ORDER,
    REVENUE_STREAMS,
} from "@/lib/config/admin-tones";
import { PLATFORM_PAYOUT_FEE_RATE } from "@/lib/constants";
import { TAKE_RATE_LABEL } from "@/lib/data/admin-platform";
import type {
    MetricItem,
    Payout,
    PayoutMethod,
    PayoutStage,
    PayoutState,
    RevenueStream,
    RevenueStreamId,
} from "@/lib/types";
import {
    formatCompactUsd,
    formatCount,
    formatMillions,
    formatThousands,
} from "@/lib/utils";

interface RevenueMonth extends Record<string, string | number> {
    month: string;
    commission: number;
    fees: number;
    subscription: number;
    featured: number;
}

export type PayoutStateFilter = "all" | PayoutState;
export type PayoutMethodFilter = "all" | PayoutMethod;

const ALL_STATES_LABEL = "All";
const ALL_METHODS_LABEL = "All rails";
const NEXT_PAYOUT_RUN = "Aug 8";
const AVG_RELEASE_TIME = "3–5 days";

export const REVENUE_CHART_DIVISOR = 1_000;

export const REVENUE_MONTHS: RevenueMonth[] = [
    {
        month: "Jan",
        commission: 145_000,
        fees: 28_000,
        subscription: 19_000,
        featured: 9_000,
    },
    {
        month: "Feb",
        commission: 152_000,
        fees: 31_000,
        subscription: 20_000,
        featured: 11_000,
    },
    {
        month: "Mar",
        commission: 138_000,
        fees: 26_000,
        subscription: 21_000,
        featured: 8_000,
    },
    {
        month: "Apr",
        commission: 168_000,
        fees: 35_000,
        subscription: 22_000,
        featured: 12_000,
    },
    {
        month: "May",
        commission: 175_000,
        fees: 38_000,
        subscription: 23_000,
        featured: 14_000,
    },
    {
        month: "Jun",
        commission: 192_000,
        fees: 42_000,
        subscription: 24_000,
        featured: 16_000,
    },
    {
        month: "Jul",
        commission: 180_000,
        fees: 39_000,
        subscription: 26_000,
        featured: 15_000,
    },
];

export const REVENUE_SERIES: ColumnSeries[] = REVENUE_STREAM_ORDER.map(
    (id) => ({
        key: id,
        name: REVENUE_STREAMS[id].label,
        tone: REVENUE_STREAMS[id].tone,
    }),
);

const latestMonth = REVENUE_MONTHS[REVENUE_MONTHS.length - 1];
const priorMonth = REVENUE_MONTHS[REVENUE_MONTHS.length - 2];

const monthTotal = (month: RevenueMonth) =>
    REVENUE_STREAM_ORDER.reduce((total, id) => total + month[id], 0);

const percentMove = (current: number, previous: number) =>
    Math.round(((current - previous) / previous) * 1_000) / 10;

export const REVENUE_BREAKDOWN: RevenueStream[] = REVENUE_STREAM_ORDER.map(
    (id) => ({
        id,
        ytd: REVENUE_MONTHS.reduce((total, month) => total + month[id], 0),
        momChange: percentMove(latestMonth[id], priorMonth[id]),
    }),
);

export const REVENUE_YTD = REVENUE_BREAKDOWN.reduce(
    (total, stream) => total + stream.ytd,
    0,
);

export const REVENUE_MOM = percentMove(
    monthTotal(latestMonth),
    monthTotal(priorMonth),
);

export const streamShare = (stream: RevenueStream) =>
    Math.round((stream.ytd / REVENUE_YTD) * 100);

const streamYtd = (id: RevenueStreamId) =>
    REVENUE_BREAKDOWN.find((stream) => stream.id === id)?.ytd ?? 0;

export const MONTHLY_AVG_REVENUE = Math.round(
    REVENUE_YTD / REVENUE_MONTHS.length,
);

export const REVENUE_PERIOD_LABEL = `${REVENUE_MONTHS[0].month}–${latestMonth.month} · ${REVENUE_MONTHS.length} months tracked`;

export const PAYOUTS: Payout[] = [
    {
        id: "po-4826",
        recipient: "Marcus Webb",
        deal: "Ravenswood Estate",
        state: "failed",
        method: "wire",
        gross: 184_000,
        ageMinutes: 11_520,
        href: "/admin/transactions",
    },
    {
        id: "po-4821",
        recipient: "Sarah Chen",
        deal: "456 Oak Avenue",
        state: "review",
        method: "wire",
        gross: 80_000,
        ageMinutes: 8_640,
        href: "/admin/transactions",
    },
    {
        id: "po-4822",
        recipient: "Michael Rodriguez",
        deal: "789 Sunset Blvd",
        state: "review",
        method: "ach",
        gross: 73_750,
        ageMinutes: 4_320,
        href: "/admin/transactions",
    },
    {
        id: "po-4823",
        recipient: "Jennifer Martinez",
        deal: "234 Oak Street",
        state: "approved",
        method: "wire",
        gross: 112_500,
        ageMinutes: 2_880,
        href: "/admin/transactions",
    },
    {
        id: "po-4824",
        recipient: "David Williams",
        deal: "567 Palm Drive",
        state: "approved",
        method: "instant",
        gross: 95_000,
        ageMinutes: 1_440,
        href: "/admin/transactions",
    },
    {
        id: "po-4825",
        recipient: "Elena Vasquez",
        deal: "88 Harbor Point",
        state: "scheduled",
        method: "ach",
        gross: 64_000,
        ageMinutes: 720,
        href: "/admin/transactions",
    },
    {
        id: "po-4827",
        recipient: "Robert Chen",
        deal: "12 Vista Ridge",
        state: "scheduled",
        method: "instant",
        gross: 41_500,
        ageMinutes: 300,
        href: "/admin/transactions",
    },
    {
        id: "po-4828",
        recipient: "Amara Osei",
        deal: "901 Cliff Road",
        state: "released",
        method: "ach",
        gross: 58_000,
        ageMinutes: 14_400,
        href: "/admin/transactions",
    },
    {
        id: "po-4829",
        recipient: "Tomas Lind",
        deal: "45 Bayfront Way",
        state: "released",
        method: "wire",
        gross: 128_000,
        ageMinutes: 20_160,
        href: "/admin/transactions",
    },
];

export const payoutFee = (payout: Payout) =>
    Math.round(payout.gross * PLATFORM_PAYOUT_FEE_RATE);

export const payoutNet = (payout: Payout) => payout.gross - payoutFee(payout);

const sumGross = (payouts: Payout[]) =>
    payouts.reduce((total, payout) => total + payout.gross, 0);

const byState = (state: PayoutState) =>
    PAYOUTS.filter((payout) => payout.state === state);

export const RANKED_PAYOUTS: Payout[] = [...PAYOUTS].sort(
    (a, b) =>
        PAYOUT_STATES[b.state].rank - PAYOUT_STATES[a.state].rank ||
        b.ageMinutes - a.ageMinutes,
);

export const PAYOUT_STAGES: PayoutStage[] = PAYOUT_PIPELINE_ORDER.map(
    (state) => {
        const rows = byState(state);
        return {
            id: state,
            count: rows.length,
            amount: sumGross(rows),
            oldestMinutes: rows.reduce(
                (oldest, payout) => Math.max(oldest, payout.ageMinutes),
                0,
            ),
        };
    },
).filter((stage) => stage.count > 0);

const HELD_PAYOUTS = PAYOUTS.filter(
    (payout) => PAYOUT_STATES[payout.state].held,
);

export const OUTSTANDING_PAYOUT = sumGross(HELD_PAYOUTS);
export const HELD_PAYOUT_COUNT = HELD_PAYOUTS.length;
export const RELEASED_PAYOUT = sumGross(byState("released"));
export const FAILED_PAYOUT_COUNT = byState("failed").length;

export const stageShare = (stage: PayoutStage) =>
    Math.round((stage.amount / sumGross(PAYOUTS)) * 100);

const BREACHED_PAYOUTS = HELD_PAYOUTS.filter(
    (payout) => payout.ageMinutes > PAYOUT_SLA_MINUTES,
);

const FEES_WITHHELD = HELD_PAYOUTS.reduce(
    (total, payout) => total + payoutFee(payout),
    0,
);

export const PAYOUT_FILTERS: readonly FilterPill<PayoutStateFilter>[] = [
    { id: "all", label: ALL_STATES_LABEL },
    ...PAYOUT_PIPELINE_ORDER.map((state) => ({
        id: state,
        label: PAYOUT_STATES[state].label,
    })),
];

export const PAYOUT_METHOD_OPTIONS: readonly SelectOption<PayoutMethodFilter>[] =
    [
        { value: "all", label: ALL_METHODS_LABEL },
        ...PAYOUT_METHOD_ORDER.map((method) => ({
            value: method,
            label: PAYOUT_METHODS[method].label,
        })),
    ];

export const matchesPayoutFilters = (
    payout: Payout,
    state: PayoutStateFilter,
    method: PayoutMethodFilter,
) =>
    (state === "all" || payout.state === state) &&
    (method === "all" || payout.method === method);

export const PAYOUT_COUNTS = PAYOUT_PIPELINE_ORDER.reduce<
    Partial<Record<PayoutStateFilter, number>>
>((counts, state) => ({ ...counts, [state]: byState(state).length }), {
    all: PAYOUTS.length,
});

export const PAYOUT_METHOD_SHARES: ShareDatum[] = PAYOUT_METHOD_ORDER.map(
    (method) => {
        const amount = sumGross(
            HELD_PAYOUTS.filter((payout) => payout.method === method),
        );
        return {
            id: method,
            icon: PAYOUT_METHODS[method].icon,
            label: PAYOUT_METHODS[method].label,
            value: formatCompactUsd(amount),
            percent: Math.round((amount / OUTSTANDING_PAYOUT) * 100),
            tone: PAYOUT_METHODS[method].tone,
        };
    },
);

export const PAYMENT_STATS: StatDatum[] = [
    {
        id: "revenue",
        icon: Wallet,
        label: "Revenue YTD",
        value: formatMillions(REVENUE_YTD, 2),
        tone: "accent",
        href: "/admin/reports",
    },
    {
        id: "commission",
        icon: Percent,
        label: "Commission YTD",
        value: formatMillions(streamYtd("commission"), 2),
        tone: "info",
        href: "/admin/transactions",
    },
    {
        id: "outstanding",
        icon: Hourglass,
        label: "Awaiting release",
        value: formatThousands(OUTSTANDING_PAYOUT),
        tone: "warning",
    },
    {
        id: "failed",
        icon: AlertTriangle,
        label: "Failed payouts",
        value: formatCount(FAILED_PAYOUT_COUNT),
        tone: "error",
    },
    {
        id: "released",
        icon: BadgeDollarSign,
        label: "Released",
        value: formatThousands(RELEASED_PAYOUT),
        tone: "success",
    },
];

export const REVENUE_METRICS: MetricItem[] = [
    {
        label: "Monthly average",
        value: formatThousands(MONTHLY_AVG_REVENUE),
    },
    {
        label: "Commission year to date",
        value: formatMillions(streamYtd("commission"), 2),
    },
    { label: "Take rate", value: TAKE_RATE_LABEL },
    {
        label: "Awaiting release",
        value: formatThousands(OUTSTANDING_PAYOUT),
    },
];

export const SETTLEMENT_METRICS: MetricItem[] = [
    { label: "Next payout run", value: NEXT_PAYOUT_RUN },
    { label: "Avg. release time", value: AVG_RELEASE_TIME },
    { label: "Fees withheld", value: formatThousands(FEES_WITHHELD, 1) },
    {
        label: "Past 3-day target",
        value: `${BREACHED_PAYOUTS.length} of ${HELD_PAYOUT_COUNT}`,
    },
];

export const PAYMENTS_SUMMARY = `${FAILED_PAYOUT_COUNT} failed · ${HELD_PAYOUT_COUNT} held · ${formatCompactUsd(OUTSTANDING_PAYOUT)} awaiting release`;
