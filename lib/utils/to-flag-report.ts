import type { FlagReport } from "@/lib/types";
import type { Flag, FlagTarget } from "@/lib/validations/flag";

const UNKNOWN_REPORTER = "Unknown member";

const targetOf = (target: FlagTarget | null | undefined) => {
    if (target?.kind === "USER")
        return {
            kind: target.kind,
            id: target.id,
            name: target.fullName,
            email: target.email,
            status: target.status,
        };
    if (target?.kind === "MESSAGE")
        return {
            kind: target.kind,
            id: target.id,
            content: target.content,
            senderId: target.senderId,
        };
    return null;
};

export const toFlagReport = (flag: Flag): FlagReport => ({
    id: flag.id,
    type: flag.type,
    status: flag.status,
    reason: flag.reason,
    details: flag.details,
    reporter: flag.creator?.fullName ?? UNKNOWN_REPORTER,
    reporterEmail: flag.creator?.email ?? null,
    openedAt: flag.createdAt,
    decidedAt: flag.resolvedAt,
    target: targetOf(flag.target),
});

export const toFlagQueue = (flags: Flag[]): FlagReport[] =>
    flags.map(toFlagReport);
