import { ConciergeHeader } from "@/components/sections/agent/concierge-header";
import { ConciergeStatBand } from "@/components/sections/agent/concierge-stat-band";
import { ConciergeMain } from "@/components/sections/agent/concierge-main";
import { ConciergeRail } from "@/components/sections/agent/concierge-rail";
import { conciergeSummary } from "@/lib/data/agent-concierge";

export default function VIPConciergePage() {
    return (
        <div className="flex flex-col gap-4">
            <ConciergeHeader summary={conciergeSummary} />

            <ConciergeStatBand />

            <div className="console-split gap-3">
                <ConciergeMain />
                <ConciergeRail />
            </div>
        </div>
    );
}
