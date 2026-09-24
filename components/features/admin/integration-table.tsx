import { IntegrationRow } from "@/components/features/admin/integration-row";
import type { IntegrationStatus } from "@/lib/validations/service-health";

const TABLE_CAPTION =
    "External services this environment depends on, and whether their credentials are configured";

export interface IntegrationTableProps {
    integrations: IntegrationStatus[];
}

export function IntegrationTable({ integrations }: IntegrationTableProps) {
    return (
        <table className="table-flush w-full min-w-lg table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border-light h-9 border-b">
                    <th scope="col" className="micro-label w-40 text-left">
                        Integration
                    </th>
                    <th scope="col" className="micro-label pl-3 text-left">
                        Capability
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-32 pl-3 text-right"
                    >
                        State
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border-light divide-y">
                {integrations.map((integration) => (
                    <IntegrationRow
                        key={integration.id}
                        integration={integration}
                    />
                ))}
            </tbody>
        </table>
    );
}

IntegrationTable.displayName = "IntegrationTable";
