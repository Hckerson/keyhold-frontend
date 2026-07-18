"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, Search, type LucideIcon } from "lucide-react";
import type { AuthUser } from "@/lib/types/auth";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export interface TopbarRoute {
    label: string;
    href: string;
    icon: LucideIcon;
    badge?: number;
}

export interface TopbarProps {
    routes: TopbarRoute[];
    rootLabel: string;
    rootHref: string;
    user?: AuthUser | null;
}

function initialsOf(name: string) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

/* ------------------------------- Breadcrumb ------------------------------ */

function Breadcrumb({
    rootLabel,
    rootHref,
    active,
}: {
    rootLabel: string;
    rootHref: string;
    active?: TopbarRoute;
}) {
    const atRoot = !active || active.href === rootHref;
    return (
        <nav
            aria-label="Breadcrumb"
            className="flex min-w-0 items-center gap-2"
        >
            <Link
                href={rootHref}
                className={cn(
                    "ease-smooth text-sm transition-colors",
                    atRoot
                        ? "text-text font-medium"
                        : "text-text-secondary hover:text-accent",
                )}
            >
                {rootLabel}
            </Link>
            {!atRoot && active && (
                <>
                    <ChevronRight
                        size={14}
                        strokeWidth={1.5}
                        className="text-text-muted shrink-0"
                    />
                    <span className="text-text truncate text-sm font-medium">
                        {active.label}
                    </span>
                </>
            )}
        </nav>
    );
}

/* --------------------------------- Search -------------------------------- */

function SearchField() {
    const router = useRouter();
    const [query, setQuery] = useState("");

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        const trimmed = query.trim();
        router.push(
            trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search",
        );
    };

    return (
        <form onSubmit={submit} className="relative hidden md:block">
            <Search
                size={15}
                strokeWidth={1.5}
                className="text-text-muted pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2"
            />
            <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search…"
                aria-label="Search properties"
                className="border-border bg-background-alt text-text placeholder:text-text-muted focus:border-accent focus:ring-accent/15 ease-smooth h-8 w-48 rounded-lg border pr-3 pl-8 text-sm transition-colors focus:ring-2 focus:outline-none"
            />
        </form>
    );
}

/* ----------------------------- Notification ------------------------------ */

function NotificationLink({ route }: { route: TopbarRoute }) {
    const Icon = route.icon;
    const count = route.badge ?? 0;
    return (
        <Link
            href={route.href}
            aria-label={
                count > 0 ? `${route.label}, ${count} new` : route.label
            }
            className="text-text-secondary hover:bg-background-muted hover:text-text ease-smooth relative grid size-8 place-items-center rounded-lg transition-colors"
        >
            <Icon size={16} strokeWidth={1.5} />
            {count > 0 && (
                <span className="bg-highlight text-text-inverse ring-background absolute -top-1 -right-1 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[10px] leading-none font-semibold ring-2">
                    {count}
                </span>
            )}
        </Link>
    );
}

/* --------------------------------- Topbar -------------------------------- */

export function Topbar({ routes, rootLabel, rootHref, user }: TopbarProps) {
    const pathname = usePathname();

    const active = useMemo(() => {
        return routes
            .filter(
                (route) =>
                    pathname === route.href ||
                    pathname.startsWith(`${route.href}/`),
            )
            .sort((a, b) => b.href.length - a.href.length)[0];
    }, [routes, pathname]);

    const notifications = routes.filter((route) => route.badge);
    const settingsHref =
        routes.find((route) => route.href.endsWith("/settings"))?.href ??
        rootHref;

    return (
        <header className="border-border bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
            <Container className="flex h-16 items-center justify-between gap-4">
                <Breadcrumb
                    rootLabel={rootLabel}
                    rootHref={rootHref}
                    active={active}
                />

                <div className="flex items-center gap-2">
                    <SearchField />

                    <div className="flex items-center gap-0.5">
                        {notifications.map((route) => (
                            <NotificationLink key={route.href} route={route} />
                        ))}
                    </div>

                    {user && (
                        <>
                            <span className="bg-border mx-0.5 hidden h-5 w-px sm:block" />
                            <Link
                                href={settingsHref}
                                aria-label="Account settings"
                                className="bg-accent-light text-accent ring-accent/15 ease-smooth grid size-8 shrink-0 place-items-center rounded-full text-xs font-semibold ring-1 transition-transform hover:scale-105"
                            >
                                {initialsOf(user.name)}
                            </Link>
                        </>
                    )}
                </div>
            </Container>
        </header>
    );
}

Topbar.displayName = "Topbar";
