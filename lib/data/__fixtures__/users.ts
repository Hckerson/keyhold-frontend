import type { Suspension } from "@/lib/validations/suspension";
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

export const aSuspension = (
    overrides: Partial<Suspension> = {},
): Suspension => ({
    id: "sus_1",
    reason: "Repeated fake listings",
    duration: null,
    notes: null,
    userId: "usr_1",
    liftedAt: null,
    createdAt: AT,
    updatedAt: AT,
    ...overrides,
});
