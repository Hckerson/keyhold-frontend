"use client";

import { CircleCheckBig } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { SkeletonRows } from "@/components/patterns/skeleton-rows";
import { UserWaitingRow } from "@/components/features/admin/user-waiting-row";
import type { ManagedUser } from "@/lib/types";

const TITLE = "Waiting on you";
const LIST_LABEL = "Accounts waiting on a decision";
const CLEAR_TITLE = "Nothing waiting";
const CLEAR_LEDE = "No account is suspended or pending verification.";

export interface AdminUsersWaitingProps {
    users: ManagedUser[];
    total: number;
    reading: string;
    pending?: boolean;
    reactivatingId?: string;
    onOpen: (id: string) => void;
    onSuspend: (id: string) => void;
    onReactivate: (id: string) => void;
}

export function AdminUsersWaiting({
    users,
    total,
    reading,
    pending,
    ...row
}: AdminUsersWaitingProps) {
    return (
        <Panel
            title={TITLE}
            description={reading}
            count={total}
            className="border-highlight/25 shadow-md"
        >
            {pending ? (
                <SkeletonRows />
            ) : users.length === 0 ? (
                <EmptyState
                    icon={CircleCheckBig}
                    title={CLEAR_TITLE}
                    description={CLEAR_LEDE}
                />
            ) : (
                <ul
                    aria-label={LIST_LABEL}
                    className="divide-border-light -mx-4 -mb-4 divide-y"
                >
                    <AnimatePresence initial={false}>
                        {users.map((user) => (
                            <UserWaitingRow
                                key={user.id}
                                user={user}
                                {...row}
                            />
                        ))}
                    </AnimatePresence>
                </ul>
            )}
        </Panel>
    );
}

AdminUsersWaiting.displayName = "AdminUsersWaiting";
