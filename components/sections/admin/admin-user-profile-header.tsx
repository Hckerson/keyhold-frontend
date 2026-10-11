"use client";

import Link from "next/link";
import { ArrowLeft, Ban, Mail, RotateCcw } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserStatusMark } from "@/components/features/admin/user-status-mark";
import {
    PROFILE_BACK,
    PROFILE_COPY as COPY,
} from "@/lib/data/admin-user-profile";
import { userActionOf } from "@/lib/data/admin-users";
import { cn, initialsOf } from "@/lib/utils";
import type { ManagedUser } from "@/lib/types";

export interface AdminUserProfileHeaderProps {
    user: ManagedUser;
    avatar?: string;
    identity: string;
    reactivating?: boolean;
    onSuspend: () => void;
    onReactivate: () => void;
}

export function AdminUserProfileHeader({
    user,
    avatar,
    identity,
    reactivating,
    onSuspend,
    onReactivate,
}: AdminUserProfileHeaderProps) {
    const action = userActionOf(user);

    return (
        <header className="flex flex-col gap-4">
            <Link
                href={PROFILE_BACK.href}
                className="text-text-secondary hover:text-accent focus-visible:ring-accent ease-smooth inline-flex w-fit items-center gap-1.5 rounded-xs text-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
            >
                <ArrowLeft
                    className="size-3"
                    strokeWidth={1.5}
                    aria-hidden="true"
                />
                {PROFILE_BACK.label}
            </Link>

            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4">
                    <Avatar
                        size="xl"
                        src={avatar}
                        alt={user.name}
                        initials={initialsOf(user.name)}
                    />
                    <div className="flex min-w-0 flex-col gap-1.5">
                        <h1 className="font-display text-h4 text-text truncate leading-none font-light">
                            {user.name}
                        </h1>
                        <p className="text-text-secondary truncate text-xs">
                            {identity}
                        </p>
                        <UserStatusMark status={user.status} />
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                    <a
                        href={`mailto:${user.email}`}
                        className={cn(buttonVariants(), "gap-1.5")}
                    >
                        <Mail
                            className="size-3"
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />
                        {COPY.email}
                    </a>
                    {action === "suspend" && (
                        <Button
                            type="button"
                            tone="error"
                            icon={Ban}
                            onClick={onSuspend}
                        >
                            {COPY.suspend}
                        </Button>
                    )}
                    {action === "reactivate" && (
                        <Button
                            type="button"
                            emphasis="solid"
                            tone="accent"
                            icon={RotateCcw}
                            isLoading={reactivating}
                            onClick={onReactivate}
                        >
                            {COPY.reactivate}
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}

AdminUserProfileHeader.displayName = "AdminUserProfileHeader";
