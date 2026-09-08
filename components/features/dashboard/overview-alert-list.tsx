import { OverviewAlertRow } from "@/components/features/dashboard/overview-alert-row";
import type { Alert } from "@/lib/types";

export interface OverviewAlertListProps {
    alerts: Alert[];
}

export function OverviewAlertList({ alerts }: OverviewAlertListProps) {
    return (
        <ul className="divide-border divide-y">
            {alerts.map((alert) => (
                <OverviewAlertRow key={alert.id} alert={alert} />
            ))}
        </ul>
    );
}

OverviewAlertList.displayName = "OverviewAlertList";
