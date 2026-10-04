"use client";

import { m } from "motion/react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserActivityMark } from "@/components/features/admin/user-activity-mark";
import { LIST_ROW_MOTION } from "@/lib/config/motion";
import { USER_STATUSES } from "@/lib/config/user-tones";
import { chartToneSoft } from "@/lib/config/chart-tones";
import { idleDays, userActionOf, userNote } from "@/lib/data/admin-users";
import { cn, initialsOf } from "@/lib/utils";
import type { ManagedUser } from "@/lib/types";

const REVIEW_ACTION = "Review";
const SUSPEND_ACTION = "Suspend";
const REACTIVATE_ACTION = "Reactivate";
const SEEN_PREFIX = "last seen";

export interface UserWaitingRowProps {
    user: ManagedUser;
    reactivatingId?: string;
    onOpen: (id: string) => void;
    onSuspend: (id: string) => void;
    onReactivate: (id: string) => void;
}

export function UserWaitingRow({
    user,
    reactivatingId,
    onOpen,
    onSuspend,
    onReactivate,
}: UserWaitingRowProps) {
    const status = USER_STATUSES[user.status];
    const action = userActionOf(user);
    const StatusIcon = status.icon;

    return (
        <m.li
            {...LIST_ROW_MOTION}
            className="flex h-14 min-w-0 items-center gap-3 px-3"
        >
            <span className="relative flex shrink-0">
                <Avatar
                    size="sm"
                    tone="accent"
                    elevated={false}
                    initials={initialsOf(user.name)}
                />
                <span
                    className={cn(
                        "absolute -right-1 -bottom-1 grid size-4 place-items-center rounded-full",
                        chartToneSoft[status.chartTone],
                    )}
                >
                    <StatusIcon
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className="size-2.5"
                    />
                </span>
            </span>

            <span className="flex min-w-0 flex-1 flex-col gap-0.5 text-xs">
                <span className="flex min-w-0 items-baseline gap-1.5">
                    <span className="text-text truncate font-semibold">
                        {user.name}
                    </span>
                    <span className="text-text-muted shrink-0">
                        {status.label} · {SEEN_PREFIX}{" "}
                    </span>
                    <UserActivityMark
                        days={idleDays(user)}
                        className="shrink-0"
                    />
                </span>
                <span className="text-text-secondary truncate">
                    {userNote(user) ?? user.email}
                </span>
            </span>

            <span className="flex shrink-0 items-center gap-1.5">
                <Button
                    type="button"
                    emphasis="quiet"
                    onClick={() => onOpen(user.id)}
                >
                    {REVIEW_ACTION}
                </Button>
                {action === "reactivate" && (
                    <Button
                        type="button"
                        tone="success"
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
            </span>
        </m.li>
    );
}

UserWaitingRow.displayName = "UserWaitingRow";
