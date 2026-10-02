"use client";

import { AnimatePresence } from "motion/react";
import { UserRow } from "@/components/features/admin/user-row";
import type { ManagedUser } from "@/lib/types";

const TABLE_CAPTION =
    "Platform accounts by name, role, tier, closed deals, lifetime volume, days since last sign-in and account status";
const ACTION_HEADING = "Suspend or reactivate the account";

export interface UserTableProps {
    users: ManagedUser[];
    peak: number;
    onOpen: (id: string) => void;
    onSuspend: (id: string) => void;
    reactivatingId?: string;
    onReactivate: (id: string) => void;
}

export function UserTable({
    users,
    peak,
    onOpen,
    onSuspend,
    reactivatingId,
    onReactivate,
}: UserTableProps) {
    return (
        <table className="table-flush w-full min-w-3xl table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="bg-background sticky top-0 z-10 h-9 shadow-[inset_0_-1px_0_var(--color-border)]">
                    <th scope="col" className="micro-label text-left">
                        Account
                    </th>
                    <th scope="col" className="micro-label w-16 pl-3 text-left">
                        Role
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-14 pl-3 text-right"
                    >
                        Deals
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-32 pl-3 text-right"
                    >
                        Volume
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-14 pl-3 text-right"
                    >
                        Active
                    </th>
                    <th scope="col" className="micro-label w-24 pl-3 text-left">
                        Status
                    </th>
                    <th scope="col" className="w-10 pl-3">
                        <span className="sr-only">{ACTION_HEADING}</span>
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                <AnimatePresence initial={false}>
                    {users.map((user) => (
                        <UserRow
                            key={user.id}
                            user={user}
                            peak={peak}
                            onOpen={onOpen}
                            onSuspend={onSuspend}
                            reactivatingId={reactivatingId}
                            onReactivate={onReactivate}
                        />
                    ))}
                </AnimatePresence>
            </tbody>
        </table>
    );
}

UserTable.displayName = "UserTable";
