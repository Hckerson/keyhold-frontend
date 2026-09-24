import { Check } from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { PanelInset } from "@/components/ui/panel-inset";
import { StatusBadge } from "@/components/ui/status-badge";
import { IntegrationTable } from "@/components/features/admin/integration-table";
import type { IntegrationStatus } from "@/lib/validations/service-health";

const CONNECTED_LABEL = "connected";

const coverageTone = (integrations: IntegrationStatus[]) => {
    if (integrations.some((row) => row.required && !row.configured))
        return "error";
    return integrations.every((row) => row.configured) ? "success" : "warning";
};

export interface IntegrationCoverageProps {
    integrations: IntegrationStatus[];
}

export function IntegrationCoverage({
    integrations,
}: IntegrationCoverageProps) {
    const connected = integrations.filter((row) => row.configured);
    const unconfigured = integrations.filter((row) => !row.configured);
    const share = Math.round((connected.length / integrations.length) * 100);
    const reading = `${connected.length} of ${integrations.length} ${CONNECTED_LABEL}`;

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
                <ProgressBar
                    value={share}
                    tone={coverageTone(integrations)}
                    label={reading}
                    className="flex-1"
                />
                <span className="text-text shrink-0 text-xs font-semibold tabular-nums">
                    {connected.length}
                    <span className="text-text-muted font-normal">
                        {" "}
                        of {integrations.length} {CONNECTED_LABEL}
                    </span>
                </span>
            </div>

            {unconfigured.length > 0 && (
                <PanelInset scroll>
                    <IntegrationTable integrations={unconfigured} />
                </PanelInset>
            )}

            {connected.length > 0 && (
                <ul className="flex flex-wrap gap-1.5">
                    {connected.map((row) => (
                        <li key={row.id}>
                            <StatusBadge
                                tone="success"
                                size="md"
                                icon={Check}
                                title={row.capability}
                            >
                                {row.label}
                            </StatusBadge>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

IntegrationCoverage.displayName = "IntegrationCoverage";
