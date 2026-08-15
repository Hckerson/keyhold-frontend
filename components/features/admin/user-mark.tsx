"use client";

import { Avatar } from "@/components/ui/avatar";
import { cn, initialsOf } from "@/lib/utils";
import type { ManagedUser } from "@/lib/types";

export interface UserMarkProps {
    user: ManagedUser;
    onOpen: (id: string) => void;
    className?: string;
}

export function UserMark({ user, onOpen, className }: UserMarkProps) {
    return (
        <button
            type="button"
            onClick={() => onOpen(user.id)}
            className={cn(
                "group focus-visible:ring-accent flex min-w-0 items-center gap-2 rounded-md text-left focus-visible:ring-2 focus-visible:outline-none",
                className,
            )}
        >
            <Avatar
                size="xs"
                tone="accent"
                elevated={false}
                initials={initialsOf(user.name)}
                className="text-[10px]"
            />
            <span className="min-w-0">
                <span className="text-text group-hover:text-accent ease-smooth block truncate text-xs font-medium transition-colors duration-200">
                    {user.name}
                </span>
                <span className="text-text-muted block truncate text-[10px]">
                    {user.email}
                </span>
            </span>
        </button>
    );
}

UserMark.displayName = "UserMark";
