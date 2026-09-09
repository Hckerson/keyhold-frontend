export type ManagedUserRole = "buyer" | "agent" | "admin";
export type UserTier = "standard" | "premium" | "platinum";
export type UserStatus = "active" | "pending" | "suspended" | "deleted";

export type UserStatusFilter = UserStatus | "all";
export type UserRoleFilter = ManagedUserRole | "all";
export type UserSortKey = "priority" | "volume" | "deals" | "recent" | "name";

export interface ManagedUser {
    id: string;
    name: string;
    email: string;
    role: ManagedUserRole;
    joinDate: string;
    lastActive: string;
    status: UserStatus;
    transactions: number;
    volume: number;
    note?: string;
}

export interface SuspensionDraft {
    reason: string;
    duration: string;
    notes: string;
}

export interface UserDirectoryFilters {
    query: string;
    status: UserStatusFilter;
    role: UserRoleFilter;
}

export interface UserBreakdown {
    id: string;
    label: string;
    accounts: number;
    deals: number;
    volume: number;
}
