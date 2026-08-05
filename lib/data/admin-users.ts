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
    USER_TIERS,
    USER_TIER_KEYS,
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
    UserStatus,
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

export const DIRECTORY_NOW = new Date(2026, 7, 5);

const COHORT_FORMAT = "yyyy";
const JOINED_FORMAT = "MMM yyyy";
const EVERY_STATUS: UserStatusFilter = "all";
const EVERY_ROLE: UserRoleFilter = "all";

export const MANAGED_USERS: ManagedUser[] = [
    {
        id: "1",
        name: "Elena Vasquez",
        email: "elena.vasquez@meridian.re",
        role: "agent",
        tier: "platinum",
        joinDate: "2022-11-02",
        lastActive: "2026-08-03",
        status: "active",
        transactions: 28,
        volume: 41_200_000,
    },
    {
        id: "2",
        name: "Thomas Beaumont",
        email: "t.beaumont@northlake.com",
        role: "buyer",
        tier: "platinum",
        joinDate: "2021-04-19",
        lastActive: "2026-07-25",
        status: "active",
        transactions: 9,
        volume: 32_900_000,
    },
    {
        id: "3",
        name: "Sarah Chen",
        email: "sarah.chen@meridian.re",
        role: "agent",
        tier: "premium",
        joinDate: "2023-06-20",
        lastActive: "2026-08-02",
        status: "active",
        transactions: 15,
        volume: 24_600_000,
    },
    {
        id: "4",
        name: "Robert Astor",
        email: "robert.astor@astorgroup.com",
        role: "buyer",
        tier: "platinum",
        joinDate: "2023-03-10",
        lastActive: "2026-07-30",
        status: "active",
        transactions: 5,
        volume: 18_400_000,
    },
    {
        id: "5",
        name: "Nina Lindqvist",
        email: "nina.lindqvist@meridian.re",
        role: "agent",
        tier: "premium",
        joinDate: "2023-10-27",
        lastActive: "2026-06-30",
        status: "inactive",
        transactions: 7,
        volume: 9_300_000,
    },
    {
        id: "6",
        name: "Daniel Okafor",
        email: "d.okafor@kestrelcap.com",
        role: "buyer",
        tier: "premium",
        joinDate: "2024-09-08",
        lastActive: "2026-07-19",
        status: "active",
        transactions: 3,
        volume: 4_750_000,
    },
    {
        id: "7",
        name: "Grace Okonjo",
        email: "grace.okonjo@meridian.re",
        role: "agent",
        tier: "standard",
        joinDate: "2025-02-11",
        lastActive: "2026-07-31",
        status: "active",
        transactions: 4,
        volume: 3_200_000,
    },
    {
        id: "8",
        name: "John Doe",
        email: "john.doe@example.com",
        role: "buyer",
        tier: "standard",
        joinDate: "2024-01-15",
        lastActive: "2026-07-28",
        status: "active",
        transactions: 2,
        volume: 1_850_000,
    },
    {
        id: "9",
        name: "Victor Hale",
        email: "victor.hale@example.com",
        role: "buyer",
        tier: "standard",
        joinDate: "2025-06-03",
        lastActive: "2026-05-22",
        status: "inactive",
        transactions: 1,
        volume: 620_000,
    },
    {
        id: "10",
        name: "Marcus Sterling",
        email: "m.sterling@sterlingrealty.com",
        role: "agent",
        tier: "standard",
        joinDate: "2024-05-01",
        lastActive: "2026-04-12",
        status: "suspended",
        transactions: 0,
        volume: 0,
        note: "Two listings were withdrawn for photo provenance and the submitting licence lapsed in June. Reinstate only once a current licence is on file.",
    },
    {
        id: "11",
        name: "Priya Raghavan",
        email: "priya.raghavan@meridian.re",
        role: "admin",
        tier: "premium",
        joinDate: "2022-08-14",
        lastActive: "2026-08-01",
        status: "active",
        transactions: 0,
        volume: 0,
    },
    {
        id: "12",
        name: "Amara Diallo",
        email: "amara.diallo@meridian.re",
        role: "admin",
        tier: "platinum",
        joinDate: "2021-09-30",
        lastActive: "2026-08-02",
        status: "active",
        transactions: 0,
        volume: 0,
    },
];

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
        differenceInCalendarDays(
            DIRECTORY_NOW,
            parseLocalDate(user.lastActive),
        ),
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
        { all: users.length, active: 0, inactive: 0, suspended: 0 },
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

export const tierBreakdowns = (users: ManagedUser[]) =>
    USER_TIER_KEYS.map((id) =>
        breakdownOf(
            id,
            USER_TIERS[id].label,
            users.filter((user) => user.tier === id),
        ),
    );

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

export const setUserStatus = (
    users: ManagedUser[],
    ids: string[],
    status: UserStatus,
    note?: string,
): ManagedUser[] =>
    users.map((user) =>
        ids.includes(user.id) ? { ...user, status, note } : user,
    );
