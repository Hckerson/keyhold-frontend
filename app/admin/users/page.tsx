"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { UserTable } from "@/components/features/admin/user-table";
import type { ManagedUser, UserStatus } from "@/lib/types";
const INITIAL_USERS: ManagedUser[] = [
    {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "buyer",
        tier: "standard",
        joinDate: "2024-01-15",
        status: "active",
        transactions: 2,
    },
    {
        id: "2",
        name: "Sarah Chen",
        email: "sarah@example.com",
        role: "agent",
        tier: "premium",
        joinDate: "2023-06-20",
        status: "active",
        transactions: 15,
    },
    {
        id: "3",
        name: "Robert Astor",
        email: "robert@example.com",
        role: "buyer",
        tier: "platinum",
        joinDate: "2023-03-10",
        status: "active",
        transactions: 5,
    },
    {
        id: "4",
        name: "Marcus Sterling",
        email: "marcus@example.com",
        role: "agent",
        tier: "standard",
        joinDate: "2024-05-01",
        status: "suspended",
        transactions: 0,
    },
];

export default function AdminUsersPage() {
    const [users, setUsers] = useState(INITIAL_USERS);

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
        <div className="space-y-6">
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

            <UserTable users={users} onStatusChange={handleStatusChange} />
        </div>
    );
}
