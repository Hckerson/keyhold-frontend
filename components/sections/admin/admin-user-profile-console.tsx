"use client";

import { useMemo } from "react";
import { ShieldCheck } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PortalHeader } from "@/components/patterns/portal-header";
import { StatBand } from "@/components/patterns/stat-band";
import { ConsoleSkeleton } from "@/components/patterns/console-skeleton";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CredentialTable } from "@/components/features/shared/credential-table";
import { UserAccountList } from "@/components/features/admin/user-account-list";
import { UserStatusMark } from "@/components/features/admin/user-status-mark";
import { UserSuspensionList } from "@/components/features/admin/user-suspension-list";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { USER_ROLES } from "@/lib/config/user-tones";
import {
    PROFILE_BACK,
    PROFILE_COPY as COPY,
    profileCredentials,
    profileFields,
    profileStats,
    rankSuspensions,
} from "@/lib/data/admin-user-profile";
import { useUser } from "@/lib/hooks/use-users";
import { useUserSuspensions } from "@/lib/hooks/use-suspensions";
import { toManagedUser } from "@/lib/utils/to-managed-user";

export interface AdminUserProfileConsoleProps {
    userId: string;
}

export function AdminUserProfileConsole({
    userId,
}: AdminUserProfileConsoleProps) {
    const user = useUser(userId);
    const suspensions = useUserSuspensions(userId);

    const managed = useMemo(
        () => (user.data ? toManagedUser(user.data) : undefined),
        [user.data],
    );

    const credentials = useMemo(
        () => profileCredentials(user.data),
        [user.data],
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

    if (!managed) return <ConsoleSkeleton />;

    const fields = profileFields(user.data);

    return (
        <div className="flex flex-col gap-4">
            <PortalHeader
                title={managed.name}
                lede={COPY.lede}
                back={PROFILE_BACK}
                summary={`${USER_ROLES[managed.role].label} · ${managed.email}`}
                action={
                    <div className="flex items-center gap-2">
                        <UserStatusMark status={managed.status} />
                        <Avatar
                            size="sm"
                            src={user.data?.avatar ?? undefined}
                            alt={managed.name}
                            initials={managed.name.charAt(0)}
                        />
                    </div>
                }
            />

            <StatBand
                label={COPY.lede}
                stats={profileStats(managed, credentials, history)}
                pending={user.isPending}
            />

            <div className="console-split gap-3">
                <div className="console-span-2 flex flex-col gap-3">
                    <Panel
                        title={COPY.credentials}
                        description={COPY.credentialsLede}
                    >
                        <PanelInset scroll>
                            <CredentialTable
                                credentials={credentials}
                                heading={COPY.credentialsHeading}
                                caption={COPY.credentialsCaption}
                            />
                        </PanelInset>
                    </Panel>

                    <Panel
                        title={COPY.history}
                        description={COPY.historyLede}
                        count={history.length}
                    >
                        {history.length > 0 ? (
                            <UserSuspensionList suspensions={history} />
                        ) : (
                            <EmptyState
                                icon={ShieldCheck}
                                title={COPY.historyEmpty}
                                description={COPY.historyEmptyLede}
                            />
                        )}
                    </Panel>
                </div>

                <div className="flex flex-col gap-3">
                    <Panel title={COPY.account} description={COPY.accountLede}>
                        <UserAccountList user={managed} />
                    </Panel>

                    <Panel title={COPY.profile}>
                        <dl className="divide-border divide-y">
                            {fields.map((field) => (
                                <div
                                    key={field.id}
                                    className="flex items-start justify-between gap-3 py-2"
                                >
                                    <dt className="micro-label shrink-0">
                                        {field.label}
                                    </dt>
                                    <dd className="text-text min-w-0 text-right text-xs font-medium">
                                        {field.value || (
                                            <span className="text-text-muted">
                                                {COPY.missing}
                                            </span>
                                        )}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </Panel>
                </div>
            </div>
        </div>
    );
}

AdminUserProfileConsole.displayName = "AdminUserProfileConsole";
