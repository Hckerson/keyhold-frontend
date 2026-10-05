import { differenceInCalendarDays, format } from "date-fns";
import { USER_STATUSES } from "@/lib/config/user-tones";
import { parseLocalDate } from "@/lib/utils";
import type {
    ManagedUser,
    SelectOption,
    UserAction,
    UserDirectoryFilters,
    UserRoleFilter,
    UserSortKey,
    UserStatusFilter,
} from "@/lib/types";

const JOINED_FORMAT = "MMM yyyy";
const EVERY_STATUS: UserStatusFilter = "all";
const EVERY_ROLE: UserRoleFilter = "all";

export const USER_SORT_OPTIONS: SelectOption<UserSortKey>[] = [
    { value: "priority", label: "Needs attention" },
    { value: "volume", label: "Lifetime volume" },
    { value: "deals", label: "Closed deals" },
    { value: "recent", label: "Recently active" },
    { value: "name", label: "Name" },
];

export const idleDays = (user: ManagedUser) =>
    Math.max(
        0,
        differenceInCalendarDays(new Date(), parseLocalDate(user.lastActive)),
    );

export const dealsLabel = (deals: number) =>
    `${deals} deal${deals === 1 ? "" : "s"}`;

export const joinedLabel = (user: ManagedUser) =>
    format(parseLocalDate(user.joinDate), JOINED_FORMAT);

export const statusRisk = (user: ManagedUser) =>
    USER_STATUSES[user.status].risk;

export const isAtRisk = (user: ManagedUser) => statusRisk(user) > 0;

export const userNote = (user: ManagedUser) =>
    user.note ?? USER_STATUSES[user.status].note;

const SORTERS: Record<UserSortKey, (a: ManagedUser, b: ManagedUser) => number> =
    {
        priority: (a, b) =>
            statusRisk(b) - statusRisk(a) || b.volume - a.volume,
        volume: (a, b) => b.volume - a.volume,
        deals: (a, b) => b.transactions - a.transactions || b.volume - a.volume,
        recent: (a, b) => idleDays(a) - idleDays(b),
        name: (a, b) => a.name.localeCompare(b.name),
    };

export const userActionOf = (user: ManagedUser): UserAction | undefined => {
    if (user.status === "deleted" || user.role === "admin") return undefined;
    return user.status === "suspended" ? "reactivate" : "suspend";
};

export const sortUsers = (users: ManagedUser[], key: UserSortKey) =>
    [...users].sort(SORTERS[key]);

export const focusUser = (users: ManagedUser[]) =>
    sortUsers(users.filter(userActionOf), "priority")[0];

export const matchesUserFilters = (
    user: ManagedUser,
    filters: UserDirectoryFilters,
) => {
    const query = filters.query.trim().toLowerCase();

    return (
        (query === "" ||
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)) &&
        (filters.status === EVERY_STATUS || user.status === filters.status) &&
        (filters.role === EVERY_ROLE || user.role === filters.role)
    );
};
