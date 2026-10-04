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

    return (
        <span className="flex items-center justify-end">
            {action === "reactivate" && (
                <IconButton
                    tone="success"
                    icon={RotateCcw}
                    label={`${REACTIVATE_LABEL} ${user.name}`}
                    disabled={reactivatingId !== undefined}
                    onClick={() => onReactivate(user.id)}
                />
            )}
            {action === "suspend" && (
                <IconButton
                    tone="error"
                    icon={Ban}
                    label={`${SUSPEND_LABEL} ${user.name}`}
                    onClick={() => onSuspend(user.id)}
                />
            )}
        </span>
    );
}

UserRowActions.displayName = "UserRowActions";
