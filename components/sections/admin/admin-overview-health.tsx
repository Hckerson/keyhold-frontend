import { Activity, PlugZap } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { RegisterSection } from "@/components/patterns/register-section";
import { PanelLink } from "@/components/features/shared/panel-link";
import { IntegrationCoverage } from "@/components/features/admin/integration-coverage";
import { ServiceHealthTable } from "@/components/features/admin/service-health-table";
import { ADMIN_ROUTES } from "@/lib/constants";
import type { ServiceHealth, SystemsReading } from "@/lib/types";
import type { IntegrationStatus } from "@/lib/validations/service-health";

const INDEX = "02";
const TITLE = "Health";
const ACTION = "Settings";
const SERVICES_EMPTY = "No traffic recorded yet";
const SERVICES_EMPTY_LEDE =
    "Service metrics appear once requests flow through the API.";
const CREDENTIALS_EMPTY = "Credential state unavailable";
const CREDENTIALS_EMPTY_LEDE =
    "The API did not report which external services are configured.";

export interface AdminOverviewHealthProps {
    systems: SystemsReading;
    services: ServiceHealth[];
    integrations: IntegrationStatus[];
    integrationSummary: string;
    pending?: boolean;
}

export function AdminOverviewHealth({
    systems,
    services,
    integrations,
    integrationSummary,
    pending,
}: AdminOverviewHealthProps) {
    return (
        <RegisterSection
            index={INDEX}
            title={TITLE}
            figure={systems.figure}
            figureTone={systems.belowSlo ? "warning" : undefined}
            reading={systems.reading}
            action={<PanelLink href={ADMIN_ROUTES.settings} label={ACTION} />}
            pending={pending}
        >
            <div className="flex flex-col gap-4">
                {services.length > 0 ? (
                    <div className="scroll-x">
                        <ServiceHealthTable services={services} />
                    </div>
                ) : (
                    <EmptyState
                        icon={Activity}
                        title={SERVICES_EMPTY}
                        description={SERVICES_EMPTY_LEDE}
                    />
                )}

                {integrations.length > 0 ? (
                    <IntegrationCoverage
                        integrations={integrations}
                        summary={integrationSummary}
                    />
                ) : (
                    <EmptyState
                        icon={PlugZap}
                        title={CREDENTIALS_EMPTY}
                        description={CREDENTIALS_EMPTY_LEDE}
                    />
                )}
            </div>
        </RegisterSection>
    );
}

AdminOverviewHealth.displayName = "AdminOverviewHealth";
