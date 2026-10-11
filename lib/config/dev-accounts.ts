import type { UserRole } from "@/lib/types/auth";

export interface DevAccount {
    label: string;
    role: UserRole;
    email: string;
}

export const DEV_QUICK_LOGIN =
    process.env.NEXT_PUBLIC_DEV_QUICK_LOGIN === "true";

export const DEV_PASSWORD =
    process.env.NEXT_PUBLIC_DEV_PASSWORD ?? "password123";

export const DEV_ACCOUNTS: readonly DevAccount[] = [
    { label: "Admin", role: "ADMIN", email: "admin@example.com" },
    { label: "Agent", role: "SELLER", email: "sarah@example.com" },
    { label: "Buyer", role: "BUYER", email: "buyer@example.com" },
];
