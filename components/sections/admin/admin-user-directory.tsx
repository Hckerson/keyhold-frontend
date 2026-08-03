"use client";

import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { DataTable } from "@/components/patterns/data-table";
import { UserDirectoryToolbar } from "@/components/features/admin/user-directory-toolbar";
import { buildUserTableConfig } from "@/components/features/admin/user-table-columns";
import { MANAGED_USERS } from "@/lib/data/admin-users";
import { countUsersByStatus, matchesUserFilters } from "@/lib/utils";
import type { UserRoleFilter, UserStatus, UserStatusFilter } from "@/lib/types";

export function AdminUserDirectory() {
    const [users, setUsers] = useState(MANAGED_USERS);
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState<UserStatusFilter>("all");
    const [role, setRole] = useState<UserRoleFilter>("all");
    const [openKey, setOpenKey] = useState<string | null>(null);

    const handleStatusChange = useCallback(
        (ids: string[], next: UserStatus) => {
            setUsers((current) =>
                current.map((user) =>
                    ids.includes(user.id) ? { ...user, status: next } : user,
                ),
            );
            setOpenKey(null);
        },
        [],
    );

    const statusCounts = useMemo(() => countUsersByStatus(users), [users]);

    const visibleUsers = useMemo(
        () =>
            users.filter((user) =>
                matchesUserFilters(user, { query, status, role }),
            ),
        [users, query, status, role],
    );

    return (
        <div className="space-y-3">
            <PageHeader
                title="User Management"
                description={`${statusCounts.active} active of ${users.length} accounts`}
                action={
                    <Button variant="primary" size="sm">
                        Add User
                    </Button>
                }
            />

            <UserDirectoryToolbar
                query={query}
                onQueryChange={setQuery}
                status={status}
                onStatusChange={setStatus}
                statusCounts={statusCounts}
                role={role}
                onRoleChange={setRole}
            />

            <DataTable
                {...buildUserTableConfig(handleStatusChange)}
                data={visibleUsers}
                openKey={openKey}
                onOpenChange={setOpenKey}
            />
        </div>
    );
}

AdminUserDirectory.displayName = "AdminUserDirectory";
