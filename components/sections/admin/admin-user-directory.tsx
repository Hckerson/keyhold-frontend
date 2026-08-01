"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { DataTable } from "@/components/patterns/data-table";
import { buildUserTableConfig } from "@/components/features/admin/user-table-columns";
import { MANAGED_USERS } from "@/lib/data/admin-users";
import type { UserStatus } from "@/lib/types";

export function AdminUserDirectory() {
    const [users, setUsers] = useState(MANAGED_USERS);

    const handleStatusChange = useCallback(
        (ids: string[], status: UserStatus) => {
            setUsers((current) =>
                current.map((user) =>
                    ids.includes(user.id) ? { ...user, status } : user,
                ),
            );
        },
        [],
    );

    const active = users.filter((user) => user.status === "active").length;

    return (
        <div className="space-y-3">
            <PageHeader
                title="User Management"
                description={`${active} active user${active !== 1 ? "s" : ""} · ${users.length} total`}
                action={
                    <div className="flex gap-2">
                        <Button variant="secondary" size="sm">
                            Filter
                        </Button>
                        <Button variant="primary" size="sm">
                            Add User
                        </Button>
                    </div>
                }
            />

            <DataTable
                {...buildUserTableConfig(handleStatusChange)}
                data={users}
            />
        </div>
    );
}

AdminUserDirectory.displayName = "AdminUserDirectory";
