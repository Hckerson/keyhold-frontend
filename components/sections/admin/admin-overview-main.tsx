import { Activity, PlugZap } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { EmptyState } from "@/components/ui/empty-state";
import { PanelLink } from "@/components/features/shared/panel-link";
import { IntegrationCoverage } from "@/components/features/admin/integration-coverage";
import { ServiceHealthTable } from "@/components/features/admin/service-health-table";
import { AdminRevenueHero } from "@/components/sections/admin/admin-revenue-hero";
import type { GmvReading } from "@/lib/data/admin-overview";
import type { ServiceHealth } from "@/lib/types";
import type { IntegrationStatus } from "@/lib/validations/service-health";

const HEALTH_TITLE = "Service Health";
const HEALTH_ACTION = "Settings";
const HEALTH_EMPTY = "No traffic recorded yet";
const HEALTH_EMPTY_LEDE =
    "Service metrics appear once requests flow through the API.";
const INTEGRATIONS_TITLE = "Integrations";
const INTEGRATIONS_ACTION = "Settings";
const INTEGRATIONS_EMPTY = "Credential state unavailable";
const INTEGRATIONS_EMPTY_LEDE =
    "The API did not report which external services are configured.";

export interface AdminOverviewMainProps {
    gmv: GmvReading | null;
    months: Record<string, string | number>[];
    services: ServiceHealth[];
    serviceSummary: string;
    integrations: IntegrationStatus[];
    integrationSummary: string;
}

export function AdminOverviewMain({
    gmv,
    months,
    services,
    serviceSummary,
    integrations,
    integrationSummary,
}: AdminOverviewMainProps) {
    return (
        <div className="console-span-2 flex flex-col gap-3">
            <AdminRevenueHero reading={gmv} months={months} />

            <Panel
                title={HEALTH_TITLE}
                description={serviceSummary}
                action={
                    <PanelLink href="/admin/settings" label={HEALTH_ACTION} />
                }
            >
                {services.length > 0 ? (
                    <PanelInset scroll>
                        <ServiceHealthTable services={services} />
                    </PanelInset>
                ) : (
                    <EmptyState
                        icon={Activity}
                        title={HEALTH_EMPTY}
                        description={HEALTH_EMPTY_LEDE}
                    />
                )}
            </Panel>

            <Panel
                title={INTEGRATIONS_TITLE}
                description={integrationSummary}
                action={
                    <PanelLink
                        href="/admin/settings"
                        label={INTEGRATIONS_ACTION}
                    />
                }
            >
                {integrations.length > 0 ? (
                    <IntegrationCoverage integrations={integrations} />
                ) : (
                    <EmptyState
                        icon={PlugZap}
                        title={INTEGRATIONS_EMPTY}
                        description={INTEGRATIONS_EMPTY_LEDE}
                    />
                )}
            </Panel>
        </div>
    );
}

AdminOverviewMain.displayName = "AdminOverviewMain";
