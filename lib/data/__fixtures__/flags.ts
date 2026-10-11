import type { FlagReport } from "@/lib/types";
import type { Flag } from "@/lib/validations/flag";

export const FLAG_TODAY = new Date("2026-10-09T12:00:00Z");

const AT = "2026-10-01T12:00:00.000Z";

export const aMemberFlag = (overrides: Partial<Flag> = {}): Flag => ({
    id: "flg_member",
    type: "USER",
    reason: "Asked for a deposit off the platform",
    details: "He asked me to wire the deposit to a personal account.",
    status: "ACTIVE",
    targetId: "usr_9",
    creatorId: "usr_3",
    creator: {
        id: "usr_3",
        fullName: "Delfina Reichert",
        email: "delfina@example.com",
    },
    target: {
        kind: "USER",
        id: "usr_9",
        fullName: "Marcus Reyes",
        email: "marcus@example.com",
        avatar: null,
        status: "ACTIVE",
    },
    resolvedAt: null,
    createdAt: AT,
    updatedAt: AT,
    ...overrides,
});

export const aMessageFlag = (overrides: Partial<Flag> = {}): Flag => ({
    ...aMemberFlag(),
    id: "flg_message",
    type: "MESSAGE",
    reason: "Abusive language",
    targetId: "msg_4",
    target: {
        kind: "MESSAGE",
        id: "msg_4",
        content: "Take it or leave it, you are wasting my time.",
        senderId: "usr_12",
        connectionId: "con_2",
    },
    ...overrides,
});

export const aFlagReport = (
    overrides: Partial<FlagReport> = {},
): FlagReport => ({
    id: "flg_member",
    type: "USER",
    status: "ACTIVE",
    reason: "Asked for a deposit off the platform",
    details: null,
    reporter: "Delfina Reichert",
    reporterEmail: "delfina@example.com",
    openedAt: AT,
    decidedAt: null,
    target: {
        kind: "USER",
        id: "usr_9",
        name: "Marcus Reyes",
        email: "marcus@example.com",
        status: "ACTIVE",
    },
    ...overrides,
});
