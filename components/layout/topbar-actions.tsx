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
    signingOut?: boolean;
}

export function TopbarActions({
    routes,
    settingsHref,
    user,
    onLogout,
    signingOut,
}: TopbarActionsProps) {
    const palette = useCommandPalette(routes);

    return (
        <div className="flex shrink-0 items-center gap-1">
            <TopbarSearch
                isAppleDevice={palette.isAppleDevice}
                onOpen={palette.openWith}
            />
            <TopbarAlerts routes={routes.filter((route) => route.badge)} />

            {user && (
                <>
                    <span
                        aria-hidden="true"
                        className="bg-border mx-1.5 h-5 w-px shrink-0"
                    />
                    <TopbarAccount
                        user={user}
                        settingsHref={settingsHref}
                        onLogout={onLogout}
                        signingOut={signingOut}
                    />
                </>
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
