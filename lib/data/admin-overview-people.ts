import type { ShareDatum } from "@/components/patterns/share-row";
import { USER_STATUSES } from "@/lib/config/user-tones";
import { NO_READING } from "@/lib/constants";
import { formatCount, percentOf } from "@/lib/utils";
import { MANAGED_ROLE_BY_USER } from "@/lib/utils/to-user-segments";
import type { AuditEvent } from "@/lib/types";
import type { UserStats } from "@/lib/validations/stats";
import type { User } from "@/lib/validations/user";

export const RECORD_WINDOW = 6;

const ACCOUNT_STATES = ["active", "pending", "suspended"] as const;

export const statusShares = (users: UserStats | undefined): ShareDatum[] =>
    ACCOUNT_STATES.map((status) => {
        const count = users?.[status] ?? 0;
        const meta = USER_STATUSES[status];

        return {
            id: status,
            icon: meta.icon,
            label: meta.label,
            value: users ? formatCount(count) : NO_READING,
            percent: percentOf(count, users?.total ?? 0),
            tone: meta.chartTone,
        };
    });

export const coverageReading = (users: User[]) => {
    const countOf = (role: "buyer" | "agent") =>
        users.filter((user) => MANAGED_ROLE_BY_USER[user.role] === role).length;
    const agents = countOf("agent");

    if (agents === 0) return "No agents on the platform yet";
    return `${formatCount(Math.round(countOf("buyer") / agents))} buyers for every agent`;
};

export const recordReading = (events: AuditEvent[]) => {
    const security = events.filter((event) => event.security).length;

    if (events.length === 0) return "No recorded actions yet";
    if (security === 0)
        return `No failed sign-ins or denials in the latest ${events.length}`;
    return `${security} of the latest ${events.length} were failed sign-ins or denials`;
};
