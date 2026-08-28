"use client";

import { PortalShell } from "@/components/layout/portal-shell";
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
            rootLabel="Dashboard"
            rootHref="/dashboard"
        >
            {children}
        </PortalShell>
    );
}
