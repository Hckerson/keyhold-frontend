import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type { TimeFilter } from "@/lib/enums/enums";
import type {
    DashboardStats,
    PlatformStats,
    SellerStats,
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
};
