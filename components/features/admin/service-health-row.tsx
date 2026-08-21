import { ErrorBudgetMeter } from "@/components/features/admin/error-budget-meter";
import { ServiceStateMark } from "@/components/features/admin/service-state-mark";
import { errorRateTone } from "@/lib/config/admin-tones";
import { chartToneText } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { ServiceHealth } from "@/lib/types";

const LATENCY_SUFFIX = "ms";

export interface ServiceHealthRowProps {
    service: ServiceHealth;
}

export function ServiceHealthRow({ service }: ServiceHealthRowProps) {
    return (
        <tr className="ease-smooth hover:bg-background-muted h-9 transition-colors">
            <td className="text-text truncate py-0 text-xs font-medium">
                {service.label}
            </td>
            <td className="py-0 pl-3">
                <ServiceStateMark state={service.state} />
            </td>
            <td className="py-0 pl-3">
                <ErrorBudgetMeter
                    uptime={service.uptime}
                    label={service.label}
                />
            </td>
            <td className="text-text-secondary py-0 pl-3 text-right text-xs tabular-nums">
                {service.latencyMs}
                {LATENCY_SUFFIX}
            </td>
            <td
                className={cn(
                    "py-0 pl-3 text-right text-xs font-medium tabular-nums",
                    chartToneText[errorRateTone(service.errorRate)],
                )}
            >
                {service.errorRate}%
            </td>
        </tr>
    );
}

ServiceHealthRow.displayName = "ServiceHealthRow";
