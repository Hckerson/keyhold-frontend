"use client";

import { useMemo } from "react";
import { agentNav } from "@/lib/config/agent-nav";
import { useIncomingConnections } from "@/lib/hooks/use-connections";

export function useAgentNav() {
    const connections = useIncomingConnections();

    const openLeads = useMemo(
        () =>
            (connections.data ?? []).filter(
                (connection) => connection.status === "PENDING",
            ).length,
        [connections.data],
    );

    return useMemo(() => agentNav(openLeads), [openLeads]);
}
