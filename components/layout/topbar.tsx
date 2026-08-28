"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import type { AuthUser, NavRoute } from "@/lib/types";
import { Container } from "@/components/ui/container";
import { TopbarTrail } from "@/components/layout/topbar-trail";
import { TopbarActions } from "@/components/layout/topbar-actions";
import { TOPBAR_SETTINGS_SEGMENT } from "@/lib/config/topbar";
import { trailFor } from "@/lib/utils/nav";

export interface TopbarProps {
    routes: NavRoute[];
    rootLabel: string;
    rootHref: string;
    user?: AuthUser | null;
    onNavOpen?: () => void;
    onLogout?: () => void;
}

export function Topbar({
    routes,
    rootLabel,
    rootHref,
    user,
    onNavOpen,
    onLogout,
}: TopbarProps) {
    const pathname = usePathname();

    const crumbs = useMemo(
        () => trailFor({ pathname, routes, rootLabel, rootHref }),
        [pathname, routes, rootLabel, rootHref],
    );

    const settingsHref =
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

                    <TopbarTrail crumbs={crumbs} />
                </div>

                <TopbarActions
                    routes={routes}
                    settingsHref={settingsHref}
                    user={user}
                    onLogout={onLogout}
                />
            </Container>
        </header>
    );
}

Topbar.displayName = "Topbar";
