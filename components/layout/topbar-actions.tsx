"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import type { AuthUser, NavRoute } from "@/lib/types";
import { Avatar } from "@/components/ui/avatar";
import { TopbarSearch } from "@/components/layout/topbar-search";
import { TOPBAR_BADGE_CEILING, TOPBAR_SEARCH } from "@/lib/config/topbar";
import { cn, initialsOf } from "@/lib/utils";

const segmentClass =
    "hover:bg-background-muted focus-visible:ring-accent ease-smooth flex h-8 items-center gap-1.5 px-2.5 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-inset focus-visible:outline-none";

function AlertSegment({ route }: { route: NavRoute }) {
    const Icon = route.icon;
    const count = route.badge ?? 0;
    const unread = count > 0;

    return (
        <Link
            href={route.href}
            aria-label={
                unread ? `${route.label}, ${count} unread` : route.label
            }
            className={cn(segmentClass, "border-border border-l")}
        >
            <Icon
                size={14}
                strokeWidth={1.5}
                className={unread ? "text-text" : "text-text-secondary"}
            />
            {unread && (
                <span className="bg-highlight-light text-highlight-dark rounded-xs px-1 py-px font-mono text-[10px] leading-none font-semibold tabular-nums">
                    {count > TOPBAR_BADGE_CEILING
                        ? `${TOPBAR_BADGE_CEILING}+`
                        : count}
                </span>
            )}
        </Link>
    );
}

function AccountLink({ user, href }: { user: AuthUser; href: string }) {
    return (
        <Link
            href={href}
            aria-label={`Account settings for ${user.name}`}
            className="focus-visible:ring-accent ease-smooth rounded-full transition-opacity duration-200 hover:opacity-80 focus-visible:ring-2 focus-visible:outline-none"
        >
            <Avatar
                size="sm"
                tone="accent"
                elevated={false}
                initials={initialsOf(user.name)}
                className="ring-border ring-1"
            />
        </Link>
    );
}

export interface TopbarActionsProps {
    routes: NavRoute[];
    accountHref: string;
    user?: AuthUser | null;
}

export function TopbarActions({
    routes,
    accountHref,
    user,
}: TopbarActionsProps) {
    const alerts = routes.filter((route) => route.badge);

    return (
        <div className="flex shrink-0 items-center gap-2">
            <div className="border-border bg-background-alt flex h-8 items-center overflow-hidden rounded-lg border">
                <TopbarSearch />

                <Link
                    href={TOPBAR_SEARCH.route}
                    aria-label={TOPBAR_SEARCH.label}
                    className={cn(segmentClass, "md:hidden")}
                >
                    <Search
                        size={14}
                        strokeWidth={1.5}
                        className="text-text-secondary"
                    />
                </Link>

                {alerts.map((route) => (
                    <AlertSegment key={route.href} route={route} />
                ))}
            </div>

            {user && <AccountLink user={user} href={accountHref} />}
        </div>
    );
}

TopbarActions.displayName = "TopbarActions";
