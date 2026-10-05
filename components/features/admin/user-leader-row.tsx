"use client";

import { Avatar } from "@/components/ui/avatar";
import { USER_ROLES } from "@/lib/config/user-tones";
import { dealsLabel } from "@/lib/data/admin-users";
import { formatCompactUsd, initialsOf, percentOf } from "@/lib/utils";
import type { ManagedUser } from "@/lib/types";

const SHARE_SUFFIX = "of volume";

export interface UserLeaderRowProps {
    user: ManagedUser;
    directoryVolume: number;
    onOpen: (id: string) => void;
}

export function UserLeaderRow({
    user,
    directoryVolume,
    onOpen,
}: UserLeaderRowProps) {
    return (
        <li>
            <button
                type="button"
                onClick={() => onOpen(user.id)}
                className="group hover:bg-background-muted focus-visible:ring-accent ease-smooth flex h-11 w-full min-w-0 items-center gap-3 rounded-md px-2 text-left text-xs tabular-nums transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
            >
                <Avatar
                    size="sm"
                    tone="accent"
                    elevated={false}
                    initials={initialsOf(user.name)}
                />
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="text-text group-hover:text-accent ease-smooth truncate font-medium transition-colors">
                        {user.name}
                    </span>
                    <span className="text-text-muted truncate">
                        {USER_ROLES[user.role].label} ·{" "}
                        {dealsLabel(user.transactions)}
                    </span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-0.5">
                    <span className="text-text font-semibold">
                        {formatCompactUsd(user.volume)}
                    </span>
                    <span className="text-text-muted">
                        {percentOf(user.volume, directoryVolume)}%{" "}
                        {SHARE_SUFFIX}
                    </span>
                </span>
            </button>
        </li>
    );
}

UserLeaderRow.displayName = "UserLeaderRow";
