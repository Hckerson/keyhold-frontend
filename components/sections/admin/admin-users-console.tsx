"use client";

import { useCallback, useMemo, useState } from "react";
import { UserDetailModal } from "@/components/features/admin/user-detail-modal";
import { UserSuspendModal } from "@/components/features/admin/user-suspend-modal";
import { AdminUsersHeader } from "@/components/sections/admin/admin-users-header";
import { AdminUsersMain } from "@/components/sections/admin/admin-users-main";
import { AdminUsersRail } from "@/components/sections/admin/admin-users-rail";
import { AdminUsersStatBand } from "@/components/sections/admin/admin-users-stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
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
import { useSetUserStatus, useUsers } from "@/lib/hooks/use-users";
import {
    ACCOUNT_STATUS_BY_MANAGED,
    toManagedUser,
} from "@/lib/utils/to-managed-user";
import type {
    UserRoleFilter,
    UserSortKey,
    UserStatusFilter,
} from "@/lib/types";

const EVERY_STATUS: UserStatusFilter = "all";
const EVERY_ROLE: UserRoleFilter = "all";
const DEFAULT_SORT: UserSortKey = "priority";

export function AdminUsersConsole() {
    const { data, isPending, isError, refetch } = useUsers();
    const updateStatus = useSetUserStatus();

    const [query, setQuery] = useState("");
    const [status, setStatus] = useState<UserStatusFilter>(EVERY_STATUS);
    const [role, setRole] = useState<UserRoleFilter>(EVERY_ROLE);
    const [sort, setSort] = useState<UserSortKey>(DEFAULT_SORT);
    const [detailId, setDetailId] = useState<string | null>(null);
    const [suspendId, setSuspendId] = useState<string | null>(null);
    const [note, setNote] = useState("");

    const users = useMemo(() => (data ?? []).map(toManagedUser), [data]);

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

    const onOpen = useCallback((id: string) => setDetailId(id), []);

    const onCloseDetail = useCallback(() => setDetailId(null), []);

    const onReactivate = useCallback(
        (id: string) => {
            setDetailId(null);
            void updateStatus.mutateAsync({
                id,
                status: ACCOUNT_STATUS_BY_MANAGED.active,
            });
        },
        [updateStatus],
    );

    const onSuspend = useCallback((id: string) => {
        setDetailId(null);
        setNote("");
        setSuspendId(id);
    }, []);

    const onCloseSuspend = useCallback(() => {
        setSuspendId(null);
        setNote("");
    }, []);

    const onSubmitSuspend = () => {
        if (!suspendId || !note.trim()) return;
        void updateStatus.mutateAsync({
            id: suspendId,
            status: ACCOUNT_STATUS_BY_MANAGED.suspended,
        });
        onCloseSuspend();
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
            <AdminUsersHeader summary={userSummary(users)} />

            <AdminUsersStatBand stats={stats} />

            <div className="console-split gap-3">
                <AdminUsersMain
                    focus={focus}
                    users={visible}
                    peak={peak}
                    directoryVolume={volume}
                    query={query}
                    status={status}
                    role={role}
                    sort={sort}
                    counts={counts}
                    pending={isPending}
                    onQueryChange={setQuery}
                    onStatusChange={setStatus}
                    onRoleChange={setRole}
                    onSortChange={setSort}
                    onOpen={onOpen}
                    onSuspend={onSuspend}
                    onReactivate={onReactivate}
                />
                <AdminUsersRail users={users} />
            </div>

            <UserDetailModal
                user={users.find((user) => user.id === detailId)}
                peak={peak}
                onClose={onCloseDetail}
                onSuspend={onSuspend}
                onReactivate={onReactivate}
            />

            <UserSuspendModal
                user={users.find((user) => user.id === suspendId)}
                note={note}
                onNoteChange={setNote}
                onClose={onCloseSuspend}
                onSubmit={onSubmitSuspend}
            />
        </div>
    );
}

AdminUsersConsole.displayName = "AdminUsersConsole";
