"use client";

import { PortalGuard } from "@/components/features/auth/portal-guard";
import { PortalShell } from "@/components/layout/portal-shell";
import { useAdminNav } from "@/lib/hooks/use-admin-nav";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const sections = useAdminNav();

    return (
        <PortalGuard role="ADMIN">
            <PortalShell
                brand={{ full: "Admin", tagline: "Console" }}
                sections={sections}
                rootLabel="Admin"
                rootHref="/admin"
            >
                {children}
            </PortalShell>
        </PortalGuard>
    );
}
