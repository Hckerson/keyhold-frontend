import { IntegrationTable } from "@/components/features/admin/integration-table";
import type { IntegrationStatus } from "@/lib/validations/service-health";

const CHECKLIST_TITLE = "Credentials";

export interface IntegrationCoverageProps {
    integrations: IntegrationStatus[];
    summary: string;
}

export function IntegrationCoverage({
    integrations,
    summary,
}: IntegrationCoverageProps) {
    return (
        <section aria-label={CHECKLIST_TITLE} className="flex flex-col">
            <header className="flex h-9 items-center gap-3">
                <h3 className="micro-label shrink-0">{CHECKLIST_TITLE}</h3>
                <span className="text-text-secondary truncate text-xs">
                    {summary}
                </span>
            </header>
            <div className="scroll-x">
                <IntegrationTable integrations={integrations} />
            </div>
        </section>
    );
}

IntegrationCoverage.displayName = "IntegrationCoverage";
