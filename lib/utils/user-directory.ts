import type {
    ManagedUser,
    UserDirectoryFilters,
    UserStatusFilter,
} from "@/lib/types";

export const matchesUserFilters = (
    user: ManagedUser,
    filters: UserDirectoryFilters,
) => {
    const query = filters.query.trim().toLowerCase();
    const matchesQuery =
        query === "" ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);

    return (
        matchesQuery &&
        (filters.status === "all" || user.status === filters.status) &&
        (filters.role === "all" || user.role === filters.role)
    );
};

export const countUsersByStatus = (users: ManagedUser[]) =>
    users.reduce<Record<UserStatusFilter, number>>(
        (counts, user) => ({
            ...counts,
            [user.status]: counts[user.status] + 1,
        }),
        { all: users.length, active: 0, suspended: 0, inactive: 0 },
    );
