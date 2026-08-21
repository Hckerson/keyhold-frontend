import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { PlatformSignalTable } from "@/components/features/admin/platform-signal-table";
import { AdminRevenueHero } from "@/components/sections/admin/admin-revenue-hero";
import {
    PLATFORM_SIGNALS,
    SIGNAL_EXPOSURE_LABEL,
} from "@/lib/data/admin-overview";

const SIGNALS_TITLE = "Signals";
const SIGNALS_ACTION = "Verifications";

export function AdminOverviewMain() {
    return (
        <div className="console-span-2 flex flex-col gap-3">
            <AdminRevenueHero />

            <Panel
                title={SIGNALS_TITLE}
                description={`${SIGNAL_EXPOSURE_LABEL} of value waiting on a decision`}
                count={PLATFORM_SIGNALS.length}
                action={
                    <PanelLink
                        href="/admin/verifications"
                        label={SIGNALS_ACTION}
                    />
                }
            >
                <PanelInset scroll>
                    <PlatformSignalTable signals={PLATFORM_SIGNALS} />
                </PanelInset>
            </Panel>
        </div>
    );
}

AdminOverviewMain.displayName = "AdminOverviewMain";
