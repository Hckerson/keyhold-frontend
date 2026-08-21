import { PortalHeader } from "@/components/patterns/portal-header";

const OVERVIEW_LEDE = "Your sales pipeline and performance overview";
const FALLBACK_NAME = "there";

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
            title={`Welcome back, ${name ?? FALLBACK_NAME}`}
            lede={OVERVIEW_LEDE}
            summary={summary}
        />
    );
}

AgentOverviewHeader.displayName = "AgentOverviewHeader";
