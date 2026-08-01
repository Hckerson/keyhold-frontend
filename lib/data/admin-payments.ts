import type { ColumnSeries } from "@/components/ui/charts/column-chart";
import type { DonutSegment } from "@/components/ui/charts/donut-chart";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { MetricItem, StatItem } from "@/lib/types";
import { DEFAULT_COMMISSION_RATE } from "@/lib/constants";
import { formatMillions, formatThousands } from "@/lib/utils";

type RevenueStreamKey = "commission" | "fees";

interface RevenueMonth extends Record<string, string | number> {
    month: string;
    commission: number;
    fees: number;
}

export interface RevenueStream {
    key: RevenueStreamKey;
    name: string;
    tone: ChartTone;
    ytd: number;
    momChange: number;
}

export interface PayoutStage {
    id: string;
    name: string;
    tone: ChartTone;
    count: number;
    amount: number;
}

export const REVENUE_MONTHS: RevenueMonth[] = [
    { month: "Jan", commission: 145_000, fees: 28_000 },
    { month: "Feb", commission: 152_000, fees: 31_000 },
    { month: "Mar", commission: 138_000, fees: 26_000 },
    { month: "Apr", commission: 168_000, fees: 35_000 },
    { month: "May", commission: 175_000, fees: 38_000 },
    { month: "Jun", commission: 192_000, fees: 42_000 },
    { month: "Jul", commission: 180_000, fees: 39_000 },
];

export const REVENUE_SERIES: ColumnSeries[] = [
    { key: "commission", name: "Commission", tone: "accent" },
    { key: "fees", name: "Platform Fees", tone: "info" },
];

const sumBy = (key: RevenueStreamKey) =>
    REVENUE_MONTHS.reduce((total, month) => total + month[key], 0);

const monthRevenue = (month: RevenueMonth) => month.commission + month.fees;

const latestMonth = REVENUE_MONTHS[REVENUE_MONTHS.length - 1];
const priorMonth = REVENUE_MONTHS[REVENUE_MONTHS.length - 2];

const momChange = (key: RevenueStreamKey) =>
    Math.round(
        ((latestMonth[key] - priorMonth[key]) / priorMonth[key]) * 1_000,
    ) / 10;

export const COMMISSION_YTD = sumBy("commission");
export const FEES_YTD = sumBy("fees");
export const REVENUE_YTD = COMMISSION_YTD + FEES_YTD;
export const MONTHLY_AVG_REVENUE = Math.round(
    REVENUE_YTD / REVENUE_MONTHS.length,
);
export const COMMISSION_SHARE = Math.round(
    (COMMISSION_YTD / REVENUE_YTD) * 100,
);

export const REVENUE_STREAMS: RevenueStream[] = [
    {
        key: "commission",
        name: `Commission (${DEFAULT_COMMISSION_RATE * 100}%)`,
        tone: "accent",
        ytd: COMMISSION_YTD,
        momChange: momChange("commission"),
    },
    {
        key: "fees",
        name: "Platform Fees",
        tone: "info",
        ytd: FEES_YTD,
        momChange: momChange("fees"),
    },
];

export const REVENUE_SPLIT: DonutSegment[] = REVENUE_STREAMS.map((stream) => ({
    name: stream.name,
    value: Math.round(stream.ytd / 1_000),
    tone: stream.tone,
}));

export const REVENUE_TOTAL_LABEL = formatMillions(REVENUE_YTD, 2);

const monthsByRevenue = [...REVENUE_MONTHS].sort(
    (a, b) => monthRevenue(b) - monthRevenue(a),
);
const peakMonth = monthsByRevenue[0];
const softestMonth = monthsByRevenue[monthsByRevenue.length - 1];

export const REVENUE_SPLIT_METRICS: MetricItem[] = [
    {
        label: "Peak month",
        value: `${peakMonth.month} · ${formatThousands(monthRevenue(peakMonth))}`,
    },
    {
        label: "Softest month",
        value: `${softestMonth.month} · ${formatThousands(monthRevenue(softestMonth))}`,
    },
    {
        label: "Commission rate",
        value: `${DEFAULT_COMMISSION_RATE * 100}%`,
    },
];

export const PAYOUT_STAGES: PayoutStage[] = [
    {
        id: "review",
        name: "In review",
        tone: "warning",
        count: 1,
        amount: 12_000,
    },
    {
        id: "approved",
        name: "Approved",
        tone: "info",
        count: 1,
        amount: 18_000,
    },
    {
        id: "scheduled",
        name: "Scheduled",
        tone: "accent",
        count: 1,
        amount: 12_000,
    },
];

export const OUTSTANDING_PAYOUT = PAYOUT_STAGES.reduce(
    (total, stage) => total + stage.amount,
    0,
);
export const PENDING_PAYOUT_COUNT = PAYOUT_STAGES.reduce(
    (total, stage) => total + stage.count,
    0,
);

const AVG_PROCESSING_TIME = "3–5 days";
const NEXT_PAYOUT_RUN = "Aug 5";
const RELEASED_THIS_MONTH = 128_000;

export const PROCESSING_METRICS: MetricItem[] = [
    { label: "Avg. processing time", value: AVG_PROCESSING_TIME },
    { label: "Next payout run", value: NEXT_PAYOUT_RUN },
    {
        label: `Released in ${latestMonth.month}`,
        value: formatThousands(RELEASED_THIS_MONTH),
    },
];

export const REVENUE_STATS: StatItem[] = [
    {
        label: "Revenue YTD",
        value: REVENUE_TOTAL_LABEL,
        change: "+18%",
        trend: "up",
        caption: "vs last year",
        featured: true,
    },
    {
        label: "Monthly Avg",
        value: formatThousands(MONTHLY_AVG_REVENUE),
        change: "+5%",
        trend: "up",
        caption: `${REVENUE_MONTHS.length}-month trend`,
    },
    {
        label: "Commission",
        value: formatMillions(COMMISSION_YTD, 2),
        caption: `${COMMISSION_SHARE}% of total`,
    },
    {
        label: "Outstanding",
        value: formatThousands(OUTSTANDING_PAYOUT),
        caption: `${PENDING_PAYOUT_COUNT} pending transactions`,
    },
];
