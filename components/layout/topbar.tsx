"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu } from "lucide-react";
import type { AuthUser, NavRoute } from "@/lib/types";
import { Container } from "@/components/ui/container";
import { TopbarActions } from "@/components/layout/topbar-actions";
import { TOPBAR_SETTINGS_SEGMENT } from "@/lib/config/topbar";
import { cn } from "@/lib/utils";

export interface TopbarProps {
    routes: NavRoute[];
    rootLabel: string;
    rootHref: string;
    user?: AuthUser | null;
    onNavOpen?: () => void;
}

/* ── route identity ── */

function RouteIdentity({
    rootLabel,
    rootHref,
    active,
}: {
    rootLabel: string;
    rootHref: string;
    active?: NavRoute;
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

    const accountHref =
        routes.find((route) => route.href.endsWith(TOPBAR_SETTINGS_SEGMENT))
            ?.href ?? rootHref;

    return (
        <header className="border-border-dark bg-background sticky top-0 z-40 border-b">
            <Container className="flex h-14 items-center justify-between gap-3 px-4 md:px-12">
                <div className="flex min-w-0 items-center gap-2">
                    {onNavOpen && (
                        <button
                            type="button"
                            onClick={onNavOpen}
                            aria-label="Open navigation"
                            className="border-border bg-background-alt text-text-secondary hover:bg-background-muted hover:text-text focus-visible:ring-accent ease-smooth grid size-8 shrink-0 place-items-center rounded-lg border transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none lg:hidden"
                        >
                            <Menu size={14} strokeWidth={1.5} />
                        </button>
                    )}

                    <RouteIdentity
                        rootLabel={rootLabel}
                        rootHref={rootHref}
                        active={active}
                    />
                </div>

                <TopbarActions
                    routes={routes}
                    accountHref={accountHref}
                    user={user}
                />
            </Container>
        </header>
    );
}

Topbar.displayName = "Topbar";
