import type { UserAccountStatus } from "@/lib/enums/enums";
import type { ManagedUser, UserStatus } from "@/lib/types/user";
import { MANAGED_ROLE_BY_USER } from "@/lib/utils/to-user-segments";
import type { User } from "@/lib/validations/user";

export const MANAGED_STATUS_BY_ACCOUNT: Record<UserAccountStatus, UserStatus> =
    {
        ACTIVE: "active",
        PENDING: "pending",
        SUSPENDED: "suspended",
    };

export const toManagedUser = (user: User): ManagedUser => ({
    id: user.id,
    name: user.fullName,
    email: user.email ?? "",
    role: MANAGED_ROLE_BY_USER[user.role],
    joinDate: user.createdAt,
    lastActive: user.lastActive ?? user.createdAt,
    status: MANAGED_STATUS_BY_ACCOUNT[user.status],
    transactions: user.transactions ?? 0,
    volume: user.volume ?? 0,
});
