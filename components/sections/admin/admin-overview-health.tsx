import { Activity, PlugZap } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { DeckFigure } from "@/components/patterns/deck-figure";
import { DeckPanel } from "@/components/patterns/deck-panel";
import { PanelLink } from "@/components/features/shared/panel-link";
import { CredentialChips } from "@/components/features/admin/credential-chips";
import { ServiceHealthTable } from "@/components/features/admin/service-health-table";
import { ADMIN_ROUTES } from "@/lib/constants";
import type { ServiceHealth, SystemsReading } from "@/lib/types";
import type { IntegrationStatus } from "@/lib/validations/service-health";

const TITLE = "Health";
const ACTION = "Settings";
const SERVICES_EMPTY = "No traffic recorded yet";
const SERVICES_EMPTY_LEDE =
    "Service metrics appear once requests flow through the API.";
const SERVICES_ERROR = "Service health unavailable";
const SERVICES_ERROR_LEDE = "The health service did not answer this time.";
const CREDENTIALS_EMPTY = "Credential state unavailable";
const CREDENTIALS_EMPTY_LEDE =
    "The API did not report which external services are configured.";

export interface AdminOverviewHealthProps {
    systems: SystemsReading;
    services: ServiceHealth[];
    integrations: IntegrationStatus[];
    integrationSummary: string;
    pending?: boolean;
    failed?: boolean;
}

export function AdminOverviewHealth({
    systems,
    services,
    integrations,
    integrationSummary,
    pending,
    failed,
}: AdminOverviewHealthProps) {
    return (
        <DeckPanel
            title={TITLE}
            action={<PanelLink href={ADMIN_ROUTES.settings} label={ACTION} />}
            pending={pending}
        >
            <DeckFigure
                value={systems.figure}
                tone={systems.belowSlo ? "warning" : undefined}
                caption={failed ? SERVICES_ERROR : systems.reading}
                pending={pending}
            />

            {services.length > 0 ? (
                <ServiceHealthTable services={services} />
            ) : (
                <EmptyState
                    icon={Activity}
                    title={failed ? SERVICES_ERROR : SERVICES_EMPTY}
                    description={
                        failed ? SERVICES_ERROR_LEDE : SERVICES_EMPTY_LEDE
                    }
                />
            )}

            <div className="mt-auto">
                {integrations.length > 0 ? (
                    <CredentialChips
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
        </DeckPanel>
    );
}

AdminOverviewHealth.displayName = "AdminOverviewHealth";
