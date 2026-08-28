"use client";

import { useMemo } from "react";
import { agentNav } from "@/lib/config/agent-nav";
import { pendingCount } from "@/lib/data/agent-requests";
import { useIncomingConnections } from "@/lib/hooks/use-connections";
import { toRequestBook } from "@/lib/utils/to-agent-request";

export function useAgentNav() {
    const connections = useIncomingConnections();

    const leads = useMemo(
        () =>
            (connections.data ?? []).filter(
                (connection) => connection.status === "PENDING",
            ).length,
        [connections.data],
    );

    const requests = useMemo(
        () => pendingCount(toRequestBook(connections.data ?? [])),
        [connections.data],
    );

    return useMemo(() => agentNav({ leads, requests }), [leads, requests]);
}
