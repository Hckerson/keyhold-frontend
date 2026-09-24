"use client";

import { useCallback, useMemo, useState } from "react";
import { UserCreateModal } from "@/components/features/admin/user-create-modal";
import { UserDetailModal } from "@/components/features/admin/user-detail-modal";
import { UserSuspendModal } from "@/components/features/admin/user-suspend-modal";
import { AdminUsersHeader } from "@/components/sections/admin/admin-users-header";
import { AdminUsersMain } from "@/components/sections/admin/admin-users-main";
import { AdminUsersRail } from "@/components/sections/admin/admin-users-rail";
import { AdminUsersStatBand } from "@/components/sections/admin/admin-users-stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { TABLE_PAGE_SIZE } from "@/lib/constants";
import {
    countUsersByStatus,
    directoryVolume,
    focusUser,
    matchesUserFilters,
    peakVolume,
    sortUsers,
    userStats,
    userSummary,
} from "@/lib/data/admin-users";
import { useUserInvite } from "@/lib/hooks/use-user-invite";
import { useUsers } from "@/lib/hooks/use-users";
import { useUserSuspension } from "@/lib/hooks/use-user-suspension";
import { toManagedUser } from "@/lib/utils/to-managed-user";
import type {
    UserRoleFilter,
    UserSortKey,
    UserStatusFilter,
} from "@/lib/types";

const EVERY_STATUS: UserStatusFilter = "all";
const EVERY_ROLE: UserRoleFilter = "all";
const DEFAULT_SORT: UserSortKey = "priority";
const FIRST_PAGE = 1;

export function AdminUsersConsole() {
    const { data, isPending, isError, refetch } = useUsers();
    const invite = useUserInvite();

    const [query, setQuery] = useState("");
    const [status, setStatus] = useState<UserStatusFilter>(EVERY_STATUS);
    const [role, setRole] = useState<UserRoleFilter>(EVERY_ROLE);
    const [sort, setSort] = useState<UserSortKey>(DEFAULT_SORT);
    const [detailId, setDetailId] = useState<string | null>(null);
    const [page, setPage] = useState(FIRST_PAGE);

    const users = useMemo(() => (data ?? []).map(toManagedUser), [data]);

    const suspension = useUserSuspension((id) =>
        setDetailId((current) => (current === id ? null : current)),
    );

    const counts = useMemo(() => countUsersByStatus(users), [users]);
    const stats = useMemo(() => userStats(users), [users]);
    const focus = useMemo(() => focusUser(users), [users]);
    const peak = useMemo(() => peakVolume(users), [users]);
    const volume = useMemo(() => directoryVolume(users), [users]);

    const visible = useMemo(
        () =>
            sortUsers(
                users.filter((user) =>
                    matchesUserFilters(user, { query, status, role }),
                ),
                sort,
            ),
        [users, query, status, role, sort],
    );

    const pageCount = Math.max(
        FIRST_PAGE,
        Math.ceil(visible.length / TABLE_PAGE_SIZE),
    );
    const currentPage = Math.min(page, pageCount);

    const rows = useMemo(
        () =>
            visible.slice(
                (currentPage - FIRST_PAGE) * TABLE_PAGE_SIZE,
                currentPage * TABLE_PAGE_SIZE,
            ),
        [visible, currentPage],
    );

    const onQueryChange = useCallback((next: string) => {
        setQuery(next);
        setPage(FIRST_PAGE);
    }, []);

    const onStatusChange = useCallback((next: UserStatusFilter) => {
        setStatus(next);
        setPage(FIRST_PAGE);
    }, []);

    const onRoleChange = useCallback((next: UserRoleFilter) => {
        setRole(next);
        setPage(FIRST_PAGE);
    }, []);

    const onSortChange = useCallback((next: UserSortKey) => {
        setSort(next);
        setPage(FIRST_PAGE);
    }, []);

    const onOpen = useCallback((id: string) => setDetailId(id), []);

    const onCloseDetail = useCallback(() => setDetailId(null), []);

    const onSuspend = (id: string) => {
        setDetailId(null);
        suspension.open(id);
    };

    if (isError)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.adminUsers}
                onRetry={() => void refetch()}
            />
        );

    return (
        <div className="flex flex-col gap-4">
            <AdminUsersHeader
                summary={userSummary(users)}
                onAdd={invite.start}
            />

            <AdminUsersStatBand stats={stats} pending={isPending} />

            <div className="console-split gap-3">
                <AdminUsersMain
                    focus={focus}
                    users={rows}
                    total={visible.length}
                    page={currentPage}
                    pageCount={pageCount}
                    peak={peak}
                    directoryVolume={volume}
                    query={query}
                    status={status}
                    role={role}
                    sort={sort}
                    counts={counts}
                    pending={isPending}
                    onQueryChange={onQueryChange}
                    onStatusChange={onStatusChange}
                    onRoleChange={onRoleChange}
                    onSortChange={onSortChange}
                    onPageChange={setPage}
                    reactivatingId={suspension.reactivatingId}
                    onOpen={onOpen}
                    onSuspend={onSuspend}
                    onReactivate={suspension.reactivate}
                />
                <AdminUsersRail users={users} />
            </div>

            <UserDetailModal
                user={users.find((user) => user.id === detailId)}
                peak={peak}
                reactivatingId={suspension.reactivatingId}
                onClose={onCloseDetail}
                onSuspend={onSuspend}
                onReactivate={suspension.reactivate}
            />

            <UserCreateModal
                open={invite.open}
                draft={invite.draft}
                errors={invite.errors}
                pending={invite.pending}
                failed={invite.failed}
                onDraftChange={invite.setDraft}
                onClose={invite.close}
                onSubmit={invite.submit}
            />

            <UserSuspendModal
                user={users.find((user) => user.id === suspension.suspendingId)}
                draft={suspension.draft}
                pending={suspension.pending}
                failed={suspension.failed}
                onDraftChange={suspension.setDraft}
                onClose={suspension.dismiss}
                onSubmit={suspension.submit}
            />
        </div>
    );
}

AdminUsersConsole.displayName = "AdminUsersConsole";
