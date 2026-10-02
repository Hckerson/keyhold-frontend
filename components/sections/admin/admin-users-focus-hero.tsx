"use client";

import { UserFocusActions } from "@/components/features/admin/user-focus-actions";
import { UserFocusIdentity } from "@/components/features/admin/user-focus-identity";
import { UserFocusMetrics } from "@/components/features/admin/user-focus-metrics";
import type { ManagedUser } from "@/lib/types";

export interface AdminUsersFocusHeroProps {
    user: ManagedUser;
    directoryVolume: number;
    onOpen: (id: string) => void;
    onSuspend: (id: string) => void;
    reactivatingId?: string;
    onReactivate: (id: string) => void;
}

export function AdminUsersFocusHero({
    user,
    directoryVolume,
    onOpen,
    onSuspend,
    reactivatingId,
    onReactivate,
}: AdminUsersFocusHeroProps) {
    return (
        <section className="border-highlight/25 bg-background rounded-xl border p-4 shadow-md">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <UserFocusIdentity user={user} />
                <UserFocusActions
                    user={user}
                    onOpen={onOpen}
                    onSuspend={onSuspend}
                    reactivatingId={reactivatingId}
                    onReactivate={onReactivate}
                />
            </div>

            <UserFocusMetrics user={user} directoryVolume={directoryVolume} />
        </section>
    );
}

AdminUsersFocusHero.displayName = "AdminUsersFocusHero";
