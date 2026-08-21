import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type { TimeFilter } from "@/lib/enums/enums";
import type {
    AgentAnalytics,
    DashboardStats,
    PlatformStats,
    RegionMetric,
    SellerStats,
    TrendStats,
    UserStats,
} from "@/lib/validations/stats";

export const statsAPI = {
    seller: () => query.get<SellerStats>(config.api.stats.seller),
    platform: () => query.get<PlatformStats>(config.api.stats.platform),
    users: () => query.get<UserStats>(config.api.stats.users),
    dashboard: (filter: TimeFilter) =>
        query.get<DashboardStats>(config.api.stats.dashboard, {
            params: { filter },
        }),
    regions: () => query.get<RegionMetric[]>(config.api.stats.regions),
    trend: (filter: TimeFilter) =>
        query.get<TrendStats>(config.api.stats.trend, { params: { filter } }),
    agent: () => query.get<AgentAnalytics>(config.api.stats.agent),
};
