import { flagTypeMeta, type AbuseReport } from "@/lib/data/admin-flags";
import type { Flag, FlagTarget } from "@/lib/validations/flag";
import { daysSince } from "@/lib/utils/elapsed";

const UNKNOWN_REPORTER = "Unknown member";
const MISSING_TARGET = "Target no longer exists";

const subjectOf = (target: FlagTarget | null | undefined) => {
    if (!target) return { subject: MISSING_TARGET, subjectDetail: "" };

    if (target.kind === "USER")
        return { subject: target.fullName, subjectDetail: target.email };

    if (target.kind === "MESSAGE")
        return {
            subject: flagTypeMeta.MESSAGE.label,
            subjectDetail: target.content,
        };

    return { subject: target.title, subjectDetail: target.address };
};

export const toAbuseReport = (flag: Flag): AbuseReport => ({
    id: flag.id,
    type: flag.type,
    status: flag.status,
    reason: flag.reason,
    details: flag.details,
    reporter: flag.creator?.fullName ?? UNKNOWN_REPORTER,
    openedAt: flag.createdAt,
    waitingDays: daysSince(flag.createdAt),
    ...subjectOf(flag.target),
});

export const toAbuseQueue = (flags: Flag[]): AbuseReport[] =>
    flags.map(toAbuseReport);
