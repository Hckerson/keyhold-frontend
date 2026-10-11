"use client";

import { useMemo } from "react";
import { ConsoleSkeleton } from "@/components/patterns/console-skeleton";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { UserReactivateModal } from "@/components/features/admin/user-reactivate-modal";
import { UserSuspendModal } from "@/components/features/admin/user-suspend-modal";
import { AdminUserProfileHeader } from "@/components/sections/admin/admin-user-profile-header";
import { AdminUserProfileMain } from "@/components/sections/admin/admin-user-profile-main";
import { AdminUserProfileRail } from "@/components/sections/admin/admin-user-profile-rail";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    identityLine,
    profileChecks,
    profileDetails,
    profileRecord,
    rankSuspensions,
    statusNotice,
    userDeals,
} from "@/lib/data/admin-user-profile";
import { useAuditLogs } from "@/lib/hooks/use-audit-logs";
import { useUserSuspension } from "@/lib/hooks/use-user-suspension";
import { useUser } from "@/lib/hooks/use-users";
import { useUserSuspensions } from "@/lib/hooks/use-suspensions";
import { useTransactionLedger } from "@/lib/hooks/use-transactions";
import { toAuditEvents } from "@/lib/utils/to-audit-event";
import { toManagedUser } from "@/lib/utils/to-managed-user";

const ACTIVITY_WINDOW = 8;

export interface AdminUserProfileConsoleProps {
    userId: string;
}

export function AdminUserProfileConsole({
    userId,
}: AdminUserProfileConsoleProps) {
    const user = useUser(userId);
    const suspensions = useUserSuspensions(userId);
    const ledger = useTransactionLedger();
    const audit = useAuditLogs({ actorId: userId, limit: ACTIVITY_WINDOW });
    const suspension = useUserSuspension();

    const managed = useMemo(
        () => (user.data ? toManagedUser(user.data) : undefined),
        [user.data],
    );

    const deals = useMemo(
        () => userDeals(ledger.data ?? [], userId),
        [ledger.data, userId],
    );

    const events = useMemo(
        () => toAuditEvents(audit.data?.items ?? []),
        [audit.data?.items],
    );

    const history = useMemo(
        () => rankSuspensions(suspensions.data ?? []),
        [suspensions.data],
    );

    if (user.isError)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.adminUsers}
                onRetry={() => void user.refetch()}
            />
        );

    if (!managed || !user.data) return <ConsoleSkeleton variant="profile" />;

    return (
        <div className="flex flex-col gap-4">
            <AdminUserProfileHeader
                user={managed}
                avatar={user.data.avatar ?? undefined}
                identity={identityLine(user.data, managed)}
                reactivating={suspension.reactivatingId === userId}
                onSuspend={() => suspension.open(userId)}
                onReactivate={() => suspension.reactivation.request(userId)}
            />

            <div className="console-split gap-3">
                <AdminUserProfileMain
                    record={profileRecord(managed)}
                    notice={statusNotice(managed, history)}
                    subject={managed.name}
                    deals={deals}
                    events={events}
                    dealsPending={ledger.isPending}
                    dealsFailed={ledger.isError}
                    eventsPending={audit.isPending}
                    eventsFailed={audit.isError}
                />
                <AdminUserProfileRail
                    checks={profileChecks(user.data)}
                    bio={user.data.bio}
                    details={profileDetails(user.data)}
                    suspensions={history}
                    suspended={managed.status === "suspended"}
                    pending={suspensions.isPending}
                    failed={suspensions.isError}
                />
            </div>

            <UserReactivateModal
                user={suspension.reactivation.target ? managed : undefined}
                pending={suspension.reactivation.pending}
                failed={suspension.reactivation.failed}
                onClose={suspension.reactivation.dismiss}
                onConfirm={suspension.confirmReactivation}
            />

            <UserSuspendModal
                user={suspension.suspendingId ? managed : undefined}
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

AdminUserProfileConsole.displayName = "AdminUserProfileConsole";
