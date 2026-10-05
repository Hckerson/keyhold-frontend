"use client";

import { ArrowUpDown, Search, UsersRound } from "lucide-react";
import { Input } from "@/components/ui/forms/input";
import { Select } from "@/components/ui/forms/select";
import { USER_SORT_OPTIONS } from "@/lib/data/admin-users";
import type { SelectOption, UserRoleFilter, UserSortKey } from "@/lib/types";

const SEARCH_LABEL = "Search accounts by name or email";
const SEARCH_PLACEHOLDER = "Search name or email";
const SORT_LABEL = "Sort the directory";
const ROLE_LABEL = "Filter by role";

export interface AdminUsersToolbarProps {
    query: string;
    sort: UserSortKey;
    role: UserRoleFilter;
    roles: SelectOption<UserRoleFilter>[];
    onQueryChange: (next: string) => void;
    onSortChange: (next: UserSortKey) => void;
    onRoleChange: (next: UserRoleFilter) => void;
}

export function AdminUsersToolbar({
    query,
    sort,
    role,
    roles,
    onQueryChange,
    onSortChange,
    onRoleChange,
}: AdminUsersToolbarProps) {
    return (
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
            <Select<UserRoleFilter>
                options={roles}
                value={role}
                onChange={onRoleChange}
                label={ROLE_LABEL}
                icon={UsersRound}
                align="end"
                size="sm"
                className="w-44 shrink-0"
            />
            <Select<UserSortKey>
                options={USER_SORT_OPTIONS}
                value={sort}
                onChange={onSortChange}
                label={SORT_LABEL}
                icon={ArrowUpDown}
                align="end"
                size="sm"
                className="w-44 shrink-0"
            />
        </div>
    );
}

AdminUsersToolbar.displayName = "AdminUsersToolbar";
