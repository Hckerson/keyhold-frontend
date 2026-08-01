import { Button } from "@/components/ui/button";
import { StatusDot } from "@/components/patterns/status-dot";
import type { SystemAlert } from "@/lib/data/admin-overview";

export function SystemAlertList({ alerts }: { alerts: SystemAlert[] }) {
    return (
        <ul className="bg-background-alt divide-border-light divide-y rounded-lg px-3">
            {alerts.map((alert) => (
                <li
                    key={alert.id}
                    className="flex items-start gap-3 py-3"
                >
                    <StatusDot tone={alert.tone} className="mt-1.5 size-2" />
                    <div className="min-w-0 flex-1">
                        <h4 className="text-text text-xs font-medium">
                            {alert.title}
                        </h4>
                        <p className="text-text-secondary mt-0.5 text-xs">
                            {alert.description}
                        </p>
                        <p className="text-text-muted mt-1 text-xs">
                            {alert.time}
                        </p>
                    </div>
                    <Button variant="secondary" size="sm" className="shrink-0">
                        Review
                    </Button>
                </li>
            ))}
        </ul>
    );
}

SystemAlertList.displayName = "SystemAlertList";
