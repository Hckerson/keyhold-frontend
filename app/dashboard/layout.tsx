"use client";

import { PortalShell } from "@/components/layout/portal-shell";
import {
    DASHBOARD_NAV,
    DASHBOARD_ROUTES,
    DASHBOARD_STATUS,
} from "@/lib/config/dashboard-nav";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <PortalShell
            brand={{ full: "Luxury RE", tagline: "Concierge" }}
            sections={DASHBOARD_NAV}
            status={DASHBOARD_STATUS}
            routes={DASHBOARD_ROUTES}
            rootLabel="Dashboard"
            rootHref="/dashboard"
        >
            {children}
        </PortalShell>
    );
}
