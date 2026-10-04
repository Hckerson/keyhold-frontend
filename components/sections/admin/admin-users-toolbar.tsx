"use client";

import { ArrowUpDown, Search } from "lucide-react";
import { Input } from "@/components/ui/forms/input";
import { Select } from "@/components/ui/forms/select";
import { SegmentedFilter } from "@/components/patterns/segmented-filter";
import { USER_SORT_OPTIONS } from "@/lib/data/admin-users";
import type {
    SegmentOption,
    UserRoleFilter,
    UserSortKey,
    UserStatusFilter,
} from "@/lib/types";

const SEARCH_LABEL = "Search accounts by name or email";
const SEARCH_PLACEHOLDER = "Search name or email";
const SORT_LABEL = "Sort the directory";
const STATUS_LABEL = "Filter by account status";
const ROLE_LABEL = "Filter by role";

export interface AdminUsersToolbarProps {
    query: string;
    sort: UserSortKey;
    status: UserStatusFilter;
    role: UserRoleFilter;
    statuses: SegmentOption<UserStatusFilter>[];
    roles: SegmentOption<UserRoleFilter>[];
    onQueryChange: (next: string) => void;
    onSortChange: (next: UserSortKey) => void;
    onStatusChange: (next: UserStatusFilter) => void;
    onRoleChange: (next: UserRoleFilter) => void;
}

export function AdminUsersToolbar({
    query,
    sort,
    status,
    role,
    statuses,
    roles,
    onQueryChange,
    onSortChange,
    onStatusChange,
    onRoleChange,
}: AdminUsersToolbarProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <div className="min-w-0 flex-1">
                    <Input
                        type="search"
                        value={query}
                        aria-label={SEARCH_LABEL}
                        placeholder={SEARCH_PLACEHOLDER}
                        prefix={<Search size={12} strokeWidth={1.5} />}
                        onChange={(event) => onQueryChange(event.target.value)}
                    />
                </div>
                <Select<UserSortKey>
                    options={USER_SORT_OPTIONS}
                    value={sort}
                    onChange={onSortChange}
                    label={SORT_LABEL}
                    icon={ArrowUpDown}
                    align="end"
                    size="sm"
                    className="w-40 shrink-0"
                />
            </div>
            <div className="flex flex-wrap items-center gap-2">
                <SegmentedFilter
                    label={STATUS_LABEL}
                    options={statuses}
                    active={status}
                    onChange={onStatusChange}
                />
                <SegmentedFilter
                    label={ROLE_LABEL}
                    options={roles}
                    active={role}
                    onChange={onRoleChange}
                />
            </div>
        </div>
    );
}

AdminUsersToolbar.displayName = "AdminUsersToolbar";
