import { PortalHeader } from "@/components/patterns/portal-header";

const ANALYTICS_TITLE = "Performance Analytics";
const ANALYTICS_LEDE = "Production, market position and quarterly pacing";

export interface AnalyticsHeaderProps {
    period: string;
}

export function AnalyticsHeader({ period }: AnalyticsHeaderProps) {
    return (
        <PortalHeader
            title={ANALYTICS_TITLE}
            lede={ANALYTICS_LEDE}
            summary={period}
        />
    );
}

AnalyticsHeader.displayName = "AnalyticsHeader";
