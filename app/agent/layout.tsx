"use client";

import { PortalShell } from "@/components/layout/portal-shell";
import { AGENT_NAV, AGENT_ROUTES } from "@/lib/config/agent-nav";

export default function AgentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <PortalShell
            brand={{ full: "Agent Pro", tagline: "Premium" }}
            sections={AGENT_NAV}
            routes={AGENT_ROUTES}
            rootLabel="Agent"
            rootHref="/agent"
        >
            {children}
        </PortalShell>
    );
}
