"use client";

import { PortalShell } from "@/components/layout/portal-shell";
import { ADMIN_ROUTES } from "@/lib/config/admin-nav";
import { useAdminNav } from "@/lib/hooks/use-admin-nav";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const sections = useAdminNav();

    return (
        <PortalShell
            brand={{ full: "Admin", tagline: "Console" }}
            sections={sections}
            routes={ADMIN_ROUTES}
            rootLabel="Admin"
            rootHref="/admin"
        >
            {children}
        </PortalShell>
    );
}
