import type { PriceAlert } from "@/lib/data/dashboard-overview";

export interface AlertListProps {
    alerts: PriceAlert[];
}

export function AlertList({ alerts }: AlertListProps) {
    return (
        <ul className="flex flex-col gap-2">
            {alerts.map((alert) => (
                <li
                    key={alert.id}
                    className="flex items-center justify-between gap-3"
                >
                    <span className="text-text truncate text-xs">
                        {alert.address}
                    </span>
                    <span
                        className={
                            alert.tone === "success"
                                ? "text-success shrink-0 text-xs font-medium"
                                : "text-text-muted shrink-0 text-xs"
                        }
                    >
                        {alert.note}
                    </span>
                </li>
            ))}
        </ul>
    );
}

AlertList.displayName = "AlertList";
