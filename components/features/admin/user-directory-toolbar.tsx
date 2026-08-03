"use client";

import { Search, Users } from "lucide-react";
import { Input } from "@/components/ui/forms/input";
import { Select, type SelectOption } from "@/components/ui/forms/select";
import {
    FilterPills,
    type FilterPill,
} from "@/components/patterns/filter-pills";
import { roleMeta } from "@/components/features/admin/user-table-cells";
import type { UserRoleFilter, UserStatusFilter } from "@/lib/types";

const STATUS_FILTERS: readonly FilterPill<UserStatusFilter>[] = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "inactive", label: "Inactive" },
    { id: "suspended", label: "Suspended" },
];

const ROLE_OPTIONS: readonly SelectOption<UserRoleFilter>[] = [
    { value: "all", label: "All roles" },
    { value: "buyer", label: roleMeta.buyer.plural },
    { value: "agent", label: roleMeta.agent.plural },
    { value: "admin", label: roleMeta.admin.plural },
];

export interface UserDirectoryToolbarProps {
    query: string;
    onQueryChange: (next: string) => void;
    status: UserStatusFilter;
    onStatusChange: (next: UserStatusFilter) => void;
    statusCounts: Record<UserStatusFilter, number>;
    role: UserRoleFilter;
    onRoleChange: (next: UserRoleFilter) => void;
}

export function UserDirectoryToolbar({
    query,
    onQueryChange,
    status,
    onStatusChange,
    statusCounts,
    role,
    onRoleChange,
}: UserDirectoryToolbarProps) {
    return (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <div className="w-full sm:w-60">
                <Input
                    type="search"
                    value={query}
                    aria-label="Search users by name or email"
                    placeholder="Search name or email"
                    prefix={<Search size={12} strokeWidth={1.5} />}
                    onChange={(event) => onQueryChange(event.target.value)}
                />
            </div>

            <FilterPills
                filters={STATUS_FILTERS}
                active={status}
                onChange={onStatusChange}
                counts={statusCounts}
            />

            <Select
                size="sm"
                icon={Users}
                align="end"
                className="ml-auto w-32"
                label="Filter by role"
                options={ROLE_OPTIONS}
                value={role}
                onChange={onRoleChange}
            />
        </div>
    );
}

UserDirectoryToolbar.displayName = "UserDirectoryToolbar";
