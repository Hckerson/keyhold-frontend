"use client";

import { Ban, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ManagedUser } from "@/lib/types";

const ICON_BUTTON =
    "ease-smooth focus-visible:ring-accent text-text-muted grid size-5 place-items-center rounded-md transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none";

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
    if (user.status === "suspended") {
        return (
            <span className="flex items-center justify-end">
                <button
                    type="button"
                    aria-label={`${REACTIVATE_LABEL} ${user.name}`}
                    onClick={() => onReactivate(user.id)}
                    className={cn(
                        ICON_BUTTON,
                        "hover:bg-success-light hover:text-success",
                    )}
                >
                    <RotateCcw
                        className="size-3"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                </button>
            </span>
        );
    }

    return (
        <span className="flex items-center justify-end">
            <button
                type="button"
                aria-label={`${SUSPEND_LABEL} ${user.name}`}
                onClick={() => onSuspend(user.id)}
                className={cn(
                    ICON_BUTTON,
                    "hover:bg-error-light hover:text-error",
                )}
            >
                <Ban className="size-3" strokeWidth={1.5} aria-hidden="true" />
            </button>
        </span>
    );
}

UserRowActions.displayName = "UserRowActions";
