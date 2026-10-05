"use client";

import { TopbarAlertLink } from "@/components/layout/topbar-alert-link";
import type { NavRoute } from "@/lib/types";

export interface TopbarAlertsProps {
    routes: NavRoute[];
}

export function TopbarAlerts({ routes }: TopbarAlertsProps) {
    return routes.map((route) => (
        <TopbarAlertLink key={route.href} route={route} />
    ));
}

TopbarAlerts.displayName = "TopbarAlerts";
