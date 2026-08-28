import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { PlatformSignalTable } from "@/components/features/admin/platform-signal-table";
import { ServiceHealthTable } from "@/components/features/admin/service-health-table";
import { IntegrationTable } from "@/components/features/admin/integration-table";
import { AdminRevenueHero } from "@/components/sections/admin/admin-revenue-hero";
import { EmptyState } from "@/components/ui/empty-state";
import { Activity, PlugZap, ShieldCheck } from "lucide-react";
import type { MetricItem, PlatformSignal, ServiceHealth } from "@/lib/types";
import type { IntegrationStatus } from "@/lib/validations/service-health";

const SIGNALS_TITLE = "Signals";
const SIGNALS_ACTION = "Verifications";
const SIGNALS_EMPTY = "Nothing waiting on a decision";
const SIGNALS_EMPTY_LEDE = "Every moderation queue is clear.";
const HEALTH_TITLE = "Service Health";
const HEALTH_LEDE = "Measured from live request traffic";
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
    gmv: number;
    growthLabel: string;
    commissionsLabel: string;
    months: Record<string, string | number>[];
    metrics: MetricItem[];
    signals: PlatformSignal[];
    exposureLabel: string;
    services: ServiceHealth[];
    serviceSummary: string;
    integrations: IntegrationStatus[];
    integrationSummary: string;
}

export function AdminOverviewMain({
    gmv,
    growthLabel,
    commissionsLabel,
    months,
    metrics,
    signals,
    exposureLabel,
    services,
    serviceSummary,
    integrations,
    integrationSummary,
}: AdminOverviewMainProps) {
    return (
        <div className="console-span-2 flex flex-col gap-3">
            <AdminRevenueHero
                gmv={gmv}
                growthLabel={growthLabel}
                commissionsLabel={commissionsLabel}
                months={months}
                metrics={metrics}
            />

            <Panel
                title={SIGNALS_TITLE}
                description={`${exposureLabel} of settled value on the platform`}
                count={signals.length}
                action={
                    <PanelLink
                        href="/admin/verifications"
                        label={SIGNALS_ACTION}
                    />
                }
            >
                {signals.length > 0 ? (
                    <PanelInset scroll>
                        <PlatformSignalTable signals={signals} />
                    </PanelInset>
                ) : (
                    <EmptyState
                        icon={ShieldCheck}
                        title={SIGNALS_EMPTY}
                        description={SIGNALS_EMPTY_LEDE}
                    />
                )}
            </Panel>

            <Panel
                title={HEALTH_TITLE}
                description={`${HEALTH_LEDE} · ${serviceSummary}`}
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
                    <PanelInset scroll>
                        <IntegrationTable integrations={integrations} />
                    </PanelInset>
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
