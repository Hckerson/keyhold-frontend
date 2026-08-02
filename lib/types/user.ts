export type ManagedUserRole = "buyer" | "agent" | "admin";
export type UserTier = "standard" | "premium" | "platinum";
export type UserStatus = "active" | "suspended" | "inactive";

export interface ManagedUser {
    id: string;
    name: string;
    email: string;
    role: ManagedUserRole;
    tier: UserTier;
    joinDate: string;
    status: UserStatus;
    transactions: number;
}
