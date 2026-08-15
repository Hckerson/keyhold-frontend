"use client";

import { PortalShell } from "@/components/layout/portal-shell";
import { ADMIN_NAV, ADMIN_ROUTES } from "@/lib/config/admin-nav";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <PortalShell
            brand={{ full: "Admin", tagline: "Console" }}
            sections={ADMIN_NAV}
            routes={ADMIN_ROUTES}
            rootLabel="Admin"
            rootHref="/admin"
        >
            {children}
        </PortalShell>
    );
}
