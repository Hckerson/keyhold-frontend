"use client";

import { Users } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Pager } from "@/components/patterns/pager";
import { PageSwap } from "@/components/patterns/page-swap";
import { PresenceSwap } from "@/components/patterns/presence-swap";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { UserTable } from "@/components/features/admin/user-table";
import { TABLE_PAGE_SIZE } from "@/lib/constants";
import { AdminUsersFocusHero } from "@/components/sections/admin/admin-users-focus-hero";
import { AdminUsersToolbar } from "@/components/sections/admin/admin-users-toolbar";
import type {
    ManagedUser,
    UserRoleFilter,
    UserSortKey,
    UserStatusFilter,
} from "@/lib/types";

const DIRECTORY_TITLE = "Account Directory";
const DIRECTORY_LEDE =
    "Every managed account, ranked by the one that needs a decision first";
const DIRECTORY_ACTION = "Verifications";
const EMPTY_TITLE = "No account matches this view";
const EMPTY_LEDE =
    "Clear the search or widen the status and role filters to see the full directory.";
const LOADING_TITLE = "Loading the directory";
const LOADING_LEDE = "Fetching every managed account on the platform.";

export interface AdminUsersMainProps {
    focus?: ManagedUser;
    users: ManagedUser[];
    total: number;
    page: number;
    pageCount: number;
    peak: number;
    directoryVolume: number;
    query: string;
    status: UserStatusFilter;
    role: UserRoleFilter;
    sort: UserSortKey;
    counts: Record<UserStatusFilter, number>;
    pending?: boolean;
    onPageChange: (next: number) => void;
    onQueryChange: (next: string) => void;
    onStatusChange: (next: UserStatusFilter) => void;
    onRoleChange: (next: UserRoleFilter) => void;
    onSortChange: (next: UserSortKey) => void;
    onOpen: (id: string) => void;
    onSuspend: (id: string) => void;
    onReactivate: (id: string) => void;
}

export function AdminUsersMain({
    focus,
    users,
    total,
    page,
    pageCount,
    peak,
    directoryVolume,
    query,
    status,
    role,
    sort,
    counts,
    pending = false,
    onPageChange,
    onQueryChange,
    onStatusChange,
    onRoleChange,
    onSortChange,
    onOpen,
    onSuspend,
    onReactivate,
}: AdminUsersMainProps) {
    return (
        <div className="console-span-2 flex flex-col gap-3">
            {focus && (
                <PresenceSwap swapKey={focus.id}>
                    <AdminUsersFocusHero
                        user={focus}
                        directoryVolume={directoryVolume}
                        onOpen={onOpen}
                        onSuspend={onSuspend}
                        onReactivate={onReactivate}
                    />
                </PresenceSwap>
            )}

            <Panel
                title={DIRECTORY_TITLE}
                description={DIRECTORY_LEDE}
                count={total}
                action={
                    <PanelLink
                        href="/admin/verifications"
                        label={DIRECTORY_ACTION}
                    />
                }
            >
                <AdminUsersToolbar
                    query={query}
                    status={status}
                    role={role}
                    sort={sort}
                    counts={counts}
                    onQueryChange={onQueryChange}
                    onStatusChange={onStatusChange}
                    onRoleChange={onRoleChange}
                    onSortChange={onSortChange}
                />

                <PresenceSwap swapKey={users.length > 0 ? "rows" : "empty"}>
                    {users.length > 0 ? (
                        <PanelInset
                            scroll
                            className="scroll-y mt-0 max-h-[38rem]"
                        >
                            <PageSwap swapKey={page} className="min-w-fit">
                                <UserTable
                                    users={users}
                                    peak={peak}
                                    onOpen={onOpen}
                                    onSuspend={onSuspend}
                                    onReactivate={onReactivate}
                                />
                            </PageSwap>
                        </PanelInset>
                    ) : (
                        <EmptyState
                            icon={Users}
                            title={pending ? LOADING_TITLE : EMPTY_TITLE}
                            description={pending ? LOADING_LEDE : EMPTY_LEDE}
                        />
                    )}
                </PresenceSwap>

                {pageCount > 1 && (
                    <Pager
                        currentPage={page}
                        pageCount={pageCount}
                        pageSize={TABLE_PAGE_SIZE}
                        visibleCount={users.length}
                        totalCount={total}
                        onPageChange={onPageChange}
                        className="border-border-light -mx-4 mt-2.5 border-t px-4 pt-2"
                    />
                )}
            </Panel>
        </div>
    );
}

AdminUsersMain.displayName = "AdminUsersMain";
