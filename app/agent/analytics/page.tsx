import { AnalyticsHeader } from "@/components/sections/agent/analytics-header";
import { AnalyticsStatBand } from "@/components/sections/agent/analytics-stat-band";
import { AnalyticsMain } from "@/components/sections/agent/analytics-main";
import { AnalyticsRail } from "@/components/sections/agent/analytics-rail";

export default function AgentAnalyticsPage() {
    return (
        <div className="flex flex-col gap-4">
            <AnalyticsHeader />
            <AnalyticsStatBand />

            <div className="console-split gap-3">
                <AnalyticsMain />
                <AnalyticsRail />
            </div>
        </div>
    );
}
