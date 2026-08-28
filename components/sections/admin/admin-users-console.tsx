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
import { useCreateUser, useUsers } from "@/lib/hooks/use-users";
import {
    useLiftSuspension,
    useSuspendUser,
    useSuspensions,
} from "@/lib/hooks/use-suspensions";
import {
    EMPTY_SUSPENSION_DRAFT,
    isSuspensionReady,
} from "@/lib/config/suspension";
import {
    EMPTY_USER_INVITE_DRAFT,
    type UserInviteDraft,
} from "@/lib/config/user-invite";
import { createUserSchema } from "@/lib/validations/user";
import { toFieldErrors, type FieldErrors } from "@/lib/validations/auth";
import { toManagedUser } from "@/lib/utils/to-managed-user";
import type {
    SuspensionDraft,
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
    const createUser = useCreateUser();
    const activeSuspensions = useSuspensions({ active: true });
    const suspendUser = useSuspendUser();
    const liftSuspension = useLiftSuspension();

    const [query, setQuery] = useState("");
    const [status, setStatus] = useState<UserStatusFilter>(EVERY_STATUS);
    const [role, setRole] = useState<UserRoleFilter>(EVERY_ROLE);
    const [sort, setSort] = useState<UserSortKey>(DEFAULT_SORT);
    const [detailId, setDetailId] = useState<string | null>(null);
    const [suspendId, setSuspendId] = useState<string | null>(null);
    const [draft, setDraft] = useState<SuspensionDraft>(EMPTY_SUSPENSION_DRAFT);
    const [page, setPage] = useState(FIRST_PAGE);
    const [inviting, setInviting] = useState(false);
    const [invite, setInvite] = useState<UserInviteDraft>(
        EMPTY_USER_INVITE_DRAFT,
    );
    const [inviteErrors, setInviteErrors] = useState<FieldErrors>({});

    const users = useMemo(() => (data ?? []).map(toManagedUser), [data]);

    const suspensionByUser = useMemo(
        () =>
            new Map(
                (activeSuspensions.data?.items ?? []).map((suspension) => [
                    suspension.userId,
                    suspension.id,
                ]),
            ),
        [activeSuspensions.data],
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

    const onOpenInvite = useCallback(() => {
        createUser.reset();
        setInvite(EMPTY_USER_INVITE_DRAFT);
        setInviteErrors({});
        setInviting(true);
    }, [createUser]);

    const onCloseInvite = useCallback(() => setInviting(false), []);

    const onSubmitInvite = () => {
        const parsed = createUserSchema.safeParse({
            ...invite,
            phoneNumber: invite.phoneNumber.trim() || undefined,
        });

        if (!parsed.success) {
            setInviteErrors(toFieldErrors(parsed.error));
            return;
        }

        setInviteErrors({});
        void createUser.mutateAsync(parsed.data).then(() => setInviting(false));
    };

    const onCloseDetail = useCallback(() => setDetailId(null), []);

    const onReactivate = useCallback(
        (id: string) => {
            setDetailId(null);
            const suspensionId = suspensionByUser.get(id);
            if (suspensionId) void liftSuspension.mutateAsync(suspensionId);
        },
        [liftSuspension, suspensionByUser],
    );

    const onSuspend = useCallback((id: string) => {
        setDetailId(null);
        setDraft(EMPTY_SUSPENSION_DRAFT);
        setSuspendId(id);
    }, []);

    const onCloseSuspend = useCallback(() => {
        setSuspendId(null);
        setDraft(EMPTY_SUSPENSION_DRAFT);
    }, []);

    const onSubmitSuspend = () => {
        if (!suspendId || !isSuspensionReady(draft)) return;
        void suspendUser.mutateAsync({
            userId: suspendId,
            reason: draft.reason.trim(),
            duration: draft.duration ? Number(draft.duration) : undefined,
            notes: draft.notes.trim() || undefined,
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
            <AdminUsersHeader
                summary={userSummary(users)}
                onAdd={onOpenInvite}
            />

            <AdminUsersStatBand stats={stats} />

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

            <UserCreateModal
                open={inviting}
                draft={invite}
                errors={inviteErrors}
                pending={createUser.isPending}
                failed={createUser.isError}
                onDraftChange={setInvite}
                onClose={onCloseInvite}
                onSubmit={onSubmitInvite}
            />

            <UserSuspendModal
                user={users.find((user) => user.id === suspendId)}
                draft={draft}
                pending={suspendUser.isPending}
                onDraftChange={setDraft}
                onClose={onCloseSuspend}
                onSubmit={onSubmitSuspend}
            />
        </div>
    );
}

AdminUsersConsole.displayName = "AdminUsersConsole";
