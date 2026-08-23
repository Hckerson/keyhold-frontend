import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type {
    TierDistribution,
    UpdateUserInput,
    User,
} from "@/lib/validations/user";
import type { UserTier } from "@/lib/enums/enums";

export const usersAPI = {
    me: () => query.get<User>(config.api.users.me),

    list: () => query.get<User[]>(config.api.users.list),

    detail: (id: string) => query.get<User>(config.api.users.detail(id)),

    update: (id: string, input: UpdateUserInput) =>
        query.patch<User>(config.api.users.detail(id), input),

    tierDistribution: () =>
        query.get<TierDistribution>(config.api.users.tierDistribution),

    setTier: (id: string, tier: UserTier) =>
        query.patch<User>(config.api.users.tier(id), { tier }),

    remove: (id: string) => query.delete<User>(config.api.users.detail(id)),
};
