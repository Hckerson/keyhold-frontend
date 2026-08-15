import { PortalHeader } from "@/components/patterns/portal-header";

const AGENT_NAME = "Sarah";
const OVERVIEW_LEDE = "Your sales pipeline and performance overview";

export function AgentOverviewHeader() {
    return (
        <PortalHeader
            title={`Welcome back, ${AGENT_NAME}`}
            lede={OVERVIEW_LEDE}
        />
    );
}

AgentOverviewHeader.displayName = "AgentOverviewHeader";
