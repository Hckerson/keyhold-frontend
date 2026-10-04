import { Activity, PlugZap } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { PanelInset } from "@/components/ui/panel-inset";
import { Skeleton } from "@/components/ui/skeleton";
import { DeckFigure } from "@/components/patterns/deck-figure";
import { DeckPanel } from "@/components/patterns/deck-panel";
import { SkeletonRows } from "@/components/patterns/skeleton-rows";
import { PanelLink } from "@/components/features/shared/panel-link";
import { CredentialChips } from "@/components/features/admin/credential-chips";
import { ServiceHealthTable } from "@/components/features/admin/service-health-table";
import { ADMIN_ROUTES, NO_READING } from "@/lib/constants";
import { CREDENTIALS_UNAVAILABLE } from "@/lib/data/admin-overview-systems";
import type { ServiceHealth, SystemsReading } from "@/lib/types";
import type { IntegrationStatus } from "@/lib/validations/service-health";

const TITLE = "Health";
const ACTION = "Settings";
const LOADING_READING = "Reading service health";
const SERVICES_EMPTY = "No traffic recorded yet";
const SERVICES_EMPTY_LEDE =
    "Service metrics appear once requests flow through the API.";
const SERVICES_ERROR = "Service health unavailable";
const SERVICES_ERROR_LEDE = "The health service did not answer this time.";
const CREDENTIALS_EMPTY_LEDE =
    "The API did not report which external services are configured.";
const SKELETON_SERVICES = 4;

export interface AdminOverviewHealthProps {
    systems: SystemsReading | null;
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
            {failed ? (
                <EmptyState
                    icon={Activity}
                    title={SERVICES_ERROR}
                    description={SERVICES_ERROR_LEDE}
                />
            ) : (
                <>
                    {(systems || pending) && (
                        <DeckFigure
                            value={systems?.figure ?? NO_READING}
                            tone={systems?.belowSlo ? "warning" : undefined}
                            caption={systems?.reading ?? LOADING_READING}
                            pending={pending}
                        />
                    )}

                    {pending ? (
                        <SkeletonRows rows={SKELETON_SERVICES} />
                    ) : services.length > 0 ? (
                        <PanelInset scroll>
                            <ServiceHealthTable services={services} />
                        </PanelInset>
                    ) : (
                        <EmptyState
                            icon={Activity}
                            title={SERVICES_EMPTY}
                            description={SERVICES_EMPTY_LEDE}
                        />
                    )}

                    <div>
                        {pending ? (
                            <Skeleton className="h-14 w-full" />
                        ) : integrations.length > 0 ? (
                            <CredentialChips
                                integrations={integrations}
                                summary={integrationSummary}
                            />
                        ) : (
                            <p
                                title={CREDENTIALS_EMPTY_LEDE}
                                className="text-text-muted flex items-center gap-2 text-xs"
                            >
                                <PlugZap
                                    aria-hidden="true"
                                    strokeWidth={1.5}
                                    className="size-3 shrink-0"
                                />
                                {CREDENTIALS_UNAVAILABLE}
                            </p>
                        )}
                    </div>
                </>
            )}
        </DeckPanel>
    );
}

AdminOverviewHealth.displayName = "AdminOverviewHealth";
