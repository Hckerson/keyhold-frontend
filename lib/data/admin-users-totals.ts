import { Users } from "lucide-react";
import {
    USER_ROLES,
    USER_ROLE_KEYS,
    USER_STATUSES,
    USER_STATUS_KEYS,
} from "@/lib/config/user-tones";
import { formatCount, percentOf, sum } from "@/lib/utils";
import type {
    ManagedUser,
    ManagedUserRole,
    SelectOption,
    UserRoleFilter,
    UserRoleTile,
    UserStatus,
    UserStatusFilter,
    UserStatusTile,
} from "@/lib/types";

const ALL_ROLES = "All roles";

const ZERO_STATUS_COUNTS: Record<UserStatus, number> = {
    active: 0,
    pending: 0,
    suspended: 0,
    deleted: 0,
};

export const countUsersByStatus = (
    users: ManagedUser[],
): Record<UserStatusFilter, number> =>
    users.reduce<Record<UserStatusFilter, number>>(
        (counts, user) => ({
            ...counts,
            [user.status]: counts[user.status] + 1,
        }),
        { all: users.length, ...ZERO_STATUS_COUNTS },
    );

export const countUsersByRole = (users: ManagedUser[], role: ManagedUserRole) =>
    users.filter((user) => user.role === role).length;

export const peakVolume = (users: ManagedUser[]) =>
    Math.max(0, ...users.map((user) => user.volume));

export const directoryVolume = (users: ManagedUser[]) =>
    sum(users.map((user) => user.volume));

export const userStatusTiles = (users: ManagedUser[]): UserStatusTile[] => {
    const counts = countUsersByStatus(users);

    return [
        {
            id: "all",
            label: "All",
            icon: Users,
            tone: "accent",
            count: users.length,
            percent: 100,
        },
        ...USER_STATUS_KEYS.map((id) => ({
            id,
            label: USER_STATUSES[id].label,
            icon: USER_STATUSES[id].icon,
            tone: USER_STATUSES[id].chartTone,
            count: counts[id],
            percent: percentOf(counts[id], users.length),
        })),
    ];
};

export const userRoleTiles = (users: ManagedUser[]): UserRoleTile[] =>
    USER_ROLE_KEYS.map((id) => {
        const count = countUsersByRole(users, id);
        return {
            id,
            label: USER_ROLES[id].plural,
            icon: USER_ROLES[id].icon,
            tone: USER_ROLES[id].tone,
            count,
            percent: percentOf(count, users.length),
        };
    });

export const userRoleOptions = (
    users: ManagedUser[],
): SelectOption<UserRoleFilter>[] => [
    { value: "all", label: `${ALL_ROLES} · ${formatCount(users.length)}` },
    ...userRoleTiles(users).map((role) => ({
        value: role.id,
        label: `${role.label} · ${formatCount(role.count)}`,
    })),
];

export const rolesReading = (users: ManagedUser[]) =>
    userRoleTiles(users)
        .map(
            (role) =>
                `${formatCount(role.count)} ${(role.count === 1 ? USER_ROLES[role.id].label : role.label).toLowerCase()}`,
        )
        .join(" · ");
