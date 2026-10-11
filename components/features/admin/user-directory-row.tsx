"use client";

import { m } from "motion/react";
import { Avatar } from "@/components/ui/avatar";
import { UserActivityMark } from "@/components/features/admin/user-activity-mark";
import { UserBookMark } from "@/components/features/admin/user-book-mark";
import { UserRowActions } from "@/components/features/admin/user-row-actions";
import { UserStatusMark } from "@/components/features/admin/user-status-mark";
import { chartToneText } from "@/lib/config/chart-tones";
import { LIST_ROW_MOTION } from "@/lib/config/motion";
import { USER_ROLES } from "@/lib/config/user-tones";
import { idleDays, joinedLabel } from "@/lib/data/admin-users";
import { cn, initialsOf } from "@/lib/utils";
import type { ManagedUser } from "@/lib/types";

export interface UserDirectoryRowProps {
    user: ManagedUser;
    onOpen: (id: string) => void;
    onSuspend: (id: string) => void;
    reactivatingId?: string;
    onReactivate: (id: string) => void;
}

export function UserDirectoryRow({
    user,
    onOpen,
    ...actions
}: UserDirectoryRowProps) {
    const muted = user.status === "deleted" && "opacity-60";
    const role = USER_ROLES[user.role];

    return (
        <m.li {...LIST_ROW_MOTION} className="overflow-hidden">
            <div className="queue-grid queue-grid--accounts reveal-scope hover:bg-background-muted ease-smooth relative h-11 rounded-md px-2 transition-colors duration-200">
                <button
                    type="button"
                    onClick={() => onOpen(user.id)}
                    className={cn(
                        "group focus-visible:ring-accent flex min-w-0 items-center gap-2.5 rounded-sm text-left text-xs focus-visible:ring-2 focus-visible:outline-none",
                        muted,
                    )}
                >
                    <Avatar
                        size="sm"
                        elevated={false}
                        initials={initialsOf(user.name)}
                    />
                    <span className="flex min-w-0 flex-col gap-0.5">
                        <span className="flex min-w-0 items-baseline gap-2">
                            <span className="text-text group-hover:text-accent ease-smooth truncate font-medium transition-colors">
                                {user.name}
                            </span>
                            {user.volume > 0 && (
                                <UserBookMark
                                    deals={user.transactions}
                                    volume={user.volume}
                                    className="shrink-0 justify-start"
                                />
                            )}
                        </span>
                        <span className="text-text-muted truncate">
                            <span className={chartToneText[role.tone]}>
                                {role.label}
                            </span>
                            {" · "}
                            {user.email}
                        </span>
                    </span>
                </button>
                <UserStatusMark
                    status={user.status}
                    className={cn("queue-grid__wide", muted)}
                />
                <UserActivityMark
                    days={idleDays(user)}
                    className={cn("queue-grid__wide justify-end", muted)}
                />
                <span
                    className={cn(
                        "text-text-secondary text-right text-xs tabular-nums",
                        muted,
                    )}
                >
                    {joinedLabel(user)}
                </span>
                <UserRowActions user={user} {...actions} />
            </div>
        </m.li>
    );
}

UserDirectoryRow.displayName = "UserDirectoryRow";
