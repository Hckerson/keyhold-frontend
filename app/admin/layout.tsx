"use client";

import { PortalGuard } from "@/components/features/auth/portal-guard";
import { PortalShell } from "@/components/layout/portal-shell";
import { ADMIN_ROUTES } from "@/lib/constants";
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
                rootHref={ADMIN_ROUTES.overview}
            >
                {children}
            </PortalShell>
        </PortalGuard>
    );
}
