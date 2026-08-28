"use client";

import { PortalShell } from "@/components/layout/portal-shell";
import { useAgentNav } from "@/lib/hooks/use-agent-nav";

export default function AgentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const sections = useAgentNav();

    return (
        <PortalShell
            brand={{ full: "Agent Pro", tagline: "Premium" }}
            sections={sections}
            rootLabel="Agent"
            rootHref="/agent"
        >
            {children}
        </PortalShell>
    );
}
