"use client";

import { useCallback, useMemo, useState } from "react";
import { UserCreateModal } from "@/components/features/admin/user-create-modal";
import { UserDetailModal } from "@/components/features/admin/user-detail-modal";
import { UserReactivateModal } from "@/components/features/admin/user-reactivate-modal";
import { UserSuspendModal } from "@/components/features/admin/user-suspend-modal";
import { AdminUsersHeader } from "@/components/sections/admin/admin-users-header";
import { AdminUsersMain } from "@/components/sections/admin/admin-users-main";
import { AdminUsersRail } from "@/components/sections/admin/admin-users-rail";
import { AdminUsersStatusBand } from "@/components/sections/admin/admin-users-status-band";
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

            <AdminUsersStatusBand
                tiles={desk.tiles}
                active={directory.status}
                pending={isPending}
                onChange={(status) => directory.filter({ status })}
            />

            <div className="console-split gap-3">
                <AdminUsersMain
                    users={directory.rows}
                    visible={directory.total}
                    total={users.length}
                    reading={desk.rolesReading}
                    filters={directory}
                    roles={desk.roleOptions}
                    onFilter={directory.filter}
                    onSortChange={directory.changeSort}
                    page={directory.page}
                    pageCount={directory.pageCount}
                    pending={isPending}
                    onPageChange={directory.setPage}
                    {...decisions}
                />
                <AdminUsersRail
                    leaders={desk.leaders}
                    concentration={desk.concentration}
                    recency={desk.recency}
                    signups={desk.signups}
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
