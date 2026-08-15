"use client";

import { ArrowUpDown, Search, Users } from "lucide-react";
import { FilterPills } from "@/components/patterns/filter-pills";
import { Input } from "@/components/ui/forms/input";
import { Select } from "@/components/ui/forms/select";
import {
    USER_ROLE_OPTIONS,
    USER_SORT_OPTIONS,
    USER_STATUS_FILTERS,
} from "@/lib/data/admin-users";
import type {
    UserRoleFilter,
    UserSortKey,
    UserStatusFilter,
} from "@/lib/types";

const SEARCH_LABEL = "Search accounts by name or email";
const SEARCH_PLACEHOLDER = "Search name or email";
const ROLE_LABEL = "Filter by role";
const SORT_LABEL = "Sort the directory";

export interface AdminUsersToolbarProps {
    query: string;
    status: UserStatusFilter;
    role: UserRoleFilter;
    sort: UserSortKey;
    counts: Record<UserStatusFilter, number>;
    onQueryChange: (next: string) => void;
    onStatusChange: (next: UserStatusFilter) => void;
    onRoleChange: (next: UserRoleFilter) => void;
    onSortChange: (next: UserSortKey) => void;
}

export function AdminUsersToolbar({
    query,
    status,
    role,
    sort,
    counts,
    onQueryChange,
    onStatusChange,
    onRoleChange,
    onSortChange,
}: AdminUsersToolbarProps) {
    return (
        <div className="flex min-h-11 flex-wrap items-center gap-2 py-1.5">
            <div className="w-full sm:w-48">
                <Input
                    type="search"
                    value={query}
                    aria-label={SEARCH_LABEL}
                    placeholder={SEARCH_PLACEHOLDER}
                    prefix={<Search size={12} strokeWidth={1.5} />}
                    onChange={(event) => onQueryChange(event.target.value)}
                />
            </div>

            <FilterPills<UserStatusFilter>
                filters={USER_STATUS_FILTERS}
                active={status}
                onChange={onStatusChange}
                counts={counts}
            />

            <Select<UserRoleFilter>
                options={USER_ROLE_OPTIONS}
                value={role}
                onChange={onRoleChange}
                label={ROLE_LABEL}
                icon={Users}
                align="end"
                size="sm"
                className="ml-auto w-28"
            />

            <Select<UserSortKey>
                options={USER_SORT_OPTIONS}
                value={sort}
                onChange={onSortChange}
                label={SORT_LABEL}
                icon={ArrowUpDown}
                align="end"
                size="sm"
                className="w-36"
            />
        </div>
    );
}

AdminUsersToolbar.displayName = "AdminUsersToolbar";
