"use client";

import { Button } from "@/components/ui/button";
import type { ManagedUser } from "@/lib/types";

const REVIEW_ACTION = "Review";
const SUSPEND_ACTION = "Suspend";
const REACTIVATE_ACTION = "Reactivate";

export interface UserFocusActionsProps {
    user: ManagedUser;
    onOpen: (id: string) => void;
    onSuspend: (id: string) => void;
    onReactivate: (id: string) => void;
}

export function UserFocusActions({
    user,
    onOpen,
    onSuspend,
    onReactivate,
}: UserFocusActionsProps) {
    const moderable = user.status !== "deleted";

    return (
        <div className="flex shrink-0 items-center gap-2">
            <Button type="button" onClick={() => onOpen(user.id)}>
                {REVIEW_ACTION}
            </Button>
            {moderable &&
                (user.status === "suspended" ? (
                    <Button
                        type="button"
                        emphasis="solid"
                        tone="accent"
                        onClick={() => onReactivate(user.id)}
                    >
                        {REACTIVATE_ACTION}
                    </Button>
                ) : (
                    <Button
                        type="button"
                        tone="error"
                        onClick={() => onSuspend(user.id)}
                    >
                        {SUSPEND_ACTION}
                    </Button>
                ))}
        </div>
    );
}

UserFocusActions.displayName = "UserFocusActions";
