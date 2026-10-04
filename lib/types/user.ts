import type { ChartTone } from "@/lib/config/chart-tones";
import type { MonthDelta } from "./admin";
import type { FilterTileDatum } from "./ui";

export type ManagedUserRole = "buyer" | "agent" | "admin";
export type UserTier = "standard" | "premium" | "platinum";
export type UserStatus = "active" | "pending" | "suspended" | "deleted";

export type UserStatusFilter = UserStatus | "all";

export type UserAction = "suspend" | "reactivate";
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

export type UserStatusTile = FilterTileDatum<UserStatusFilter>;

export type UserRoleTile = FilterTileDatum<ManagedUserRole>;

export interface UserRecencyBand {
    id: string;
    label: string;
    count: number;
    percent: number;
    tone: ChartTone;
}

export interface UserSignupTrend {
    months: number[];
    latest: number;
    latestLabel: string;
    delta: MonthDelta | null;
}
