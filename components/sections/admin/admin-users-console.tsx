"use client";

import { useCallback, useMemo, useState } from "react";
import { UserCreateModal } from "@/components/features/admin/user-create-modal";
import { UserDetailModal } from "@/components/features/admin/user-detail-modal";
import { UserReactivateModal } from "@/components/features/admin/user-reactivate-modal";
import { UserSuspendModal } from "@/components/features/admin/user-suspend-modal";
import { AdminUsersHeader } from "@/components/sections/admin/admin-users-header";
import { AdminUsersMain } from "@/components/sections/admin/admin-users-main";
import { AdminUsersRail } from "@/components/sections/admin/admin-users-rail";
import { AdminUsersStatBand } from "@/components/sections/admin/admin-users-stat-band";
import { AdminUsersWaiting } from "@/components/sections/admin/admin-users-waiting";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { userDesk } from "@/lib/data/admin-users-pulse";
import { useUserDirectory } from "@/lib/hooks/use-user-directory";
import { useUserInvite } from "@/lib/hooks/use-user-invite";
import { useUsers } from "@/lib/hooks/use-users";
import { useUserSuspension } from "@/lib/hooks/use-user-suspension";
import { toManagedUser } from "@/lib/utils/to-managed-user";

export function AdminUsersConsole() {
    const { data, isPending, isError, refetch } = useUsers();
    const invite = useUserInvite();
    const suspension = useUserSuspension();
    const [detailId, setDetailId] = useState<string | null>(null);

    const users = useMemo(() => (data ?? []).map(toManagedUser), [data]);
    const directory = useUserDirectory(users);

    const desk = useMemo(() => userDesk(users), [users]);

    const onOpen = useCallback((id: string) => setDetailId(id), []);

    const onCloseDetail = useCallback(() => setDetailId(null), []);

    const onSuspend = (id: string) => {
        setDetailId(null);
        suspension.open(id);
    };

    const onReactivate = (id: string) => {
        setDetailId(null);
        suspension.reactivation.request(id);
    };

    const decisions = {
        reactivatingId: suspension.reactivatingId,
        onOpen,
        onSuspend,
        onReactivate,
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
            <AdminUsersHeader onAdd={invite.start} />

            <AdminUsersStatBand
                total={users.length}
                reading={desk.reading}
                roles={desk.roles}
                signups={desk.signups}
                pending={isPending}
            />

            <div className="console-split gap-3">
                <div className="console-span-2 flex min-w-0 flex-col gap-3">
                    <AdminUsersWaiting
                        users={desk.waiting}
                        total={desk.waitingTotal}
                        reading={desk.waitingReading}
                        pending={isPending}
                        {...decisions}
                    />
                    <AdminUsersMain
                        users={directory.rows}
                        visible={directory.total}
                        total={users.length}
                        reading={desk.reading}
                        filters={directory}
                        statuses={desk.tiles}
                        roles={desk.roleSegments}
                        onFilter={directory.filter}
                        onSortChange={directory.changeSort}
                        page={directory.page}
                        pageCount={directory.pageCount}
                        peak={desk.peak}
                        pending={isPending}
                        onPageChange={directory.setPage}
                        {...decisions}
                    />
                </div>
                <AdminUsersRail
                    leaders={desk.leaders}
                    recency={desk.recency}
                    directoryVolume={desk.volume}
                    onOpen={onOpen}
                />
            </div>

            <UserDetailModal
                user={users.find((user) => user.id === detailId)}
                peak={desk.peak}
                reactivatingId={suspension.reactivatingId}
                onClose={onCloseDetail}
                onSuspend={onSuspend}
                onReactivate={onReactivate}
            />

            <UserCreateModal
                open={invite.open}
                draft={invite.draft}
                errors={invite.errors}
                pending={invite.pending}
                failure={invite.failure}
                onDraftChange={invite.setDraft}
                onClose={invite.close}
                onSubmit={invite.submit}
            />

            <UserReactivateModal
                user={users.find(
                    (user) => user.id === suspension.reactivation.target,
                )}
                pending={suspension.reactivation.pending}
                failed={suspension.reactivation.failed}
                onClose={suspension.reactivation.dismiss}
                onConfirm={suspension.confirmReactivation}
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
