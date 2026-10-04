"use client";

import { m } from "motion/react";
import { Avatar } from "@/components/ui/avatar";
import { StatusDot } from "@/components/patterns/status-dot";
import { UserActivityMark } from "@/components/features/admin/user-activity-mark";
import { UserDealMark } from "@/components/features/admin/user-deal-mark";
import { UserRoleMark } from "@/components/features/admin/user-role-mark";
import { UserRowActions } from "@/components/features/admin/user-row-actions";
import { UserVolumeMark } from "@/components/features/admin/user-volume-mark";
import { LIST_ROW_MOTION } from "@/lib/config/motion";
import { USER_STATUSES } from "@/lib/config/user-tones";
import { idleDays } from "@/lib/data/admin-users";
import { cn, initialsOf } from "@/lib/utils";
import type { ManagedUser } from "@/lib/types";

export interface UserDirectoryRowProps {
    user: ManagedUser;
    peak: number;
    onOpen: (id: string) => void;
    onSuspend: (id: string) => void;
    reactivatingId?: string;
    onReactivate: (id: string) => void;
}

export function UserDirectoryRow({
    user,
    peak,
    onOpen,
    ...actions
}: UserDirectoryRowProps) {
    const status = USER_STATUSES[user.status];
    const muted = user.status === "deleted" && "opacity-60";

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
                    <span className="relative flex shrink-0">
                        <Avatar
                            size="xs"
                            tone="accent"
                            elevated={false}
                            initials={initialsOf(user.name)}
                        />
                        <span
                            title={status.label}
                            className="bg-background absolute -right-0.5 -bottom-0.5 grid size-2.5 place-items-center rounded-full"
                        >
                            <StatusDot tone={status.tone} />
                        </span>
                    </span>
                    <span className="min-w-0 truncate">
                        <span className="text-text group-hover:text-accent ease-smooth font-medium transition-colors">
                            {user.name}
                        </span>
                        <span className="text-text-muted">
                            {" · "}
                            {user.email}
                        </span>
                        <span className="sr-only">, {status.label}</span>
                    </span>
                </button>
                <UserRoleMark
                    role={user.role}
                    className={cn("queue-grid__wide", muted)}
                />
                <UserDealMark
                    deals={user.transactions}
                    className={cn("queue-grid__wide justify-end", muted)}
                />
                <UserActivityMark
                    days={idleDays(user)}
                    className={cn("queue-grid__wide justify-end", muted)}
                />
                <UserVolumeMark
                    volume={user.volume}
                    peak={peak}
                    className={cn("text-right", muted)}
                />
                <UserRowActions user={user} {...actions} />
            </div>
        </m.li>
    );
}

UserDirectoryRow.displayName = "UserDirectoryRow";
