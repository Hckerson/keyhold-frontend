"use client";

import { AnimatePresence } from "motion/react";
import { UserDirectoryRow } from "@/components/features/admin/user-directory-row";
import { cn } from "@/lib/utils";
import type { ManagedUser } from "@/lib/types";

const LIST_LABEL =
    "Platform accounts by name, email, account status, role, closed deals, days since last sign-in and lifetime volume";

const COLUMNS = [
    { id: "account", label: "Account" },
    { id: "role", label: "Role", wide: true },
    { id: "deals", label: "Deals", wide: true, end: true },
    { id: "active", label: "Seen", wide: true, end: true },
    { id: "volume", label: "Volume", end: true },
];

export interface UserDirectoryListProps {
    users: ManagedUser[];
    peak: number;
    onOpen: (id: string) => void;
    onSuspend: (id: string) => void;
    reactivatingId?: string;
    onReactivate: (id: string) => void;
}

export function UserDirectoryList({ users, ...row }: UserDirectoryListProps) {
    return (
        <div className="queue-frame -mx-2">
            <div
                aria-hidden="true"
                className="queue-grid queue-grid--accounts border-border-light h-9 border-b px-2"
            >
                {COLUMNS.map(({ id, label, wide, end }) => (
                    <span
                        key={id}
                        className={cn(
                            "micro-label",
                            wide && "queue-grid__wide",
                            end && "justify-end text-right",
                        )}
                    >
                        {label}
                    </span>
                ))}
            </div>
            <ul aria-label={LIST_LABEL} className="flex flex-col pt-1">
                <AnimatePresence initial={false}>
                    {users.map((user) => (
                        <UserDirectoryRow key={user.id} user={user} {...row} />
                    ))}
                </AnimatePresence>
            </ul>
        </div>
    );
}

UserDirectoryList.displayName = "UserDirectoryList";
