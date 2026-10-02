"use client";

import { PortalGuard } from "@/components/features/auth/portal-guard";
import { PortalShell } from "@/components/layout/portal-shell";
import { useAgentNav } from "@/lib/hooks/use-agent-nav";

export default function AgentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const sections = useAgentNav();

    return (
        <PortalGuard role="SELLER">
            <PortalShell
                brand={{ full: "Agent Pro", tagline: "Premium" }}
                sections={sections}
                rootLabel="Agent"
                rootHref="/agent"
            >
                {children}
            </PortalShell>
        </PortalGuard>
    );
}
