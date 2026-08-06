"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, Menu, Search, type LucideIcon } from "lucide-react";
import type { AuthUser } from "@/lib/types/auth";
import { Avatar } from "@/components/ui/avatar";
import { Container } from "@/components/ui/container";
import { cn, initialsOf } from "@/lib/utils";

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
    onNavOpen?: () => void;
}

const SEARCH_ROUTE = "/search";
const SEARCH_SHORTCUT_KEY = "k";
const MAX_BADGE_COUNT = 9;

const tileClass =
    "text-text-secondary hover:bg-background-muted hover:text-text focus-visible:ring-accent ease-smooth relative grid size-8 shrink-0 place-items-center rounded-lg transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none";

/* ── route identity ── */

function RouteIdentity({
    rootLabel,
    rootHref,
    active,
}: {
    rootLabel: string;
    rootHref: string;
    active?: TopbarRoute;
}) {
    const ActiveIcon = active?.icon;

    return (
        <nav
            aria-label="Breadcrumb"
            className="flex min-w-0 items-center gap-2 select-none"
        >
            <Link
                href={rootHref}
                className={cn(
                    "hover:text-accent focus-visible:ring-accent ease-smooth rounded-xs font-mono text-[10px] tracking-wide uppercase transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                    active ? "text-text-muted" : "text-text-secondary",
                )}
            >
                {rootLabel}
            </Link>

            {active && ActiveIcon && (
                <>
                    <ChevronRight
                        size={12}
                        strokeWidth={1.5}
                        className="text-text-muted shrink-0"
                    />
                    <span className="flex min-w-0 items-center gap-1.5">
                        <ActiveIcon
                            size={12}
                            strokeWidth={1.5}
                            className="text-text-secondary shrink-0"
                        />
                        <span
                            aria-current="page"
                            className="text-text truncate text-xs font-semibold"
                        >
                            {active.label}
                        </span>
                    </span>
                </>
            )}
        </nav>
    );
}

/* ── search ── */

function SearchField() {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState("");
    const [isAppleDevice, setIsAppleDevice] = useState(false);

    useEffect(() => {
        setIsAppleDevice(/Mac|iPhone|iPad/.test(navigator.userAgent));
    }, []);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (
                event.key.toLowerCase() === SEARCH_SHORTCUT_KEY &&
                (event.metaKey || event.ctrlKey)
            ) {
                event.preventDefault();
                inputRef.current?.focus();
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        const trimmed = query.trim();
        router.push(
            trimmed
                ? `${SEARCH_ROUTE}?q=${encodeURIComponent(trimmed)}`
                : SEARCH_ROUTE,
        );
    };

    return (
        <form onSubmit={submit} className="relative hidden md:block">
            <Search
                size={14}
                strokeWidth={1.5}
                className="text-text-muted pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2"
            />
            <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) =>
                    event.key === "Escape" && inputRef.current?.blur()
                }
                placeholder="Search…"
                aria-label="Search properties"
                className="border-border bg-background-alt text-text placeholder:text-text-muted focus:border-accent focus:ring-accent/15 ease-smooth h-8 w-56 rounded-lg border pr-12 pl-8 text-sm transition-colors duration-200 focus:ring-2 focus:outline-none"
            />
            {!query && (
                <kbd className="text-text-muted border-border bg-background pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 rounded-xs border px-1 py-px font-mono text-[10px] tracking-wide select-none">
                    {isAppleDevice ? "⌘" : "Ctrl "}K
                </kbd>
            )}
        </form>
    );
}

/* ── actions ── */

function NotificationLink({ route }: { route: TopbarRoute }) {
    const Icon = route.icon;
    const count = route.badge ?? 0;

    return (
        <Link
            href={route.href}
            aria-label={
                count > 0 ? `${route.label}, ${count} pending` : route.label
            }
            className={tileClass}
        >
            <Icon size={16} strokeWidth={1.5} />
            {count > 0 && (
                <span className="bg-highlight text-text-inverse ring-background absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full px-1 font-mono text-[10px] leading-none font-semibold ring-2">
                    {count > MAX_BADGE_COUNT ? `${MAX_BADGE_COUNT}+` : count}
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
                className="ring-accent/15 ring-1"
            />
        </Link>
    );
}

/* ── shell ── */

export function Topbar({
    routes,
    rootLabel,
    rootHref,
    user,
    onNavOpen,
}: TopbarProps) {
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
        <header className="border-border-dark bg-background sticky top-0 z-40 border-b">
            <Container className="flex h-14 items-center justify-between gap-3 px-4 md:px-12">
                <div className="flex min-w-0 items-center gap-2">
                    {onNavOpen && (
                        <button
                            type="button"
                            onClick={onNavOpen}
                            aria-label="Open navigation"
                            className={cn(tileClass, "-ml-1.5 lg:hidden")}
                        >
                            <Menu size={16} strokeWidth={1.5} />
                        </button>
                    )}

                    <RouteIdentity
                        rootLabel={rootLabel}
                        rootHref={rootHref}
                        active={active}
                    />
                </div>

                <div className="flex shrink-0 items-center gap-1">
                    <SearchField />

                    <Link
                        href={SEARCH_ROUTE}
                        aria-label="Search properties"
                        className={cn(tileClass, "md:hidden")}
                    >
                        <Search size={16} strokeWidth={1.5} />
                    </Link>

                    {notifications.map((route) => (
                        <NotificationLink key={route.href} route={route} />
                    ))}

                    {user && (
                        <>
                            <span className="bg-border mx-1 hidden h-4 w-px sm:block" />
                            <AccountLink user={user} href={settingsHref} />
                        </>
                    )}
                </div>
            </Container>
        </header>
    );
}

Topbar.displayName = "Topbar";
