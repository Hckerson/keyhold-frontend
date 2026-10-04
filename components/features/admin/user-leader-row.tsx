"use client";

import { UserRoleMark } from "@/components/features/admin/user-role-mark";
import { cn, formatCompactUsd, percentOf } from "@/lib/utils";
import type { ManagedUser } from "@/lib/types";

const DEALS_SUFFIX = "deals";

export interface UserLeaderRowProps {
    user: ManagedUser;
    rank: number;
    directoryVolume: number;
    onOpen: (id: string) => void;
}

export function UserLeaderRow({
    user,
    rank,
    directoryVolume,
    onOpen,
}: UserLeaderRowProps) {
    return (
        <li>
            <button
                type="button"
                onClick={() => onOpen(user.id)}
                className="group hover:bg-background-muted focus-visible:ring-accent ease-smooth flex h-11 w-full min-w-0 items-center gap-3 rounded-md px-2 text-left transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
            >
                <span
                    className={cn(
                        "font-display text-h5 w-5 shrink-0 text-center leading-none font-light tabular-nums",
                        rank === 1 ? "text-highlight-dark" : "text-text-muted",
                    )}
                >
                    {rank}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="text-text group-hover:text-accent ease-smooth truncate text-xs font-medium transition-colors">
                        {user.name}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <UserRoleMark role={user.role} />
                        <span className="text-text-muted text-xs tabular-nums">
                            {user.transactions} {DEALS_SUFFIX}
                        </span>
                    </span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-0.5 text-xs tabular-nums">
                    <span className="text-text font-semibold">
                        {formatCompactUsd(user.volume)}
                    </span>
                    <span className="text-text-muted">
                        {percentOf(user.volume, directoryVolume)}%
                    </span>
                </span>
            </button>
        </li>
    );
}

UserLeaderRow.displayName = "UserLeaderRow";
