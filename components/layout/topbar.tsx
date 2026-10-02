"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import type { AuthUser, NavRoute } from "@/lib/types";
import { Container } from "@/components/ui/container";
import { TopbarTrail } from "@/components/layout/topbar-trail";
import { TopbarActions } from "@/components/layout/topbar-actions";
import {
    TOPBAR_ICON_BUTTON,
    TOPBAR_SETTINGS_SEGMENT,
} from "@/lib/config/topbar";
import { cn } from "@/lib/utils";
import { trailFor } from "@/lib/utils/nav";

export interface TopbarProps {
    routes: NavRoute[];
    rootLabel: string;
    rootHref: string;
    user?: AuthUser | null;
    onNavOpen?: () => void;
    onLogout?: () => void;
    signingOut?: boolean;
}

export function Topbar({
    routes,
    rootLabel,
    rootHref,
    user,
    onNavOpen,
    onLogout,
    signingOut,
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
        <header className="border-border bg-background sticky top-0 z-40 border-b">
            <Container className="gutter-x gutter-x--tight flex h-14 items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                    {onNavOpen && (
                        <button
                            type="button"
                            onClick={onNavOpen}
                            aria-label="Open navigation"
                            className={cn(
                                TOPBAR_ICON_BUTTON,
                                "desk-hidden -ml-1",
                            )}
                        >
                            <Menu
                                className="size-4"
                                strokeWidth={1.5}
                                aria-hidden="true"
                            />
                        </button>
                    )}

                    <TopbarTrail crumbs={crumbs} />
                </div>

                <TopbarActions
                    routes={routes}
                    settingsHref={settingsHref}
                    user={user}
                    onLogout={onLogout}
                    signingOut={signingOut}
                />
            </Container>
        </header>
    );
}

Topbar.displayName = "Topbar";
