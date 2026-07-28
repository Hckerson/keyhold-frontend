import type { StatItem } from "@/lib/types";

export interface MonthlySales {
    month: string;
    sales: number;
    volume: number;
}

export interface ComparisonBar {
    label: string;
    value: string;
    pct: number;
    accent: boolean;
}

export interface QuarterSummary {
    label: string;
    sales: string;
    volume: string;
}

export const analyticsMetrics: StatItem[] = [
    {
        label: "Total Sales This Year",
        value: "$42.3M",
        change: "+12%",
        trend: "up",
        caption: "vs 2023",
    },
    {
        label: "Average Sale Price",
        value: "$2.85M",
        change: "+5%",
        trend: "up",
        caption: "vs market avg",
    },
    {
        label: "Days to Close",
        value: 48,
        caption: "8 days faster than market",
    },
    {
        label: "Client Satisfaction",
        value: "4.8/5",
        caption: "18% above average",
    },
];

export const monthlyData: MonthlySales[] = [
    { month: "Jan", sales: 3, volume: 8.5 },
    { month: "Feb", sales: 4, volume: 11.2 },
    { month: "Mar", sales: 3, volume: 8.1 },
    { month: "Apr", sales: 5, volume: 14.3 },
    { month: "May", sales: 4, volume: 11.8 },
    { month: "Jun", sales: 6, volume: 17.4 },
    { month: "Jul", sales: 2, volume: 5.9 },
];

export const comparison: ComparisonBar[] = [
    { label: "You", value: "$2.85M", pct: 85, accent: true },
    { label: "Market", value: "$2.15M", pct: 65, accent: false },
];

export const advantages: string[] = [
    "Higher average transaction value",
    "Faster closing times",
    "Higher client satisfaction",
];

export const quarters: QuarterSummary[] = [
    { label: "Q1 2024", sales: "10", volume: "$27.8M" },
    { label: "Q2 2024", sales: "15", volume: "$42.1M" },
    { label: "Q3 2024 (YTD)", sales: "2", volume: "$5.9M" },
];
