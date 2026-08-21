import { differenceInCalendarDays, format } from "date-fns";
import { Building2, CircleSlash, UserCheck, Users, Wallet } from "lucide-react";
import type { FilterPill } from "@/components/patterns/filter-pills";
import type { ShareDatum } from "@/components/patterns/share-row";
import type { StatDatum } from "@/components/patterns/stat-cell";
import type { DonutSegment } from "@/components/ui/charts/donut-chart";
import type { SelectOption } from "@/components/ui/forms/select";
import {
    USER_ROLES,
    USER_ROLE_KEYS,
    USER_STATUSES,
    USER_STATUS_KEYS,
} from "@/lib/config/user-tones";
import {
    formatCompactUsd,
    formatCount,
    parseLocalDate,
    percentOf,
    sum,
} from "@/lib/utils";
import type {
    ManagedUser,
    ManagedUserRole,
    UserBreakdown,
    UserDirectoryFilters,
    UserRoleFilter,
    UserSortKey,
    UserStatusFilter,
} from "@/lib/types";

export const USER_ROLE_SEGMENTS: DonutSegment[] = [
    { name: "Buyers", value: 722, tone: "accent" },
    { name: "Agents", value: 435, tone: "info" },
    { name: "Admins", value: 90, tone: "neutral" },
];

export const USER_TIER_SEGMENTS: DonutSegment[] = [
    { name: "Standard", value: 845, tone: "neutral" },
    { name: "Premium", value: 315, tone: "info" },
    { name: "Platinum", value: 87, tone: "highlight" },
];

const sumSegments = (segments: DonutSegment[]) =>
    segments.reduce((total, segment) => total + segment.value, 0);

export const TOTAL_USERS = sumSegments(USER_ROLE_SEGMENTS);
export const ACTIVE_USERS = 1_102;

const PRIOR_MONTH_USERS = 1_174;

export const USER_GROWTH_SERIES = [
    980,
    1_015,
    1_060,
    1_108,
    PRIOR_MONTH_USERS,
    TOTAL_USERS,
];

export const USER_GROWTH_LABEL = `+${(
    ((TOTAL_USERS - PRIOR_MONTH_USERS) / PRIOR_MONTH_USERS) *
    100
).toFixed(1)}%`;

const COHORT_FORMAT = "yyyy";
const JOINED_FORMAT = "MMM yyyy";
const EVERY_STATUS: UserStatusFilter = "all";
const EVERY_ROLE: UserRoleFilter = "all";

export const USER_STATUS_FILTERS: FilterPill<UserStatusFilter>[] = [
    { id: EVERY_STATUS, label: "All" },
    ...USER_STATUS_KEYS.map((id) => ({ id, label: USER_STATUSES[id].label })),
];

export const USER_ROLE_OPTIONS: SelectOption<UserRoleFilter>[] = [
    { value: EVERY_ROLE, label: "All roles" },
    ...USER_ROLE_KEYS.map((id) => ({
        value: id,
        label: USER_ROLES[id].plural,
    })),
];

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

export const joinedLabel = (user: ManagedUser) =>
    format(parseLocalDate(user.joinDate), JOINED_FORMAT);

export const cohortOf = (user: ManagedUser) =>
    format(parseLocalDate(user.joinDate), COHORT_FORMAT);

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

export const sortUsers = (users: ManagedUser[], key: UserSortKey) =>
    [...users].sort(SORTERS[key]);

export const focusUser = (users: ManagedUser[]) =>
    sortUsers(users, "priority")[0];

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

export const countUsersByStatus = (
    users: ManagedUser[],
): Record<UserStatusFilter, number> =>
    USER_STATUS_KEYS.reduce<Record<UserStatusFilter, number>>(
        (counts, id) => ({
            ...counts,
            [id]: users.filter((user) => user.status === id).length,
        }),
        { all: users.length, active: 0, pending: 0, suspended: 0 },
    );

export const countUsersByRole = (users: ManagedUser[], role: ManagedUserRole) =>
    users.filter((user) => user.role === role).length;

export const peakVolume = (users: ManagedUser[]) =>
    Math.max(0, ...users.map((user) => user.volume));

export const directoryVolume = (users: ManagedUser[]) =>
    sum(users.map((user) => user.volume));

export const directoryDeals = (users: ManagedUser[]) =>
    sum(users.map((user) => user.transactions));

export const userStats = (users: ManagedUser[]): StatDatum[] => {
    const counts = countUsersByStatus(users);

    return [
        {
            id: "accounts",
            icon: Users,
            label: "Accounts",
            value: formatCount(users.length),
            tone: "accent",
        },
        {
            id: "active",
            icon: UserCheck,
            label: "Active",
            value: `${counts.active}`,
            tone: "success",
        },
        {
            id: "agents",
            icon: Building2,
            label: "Agents",
            value: `${countUsersByRole(users, "agent")}`,
            tone: "info",
        },
        {
            id: "suspended",
            icon: CircleSlash,
            label: "Suspended",
            value: `${counts.suspended}`,
            tone: "error",
        },
        {
            id: "volume",
            icon: Wallet,
            label: "Lifetime volume",
            value: formatCompactUsd(directoryVolume(users)),
            tone: "highlight",
        },
    ];
};

export const userSummary = (users: ManagedUser[]) => {
    const counts = countUsersByStatus(users);
    return `${counts.active} active · ${users.filter(isAtRisk).length} needing review · ${formatCompactUsd(directoryVolume(users))} lifetime`;
};

export const roleShares = (users: ManagedUser[]): ShareDatum[] =>
    USER_ROLE_KEYS.map((id) => {
        const count = countUsersByRole(users, id);
        return {
            id,
            icon: USER_ROLES[id].icon,
            label: USER_ROLES[id].plural,
            value: `${count}`,
            percent: percentOf(count, users.length),
            tone: USER_ROLES[id].tone,
        };
    });

const breakdownOf = (
    id: string,
    label: string,
    rows: ManagedUser[],
): UserBreakdown => ({
    id,
    label,
    accounts: rows.length,
    deals: directoryDeals(rows),
    volume: directoryVolume(rows),
});

export const cohortBreakdowns = (users: ManagedUser[]) =>
    [...new Set(users.map(cohortOf))].sort().map((year) =>
        breakdownOf(
            year,
            year,
            users.filter((user) => cohortOf(user) === year),
        ),
    );

export const peakBreakdownVolume = (breakdowns: UserBreakdown[]) =>
    Math.max(0, ...breakdowns.map((breakdown) => breakdown.volume));
