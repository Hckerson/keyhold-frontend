"use client";

import { Button } from "@/components/ui/button";
import { initialsOf } from "@/lib/utils";
import type { ManagedUser, UserStatus } from "@/lib/types";

export function UserCell({ user }: { user: ManagedUser }) {
    return (
        <div className="flex items-center gap-2.5">
            <span className="bg-accent-light text-accent grid size-8 shrink-0 place-items-center rounded-full text-xs font-semibold">
                {initialsOf(user.name)}
            </span>
            <div className="min-w-0">
                <p className="text-text truncate font-medium">{user.name}</p>
                <p className="text-text-muted truncate text-xs">{user.email}</p>
            </div>
        </div>
    );
}

export function UserRowActions({
    user,
    onStatusChange,
}: {
    user: ManagedUser;
    onStatusChange?: (ids: string[], status: UserStatus) => void;
}) {
    return (
        <div className="flex justify-end gap-1">
            <Button variant="ghost" size="sm">
                View
            </Button>
            {user.status === "active" && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-error hover:text-error"
                    onClick={() => onStatusChange?.([user.id], "suspended")}
                >
                    Suspend
                </Button>
            )}
            {user.status === "suspended" && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onStatusChange?.([user.id], "active")}
                >
                    Reactivate
                </Button>
            )}
        </div>
    );
}
