import { formatMeasure, measureTotal } from "@/lib/data/admin-reports";
import { formatCount, formatCountOf } from "@/lib/utils";
import { MANAGED_ROLE_BY_USER } from "@/lib/utils/to-user-segments";
import type { TimeFilter } from "@/lib/enums/enums";
import type { ManagedUserRole, ReportMonth } from "@/lib/types";
import type { User } from "@/lib/validations/user";

const NO_VOLUME = "No settled volume in this window";
const NO_SUPPLY = "No sign-ups or listings in this window";
const NO_LISTINGS = "no new listings";
const DEAL_NOUN = "deal";
const MEMBER_NOUN = "new member";

const WINDOW_START: Record<TimeFilter, (today: Date) => Date> = {
    day: (today) =>
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7),
    month: (today) =>
        new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()),
    year: (today) =>
        new Date(today.getFullYear() - 5, today.getMonth(), today.getDate()),
};

const ROLE_ORDER: readonly ManagedUserRole[] = ["buyer", "agent", "admin"];

const ROLE_NOUN: Record<ManagedUserRole, string> = {
    buyer: "buyer",
    agent: "agent",
    admin: "admin",
};

export const joinersLine = (
    users: User[],
    range: TimeFilter,
    today = new Date(),
) => {
    const start = WINDOW_START[range](today).getTime();
    const joined = users.filter(
        (user) => new Date(user.createdAt).getTime() >= start,
    );

    return ROLE_ORDER.map((role) => ({
        role,
        count: joined.filter((user) => MANAGED_ROLE_BY_USER[user.role] === role)
            .length,
    }))
        .filter((entry) => entry.count > 0)
        .map((entry) => formatCountOf(entry.count, ROLE_NOUN[entry.role]))
        .join(" · ");
};

export const volumeReading = (months: ReportMonth[]) => {
    const gmv = measureTotal(months, "gmv");
    const deals = measureTotal(months, "deals") ?? 0;
    if (!gmv) return NO_VOLUME;

    return `${formatMeasure("gmv", gmv)} across ${formatCountOf(deals, DEAL_NOUN)}, ${formatMeasure("average", measureTotal(months, "average"))} a deal`;
};

export const supplyReading = (months: ReportMonth[]) => {
    const members = measureTotal(months, "members") ?? 0;
    const listings = measureTotal(months, "listings") ?? 0;
    if (!members && !listings) return NO_SUPPLY;
    if (!listings)
        return `${formatCountOf(members, MEMBER_NOUN)}, ${NO_LISTINGS}`;

    return `${formatCount(Math.round(members / listings))} new members for every new listing`;
};

export const windowTotal = (
    months: ReportMonth[],
    id: "gmv" | "deals" | "members" | "listings",
) => formatMeasure(id, measureTotal(months, id)) ?? "0";
