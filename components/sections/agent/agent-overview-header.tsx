import { PortalHeader } from "@/components/patterns/portal-header";

const OVERVIEW_LEDE = "Your sales pipeline and performance overview";
const GREETING = "Welcome back";

export interface AgentOverviewHeaderProps {
    name?: string;
    summary?: string;
}

export function AgentOverviewHeader({
    name,
    summary,
}: AgentOverviewHeaderProps) {
    return (
        <PortalHeader
            title={name ? `${GREETING}, ${name}` : GREETING}
            lede={OVERVIEW_LEDE}
            summary={summary}
        />
    );
}

AgentOverviewHeader.displayName = "AgentOverviewHeader";
