import { z } from "zod";

export const sellerStatsSchema = z.object({
    listings: z.number().int(),
    activeListings: z.number().int(),
    soldListings: z.number().int(),
    views: z.number().int(),
    averagePrice: z.number(),
    saves: z.number().int(),
    pendingViewings: z.number().int(),
    pendingOffers: z.number().int(),
    acceptedOffers: z.number().int(),
    closedValue: z.number(),
});

export const platformStatsSchema = z.object({
    users: z.number().int(),
    properties: z.number().int(),
    activeProperties: z.number().int(),
    connections: z.number().int(),
    transactions: z.number().int(),
    completedTransactions: z.number().int(),
    volume: z.number(),
});

export const growthPointSchema = z.object({
    name: z.string(),
    value: z.number().int(),
});

export const dashboardStatsSchema = z.object({
    user: z.object({
        change: z.number(),
        trend: z.enum(["up", "down"]),
        currentFigure: z.number().int(),
        monthlyData: z.array(growthPointSchema).optional(),
        dailyData: z.array(growthPointSchema).optional(),
    }),
});

export const userStatsSchema = z.object({
    total: z.number().int(),
    active: z.number().int(),
    pending: z.number().int(),
    suspended: z.number().int(),
});

export const regionMetricSchema = z.object({
    region: z.string(),
    listings: z.number().int(),
    avgPrice: z.number(),
    volume: z.number(),
});

export const trendStatsSchema = z.object({
    gmv: z.array(growthPointSchema),
    deals: z.array(growthPointSchema),
    users: z.array(growthPointSchema),
    listings: z.array(growthPointSchema),
});

export const agentAnalyticsSchema = z.object({
    production: z.object({
        deals: z.number().int(),
        volume: z.number(),
        averagePrice: z.number(),
        listings: z.number().int(),
    }),
    monthly: z.array(growthPointSchema),
    benchmarks: z.object({
        daysToClose: z.number(),
        platformDaysToClose: z.number(),
        saleToList: z.number(),
        platformSaleToList: z.number(),
    }),
});

export type SellerStats = z.infer<typeof sellerStatsSchema>;
export type PlatformStats = z.infer<typeof platformStatsSchema>;
export type UserStats = z.infer<typeof userStatsSchema>;
export type GrowthPoint = z.infer<typeof growthPointSchema>;
export type DashboardStats = z.infer<typeof dashboardStatsSchema>;
export type RegionMetric = z.infer<typeof regionMetricSchema>;
export type TrendStats = z.infer<typeof trendStatsSchema>;
export type AgentAnalytics = z.infer<typeof agentAnalyticsSchema>;
