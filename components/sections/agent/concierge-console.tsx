"use client";

import { useMemo } from "react";
import { ConciergeHeader } from "@/components/sections/agent/concierge-header";
import { ConciergeStatBand } from "@/components/sections/agent/concierge-stat-band";
import { ConciergeMain } from "@/components/sections/agent/concierge-main";
import { ConciergeRail } from "@/components/sections/agent/concierge-rail";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    conciergeStats,
    conciergeSummary,
    rankClients,
    toPlaybook,
    toServiceDesk,
} from "@/lib/data/agent-concierge";
import {
    useConciergeClients,
    useConciergeOverview,
    useConciergePractices,
    useConciergeServices,
} from "@/lib/hooks/use-concierge";
import { toVipClients } from "@/lib/utils/to-vip-client";

const EMPTY_SUMMARY = "No relationships yet";

export function ConciergeConsole() {
    const overview = useConciergeOverview();
    const clients = useConciergeClients();
    const services = useConciergeServices();
    const practices = useConciergePractices();

    const ranked = useMemo(
        () => rankClients(toVipClients(clients.data ?? [])),
        [clients.data],
    );
    const desk = useMemo(
        () => toServiceDesk(services.data ?? []),
        [services.data],
    );
    const playbook = useMemo(
        () => toPlaybook(practices.data ?? []),
        [practices.data],
    );

    const failed =
        overview.isError ||
        clients.isError ||
        services.isError ||
        practices.isError;

    if (failed)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.agentConcierge}
                onRetry={() => {
                    void overview.refetch();
                    void clients.refetch();
                    void services.refetch();
                    void practices.refetch();
                }}
            />
        );

    return (
        <div className="flex flex-col gap-4">
            <ConciergeHeader
                summary={
                    overview.data
                        ? conciergeSummary(overview.data)
                        : EMPTY_SUMMARY
                }
            />

            <ConciergeStatBand
                stats={overview.data ? conciergeStats(overview.data) : []}
                pending={overview.isPending}
            />

            <div className="console-split gap-3">
                <ConciergeMain
                    top={ranked[0]}
                    peers={ranked.slice(1)}
                    pending={clients.isPending}
                />
                <ConciergeRail
                    services={desk}
                    practices={playbook}
                    clientCount={ranked.length}
                    openRequests={overview.data?.openRequests ?? 0}
                />
            </div>
        </div>
    );
}

ConciergeConsole.displayName = "ConciergeConsole";
