"use client";

import Link from "next/link";
import type { NavRoute } from "@/lib/types";
import { TOPBAR_BADGE_CEILING, TOPBAR_SEGMENT } from "@/lib/config/topbar";
import { cn } from "@/lib/utils";

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
            className={cn(TOPBAR_SEGMENT, "border-border border-l")}
        >
            <Icon
                size={12}
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

export interface TopbarAlertsProps {
    routes: NavRoute[];
}

export function TopbarAlerts({ routes }: TopbarAlertsProps) {
    return routes.map((route) => (
        <AlertSegment key={route.href} route={route} />
    ));
}

TopbarAlerts.displayName = "TopbarAlerts";
