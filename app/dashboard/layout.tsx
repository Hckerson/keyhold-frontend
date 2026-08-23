"use client";

import { PortalShell } from "@/components/layout/portal-shell";
import { DASHBOARD_ROUTES } from "@/lib/config/dashboard-nav";
import { useDashboardNav } from "@/lib/hooks/use-dashboard-nav";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { sections, status } = useDashboardNav();

    return (
        <PortalShell
            brand={{ full: "Luxury RE", tagline: "Concierge" }}
            sections={sections}
            status={status}
            routes={DASHBOARD_ROUTES}
            rootLabel="Dashboard"
            rootHref="/dashboard"
        >
            {children}
        </PortalShell>
    );
}
