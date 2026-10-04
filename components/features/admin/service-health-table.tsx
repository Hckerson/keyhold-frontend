import { ServiceHealthRow } from "@/components/features/admin/service-health-row";
import { cn } from "@/lib/utils";
import type { ServiceHealth } from "@/lib/types";

const TABLE_CAPTION =
    "Platform services by state, share of uptime budget spent, p95 latency and error rate";

const COLUMNS = [
    { id: "service", label: "Service", className: "text-left" },
    { id: "budget", label: "Budget", className: "w-16 pl-3 text-right" },
    { id: "p95", label: "p95", className: "w-18 pl-3 text-right" },
    { id: "errors", label: "Errors", className: "w-18 pl-3 text-right" },
];

export interface ServiceHealthTableProps {
    services: ServiceHealth[];
}

export function ServiceHealthTable({ services }: ServiceHealthTableProps) {
    return (
        <table className="table-flush w-full table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border-light h-9 border-b">
                    {COLUMNS.map((column) => (
                        <th
                            key={column.id}
                            scope="col"
                            className={cn("micro-label", column.className)}
                        >
                            {column.label}
                        </th>
                    ))}
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
