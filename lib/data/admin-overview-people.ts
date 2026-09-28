import { formatCount } from "@/lib/utils";
import type { AuditEvent } from "@/lib/types";
import type { UserStats } from "@/lib/validations/stats";

export const RECORD_WINDOW = 8;

export const peopleReading = (users: UserStats | undefined) =>
    users
        ? `${formatCount(users.active)} active · ${formatCount(users.pending)} awaiting approval · ${formatCount(users.suspended)} suspended`
        : "Account counts unavailable";

export const recordReading = (events: AuditEvent[]) => {
    const security = events.filter((event) => event.security).length;

    if (events.length === 0) return "No recorded actions yet";
    if (security === 0)
        return `No failed sign-ins or denials in the latest ${events.length}`;
    return `${security} of the latest ${events.length} were failed sign-ins or denials`;
};
