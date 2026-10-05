"use client";

import { USER_ROLES } from "@/lib/config/user-tones";
import { formatCompactUsd, percentOf } from "@/lib/utils";
import type { ManagedUser } from "@/lib/types";

const RANK_DIGITS = 2;

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
                className="group focus-visible:ring-accent flex h-10 w-full items-center gap-3 rounded-sm text-left focus-visible:ring-2 focus-visible:outline-none"
            >
                <span className="text-text-muted w-4 shrink-0 font-mono text-[10px] tabular-nums">
                    {String(rank).padStart(RANK_DIGITS, "0")}
                </span>
                <span className="flex min-w-0 flex-1 items-baseline gap-1.5 text-xs">
                    <span className="text-text group-hover:text-accent ease-smooth truncate font-medium transition-colors duration-200">
                        {user.name}
                    </span>
                    <span className="text-text-muted shrink-0">
                        {USER_ROLES[user.role].label}
                    </span>
                </span>
                <span className="flex shrink-0 items-baseline gap-2 tabular-nums">
                    <span className="text-text-muted text-xs">
                        {percentOf(user.volume, directoryVolume)}%
                    </span>
                    <span className="font-display text-text w-16 text-right text-base leading-none font-light">
                        {formatCompactUsd(user.volume)}
                    </span>
                </span>
            </button>
        </li>
    );
}

UserLeaderRow.displayName = "UserLeaderRow";
