"use client";

import { Ban, RotateCcw } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { userActionOf } from "@/lib/data/admin-users";
import type { ManagedUser } from "@/lib/types";

const SUSPEND_LABEL = "Suspend";
const REACTIVATE_LABEL = "Reactivate";

export interface UserRowActionsProps {
    user: ManagedUser;
    onSuspend: (id: string) => void;
    reactivatingId?: string;
    onReactivate: (id: string) => void;
}

export function UserRowActions({
    user,
    onSuspend,
    reactivatingId,
    onReactivate,
}: UserRowActionsProps) {
    const action = userActionOf(user);
    if (!action) return null;

    return (
        <span className="reveal reveal-overlay bg-background-muted absolute inset-y-0 right-0 flex w-20 items-center justify-end rounded-r-md px-1">
            {action === "reactivate" ? (
                <IconButton
                    size="md"
                    tone="success"
                    icon={RotateCcw}
                    label={`${REACTIVATE_LABEL} ${user.name}`}
                    disabled={reactivatingId !== undefined}
                    className="text-success"
                    onClick={() => onReactivate(user.id)}
                />
            ) : (
                <IconButton
                    size="md"
                    tone="error"
                    icon={Ban}
                    label={`${SUSPEND_LABEL} ${user.name}`}
                    className="text-error"
                    onClick={() => onSuspend(user.id)}
                />
            )}
        </span>
    );
}

UserRowActions.displayName = "UserRowActions";
