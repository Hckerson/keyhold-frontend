"use client";

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
    onReactivate: (id: string) => void;
}

export function UserTable({
    users,
    peak,
    onOpen,
    onSuspend,
    onReactivate,
}: UserTableProps) {
    return (
        <table className="table-flush w-full min-w-3xl table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label text-left">
                        Account
                    </th>
                    <th scope="col" className="micro-label w-16 pl-3 text-left">
                        Role
                    </th>
                    <th scope="col" className="micro-label w-20 pl-3 text-left">
                        Tier
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
                {users.map((user) => (
                    <UserRow
                        key={user.id}
                        user={user}
                        peak={peak}
                        onOpen={onOpen}
                        onSuspend={onSuspend}
                        onReactivate={onReactivate}
                    />
                ))}
            </tbody>
        </table>
    );
}

UserTable.displayName = "UserTable";
