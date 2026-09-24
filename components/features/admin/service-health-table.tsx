import { ServiceHealthRow } from "@/components/features/admin/service-health-row";
import type { ServiceHealth } from "@/lib/types";

const TABLE_CAPTION =
    "Platform services by state, share of uptime budget spent, p95 latency and error rate";

export interface ServiceHealthTableProps {
    services: ServiceHealth[];
}

export function ServiceHealthTable({ services }: ServiceHealthTableProps) {
    return (
        <table className="table-flush w-full min-w-lg table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border-light h-9 border-b">
                    <th scope="col" className="micro-label text-left">
                        Service
                    </th>
                    <th scope="col" className="micro-label w-28 pl-3 text-left">
                        State
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-28 pl-3 text-right"
                    >
                        Budget spent
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-16 pl-3 text-right"
                    >
                        p95
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-16 pl-3 text-right"
                    >
                        Errors
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border-light divide-y">
                {services.map((service) => (
                    <ServiceHealthRow key={service.id} service={service} />
                ))}
            </tbody>
        </table>
    );
}

ServiceHealthTable.displayName = "ServiceHealthTable";
