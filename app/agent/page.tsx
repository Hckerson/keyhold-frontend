import { AgentOverviewHeader } from "@/components/sections/agent/agent-overview-header";
import { AgentOverviewStatBand } from "@/components/sections/agent/agent-overview-stat-band";
import { AgentOverviewMain } from "@/components/sections/agent/agent-overview-main";
import { AgentOverviewRail } from "@/components/sections/agent/agent-overview-rail";

export default function AgentDashboardPage() {
    return (
        <div className="flex flex-col gap-4">
            <AgentOverviewHeader />
            <AgentOverviewStatBand />

            <div className="console-split gap-3">
                <AgentOverviewMain />
                <AgentOverviewRail />
            </div>
        </div>
    );
}
