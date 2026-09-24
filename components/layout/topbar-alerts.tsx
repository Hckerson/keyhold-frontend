"use client";

import Link from "next/link";
import type { NavRoute } from "@/lib/types";
import { TOPBAR_BADGE_CEILING, TOPBAR_ICON_BUTTON } from "@/lib/config/topbar";

function AlertLink({ route }: { route: NavRoute }) {
    const Icon = route.icon;
    const count = route.badge ?? 0;
    const unread = count > 0;

    return (
        <Link
            href={route.href}
            title={route.label}
            aria-label={
                unread ? `${route.label}, ${count} waiting` : route.label
            }
            className={TOPBAR_ICON_BUTTON}
        >
            <Icon className="size-4" strokeWidth={1.5} aria-hidden="true" />
            {unread && (
                <span
                    aria-hidden="true"
                    className="bg-accent text-text-inverse ring-background absolute -top-0.5 -right-0.5 h-4 min-w-4 rounded-full px-1 text-center font-mono text-[10px] leading-4 font-semibold tabular-nums ring-2"
                >
                    {count > TOPBAR_BADGE_CEILING
                        ? `${TOPBAR_BADGE_CEILING}+`
                        : count}
                </span>
            )}
        </Link>
    );
}

AlertLink.displayName = "AlertLink";

export interface TopbarAlertsProps {
    routes: NavRoute[];
}

export function TopbarAlerts({ routes }: TopbarAlertsProps) {
    return routes.map((route) => <AlertLink key={route.href} route={route} />);
}

TopbarAlerts.displayName = "TopbarAlerts";
