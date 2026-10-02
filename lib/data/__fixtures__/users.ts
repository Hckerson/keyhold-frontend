import type { User } from "@/lib/validations/user";

const AT = "2026-08-01T09:00:00.000Z";

export const aMemberRecord = (overrides: Partial<User> = {}): User => ({
    id: "usr_1",
    fullName: "Ada Vance",
    email: "ada@keyhol.me",
    role: "SELLER",
    status: "ACTIVE",
    createdAt: AT,
    updatedAt: AT,
    ...overrides,
});
