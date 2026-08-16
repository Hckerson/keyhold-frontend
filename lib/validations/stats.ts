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

export const userStatsSchema = z.object({
    total: z.number().int(),
    active: z.number().int(),
    pending: z.number().int(),
    suspended: z.number().int(),
});

export type SellerStats = z.infer<typeof sellerStatsSchema>;
export type PlatformStats = z.infer<typeof platformStatsSchema>;
export type UserStats = z.infer<typeof userStatsSchema>;
