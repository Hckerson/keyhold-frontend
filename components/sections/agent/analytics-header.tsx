import { PortalHeader } from "@/components/patterns/portal-header";
import { ANALYTICS_PERIOD } from "@/lib/data/agent-analytics";

const ANALYTICS_TITLE = "Performance Analytics";
const ANALYTICS_LEDE = "Production, market position and quarterly pacing";

export function AnalyticsHeader() {
    return (
        <PortalHeader
            title={ANALYTICS_TITLE}
            lede={ANALYTICS_LEDE}
            summary={ANALYTICS_PERIOD}
        />
    );
}

AnalyticsHeader.displayName = "AnalyticsHeader";
