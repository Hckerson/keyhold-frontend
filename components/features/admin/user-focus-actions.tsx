"use client";

import { Button } from "@/components/ui/button";
import { userActionOf } from "@/lib/data/admin-users";
import type { ManagedUser } from "@/lib/types";

const REVIEW_ACTION = "Review";
const SUSPEND_ACTION = "Suspend";
const REACTIVATE_ACTION = "Reactivate";

export interface UserFocusActionsProps {
    user: ManagedUser;
    onOpen: (id: string) => void;
    onSuspend: (id: string) => void;
    reactivatingId?: string;
    onReactivate: (id: string) => void;
}

export function UserFocusActions({
    user,
    onOpen,
    onSuspend,
    reactivatingId,
    onReactivate,
}: UserFocusActionsProps) {
    const action = userActionOf(user);

    return (
        <div className="flex shrink-0 items-center gap-2">
            <Button type="button" onClick={() => onOpen(user.id)}>
                {REVIEW_ACTION}
            </Button>
            {action === "reactivate" && (
                <Button
                    type="button"
                    emphasis="solid"
                    tone="accent"
                    isLoading={reactivatingId === user.id}
                    disabled={reactivatingId !== undefined}
                    onClick={() => onReactivate(user.id)}
                >
                    {REACTIVATE_ACTION}
                </Button>
            )}
            {action === "suspend" && (
                <Button
                    type="button"
                    tone="error"
                    onClick={() => onSuspend(user.id)}
                >
                    {SUSPEND_ACTION}
                </Button>
            )}
        </div>
    );
}

UserFocusActions.displayName = "UserFocusActions";
