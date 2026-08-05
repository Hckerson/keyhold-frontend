import { OverviewAlertRow } from "@/components/features/dashboard/overview-alert-row";
import type { MatchAlert } from "@/lib/data/dashboard-overview";

export interface OverviewAlertListProps {
    alerts: MatchAlert[];
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
