"use client";

import { Ban, RotateCcw } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import type { ManagedUser } from "@/lib/types";

const SUSPEND_LABEL = "Suspend";
const REACTIVATE_LABEL = "Reactivate";

export interface UserRowActionsProps {
    user: ManagedUser;
    onSuspend: (id: string) => void;
    onReactivate: (id: string) => void;
}

export function UserRowActions({
    user,
    onSuspend,
    onReactivate,
}: UserRowActionsProps) {
    if (user.status === "deleted") {
        return <span className="flex items-center justify-end" />;
    }

    if (user.status === "suspended") {
        return (
            <span className="flex items-center justify-end">
                <IconButton
                    tone="success"
                    icon={RotateCcw}
                    label={`${REACTIVATE_LABEL} ${user.name}`}
                    onClick={() => onReactivate(user.id)}
                />
            </span>
        );
    }

    return (
        <span className="flex items-center justify-end">
            <IconButton
                tone="danger"
                icon={Ban}
                label={`${SUSPEND_LABEL} ${user.name}`}
                onClick={() => onSuspend(user.id)}
            />
        </span>
    );
}

UserRowActions.displayName = "UserRowActions";
