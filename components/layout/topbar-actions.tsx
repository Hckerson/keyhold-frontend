"use client";

import type { AuthUser, NavRoute } from "@/lib/types";
import { TopbarSearch } from "@/components/layout/topbar-search";
import { TopbarAlerts } from "@/components/layout/topbar-alerts";
import { TopbarAccount } from "@/components/layout/topbar-account";
import { CommandPalette } from "@/components/layout/command-palette";
import { useCommandPalette } from "@/lib/hooks/use-command-palette";

export interface TopbarActionsProps {
    routes: NavRoute[];
    settingsHref: string;
    user?: AuthUser | null;
    onLogout?: () => void;
}

export function TopbarActions({
    routes,
    settingsHref,
    user,
    onLogout,
}: TopbarActionsProps) {
    const palette = useCommandPalette(routes);

    return (
        <div className="flex shrink-0 items-center gap-2">
            <div className="border-border bg-background-alt flex h-8 items-center overflow-hidden rounded-lg border">
                <TopbarSearch
                    isAppleDevice={palette.isAppleDevice}
                    onOpen={palette.openWith}
                />
                <TopbarAlerts routes={routes.filter((route) => route.badge)} />
            </div>

            {user && (
                <TopbarAccount
                    user={user}
                    settingsHref={settingsHref}
                    onLogout={onLogout}
                />
            )}

            <CommandPalette
                open={palette.open}
                onOpenChange={palette.setOpen}
                query={palette.query}
                onQueryChange={palette.setQuery}
                items={palette.items}
                active={palette.active}
                onActiveChange={palette.setActive}
                onKeyDown={palette.onKeyDown}
            />
        </div>
    );
}

TopbarActions.displayName = "TopbarActions";
