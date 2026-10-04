"use client";

import { Users } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { Pager } from "@/components/patterns/pager";
import { PresenceSwap } from "@/components/patterns/presence-swap";
import { SkeletonRows } from "@/components/patterns/skeleton-rows";
import { UserDirectoryList } from "@/components/features/admin/user-directory-list";
import { AdminUsersToolbar } from "@/components/sections/admin/admin-users-toolbar";
import { TABLE_PAGE_SIZE } from "@/lib/constants";
import type {
    ManagedUser,
    SegmentOption,
    UserDirectoryFilters,
    UserRoleFilter,
    UserSortKey,
    UserStatusFilter,
} from "@/lib/types";

const DIRECTORY_TITLE = "Account Directory";
const EMPTY_TITLE = "No account matches this view";
const EMPTY_LEDE =
    "Clear the search or widen the status and role filters to see the full directory.";

export interface AdminUsersMainProps {
    users: ManagedUser[];
    visible: number;
    total: number;
    reading: string;
    filters: UserDirectoryFilters & { sort: UserSortKey };
    statuses: SegmentOption<UserStatusFilter>[];
    roles: SegmentOption<UserRoleFilter>[];
    onFilter: (change: Partial<UserDirectoryFilters>) => void;
    onSortChange: (next: UserSortKey) => void;
    page: number;
    pageCount: number;
    peak: number;
    pending?: boolean;
    onPageChange: (next: number) => void;
    onOpen: (id: string) => void;
    onSuspend: (id: string) => void;
    reactivatingId?: string;
    onReactivate: (id: string) => void;
}

export function AdminUsersMain({
    users,
    visible,
    total,
    reading,
    filters,
    statuses,
    roles,
    onFilter,
    onSortChange,
    page,
    pageCount,
    pending,
    onPageChange,
    ...row
}: AdminUsersMainProps) {
    return (
        <Panel
            title={DIRECTORY_TITLE}
            description={reading}
            count={visible === total ? total : `${visible} / ${total}`}
            bodyClassName="space-y-3"
        >
            <AdminUsersToolbar
                query={filters.query}
                sort={filters.sort}
                status={filters.status}
                role={filters.role}
                statuses={statuses}
                roles={roles}
                onQueryChange={(query) => onFilter({ query })}
                onSortChange={onSortChange}
                onStatusChange={(status) => onFilter({ status })}
                onRoleChange={(role) => onFilter({ role })}
            />
            <PresenceSwap
                swapKey={
                    users.length > 0 ? "rows" : pending ? "pending" : "empty"
                }
            >
                {users.length > 0 ? (
                    <UserDirectoryList users={users} {...row} />
                ) : pending ? (
                    <SkeletonRows tall />
                ) : (
                    <EmptyState
                        icon={Users}
                        title={EMPTY_TITLE}
                        description={EMPTY_LEDE}
                    />
                )}
            </PresenceSwap>
            {pageCount > 1 && (
                <Pager
                    currentPage={page}
                    pageCount={pageCount}
                    pageSize={TABLE_PAGE_SIZE}
                    visibleCount={users.length}
                    totalCount={visible}
                    onPageChange={onPageChange}
                    className="border-border-light -mx-4 border-t px-4 pt-2"
                />
            )}
        </Panel>
    );
}

AdminUsersMain.displayName = "AdminUsersMain";
